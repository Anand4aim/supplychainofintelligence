// Defensibility Audit — public tool.
// Pipeline: Perplexity research -> GPT-5-mini drafter -> Gemini-2.5-pro critic -> reconcile.
// Returns a structured framework-native verdict. If public data is thin, short-circuits
// to a NO_DATA response rather than hallucinating.
import { FRAMEWORK_CONTEXT } from "../_shared/framework-context.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ALL_LAYERS = ["L-1", "L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"];
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

const PPLX_KEY = Deno.env.get("PERPLEXITY_API_KEY");
const LOVABLE_KEY = Deno.env.get("LOVABLE_API_KEY");

async function research(company: string, userContext?: string): Promise<{ text: string; insufficient: boolean }> {
  if (!PPLX_KEY) return { text: userContext || "", insufficient: !userContext };
  const q = `Research the company "${company}" as an AI / software product analyst. Cover:
1. What product(s) they ship and who the customer is.
2. Underlying AI models (foundation models they use, any proprietary models they trained).
3. Data assets (proprietary datasets, customer data, behavioral data, integrations).
4. Workflow depth (do they do narrow execution or deep multi-step workflows? agents?).
5. Memory / personalization (do they remember across sessions, per-user, per-org?).
6. Distribution channels and major integrations.
7. Compliance / trust posture (SOC2, HIPAA, audit, eval, safety).
8. Funding stage, lead investors, last round.
${userContext ? `\nADDITIONAL CONTEXT FROM USER (use this, but verify against public data):\n${userContext}\n` : ""}
If you cannot find substantive public information on this company, say "INSUFFICIENT_PUBLIC_DATA" at the top and explain what you could not find.
Cite specific products, customers, contracts, headcount, numbers when possible. No hype.`;

  try {
    const r = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${PPLX_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: "You are a rigorous tech-industry analyst. Cite specifics. If data is thin, say so explicitly." },
          { role: "user", content: q },
        ],
        temperature: 0.2,
        max_tokens: 1400,
      }),
    });
    if (!r.ok) return { text: userContext || "", insufficient: !userContext };
    const j = await r.json();
    const text: string = j.choices?.[0]?.message?.content ?? "";
    // Only treat as insufficient if the marker appears at the very top (first 200 chars),
    // not anywhere in the body (Perplexity often says "this is NOT an INSUFFICIENT_PUBLIC_DATA case").
    const head = text.trim().slice(0, 200);
    const insufficient = /^\s*INSUFFICIENT_PUBLIC_DATA\b/i.test(head) || text.trim().length < 300;
    return { text, insufficient };
  } catch {
    return { text: userContext || "", insufficient: !userContext };
  }
}

const AUDIT_SCHEMA = {
  type: "object",
  properties: {
    verdict_tier: { type: "string", enum: ["fortress", "tilting_fortress", "mixed", "exposed", "wrapper_at_risk", "insufficient_data"] },
    score: { type: "integer", minimum: 0, maximum: 100, description: "Composite defensibility. 80+=fortress, 60-79=tilting, 40-59=mixed, 20-39=exposed, <20=wrapper." },
    one_line: { type: "string", description: "One-sentence verdict in Stratechery voice. Name the layers." },
    domain: { type: "string", description: "Short domain/vertical label (e.g. 'Legal AI', 'CX Agents', 'Dev Tools')." },
    layers_owned: { type: "array", items: { type: "string", enum: ALL_LAYERS }, description: "Layers the company structurally owns or is meaningfully building toward. Be brutal — max 4." },
    layers_rented: { type: "array", items: { type: "string", enum: ALL_LAYERS }, description: "Layers they depend on but do not own. This is their risk list." },
    sublayer_claims: {
      type: "array",
      description: "3-7 specific sublayer claims with confidence. Cite evidence from research.",
      items: {
        type: "object",
        properties: {
          sublayer: { type: "string", enum: ALL_SUBLAYERS },
          confidence: { type: "string", enum: ["high", "medium", "low"] },
          evidence: { type: "string", description: "1 sentence pointing to a specific product feature, customer, or fact from research." },
        },
        required: ["sublayer", "confidence", "evidence"],
      },
    },
    sublayer_gaps: {
      type: "array",
      description: "2-4 SPECIFIC sublayers the company should own but doesn't yet. Cite the exact sublayer ID.",
      items: {
        type: "object",
        properties: {
          sublayer: { type: "string", enum: ALL_SUBLAYERS },
          why: { type: "string", description: "1 sentence: why this sublayer matters for their domain and what happens if they don't get it." },
        },
        required: ["sublayer", "why"],
      },
    },
    triangle: {
      type: "object",
      description: "Defensible Triangle status. true = structurally present today, partial = building, false = absent.",
      properties: {
        proprietary_data: { type: "string", enum: ["true", "partial", "false"] },
        deep_execution: { type: "string", enum: ["true", "partial", "false"] },
        compounding_memory: { type: "string", enum: ["true", "partial", "false"] },
      },
      required: ["proprietary_data", "deep_execution", "compounding_memory"],
    },
    archetype: {
      type: "string",
      enum: ["Foundation Fortress", "Data Moat", "Workflow Owner", "Trust Gatekeeper", "Memory Compounder", "Surface Wrapper"],
      description: "Closest of the 6 archetypes.",
    },
    laws_triggered: {
      type: "array",
      items: { type: "string", enum: ["Law I", "Law II", "Law III", "Law IV"] },
      description: "Which structural laws apply most directly.",
    },
    strengths: { type: "array", items: { type: "string" }, description: "2-3 specific structural strengths." },
    risks: { type: "array", items: { type: "string" }, description: "2-3 specific compression risks. Name who absorbs them." },
    competitive_landscape: {
      type: "object",
      description: "Who eats their lunch, layer by layer.",
      properties: {
        adjacent_players: {
          type: "array",
          description: "2-4 named competitors. Each tied to the layer/sublayer where they collide.",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              collides_at: { type: "string", description: "Layer or sublayer ID, e.g. L5b or L7." },
              note: { type: "string", description: "1 sentence: how they differ, who wins today." },
            },
            required: ["name", "collides_at", "note"],
          },
        },
        juggernaut_moves: {
          type: "array",
          description: "2-3 imminent moves by L2 foundation-model owners (OpenAI/Anthropic/Google) or L4 distribution owners (Microsoft/Salesforce/Apple) that compress this company.",
          items: {
            type: "object",
            properties: {
              actor: { type: "string", description: "e.g. 'Anthropic', 'OpenAI', 'Microsoft Copilot'." },
              move: { type: "string", description: "What they're shipping or about to ship that hits this company." },
              compresses: { type: "string", description: "Sublayer ID(s) it collapses, e.g. 'L5b, L7a'." },
              timeframe: { type: "string", enum: ["shipped", "0-6mo", "6-18mo"] },
            },
            required: ["actor", "move", "compresses", "timeframe"],
          },
        },
      },
      required: ["adjacent_players", "juggernaut_moves"],
    },
    roadmap: {
      type: "array",
      description: "Exactly 5 prioritized roadmap moves. Each MUST cite a specific sublayer ID. Order P0 first.",
      minItems: 5,
      maxItems: 5,
      items: {
        type: "object",
        properties: {
          priority: { type: "string", enum: ["P0", "P1", "P2"], description: "P0 = next 90d, existential. P1 = next 180d, defensive moat. P2 = next 365d, long-game." },
          horizon: { type: "string", enum: ["90d", "180d", "365d"] },
          sublayer: { type: "string", enum: ALL_SUBLAYERS },
          move: { type: "string", description: "1-2 sentences. Concrete product/data/distribution action — not 'invest in AI'." },
          why: { type: "string", description: "1 sentence: which risk it closes or which juggernaut move it blunts." },
        },
        required: ["priority", "horizon", "sublayer", "move", "why"],
      },
    },
    open_questions: {
      type: "array",
      description: "Exactly 3 sharp questions the founder/exec should answer in the next 90 days.",
      items: { type: "string" },
      minItems: 3,
      maxItems: 3,
    },
    snippet: { type: "string", description: "2-3 sentences: what to do with this verdict. Specific next move tied to a layer." },
  },
  required: ["verdict_tier", "score", "one_line", "domain", "layers_owned", "layers_rented", "sublayer_claims", "sublayer_gaps", "triangle", "archetype", "laws_triggered", "strengths", "risks", "competitive_landscape", "roadmap", "open_questions", "snippet"],
  additionalProperties: false,
};

async function callLLMOnce(model: string, system: string, user: string, timeoutMs: number): Promise<any> {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: system }, { role: "user", content: user }],
        tools: [{ type: "function", function: { name: "emit_audit", description: "Emit the structured defensibility audit.", parameters: AUDIT_SCHEMA } }],
        tool_choice: { type: "function", function: { name: "emit_audit" } },
      }),
      signal: ctl.signal,
    });
    if (!r.ok) {
      const tx = await r.text();
      throw new Error(`LLM ${model} failed: ${r.status} ${tx.slice(0, 200)}`);
    }
    const text = await r.text(); // read as text first to avoid mid-stream JSON parse on EOF
    const j = JSON.parse(text);
    const call = j.choices?.[0]?.message?.tool_calls?.[0];
    if (!call?.function?.arguments) throw new Error(`No tool call from ${model}`);
    return JSON.parse(call.function.arguments);
  } finally {
    clearTimeout(t);
  }
}

async function callLLM(model: string, system: string, user: string): Promise<any> {
  let lastErr: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      return await callLLMOnce(model, system, user, 110_000);
    } catch (e) {
      lastErr = e;
      const msg = e instanceof Error ? e.message : String(e);
      console.warn(`callLLM ${model} attempt ${attempt + 1} failed: ${msg}`);
      // Only retry on transient stream/network errors
      if (!/EOF|network|abort|timeout|fetch|stream|ECONN|terminated|502|503|504/i.test(msg)) break;
      await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
    }
  }
  throw lastErr;
}

function reconcile(draft: any, critic: any) {
  const layers_owned = Array.from(new Set([
    ...(draft.layers_owned || []).filter((l: string) => !(critic.layers_rented || []).includes(l)),
    ...(critic.layers_owned || []).filter((l: string) => (draft.layers_owned || []).includes(l) || (critic.sublayer_claims || []).some((c: any) => c.sublayer.startsWith(l) && c.confidence !== "low")),
  ]));
  const layers_rented = Array.from(new Set([...(draft.layers_rented || []), ...(critic.layers_rented || [])])).filter((l) => !layers_owned.includes(l));

  const draftMap = new Map((draft.sublayer_claims || []).map((c: any) => [c.sublayer, c]));
  const criticMap = new Map((critic.sublayer_claims || []).map((c: any) => [c.sublayer, c]));
  const conf = { high: 3, medium: 2, low: 1 };
  const reconciled_sublayers: any[] = [];
  const allSubs = new Set([...draftMap.keys(), ...criticMap.keys()]);
  for (const s of allSubs) {
    const d = draftMap.get(s);
    const c = criticMap.get(s);
    if (d && c) {
      const minConf = conf[d.confidence] <= conf[c.confidence] ? d.confidence : c.confidence;
      reconciled_sublayers.push({ sublayer: s, confidence: minConf, evidence: d.evidence, cross_confirmed: true });
    } else if (d) {
      const downgrade = d.confidence === "high" ? "medium" : d.confidence === "medium" ? "low" : "low";
      reconciled_sublayers.push({ sublayer: s, confidence: downgrade, evidence: d.evidence, cross_confirmed: false });
    } else if (c) {
      const downgrade = c.confidence === "high" ? "medium" : c.confidence === "medium" ? "low" : "low";
      reconciled_sublayers.push({ sublayer: s, confidence: downgrade, evidence: c.evidence, cross_confirmed: false });
    }
  }

  const score = Math.round(((draft.score ?? 0) + (critic.score ?? 0)) / 2);
  const tierOrder = ["wrapper_at_risk", "exposed", "mixed", "tilting_fortress", "fortress"];
  const draftIdx = tierOrder.indexOf(draft.verdict_tier);
  const criticIdx = tierOrder.indexOf(critic.verdict_tier);
  const verdict_tier = (draftIdx >= 0 && criticIdx >= 0) ? tierOrder[Math.min(draftIdx, criticIdx)] : draft.verdict_tier;

  const triRank = { false: 0, partial: 1, true: 2 };
  const triKey = (k: string) => {
    const dv = draft.triangle?.[k] ?? "false";
    const cv = critic.triangle?.[k] ?? "false";
    return triRank[dv] <= triRank[cv] ? dv : cv;
  };
  const triangle = {
    proprietary_data: triKey("proprietary_data"),
    deep_execution: triKey("deep_execution"),
    compounding_memory: triKey("compounding_memory"),
  };

  // Roadmap: union, dedupe by sublayer, sort by priority
  const prioOrder: Record<string, number> = { P0: 0, P1: 1, P2: 2 };
  const seenSub = new Set<string>();
  const roadmap = [...(critic.roadmap || []), ...(draft.roadmap || [])]
    .filter((r: any) => r?.sublayer && !seenSub.has(r.sublayer) && seenSub.add(r.sublayer))
    .sort((a: any, b: any) => (prioOrder[a.priority] ?? 9) - (prioOrder[b.priority] ?? 9))
    .slice(0, 5);

  // Sublayer gaps: union, dedupe
  const gapMap = new Map<string, any>();
  for (const g of [...(critic.sublayer_gaps || []), ...(draft.sublayer_gaps || [])]) {
    if (g?.sublayer && !gapMap.has(g.sublayer)) gapMap.set(g.sublayer, g);
  }
  const sublayer_gaps = Array.from(gapMap.values()).slice(0, 4);

  return {
    verdict_tier,
    score,
    one_line: critic.one_line || draft.one_line,
    domain: critic.domain || draft.domain,
    layers_owned,
    layers_rented,
    sublayer_claims: reconciled_sublayers.sort((a, b) => conf[b.confidence] - conf[a.confidence]),
    sublayer_gaps,
    triangle,
    archetype: critic.archetype || draft.archetype,
    laws_triggered: Array.from(new Set([...(draft.laws_triggered || []), ...(critic.laws_triggered || [])])),
    strengths: critic.strengths || draft.strengths,
    risks: Array.from(new Set([...(draft.risks || []), ...(critic.risks || [])])).slice(0, 4),
    competitive_landscape: {
      adjacent_players: (critic.competitive_landscape?.adjacent_players || draft.competitive_landscape?.adjacent_players || []).slice(0, 4),
      juggernaut_moves: (critic.competitive_landscape?.juggernaut_moves || draft.competitive_landscape?.juggernaut_moves || []).slice(0, 3),
    },
    roadmap,
    open_questions: critic.open_questions || draft.open_questions,
    snippet: critic.snippet || draft.snippet,
    cross_check: {
      drafter_score: draft.score,
      critic_score: critic.score,
      drafter_tier: draft.verdict_tier,
      critic_tier: critic.verdict_tier,
    },
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { company, context } = await req.json();
    if (!company || typeof company !== "string" || company.trim().length < 2) {
      return new Response(JSON.stringify({ error: "company name required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!LOVABLE_KEY) {
      return new Response(JSON.stringify({ error: "AI not configured" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const co = company.trim().slice(0, 80);
    const ctx = (context || "").toString().slice(0, 2000);

    const { text: researchText, insufficient } = await research(co, ctx);

    if (insufficient && ctx.length < 200) {
      return new Response(JSON.stringify({
        verdict_tier: "insufficient_data",
        score: null,
        one_line: `No substantive public footprint for "${co}". Either too early-stage to audit from public data, or the name didn't match a known company.`,
        guidance: "Paste 2-3 paragraphs in the context box describing the product, customers, data, and how it works — we'll audit on that instead.",
        research_snippet: researchText.slice(0, 600),
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const system = `${FRAMEWORK_CONTEXT}

You are auditing a single company against the Supply Chain of Intelligence framework. Be brutal, specific, layer-native. Never invent facts not in the research. If a layer claim isn't backed by the research or user context, do not make it. Most companies own 1-3 layers, not 6. Score reflects DEFENSIBILITY, not size or revenue.`;

    const userPrompt = `COMPANY: ${co}
${ctx ? `\nUSER-PROVIDED CONTEXT:\n${ctx}\n` : ""}
PUBLIC RESEARCH:
${researchText.slice(0, 6000)}

Audit this company. (1) Map owned/rented layers + 3-7 sublayer claims with evidence. (2) Identify 2-4 sublayer GAPS — sublayers they should own for their domain but don't. (3) Triangle. (4) Competitive landscape: 2-4 named adjacent players (with collision sublayer) + 2-3 imminent L2/L4 juggernaut moves (Anthropic, OpenAI, Google, Microsoft, Salesforce, Apple) that compress them, with timeframe. (5) Roadmap: exactly 5 moves with P0/P1/P2 priority and horizon (90d/180d/365d), each tied to a specific sublayer ID. (6) 3 open questions. (7) Strategic snippet.`;

    const [draft, critic] = await Promise.all([
      callLLM("openai/gpt-5-mini", system, userPrompt),
      callLLM("google/gemini-2.5-pro", system + "\n\nYOU ARE THE CRITIC. Be harsher than the drafter would be. Downgrade any layer claim where evidence is thin. Wrapper-at-risk is the default until proven otherwise.", userPrompt),
    ]);

    const final = reconcile(draft, critic);

    return new Response(JSON.stringify({ company: co, ...final, research_snippet: researchText.slice(0, 800) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("audit error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
