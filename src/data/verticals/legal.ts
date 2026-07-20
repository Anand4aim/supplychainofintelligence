// Legal AI, full 10×50 sublayer placement dataset.
// Ported from Anand's editorial map (May 2026). Companies are placed at the
// specific sublayer cells they structurally occupy, with primary/secondary
// distinction and a GAP annotation for every empty cell explaining *why*
// it's empty (open whitespace / absorbed feature / horizontal-owned).

export type CompanyStage = "early" | "growth" | "exit";

export interface VerticalCompany {
  key: string;
  name: string;
  tier: string;
  stage: CompanyStage;
  focus: string;
  scoi: string;        // layer position prose (HTML-ish, kept as plain text)
  fund: string;
  why: string;
  flag?: string;
}

export type GapKind = "ws" | "feat" | "horiz";

export interface SublayerPlacement {
  /** Sublayer id, lower-case (matches src/data/layers.ts), e.g. "L5a". */
  id: string;
  primary?: string[];   // company keys
  secondary?: string[]; // company keys
  whitespace?: boolean; // editorial "open whitespace" marker
  gap?: { kind: GapKind; note: string };
}

export interface VerticalMapData {
  slug: string;
  label: string;
  asOf: string;
  thesis: string;
  whitespace: { title: string; body: string }[];
  scorecard: { sublayer: string; occupants: string; state: "scarce" | "open" | "mid" | "contested" }[];
  companies: Record<string, VerticalCompany>;
  /** Sublayer-level placements. Layers not listed render generic infra/resource bands. */
  placements: SublayerPlacement[];
  /** Layers that should render as "vertical-agnostic" generic bands (skip per-cell). */
  genericLayers: { id: string; note: string }[];
  /** Footer attribution / notes. */
  notes: string;
}

const C = (
  key: string,
  name: string,
  tier: string,
  stage: CompanyStage,
  focus: string,
  scoi: string,
  fund: string,
  why: string,
  flag?: string,
): [string, VerticalCompany] => [key, { key, name, tier, stage, focus, scoi, fund, why, flag }];

const COMPANIES = Object.fromEntries([
  // Tier 1 / Growth
  C("harvey", "Harvey", "Execution platform", "growth",
    "Aspiring operating system for legal work, drafting, due diligence, research, review, agents.",
    "Primary L5a Domain Execution & Tool Use · Secondary L6b/L6c · Future moat L8d",
    "~$200M at $11B (Mar 2026, GIC+Sequoia). >$1B total. 100k+ lawyers, ~1,300 orgs.",
    "Sells execution, not a model. Bets usage compounds into ownable institutional memory (L8d).",
    "Contested (Jun 2026): re-graded from Fortress → Agent. Multi-layer position holds, but frontier models + LexisNexis/vLex/Westlaw/Legora closed the citation-and-workflow gap faster than expected. Counter-move: deepen L1 (proprietary case corpus) or L3 (jurisdictional gates). Lead is years, not decades."),
  C("legora", "Legora", "Execution platform", "growth",
    "Collaborative legal execution (formerly Leya), multi-lawyer workflows, agentic research, Word.",
    "Primary L5a Domain Execution & Tool Use · Secondary L6c · Future moat L8d",
    "$550M Series D at $5.55B (Mar 2026, Accel); ~$5.6B extension (Apr 2026). >$100M ARR.",
    "Clearest Harvey challenger; leans into collaborative execution + European base."),
  C("evenup", "EvenUp", "Vertical · outcome-data", "growth",
    "Personal-injury demand packages, end to end.",
    "Primary L5a · deep L1d Outcome Data moat · Secondary L3b",
    "$150M Series E at $2B+ (Oct 2025, Bessemer). ~$385M total.",
    "Owns the vertical workflow and accumulates settlement/outcome data rivals can't replicate."),
  C("supio", "Supio", "Vertical · outcome-data", "growth",
    "Legal AI for personal injury & mass tort.",
    "Primary L5a · L1d Outcome Data · Secondary L6c",
    "$60M Series B (May 2025, Sapphire; Mayfield, TR Ventures). ~$91M total.",
    "Vertical PI execution + compounding outcome data.",
    "Disregard the circulating '$3B / $400M Series E' figure, not supported by primary sources."),
  C("eve", "Eve", "Vertical · plaintiff", "growth",
    "AI platform for plaintiff-side firms.",
    "Primary L5a · Secondary L6c",
    "$103M Series B at $1B (Sep 2025, Spark). $47M Series A (a16z). ~$164M total.",
    "Plaintiff-side unicorn; key question is extension beyond PI."),
  C("luminance", "Luminance", "Specialized model + execution", "growth",
    "'Legal-Grade™' proprietary model for contract analysis & negotiation; agents.",
    "Primary L2b Specialized & Fine-Tuned Models · Secondary L5a",
    "$75M Series C (Feb 2025, Point72; Forestay). ~$165M total. UK/Europe.",
    "One of few pure-plays on a proprietary legal model, contested by foundation-model capability."),
  C("gcai", "GC AI", "Reasoning · in-house", "growth",
    "AI for in-house / GC teams; cited for real reasoning depth.",
    "Primary L5b Reasoning Scaffolds · Secondary L3b",
    "$60M Series B at $555M (Nov 2025, Scale VP + Northzone). ~$73M total.",
    "Different buyer (corporate legal). Founder is a 3× GC (Cecilia Ziniti)."),
  C("ivo", "Ivo", "Contract intelligence", "growth",
    "Enterprise AI contract review & search.",
    "Primary L5a · Secondary L7c",
    "$55M Series B (after $16M Series A, Feb 2025) led by Blackbird. Uber, Shopify, IBM, Reddit, Canva.",
    "Enterprise-grade contract review at scale; 'Ivo Search Agent' pushes toward retrieval."),

  // Early stage
  C("paxton", "Paxton AI", "Research · RAG", "early",
    "Fast, accuracy-first legal research & drafting.",
    "Primary L5c RAG Workflows · Secondary L3b Quality Gates",
    "$22M Series A (Jan 2025, Unusual Ventures). ~$28M total.",
    "Competes on trust, claims 94% non-hallucination on the Stanford legal benchmark."),
  C("alexi", "Alexi", "Research · litigation", "early",
    "Litigation research / case-law retrieval for litigators.",
    "Primary L5c · Secondary L8d",
    "$11M Series A (Jun 2024, Drive Capital; Draper). >$20M total. Canadian-founded.",
    "Early, partial claimant to institutional knowledge for litigation."),
  C("spellbook", "Spellbook", "Embedded copilot", "growth",
    "GenAI copilot inside Microsoft Word; transactional / contract drafting & review.",
    "Primary L7c Embedded & Embodied AI · Secondary L5a (via 'Associate' agent)",
    "$50M Series B (Oct 2025, Khosla/Rabois), $350M post-money, >$80M total. ~4,000 teams.",
    "Strongest pure-copilot story; climbing from Surface (L7) into Execution (L5)."),
  C("genie", "Genie AI", "Embedded copilot", "early",
    "Agentic legal AI; startup legal documents.",
    "Primary L7c / L5a · Secondary L6a Agent Loops",
    "$17.8M Series A (Nov 2025, GV/Google Ventures + Khosla).",
    "Agentic push from the document/copilot layer; GV-backed."),
  C("wordsmith", "Wordsmith AI", "In-house copilot", "early",
    "Legal intelligence / agents for in-house teams (contract review, risk, summaries).",
    "Primary L5a · Secondary L7c",
    "$25M Series A at ~$100M (Jun 2025, Index Ventures). Edinburgh.",
    "Fastest UK legal-AI Series A; 'legal agents' for in-house infra."),
  C("definely", "Definely", "In-Word drafting", "early",
    "AI contract drafting & document analysis inside Word; agentic 'Enhance'.",
    "Primary L7c · Secondary L5a",
    "$30M Series B (Jun 2025, led by Revaia; Clio, Octopus, Beacon). ~$40M total. UK.",
    "Deep Word integration; moving from copilot to agentic drafting. Notable: Clio is an investor."),
  C("legalfly", "LegalFly", "In-house workspace", "early",
    "AI-native workspace for in-house legal, compliance & procurement; security-first.",
    "Primary L5a · Secondary L3c Safety, Security & Provenance",
    "~$16M Series A (Belgium; Notion Capital, Fortino). 800%+ 2025 growth.",
    "Security/compliance posture as a wedge into regulated in-house buyers."),
  C("lawhive", "Lawhive", "Consumer / SMB legal", "growth",
    "UK consumer/SMB legal marketplace + AI assistant 'Lawrence'.",
    "Primary L7c / L5a",
    "$40M Series A (GV; ~£49M total).",
    "Demand-side play, owns the consumer relationship, not just the tooling."),
  C("pincites", "Pincites †", "Contract negotiation (exited)", "exit",
    "Contract-negotiation playbooks / auto-redlining in Word.",
    "Primary L7c",
    "Seed $3M (Friedman/Gross, YC) → acquired by Filevine (Dec 2025).",
    "Early exit, a copilot getting absorbed into a broader platform. Pattern to watch."),

  // Compliance / RegTech
  C("norm", "Norm Ai", "Compliance / RegTech", "early",
    "Regulatory AI agents, converts regulations into operational code.",
    "Primary L3a Compliance & Export Controls · Secondary L1b",
    "$27M Series A (Coatue; Citi, Bain, Blackstone). ~$38M total.",
    "Strongest L3a thesis, regulation-as-code is upstream, recurring, defensible."),
  C("delve", "Delve", "Compliance / RegTech", "early",
    "Agentic compliance (SOC2/HIPAA/GDPR) for startups.",
    "Primary L3a Compliance & Export Controls",
    "$32M Series A at $300M (Insight Partners).",
    "Compliance automation as a fast-growing wedge; high valuation for stage."),
  C("greenlite", "Greenlite AI", "Compliance / RegTech", "early",
    "AI compliance agents, KYC/AML/sanctions for banks & broker-dealers.",
    "Primary L3a Compliance & Export Controls",
    "$15M Series A (Greylock; Thomson Reuters Ventures). ~$20M total.",
    "Regulated-finance compliance, sticky, audit-grade buyers."),
  C("hadrius", "Hadrius", "Compliance / RegTech (fintech-adjacent)", "early",
    "AI SEC/RIA compliance for financial firms, comms review, archiving, trade monitoring.",
    "Primary L3a Compliance & Export Controls",
    "$2M seed (YC, 2023); ~$6M total raised. Smaller / earlier than the L3a leaders.",
    "Financial-compliance focus places it adjacent to legal, included for completeness.",
    "More fintech-compliance than legal; ~$6M total figure unverified."),
  C("vesence", "Vesence", "Quality / review agent", "early",
    "AI review/QC agent in Word & Outlook, style guides, consistency, fact-validation.",
    "Primary L3b Quality Gates · Secondary L7c",
    "$9M seed (Oct 2025, led by Emergence; Creandum, YC, 20VC, Paul Graham). SF.",
    "Positions as the accuracy/verification layer, a 'Legora rival' but wedge is quality-gating."),

  // IP / Patent
  C("deepip", "DeepIP", "IP / Patent", "growth",
    "AI patent drafting inside Word; 400+ IP teams.",
    "Primary L5a · Secondary L7c",
    "$25M Series B (Korelya, Serena). ~$40M total in nine months.",
    "Workflow-native (in-Word) patent drafting; standardizing across IP teams."),
  C("patlytics", "Patlytics", "IP / Patent", "growth",
    "End-to-end patent platform, disclosure, drafting, prosecution, infringement, litigation.",
    "Primary L5a · Secondary L5c",
    "$40M Series B (SignalFire).",
    "Full-lifecycle patent coverage; 'hallucination-free,' citation-backed."),
  C("solve", "Solve Intelligence", "IP / Patent", "growth",
    "AI patent drafting & prosecution.",
    "Primary L5a",
    "$40M Series B (Dec 2025).",
    "Direct DeepIP/Patlytics competitor, patent is its own well-funded sub-market."),
  C("nlpatent", "NLPatent", "IP / Patent research", "early",
    "AI patent research & search.",
    "Primary L5c · Secondary L1b",
    "$3M investment round.",
    "Retrieval/search side of patent vs. the drafting players."),

  // Litigation intelligence
  C("darrow", "Darrow", "Litigation origination", "growth",
    "Mines public documents to detect & originate class-action lawsuits.",
    "Primary L1d Outcome Data · Secondary L1a Public Data",
    "~$60M total ($35M Series B, Georgian; NFX, YC).",
    "Owns a proprietary lead-origination data engine, a true data moat, not a workflow."),
  C("theo", "Theo Ai", "Litigation outcome prediction", "early",
    "Predicts case outcomes / ranks claims by exposure & likely value.",
    "Primary L8e Learned World Models · Secondary L1d Outcome Data",
    "~$10M total ($4.2M seed May 2025 + $3.4M, Run Ventures).",
    "Closest thing to a 'learned world model' for litigation, claims 85% vs ~60-65% human accuracy."),
  C("wexler", "Wexler.ai", "Litigation fact-checking", "early",
    "Real-time fact-checking & dispute analysis for complex litigation at large firms.",
    "Primary L3b Quality Gates · Secondary L5c",
    "$5.3M seed (Sep 2025, Pear VC; Seedcamp, LegalTech Fund).",
    "Accuracy/verification layer for high-stakes litigation, quality-gate positioning."),

  // Research challengers
  C("midpage", "Midpage", "Legal research", "early",
    "AI-native legal research; 'Proposition Search'.",
    "Primary L5c RAG Workflows",
    "$4M seed (~$6.2M total).",
    "Reframes research as proposition→supporting case; competes with vLex/Vincent & Tier 1."),
  C("blueshoe", "Blueshoe", "Research + reasoning", "early",
    "Legal research & reasoning over curated + proprietary data pipelines.",
    "Primary L5c · Secondary L1b Proprietary Data",
    "YC-stage / early.",
    "Tries to capture the structure of legal thought with a proprietary data pipeline.",
    "Very early; limited public data."),

  // Immigration
  C("legalos", "LegalOS", "AI-native immigration firm", "early",
    "AI-native immigration law firm, USCIS-ready petitions in 24-48h.",
    "Vertically integrated L3→L5→L7 (immigration)",
    "YC W26.",
    "Studied 12,000 petitions; AI agents draft narratives, compile evidence, anticipate objections."),
  C("parley", "Parley", "Immigration automation", "early",
    "Automates flat-fee visa / green-card work for immigration lawyers.",
    "Primary L5a Domain Execution & Tool Use (immigration)",
    "YC.",
    "Targets the 80% reading/writing/compiling work in visa filing."),
  C("gale", "Gale", "Immigration platform", "early",
    "Fast, data-driven immigration platform.",
    "Primary L5a · Secondary L1d",
    "YC.",
    "Data-driven angle on a high-volume, document-heavy vertical."),

  // AI-native firms
  C("crosby", "Crosby", "AI-native law firm", "growth",
    "Hybrid AI law firm, contract review via Slack in <1h. Clients: Cursor, Clay, Unify.",
    "Vertically integrated L3→L5→L7 + delivery",
    "Seed $5.8M (Sequoia) + $20M Series A (Oct 2025, Cooley invests). ~$25.8M total.",
    "Sells legal *services*, not software, captures full margin + the resulting data."),
  C("garfield", "Garfield AI", "AI-native law firm", "early",
    "First SRA-authorized purely AI-based law firm (UK). Debt recovery / small claims.",
    "Vertically integrated L3→L5→L7 + delivery",
    "Seed-stage; ~£2 letters, ~£50 filings.",
    "Replaces the firm itself, collapses several SCOI layers into one entity."),

  // Data layer
  C("vlex", "vLex / Vincent AI", "Data layer (acquired)", "exit",
    "1B+ editorially enriched legal docs across 110 jurisdictions + Vincent AI.",
    "Primary L1b Proprietary Data · Secondary L5c",
    "Acquired by Clio for ~$1B (Nov 2025); Clio raised $500M Series G @ $5B.",
    "Proof the data layer is scarce, a billion-doc corpus gets bought, not rebuilt."),
  C("regbase", "Regbase", "Emerging · compliance data", "early",
    "Regulatory acquisition / monitoring / compliance intelligence.",
    "Primary L1b Proprietary Data · Secondary L3a",
    "Public data thin, flagged unverified.",
    "Closer to Bloomberg than Harvey, an upstream compliance-data layer.",
    "Limited public data; positioning inferred."),
  C("robin", "Robin AI †", "Cautionary tale (exited)", "exit",
    "Contract review & drafting copilot (former independent).",
    "Former L7c / L5a",
    "Distressed sale to Microsoft (Mar 2026). ~$26M Series B (2024); planned ~$50M failed; ~$10M ARR.",
    "A copilot with a shallow data moat, squeezed between L5 platforms and commoditizing models.",
    "The central risk of an L7-only position made concrete."),
]);

const placements: SublayerPlacement[] = [
  // L8 Memory
  { id: "L8a", gap: { kind: "horiz", note: "Framework / infra feature" } },
  { id: "L8b", gap: { kind: "feat", note: "Absorbed into L5 platforms" } },
  { id: "L8c", gap: { kind: "ws", note: "⌁ Network-effect whitespace" } },
  { id: "L8d", whitespace: true, primary: ["harvey", "legora"], secondary: ["alexi"] },
  { id: "L8e", whitespace: true, primary: ["theo"] },

  // L7 Surface
  { id: "L7a", gap: { kind: "horiz", note: "Commoditized by ChatGPT et al." } },
  { id: "L7b", gap: { kind: "horiz", note: "Horizontal media tools" } },
  { id: "L7c", primary: ["spellbook", "genie", "definely", "pincites", "robin"], secondary: ["deepip", "lawhive", "vesence"] },
  { id: "L7d", gap: { kind: "ws", note: "⌁ Transaction surface, held by DocuSign/Ironclad; AI-native version unbuilt" } },
  { id: "L7e", gap: { kind: "ws", note: "⌁ Emerging ambient surface" } },

  // L6 Orchestration
  { id: "L6a", secondary: ["genie"] },
  { id: "L6b", secondary: ["harvey"] },
  { id: "L6c", primary: ["eve"], secondary: ["legora", "supio"] },
  { id: "L6d", gap: { kind: "feat", note: "Built into L5 platforms" } },
  { id: "L6e", gap: { kind: "feat", note: "Built into L5 platforms" } },

  // L5 Execution
  { id: "L5a", primary: ["harvey", "legora", "evenup", "supio", "eve", "ivo", "wordsmith", "legalfly", "deepip", "patlytics", "solve", "parley", "gale"], secondary: ["luminance", "spellbook", "definely", "lawhive", "crosby", "garfield", "legalos"] },
  { id: "L5b", primary: ["gcai"] },
  { id: "L5c", primary: ["paxton", "alexi", "midpage", "blueshoe", "nlpatent"], secondary: ["vlex", "wexler", "patlytics"] },
  { id: "L5d", gap: { kind: "ws", note: "⌁ Firm-specific playbooks, under-built" } },
  { id: "L5e", gap: { kind: "feat", note: "Feature inside L5a/L7c products" } },

  // L4 Access
  { id: "L4a", gap: { kind: "horiz", note: "Horizontal integration infra" } },
  { id: "L4b", gap: { kind: "horiz", note: "Cross-industry protocol (emerging)" } },
  { id: "L4c", gap: { kind: "feat", note: "Platform feature" } },
  { id: "L4d", gap: { kind: "horiz", note: "Horizontal infra" } },
  { id: "L4e", gap: { kind: "ws", note: "⌁ Agent identity / provenance, open" } },

  // L3 Gates
  { id: "L3a", whitespace: true, primary: ["norm", "delve", "greenlite", "hadrius"], secondary: ["regbase"] },
  { id: "L3b", primary: ["paxton", "gcai", "wexler", "vesence"], secondary: ["evenup"] },
  { id: "L3c", secondary: ["legalfly"] },
  { id: "L3d", gap: { kind: "feat", note: "Platform feature" } },
  { id: "L3e", gap: { kind: "feat", note: "Platform feature" } },

  // L2 Models
  { id: "L2a", gap: { kind: "horiz", note: "Foundation labs (OpenAI / Anthropic / Google)" } },
  { id: "L2b", primary: ["luminance"], secondary: ["paxton"] },
  { id: "L2c", gap: { kind: "horiz", note: "Horizontal infra" } },
  { id: "L2d", gap: { kind: "horiz", note: "Horizontal / infra" } },
  { id: "L2e", gap: { kind: "horiz", note: "Foundation labs" } },

  // L1 Data
  { id: "L1a", secondary: ["darrow"] },
  { id: "L1b", primary: ["vlex", "regbase"], secondary: ["norm", "blueshoe", "nlpatent"] },
  { id: "L1c", gap: { kind: "ws", note: "⌁ Legal behavioral data, under-exploited" } },
  { id: "L1d", whitespace: true, primary: ["evenup", "supio", "darrow"], secondary: ["eve", "theo", "gale"] },
  { id: "L1e", gap: { kind: "ws", note: "⌁ Synthetic legal data, emerging" } },
];

export const LEGAL_MAP: VerticalMapData = {
  slug: "legal",
  label: "Legal",
  asOf: "AI-first companies · incl. early-stage · May 2026",
  thesis:
    "Value is bifurcating to L5 Domain Execution at the top (Harvey, Legora) and L1 Data underneath (outcome data + proprietary corpora). At the early stage, L5a is already crowded, differentiation must come from a vertical data moat, not the workflow. The fundable open layers are L3a Compliance & Export Controls, L1d / L8e litigation-outcome data, and the AI-native firm model.",
  whitespace: [
    { title: "L8d Institutional Knowledge, the unclaimed crown.", body: "Turn execution exhaust into structured, queryable memory. Everyone aspires; nobody owns it." },
    { title: "L1d / L8e litigation-outcome data.", body: "Theo Ai & Darrow are nearly alone in owning hard-to-copy case-outcome data. Outcome data beyond personal injury is wide open." },
    { title: "L3a Compliance & Export Controls.", body: "Norm Ai, Delve, Greenlite are early and few, an upstream, recurring, Bloomberg-shaped layer." },
    { title: "The AI-native firm (Crosby, Garfield, LegalOS).", body: "Doesn't sell software, replaces the firm. Captures full margin + outcome data. Highest variance." },
  ],
  scorecard: [
    { sublayer: "L1b Proprietary Data", occupants: "vLex/Vincent (acq. Clio), Regbase, Blueshoe", state: "scarce" },
    { sublayer: "L1d Outcome Data", occupants: "EvenUp, Supio, Eve, Darrow, Theo Ai", state: "open" },
    { sublayer: "L2b Specialized & Fine-Tuned Models", occupants: "Luminance, Paxton", state: "mid" },
    { sublayer: "L3a Compliance & Export Controls", occupants: "Norm Ai, Delve, Greenlite, Hadrius, Regbase", state: "open" },
    { sublayer: "L5a Domain Execution & Tool Use", occupants: "Harvey, Legora, EvenUp, Supio, Eve, Luminance, Ivo, Wordsmith, Definely, LegalFly, Lawhive, DeepIP, Patlytics, Solve, immigration trio", state: "contested" },
    { sublayer: "L5c RAG / Research", occupants: "Paxton, Alexi, Vincent, Midpage, Wexler, NLPatent", state: "contested" },
    { sublayer: "L7c Embedded Copilot", occupants: "Spellbook, Genie, Definely, DeepIP, Pincites†, Robin†", state: "mid" },
    { sublayer: "L8d Institutional Knowledge", occupants: "Harvey, Legora, Alexi (aspiring)", state: "open" },
    { sublayer: "L8e Learned World Models", occupants: "Theo Ai (litigation outcomes)", state: "open" },
  ],
  companies: COMPANIES,
  placements,
  genericLayers: [
    { id: "L0", note: "Vertical-agnostic, shared GPUs / silicon / data centers / cloud. Not legal-specific." },
    { id: "L-1", note: "Vertical-agnostic, energy, materials, fabrication. Not legal-specific." },
  ],
  notes:
    "† Pincites → acquired by Filevine (Dec 2025); Robin AI → distressed sale to Microsoft (Mar 2026). Funding from primary announcements + TechCrunch, Bloomberg, LawNext/LawSites, Artificial Lawyer, Sifted, Crunchbase. Valuations point-in-time (2025-26).",
};

import { WEALTH_MAP } from "./wealth";
import { SALES_TECH_MAP } from "./salesTech";

export const VERTICAL_DATASETS: Record<string, VerticalMapData> = {
  legal: LEGAL_MAP,
  wealth: WEALTH_MAP,
  "sales-tech": SALES_TECH_MAP,
};
