// Audit one article with one LLM critic, structured-output, sublayer-deep.
// Idempotent per (article_id, run_id, model). Writes article_audits row, then
// recomputes article_audit_summary if all configured models have completed.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { FRAMEWORK_CONTEXT } from "../_shared/framework-context.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ALL_LAYERS = ["L-1","L0","L1","L2","L3","L4","L5","L6","L7","L8"];
const ALL_SUBLAYERS = [
  "L-1a","L-1b","L-1c","L-1d","L-1e",
  "L0a","L0b","L0c","L0d","L0e",
  "L1a","L1b","L1c","L1d","L1e",
  "L2a","L2b","L2c","L2d","L2e",
  "L3a","L3b","L3c","L3d","L3e",
  "L4a","L4b","L4c","L4d","L4e",
  "L5a","L5b","L5c","L5d","L5e",
  "L6a","L6b","L6c","L6d","L6e",
  "L7a","L7b","L7c","L7d","L7e",
  "L8a","L8b","L8c","L8d","L8e",
];

// Ten critical lenses scored 0-100 each. Composite score = weighted blend.
const DIMENSIONS = [
  { id: "framework_fidelity",  weight: 0.18, desc: "Are the 10 layers, 50 sublayers, and 4 Laws applied correctly? Agent decoded to L5+L6? Trust to L3? Memory to L8? No invented IDs. Foundational — wrong here drags everything." },
  { id: "thesis_sharpness",    weight: 0.12, desc: "Is the central claim crisp, non-obvious, and falsifiable? Can you state it in one sentence? Or is it mush, restating the news?" },
  { id: "evidence_rigor",      weight: 0.11, desc: "Are claims grounded in specifics — named companies, numbers, primary sources? Or hand-wave and adjectives?" },
  { id: "predictive_power",    weight: 0.10, desc: "Does the article make a forecast that could be checked later? Does it hold a view the consensus doesn't? Or is it pure post-hoc narration?" },
  { id: "originality",         weight: 0.10, desc: "Is the insight differentiated vs. the commodity hot-take you'd read on TechCrunch / Twitter? Or recycled consensus dressed in layer tags?" },
  { id: "strategic_depth",     weight: 0.12, desc: "Does it work the cross-layer dynamics — moats, gatekeeping, separation of generation/verification, second-order effects, who captures value where?" },
  { id: "tone_discipline",     weight: 0.07, desc: "Stratechery + McKinsey voice. No hype, no clickbait, no breathless 'agent revolution'. Authoritative, calm, specific. Penalize bombast." },
  { id: "editorial_craft",     weight: 0.07, desc: "Prose quality, paragraph rhythm, headline-sub-body alignment, no filler. Would a paying subscriber respect this?" },
  { id: "actionability",       weight: 0.07, desc: "Does a PM, founder, or investor walk away with a decision, a watchlist item, or a sharpened mental model? Or just vibes?" },
  { id: "risk_calibration",    weight: 0.06, desc: "Is the counter-thesis honest? Does the article say what would break its claim, who could win the other side, what the article might be wrong about?" },
];
const DIM_IDS = DIMENSIONS.map(d => d.id);

const AUDIT_SCHEMA = {
  name: "framework_audit",
  schema: {
    type: "object",
    properties: {
      score: { type: "integer", minimum: 0, maximum: 100, description: "Composite quality score. 0 = wrong framework mapping & weak prose. 100 = canonical framing, sharp prose, defensible take." },
      severity: { type: "string", enum: ["critical","needs_fix","minor","ok"], description: "critical = factual framework error (e.g. agent mis-mapped); needs_fix = missing required layer/sublayer; minor = could be enriched; ok = sound." },
      checklist: { type: "array", description: "Before scoring, list the 3-5 framework rules you will check this article against (e.g. 'Agent decoder must include L5+L6', 'Trust story must tag L3', 'Memory claim must tag L8').", items: { type: "string" } },
      proposed_layers: { type: "array", description: "Layers (L-1..L8) the article SHOULD be tagged with given its substance. Use only canonical IDs.", items: { type: "string", enum: ALL_LAYERS } },
      proposed_sublayers: { type: "array", description: "Sublayers (L-1a..L8e) the article SHOULD be tagged with. Walk all 50 sublayers and include only those whose substance the article actually touches. Aim for 3-8 sublayers — be brutal.", items: { type: "string", enum: ALL_SUBLAYERS } },
      flaws: {
        type: "array",
        description: "Specific framework flaws in the current article. Each grounded in an evidence_quote.",
        items: {
          type: "object",
          properties: {
            type: { type: "string", enum: ["mis_mapped_layer","missing_layer","missing_sublayer","wrong_verdict","weak_proof","agent_confusion","tone_violation","factual_drift","missing_law_application","other"] },
            severity: { type: "string", enum: ["critical","high","medium","low"] },
            layer: { type: "string", description: "Layer or sublayer ID this flaw is about, or empty.", default: "" },
            reason: { type: "string", description: "1-2 sentence diagnosis." },
            evidence_quote: { type: "string", description: "Verbatim excerpt from the article that proves this flaw exists." },
          },
          required: ["type","severity","reason"],
        },
      },
      fixes: {
        type: "array",
        description: "Concrete proposed fixes, one per flaw or grouped where related.",
        items: {
          type: "object",
          properties: {
            kind: { type: "string", enum: ["replace_text","add_layer_tag","remove_layer_tag","add_sublayer_tag","change_verdict","add_law_reference","rewrite_passage"] },
            before: { type: "string", description: "Current text/tag." },
            after: { type: "string", description: "Proposed text/tag." },
            rationale: { type: "string" },
          },
          required: ["kind","after","rationale"],
        },
      },
      suggested_headline: { type: "string", description: "If the headline is wrong/weak/clickbait, propose a better one. Otherwise return empty string." },
      suggested_subheadline: { type: "string", description: "If the subheadline is wrong/weak, propose a better one (one sentence, sharp thesis). Otherwise empty string." },
      verdict_check: {
        type: "object",
        properties: {
          agrees: { type: "boolean", description: "Does the current verdict (DOMINANT/SAFE/CONTESTED/DEAD) match what the framework would predict?" },
          should_be: { type: "string", enum: ["DOMINANT","SAFE","CONTESTED","DEAD"] },
          why: { type: "string" },
        },
        required: ["agrees","should_be","why"],
      },
      evidence_quotes: { type: "array", description: "3-6 verbatim quotes from the article that grounded the audit.", items: { type: "string" } },
      laws_applied: { type: "array", description: "Which of the 4 Laws the article actually applies (by Roman numeral).", items: { type: "string", enum: ["I","II","III","IV"] } },
      laws_missed: { type: "array", description: "Laws the article SHOULD have applied but didn't.", items: { type: "string", enum: ["I","II","III","IV"] } },
    },
    required: ["score","severity","checklist","proposed_layers","proposed_sublayers","flaws","fixes","verdict_check","evidence_quotes","laws_applied","laws_missed"],
  },
};

const SYSTEM_PROMPT = `${FRAMEWORK_CONTEXT}

=== YOUR ROLE: SENIOR FRAMEWORK CRITIC ===

You are auditing a previously published article on supplychainofai.com against the canonical Supply Chain of Intelligence™ framework. You are NOT writing a new article. You are checking the existing one for framework accuracy at sublayer depth.

Your job:
1. Walk the article's substance against the 10 layers and all 50 sublayers.
2. Identify EVERY framework mis-mapping (especially the agent→L4 confusion that is currently the most common error).
3. Ground every flaw in a verbatim quote from the article. No flaw without evidence.
4. Score 0–100. Be honest. A factually wrong layer tag is critical (severity=critical, score<40). Missing a required layer is needs_fix (score 40–69). Minor enrichment opportunities are minor (70–89). Sound = ok (90+).
5. Propose CONCRETE fixes (add/remove specific layer tags, rewrite headline/sub, change verdict).
6. Confirm or challenge the verdict (DOMINANT/SAFE/CONTESTED/DEAD).
7. Check which of the 4 Laws the article applies, and which it MISSED.

Discipline:
- Be brutal but specific. Vague critique is worse than no critique.
- "Agent" is the #1 trap. If the article uses "agent" and doesn't tag L5+L6, that's a critical flaw — every time.
- Use canonical IDs only (L-1, L0…L8 and L-1a…L8e). Never invent IDs.
- proposed_sublayers must be a tight 3–8 IDs, not a maximalist list.`;

async function callCritic(model: string, lovableKey: string, article: any) {
  const articleBlock = `
HEADLINE: ${article.headline}
SUBHEADLINE: ${article.subheadline ?? ""}
VERDICT (current): ${article.verdict}
VERTICAL (current): ${article.vertical ?? "—"}
CURRENT LAYER TAGS: ${JSON.stringify(article.analysis?.cube_position?.layers ?? [])}
CURRENT FUNCTIONS: ${JSON.stringify(article.analysis?.cube_position?.functions ?? [])}
CURRENT VERTICALS: ${JSON.stringify(article.analysis?.cube_position?.verticals ?? [])}

NEWS SUMMARY:
${article.news_summary}

STRUCTURAL TAKE:
${article.analysis?.structural_take ?? "(not present)"}

SECOND-ORDER EFFECTS:
${article.analysis?.second_order_effects ?? "(not present)"}

VERTICAL LENS:
${article.analysis?.vertical_lens ?? "(not present)"}

DEEP PRODUCT LENS:
${article.analysis?.deep_product_lens ?? "(not present)"}

DEEP STRATEGY LENS:
${article.analysis?.deep_strategy_lens ?? "(not present)"}

COUNTER-THESIS:
${article.analysis?.counter_thesis ?? "(not present)"}

LINKEDIN POST:
${article.linkedin_post ?? "(not present)"}
`.trim();

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${lovableKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Audit this published article. First write your checklist (3–5 framework rules you'll apply), then walk the 50 sublayers, then output the structured audit.\n\n${articleBlock}` },
      ],
      tools: [{ type: "function", function: { name: AUDIT_SCHEMA.name, description: "Return the structured framework audit", parameters: AUDIT_SCHEMA.schema } }],
      tool_choice: { type: "function", function: { name: AUDIT_SCHEMA.name } },
    }),
  });
  if (!res.ok) {
    const txt = await res.text();
    if (res.status === 429) throw new Error("RATE_LIMIT");
    if (res.status === 402) throw new Error("CREDITS_EXHAUSTED");
    throw new Error(`AI Gateway ${res.status}: ${txt.slice(0, 500)}`);
  }
  const data = await res.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  if (!toolCall) throw new Error("No tool call returned");
  return JSON.parse(toolCall.function.arguments);
}

function jaccard(a: string[], b: string[]) {
  const sa = new Set(a), sb = new Set(b);
  const inter = [...sa].filter(x => sb.has(x)).length;
  const union = new Set([...sa, ...sb]).size;
  return union === 0 ? 1 : inter / union;
}

async function recomputeSummary(supabase: any, articleId: string, runId: string, modelsExpected: string[]) {
  const { data: rows } = await supabase
    .from("article_audits")
    .select("*")
    .eq("article_id", articleId)
    .eq("run_id", runId)
    .eq("status", "complete");
  if (!rows || rows.length === 0) return;

  // Only finalize if all expected models have completed (or just compute incrementally)
  const modelsRun = rows.map((r: any) => r.model);
  const composite = Math.round(rows.reduce((s: number, r: any) => s + r.score, 0) / rows.length);
  // Worst severity wins
  const rank: Record<string, number> = { critical: 3, needs_fix: 2, minor: 1, ok: 0 };
  const worst = rows.reduce((acc: string, r: any) => rank[r.severity] > rank[acc] ? r.severity : acc, "ok");

  let layerJ: number | null = null, subJ: number | null = null, verdictAgree: boolean | null = null;
  const disagreements: any[] = [];
  if (rows.length >= 2) {
    const [a, b] = rows;
    layerJ = jaccard(a.proposed_layers ?? [], b.proposed_layers ?? []);
    subJ = jaccard(a.proposed_sublayers ?? [], b.proposed_sublayers ?? []);
    verdictAgree = a.verdict_check?.should_be === b.verdict_check?.should_be;
    if (!verdictAgree) disagreements.push({ field: "verdict", values: [a.verdict_check?.should_be, b.verdict_check?.should_be] });
    const layerDiff = [...new Set([...(a.proposed_layers ?? []), ...(b.proposed_layers ?? [])])]
      .filter(l => (a.proposed_layers ?? []).includes(l) !== (b.proposed_layers ?? []).includes(l));
    if (layerDiff.length) disagreements.push({ field: "layers", only_in_a: a.proposed_layers.filter((x: string) => !b.proposed_layers.includes(x)), only_in_b: b.proposed_layers.filter((x: string) => !a.proposed_layers.includes(x)) });
  }

  // Consensus = layers/sublayers proposed by at least half the critics
  const layerCount: Record<string, number> = {};
  const subCount: Record<string, number> = {};
  for (const r of rows) {
    for (const l of r.proposed_layers ?? []) layerCount[l] = (layerCount[l] ?? 0) + 1;
    for (const s of r.proposed_sublayers ?? []) subCount[s] = (subCount[s] ?? 0) + 1;
  }
  const threshold = Math.ceil(rows.length / 2);
  const consensusLayers = Object.entries(layerCount).filter(([, c]) => c >= threshold).map(([l]) => l);
  const consensusSubs = Object.entries(subCount).filter(([, c]) => c >= threshold).map(([s]) => s);

  await supabase.from("article_audit_summary").upsert({
    article_id: articleId,
    run_id: runId,
    composite_score: composite,
    composite_severity: worst,
    layer_jaccard: layerJ,
    sublayer_jaccard: subJ,
    verdict_agreement: verdictAgree,
    models_run: modelsRun,
    consensus_layers: consensusLayers,
    consensus_sublayers: consensusSubs,
    disagreements,
  }, { onConflict: "article_id,run_id" });

  void modelsExpected;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const lovableKey = Deno.env.get("LOVABLE_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const passcodeExpected = Deno.env.get("REMASTER_ADMIN_PASSCODE");
    if (!lovableKey || !supabaseUrl || !serviceKey) throw new Error("Missing env");

    const body = await req.json();
    const { article_id, run_id, model, passcode, models_expected } = body ?? {};
    if (!article_id || !run_id || !model) return new Response(JSON.stringify({ error: "article_id, run_id, model required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (passcodeExpected && passcode !== passcodeExpected) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const supabase = createClient(supabaseUrl, serviceKey);
    const { data: article, error: aerr } = await supabase.from("live_articles").select("*").eq("id", article_id).maybeSingle();
    if (aerr || !article) throw new Error(`Article not found: ${article_id}`);

    // Skip if already complete for this (article, run, model)
    const { data: existing } = await supabase.from("article_audits")
      .select("id, status").eq("article_id", article_id).eq("run_id", run_id).eq("model", model).maybeSingle();
    if (existing?.status === "complete") {
      return new Response(JSON.stringify({ ok: true, skipped: "already_complete" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    let audit: any;
    try {
      audit = await callCritic(model, lovableKey, article);
    } catch (e) {
      await supabase.from("article_audits").upsert({
        article_id, run_id, model, status: "failed",
        score: 0, severity: "needs_fix",
        current_layers: article.analysis?.cube_position?.layers ?? [],
        proposed_layers: [], proposed_sublayers: [], flaws: [], fixes: [],
        verdict_check: {}, evidence_quotes: [],
        error: e instanceof Error ? e.message : String(e),
      });
      throw e;
    }

    await supabase.from("article_audits").upsert({
      article_id, run_id, model, status: "complete",
      score: audit.score,
      severity: audit.severity,
      current_layers: article.analysis?.cube_position?.layers ?? [],
      proposed_layers: audit.proposed_layers ?? [],
      current_sublayers: [], // we don't currently track sublayer tags on articles
      proposed_sublayers: audit.proposed_sublayers ?? [],
      flaws: audit.flaws ?? [],
      fixes: audit.fixes ?? [],
      suggested_headline: audit.suggested_headline || null,
      suggested_subheadline: audit.suggested_subheadline || null,
      verdict_check: audit.verdict_check ?? {},
      evidence_quotes: audit.evidence_quotes ?? [],
      raw_critique: JSON.stringify({ checklist: audit.checklist, laws_applied: audit.laws_applied, laws_missed: audit.laws_missed }),
    });

    await recomputeSummary(supabase, article_id, run_id, models_expected ?? [model]);

    return new Response(JSON.stringify({ ok: true, score: audit.score, severity: audit.severity }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("[audit-article] error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
