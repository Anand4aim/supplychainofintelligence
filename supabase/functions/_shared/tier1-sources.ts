// Tier-1 source whitelist. Used at fetch time to enforce that every candidate
// story has at least one source URL from a credible outlet or first-party page.
// This is the source-tier filter referenced in the curation queue design.

export const TIER1_OUTLET_DOMAINS = [
  // Top-tier financial / tech press
  "bloomberg.com",
  "wsj.com",
  "ft.com",
  "reuters.com",
  "theinformation.com",
  "nytimes.com",
  "economist.com",
  "techcrunch.com",
  "theverge.com",
  "axios.com",
  "cnbc.com",
  "wired.com",
  "arstechnica.com",
  "stratechery.com",
  "platformer.news",
  "semianalysis.com",
];

export const TIER1_COMPANY_DOMAINS = [
  "openai.com",
  "anthropic.com",
  "google.com",
  "deepmind.google",
  "blog.google",
  "microsoft.com",
  "meta.com",
  "ai.meta.com",
  "amazon.com",
  "aws.amazon.com",
  "apple.com",
  "nvidia.com",
  "xai.com",
  "x.ai",
  "salesforce.com",
  "oracle.com",
  "servicenow.com",
  "sap.com",
  "adobe.com",
  "databricks.com",
  "snowflake.com",
  "palantir.com",
  "cloudflare.com",
  "stripe.com",
  "shopify.com",
  "ibm.com",
  "cisco.com",
  "mistral.ai",
  "cohere.com",
  "writer.com",
  "huggingface.co",
  "perplexity.ai",
  "cursor.com",
  "sierra.ai",
  "harvey.ai",
  "glean.com",
];

const ALL_TIER1 = new Set([...TIER1_OUTLET_DOMAINS, ...TIER1_COMPANY_DOMAINS]);

export function extractDomain(url: string): string | null {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}

export function isTier1Domain(domain: string | null): boolean {
  if (!domain) return false;
  // Match exact or any subdomain of a tier-1 root.
  for (const t of ALL_TIER1) {
    if (domain === t || domain.endsWith("." + t)) return true;
  }
  return false;
}

export function filterTier1Urls(urls: string[]): { tier1: string[]; rejected: string[] } {
  const tier1: string[] = [];
  const rejected: string[] = [];
  for (const u of urls) {
    const d = extractDomain(u);
    if (isTier1Domain(d)) tier1.push(u);
    else rejected.push(u);
  }
  return { tier1, rejected };
}
