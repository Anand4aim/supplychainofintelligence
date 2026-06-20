// Critic loop: takes a draft live_articles row, runs 2 critics + an enhancer,
// up to N rounds. Each round logged to article_revisions. Final accepted draft
// is written back to live_articles.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { FRAMEWORK_CONTEXT } from "../_shared/framework-context.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MODELS = {
  enhancer: "google/gemini-2.5-pro",
  criticA: "openai/gpt-5-mini",
  criticB: "google/gemini-2.5-flash",
};
const MAX_ROUNDS = 2;
const ACCEPT_THRESHOLD = 8; // both critics ≥ 8/10 → stop early

const CRITIC_A_SYSTEM = `${FRAMEWORK_CONTEXT}

=== YOUR ROLE: CRITIC A, DEPTH & TONE ENFORCER ===

You are a brutally honest senior product/strategy editor reviewing a Stratechery-grade analysis against the FRAMEWORK CONTEXT above. Enforce:
- DEPTH RULES (why-twice, specific names, unit economics, non-obvious, takes a position, builder language).
- TONE GUARDRAILS (no loaded words; prefer structural hedged language).
- SCORING DISCIPLINE (most layers intensity 0; ≤5 layers > 0; ≤2 at intensity 3; sublayer counts respect intensity).
- LAYER NAMES (use canonical names from the framework, flag any wrong name like "L1 Cloud" or "L4 Agents").
- "AGENT" CONVENTION (must be decoded into L5+L7(+L8), never used as a layer).

Return a JSON critique. Be specific, quote the offending sentence and propose a tighter rewrite that respects the framework vocabulary.`;

const CRITIC_B_SYSTEM = `${FRAMEWORK_CONTEXT}

=== YOUR ROLE: CRITIC B, STRUCTURAL RIGOR ===

You are a senior strategy analyst reviewing a Stratechery-grade piece for STRUCTURAL RIGOR against the FRAMEWORK CONTEXT above. Check:
(1) Are the 3 Laws cited by their CANONICAL titles (Intelligence Commoditizes Downward / Value Accrues at Bottlenecks / Surface Captures Attention, Chain Captures Power) and applied by mechanism in structural_take?
(2) Is the scarcest layer being claimed actually named?
(3) Is the counter_thesis genuinely steelmanned, not a strawman?
(4) Are second_order_effects 2-3 moves downstream, not obvious first-order takes?
(5) Are who_wins / who_loses NAMED specific companies with concrete reasons?
(6) Does cube_position.layers match layers with intensity > 0 in layer_scores?
(7) Are the Defensible Triangle slices (L1b / L5a,b,d / L8c,d,e) credited correctly when claimed?

Return a JSON critique with specific line-level issues and proposed fixes that respect framework vocabulary.`;

const CRITIQUE_SCHEMA = {
  name: "critique",
  schema: {
    type: "object",
    properties: {
      overall_score: { type: "integer", minimum: 1, maximum: 10, description: "1=publish only after major rewrite, 10=ship as-is" },
      ship_it: { type: "boolean", description: "True if you'd publish as-is" },
      summary: { type: "string", description: "2-3 sentence verdict" },
      issues: {
        type: "array",
        description: "Specific problems. Each with the field name, the offending excerpt, why it's wrong, and a tighter rewrite suggestion.",
        items: {
          type: "object",
          properties: {
            field: { type: "string", description: "Which field has the issue: headline, subheadline, structural_take, why_now, second_order_effects, counter_thesis, vertical_lens, deep_product_lens, deep_strategy_lens, layer_scores, cube_position, who_wins, who_loses, what_to_watch, linkedin_post" },
            severity: { type: "string", enum: ["blocker", "major", "minor"] },
            excerpt: { type: "string" },
            why: { type: "string" },
            fix: { type: "string" }
          },
          required: ["field", "severity", "why", "fix"]
        }
      }
    },
    required: ["overall_score", "ship_it", "summary", "issues"]
  }
};

const ENHANCER_SYSTEM = `${FRAMEWORK_CONTEXT}

=== YOUR ROLE: ENHANCER (LEAD ANALYST, REVISION PASS) ===

You are the lead analyst rewriting your own Stratechery-grade analysis using critic feedback. You will receive the current draft and two structured critiques. Apply the fixes that are valid; ignore fixes that would weaken the piece. Preserve layer_scores math unless a critic explicitly challenges intensity numbers with reasoning.

Return the FULL framework analysis in the same schema as the original. Every required field. Do not skip fields you didn't change, return them verbatim.

All revisions MUST conform to the FRAMEWORK CONTEXT above: canonical layer names (L1 Data, L4 Access, L8 Memory, etc.), canonical Law titles, scoring discipline, tone guardrails, "agent" decoded as L5+L7(+L8).`;

// Same analysis schema as generate-live-article (kept in sync manually, small).
const ANALYSIS_SCHEMA = {
  name: "framework_analysis",
  schema: {
    type: "object",
    properties: {
      headline: { type: "string" },
      subheadline: { type: "string" },
      news_summary: { type: "string" },
      source_urls: { type: "array", items: { type: "string" } },
      verdict: { type: "string", enum: ["DOMINANT", "SAFE", "CONTESTED", "DEAD"] },
      vertical: { type: "string" },
      layer_scores: {
        type: "array",
        items: {
          type: "object",
          properties: {
            layer: { type: "string" },
            owned: { type: "boolean" },
            intensity: { type: "integer", minimum: 0, maximum: 3 },
            note: { type: "string" },
            sublayers: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  impact: { type: "integer", minimum: 1, maximum: 3 },
                  who: { type: "string" }
                },
                required: ["name", "impact", "who"]
              }
            }
          },
          required: ["layer", "owned", "intensity", "note", "sublayers"]
        }
      },
      cube_position: {
        type: "object",
        properties: {
          functions: { type: "array", items: { type: "string" } },
          verticals: { type: "array", items: { type: "string" } },
          layers: { type: "array", items: { type: "string" } }
        },
        required: ["functions", "verticals", "layers"]
      },
      why_now: { type: "string" },
      structural_take: { type: "string" },
      second_order_effects: { type: "string" },
      who_wins: { type: "array", items: { type: "object", properties: { name: { type: "string" }, reason: { type: "string" } }, required: ["name", "reason"] } },
      who_loses: { type: "array", items: { type: "object", properties: { name: { type: "string" }, reason: { type: "string" } }, required: ["name", "reason"] } },
      vertical_lens: { type: "string" },
      deep_product_lens: { type: "string" },
      deep_strategy_lens: { type: "string" },
      counter_thesis: { type: "string" },
      what_to_watch: { type: "array", items: { type: "string" } },
      new_law_candidate: { type: "string" },
      linkedin_post: { type: "string" }
    },
    required: ["headline", "subheadline", "news_summary", "source_urls", "verdict", "vertical", "layer_scores", "cube_position", "why_now", "structural_take", "second_order_effects", "who_wins", "who_loses", "vertical_lens", "deep_product_lens", "deep_strategy_lens", "counter_thesis", "what_to_watch", "new_law_candidate", "linkedin_post"]
  }
};

async function callGateway(model: string, system: string, user: string, tool: { name: string; schema: unknown }, lovableKey: string) {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${lovableKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      tools: [{ type: "function", function: { name: tool.name, description: "Structured response", parameters: tool.schema } }],
      tool_choice: { type: "function", function: { name: tool.name } },
    }),
  });
  if (!res.ok) {
    const txt = await res.text();
    if (res.status === 429) throw new Error(`RATE_LIMIT (${model}): ${txt}`);
    if (res.status === 402) throw new Error(`CREDITS (${model}): ${txt}`);
    throw new Error(`Gateway ${res.status} (${model}): ${txt}`);
  }
  const data = await res.json();
  const tc = data.choices?.[0]?.message?.tool_calls?.[0];
  if (!tc) throw new Error(`No tool call from ${model}`);
  return JSON.parse(tc.function.arguments);
}

function draftFromArticle(row: Record<string, unknown>) {
  const a = (row.analysis ?? {}) as Record<string, unknown>;
  return {
    headline: row.headline,
    subheadline: row.subheadline,
    news_summary: row.news_summary,
    source_urls: row.source_urls ?? [],
    verdict: row.verdict,
    vertical: row.vertical,
    linkedin_post: row.linkedin_post,
    ...a,
  };
}

function articleUpdateFromDraft(draft: Record<string, unknown>) {
  return {
    headline: draft.headline,
    subheadline: draft.subheadline,
    news_summary: draft.news_summary,
    source_urls: draft.source_urls ?? [],
    verdict: draft.verdict,
    vertical: draft.vertical,
    linkedin_post: draft.linkedin_post,
    analysis: {
      layer_scores: draft.layer_scores,
      cube_position: draft.cube_position,
      why_now: draft.why_now,
      structural_take: draft.structural_take,
      second_order_effects: draft.second_order_effects,
      who_wins: draft.who_wins ?? [],
      who_loses: draft.who_loses ?? [],
      vertical_lens: draft.vertical_lens,
      deep_product_lens: draft.deep_product_lens,
      deep_strategy_lens: draft.deep_strategy_lens,
      counter_thesis: draft.counter_thesis,
      what_to_watch: draft.what_to_watch ?? [],
      new_law_candidate: draft.new_law_candidate,
    },
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const lovableKey = Deno.env.get("LOVABLE_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const expected = Deno.env.get("REMASTER_ADMIN_PASSCODE");
    if (!lovableKey || !supabaseUrl || !serviceKey) throw new Error("Missing env vars");

    const body = await req.json().catch(() => ({}));
    const passcode = body?.passcode ?? req.headers.get("x-admin-passcode");
    if (!expected || passcode !== expected) {
      return new Response(JSON.stringify({ success: false, error: "unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const article_id = body?.article_id;
    if (!article_id) throw new Error("article_id required");

    const supabase = createClient(supabaseUrl, serviceKey);
    const { data: article, error: fetchErr } = await supabase
      .from("live_articles").select("*").eq("id", article_id).single();
    if (fetchErr || !article) throw new Error(`Article not found: ${fetchErr?.message}`);

    let draft = draftFromArticle(article);
    let finalRound = 0;
    let acceptedScore = { a: 0, b: 0 };

    for (let round = 1; round <= MAX_ROUNDS; round++) {
      finalRound = round;
      const draftJson = JSON.stringify(draft, null, 2);

      console.log(`[refine] round ${round}: critics running`);
      const [critiqueA, critiqueB] = await Promise.all([
        callGateway(MODELS.criticA, CRITIC_A_SYSTEM,
          `Review this draft analysis. Return your critique:\n\n${draftJson}`,
          CRITIQUE_SCHEMA, lovableKey),
        callGateway(MODELS.criticB, CRITIC_B_SYSTEM,
          `Review this draft analysis for structural rigor. Return your critique:\n\n${draftJson}`,
          CRITIQUE_SCHEMA, lovableKey),
      ]);

      acceptedScore = { a: critiqueA.overall_score ?? 0, b: critiqueB.overall_score ?? 0 };
      const shipIt = critiqueA.ship_it && critiqueB.ship_it &&
                     acceptedScore.a >= ACCEPT_THRESHOLD && acceptedScore.b >= ACCEPT_THRESHOLD;

      // Log this round's critique snapshot
      await supabase.from("article_revisions").insert({
        article_id, round, stage: "critique",
        draft, critic_a: critiqueA, critic_b: critiqueB,
        critic_a_score: acceptedScore.a, critic_b_score: acceptedScore.b,
        models: { critic_a: MODELS.criticA, critic_b: MODELS.criticB },
        accepted: shipIt,
        notes: shipIt ? "Both critics shipped it" : `scores a=${acceptedScore.a} b=${acceptedScore.b}`,
      });

      if (shipIt) {
        console.log(`[refine] round ${round}: shipped (a=${acceptedScore.a}, b=${acceptedScore.b})`);
        break;
      }

      // No blockers/majors → don't waste an enhancer call
      const hasWork = [critiqueA, critiqueB].some(c =>
        (c.issues ?? []).some((i: { severity: string }) => i.severity === "blocker" || i.severity === "major"));
      if (!hasWork) {
        console.log(`[refine] round ${round}: only minor issues, accepting`);
        break;
      }

      if (round === MAX_ROUNDS) {
        console.log(`[refine] round ${round}: max rounds reached, accepting current draft`);
        break;
      }

      console.log(`[refine] round ${round}: enhancing`);
      const enhancePrompt = `CURRENT DRAFT:\n${draftJson}\n\nCRITIQUE A (depth + tone):\n${JSON.stringify(critiqueA, null, 2)}\n\nCRITIQUE B (structural rigor):\n${JSON.stringify(critiqueB, null, 2)}\n\nReturn the full revised analysis in the framework_analysis schema. Apply valid fixes, reject weakening ones, preserve all required fields.`;
      draft = await callGateway(MODELS.enhancer, ENHANCER_SYSTEM, enhancePrompt, ANALYSIS_SCHEMA, lovableKey);

      await supabase.from("article_revisions").insert({
        article_id, round, stage: "enhanced",
        draft, models: { enhancer: MODELS.enhancer },
        accepted: false, notes: "Enhanced draft, will re-critique next round",
      });
    }

    // Persist the final draft back to live_articles
    const update = articleUpdateFromDraft(draft);
    const { error: updateErr } = await supabase.from("live_articles").update(update).eq("id", article_id);
    if (updateErr) throw new Error(`Update failed: ${updateErr.message}`);

    return new Response(JSON.stringify({
      success: true, article_id, rounds: finalRound,
      final_scores: acceptedScore,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[refine] error:", msg);
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
