// Dynamic sitemap.xml — serves all static routes + live articles from DB.
// Rewritten from /sitemap.xml via public/_redirects so Google sees a fresh
// sitemap every crawl without a redeploy.
import { createClient } from "npm:@supabase/supabase-js@2";

const BASE = "https://supplychainofai.com";

type Entry = { loc: string; lastmod?: string; changefreq?: string; priority?: string };

const STATIC: Entry[] = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/paper", changefreq: "monthly", priority: "1.0" },
  { loc: "/predictions", changefreq: "weekly", priority: "0.9" },
  { loc: "/framework", changefreq: "weekly", priority: "0.9" },
  { loc: "/analysis", changefreq: "weekly", priority: "0.9" },
  { loc: "/live", changefreq: "daily", priority: "0.95" },
  { loc: "/market-map", changefreq: "weekly", priority: "0.9" },
  { loc: "/for-product-leaders", changefreq: "monthly", priority: "0.8" },
  { loc: "/for-investors", changefreq: "monthly", priority: "0.8" },
  { loc: "/about", changefreq: "monthly", priority: "0.8" },
  { loc: "/faq", changefreq: "monthly", priority: "0.7" },
  { loc: "/disclaimer", changefreq: "yearly", priority: "0.3" },
  { loc: "/privacy", changefreq: "yearly", priority: "0.3" },
  { loc: "/terms", changefreq: "monthly", priority: "0.5" },
  { loc: "/audit", changefreq: "monthly", priority: "0.5" },
  { loc: "/glossary", changefreq: "weekly", priority: "0.9" },
  { loc: "/posters", changefreq: "monthly", priority: "0.5" },
  { loc: "/posts", changefreq: "weekly", priority: "0.85" },
];

const FRAMEWORK_LAYERS = [
  "l-1-resources","l0-infra","l1-data","l2-models","l3-gates","l4-access",
  "l5-execution","l6-orchestration","l7-surface","l8-memory",
];

// News-feed layer categories (/live/layer/:slug) — same slugs as FRAMEWORK_LAYERS.
const NEWS_LAYER_CATEGORIES = FRAMEWORK_LAYERS.map((slug) => ({
  slug,
  id: (slug.startsWith("l-1") ? "L-1" : slug.split("-")[0]).toUpperCase(),
}));

const CASE_STUDIES = [
  "jasper-vs-grammarly-copilot","chegg-collapse","gamma-thin-layer-graveyard",
  "stack-overflow-decline","apollo-vs-zoominfo","sierra-vs-salesforce",
  "stability-ai-open-model-trap","five-eras-of-software","harvey-vs-generic-legal",
  "mckinsey-openai-lilli","bloomberg-gpt-vertical-fortress","klarna-customer-service",
  "devin-cognition-l7-agent","perplexity-vs-google-distribution","cursor-ide-consolidation",
  "anthropic-claude-enterprise-l3","adobe-firefly-licensed-data","character-ai-memory-orphan",
  "glean-enterprise-search-fortress","tempus-ai-clinical-data-stack","john-deere-see-and-spray",
  "tesla-vs-waymo-autonomy-stack",
];

const LAWS = [
  "intelligence-commoditizes-downward","value-accrues-at-bottlenecks",
  "surface-captures-attention-chain-captures-power",
  "generation-and-verification-must-be-separate",
];

const VERTICALS = [
  "legal","wealth","healthcare","financial-services","customer-experience","sales-gtm",
  "code-devtools","creative-media","education","marketing-advertising","hr-recruiting",
  "cybersecurity","insurance","real-estate","government-defense","logistics",
  "retail-ecommerce","manufacturing","energy-utilities","agriculture","pharma-biotech",
  "consulting-services","travel-hospitality","construction-aec","telecom-media",
];

const POSTS = [
  "why-workflows-and-distribution-are-not-new-layers",
  "software-for-one-still-rides-shared-rails",
  "model-routing-is-an-l2d-story",
  "five-ai-frameworks-every-product-leader-should-know",
  "why-every-ai-product-leader-needs-a-map",
  "every-ai-conversation-is-at-the-wrong-layer",
];

function xmlEscape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function urlTag(e: Entry) {
  const parts = [`<loc>${xmlEscape(BASE + e.loc)}</loc>`];
  if (e.lastmod) parts.push(`<lastmod>${e.lastmod}</lastmod>`);
  if (e.changefreq) parts.push(`<changefreq>${e.changefreq}</changefreq>`);
  if (e.priority) parts.push(`<priority>${e.priority}</priority>`);
  return `  <url>${parts.join("")}</url>`;
}

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const today = new Date().toISOString().slice(0, 10);
  const entries: Entry[] = [...STATIC];

  for (const l of FRAMEWORK_LAYERS) entries.push({ loc: `/framework/${l}`, changefreq: "monthly", priority: "0.7" });
  for (const s of CASE_STUDIES) entries.push({ loc: `/analysis/${s}`, changefreq: "monthly", priority: "0.8" });
  for (const l of LAWS) entries.push({ loc: `/laws/${l}`, changefreq: "monthly", priority: "0.85" });
  for (const v of VERTICALS) entries.push({ loc: `/market-map/${v}`, changefreq: "monthly", priority: "0.7" });
  for (const p of POSTS) entries.push({ loc: `/posts/${p}`, changefreq: "monthly", priority: "0.8" });

  try {
    const { data, error } = await supabase
      .from("live_articles")
      .select("slug, published_at, vertical, analysis")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(1000);
    if (error) throw error;
    for (const row of data ?? []) {
      if (!row.slug) continue;
      const lastmod = row.published_at ? new Date(row.published_at).toISOString().slice(0, 10) : today;
      entries.push({ loc: `/live/${row.slug}`, lastmod, changefreq: "monthly", priority: "0.75" });
    }
    // Paginated news archive pages (page 1 is /live). Keep in sync with PAGE_SIZE in src/pages/Live.tsx.
    const pageCount = Math.ceil((data?.length ?? 0) / 12);
    for (let p = 2; p <= pageCount; p++) {
      entries.push({ loc: `/live/page/${p}`, changefreq: "weekly", priority: "0.6" });
    }

    // News category (layer) + tag (topic) landing pages.
    // Mirrors src/lib/newsTaxonomy.ts — keep the two in sync.
    const rawSlug = (s: string) =>
      s.toLowerCase().trim().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    // Keep in sync with TOPIC_ALIASES in src/lib/newsTaxonomy.ts.
    const TOPIC_ALIASES: Record<string, string> = {
      custcare: "customer-experience", cx: "customer-experience", mktg: "marketing",
      "dev-eng": "engineering", deveng: "engineering", devtools: "developer-tools",
      ecom: "e-commerce", gov: "government-and-defense", health: "healthcare",
      fintech: "financial-services", saas: "saas", "enterprise-saas": "enterprise-saas",
      ops: "operations", hr: "hr-and-recruiting", edu: "education",
      media: "media-and-entertainment", sales: "sales-and-gtm",
    };
    const slugify = (s: string) => {
      const base = rawSlug(s);
      return TOPIC_ALIASES[base] ?? base;
    };
    const layerCounts = new Map<string, number>();
    const topicCounts = new Map<string, number>();
    for (const row of data ?? []) {
      const cube = (row as any)?.analysis?.cube_position ?? {};
      const layers: string[] = Array.isArray(cube.layers) ? cube.layers : [];
      for (const id of new Set(layers.map((l) => String(l).trim().toUpperCase()))) {
        const hit = NEWS_LAYER_CATEGORIES.find((c) => c.id === id);
        if (hit) layerCounts.set(hit.slug, (layerCounts.get(hit.slug) ?? 0) + 1);
      }
      const topics = [
        (row as any).vertical ?? "",
        ...(Array.isArray(cube.verticals) ? cube.verticals : []),
        ...(Array.isArray(cube.functions) ? cube.functions : []),
      ];
      for (const s of new Set(topics.map((t) => slugify(String(t ?? ""))).filter(Boolean))) {
        topicCounts.set(s, (topicCounts.get(s) ?? 0) + 1);
      }
    }
    for (const [slug] of layerCounts) {
      entries.push({ loc: `/live/layer/${slug}`, changefreq: "weekly", priority: "0.7" });
    }
    for (const [slug, count] of topicCounts) {
      if (count < 2) continue; // thin tag pages stay out of the index
      entries.push({ loc: `/live/topic/${slug}`, changefreq: "weekly", priority: "0.65" });
    }
  } catch (e) {
    console.error("sitemap: live_articles fetch failed", e);
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries.map(urlTag).join("\n") +
    `\n</urlset>\n`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=1800, s-maxage=1800",
      "Access-Control-Allow-Origin": "*",
    },
  });
});
