// Weekly job: pull latest AI product news via Perplexity, analyze through the
// 10-layer Supply Chain of Intelligence framework via Lovable AI, write to DB.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { FRAMEWORK_CONTEXT } from "../_shared/framework-context.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `${FRAMEWORK_CONTEXT}

=== YOUR ROLE: LEAD ANALYST (DRAFTER) ===

You are the lead analyst for "Supply Chain of Intelligence". Your readers are senior product, strategy, and investing operators. They already know the headline. They are here for the WHY underneath it, written by someone who has actually shipped product at scale.

You write like a master product leader doing a war-room teardown, not a journalist, not a McKinsey deck, not a LinkedIn influencer. You go SEVERAL LEVELS deeper than the obvious read.

VERDICTS: DOMINANT | SAFE | CONTESTED | DEAD (use sparingly, DOMINANT and DEAD are reserved for clearly settled outcomes; default to CONTESTED or SAFE when the picture is still forming).

VOICE: declarative, structural, analytical. Take a position, but ground it in the layer mechanics above rather than rhetoric. Short sentences land harder than long ones. Use them.

Apply the FRAMEWORK CONTEXT above strictly. Use canonical layer names (L1 Data, L4 Access, L8 Memory, never "L1 Cloud", "L4 Agents", "L8 Continuity"). Cite the 3 Laws by their canonical titles. Respect the scoring discipline.`;


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
            intensity: { type: "integer", minimum: 0, maximum: 3, description: "0 = no presence, 1 = emerging, 2 = significant, 3 = core/dominant ownership. BE BRUTAL, most layers should be 0." },
            note: { type: "string", description: "8-15 words explaining. If intensity is 0, return empty string." },
            sublayers: {
              type: "array",
              description: "Specific sublayer slices claimed inside this layer. Count must respect intensity: intensity 1 → max 1, intensity 2 → max 2, intensity 3 → max 3. Empty array if intensity is 0.",
              items: {
                type: "object",
                properties: {
                  name: { type: "string", description: "Short slice name e.g. 'contract review', 'agent inbox', 'eval harness'" },
                  impact: { type: "integer", minimum: 1, maximum: 3, description: "1 = touched, 2 = meaningful share, 3 = owns this sublayer" },
                  who: { type: "string", description: "Who plays this sublayer slice TODAY, the company/role most threatened or most enabled. e.g. 'Harvey', 'Thomson Reuters CoCounsel', 'in-house legal ops'" }
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
        description: "Where this move sits in the Intelligence Cube (Functions × Verticals × Layers). Pick ONLY the axes truly touched, 1-3 functions, 1-3 verticals, 1-4 layers. Use EXACT names from the lists.",
        properties: {
          functions: { type: "array", description: "Job functions touched. Allowed: Dev/Eng, Design, Product, PM/Proj, Ops, Mktg, Sales, CustCare, Strategy", items: { type: "string" } },
          verticals: { type: "array", description: "Verticals touched. Allowed: FinTech, EdTech, Legal, Health, Travel, eCom, Media, Gov, SaaS, Horizontal", items: { type: "string" } },
          layers: { type: "array", description: "Layer IDs touched (L-1..L8). Should match the layers with intensity > 0 in layer_scores.", items: { type: "string" } }
        },
        required: ["functions", "verticals", "layers"]
      },
      why_now: { type: "string", description: "3-5 sentences. WHY did this ship this quarter, not 6 months ago and not 6 months from now? What changed in cost curves, model capability, regulation, distribution access, competitive pressure, or org structure that made this the right move at exactly this moment? Be specific." },
      structural_take: { type: "string", description: "6-9 sentences. Apply the 3 laws explicitly by name. Identify the scarcest layer being claimed. Explain the compounding mechanic across layers. Surface the moat, and the way the moat could break. This is the heart of the piece; do not be brief." },
      second_order_effects: { type: "string", description: "4-6 sentences. What happens 2-3 moves downstream that most people will miss? Pricing pressure on adjacent layers, partner rage, talent flow, sales-cycle shift, regulatory response, ecosystem rewiring. Be concrete." },
      who_wins: { type: "array", description: "3-5 specific named winners with a 1-2 sentence reason each", items: { type: "object", properties: { name: { type: "string" }, reason: { type: "string" } }, required: ["name", "reason"] } },
      who_loses: { type: "array", description: "3-5 specific named losers with a 1-2 sentence reason each", items: { type: "object", properties: { name: { type: "string" }, reason: { type: "string" } }, required: ["name", "reason"] } },
      vertical_lens: { type: "string", description: "5-7 sentences. Inside the named vertical, walk through the actual buyer journey, the incumbent's defensive options, the realistic 12-month sales motion change, and which budget line this cannibalizes. Cite real product names and contract shapes." },
      deep_product_lens: { type: "string", description: "5-7 sentences. PURE product-leader teardown. What is the actual product surface that shipped? What primitives, defaults, packaging, system prompts, eval harness, latency budget, multi-tenancy choices, pricing/seat model, onboarding wedge, and integration shape? Where is the design intent vs the duct tape? What does the v2 roadmap obviously look like, and what is the wedge → expand → lock-in motion? Use builder language." },
      deep_strategy_lens: { type: "string", description: "5-7 sentences. PURE strategy lens. Where does this sit on the value chain, what gatekeeping power does it create, what scarce resource does it claim (compute, data, distribution, trust, talent, regulation), what is the competitive response cost, and what does it force rivals to do within 4 quarters? Reference Porter / Hamilton Helmer 7 Powers / counter-positioning when relevant, by mechanism, not by name-drop." },
      counter_thesis: { type: "string", description: "3-5 sentences. The strongest argument the analysis is WRONG. Steelman it. Then in one sentence, say why you still hold your position (or concede)." },
      what_to_watch: { type: "array", description: "3-5 specific signals to track in the next 90 days that would confirm or break the thesis. Each is a one-liner.", items: { type: "string" } },
      new_law_candidate: { type: "string", description: "If this news suggests a NEW structural law beyond the 3, state it as a one-line principle. Otherwise return empty string." },
      linkedin_post: { type: "string", description: "Ready-to-post LinkedIn version: 180-260 words, opens with a sharp 1-line hook (no 'Excited to share'), names the structural mechanic, includes 1 contrarian beat, ends with a question or sharp call. Generous line breaks. Max 3 hashtags." },
      news_date: { type: "string", description: "ISO date (YYYY-MM-DD) of when the actual news broke / the announcement was made. Extract from the source material. If multiple dates, pick the primary announcement date. If genuinely unknown, return today's date." }
    },
    required: ["headline", "subheadline", "slug", "news_summary", "source_urls", "verdict", "vertical", "layer_scores", "cube_position", "why_now", "structural_take", "second_order_effects", "who_wins", "who_loses", "vertical_lens", "deep_product_lens", "deep_strategy_lens", "counter_thesis", "what_to_watch", "new_law_candidate", "linkedin_post", "news_date"]
  }
};

async function fetchLatestNews(perplexityKey: string, topic?: string): Promise<string> {
  const systemMsg = topic
    ? "You are a research assistant. The user will name a specific AI product story. Return: (1) a clear factual summary of what shipped/was announced, key dates, products, partners; (2) 4-6 source URLs from reputable outlets (Bloomberg, WSJ, FT, The Information, Reuters, TechCrunch, official company blogs). Do not editorialize."
    : "You surface the single most strategically important AI move from the past 24-48 HOURS made by a TIER-1 company only. Tier-1 means: OpenAI, Anthropic, Google/DeepMind, Microsoft, Meta, Amazon/AWS, Apple, NVIDIA, xAI, Salesforce, Oracle, ServiceNow, SAP, Adobe, Databricks, Snowflake, Palantir, Cloudflare, Stripe, Shopify, IBM, Cisco, Dell, HPE, or top-tier consulting/enterprise plays (McKinsey, BCG, Accenture, Deloitte, Bain, KPMG, PwC, EY), or breakout AI-native scale leaders already at >$1B valuation and >$100M ARR (Sierra, Harvey, Glean, Perplexity, Cursor, Mistral, Cohere, Writer, Hugging Face). Reject: small startups, funding announcements, benchmark wins, minor feature updates, research papers without product impact, or anything below this bar. CRITICAL: avoid duplicates, if the only story is something obviously already covered (e.g. a small follow-up to yesterday's news), pick the next-biggest fresh angle from the past 72 hours instead.";
  const userMsg = topic
    ? `Research this specific story in depth and return facts + sources: "${topic}". Include: what exactly shipped, when, the legal/vertical angle, named partners/customers, pricing or packaging details if public, and competitive context. Give 4-6 source URLs.`
    : "What is the single biggest AI product launch, platform shift, partnership, or executive transformation announcement from the past 24-48 hours made by a tier-1 company (per the system criteria)? Examples of the bar: 'OpenAI partners with McKinsey', 'Salesforce launches Agentforce 360', 'Sierra hits $10B valuation', 'Anthropic ships enterprise plugin', 'SAP CTO keynote on agents'. Give me: (1) the headline, (2) what shipped or was announced TODAY/YESTERDAY, (3) the company, (4) 3-5 source URLs from reputable outlets (Bloomberg, WSJ, FT, The Information, Reuters, TechCrunch, official company blogs). Pick the move with the largest structural implication.";
  const res = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${perplexityKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "sonar",
      messages: [
        { role: "system", content: systemMsg },
        { role: "user", content: userMsg }
      ],
      search_recency_filter: topic ? "year" : "day",
      max_tokens: 1000,
    }),
  });
  if (!res.ok) throw new Error(`Perplexity ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? "";
  const citations: string[] = (data.citations ?? []).slice(0, 5);

  // GUARDRAIL: refuse to proceed when Perplexity couldn't verify a real story.
  // Without this, hallucinated/typo topics ("Claude Opus 4.7") become meta-articles.
  const lower = content.toLowerCase();
  const refusalSignals = [
    "non-existent", "nonexistent", "does not exist", "could not find",
    "cannot verify", "can't verify", "unable to verify", "no verifiable",
    "no credible sources", "no reliable sources", "no public record",
    "i could not locate", "i cannot find", "no evidence of",
    "hasn't been announced", "has not been announced", "not been released",
    "appears to be fictional", "appears fictional", "no such product",
  ];
  const hasRefusal = refusalSignals.some((s) => lower.includes(s));
  const realCitations = citations.filter((u) => {
    try {
      const path = new URL(u).pathname.replace(/\/+$/, "");
      return path.length > 1; // reject bare-domain links like https://stratechery.com/
    } catch { return false; }
  });
  if (hasRefusal || realCitations.length < 2 || content.trim().length < 200) {
    throw new Error(
      `NO_STORY: Perplexity could not verify a real news event for this topic. ` +
      `Refusal=${hasRefusal} realCitations=${realCitations.length} contentLen=${content.trim().length}. ` +
      `Re-run with a more specific, real topic.`
    );
  }

  return `${content}\n\nSources:\n${citations.join("\n")}`;
}

// Headline quality gate, block one-word / clickbait / missing-subject titles.
function validateAnalysis(a: { headline?: string; subheadline?: string; news_summary?: string; source_urls?: string[] }) {
  const h = (a.headline ?? "").trim();
  const sub = (a.subheadline ?? "").trim();
  const summary = (a.news_summary ?? "").trim();
  const words = h.split(/\s+/).filter(Boolean);
  const reasons: string[] = [];
  if (words.length < 4) reasons.push(`headline too short (${words.length} words)`);
  if (h.length < 18) reasons.push(`headline too short (${h.length} chars)`);
  if (/^(ai|the|news|update|analysis)$/i.test(h)) reasons.push("headline is a generic single word");
  if (sub.length < 40) reasons.push("subheadline too thin");
  if (summary.length < 200) reasons.push("news_summary too thin");
  // Self-referential meta-articles about the agent itself
  const meta = /(this (interaction|response|article)|the ai (model|response)|demonstration of trust)/i;
  if (meta.test(summary) || meta.test(sub)) reasons.push("article is meta/self-referential, not real news");
  if ((a.source_urls?.length ?? 0) < 2) reasons.push("fewer than 2 source URLs");
  if (reasons.length) {
    throw new Error(`QUALITY_REJECTED: ${reasons.join("; ")}. Headline was: "${h}"`);
  }
}

async function analyzeWithFramework(lovableKey: string, newsContext: string) {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${lovableKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-pro",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `This week's news item:\n\n${newsContext}\n\nProduce the full framework analysis. Remember the depth rules: every claim answered "why" at least twice, name specific companies and mechanics, surface what most analysts will miss for 6 months, take a position. The structural_take is the centerpiece, do not be brief. The vertical_lens must walk the actual buyer journey. The linkedin_post must be paste-ready, no preamble.` }
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
    const expected = Deno.env.get("REMASTER_ADMIN_PASSCODE");
    if (!perplexityKey || !lovableKey || !supabaseUrl || !serviceKey) {
      throw new Error("Missing required environment variables");
    }

    let topic: string | undefined;
    let publishedAt: string | undefined;
    // "draft" keeps the piece off /live until a quality gate clears it.
    let requestedStatus = "published";
    let passcode: string | null = req.headers.get("x-admin-passcode");
    try {
      if (req.method === "POST") {
        const body = await req.json();
        topic = typeof body?.topic === "string" ? body.topic : undefined;
        publishedAt = typeof body?.published_at === "string" ? body.published_at : undefined;
        if (body?.status === "draft") requestedStatus = "draft";
        passcode = body?.passcode ?? passcode;
      }
    } catch (_) { /* no body */ }

    // Auth: fail-closed passcode check. pg_cron / weekly schedule must
    // send `{"passcode":"..."}` (or an `x-admin-passcode` header). Without
    // REMASTER_ADMIN_PASSCODE configured and matched, every request 401s.
    if (!expected || passcode !== expected) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    console.log("[live-article] fetching news via Perplexity", topic ? `(topic: ${topic})` : "(weekly auto)");
    const newsContext = await fetchLatestNews(perplexityKey, topic);

    console.log("[live-article] running framework analysis");
    const analysis = await analyzeWithFramework(lovableKey, newsContext);

    // GUARDRAIL: reject garbage analyses before they hit the DB.
    validateAnalysis(analysis);

    const supabase = createClient(supabaseUrl, serviceKey);

    // Ensure unique slug
    let slug = (analysis.slug || analysis.headline || "article")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80);
    const { data: existing } = await supabase.from("live_articles").select("slug").eq("slug", slug).maybeSingle();
    if (existing) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;

    const insertRow: Record<string, unknown> = {
      slug,
      headline: analysis.headline,
      subheadline: analysis.subheadline,
      news_summary: analysis.news_summary,
      source_urls: analysis.source_urls ?? [],
      analysis: {
        layer_scores: analysis.layer_scores,
        cube_position: analysis.cube_position,
        why_now: analysis.why_now,
        structural_take: analysis.structural_take,
        second_order_effects: analysis.second_order_effects,
        who_wins: analysis.who_wins ?? [],
        who_loses: analysis.who_loses ?? [],
        vertical_lens: analysis.vertical_lens,
        deep_product_lens: analysis.deep_product_lens,
        deep_strategy_lens: analysis.deep_strategy_lens,
        counter_thesis: analysis.counter_thesis,
        what_to_watch: analysis.what_to_watch ?? [],
        new_law_candidate: analysis.new_law_candidate,
      },
      linkedin_post: analysis.linkedin_post,
      verdict: analysis.verdict,
      vertical: analysis.vertical,
      status: requestedStatus,
    };

    // Date priority: explicit published_at param > model-extracted news_date > now().
    // Clamp to now(), the model sometimes hallucinates future dates (e.g. "2026-06-05"),
    // which then pin the article to the top of the feed forever. Past dates are fine.
    const rawDate = publishedAt
      || (analysis.news_date && /^\d{4}-\d{2}-\d{2}$/.test(analysis.news_date)
            ? `${analysis.news_date}T12:00:00+00:00`
            : undefined);
    if (rawDate) {
      const parsed = new Date(rawDate);
      const now = new Date();
      insertRow.published_at = (Number.isFinite(parsed.getTime()) && parsed.getTime() <= now.getTime())
        ? parsed.toISOString()
        : now.toISOString();
    }
    const { data: inserted, error } = await supabase.from("live_articles").insert(insertRow).select().single();

    if (error) throw error;
    console.log("[live-article] published:", inserted.slug);

    // Fire-and-forget refinement loop (2 critics + enhancer). Don't block the response.
    let refineStatus: unknown = "skipped";
    try {
      const refineRes = await fetch(`${supabaseUrl}/functions/v1/refine-live-article`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${serviceKey}`, "Content-Type": "application/json", "x-admin-passcode": expected ?? "" },
        body: JSON.stringify({ article_id: inserted.id, passcode: expected }),
      });
      refineStatus = await refineRes.json();
      console.log("[live-article] refine result:", JSON.stringify(refineStatus));
    } catch (refineErr) {
      console.error("[live-article] refine failed (article still published):", refineErr);
      refineStatus = { success: false, error: String(refineErr) };
    }

    return new Response(JSON.stringify({ success: true, article: inserted, refine: refineStatus }), {
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
