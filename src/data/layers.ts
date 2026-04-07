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
  players: string[];
  verdict: string;
  sublayers: SubLayer[];
}

export const LAYERS: Layer[] = [
  {
    id: "L0", name: "Physical Substrate", shortName: "Physical", color: "var(--layer-0)", bg: "var(--layer-0-bg)",
    desc: "The shovels. Chips, data centers, energy, cooling — the floor everything stands on.",
    detail: "Before a single token is generated, someone has to build the physical infrastructure. When L2 commoditizes, value accrues to L0. NVIDIA doesn't care which model wins — they sell to all of them. L0 players are structurally agnostic to L2+ competition.",
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
    detail: "Proprietary datasets are the raw fuel. More agents = more demand for data. The L1b test: if your data is public, the model layer wins. Your proprietary data is your gold deposit.",
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
    desc: "The reasoning engine. Rent early, build custom at scale if your data warrants it.",
    detail: "OpenAI, Anthropic, Google — THE intelligence layer. Models are commoditizing fast. The frontier race is temporary; the distribution race is permanent.",
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
    detail: "Permissions, compliance, audit trails — can't be automated. Regulators won't accept 'the agent did it.' SOC2, HIPAA, SOX require human accountability.",
    players: ["Vanta", "Drata", "OneTrust"],
    verdict: "Essential. More agents = more access control needed.",
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
    detail: "APIs, MCP protocol, permission governance — the plumbing. These get MORE critical as agents proliferate. Deep integrations create switching costs.",
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
    detail: "Generic skills (summarize, translate) get absorbed by models. Domain execution, mindset frameworks, and company playbooks are defensible. Your SOPs are your moat.",
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
    detail: "Simple chains are commodity. Agent loops with plan→execute→evaluate→iterate are defensible. Human-in-the-loop escalation is essential for enterprise trust.",
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
    detail: "Modality (text, voice, visual) is commoditizing fast. But CONTEXT matters — embedded surfaces (Harvey in Word, Cursor in IDE) and transaction surfaces (present at moment of decision) are defensible.",
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
    detail: "Session memory is table stakes. Entity memory is good. Cross-customer and institutional memory are the ultimate moat — collective patterns that compound with every interaction.",
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
