// Auto-publish pipeline: no human approval gate.
//
// For each pending story candidate:
//   1. generate-live-article writes the piece as a DRAFT (not visible on /live)
//   2. two independent critics from different vendors audit it (cross-LLM)
//   3. composite score >= PUBLISH_THRESHOLD (90/100 == 9+/10) -> published
//      otherwise the article stays a draft with the score recorded, so it can
//      be fixed by hand instead of shipping weak analysis.
//
// Fail-closed: requires REMASTER_ADMIN_PASSCODE on every call.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 9+/10 on the 0-100 composite the critics produce.
const PUBLISH_THRESHOLD = 90;
// Two vendors, deliberately. A single family grading itself is not a cross-check.
const CRITIC_MODELS = ["google/gemini-2.5-pro", "openai/gpt-5"];

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
      max?: number;
      threshold?: number;
      candidate_id?: string;
    };

    if (body.passcode !== expected) {
      await new Promise((r) => setTimeout(r, 250));
      return json({ ok: false, error: "unauthorized" }, 401);
    }

    const threshold =
      typeof body.threshold === "number" && body.threshold >= 0 && body.threshold <= 100
        ? body.threshold
        : PUBLISH_THRESHOLD;
    // One per invocation by default: generation + refinement + two audits is slow.
    const max = Math.min(Math.max(Number(body.max) || 1, 1), 3);

    const supabase = createClient(supabaseUrl, serviceKey);

    let query = supabase
      .from("story_candidates")
      .select("*")
      .eq("status", "pending")
      .order("tier1_verified", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(max);
    if (body.candidate_id) query = supabase.from("story_candidates").select("*").eq("id", body.candidate_id).limit(1);

    const { data: candidates, error: qErr } = await query;
    if (qErr) throw qErr;
    if (!candidates?.length) return json({ ok: true, processed: [], note: "no pending candidates" });

    const results: Json[] = [];

    for (const candidate of candidates) {
      if (candidate.status !== "pending") continue;
      await supabase.from("story_candidates").update({ status: "processing" }).eq("id", candidate.id);

      try {
        // 1. Draft.
        const sources = Array.isArray(candidate.source_urls) ? candidate.source_urls : [];
        const topic = `${candidate.headline}. ${candidate.summary}\n\nKnown sources: ${sources.join(", ")}`;
        const genRes = await fetch(`${supabaseUrl}/functions/v1/generate-live-article`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${serviceKey}`,
            apikey: serviceKey,
          },
          body: JSON.stringify({ topic, passcode: expected, status: "draft" }),
        });
        const genJson = await genRes.json().catch(() => ({}));
        if (!genRes.ok || !genJson?.success || !genJson?.article?.id) {
          throw new Error(`generation failed: ${genJson?.error ?? genRes.statusText}`);
        }
        const article = genJson.article as { id: string; slug: string; headline: string };

        // 2. Cross-LLM audit, same run so the summary is a real consensus.
        const runId = `auto-${Date.now().toString(36)}-${article.id.slice(0, 8)}`;
        const auditErrors: string[] = [];
        for (const model of CRITIC_MODELS) {
          const aRes = await fetch(`${supabaseUrl}/functions/v1/audit-article`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${serviceKey}`,
              apikey: serviceKey,
            },
            body: JSON.stringify({
              article_id: article.id,
              run_id: runId,
              model,
              passcode: expected,
              models_expected: CRITIC_MODELS,
            }),
          });
          if (!aRes.ok) auditErrors.push(`${model}: ${await aRes.text()}`);
          else await aRes.text();
        }

        const { data: summary } = await supabase
          .from("article_audit_summary")
          .select("composite_score, composite_severity, models_run")
          .eq("article_id", article.id)
          .eq("run_id", runId)
          .maybeSingle();

        const score = summary?.composite_score ?? null;
        const critics = (summary?.models_run ?? []).length;
        // Never publish on a partial panel: one grader is not a cross-check.
        const passed = score !== null && score >= threshold && critics >= CRITIC_MODELS.length;

        if (passed) {
          await supabase
            .from("live_articles")
            .update({ status: "published", published_at: new Date().toISOString() })
            .eq("id", article.id);
          await supabase
            .from("story_candidates")
            .update({
              status: "published",
              published_article_id: article.id,
              notes: `auto-published, cross-LLM ${score}/100 (${critics} critics, run ${runId})`,
            })
            .eq("id", candidate.id);
        } else {
          await supabase
            .from("story_candidates")
            .update({
              status: "held",
              published_article_id: article.id,
              rejected_reason:
                score === null
                  ? `audit produced no score${auditErrors.length ? `: ${auditErrors[0]}` : ""}`
                  : `scored ${score}/100 with ${critics} critics, below ${threshold}. Draft kept for manual fix.`,
              notes: `draft: /live/${article.slug} (run ${runId})`,
            })
            .eq("id", candidate.id);
        }

        results.push({
          candidate: candidate.headline,
          article_id: article.id,
          slug: article.slug,
          score,
          critics,
          threshold,
          published: passed,
          audit_errors: auditErrors,
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("[auto-publish] candidate failed:", candidate.id, msg);
        await supabase
          .from("story_candidates")
          .update({ status: "pending", rejected_reason: msg.slice(0, 500) })
          .eq("id", candidate.id);
        results.push({ candidate: candidate.headline, error: msg, published: false });
      }
    }

    return json({ ok: true, threshold, processed: results });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[auto-publish] error:", msg);
    return json({ ok: false, error: msg }, 500);
  }
});
