// Stage 2: human curator approves or rejects a candidate.
// On approve, calls generate-live-article with the candidate's headline+summary
// as the topic, then marks the candidate as published and links the article.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Action = "approve" | "reject";
type Req = { passcode?: string; candidate_id?: string; action?: Action; reason?: string };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const expected = Deno.env.get("REMASTER_ADMIN_PASSCODE");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!expected || !supabaseUrl || !serviceKey) throw new Error("Missing env");

    const body = (await req.json().catch(() => ({}))) as Req;
    if (!body.passcode || body.passcode !== expected) {
      await new Promise((r) => setTimeout(r, 250));
      return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!body.candidate_id || !body.action) throw new Error("candidate_id and action required");

    const supabase = createClient(supabaseUrl, serviceKey);
    const { data: candidate, error: e0 } = await supabase
      .from("story_candidates").select("*").eq("id", body.candidate_id).maybeSingle();
    if (e0) throw e0;
    if (!candidate) throw new Error("candidate not found");
    if (candidate.status !== "pending") throw new Error(`candidate already ${candidate.status}`);

    if (body.action === "reject") {
      const { error } = await supabase.from("story_candidates")
        .update({ status: "rejected", rejected_reason: body.reason ?? "manual reject" })
        .eq("id", candidate.id);
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true, status: "rejected" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Approve → mark processing, invoke generate-live-article with topic.
    await supabase.from("story_candidates").update({ status: "processing" }).eq("id", candidate.id);

    const topic = `${candidate.headline}. ${candidate.summary}\n\nKnown sources: ${(candidate.source_urls ?? []).join(", ")}`;
    const genUrl = `${supabaseUrl}/functions/v1/generate-live-article`;
    const genRes = await fetch(genUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${serviceKey}`,
        "apikey": serviceKey,
      },
      body: JSON.stringify({ topic, passcode: expected }),
    });
    const genJson = await genRes.json().catch(() => ({}));
    if (!genRes.ok || !genJson?.success) {
      await supabase.from("story_candidates").update({
        status: "pending",
        rejected_reason: `generation failed: ${genJson?.error ?? genRes.statusText}`,
      }).eq("id", candidate.id);
      throw new Error(`generation failed: ${genJson?.error ?? genRes.statusText}`);
    }

    const articleId = genJson.article?.id ?? genJson.id ?? null;
    await supabase.from("story_candidates").update({
      status: "published",
      published_article_id: articleId,
    }).eq("id", candidate.id);

    return new Response(JSON.stringify({ ok: true, status: "published", article: genJson.article ?? genJson }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
