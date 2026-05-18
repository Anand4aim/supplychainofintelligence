// Pops the next queued item from remaster_queue and processes it.
// - live_article  → calls refine-live-article (in-place rewrite via critic loop)
// - everything else → critic-only pass; result stored in remaster_queue.result
//   (static content in /src/data/* — we never auto-rewrite files; author applies fixes)
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { FRAMEWORK_CONTEXT } from "../_shared/framework-context.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CRITIC_MODEL_A = "openai/gpt-5-mini";
const CRITIC_MODEL_B = "google/gemini-2.5-flash";

const STATIC_CRITIC_SYSTEM = `${FRAMEWORK_CONTEXT}

=== YOUR ROLE: STATIC CONTENT CRITIC ===

You are reviewing a piece of EXISTING PUBLISHED content (case study, law essay, prediction, layer page, or marketing page) against the FRAMEWORK CONTEXT above.

Your job is NOT to rewrite — the author will apply fixes by hand. Your job is to surface:
1. Wrong layer names (e.g. "L1 Cloud" instead of "L1 Data", "L4 Agents" instead of "L4 Access", "L8 Memory & Continuity" instead of "L8 Memory")
2. Wrong or made-up law titles (must be exactly: "Intelligence Commoditizes Downward", "Value Accrues at Bottlenecks", "Surface Captures Attention, Chain Captures Power")
3. "Agent" used as if it were a layer instead of decoded as L5+L7(+L8)
4. Loaded / non-structural language (hype, marketing fluff, vague hedges)
5. Missing depth: claims that lack a specific named company, mechanism, or unit-economics reason
6. Vocabulary drift from the canonical framework
7. Author bio violations (e.g. "Ex-Google" — Anand was at Meta/Instagram, never Google)
8. Tagline drift (canonical: "The Supply Chain of Intelligence™ — the 10 layers of the generative AI stack.")

For each issue: quote the offending excerpt verbatim, explain why it's wrong, and propose a tight rewrite that respects framework vocabulary. Be specific and ruthless — minor cosmetic issues count too, but flag them as "minor".`;

const STATIC_CRITIQUE_SCHEMA = {
  name: "static_critique",
  schema: {
    type: "object",
    properties: {
      overall_score: { type: "integer", minimum: 1, maximum: 10 },
      summary: { type: "string", description: "2-3 sentence verdict on the piece" },
      ship_as_is: { type: "boolean", description: "true if no meaningful changes needed" },
      issues: {
        type: "array",
        items: {
          type: "object",
          properties: {
            severity: { type: "string", enum: ["blocker", "major", "minor"] },
            category: { type: "string", enum: ["wrong-layer-name", "wrong-law", "agent-misuse", "loaded-language", "lacks-depth", "vocab-drift", "bio", "tagline", "other"] },
            excerpt: { type: "string" },
            why: { type: "string" },
            fix: { type: "string" },
          },
          required: ["severity", "category", "excerpt", "why", "fix"],
        },
      },
    },
    required: ["overall_score", "summary", "ship_as_is", "issues"],
  },
};

async function callGateway(model: string, system: string, user: string, schema: { name: string; schema: unknown }, key: string) {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: system }, { role: "user", content: user }],
      tools: [{ type: "function", function: { name: schema.name, description: "Structured response", parameters: schema.schema } }],
      tool_choice: { type: "function", function: { name: schema.name } },
    }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Gateway ${res.status} (${model}): ${txt}`);
  }
  const data = await res.json();
  const tc = data.choices?.[0]?.message?.tool_calls?.[0];
  if (!tc) throw new Error(`No tool call from ${model}`);
  return JSON.parse(tc.function.arguments);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const lovableKey = Deno.env.get("LOVABLE_API_KEY")!;
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Optional: caller may pass a specific item_id; otherwise we pop the next queued one
    let itemId: string | null = null;
    let payload: { content?: string; title?: string } | null = null;
    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      itemId = body.item_id ?? null;
      payload = body.payload ?? null;
    }

    // Pick next item
    const q = supabase.from("remaster_queue").select("*").eq("status", "queued")
      .order("priority", { ascending: false }).order("created_at", { ascending: true }).limit(1);
    const { data: items, error: pickErr } = itemId
      ? await supabase.from("remaster_queue").select("*").eq("id", itemId).limit(1)
      : await q;
    if (pickErr) throw new Error(pickErr.message);
    const item = items?.[0];
    if (!item) {
      return new Response(JSON.stringify({ success: true, message: "Queue empty" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Mark processing
    await supabase.from("remaster_queue").update({ status: "processing" }).eq("id", item.id);

    try {
      if (item.target_type === "live_article") {
        // Dispatch to existing in-place critic loop
        const r = await fetch(`${supabaseUrl}/functions/v1/refine-live-article`, {
          method: "POST",
          headers: { Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({ article_id: item.target_id }),
        });
        const result = await r.json();
        if (!r.ok || !result.success) throw new Error(result.error ?? `refine failed (${r.status})`);
        await supabase.from("remaster_queue").update({
          status: "done", result, processed_at: new Date().toISOString(),
        }).eq("id", item.id);
        return new Response(JSON.stringify({ success: true, item_id: item.id, kind: "live_article", result }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      // Static content critic-only pass — prefer caller-supplied payload, fall back to row.content
      const content = payload?.content ?? (typeof item.content === "string" ? item.content : null);
      if (!content) throw new Error("no content available (pass payload.content or store content on the queue row)");
      const userMsg = `TARGET: ${item.target_type} — ${item.target_label}\nID: ${item.target_id}\n\n=== CONTENT ===\n${content}`;
      const [a, b] = await Promise.all([
        callGateway(CRITIC_MODEL_A, STATIC_CRITIC_SYSTEM, userMsg, STATIC_CRITIQUE_SCHEMA, lovableKey),
        callGateway(CRITIC_MODEL_B, STATIC_CRITIC_SYSTEM, userMsg, STATIC_CRITIQUE_SCHEMA, lovableKey),
      ]);
      const result = {
        critic_a: { model: CRITIC_MODEL_A, ...a },
        critic_b: { model: CRITIC_MODEL_B, ...b },
        ship_as_is: !!(a.ship_as_is && b.ship_as_is),
        avg_score: Math.round(((a.overall_score ?? 0) + (b.overall_score ?? 0)) / 2),
      };
      await supabase.from("remaster_queue").update({
        status: "done", result, processed_at: new Date().toISOString(),
      }).eq("id", item.id);
      return new Response(JSON.stringify({ success: true, item_id: item.id, kind: "critique-only", result }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    } catch (innerErr) {
      const msg = innerErr instanceof Error ? innerErr.message : String(innerErr);
      await supabase.from("remaster_queue").update({
        status: "failed", error: msg, processed_at: new Date().toISOString(),
      }).eq("id", item.id);
      throw innerErr;
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[remaster] error:", msg);
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
