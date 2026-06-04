// WealthTech — full 10×50 sublayer placement dataset.
// Ported from Anand's WealthTech editorial map (v2, May 2026).
// SCOI vertical #2. Mirrors the legal map structure for direct comparability.

import type { VerticalMapData, VerticalCompany, CompanyStage, SublayerPlacement } from "./legal";

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
  // ── AI-native wealth firms (vertically integrated) ────────────────────────
  C("farther", "Farther", "AI-native wealth firm", "growth",
    "AI-native RIA — intelligent wealth management; 'AI Analyst' copilot for its advisors.",
    "Vertically integrated L5a Domain Execution + delivery · Secondary L7c · Future moat L8d household memory",
    "$150M Series D (General Atlantic), >$272M total; reported unicorn (Series C was $542M, Oct 2024). $23B+ recruited assets; ~12,000% revenue growth 2021–24.",
    "Not software-for-RIAs — IS the RIA. Captures full advisory margin and the data exhaust.",
    "Series D valuation undisclosed; 'unicorn' per press reports."),
  C("savvy", "Savvy Wealth", "AI-native wealth firm", "growth",
    "AI-native RIA recruiting advisors onto its platform; AI-augmented, human-centered advice.",
    "Vertically integrated L5a + delivery · Secondary L7c",
    "$72M Series B (Jul 2025), >$100M total. $2B+ AUM, 500% AUM growth since early 2024.",
    "Direct Farther competitor; same full-stack thesis."),
  C("arta", "Arta Finance", "AI private bank", "growth",
    "Digital private bank for HENRYs; Arta AI agent suite ($20/mo); alternatives access.",
    "Primary L5a + delivery · Secondary L7a (client-facing AI agents)",
    "Backed by Peak XV, Ribbit, Coatue, EDBI; Eric Schmidt among investors.",
    "Consumer-facing L7a agents — rare in this map.",
    "Total raised not confirmed — verify before quoting."),

  // ── Advisor copilots (L7c) ────────────────────────────────────────────────
  C("jump", "Jump", "Advisor copilot", "growth",
    "AI assistant for advisors — meeting prep, notes, summaries, workflow automation.",
    "Primary L7c · climbing toward L5a",
    "$20M Series A (Feb 2025) → $80M Series B; ~$105M total.",
    "Category leader in the most crowded cell. Must build a data layer or climb to execution to escape commoditization."),
  C("zocks", "Zocks", "Copilot + client data", "growth",
    "Client intelligence extracted from advisor conversations; enterprise integrations.",
    "Primary L7c · Secondary L1c Behavioral Data",
    "$13.8M Series A (Mar 2025) → $45M Series B; $65M total.",
    "Conversation-exhaust → proprietary client data. Best-positioned copilot to survive consolidation."),
  C("zeplyn", "Zeplyn", "Advisor copilot", "early",
    "Meeting notes → CRM workflows; compliance-aware. Ex-Google founders.",
    "Primary L7c",
    "$3M seed (Nov 2024, Leo Capital; Converge).",
    "Claims 10–12 hrs/wk saved; needs differentiation as notetaking commoditizes."),
  C("mili", "Mili", "Advisor copilot", "early",
    "AI meeting assistant for advisors.",
    "Primary L7c",
    "Seed (early).",
    "Crowded cohort; Parrot AI's acquisition signals consolidation.",
    "Thin public data."),
  C("powder", "Powder", "Sales execution", "early",
    "GenAI co-analyst for RIA prospecting — automated proposals & document analysis.",
    "Primary L5a (sales execution) · Secondary L7c",
    "$5.5M seed (YC, General Catalyst, Elefund). ~20 mid-size RIAs; $13B+ proposals generated.",
    "Execution wedge (winning clients) — different from the notetakers."),

  // ── Planning engines (L5b) ────────────────────────────────────────────────
  C("conquest", "Conquest Planning", "Planning engine", "growth",
    "AI-powered financial planning (SAM engine); estate & legacy depth.",
    "Primary L5b Decision Frameworks & Reasoning · Secondary L4a",
    "$80M Series B (Jun 2025, Growth Equity at Goldman Sachs Alternatives; Citi, TIAA, USAA, BNY, Canapi). >$100M total.",
    "Wealth's GC AI — reasoning over plans. Investor list = enterprise distribution."),

  // ── Estate & tax vertical (L5a / L1b) ─────────────────────────────────────
  C("wealthcom", "Wealth.com", "Estate vertical", "growth",
    "AI estate planning; 'Ester AI' reads & structures estate documents.",
    "Primary L5a (estate) · Secondary L1b (proprietary estate-doc corpus)",
    "$65M Series B (Titanium Ventures; Schwab, GV, Citi Ventures, Dynasty).",
    "Document-heavy vertical; Schwab on the cap table = incumbent optionality."),
  C("vanilla", "Vanilla", "Estate vertical", "growth",
    "AI estate planning for advisors.",
    "Primary L5a (estate)",
    "Reported backing incl. Insight Partners & Vanguard.",
    "Wealth.com's closest competitor.",
    "Funding not verified — confirm before use."),
  C("fpalpha", "FP Alpha", "Tax/estate insights", "early",
    "AI tax & estate document insights for advisors.",
    "Primary L5c",
    "—",
    "Reads client documents and surfaces planning opportunities.",
    "Funding not verified."),

  // ── Research / RAG (L5c) ──────────────────────────────────────────────────
  C("brightwave", "Brightwave", "Research / RAG", "early",
    "AI research over filings, transcripts, sell-side, memos.",
    "Primary L5c RAG Workflows",
    "$15M Series A (Decibel; OMERS); $6M seed. 4x revenue growth post-seed.",
    "Research synthesis as product; competes with horizontal finance AI."),
  C("rogo", "Rogo (adjacent)", "Institutional finance AI", "growth",
    "AI analyst for investment banking / institutional finance.",
    "Primary L5c — adjacent; core market is IB / asset management",
    "$50M B (Thrive, JPM, Tiger) → $75M C at $750M (Sequoia, Jan 2026) → $160M D (Kleiner Perkins). >$300M total.",
    "Shows how big finance-research AI gets — but isn't advisor wealthtech.",
    "Adjacent — included for completeness."),

  // ── Compliance (L3a) ──────────────────────────────────────────────────────
  C("hadrius", "Hadrius", "RIA compliance", "early",
    "AI SEC/RIA compliance — comms review, marketing review, archiving, trade monitoring.",
    "Primary L3a Compliance Gates",
    "$2M seed (YC, 2023); ~$6M total (unverified).",
    "This map is its HOME vertical — nearly alone at L3a. Clearest open, fundable cell."),
  C("greenlite", "Greenlite AI (adjacent)", "Compliance / RegTech", "early",
    "KYC/AML agents for banks & broker-dealers.",
    "Primary L3a — banking-side; brushes wealth via broker-dealers",
    "$15M Series A (Greylock; TR Ventures). ~$20M total.",
    "Adjacent occupant of the compliance cell."),
]);

const placements: SublayerPlacement[] = [
  // L8 Memory
  { id: "L8a", gap: { kind: "horiz", note: "Framework / infra feature" } },
  { id: "L8b", gap: { kind: "feat", note: "Absorbed into platforms" } },
  { id: "L8c", gap: { kind: "ws", note: "⌁ Cross-household network learning — open" } },
  { id: "L8d", whitespace: true, primary: ["farther", "savvy"] },
  { id: "L8e", gap: { kind: "ws", note: "⌁ Predictive household / market world models — open" } },

  // L7 Surface
  { id: "L7a", primary: ["arta"] },
  { id: "L7b", gap: { kind: "horiz", note: "Horizontal media tools" } },
  { id: "L7c", primary: ["jump", "zocks", "zeplyn", "mili"], secondary: ["farther", "savvy", "powder"] },
  { id: "L7d", gap: { kind: "ws", note: "⌁ Custodians (Schwab, Fidelity) hold the rails — AI-native version unbuilt (DocuSign pattern)" } },
  { id: "L7e", gap: { kind: "ws", note: "⌁ Ambient monitoring of client life events — emerging" } },

  // L6 Orchestration
  { id: "L6a", gap: { kind: "feat", note: "Built into platforms" } },
  { id: "L6b", gap: { kind: "feat", note: "Built into platforms" } },
  { id: "L6c", gap: { kind: "feat", note: "Built into platforms" } },
  { id: "L6d", gap: { kind: "feat", note: "Built into platforms" } },
  { id: "L6e", gap: { kind: "feat", note: "Built into platforms" } },

  // L5 Execution
  { id: "L5a", primary: ["farther", "savvy", "arta", "wealthcom", "powder", "vanilla"], secondary: ["jump"] },
  { id: "L5b", primary: ["conquest"] },
  { id: "L5c", primary: ["brightwave", "fpalpha"], secondary: ["rogo"] },
  { id: "L5d", gap: { kind: "feat", note: "Feature inside L5a / L7c products" } },
  { id: "L5e", gap: { kind: "feat", note: "Feature inside L5a / L7c products" } },

  // L4 Access
  { id: "L4a", secondary: ["conquest"] },
  { id: "L4b", gap: { kind: "horiz", note: "Cross-industry protocol (emerging)" } },
  { id: "L4c", gap: { kind: "feat", note: "Platform feature" } },
  { id: "L4d", gap: { kind: "horiz", note: "Horizontal infra" } },
  { id: "L4e", gap: { kind: "ws", note: "⌁ Agent identity / provenance — open" } },

  // L3 Gates
  { id: "L3a", whitespace: true, primary: ["hadrius"], secondary: ["greenlite"] },
  { id: "L3b", gap: { kind: "ws", note: "⌁ Advice quality / suitability gates — open" } },
  { id: "L3c", gap: { kind: "feat", note: "Platform feature" } },
  { id: "L3d", gap: { kind: "feat", note: "Platform feature" } },
  { id: "L3e", gap: { kind: "ws", note: "⌁ FINRA marketing-review automation — emerging" } },

  // L2 Models
  { id: "L2a", gap: { kind: "horiz", note: "Foundation labs (OpenAI / Anthropic / Google)" } },
  { id: "L2b", gap: { kind: "ws", note: "⌁ No meaningful wealth-specific models yet — foundation models suffice so far" } },
  { id: "L2c", gap: { kind: "horiz", note: "Horizontal infra" } },
  { id: "L2d", gap: { kind: "horiz", note: "Horizontal / infra" } },
  { id: "L2e", gap: { kind: "horiz", note: "Foundation labs" } },

  // L1 Data
  { id: "L1a", gap: { kind: "horiz", note: "Market data incumbents (Bloomberg, Morningstar, exchanges)" } },
  { id: "L1b", primary: ["wealthcom"] },
  { id: "L1c", whitespace: true, primary: ["zocks"] },
  { id: "L1d", gap: { kind: "ws", note: "⌁ Plan-vs-outcome data — unclaimed by AI-natives. Incumbents hold raw data but haven't productized outcome intelligence" } },
  { id: "L1e", gap: { kind: "ws", note: "⌁ Synthetic households / scenarios — emerging" } },
];

export const WEALTH_MAP: VerticalMapData = {
  slug: "wealth",
  label: "WealthTech",
  asOf: "AI-native wealthtech · seed → growth · May 2026 (v2, post-audit)",
  thesis:
    "WealthTech inverted the legal-AI playbook. The biggest capital is going to AI-native FIRMS (Farther, Savvy) — not software sold to firms. The advisor-copilot layer (L7c) is the crowded, commoditizing middle — the Robin AI position. The open prizes: L1d plan-vs-outcome data (unclaimed by AI-natives), L8d household memory, and L3a RIA compliance.",
  whitespace: [
    { title: "L1d plan-vs-outcome data — unclaimed by AI-natives.", body: "Incumbents (eMoney, Morningstar, custodians) hold raw plan/portfolio data but haven't productized outcome intelligence. Wealth's EvenUp doesn't exist yet. Whoever builds it owns pricing, benchmarking, and the trust layer." },
    { title: "L8d household memory.", body: "Multi-generational client knowledge as structured memory. Integrated firms are best positioned but distracted by growth — a neutral layer could still emerge." },
    { title: "L3a RIA compliance.", body: "The Norm Ai / Delve playbook applied to wealth — recurring, audit-grade, nearly empty. Hadrius is alone at seed." },
    { title: "L7d transaction surface.", body: "Custodians (Schwab, Fidelity) hold the rails; an AI-native layer on account opening / transfers — where outcome data lives — is open." },
    { title: "Copilot consolidation arbitrage.", body: "L7c will consolidate (Parrot AI already acquired). Winner = whoever converts notes into a proprietary L1c behavioral asset first (Zocks' thesis)." },
  ],
  scorecard: [
    { sublayer: "L1c Behavioral Data", occupants: "Zocks (conversation exhaust)", state: "open" },
    { sublayer: "L1d Outcome Data", occupants: "No AI-native owner — incumbents hold raw data", state: "open" },
    { sublayer: "L3a Compliance Gates", occupants: "Hadrius (small), Greenlite (adjacent)", state: "open" },
    { sublayer: "L5a Execution (as firms)", occupants: "Farther, Savvy, Arta; Wealth.com, Powder, Vanilla", state: "contested" },
    { sublayer: "L5b Planning / Reasoning", occupants: "Conquest", state: "mid" },
    { sublayer: "L5c Research / RAG", occupants: "Brightwave (Rogo adjacent), FP Alpha", state: "contested" },
    { sublayer: "L7c Advisor Copilot", occupants: "Jump, Zocks, Zeplyn, Mili (Parrot AI acq.)", state: "contested" },
    { sublayer: "L7d Transaction Surface", occupants: "Nobody AI-native — custodians hold the rails", state: "scarce" },
    { sublayer: "L8d Household Memory", occupants: "Farther / Savvy best positioned", state: "open" },
  ],
  companies: COMPANIES,
  placements,
  genericLayers: [
    { id: "L0", note: "Vertical-agnostic — shared GPUs / silicon / data centers / cloud. Not wealth-specific." },
    { id: "L-1", note: "Vertical-agnostic — energy, materials, fabrication. Not wealth-specific." },
  ],
  notes:
    "v2, post-audit. Verified: Farther, Savvy, Jump, Zocks, Conquest, Wealth.com, Brightwave, Rogo, Zeplyn, Powder, Hadrius. Flagged: Arta total, Vanilla, FP Alpha, Mili. Range excluded (unverified). '$4.2B 2025 wealthtech funding' figure single-source (TFN). Sources: General Atlantic, BusinessWire, WealthManagement.com, InvestmentNews, Financial Planning, Celent, TFN. Valuations point-in-time (2025-26).",
};
