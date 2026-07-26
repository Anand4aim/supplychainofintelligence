// Passcode-gated read proxy for admin-only tables (audit_runs, remaster_queue,
// article_audits, article_audit_summary, live_articles). Uses service role.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Req = {
  passcode?: string;
  resource?: "remaster_queue" | "audit_runs" | "run_data" | "live_articles_admin" | "story_candidates" | "endorsements";
  run_id?: string;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const expected = Deno.env.get("REMASTER_ADMIN_PASSCODE");
    if (!expected) throw new Error("REMASTER_ADMIN_PASSCODE not configured");
    const body = (await req.json().catch(() => ({}))) as Req;
    if (!body.passcode || body.passcode !== expected) {
      await new Promise((r) => setTimeout(r, 250));
      return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const out: Record<string, unknown> = { ok: true };

    switch (body.resource) {
      case "remaster_queue": {
        const { data, error } = await supabase
          .from("remaster_queue")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(200);
        if (error) throw error;
        out.queue = data ?? [];
        break;
      }
      case "audit_runs": {
        const { data, error } = await supabase
          .from("audit_runs")
          .select("*")
          .order("started_at", { ascending: false })
          .limit(20);
        if (error) throw error;
        out.runs = data ?? [];
        break;
      }
      case "live_articles_admin": {
        const { data, error } = await supabase
          .from("live_articles")
          .select("id,slug,headline,verdict,analysis")
          .eq("status", "published")
          .order("published_at", { ascending: false });
        if (error) throw error;
        out.articles = data ?? [];
        break;
      }
      case "story_candidates": {
        const { data, error } = await supabase
          .from("story_candidates")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(200);
        if (error) throw error;
        out.candidates = data ?? [];
        break;
      }
      case "endorsements": {
        const { data, error } = await supabase
          .from("endorsements")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(200);
        if (error) throw error;
        out.endorsements = data ?? [];
        break;
      }

      case "run_data": {
        if (!body.run_id) throw new Error("run_id required");
        const [{ data: au, error: e1 }, { data: su, error: e2 }] = await Promise.all([
          supabase.from("article_audits").select("*").eq("run_id", body.run_id).order("created_at", { ascending: false }),
          supabase.from("article_audit_summary").select("*").eq("run_id", body.run_id),
        ]);
        if (e1) throw e1;
        if (e2) throw e2;
        out.audits = au ?? [];
        out.summaries = su ?? [];
        break;
      }
      default:
        throw new Error("unknown resource");
    }

    return new Response(JSON.stringify(out), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
