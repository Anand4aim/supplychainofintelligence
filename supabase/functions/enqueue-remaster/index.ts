// Insert items into remaster_queue via service role (avoids exposing write RLS).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const VALID_TYPES = ["live_article", "case_study", "law_essay", "prediction", "layer", "page"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const body = await req.json();
    const items: Array<{ target_type: string; target_id: string; target_label: string; priority?: number; notes?: string }> = body.items ?? [];
    if (!Array.isArray(items) || items.length === 0) throw new Error("items[] required");
    for (const it of items) {
      if (!VALID_TYPES.includes(it.target_type)) throw new Error(`bad target_type: ${it.target_type}`);
      if (!it.target_id || !it.target_label) throw new Error("target_id and target_label required");
      if (it.target_id.length > 200 || it.target_label.length > 300) throw new Error("id/label too long");
    }

    // Only queue items that don't already have a queued/processing row
    const { data: existing } = await supabase.from("remaster_queue")
      .select("target_type,target_id,status")
      .in("status", ["queued", "processing"]);
    const taken = new Set((existing ?? []).map((r) => `${r.target_type}::${r.target_id}`));
    const toInsert = items
      .filter((i) => !taken.has(`${i.target_type}::${i.target_id}`))
      .map((i) => ({
        target_type: i.target_type,
        target_id: i.target_id,
        target_label: i.target_label,
        priority: i.priority ?? 0,
        notes: i.notes ?? null,
        status: "queued",
      }));

    if (toInsert.length === 0) {
      return new Response(JSON.stringify({ success: true, inserted: 0, skipped: items.length }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const { error } = await supabase.from("remaster_queue").insert(toInsert);
    if (error) throw new Error(error.message);

    return new Response(JSON.stringify({ success: true, inserted: toInsert.length, skipped: items.length - toInsert.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
