// Auto-publish pipeline: no human approval gate.
//
// Publishing a candidate takes four slow model passes (draft, refine, two
// critics). Chaining them inside one request blows the gateway timeout, so this
// function is a RESUMABLE STATE MACHINE: each invocation advances exactly one
// candidate by exactly one step, then returns. Cron ticks it every few minutes.
//
//   pending   -> draft written (status "draft", invisible on /live)  -> drafting
//   drafting  -> refine-live-article (2 critics + enhancer)          -> drafted
//   drafted   -> one cross-LLM audit per tick                        -> auditing
//   auditing  -> both critics in? score >= threshold ? published : held
//
// Fail-closed: requires the admin passcode or the scheduler token.
// Never publishes on a partial critic panel, and never publishes below the bar,
// a weak piece stays a draft with its score recorded instead of shipping.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { isAuthorizedJobCall } from "../_shared/job-auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 9+/10 on the 0-100 composite the critics produce.
const PUBLISH_THRESHOLD = 90;
// Two vendors, deliberately. A single family grading itself is not a cross-check.
const CRITIC_MODELS = ["google/gemini-2.5-pro", "openai/gpt-5"];
// A candidate stuck mid-pipeline (function crashed, timeout) is retried after this.
const STALE_MINUTES = 20;

type Json = Record<string, unknown>;

const json = (body: Json, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const expected = Deno.env.get("REMASTER_ADMIN_PASSCODE");

  try {
    if (!supabaseUrl || !serviceKey || !expected) throw new Error("Missing env");

    const body = (await req.json().catch(() => ({}))) as {
      passcode?: string;
      cron_token?: string;
      threshold?: number;
      candidate_id?: string;
    };

    const supabase = createClient(supabaseUrl, serviceKey);

    const authorized = await isAuthorizedJobCall(supabase, {
      passcode: body.passcode,
      cronToken: body.cron_token,
    });
    if (!authorized) return json({ ok: false, error: "unauthorized" }, 401);

    const threshold =
      typeof body.threshold === "number" && body.threshold >= 0 && body.threshold <= 100
        ? body.threshold
        : PUBLISH_THRESHOLD;

    const call = async (fn: string, payload: Json) => {
      const res = await fetch(`${supabaseUrl}/functions/v1/${fn}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
        },
        body: JSON.stringify({ ...payload, passcode: expected }),
      });
      const text = await res.text();
      let parsed: Json = {};
      try { parsed = JSON.parse(text); } catch { parsed = { raw: text.slice(0, 300) }; }
      return { ok: res.ok, status: res.status, body: parsed };
    };

    // ---- pick the one candidate to advance ------------------------------
    const staleBefore = new Date(Date.now() - STALE_MINUTES * 60_000).toISOString();

    const pickInFlight = async () => {
      const { data } = await supabase
        .from("story_candidates")
        .select("*")
        .in("status", ["drafting", "drafted", "auditing"])
        .order("updated_at", { ascending: true })
        .limit(1);
      return data?.[0] ?? null;
    };
    const pickNew = async () => {
      const { data } = await supabase
        .from("story_candidates")
        .select("*")
        .eq("status", "pending")
        .order("tier1_verified", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(1);
      return data?.[0] ?? null;
    };

    let candidate: any = null;
    if (body.candidate_id) {
      const { data } = await supabase.from("story_candidates").select("*").eq("id", body.candidate_id).maybeSingle();
      candidate = data;
    } else {
      // Finish what's already started before opening a new one.
      candidate = (await pickInFlight()) ?? (await pickNew());
    }
    if (!candidate) return json({ ok: true, step: "idle", note: "nothing to do" });

    const runId = (candidate.notes || "").match(/run:([a-z0-9-]+)/)?.[1] ?? null;
    const articleId: string | null = candidate.published_article_id ?? null;

    const touch = (patch: Json) =>
      supabase
        .from("story_candidates")
        .update({ ...patch, updated_at: new Date().toISOString() })
        .eq("id", candidate.id);

    // ---- step: pending -> draft -----------------------------------------
    // Generation is slow (news fetch + framework analysis). When the caller
    // (cron) disconnects on timeout the edge runtime cancels this function mid
    // flight, AFTER the draft row landed, so the candidate never records it and
    // the next tick regenerates the same story forever. Guard two ways:
    //   1. adopt any unclaimed recent draft before spending another generation
    //   2. cap attempts, then hold the candidate for a human
    if (candidate.status === "pending") {
      const claim = async (article: { id: string; slug?: string | null }, how: string) => {
        const newRun = `auto-${Date.now().toString(36)}-${String(article.id).slice(0, 8)}`;
        await touch({
          status: "drafting",
          rejected_reason: null,
          published_article_id: article.id,
          notes: `run:${newRun} draft:/live/${article.slug ?? ""}`,
        });
        return json({ ok: true, step: "draft", how, candidate: candidate.headline, article_id: article.id, slug: article.slug });
      };

      // 1. unclaimed drafts from a previous, cancelled tick
      const { data: claimed } = await supabase
        .from("story_candidates")
        .select("published_article_id")
        .not("published_article_id", "is", null);
      const taken = new Set((claimed ?? []).map((c) => c.published_article_id));
      const { data: recentDrafts } = await supabase
        .from("live_articles")
        .select("id, slug, created_at")
        .eq("status", "draft")
        .gte("created_at", new Date(Date.now() - 45 * 60_000).toISOString())
        .order("created_at", { ascending: false })
        .limit(20);
      const orphan = (recentDrafts ?? []).find((d) => !taken.has(d.id));
      if (orphan) return await claim(orphan, "adopted");

      const attempt = Number((candidate.notes || "").match(/attempt:(\d+)/)?.[1] ?? 0) + 1;
      if (attempt > 3) {
        await touch({ status: "held", rejected_reason: "draft failed 3 times, needs manual review" });
        return json({ ok: false, step: "draft", candidate: candidate.headline, error: "attempt cap reached" });
      }
      // Record the attempt BEFORE generating: if this tick is cancelled the count
      // still went up, so a permanently failing candidate cannot loop.
      await touch({ notes: `attempt:${attempt}`, rejected_reason: null });

      const sources = Array.isArray(candidate.source_urls) ? candidate.source_urls : [];
      const topic = `${candidate.headline}. ${candidate.summary}\n\nKnown sources: ${sources.join(", ")}`;
      const gen = await call("generate-live-article", { topic, status: "draft", skip_refine: true });
      const article = (gen.body as any)?.article;
      if (!article?.id) {
        await touch({
          notes: `attempt:${attempt}`,
          rejected_reason: `draft failed: ${(gen.body as any)?.error ?? gen.status}`,
        });
        return json({ ok: false, step: "draft", candidate: candidate.headline, attempt, error: (gen.body as any)?.error ?? gen.status });
      }
      return await claim(article, "generated");
    }



    // Stale guard: if an in-flight candidate hasn't moved, the previous tick died.
    const isStale = (candidate.updated_at ?? "") < staleBefore;

    // ---- step: refine ----------------------------------------------------
    if (candidate.status === "drafting") {
      if (!articleId) {
        await touch({ status: "pending", rejected_reason: "lost draft reference" });
        return json({ ok: false, step: "refine", error: "no article id" });
      }
      const refine = await call("refine-live-article", { article_id: articleId });
      // Refinement is quality polish, not a gate. If it fails, still audit the draft.
      await touch({
        status: "drafted",
        notes: `${candidate.notes ?? ""} refine:${refine.ok ? "ok" : "failed"}`.trim(),
      });
      return json({ ok: true, step: "refine", refined: refine.ok, article_id: articleId });
    }

    // ---- step: audit, one critic per tick --------------------------------
    if (candidate.status === "drafted" || candidate.status === "auditing") {
      if (!articleId || !runId) {
        await touch({ status: "pending", rejected_reason: "lost run reference" });
        return json({ ok: false, step: "audit", error: "no run id" });
      }

      const { data: done } = await supabase
        .from("article_audits")
        .select("model, status")
        .eq("article_id", articleId)
        .eq("run_id", runId);
      const haveModels = new Set((done ?? []).filter((d) => d.status === "complete").map((d) => d.model));
      const next = CRITIC_MODELS.find((m) => !haveModels.has(m));

      if (next && !(isStale && candidate.status === "auditing" && haveModels.size === 0 && (done ?? []).length > 0)) {
        await touch({ status: "auditing" });
        const audit = await call("audit-article", {
          article_id: articleId,
          run_id: runId,
          model: next,
          models_expected: CRITIC_MODELS,
        });
        const remaining = CRITIC_MODELS.length - haveModels.size - (audit.ok ? 1 : 0);
        // Only pause the tick when critics are still outstanding. When this was
        // the last critic, fall through and decide now so a passing article
        // publishes on the same tick instead of waiting for the next one.
        if (!audit.ok || remaining > 0) {
          return json({ ok: audit.ok, step: "audit", model: next, remaining });
        }
      }


      // Both critics in: decide.
      const { data: summary } = await supabase
        .from("article_audit_summary")
        .select("composite_score, models_run")
        .eq("article_id", articleId)
        .eq("run_id", runId)
        .maybeSingle();

      const score = summary?.composite_score ?? null;
      const critics = (summary?.models_run ?? []).length;
      const passed = score !== null && score >= threshold && critics >= CRITIC_MODELS.length;

      if (passed) {
        await supabase
          .from("live_articles")
          .update({ status: "published", published_at: new Date().toISOString() })
          .eq("id", articleId);
        await touch({
          status: "published",
          notes: `${candidate.notes ?? ""} auto-published ${score}/100 (${critics} critics)`.trim(),
        });
      } else {
        await touch({
          status: "held",
          rejected_reason:
            score === null
              ? "audit produced no composite score"
              : `scored ${score}/100 with ${critics} critics, below ${threshold}. Draft kept for manual fix.`,
        });
      }

      return json({ ok: true, step: "decide", published: passed, score, critics, threshold, article_id: articleId });
    }

    return json({ ok: true, step: "skip", status: candidate.status });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[auto-publish] error:", msg);
    return json({ ok: false, error: msg }, 500);
  }
});
