// Cron tick: pops one queued item and processes it via process-remaster-queue.
// Triggered every 6 hours by pg_cron. Idempotent / safe to call manually.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const expected = Deno.env.get("REMASTER_ADMIN_PASSCODE");

    // Auth: fail-closed passcode check. pg_cron job must send the passcode
    // in the JSON body (`{"passcode":"..."}`) or the `x-admin-passcode`
    // header. Without a matching REMASTER_ADMIN_PASSCODE env var + caller
    // credential this endpoint returns 401 to every request.
    let passcode: string | null = req.headers.get("x-admin-passcode");
    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      passcode = body?.passcode ?? passcode;
    }
    if (!expected || passcode !== expected) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    // Pick next eligible queued item:
    // - live_article rows can always be processed (refine fetches content from DB)
    // - other types only if content was stored at enqueue time
    const { data: items, error } = await supabase
      .from("remaster_queue")
      .select("*")
      .eq("status", "queued")
      .order("priority", { ascending: false })
      .order("created_at", { ascending: true })
      .limit(20);
    if (error) throw new Error(error.message);

    const next = (items ?? []).find((i: any) => i.target_type === "live_article" || (typeof i.content === "string" && i.content.length > 0));
    if (!next) {
      return new Response(JSON.stringify({ success: true, message: "no eligible items" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const body: Record<string, unknown> = { item_id: next.id, passcode: expected };
    if (next.target_type !== "live_article" && next.content) {
      body.payload = { content: next.content, title: next.target_label };
    }

    const r = await fetch(`${supabaseUrl}/functions/v1/process-remaster-queue`, {
      method: "POST",
      headers: { Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json", "x-admin-passcode": expected ?? "" },
      body: JSON.stringify(body),
    });
    const result = await r.json().catch(() => ({}));
    return new Response(JSON.stringify({ success: r.ok, item_id: next.id, kind: next.target_type, result }), {
      status: r.ok ? 200 : 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[cron-remaster-tick]", msg);
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
