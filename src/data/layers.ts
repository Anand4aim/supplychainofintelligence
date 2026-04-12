export interface SubLayer {
  id: string;
  name: string;
  desc: string;
  defensible?: boolean; // ★ marker
}

export interface Layer {
  id: string;
  name: string;
  shortName: string;
  color: string;
  bg: string;
  desc: string;
  detail: string;
  goldIcon: string; // sketch icon name from SketchIcons
  goldTitle: string;
  goldAnalogy: string;
  players: string[];
  verdict: string;
  sublayers: SubLayer[];
}

export const LAYERS: Layer[] = [
  {
    id: "L0", name: "Physical Substrate", shortName: "Physical", color: "var(--layer-0)", bg: "var(--layer-0-bg)",
    desc: "The shovels. Chips, data centers, energy, cooling — the floor everything stands on.",
    detail: "Before a single token is generated, someone has to build the physical infrastructure. When L2 commoditizes, value accrues to L0. NVIDIA doesn't care which model wins — they sell to all of them.",
    goldIcon: "pickaxe",
    goldTitle: "The Shovels & Mining Equipment",
    goldAnalogy: "Before anyone finds gold, someone has to build the pickaxes, drill rigs, and mine shafts. In AI: NVIDIA builds the GPUs, CoreWeave builds the data centers, energy companies power the grid. No shovels → no gold rush. When L2 commoditizes, value accrues back here — just like mining equipment companies outlasted most gold miners.",
    players: ["NVIDIA", "AMD", "TSMC", "CoreWeave", "Equinix"],
    verdict: "Shovel sellers win every gold rush.",
    sublayers: [
      { id: "L0a", name: "Chips", desc: "NVIDIA, AMD, TSMC" },
      { id: "L0b", name: "Data Centers", desc: "Equinix, CoreWeave, hyperscalers" },
      { id: "L0c", name: "Energy", desc: "Grid, nuclear, renewables, behind-the-meter", defensible: true },
      { id: "L0d", name: "Cooling & Raw Materials", desc: "Thermal management, rare earths" },
    ],
  },
  {
    id: "L1", name: "Data & Knowledge", shortName: "Data", color: "var(--layer-1)", bg: "var(--layer-1-bg)",
    desc: "The foundation. What data do you have that nobody else can get?",
    detail: "Proprietary datasets are the raw fuel. More agents = more demand for data. The L1b test: if your data is public, the model layer wins.",
    goldIcon: "rock",
    goldTitle: "The Raw Gold Ore",
    goldAnalogy: "The unrefined material pulled from the earth. Some mines have pure veins (proprietary data) — others have common dirt (public data). In AI: your proprietary data is your gold deposit. Public data is already mined by everyone. The L1b test: if your data is public, the model layer wins.",
    players: ["Apollo.io", "Bloomberg", "ZoomInfo", "Scale AI"],
    verdict: "Structurally safe. API-first wins.",
    sublayers: [
      { id: "L1a", name: "Public", desc: "Open training data, no moat" },
      { id: "L1b", name: "Proprietary", desc: "Behind enterprise walls, deepest moat", defensible: true },
      { id: "L1c", name: "Behavioral", desc: "What users do, interaction exhaust", defensible: true },
      { id: "L1d", name: "Outcome", desc: "What worked, trains L5, closes the flywheel", defensible: true },
    ],
  },
  {
    id: "L2", name: "Model & Reasoning", shortName: "Models", color: "var(--layer-2)", bg: "var(--layer-2-bg)",
    desc: "The reasoning engine. Rent early, build custom at scale.",
    detail: "Foundation models are the smelters — expensive, few can operate at scale. But once refined, the gold is a commodity — which is why model providers need to move up the chain.",
    goldIcon: "flame",
    goldTitle: "The Smelter & Refinery",
    goldAnalogy: "Raw ore becomes pure gold through smelting. In AI: foundation models (Claude, GPT, Gemini) are the smelters — they transform raw data into intelligence. Refining is expensive and only a few can do it at scale. But once refined, the gold is a commodity — which is why model providers need to move up the chain.",
    players: ["OpenAI", "Anthropic", "Google DeepMind", "Meta AI"],
    verdict: "Winner-take-most. Commodity risk high.",
    sublayers: [
      { id: "L2a", name: "Foundation", desc: "Claude, GPT, Gemini, Llama" },
      { id: "L2b", name: "Fine-tuned", desc: "Vertical-specific on L1b data" },
      { id: "L2c", name: "Specialized", desc: "Code, math, vision models" },
      { id: "L2d", name: "Constellation", desc: "Multi-model routing, never locked in" },
    ],
  },
  {
    id: "L3", name: "Trust & Governance", shortName: "Trust", color: "var(--layer-3)", bg: "var(--layer-3-bg)",
    desc: "The compliance gate. Can the enterprise trust your system?",
    detail: "Without the hallmark, no enterprise buyer touches it. L3 is the slowest moat to build and the hardest to replicate.",
    goldIcon: "shield",
    goldTitle: "The Hallmark & Assay Office",
    goldAnalogy: "Before gold enters the market, the assay office verifies purity. The hallmark guarantees quality. In AI: trust is the compliance gate — guardrails, safety, governance, audit trails. Without the hallmark, no enterprise buyer touches it. L3 is the slowest moat to build and the hardest to replicate.",
    players: ["Vanta", "Drata", "OneTrust"],
    verdict: "Essential. More agents = more access control.",
    sublayers: [
      { id: "L3a", name: "Certifications", desc: "SOC 2, HIPAA, GDPR, incumbent advantage" },
      { id: "L3b", name: "Guardrails", desc: "Hallucination prevention, content safety" },
      { id: "L3c", name: "Ethical Walls", desc: "Information barriers, Chinese walls" },
      { id: "L3d", name: "Doctrines", desc: "Codified AI principles, constitutional rules", defensible: true },
    ],
  },
  {
    id: "L4", name: "Access & Integration", shortName: "Access", color: "var(--layer-4)", bg: "var(--layer-4-bg)",
    desc: "The integration layer. What systems can your agent reach?",
    detail: "Grammarly survived because it had railroad tracks (plugins) into Word, Gmail, Chrome. Jasper had no tracks. Deep integrations create switching costs.",
    goldIcon: "railroad",
    goldTitle: "The Railroads & Transport",
    goldAnalogy: "Refined gold needs to move — by rail, armored truck, secure vault. In AI: APIs, SDKs, plugins, MCP connectors are the railroads. Supabase, LangChain, Vercel — they build the transport layer. Grammarly survived because it had railroad tracks (plugins) into Word, Gmail, Chrome. Jasper had no tracks.",
    players: ["AWS", "Snowflake", "Supabase", "Twilio"],
    verdict: "Load-bearing walls. Invest accordingly.",
    sublayers: [
      { id: "L4a", name: "Standard APIs", desc: "REST, webhooks, no moat" },
      { id: "L4b", name: "Deep Integrations", desc: "Bi-directional, audited, switching costs", defensible: true },
      { id: "L4c", name: "MCP Protocol", desc: "Open standard, Anthropic's TCP/IP play", defensible: true },
      { id: "L4d", name: "Permission Governance", desc: "Scoping, RBAC, audit trails" },
    ],
  },
  {
    id: "L5", name: "Skills & Expertise", shortName: "Skills", color: "var(--layer-5)", bg: "var(--layer-5-bg)",
    desc: "What domain expertise is encoded as agent behavior?",
    detail: "A jeweler takes refined gold and crafts rings, necklaces, watches — each requiring specialized skill. L5 is THE entry point for AI-native companies.",
    goldIcon: "gem",
    goldTitle: "The Master Jeweler",
    goldAnalogy: "A jeweler takes refined gold and crafts rings, necklaces, watches — each requiring specialized skill. In AI: domain skills transform generic intelligence into specific capability. Harvey knows legal reasoning. Sierra knows customer service. L5 is THE entry point for AI-native companies.",
    players: ["Harvey", "Sierra", "11x", "Cursor"],
    verdict: "Durable if deep. Generic skills get absorbed.",
    sublayers: [
      { id: "L5a", name: "Generic", desc: "Summarize, translate — model absorbs" },
      { id: "L5b", name: "Domain Execution", desc: "Process refund, draft contract, code diagnosis", defensible: true },
      { id: "L5c", name: "Mindset Frameworks", desc: "Decision heuristics, reasoning patterns", defensible: true },
      { id: "L5d", name: "Company Playbooks", desc: "Your SOPs, clause preferences, escalation logic", defensible: true },
    ],
  },
  {
    id: "L6", name: "Orchestration", shortName: "Orchestration", color: "var(--layer-6)", bg: "var(--layer-6-bg)",
    desc: "How do you compose skills into multi-step processes?",
    detail: "A single ring is useful. A curated jewelry collection with tasting, fitting, and custom design is an experience. Orchestration composes individual skills into entire workflows.",
    goldIcon: "storefront",
    goldTitle: "The Jewelry Store & Workshop",
    goldAnalogy: "A single ring is useful. A curated jewelry collection with tasting, fitting, and custom design is an experience. In AI: orchestration composes individual skills into multi-step workflows. Cursor orchestrates code skills into dev workflows. One skill → one task. Orchestration → entire workflows.",
    players: ["LangChain", "CrewAI", "Zapier (at risk)", "Make (at risk)"],
    verdict: "Contested. Becoming a feature, not a product.",
    sublayers: [
      { id: "L6a", name: "Simple Chains", desc: "Linear pipelines, commodity" },
      { id: "L6b", name: "Agent Loops", desc: "Plan→execute→evaluate→iterate", defensible: true },
      { id: "L6c", name: "Multi-Agent", desc: "Agent-to-agent handoff, composability" },
      { id: "L6d", name: "Human-in-Loop", desc: "Escalation, approval gates", defensible: true },
    ],
  },
  {
    id: "L7", name: "Expression & Surfaces", shortName: "Expression", color: "var(--layer-7)", bg: "var(--layer-7-bg)",
    desc: "How and where does the user meet the intelligence?",
    detail: "People see the ring on the finger — the surface, the sparkle. If all you own is the display case (L7), anyone can build another display case. Modality commoditizes; context is the moat.",
    goldIcon: "ring",
    goldTitle: "Wearing the Jewelry — The Moment of Experience",
    goldAnalogy: "People see the ring on the finger — the surface, the sparkle, the emotional moment. In AI: L7 is the UI, the chat interface, the dashboard — where users interact with intelligence. Beautiful, but the most exposed layer. If all you own is the display case (L7), anyone can build another display case.",
    players: ["ChatGPT", "Gemini", "Copilot", "ElevenLabs"],
    verdict: "Modality = commodity. Context = moat.",
    sublayers: [
      { id: "L7a", name: "Text", desc: "Chat, email, document" },
      { id: "L7b", name: "Voice", desc: "Phone, assistant, podcast (ElevenLabs, Deepgram)" },
      { id: "L7c", name: "Visual", desc: "Video avatar, screen gen (Synthesia, HeyGen)" },
      { id: "L7d", name: "Embedded", desc: "In-workflow: Harvey in Word, Cursor in IDE", defensible: true },
      { id: "L7e", name: "Transaction Surface", desc: "Present at the moment of decision", defensible: true },
    ],
  },
  {
    id: "L8", name: "Memory & Learning", shortName: "Memory", color: "var(--layer-8)", bg: "var(--layer-8-bg)",
    desc: "What does the system remember and compound over time?",
    detail: "The jeweler keeps records: which designs sold, which metals each customer prefers. Over time, this memory makes every decision better. Memory is the only layer that gets stronger every day.",
    goldIcon: "book",
    goldTitle: "The Record Book — Compounding Knowledge",
    goldAnalogy: "The jeweler keeps records: which designs sold, which metals each customer prefers, what styles trend each season. Over time, this memory makes every decision better. In AI: L8 is compound learning — Cursor remembers developer patterns, Harvey accumulates case law. The system that remembers wins long-term. Memory is the only layer that gets stronger every day.",
    players: ["Sierra", "Notion (partial)", "Rewind AI"],
    verdict: "The ultimate moat. Memory that compounds wins.",
    sublayers: [
      { id: "L8a", name: "Session", desc: "In-conversation context, table stakes" },
      { id: "L8b", name: "Entity", desc: "Per-customer history & preferences" },
      { id: "L8c", name: "Cross-Customer", desc: "Collective patterns, ultimate moat", defensible: true },
      { id: "L8d", name: "Institutional", desc: "Org-wide learned patterns, decision precedents", defensible: true },
    ],
  },
];

export const DEFENSIBLE_TRIANGLE = "L1b + L5b/c/d + L8c/d";

export const GOLD_KEY_INSIGHT = "Each layer transforms the output of the layer below it. Raw ore (L1) is useless without refining (L2). Refined gold is useless without transport (L4). A skilled jeweler (L5) is useless without a storefront (L7). And none of it compounds without record-keeping (L8). The supply chain is only as strong as its weakest layer — and most companies only own one.";
