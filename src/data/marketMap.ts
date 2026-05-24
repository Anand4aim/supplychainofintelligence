// The Market Map — companies plotted on the 10-layer Supply Chain of Intelligence™
// Curated. Layer assignments reflect the company's *primary* structural position(s),
// not every layer they touch. Edit freely.

const logo = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

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
  | "agent"         // L5+L7 (+/- L8) packaging — "an agent" with thin deeper moat
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
  c("Decagon", "decagon.ai", ["L1", "L5", "L8"], ["cx"], "fortress", { note: "Racing Sierra for the same F500 CX square — L1 (tenant transcripts) + L5 (CX-stack workflow) + L8 (resolution loop)." }),
  c("Cresta", "cresta.com", ["L5", "L8"], ["cx"], "memory", { note: "Real-time agent assist + L8 coaching loop. Defensible as long as the loop stays per-tenant." }),
  c("Parloa", "parloa.com", ["L5", "L8"], ["cx"], "agent", { note: "Voice-first CX agent. L5+L8 stack, racing Sierra/Decagon in EU enterprise." }),
  c("Hebbia", "hebbia.com", ["L1", "L5"], ["finance"], "fortress", { note: "Finance research workflows on top of internal docs — L1 (firm corpus) + L5 (analyst loop). Harvey-pattern for buy-side." }),
  c("Rogo", "rogo.ai", ["L1", "L5"], ["finance"], "fortress", { note: "Investment-banking analyst copilot. L1 (deal docs) + L5 (pitch/model workflow)." }),
  c("Abridge", "abridge.com", ["L1", "L3", "L5"], ["health"], "fortress", { note: "Clinical documentation. L1 (encounter audio) + L3 (HIPAA / payer-grade) + L5 (EHR workflow). Fortress trio in health." }),
  c("Ambience", "ambiencehealthcare.com", ["L1", "L3", "L5"], ["health"], "fortress", { note: "Same fortress pattern as Abridge — L1+L3+L5 in clinical documentation." }),
  c("Suki", "suki.ai", ["L1", "L3", "L5"], ["health"], "fortress", { note: "Voice-first clinical AI. L1+L3+L5; contests Abridge / Ambience for EHR-integrated documentation." }),
  c("Clay", "clay.com", ["L1", "L5", "L8"], ["sales"], "fortress", { note: "GTM enrichment + workflow. Quietly one of the best-stacked: L1 (data graph) + L5 (sequence workflow) + L8 (account-level memory)." }),
  c("Mercor", "mercor.com", ["L1", "L5"], ["sales"], "agent", { note: "AI recruiting. L1 (candidate corpus) + L5 (hiring workflow); contested by Final Round + incumbents." }),
  c("Crosby", "crosby.ai", ["L1", "L5"], ["legal"], "agent", { note: "AI contract review for ops/commercial. Thin slice of Harvey's board — defensible only if it owns a workflow Harvey won't bother with." }),
  c("Profound", "tryprofound.com", ["L7"], ["sales"], "surface", { note: "LLM-recommendation analytics (AEO). Today: Ahrefs-clone L7 dashboard. Master stroke = ship a Claude/ChatGPT connector that *acts* on the diagnostic (L5+L8). Without it, Jasper 2.0." }),
  c("Granola", "granola.ai", ["L7", "L8"], ["horizontal"], "memory", { note: "Meeting notes with L8 personal memory. Memory-orphan risk if L2 (model) and L4 (OS surface) both belong to someone else." }),
  c("Cluely", "cluely.com", ["L7", "L8"], ["horizontal"], "memory", { note: "Real-time meeting assist. Same L8 memory-orphan exposure as Character.AI — beautiful surface, rented substrate." }),

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
  c("Devin (Cognition)", "cognition.ai", ["L5", "L7"], ["code"], "agent", { caseStudy: "devin-cognition-l7-agent", note: "Pitched as an 'agent' — L5 execution wrapped in an L7 surface, thin on L1/L8." }),
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
  agent: "Agent (L5+L7)",
  graveyard: "Graveyard",
};

export const ARCHETYPE_COLOR: Record<Archetype, string> = {
  fortress: "hsl(var(--verdict-fortified))",
  refinery: "hsl(var(--layer-1))",
  railroad: "hsl(var(--layer-4))",
  memory: "hsl(var(--layer-8))",
  surface: "hsl(var(--verdict-consolidating))",
  agent: "hsl(var(--layer-5))",
  graveyard: "hsl(var(--verdict-exposed))",
};
