// Driver: pick next un-audited (article, model) for a run and invoke audit-article.
// Designed to be polled from the admin UI ("Run for N hours" button) or cron.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DEFAULT_MODELS = ["google/gemini-2.5-pro", "openai/gpt-5"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const passcodeExpected = Deno.env.get("REMASTER_ADMIN_PASSCODE");
    const body = await req.json().catch(() => ({}));
    const { action, run_id, models, passcode } = body ?? {};
    if (!passcodeExpected || passcode !== passcodeExpected) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const supabase = createClient(supabaseUrl, serviceKey);

    // start: create a new run targeting all published articles × selected models
    if (action === "start") {
      const newRunId = `run_${new Date().toISOString().slice(0, 19).replace(/[:T-]/g, "")}`;
      const useModels = (Array.isArray(models) && models.length ? models : DEFAULT_MODELS) as string[];
      const { data: arts } = await supabase.from("live_articles").select("id").eq("status", "published");
      await supabase.from("audit_runs").insert({
        id: newRunId,
        status: "running",
        models: useModels,
        total_articles: (arts ?? []).length,
        completed_articles: 0,
      });
      return new Response(JSON.stringify({ ok: true, run_id: newRunId, total_articles: (arts ?? []).length, models: useModels }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // tick: do one more (article, model) audit for the given run_id
    if (action === "tick") {
      if (!run_id) return new Response(JSON.stringify({ error: "run_id required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const { data: run } = await supabase.from("audit_runs").select("*").eq("id", run_id).maybeSingle();
      if (!run) return new Response(JSON.stringify({ error: "Unknown run_id" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (run.status !== "running") {
        return new Response(JSON.stringify({ ok: true, status: run.status, done: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const useModels: string[] = run.models;

      // Find next (article, model) not yet completed
      const { data: arts } = await supabase
        .from("live_articles")
        .select("id, slug, headline, created_at")
        .eq("status", "published")
        .order("created_at", { ascending: true });

      const { data: done } = await supabase
        .from("article_audits")
        .select("article_id, model, status")
        .eq("run_id", run_id)
        .eq("status", "complete");

      const doneSet = new Set((done ?? []).map((d: any) => `${d.article_id}::${d.model}`));
      let next: { article_id: string; model: string; slug: string } | null = null;
      outer: for (const a of arts ?? []) {
        for (const m of useModels) {
          if (!doneSet.has(`${a.id}::${m}`)) { next = { article_id: a.id, model: m, slug: a.slug }; break outer; }
        }
      }

      if (!next) {
        await supabase.from("audit_runs").update({ status: "complete", finished_at: new Date().toISOString() }).eq("id", run_id);
        return new Response(JSON.stringify({ ok: true, done: true, status: "complete" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const invokeRes = await fetch(`${supabaseUrl}/functions/v1/audit-article`, {
        method: "POST",
        headers: { Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ article_id: next.article_id, run_id, model: next.model, passcode, models_expected: useModels }),
      });
      const invokeBody = await invokeRes.json().catch(() => ({}));

      // Update completed_articles = distinct article_ids fully audited (all models complete)
      const { data: distinctDone } = await supabase
        .from("article_audit_summary")
        .select("article_id")
        .eq("run_id", run_id);
      await supabase.from("audit_runs").update({ completed_articles: (distinctDone ?? []).length }).eq("id", run_id);

      return new Response(JSON.stringify({
        ok: invokeRes.ok,
        processed: { slug: next.slug, model: next.model },
        invoke_status: invokeRes.status,
        invoke_body: invokeBody,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "pause" || action === "resume") {
      if (!run_id) return new Response(JSON.stringify({ error: "run_id required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      await supabase.from("audit_runs").update({ status: action === "pause" ? "paused" : "running" }).eq("id", run_id);
      return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: "Unknown action. Use start | tick | pause | resume" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("[audit-runner] error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
