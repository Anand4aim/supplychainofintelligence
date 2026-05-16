// Weekly job: pull latest AI product news via Perplexity, analyze through the
// 10-layer Supply Chain of Intelligence framework via Lovable AI, write to DB.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the analyst for "The Supply Chain of Intelligence" — a Stratechery-style strategy publication by Anand Arivukkarasu (Ex-Meta Product Leader).

You analyze AI product launches through this framework:

THE 10 LAYERS (L-1 through L8):
L-1 Energy & Power | L0 Compute & Silicon | L1 Cloud Infrastructure | L2 Foundation Models | L3 Inference & Serving | L4 Agents & Orchestration | L5 Tools & APIs | L6 Applications | L7 Distribution & Trust | L8 Memory & Continuity

THE 3 STRUCTURAL LAWS:
1. Value accrues to the scarcest layer
2. Thin wrappers get crushed; deep stacks compound
3. Distribution beats intelligence until intelligence becomes distribution

VERDICTS: DOMINANT | SAFE | CONTESTED | DEAD

Your job: given a news item, return a sharp, opinionated analysis. Avoid hedge words. Take a position. Write like Ben Thompson — declarative, structural, no fluff.`;

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
            note: { type: "string", description: "8-15 words explaining" }
          },
          required: ["layer", "owned", "note"]
        }
      },
      structural_take: { type: "string", description: "4-6 sentences. Apply the 3 laws. Why does this matter structurally? What's the moat or lack thereof?" },
      vertical_lens: { type: "string", description: "3-5 sentences. How does this play specifically in the named vertical? Who wins, who loses, why?" },
      new_law_candidate: { type: "string", description: "If this news suggests a NEW structural law beyond the 3, state it as a one-line principle. Otherwise return empty string." },
      linkedin_post: { type: "string", description: "Ready-to-post LinkedIn version: 150-220 words, opens with a hook, ends with a question or sharp statement, uses line breaks generously, no hashtag spam (max 3 hashtags at end)" }
    },
    required: ["headline", "subheadline", "slug", "news_summary", "source_urls", "verdict", "vertical", "layer_scores", "structural_take", "vertical_lens", "new_law_candidate", "linkedin_post"]
  }
};

async function fetchLatestNews(perplexityKey: string): Promise<string> {
  const res = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${perplexityKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "sonar",
      messages: [
        { role: "system", content: "You surface the single most strategically important AI product launch or announcement from the past 7 days. Focus on launches that affect platform power, vertical AI, agents, or distribution — not funding rounds, not benchmarks, not minor updates." },
        { role: "user", content: "What is the single most strategically important AI product launch or platform move from the past 7 days? Give me: (1) the headline, (2) what shipped, (3) which company, (4) 3-5 source URLs. Pick something with structural implications, not just hype." }
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
        { role: "user", content: `Here is this week's news item with sources:\n\n${newsContext}\n\nProduce the full framework analysis. Be opinionated. The vertical_lens must be specific and concrete (real downstream effects, not generalities). The linkedin_post must be ready to paste — start with a hook, no preamble.` }
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
        structural_take: analysis.structural_take,
        vertical_lens: analysis.vertical_lens,
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
