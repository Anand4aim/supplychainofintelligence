// Stage 1 of the curation pipeline.
// Pulls 3-5 candidate AI stories from the past 48h via Perplexity, enforces
// the tier-1 source whitelist at fetch time, and inserts pending rows into
// `story_candidates` for human approval. NO article is generated here.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { filterTier1Urls, TIER1_OUTLET_DOMAINS, TIER1_COMPANY_DOMAINS, extractDomain } from "../_shared/tier1-sources.ts";
import { isAuthorizedJobCall } from "../_shared/job-auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Candidate = {
  headline: string;
  company: string;
  summary: string;
  source_urls: string[];
};

const SYSTEM = `You are a tier-1 AI news scout for a senior product-strategy publication. Your job is to surface real, verifiable AI product/platform stories from the past 48-72 hours.

HARD RULES:
- Only stories from these tier-1 companies: OpenAI, Anthropic, Google/DeepMind, Microsoft, Meta, Amazon/AWS, Apple, NVIDIA, xAI, Salesforce, Oracle, ServiceNow, SAP, Adobe, Databricks, Snowflake, Palantir, Cloudflare, Stripe, Shopify, IBM, Cisco, or AI-native scale leaders (Mistral, Cohere, Writer, Hugging Face, Perplexity, Cursor, Sierra, Harvey, Glean).
- Every story must have at least 2 source URLs from credible outlets: ${TIER1_OUTLET_DOMAINS.join(", ")}, OR first-party newsroom/blog pages at ${TIER1_COMPANY_DOMAINS.slice(0, 10).join(", ")}.
- NO funding-only stories, NO benchmark wins, NO research papers without a shipped product, NO rumors.
- If fewer than 3 qualifying stories exist, return fewer. NEVER invent a story.`;

const SCHEMA = {
  name: "story_candidates",
  schema: {
    type: "object",
    properties: {
      candidates: {
        type: "array",
        items: {
          type: "object",
          properties: {
            headline: { type: "string", description: "Factual 6-12 word headline" },
            company: { type: "string", description: "Primary tier-1 company" },
            summary: { type: "string", description: "2-3 sentences: what shipped, when, why notable" },
            source_urls: { type: "array", items: { type: "string" }, description: "3-5 source URLs" },
          },
          required: ["headline", "company", "summary", "source_urls"],
        },
      },
    },
    required: ["candidates"],
  },
};

async function fetchCandidates(perplexityKey: string): Promise<Candidate[]> {
  const userMsg = `What are the 3-5 most strategically important AI product/platform stories from the past 48-72 hours from tier-1 companies? For each, give: factual headline, the company, 2-3 sentence summary, and 3+ source URLs from credible outlets or first-party newsroom pages. Return JSON only.`;
  const res = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${perplexityKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "sonar-pro",
      messages: [{ role: "system", content: SYSTEM }, { role: "user", content: userMsg }],
      search_recency_filter: "week",
      response_format: { type: "json_schema", json_schema: SCHEMA },
      max_tokens: 2500,
    }),
  });
  if (!res.ok) throw new Error(`Perplexity ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? "{}";
  const parsed = JSON.parse(content);
  return Array.isArray(parsed.candidates) ? parsed.candidates : [];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const perplexityKey = Deno.env.get("PERPLEXITY_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!perplexityKey || !supabaseUrl || !serviceKey) throw new Error("Missing env");

    const supabase = createClient(supabaseUrl, serviceKey);

    const body = await req.json().catch(() => ({} as { passcode?: string; cron_token?: string }));
    const ok = await isAuthorizedJobCall(supabase, {
      passcode: body?.passcode,
      cronToken: body?.cron_token,
    });
    if (!ok) {
      return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }


    const raw = await fetchCandidates(perplexityKey);

    const today = new Date().toISOString().slice(0, 10);
    const accepted: any[] = [];
    const rejected: any[] = [];

    for (const c of raw) {
      const { tier1, rejected: bad } = filterTier1Urls(c.source_urls || []);
      if (tier1.length < 2) {
        rejected.push({ headline: c.headline, reason: `only ${tier1.length} tier-1 sources`, bad });
        continue;
      }
      const domains = Array.from(new Set(tier1.map(extractDomain).filter(Boolean)));
      accepted.push({
        headline: c.headline.trim(),
        company: c.company?.trim() ?? null,
        summary: c.summary?.trim() ?? "",
        source_urls: tier1,
        source_domains: domains,
        tier1_verified: true,
        discovered_for_date: today,
        status: "pending",
      });
    }

    let inserted = 0;
    let skipped = 0;
    for (const row of accepted) {
      const { error } = await supabase.from("story_candidates").insert(row);
      if (error) {
        if (error.code === "23505") skipped++; // unique violation = already seen today
        else console.error("[discover] insert error", error);
      } else inserted++;
    }

    return new Response(
      JSON.stringify({ ok: true, inserted, skipped, rejected, total_fetched: raw.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
