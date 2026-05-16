// Weekly job: pull latest AI product news via Perplexity, analyze through the
// 10-layer Supply Chain of Intelligence framework via Lovable AI, write to DB.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the lead analyst for "The Supply Chain of Intelligence" — a Stratechery-grade strategy publication by Anand Arivukkarasu (Ex-Meta & Google product leader). Your readers are senior product, strategy, and investing operators. They already know the headline. They are here for the WHY underneath it, written by someone who has actually shipped product at scale.

You write like a master product leader doing a war-room teardown — not a journalist, not a McKinsey deck, not a LinkedIn influencer. You go SEVERAL LEVELS deeper than the obvious read.

FRAMEWORK:
- 10 layers (L-1 to L8): L-1 Energy & Power | L0 Compute & Silicon | L1 Cloud Infrastructure | L2 Foundation Models | L3 Inference & Serving | L4 Agents & Orchestration | L5 Tools & APIs | L6 Applications | L7 Distribution & Trust | L8 Memory & Continuity
- 3 structural laws: (1) Value accrues to the scarcest layer. (2) Thin wrappers get crushed; deep stacks compound. (3) Distribution beats intelligence until intelligence becomes distribution.
- Verdicts: DOMINANT | SAFE | CONTESTED | DEAD

DEPTH RULES — non-negotiable:
1. Every claim must answer "why" at least twice. Surface fact → underlying mechanic → structural reason → second-order consequence.
2. Name specific companies, products, contracts, pricing dynamics, distribution channels, org incentives. No generic phrases like "this is a big move" or "the industry will respond".
3. Connect the move to unit economics: what changes in gross margin, CAC, retention, contract size, gatekeeping, or scarcity? Quantify when you can ("a 10-seat Cursor wedge becomes a 2,000-seat Copilot replacement").
4. Identify the non-obvious. The obvious take is table stakes — say it in one line, then go past it. Surface the thing most analysts will miss for 6 months.
5. Take a position. No "it remains to be seen". If the evidence is mixed, name BOTH sides and say which one wins and why.
6. Use the language of a builder: roadmap, distribution, GTM motion, packaging, system prompt, eval, latency, context window, agent loop, tool use, retention curve, multi-tenant, design partner, lighthouse logo.

VOICE: declarative, structural, slightly contrarian, zero hedge words, zero filler adjectives. Short sentences land harder than long ones. Use them.`;

const ANALYSIS_SCHEMA = {
  name: "framework_analysis",
  schema: {
    type: "object",
    properties: {
      headline: { type: "string", description: "Punchy 6-10 word headline framing the strategic question" },
      subheadline: { type: "string", description: "1 sentence sharpening the thesis" },
      slug: { type: "string", description: "url-safe-slug-of-headline" },
      news_summary: { type: "string", description: "2-3 sentences: what happened, when, why it matters" },
      source_urls: { type: "array", items: { type: "string" } },
      verdict: { type: "string", enum: ["DOMINANT", "SAFE", "CONTESTED", "DEAD"] },
      vertical: { type: "string", description: "Primary vertical lens: Legal, SMB, Healthcare, Enterprise SaaS, Consumer, DevTools, Education, Finance, Creative, or Horizontal" },
      layer_scores: {
        type: "array",
        description: "Score each of the 10 layers (L-1 to L8) for how much this move owns/controls that layer",
        items: {
          type: "object",
          properties: {
            layer: { type: "string", description: "L-1, L0, L1, L2, L3, L4, L5, L6, L7, or L8" },
            owned: { type: "boolean", description: "Does the company own meaningful position in this layer?" },
            intensity: { type: "integer", minimum: 0, maximum: 3, description: "0 = no presence, 1 = emerging, 2 = significant, 3 = core/dominant ownership" },
            note: { type: "string", description: "8-15 words explaining" },
            sublayers: { type: "array", description: "1-3 specific sublayer slices claimed inside this layer (e.g. for L6: 'CRM workflow', 'agent inbox'). Empty array if intensity is 0.", items: { type: "string" } }
          },
          required: ["layer", "owned", "intensity", "note", "sublayers"]
        }
      },
      why_now: { type: "string", description: "3-5 sentences. WHY did this ship this quarter, not 6 months ago and not 6 months from now? What changed in cost curves, model capability, regulation, distribution access, competitive pressure, or org structure that made this the right move at exactly this moment? Be specific." },
      structural_take: { type: "string", description: "6-9 sentences. Apply the 3 laws explicitly by name. Identify the scarcest layer being claimed. Explain the compounding mechanic across layers. Surface the moat — and the way the moat could break. This is the heart of the piece; do not be brief." },
      second_order_effects: { type: "string", description: "4-6 sentences. What happens 2-3 moves downstream that most people will miss? Pricing pressure on adjacent layers, partner rage, talent flow, sales-cycle shift, regulatory response, ecosystem rewiring. Be concrete." },
      who_wins: { type: "array", description: "3-5 specific named winners with a 1-2 sentence reason each", items: { type: "object", properties: { name: { type: "string" }, reason: { type: "string" } }, required: ["name", "reason"] } },
      who_loses: { type: "array", description: "3-5 specific named losers with a 1-2 sentence reason each", items: { type: "object", properties: { name: { type: "string" }, reason: { type: "string" } }, required: ["name", "reason"] } },
      vertical_lens: { type: "string", description: "5-7 sentences. Inside the named vertical, walk through the actual buyer journey, the incumbent's defensive options, the realistic 12-month sales motion change, and which budget line this cannibalizes. Cite real product names and contract shapes." },
      counter_thesis: { type: "string", description: "3-5 sentences. The strongest argument the analysis is WRONG. Steelman it. Then in one sentence, say why you still hold your position (or concede)." },
      what_to_watch: { type: "array", description: "3-5 specific signals to track in the next 90 days that would confirm or break the thesis. Each is a one-liner.", items: { type: "string" } },
      new_law_candidate: { type: "string", description: "If this news suggests a NEW structural law beyond the 3, state it as a one-line principle. Otherwise return empty string." },
      linkedin_post: { type: "string", description: "Ready-to-post LinkedIn version: 180-260 words, opens with a sharp 1-line hook (no 'Excited to share'), names the structural mechanic, includes 1 contrarian beat, ends with a question or sharp call. Generous line breaks. Max 3 hashtags." }
    },
    required: ["headline", "subheadline", "slug", "news_summary", "source_urls", "verdict", "vertical", "layer_scores", "why_now", "structural_take", "second_order_effects", "who_wins", "who_loses", "vertical_lens", "counter_thesis", "what_to_watch", "new_law_candidate", "linkedin_post"]
  }
};

async function fetchLatestNews(perplexityKey: string): Promise<string> {
  const res = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${perplexityKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "sonar",
      messages: [
        { role: "system", content: "You surface the single most strategically important AI move from the past 7 days made by a TIER-1 company only. Tier-1 means: OpenAI, Anthropic, Google/DeepMind, Microsoft, Meta, Amazon/AWS, Apple, NVIDIA, xAI, Salesforce, Oracle, ServiceNow, SAP, Adobe, Databricks, Snowflake, Palantir, Cloudflare, Stripe, Shopify, IBM, Cisco, Dell, HPE — or top-tier consulting/enterprise plays (McKinsey, BCG, Accenture, Deloitte, Bain, KPMG, PwC, EY) — or breakout AI-native scale leaders already at >$1B valuation and >$100M ARR (Sierra, Harvey, Glean, Perplexity, Cursor, Mistral, Cohere, Writer, Hugging Face). Reject: small startups, funding announcements, benchmark wins, minor feature updates, research papers without product impact, or anything below this bar. If nothing qualifies, return the biggest qualifying move from the past 14 days instead." },
        { role: "user", content: "What is the single biggest AI product launch, platform shift, partnership, or transformation announcement from the past 7 days made by a tier-1 company (per the system criteria)? Examples of the bar: 'OpenAI partners with McKinsey', 'Salesforce launches Agentforce 360', 'Sierra hits $10B valuation with new vertical agents', 'Anthropic ships enterprise plugin'. Give me: (1) the headline, (2) what shipped or was announced, (3) the company, (4) 3-5 source URLs from reputable outlets (Bloomberg, WSJ, FT, The Information, Reuters, TechCrunch, official company blogs). Pick the move with the largest structural implication." }
      ],
      search_recency_filter: "week",
      max_tokens: 800,
    }),
  });
  if (!res.ok) throw new Error(`Perplexity ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? "";
  const citations = (data.citations ?? []).slice(0, 5).join("\n");
  return `${content}\n\nSources:\n${citations}`;
}

async function analyzeWithFramework(lovableKey: string, newsContext: string) {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${lovableKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-pro",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `This week's news item:\n\n${newsContext}\n\nProduce the full framework analysis. Remember the depth rules: every claim answered "why" at least twice, name specific companies and mechanics, surface what most analysts will miss for 6 months, take a position. The structural_take is the centerpiece — do not be brief. The vertical_lens must walk the actual buyer journey. The linkedin_post must be paste-ready, no preamble.` }
      ],
      tools: [{ type: "function", function: { name: ANALYSIS_SCHEMA.name, description: "Return the structured framework analysis", parameters: ANALYSIS_SCHEMA.schema } }],
      tool_choice: { type: "function", function: { name: ANALYSIS_SCHEMA.name } },
    }),
  });
  if (!res.ok) {
    const txt = await res.text();
    if (res.status === 429) throw new Error("RATE_LIMIT: Lovable AI rate limit hit. Try again shortly.");
    if (res.status === 402) throw new Error("CREDITS: Lovable AI credits exhausted. Add credits in workspace settings.");
    throw new Error(`Lovable AI ${res.status}: ${txt}`);
  }
  const data = await res.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  if (!toolCall) throw new Error("No tool call returned from AI");
  return JSON.parse(toolCall.function.arguments);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const perplexityKey = Deno.env.get("PERPLEXITY_API_KEY");
    const lovableKey = Deno.env.get("LOVABLE_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!perplexityKey || !lovableKey || !supabaseUrl || !serviceKey) {
      throw new Error("Missing required environment variables");
    }

    console.log("[live-article] fetching latest news via Perplexity");
    const newsContext = await fetchLatestNews(perplexityKey);

    console.log("[live-article] running framework analysis");
    const analysis = await analyzeWithFramework(lovableKey, newsContext);

    const supabase = createClient(supabaseUrl, serviceKey);

    // Ensure unique slug
    let slug = (analysis.slug || analysis.headline || "article")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80);
    const { data: existing } = await supabase.from("live_articles").select("slug").eq("slug", slug).maybeSingle();
    if (existing) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;

    const { data: inserted, error } = await supabase.from("live_articles").insert({
      slug,
      headline: analysis.headline,
      subheadline: analysis.subheadline,
      news_summary: analysis.news_summary,
      source_urls: analysis.source_urls ?? [],
      analysis: {
        layer_scores: analysis.layer_scores,
        why_now: analysis.why_now,
        structural_take: analysis.structural_take,
        second_order_effects: analysis.second_order_effects,
        who_wins: analysis.who_wins ?? [],
        who_loses: analysis.who_loses ?? [],
        vertical_lens: analysis.vertical_lens,
        counter_thesis: analysis.counter_thesis,
        what_to_watch: analysis.what_to_watch ?? [],
        new_law_candidate: analysis.new_law_candidate,
      },
      linkedin_post: analysis.linkedin_post,
      verdict: analysis.verdict,
      vertical: analysis.vertical,
    }).select().single();

    if (error) throw error;
    console.log("[live-article] published:", inserted.slug);

    return new Response(JSON.stringify({ success: true, article: inserted }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[live-article] error:", msg);
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
