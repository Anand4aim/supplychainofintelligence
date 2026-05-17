// The Market Map — companies plotted on the 10-layer Supply Chain of Intelligence™
// Curated. Layer assignments reflect the company's *primary* structural position(s),
// not every layer they touch. Edit freely.

const logo = (domain: string) => `https://logo.clearbit.com/${domain}`;

export type Vertical =
  | "horizontal"
  | "code"
  | "finance"
  | "legal"
  | "health"
  | "cx"
  | "creative"
  | "sales"
  | "edu"
  | "infra";

export type Archetype =
  | "fortress"      // multi-layer, defensible
  | "refinery"      // L1 data play
  | "railroad"      // L4 distribution
  | "memory"        // L8 compounder
  | "surface"       // L7-only, exposed
  | "graveyard";    // structurally dead/dying

export interface MapCompany {
  name: string;
  domain: string;
  logo: string;
  layers: string[];         // canonical layer ids: "L-1" .. "L8"
  verticals: Vertical[];    // primary verticals
  archetype: Archetype;
  caseStudy?: string;       // slug into CASE_STUDIES (optional)
  note?: string;            // one-liner shown on hover
}

const c = (
  name: string,
  domain: string,
  layers: string[],
  verticals: Vertical[],
  archetype: Archetype,
  extra: { caseStudy?: string; note?: string } = {},
): MapCompany => ({ name, domain, logo: logo(domain), layers, verticals, archetype, ...extra });

export const MAP_COMPANIES: MapCompany[] = [
  // L-1 Resources
  c("NextEra", "nexteraenergy.com", ["L-1"], ["infra"], "fortress"),
  c("Vistra", "vistracorp.com", ["L-1"], ["infra"], "fortress"),
  c("TSMC", "tsmc.com", ["L-1", "L0"], ["infra"], "fortress"),
  c("MP Materials", "mpmaterials.com", ["L-1"], ["infra"], "refinery"),
  c("Bechtel", "bechtel.com", ["L-1"], ["infra"], "fortress"),

  // L0 Infrastructure
  c("NVIDIA", "nvidia.com", ["L0"], ["infra"], "fortress"),
  c("AMD", "amd.com", ["L0"], ["infra"], "railroad"),
  c("Broadcom", "broadcom.com", ["L0"], ["infra"], "railroad"),
  c("CoreWeave", "coreweave.com", ["L0"], ["infra"], "railroad"),
  c("Equinix", "equinix.com", ["L0"], ["infra"], "railroad"),
  c("AWS", "aws.amazon.com", ["L0", "L4"], ["horizontal"], "fortress"),
  c("Azure", "azure.microsoft.com", ["L0", "L4"], ["horizontal"], "fortress"),
  c("Google Cloud", "cloud.google.com", ["L0", "L2", "L4"], ["horizontal"], "fortress"),

  // L1 Data
  c("Bloomberg", "bloomberg.com", ["L1", "L2", "L3", "L4"], ["finance"], "fortress", { caseStudy: "bloomberg-gpt-vertical-fortress" }),
  c("Apollo.io", "apollo.io", ["L1"], ["sales"], "refinery", { caseStudy: "apollo-vs-zoominfo" }),
  c("ZoomInfo", "zoominfo.com", ["L1", "L7"], ["sales"], "refinery", { caseStudy: "apollo-vs-zoominfo" }),
  c("Scale AI", "scale.com", ["L1"], ["horizontal"], "refinery"),
  c("Reddit", "reddit.com", ["L1", "L7"], ["horizontal"], "refinery"),
  c("Stack Overflow", "stackoverflow.com", ["L1", "L7"], ["code"], "graveyard", { caseStudy: "stack-overflow-decline" }),
  c("Getty Images", "gettyimages.com", ["L1"], ["creative"], "refinery"),
  c("Tempus", "tempus.com", ["L1", "L5", "L8"], ["health"], "fortress"),
  c("Epic Systems", "epic.com", ["L1", "L4", "L5"], ["health"], "fortress"),

  // L2 Models
  c("OpenAI", "openai.com", ["L2", "L7"], ["horizontal"], "fortress", { caseStudy: "mckinsey-openai-lilli" }),
  c("Anthropic", "anthropic.com", ["L2", "L3"], ["horizontal"], "fortress", { caseStudy: "anthropic-claude-enterprise-l3" }),
  c("Google DeepMind", "deepmind.google", ["L2"], ["horizontal"], "fortress"),
  c("Meta AI (Llama)", "ai.meta.com", ["L2"], ["horizontal"], "railroad"),
  c("Mistral", "mistral.ai", ["L2"], ["horizontal"], "refinery"),
  c("xAI", "x.ai", ["L2"], ["horizontal"], "refinery"),
  c("Cohere", "cohere.com", ["L2"], ["horizontal"], "refinery"),
  c("Stability AI", "stability.ai", ["L2"], ["creative"], "graveyard", { caseStudy: "stability-ai-open-model-trap" }),

  // L3 Trust & Gates
  c("Harvey AI", "harvey.ai", ["L1", "L3", "L5", "L8"], ["legal"], "fortress", { caseStudy: "harvey-vs-generic-legal" }),
  c("Hippocratic AI", "hippocraticai.com", ["L3", "L5"], ["health"], "fortress"),
  c("Vanta", "vanta.com", ["L3"], ["horizontal"], "fortress"),
  c("Drata", "drata.com", ["L3"], ["horizontal"], "refinery"),

  // L4 Distribution / Railroads
  c("Microsoft 365", "microsoft.com", ["L0", "L2", "L4", "L7"], ["horizontal"], "fortress", { caseStudy: "jasper-vs-grammarly-copilot" }),
  c("Google Search", "google.com", ["L1", "L2", "L4", "L7"], ["horizontal"], "fortress", { caseStudy: "perplexity-vs-google-distribution" }),
  c("Apple", "apple.com", ["L0", "L4", "L7"], ["horizontal"], "fortress"),
  c("Meta", "meta.com", ["L2", "L4", "L7"], ["horizontal"], "fortress"),
  c("Stripe", "stripe.com", ["L4"], ["horizontal"], "railroad"),
  c("Cloudflare", "cloudflare.com", ["L0", "L4"], ["horizontal"], "railroad"),
  c("Cursor", "cursor.com", ["L4", "L6", "L8"], ["code"], "fortress", { caseStudy: "cursor-ide-consolidation" }),
  c("GitHub", "github.com", ["L1", "L4"], ["code"], "fortress"),
  c("Salesforce", "salesforce.com", ["L1", "L4", "L5"], ["sales", "cx"], "fortress", { caseStudy: "sierra-vs-salesforce" }),

  // L5 Domain Execution
  c("Sierra", "sierra.ai", ["L1", "L5", "L8"], ["cx"], "fortress", { caseStudy: "sierra-vs-salesforce" }),
  c("Klarna", "klarna.com", ["L1", "L5", "L8"], ["cx", "finance"], "fortress", { caseStudy: "klarna-customer-service" }),
  c("Decagon", "decagon.ai", ["L5", "L8"], ["cx"], "fortress"),
  c("Cresta", "cresta.com", ["L5", "L8"], ["cx"], "memory"),

  // L6 Orchestration
  c("Glean", "glean.com", ["L1", "L6", "L8"], ["horizontal"], "fortress", { caseStudy: "glean-enterprise-search-fortress" }),
  c("LangChain", "langchain.com", ["L6"], ["horizontal"], "railroad"),
  c("Grammarly", "grammarly.com", ["L4", "L6"], ["horizontal"], "fortress", { caseStudy: "jasper-vs-grammarly-copilot" }),
  c("Zapier", "zapier.com", ["L4", "L6"], ["horizontal"], "railroad"),

  // L7 Surface
  c("ChatGPT", "openai.com", ["L2", "L7"], ["horizontal"], "fortress"),
  c("Claude.ai", "anthropic.com", ["L2", "L3", "L7"], ["horizontal"], "fortress"),
  c("Perplexity", "perplexity.ai", ["L7"], ["horizontal"], "surface", { caseStudy: "perplexity-vs-google-distribution" }),
  c("Gemini App", "gemini.google.com", ["L2", "L4", "L7"], ["horizontal"], "fortress"),
  c("Copilot", "copilot.microsoft.com", ["L2", "L4", "L7"], ["horizontal"], "fortress"),
  c("Jasper", "jasper.ai", ["L7"], ["creative"], "graveyard", { caseStudy: "jasper-vs-grammarly-copilot" }),
  c("Gamma", "gamma.app", ["L7"], ["creative"], "graveyard", { caseStudy: "gamma-thin-layer-graveyard" }),
  c("Chegg", "chegg.com", ["L7"], ["edu"], "graveyard", { caseStudy: "chegg-collapse" }),
  c("Midjourney", "midjourney.com", ["L2", "L7"], ["creative"], "fortress", { caseStudy: "stability-ai-open-model-trap" }),
  c("Devin (Cognition)", "cognition.ai", ["L7"], ["code"], "surface", { caseStudy: "devin-cognition-l7-agent" }),
  c("Adobe Firefly", "adobe.com", ["L1", "L3", "L4", "L7"], ["creative"], "fortress", { caseStudy: "adobe-firefly-licensed-data" }),

  // L8 Memory & Compounding
  c("Character.AI", "character.ai", ["L7", "L8"], ["horizontal"], "memory", { caseStudy: "character-ai-memory-orphan" }),
  c("Replika", "replika.com", ["L7", "L8"], ["horizontal"], "memory"),
  c("Notion AI", "notion.so", ["L4", "L6", "L8"], ["horizontal"], "fortress"),
];

export const VERTICAL_LABEL: Record<Vertical, string> = {
  horizontal: "Horizontal",
  code: "Code",
  finance: "Finance",
  legal: "Legal",
  health: "Health",
  cx: "CX",
  creative: "Creative",
  sales: "Sales",
  edu: "Education",
  infra: "Infra",
};

export const ARCHETYPE_LABEL: Record<Archetype, string> = {
  fortress: "Fortress",
  refinery: "Refinery",
  railroad: "Railroad",
  memory: "Memory",
  surface: "Surface-only",
  graveyard: "Graveyard",
};

export const ARCHETYPE_COLOR: Record<Archetype, string> = {
  fortress: "hsl(var(--verdict-fortified))",
  refinery: "hsl(var(--layer-1))",
  railroad: "hsl(var(--layer-4))",
  memory: "hsl(var(--layer-8))",
  surface: "hsl(var(--verdict-consolidating))",
  graveyard: "hsl(var(--verdict-exposed))",
};
