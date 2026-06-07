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
    id: "L-1", name: "Resources", shortName: "Resources", color: "var(--layer-neg1)", bg: "var(--layer-neg1-bg)",
    desc: "What supports the chain. Energy, water, fabs, materials, skilled trades — the inputs the entire stack consumes.",
    detail: "Before chips, before data centers, before models — there's power, water, foundries, rare earths, and the humans who build it all. When AI demand explodes, the bottleneck isn't algorithms. It's megawatts and skilled trades.",
    goldIcon: "rock",
    goldTitle: "The Ground Itself — Land, Power, Materials",
    goldAnalogy: "Before the gold rush, you need land, water rights, ore deposits, and the miners who work the seams. In AI: power generation, cooling water, foundry capacity, rare earths, and the electricians and technicians who physically build the boom. When demand spikes, this layer is the real bottleneck.",
    players: ["NextEra", "TSMC fabs", "MP Materials", "Vistra", "Bechtel"],
    verdict: "The real bottleneck. Slow to build, impossible to fake.",
    sublayers: [
      { id: "L-1a", name: "Energy", desc: "Power generation and procurement for AI compute" },
      { id: "L-1b", name: "Thermal & Water Management", desc: "Cooling systems, water access, heat dissipation at scale" },
      { id: "L-1c", name: "Fabrication & Foundry", desc: "Chip fabrication capacity and semiconductor manufacturing" },
      { id: "L-1d", name: "Critical Materials", desc: "Rare earths, lithium, cobalt, specialized substrates" },
      { id: "L-1e", name: "Skilled Trades & Human Capital", desc: "Electricians, technicians, data-center builders, hardware engineers" },
    ],
  },
  {
    id: "L0", name: "Infrastructure", shortName: "Infra", color: "var(--layer-0)", bg: "var(--layer-0-bg)",
    desc: "The shovels. Chips, data centers, networking, cloud, edge — what is needed to process intelligence.",
    detail: "The compute substrate. NVIDIA doesn't care which model wins — they sell to all of them. When L2 commoditizes, value accrues to L0.",
    goldIcon: "pickaxe",
    goldTitle: "The Shovels & Mining Equipment",
    goldAnalogy: "Before anyone finds gold, someone has to build the pickaxes, drill rigs, and mine shafts. In AI: NVIDIA builds the GPUs, CoreWeave builds the data centers, hyperscalers run the clouds. No shovels → no gold rush. Shovel sellers outlast most miners.",
    players: ["NVIDIA", "AMD", "TSMC", "CoreWeave", "Equinix"],
    verdict: "Shovel sellers win every gold rush.",
    sublayers: [
      { id: "L0a", name: "Silicon", desc: "GPUs, TPUs, custom AI accelerators" },
      { id: "L0b", name: "Data Centers", desc: "Physical facilities housing compute at scale" },
      { id: "L0c", name: "Interconnect Fabric", desc: "Networking between chips, racks, regions, clouds" },
      { id: "L0d", name: "Compute Access Cloud", desc: "On-demand compute rental and scheduling" },
      { id: "L0e", name: "Edge & On-Device Compute", desc: "Local inference on phones, vehicles, sensors, endpoints" },
    ],
  },
  {
    id: "L1", name: "Data", shortName: "Data", color: "var(--layer-1)", bg: "var(--layer-1-bg)",
    desc: "The raw input. What data do you have that nobody else can get?",
    detail: "Proprietary datasets are the raw fuel. More agents = more demand for data. The L1b test: if your data is public, the model layer wins.",
    goldIcon: "rock",
    goldTitle: "The Raw Gold Ore",
    goldAnalogy: "The unrefined material pulled from the earth. Some mines have pure veins (proprietary data) — others have common dirt (public data). Public data is already mined by everyone. The L1b test: if your data is public, the model layer wins.",
    players: ["Apollo.io", "Bloomberg", "ZoomInfo", "Scale AI"],
    verdict: "Structurally safe. API-first wins.",
    sublayers: [
      { id: "L1a", name: "Public & Open Data", desc: "Common Crawl, Wikipedia, government data, open datasets" },
      { id: "L1b", name: "Proprietary Data", desc: "Licensed, paywalled, or internally generated training corpora", defensible: true },
      { id: "L1c", name: "Behavioral Data", desc: "Clicks, sessions, usage patterns, interaction logs", defensible: true },
      { id: "L1d", name: "Outcome Data", desc: "Labels, results, conversions — what actually happened", defensible: true },
      { id: "L1e", name: "Synthetic Data", desc: "Machine-generated data for training, augmentation, simulation" },
    ],
  },
  {
    id: "L2", name: "Models", shortName: "Models", color: "var(--layer-2)", bg: "var(--layer-2-bg)",
    desc: "Intelligence refinement. Rent early, build custom at scale.",
    detail: "Foundation models are the smelters — expensive, few can operate at scale. Once refined, the gold is a commodity — which is why model providers need to move up the chain.",
    goldIcon: "flame",
    goldTitle: "The Smelter & Refinery",
    goldAnalogy: "Raw ore becomes pure gold through smelting. In AI: foundation, specialized, and reasoning models refine raw data into intelligence. Refining is expensive and only a few can do it at scale — but once refined, the gold is a commodity.",
    players: ["OpenAI", "Anthropic", "Google DeepMind", "Meta AI"],
    verdict: "Winner-take-most. Commodity risk high.",
    sublayers: [
      { id: "L2a", name: "Foundation Models", desc: "Large pre-trained models — GPT, Claude, Gemini, Llama" },
      { id: "L2b", name: "Specialized Models", desc: "Domain fine-tuned or distilled models for specific verticals" },
      { id: "L2c", name: "Embedding & Retrieval", desc: "Vector representations, search indices, RAG infrastructure" },
      { id: "L2d", name: "Model Routing & Composition", desc: "Selecting, chaining, or ensembling multiple models per task" },
      { id: "L2e", name: "Reasoning Models", desc: "Extended chain-of-thought, planning, multi-step inference" },
    ],
  },
  {
    id: "L3", name: "Gatekeeping", shortName: "Gates", color: "var(--layer-3)", bg: "var(--layer-3-bg)",
    desc: "Trust, acceptance, approval. Can the system be allowed in?",
    detail: "Without the hallmark, no enterprise buyer touches it. L3 is the slowest moat to build and the hardest to replicate.",
    goldIcon: "shield",
    goldTitle: "The Hallmark & Assay Office",
    goldAnalogy: "Before gold enters the market, the assay office verifies purity and the hallmark guarantees quality. In AI: compliance, evals, safety, editorial taste, and distribution control are the gates. Without the hallmark, no enterprise — and no app store — lets you in.",
    players: ["Vanta", "Drata", "OneTrust", "Apple App Store"],
    verdict: "Essential. More agents = more access control.",
    sublayers: [
      { id: "L3a", name: "Compliance Gates", desc: "Regulatory, legal, and policy filters — HIPAA, GDPR, SOC 2, EU AI Act" },
      { id: "L3b", name: "Quality Gates", desc: "Accuracy, hallucination detection, output grading, evals" },
      { id: "L3c", name: "Safety & Security", desc: "Harmful content filtering, adversarial defense, prompt-injection protection" },
      { id: "L3d", name: "Editorial Gates", desc: "Tone, brand voice, style, taste — the human judgment layer", defensible: true },
      { id: "L3e", name: "Distribution Gates", desc: "App store approval, ranking, marketplace curation, discovery control", defensible: true },
    ],
  },
  {
    id: "L4", name: "Access", shortName: "Access", color: "var(--layer-4)", bg: "var(--layer-4-bg)",
    desc: "Connectivity, permissions, integrations — the pipes layer.",
    detail: "Grammarly survived because it had railroad tracks (plugins) into Word, Gmail, Chrome. Jasper had no tracks. Deep integrations and agent identity create switching costs.",
    goldIcon: "railroad",
    goldTitle: "The Railroads & Transport",
    goldAnalogy: "Refined gold needs to move — by rail, armored truck, secure vault. In AI: APIs, MCP, real-time pipes, and agent identity move intelligence between systems. Grammarly survived because it had tracks into every workflow. Jasper had none.",
    players: ["AWS", "Snowflake", "Supabase", "Twilio"],
    verdict: "Load-bearing walls. Invest accordingly.",
    sublayers: [
      { id: "L4a", name: "API & Integration Layer", desc: "REST/GraphQL endpoints, SDKs, webhooks connecting AI to systems" },
      { id: "L4b", name: "Agent Interface Protocols", desc: "MCP, tool-use specs, agent-to-agent communication standards", defensible: true },
      { id: "L4c", name: "Access Governance", desc: "Who can use what, RBAC, scoping, audit trails" },
      { id: "L4d", name: "Real-Time Interaction Infrastructure", desc: "Streaming, voice pipelines, video, low-latency modality transport" },
      { id: "L4e", name: "Agent Identity & Provenance", desc: "Verifying which agent acted, credential chains, trust signatures", defensible: true },
    ],
  },
  {
    id: "L5", name: "Execution", shortName: "Execution", color: "var(--layer-5)", bg: "var(--layer-5-bg)",
    desc: "Applied skills and capabilities. Doing the actual work.",
    detail: "A jeweler takes refined gold and crafts rings, necklaces, watches — each requiring specialized skill. L5 is THE entry point for AI-native companies.",
    goldIcon: "gem",
    goldTitle: "The Master Jeweler",
    goldAnalogy: "A jeweler takes refined gold and crafts rings, necklaces, watches — each requiring specialized skill. In AI: domain skills, decision frameworks, and operating playbooks transform generic intelligence into specific capability. Harvey knows legal. Sierra knows CX.",
    players: ["Harvey", "Sierra", "11x", "Cursor"],
    verdict: "Durable if deep. Generic skills get absorbed.",
    sublayers: [
      { id: "L5a", name: "Domain Execution", desc: "Doing the actual work — legal drafting, code generation, diagnosis, underwriting", defensible: true },
      { id: "L5b", name: "Decision Frameworks & Reasoning Scaffolds", desc: "Structured thinking patterns, checklists, rubrics the agent follows", defensible: true },
      { id: "L5c", name: "Retrieval-Augmented Workflows", desc: "Grounding execution in retrieved context, knowledge, and documents" },
      { id: "L5d", name: "Operating Playbooks", desc: "Company-specific SOPs, rules, preferences encoded for agents", defensible: true },
      { id: "L5e", name: "Interactional Skills", desc: "Tone, empathy, negotiation, persuasion — how the agent handles the human moment" },
    ],
  },
  {
    id: "L6", name: "Orchestration", shortName: "Orchestration", color: "var(--layer-6)", bg: "var(--layer-6-bg)",
    desc: "Workflow, routing, coordination. How skills compose into outcomes.",
    detail: "A single ring is useful. A curated jewelry collection with tasting, fitting, and custom design is an experience. Orchestration composes skills into workflows.",
    goldIcon: "storefront",
    goldTitle: "The Jewelry Store & Workshop",
    goldAnalogy: "A single ring is useful. A curated collection with fitting and custom design is an experience. In AI: orchestration composes individual skills into multi-step workflows with human override and runtime assurance. One skill → one task. Orchestration → entire workflows.",
    players: ["LangChain", "CrewAI", "Zapier (at risk)", "Make (at risk)"],
    verdict: "Contested. Becoming a feature, not a product.",
    sublayers: [
      { id: "L6a", name: "Agent Loops", desc: "Single-agent plan-act-observe cycles" },
      { id: "L6b", name: "Human-in-the-Loop", desc: "Escalation patterns, approval workflows, human override design", defensible: true },
      { id: "L6c", name: "Role Routing & Task Decomposition", desc: "Breaking complex work into subtasks and assigning to the right agent" },
      { id: "L6d", name: "Context & State Management", desc: "Maintaining working memory, session state, context windows across steps" },
      { id: "L6e", name: "Runtime Assurance & Learning Loops", desc: "Post-deployment monitoring, evals, feedback pipelines, drift detection" },
    ],
  },
  {
    id: "L7", name: "Surface", shortName: "Surface", color: "var(--layer-7)", bg: "var(--layer-7-bg)",
    desc: "Interface, presentation, experience. How the user meets the intelligence.",
    detail: "People see the ring on the finger — the surface, the sparkle. If all you own is the display case (L7), anyone can build another display case. Embedded and transactional surfaces are the moats.",
    goldIcon: "ring",
    goldTitle: "Wearing the Jewelry — The Moment of Experience",
    goldAnalogy: "People see the ring on the finger — the surface, the sparkle, the emotional moment. In AI: chat, dashboards, copilots, and ambient agents are the surfaces. Beautiful, but the most exposed layer — unless you're embedded inside the workflow or own the moment of transaction.",
    players: ["ChatGPT", "Gemini", "Copilot", "ElevenLabs"],
    verdict: "Modality = commodity. Context = moat.",
    sublayers: [
      { id: "L7a", name: "Conversational", desc: "Voice and chat interfaces — the talking layer" },
      { id: "L7b", name: "Visual Interfaces & Media", desc: "Dashboards, generated images, video, rich media output" },
      { id: "L7c", name: "Embedded & Copilot", desc: "AI woven into existing tools — IDE copilots, email assistants, in-app agents", defensible: true },
      { id: "L7d", name: "Transaction Surface", desc: "Where the AI closes a deal, books an appointment, processes a payment", defensible: true },
      { id: "L7e", name: "Async & Ambient Surfaces", desc: "Background agents, notifications, proactive nudges, always-on monitoring" },
    ],
  },
  {
    id: "L8", name: "Memory", shortName: "Memory", color: "var(--layer-8)", bg: "var(--layer-8-bg)",
    desc: "Retention, learning, compounding context. What the system remembers.",
    detail: "The jeweler keeps records: which designs sold, which metals each customer prefers. Over time, this memory makes every decision better. Memory is the only layer that gets stronger every day.",
    goldIcon: "book",
    goldTitle: "The Record Book — Compounding Knowledge",
    goldAnalogy: "The jeweler keeps records: which designs sold, which metals each customer prefers. Over time, this memory makes every decision better. In AI: session, entity, network, institutional, and world-model memory compound. The system that remembers wins long-term.",
    players: ["Sierra", "Notion (partial)", "Rewind AI"],
    verdict: "The ultimate moat. Memory that compounds wins.",
    sublayers: [
      { id: "L8a", name: "Session & Short-Term Memory", desc: "Within-conversation context, scratch state, working memory" },
      { id: "L8b", name: "User & Entity Profiles", desc: "Persistent preferences, history, relationship context per user or account" },
      { id: "L8c", name: "Aggregated Network Learning", desc: "Patterns learned across many users/customers — fleet intelligence", defensible: true },
      { id: "L8d", name: "Institutional Knowledge", desc: "What the organization knows — docs, decisions, tribal knowledge encoded", defensible: true },
      { id: "L8e", name: "Learned World Models", desc: "The system's accumulated causal understanding of how things work", defensible: true },
    ],
  },
];

// ─── Canonical label maps ───────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for layer names across the entire app.
// Never hardcode layer labels — always import from here.
export const LAYER_LABEL: Record<string, string> = Object.fromEntries(
  LAYERS.map((l) => [l.id, l.name])
);
export const LAYER_SHORT_LABEL: Record<string, string> = Object.fromEntries(
  LAYERS.map((l) => [l.id, l.shortName])
);
export const LAYER_ID_LABEL: Record<string, string> = Object.fromEntries(
  LAYERS.map((l) => [l.id, `${l.id} ${l.shortName}`])
);
export const SUBLAYER_LABEL: Record<string, string> = Object.fromEntries(
  LAYERS.flatMap((l) => l.sublayers.map((s) => [s.id, s.name]))
);

// CSS variable name for a layer's color, e.g. "L-1" -> "--layer-neg1", "L7" -> "--layer-7".
// Accepts layer or sublayer IDs (sublayer is mapped to parent layer color).
export const layerVar = (id: string): string => {
  const layerId = id.replace(/[a-z]$/, ""); // strip sublayer suffix: "L8c" -> "L8"
  const key = layerId === "L-1" ? "neg1" : layerId.replace("L", "");
  return `--layer-${key}`;
};
export const layerColor = (id: string): string => `hsl(var(${layerVar(id)}))`;

/**
 * Human-display version of a layer id. Replaces the ASCII "-" in "L-1"
 * with a true Unicode minus (U+2212) so users read "L minus 1", not "L-1".
 * Use this anywhere a layer id is rendered as plain text in the UI.
 * The underlying data id ("L-1") never changes — URLs, keys, and API
 * payloads stay stable.
 */
export const displayLayerId = (id: string): string =>
  id.startsWith("L-1") ? id.replace("L-1", "L\u22121") : id;

export const DEFENSIBLE_TRIANGLE = "L1b + L5a/b/d + L8c/d/e";

// ─── The Four Structural Laws ──────────────────────────────────────
// JTBD tells you what users want. The Supply Chain of Intelligence
// tells you where value accrues — and who can fire you.
export interface StructuralLaw {
  num: string;
  title: string;
  shortTitle: string;
  desc: string;
  example: string;
  prediction: string;
}

export const LAWS: StructuralLaw[] = [
  {
    num: "I",
    title: "Intelligence Commoditizes Downward",
    shortTitle: "Intelligence commoditizes downward",
    desc: "If your product depends only on generic model capability, the platform layer below you will eventually absorb it. Wrappers don't survive — wrappers become features.",
    example: "Jasper ($1.5B → ~$300M) was a wrapper on GPT. Once ChatGPT shipped, the value flowed to L2.",
    prediction: "Predicts WHO gets absorbed.",
  },
  {
    num: "II",
    title: "Value Accrues at Bottlenecks",
    shortTitle: "Value accrues at bottlenecks",
    desc: "Durable value rarely sits in the model or the UI. It sits at the scarce layer — proprietary data, workflow control, verification, distribution, memory, compliance, or trust. Find the bottleneck. Own it.",
    example: "NVIDIA owns L0 silicon. Vanta owns L3 compliance. Bloomberg owns L1b data. Each is the bottleneck in their chain.",
    prediction: "Predicts WHERE value is going.",
  },
  {
    num: "III",
    title: "The Surface Captures Attention; the Chain Captures Power",
    shortTitle: "Surface captures attention, chain captures power",
    desc: "A beautiful UI may get users. But durable companies own a deeper layer of the intelligence chain — data, execution, memory, gates. Surface without depth rarely compounds.",
    example: "Gamma owns L7 surface. Replit owns agent + code-gen + hosting + auth + database (L4 + L5 + L6 + L8). Same prompt-to-output category. Different fate.",
    prediction: "Predicts WHO survives the platform era.",
  },
  {
    num: "IV",
    title: "Generation and Verification Must Be Separate",
    shortTitle: "Generation and verification must be separate",
    desc: "Wherever output carries fiduciary, regulatory, safety, or reputational weight, the generator and the verifier must be separate economic entities. L3 above L2/L5 is structurally permanent — the model can't audit itself, the codegen can't certify itself, the drafter can't approve itself.",
    example: "Vanta (L3) over AWS/OpenAI. Snyk (L3) over Copilot. Big-4 audit over SAP. Ironclad over Harvey. The verifier survives every model generation.",
    prediction: "Predicts WHERE L3 is non-absorbable.",
  },
];

// ─── Observations ───────────────────────────────────────────────────
// Patterns we see in market structure — not yet promoted to Laws,
// but durable enough to bet on. Each gets 2 worked examples.
export interface Observation {
  num: number;
  title: string;
  shortTitle: string;
  desc: string;
  examples: string[];
  layerTags: string[]; // layer ids it touches
  caseStudy?: { slug: string; label: string }; // optional canonical illustration
}

export const OBSERVATIONS: Observation[] = [
  {
    num: 1,
    title: "The Two-Vendor Rule",
    shortTitle: "Two vendors when mistakes are unrecoverable",
    desc: "Enterprises will pay for two vendors when one vendor's mistake is unrecoverable. Codegen + code-security. Draft + review. Model + eval. Trade + clearing. The buyer pays the duplication tax to avoid the single-point-of-failure tax.",
    examples: [
      "Cursor for codegen + Snyk/Semgrep for security review — no CISO accepts the same vendor doing both.",
      "Harvey drafts contracts; Ironclad/Kira reviews them. The drafter is structurally not allowed to be the approver.",
    ],
    layerTags: ["L3", "L5"],
  },
  {
    num: 2,
    title: "Regulatory Half-Life",
    shortTitle: "Regulated industries outlast 3+ model generations",
    desc: "The more regulated the industry, the longer L3 outlives L2 churn. A compliance gate written into law is a moat measured in decades, not quarters. Models cycle every 6 months; SOC 2, HIPAA, EU AI Act, FDA 510(k) cycle every 5–10 years.",
    examples: [
      "Vanta and Drata are 4 model generations old and untouched. The frontier model labs are not certifying themselves.",
      "Epic's L3+L4 position in healthcare predates the entire AI wave and will outlive GPT-7.",
    ],
    layerTags: ["L3"],
  },
  {
    num: 3,
    title: "The Bundling Asymmetry",
    shortTitle: "Platforms bundle adjacent layers, never across trust boundaries",
    desc: "Foundation model labs will expand from L2 into L5/L6/L7 — adjacent value — because the buyer accepts the same vendor doing both. They will not expand across the trust boundary into L3 above themselves. OpenAI will ship agents. OpenAI will not issue its own SOC 2 audit.",
    examples: [
      "OpenAI shipped GPTs, the Apps SDK, Operator, and Codex — all L5/L6/L7 expansion. None of it is self-certification.",
      "AWS ships hundreds of services but pays Vanta/Drata for compliance evidence. The platform respects the boundary.",
    ],
    layerTags: ["L2", "L3"],
  },
  {
    num: 4,
    title: "Memory Is Not Truth",
    shortTitle: "L8 memory is defensible; L8 truth-claims need L3",
    desc: "L8 memory of what happened — what the user said, did, preferred — is a clean moat. L8 claims about what is true — diagnoses, legal positions, financial valuations — require an L3 verifier above them. The moment memory makes a truth claim, it inherits a regulator.",
    examples: [
      "Notion AI remembers your docs (L8b, defensible). It does not diagnose your patients.",
      "An AI medical scribe (L8) is valuable; the same scribe issuing a diagnosis triggers FDA (L3) and an MD signature requirement.",
    ],
    layerTags: ["L8", "L3"],
  },
  {
    num: 5,
    title: "Distribution Eats Generation",
    shortTitle: "When generation commoditizes, the moment-of-consumption captures the surplus",
    desc: "Once L2 commoditizes (and it always does), the surplus flows to whichever layer owns the user's moment of consumption — L7c (embedded copilot) or L7d (transaction surface). The model is generic; the context of use is not.",
    examples: [
      "Cursor captures the codegen surplus, not the model underneath it. The model is interchangeable; the IDE moment is not.",
      "Perplexity captures the answer surplus by owning the question moment. The model could be any of four — the surface is the moat.",
    ],
    layerTags: ["L2", "L7"],
  },
  {
    num: 6,
    title: "The Gatekeeper Tax is Always Arbitraged",
    shortTitle: "Every gatekeeper margin attracts an arbitrageur",
    desc: "Wherever a gatekeeper extracts rent between the marginal cost of supply and the perceived value of demand, an arbitrageur — API shim, cloud automation, open-source replacement, lateral integration, or regulatory appeal — will step into the gap. The gatekeeper's pricing power is bounded by the cost of the workaround. The arbitrageur lives at L7 and quietly reaches down into L5 to widen the margin further.",
    examples: [
      "Dripify (L7) arbitrages LinkedIn's (L1+L3) connection-request bottleneck: cloud automation + proxies cost pennies, sales teams pay $39–$99/seat/month. Newer entrants now hook L5 open-source LLMs to auto-reply — compressing the last human cost.",
      "Plaid (L4b) arbitraged the bank gatekeepers' API absence for a decade; the moment banks shipped their own APIs, Plaid's margin compressed and it had to migrate up into identity and data.",
    ],
    layerTags: ["L1", "L3", "L7"],
    caseStudy: { slug: "dripify-linkedin-arbitrage", label: "Dripify vs LinkedIn — the L7 arbitrageur" },
  },
];


// ─── AI Defensibility Audit ─────────────────────────────────────────
// Reference scorecard. The live /audit page scores 0–100 via the model run.
export interface AuditQuestion {
  area: string;
  question: string;
  layer: string;
}

export const AUDIT_QUESTIONS: AuditQuestion[] = [
  { area: "Model dependency", question: "Could a better GPT/Claude/Gemini release replace your core value?", layer: "L2" },
  { area: "Data ownership", question: "Do you create or own proprietary context that competitors can't access?", layer: "L1b" },
  { area: "Workflow depth", question: "Are you embedded in a daily or high-stakes workflow users can't easily exit?", layer: "L5 / L6" },
  { area: "Trust gate", question: "Do users rely on you for verification, compliance, quality, or approval?", layer: "L3" },
  { area: "Distribution", question: "Do you own a channel, community, brand, or enterprise relationship?", layer: "L4 / L7c" },
  { area: "Memory", question: "Does the product become smarter or more useful with usage history?", layer: "L8" },
  { area: "Switching cost", question: "Would leaving you destroy useful state, process, or institutional knowledge?", layer: "L8d" },
  { area: "Platform exposure", question: "Could a major platform (OpenAI, Google, Microsoft, Salesforce) bundle this for free?", layer: "L2 / L7" },
];

export interface AuditBand {
  range: string;
  label: string;
  verdict: string;
  color: string;
}

export const AUDIT_BANDS: AuditBand[] = [
  { range: "0–20",   label: "Thin Wrapper",            verdict: "Generic model + thin UI. The platform will absorb you.",          color: "var(--verdict-exposed)" },
  { range: "21–40",  label: "Useful Tool, Weak Moat",  verdict: "Real utility, but no structural protection. Time-bound.",         color: "var(--verdict-consolidating)" },
  { range: "41–60",  label: "Workflow Product",        verdict: "Embedded in a workflow. Survivable, but watch the platforms.",    color: "var(--accent)" },
  { range: "61–80",  label: "Defensible AI System",    verdict: "Owns multiple layers. The chain is yours, not rented.",            color: "var(--verdict-fortified)" },
  { range: "81–100", label: "Intelligence Gate",       verdict: "Platform candidate. You are the bottleneck others must cross.",   color: "var(--verdict-dominant)" },
];

// ─── JTBD vs Supply Chain of Intelligence ───────────────────────────
// JTBD finds demand. SCoI finds defensibility.
export interface JtbdContrastRow {
  question: string;
  jtbd: string;
  scoi: string;
}

export const JTBD_VS_SCOI: JtbdContrastRow[] = [
  { question: "What does it answer?",   jtbd: "Why will users hire this product?",                scoi: "Why won't a platform fire it next quarter?" },
  { question: "What does it find?",     jtbd: "Demand.",                                          scoi: "Defensibility." },
  { question: "Time horizon",           jtbd: "Today's user need.",                               scoi: "Tomorrow's structural position." },
  { question: "Failure mode it catches",jtbd: "Building something nobody wants.",                  scoi: "Building something everyone can copy or absorb." },
  { question: "Audience",               jtbd: "PMs, designers, researchers.",                     scoi: "Founders, product leaders, investors, boards." },
  { question: "Output",                 jtbd: "Roadmap, features, positioning.",                  scoi: "Layer ownership, moat strategy, exit/defend/deepen call." },
];

export const GOLD_KEY_INSIGHT = "Each layer transforms the output of the layer below it. Land and power (L-1) feed the shovels (L0). Shovels mine the ore (L1). Ore is refined (L2), assayed (L3), transported (L4), crafted (L5), arranged (L6), and worn (L7) — and none of it compounds without record-keeping (L8). The supply chain is only as strong as its weakest layer — and most companies only own one.";
