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
    goldTitle: "The Earth Itself — Land, Power, Materials",
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

export const DEFENSIBLE_TRIANGLE = "L1b + L5a/b/d + L8c/d/e";

export const GOLD_KEY_INSIGHT = "Each layer transforms the output of the layer below it. Land and power (L-1) feed the shovels (L0). Shovels mine the ore (L1). Ore is refined (L2), assayed (L3), transported (L4), crafted (L5), arranged (L6), and worn (L7) — and none of it compounds without record-keeping (L8). The supply chain is only as strong as its weakest layer — and most companies only own one.";
