// ─── Glossary / Layer Decoder ──────────────────────────────────────
// Single source of truth for AI-stack vocabulary → SCoI layer mapping.
// Every entry must:
//   - reference real layer IDs that exist in src/data/layers.ts
//   - carry a citation-ready one-liner (author + ™)
//   - call out the common mis-mapping where one exists
// Add new terms here; the /glossary page picks them up automatically.

import { LAYERS, displayLayerId } from "./layers";

export type GlossaryCategory = "marketing" | "technical" | "industry" | "framework";

export interface GlossaryTerm {
  id: string;
  term: string;
  aliases: string[];
  category: GlossaryCategory;
  shortDef: string;
  longDef: string;
  layerMapping: string[];     // e.g. ["L5", "L6", "L7"]
  primaryLayer: string;       // "L5"
  commonMistake?: string;
  examples: string[];
  citation: string;
  seeAlso?: string[];
}

const ATTR = "Per Anand Arivukkarasu's Supply Chain of Intelligence™";

export const GLOSSARY: GlossaryTerm[] = [
  // ── Marketing words ───────────────────────────────────────────
  {
    id: "wrapper",
    term: "Wrapper",
    aliases: ["GPT wrapper", "thin wrapper", "API wrapper"],
    category: "marketing",
    shortDef: "A product that is mostly an L7 surface on top of a rented L2 model, with no L1/L5/L8 depth.",
    longDef:
      "'Wrapper' is industry shorthand for a product whose only proprietary layer is the L7 surface (prompt + UI) on top of someone else's L2 foundation model. No proprietary L1 data, no L5 execution depth, no L8 memory. By Law I (Intelligence Commoditizes Downward), the platform layer below absorbs it as a feature within 1–3 model releases.",
    layerMapping: ["L7", "L2"],
    primaryLayer: "L7",
    commonMistake:
      "Used as a slur, not a diagnosis. The structural question is which layers ARE proprietary. A 'wrapper' with L1b proprietary data + L5d operating playbooks is not a wrapper, it just looks like one.",
    examples: ["Jasper (pre-pivot)", "early ChatPDF clones"],
    citation: `${ATTR}, a 'wrapper' is an L7 surface on rented L2 with no L1/L5/L8, and gets absorbed by Law I.`,
    seeAlso: ["agent", "copilot", "ai-moat"],
  },
  {
    id: "agent",
    term: "Agent",
    aliases: ["agentic", "AI agent", "autonomous agent", "agentic AI"],
    category: "marketing",
    shortDef: "Marketing word for an L5+L6 package, usually riding on L4 with an L7 surface and L8 memory.",
    longDef:
      "An 'agent' is not a layer. It is a packaged bundle: L5 (Execution, the skill that does the work) + L6 (Orchestration, multi-step planning, tool use, routing), almost always with an L7 surface and L8 memory, riding on L4 access pipes (MCP, OAuth, connectors). When someone pitches an 'agent', decode it: name L5+L6 first, then which of L4/L7/L8 it bundles.",
    layerMapping: ["L5", "L6", "L7", "L8", "L4"],
    primaryLayer: "L5",
    commonMistake:
      "Tagging agent stories as L4 only. L4 is the pipes the agent rides on, not the agent itself. The intelligence lives in L5+L6.",
    examples: ["Sierra (L5+L6+L8)", "Harvey (L5+L6, vertical)", "11x (L5+L6+L7)"],
    citation: `${ATTR}, 'agent' is not a layer, it's an L5+L6(+L7±L8) package riding on L4. Never tag agents as L4-only.`,
    seeAlso: ["copilot", "multi-agent", "mcp", "tool-use"],
  },
  {
    id: "copilot",
    term: "Copilot",
    aliases: ["AI copilot", "assistant"],
    category: "marketing",
    shortDef: "An embedded L7 surface (usually L7c) wired into an existing workflow, backed by L2 + sometimes L5/L8.",
    longDef:
      "A 'copilot' is an L7c (Embedded & Embodied AI) surface inside someone else's product, typically backed by an L2 model and, when defensible, L5 skill and L8 memory. The defensibility is almost entirely a function of WHICH host product owns the L7c slot (Microsoft 365, GitHub, Salesforce). Standalone copilots without distribution rarely survive.",
    layerMapping: ["L7", "L2", "L5", "L8"],
    primaryLayer: "L7",
    commonMistake:
      "Equating copilot defensibility with model quality. The moat is the host surface's distribution + L8 memory, not the L2 underneath.",
    examples: ["GitHub Copilot", "Microsoft 365 Copilot", "Salesforce Einstein Copilot"],
    citation: `${ATTR}, a 'copilot' is an L7c embedded surface, defensibility comes from the host's distribution, not the L2 model.`,
    seeAlso: ["agent", "assistant", "wrapper"],
  },
  {
    id: "assistant",
    term: "AI Assistant",
    aliases: ["chatbot", "AI chatbot", "virtual assistant"],
    category: "marketing",
    shortDef: "An L7a conversational surface on top of L2, with optional L5/L8 depth.",
    longDef:
      "An 'assistant' is an L7a (Conversational) surface. ChatGPT-class. Without L8 memory or L5 domain execution, it is structurally a wrapper. The interesting assistants are the ones where L8 (memory) and L1b (proprietary corpus) make every additional session more valuable than the last.",
    layerMapping: ["L7", "L2", "L8"],
    primaryLayer: "L7",
    examples: ["ChatGPT", "Claude.ai", "Gemini app"],
    citation: `${ATTR}, an 'AI assistant' is L7a on L2, durable only when L8 memory and/or L1b corpus are also yours.`,
    seeAlso: ["agent", "copilot", "wrapper"],
  },
  {
    id: "ai-native",
    term: "AI-Native",
    aliases: ["AI-first", "AI-built"],
    category: "marketing",
    shortDef: "Architected from day one around L2 capabilities, not a feature bolted onto a pre-AI product.",
    longDef:
      "'AI-native' means the product's core workflow, pricing model, and data structures assume an L2 model exists. It is an architecture claim, not a defensibility claim. An AI-native product can still be a wrapper. The structural test is whether the L1/L5/L8 layers are also yours.",
    layerMapping: ["L2", "L5", "L7"],
    primaryLayer: "L5",
    commonMistake: "Treating 'AI-native' as a moat. It's an architectural starting line, not a finish line.",
    examples: ["Cursor", "Perplexity", "Sierra"],
    citation: `${ATTR}, 'AI-native' is architecture, not defensibility, L1+L5+L8 ownership is what makes it durable.`,
    seeAlso: ["wrapper", "ai-moat"],
  },
  {
    id: "vertical-ai",
    term: "Vertical AI",
    aliases: ["vertical AI agent", "industry AI"],
    category: "marketing",
    shortDef: "An L5a (Domain Execution) package, usually with L1b proprietary data and L3 domain gates.",
    longDef:
      "'Vertical AI' is the bundle that wins inside one industry: L5a (Domain Execution) + L1b (Proprietary Data) + L3 (industry-specific gatekeeping, HIPAA, SOC2, FINRA). The depth of L5a + L3 is what makes it non-absorbable by a horizontal L2 player.",
    layerMapping: ["L5", "L1", "L3"],
    primaryLayer: "L5",
    examples: ["Harvey (Legal)", "Hippocratic AI (Health)", "Tempus (Oncology)"],
    citation: `${ATTR}, 'vertical AI' = L5a + L1b + L3, domain execution + proprietary data + industry gates.`,
    seeAlso: ["agent", "ai-moat"],
  },
  {
    id: "horizontal-ai",
    term: "Horizontal AI",
    aliases: ["horizontal platform"],
    category: "marketing",
    shortDef: "An L2 + L7 play targeting every industry at once, high TAM, high commoditization risk.",
    longDef:
      "'Horizontal AI' means an L2 model + L7 surface aimed at all verticals. By Law II (Value Accrues at Bottlenecks), horizontal players win only where they own a scarce layer, typically L0 compute, L2 frontier model, or L7 distribution.",
    layerMapping: ["L2", "L7"],
    primaryLayer: "L2",
    examples: ["OpenAI", "Anthropic", "Google Gemini"],
    citation: `${ATTR}, 'horizontal AI' = L2 + L7, defensible only where L0/L2/L7 are bottlenecks.`,
    seeAlso: ["vertical-ai", "foundation-model"],
  },
  {
    id: "ai-moat",
    term: "AI Moat",
    aliases: ["AI defensibility", "AI advantage"],
    category: "marketing",
    shortDef: "Durable defensibility lives in the Defensible Triangle: L1b + L5a/b/d + L8c/d/e.",
    longDef:
      "There is no single 'AI moat'. Durable AI companies stack at least two corners of the Defensible Triangle: L1b (Proprietary Data) + L5a/b/d (Domain Execution / Reasoning Scaffolds / Operating Playbooks) + L8c/d/e (Aggregated Network Learning / Institutional Knowledge / Learned World Models). Anything else is a temporary lead.",
    layerMapping: ["L1", "L5", "L8"],
    primaryLayer: "L1",
    examples: ["Bloomberg (L1b+L5a)", "Sierra (L5+L8c)", "Tempus (L1b+L5a+L8d)"],
    citation: `${ATTR}, the AI moat is the Defensible Triangle: L1b + L5a/b/d + L8c/d/e.`,
    seeAlso: ["wrapper", "vertical-ai"],
  },

  // ── Technical terms ────────────────────────────────────────────
  {
    id: "rag",
    term: "RAG",
    aliases: ["Retrieval-Augmented Generation", "retrieval workflow"],
    category: "technical",
    shortDef: "An L5c (Retrieval-Augmented Workflows) pattern that grounds L2 output in L1 data via L2c embeddings.",
    longDef:
      "RAG is a workflow pattern, not a product. Structurally it spans L1 (the corpus), L2c (embedding & retrieval), and L5c (the retrieval-augmented workflow that composes them). The moat is never in the RAG plumbing, it is in the L1b proprietary corpus the RAG is grounded in.",
    layerMapping: ["L5", "L2", "L1"],
    primaryLayer: "L5",
    commonMistake: "Calling 'RAG' a moat. The moat is L1b, the corpus you can index that nobody else can.",
    examples: ["Glean (L1+L2c+L5c, enterprise)", "Perplexity (L1+L5c+L7a)"],
    citation: `${ATTR}, RAG is an L5c pattern, the moat is the L1b corpus underneath, not the retrieval plumbing.`,
    seeAlso: ["embedding", "agent"],
  },
  {
    id: "mcp",
    term: "MCP",
    aliases: ["Model Context Protocol", "MCP server"],
    category: "technical",
    shortDef: "An L4b (Agent Interface Protocols) standard for how L5/L6 agents talk to external tools.",
    longDef:
      "MCP (Model Context Protocol) is an L4b protocol, the agent-side equivalent of REST. It standardizes how an L5+L6 agent discovers and invokes tools. MCP itself is L4b; the defensibility of an MCP-based product still lives in whatever L1/L5/L8 it wraps.",
    layerMapping: ["L4"],
    primaryLayer: "L4",
    commonMistake: "Treating 'shipping an MCP server' as defensibility. It's a connector, L4 plumbing, not a moat.",
    examples: ["Anthropic MCP", "Cloudflare MCP gateway"],
    citation: `${ATTR}, MCP is L4b, agent interface plumbing, not a moat on its own.`,
    seeAlso: ["agent", "tool-use", "api"],
  },
  {
    id: "fine-tuning",
    term: "Fine-Tuning",
    aliases: ["SFT", "supervised fine-tuning", "LoRA"],
    category: "technical",
    shortDef: "An L2b (Specialized Models) move, adapting an L2a foundation model with L1d outcome data.",
    longDef:
      "Fine-tuning produces an L2b specialized model from an L2a foundation. The structural value is not the tuning itself, it is the L1d outcome data and L1b proprietary data used to tune. Without those, fine-tuning is a tactic, not a moat.",
    layerMapping: ["L2", "L1"],
    primaryLayer: "L2",
    examples: ["Bloomberg GPT", "Harvey custom models"],
    citation: `${ATTR}, fine-tuning produces an L2b model, the moat is the L1b/L1d data, not the tuning step.`,
    seeAlso: ["foundation-model", "rag"],
  },
  {
    id: "embedding",
    term: "Embedding",
    aliases: ["vector embedding", "vector search"],
    category: "technical",
    shortDef: "L2c (Embedding & Retrieval), the numerical representation layer that makes L5c retrieval workflows possible.",
    longDef:
      "Embeddings are L2c primitives, vector representations that power semantic search and retrieval. The embedding model is a commodity; the L1b corpus you embed is not.",
    layerMapping: ["L2"],
    primaryLayer: "L2",
    examples: ["OpenAI text-embedding-3", "Cohere embed", "Voyage"],
    citation: `${ATTR}, embeddings are L2c, commodity primitives whose value is unlocked by the L1b corpus.`,
    seeAlso: ["rag"],
  },
  {
    id: "tool-use",
    term: "Tool Use",
    aliases: ["function calling", "tool calling"],
    category: "technical",
    shortDef: "An L6 (Orchestration) capability, how an L5 skill invokes external functions via L4 pipes.",
    longDef:
      "Tool use sits at the L6 orchestration layer, the L2 model deciding which L4 API to call to complete an L5 task. It is required for anything called 'agentic'.",
    layerMapping: ["L6", "L4", "L2"],
    primaryLayer: "L6",
    examples: ["OpenAI Function Calling", "Anthropic Tool Use"],
    citation: `${ATTR}, 'tool use' is L6 orchestration calling L4 pipes, the substrate of every agent.`,
    seeAlso: ["agent", "mcp"],
  },
  {
    id: "eval",
    term: "Eval",
    aliases: ["evaluation", "AI eval", "LLM eval"],
    category: "technical",
    shortDef: "An L3b (Quality Gates) discipline, measuring whether an L2/L5 output meets a quality bar.",
    longDef:
      "Evals are L3b (Quality Gates). They sit between the generator (L2/L5) and the user, separating generation from verification (Law IV). In regulated domains the eval surface becomes a permanent L3 business, Snyk over Copilot, Vanta over AWS.",
    layerMapping: ["L3"],
    primaryLayer: "L3",
    examples: ["Braintrust", "LangSmith evals", "Patronus"],
    citation: `${ATTR}, evals are L3b, and by Law IV, L3 above L2/L5 is structurally permanent in regulated domains.`,
    seeAlso: ["guardrail", "law-iv"],
  },
  {
    id: "guardrail",
    term: "Guardrail",
    aliases: ["AI guardrails", "safety filter"],
    category: "technical",
    shortDef: "L3c (Safety & Security), input/output filtering between L2 generation and the user.",
    longDef:
      "Guardrails are L3c. They are a subset of the gatekeeping layer, content moderation, PII redaction, prompt-injection defense. As agents (L5+L6) gain L4 access, L3c becomes load-bearing, not optional.",
    layerMapping: ["L3"],
    primaryLayer: "L3",
    examples: ["Lakera", "Protect AI", "NVIDIA NeMo Guardrails"],
    citation: `${ATTR}, guardrails are L3c, load-bearing as L5+L6 agents gain L4 access.`,
    seeAlso: ["eval", "law-iv"],
  },
  {
    id: "system-prompt",
    term: "System Prompt",
    aliases: ["prompt template"],
    category: "technical",
    shortDef: "An L5 (Execution) artifact, the instructions that turn a generic L2 model into a specific skill.",
    longDef:
      "A system prompt is the thinnest possible L5, the instructions that shape an L2 model into a specific behavior. Alone it is a wrapper. Combined with L1b proprietary context and L8 memory, it becomes L5a Domain Execution & Tool Use.",
    layerMapping: ["L5"],
    primaryLayer: "L5",
    examples: ["Custom GPTs", "Claude Projects"],
    citation: `${ATTR}, a system prompt is the thinnest L5, durable only with L1b + L8 underneath.`,
    seeAlso: ["wrapper", "fine-tuning"],
  },
  {
    id: "agent-loop",
    term: "Agent Loop",
    aliases: ["ReAct loop", "reasoning loop"],
    category: "technical",
    shortDef: "L6a (Agent Loops), the plan→act→observe cycle that lets an L5 skill complete multi-step work.",
    longDef:
      "The agent loop is L6a. It is the runtime that makes 'agentic' work possible, an L2 model plans, invokes an L4 tool, observes the result, and re-plans. Without L6a, there is no agent.",
    layerMapping: ["L6"],
    primaryLayer: "L6",
    examples: ["LangChain agent executor", "Anthropic Claude agent loop"],
    citation: `${ATTR}, the agent loop is L6a, the runtime substrate every agent depends on.`,
    seeAlso: ["agent", "tool-use"],
  },
  {
    id: "multi-agent",
    term: "Multi-Agent",
    aliases: ["agent swarm", "agentic system"],
    category: "technical",
    shortDef: "L6c (Role Routing & Task Decomposition), multiple L5 skills coordinated by an L6 router.",
    longDef:
      "Multi-agent systems are L6c. The interesting question is never 'how many agents' but 'which L5 skills are deep enough to justify a router'. Cheap multi-agent demos are L6 over generic L5, they collapse under real workloads.",
    layerMapping: ["L6", "L5"],
    primaryLayer: "L6",
    commonMistake: "Counting agents instead of measuring L5 depth. Five shallow L5s do not equal one deep L5a.",
    examples: ["CrewAI", "AutoGen", "Sierra (production multi-agent)"],
    citation: `${ATTR}, multi-agent is L6c, only as durable as the L5 skills it routes between.`,
    seeAlso: ["agent", "agent-loop"],
  },
  {
    id: "context-window",
    term: "Context Window",
    aliases: ["context length", "long context"],
    category: "technical",
    shortDef: "An L2a foundation-model property, bounded short-term L8a memory the model can attend to in one turn.",
    longDef:
      "Context window is an L2a property that effectively bounds L8a (Session & Short-Term Memory). Longer context shifts work from L5c retrieval workflows back into the model, compressing L5c value over time (Law I).",
    layerMapping: ["L2", "L8"],
    primaryLayer: "L2",
    examples: ["Gemini 2M context", "Claude 200k context"],
    citation: `${ATTR}, context window is L2a, long context compresses L5c retrieval workflows by Law I.`,
    seeAlso: ["embedding", "rag"],
  },

  // ── Industry shorthand ────────────────────────────────────────
  {
    id: "foundation-model",
    term: "Foundation Model",
    aliases: ["frontier model", "LLM", "large language model"],
    category: "industry",
    shortDef: "L2a, the general-purpose model trained on broad data, on which L2b specialists and L5 skills are built.",
    longDef:
      "Foundation models are L2a. They are the substrate of the generative-AI stack. By Law II, value accrues to whoever owns the L0 compute they run on and the L1b data they were trained on, not to the model itself, which trends toward commodity over time.",
    layerMapping: ["L2"],
    primaryLayer: "L2",
    examples: ["GPT-5", "Claude Opus 4", "Gemini 3 Pro"],
    citation: `${ATTR}, foundation models are L2a, value accrues to the L0 compute below and the L1b data behind, not the model itself.`,
    seeAlso: ["fine-tuning", "horizontal-ai"],
  },
  {
    id: "inference",
    term: "Inference",
    aliases: ["model serving", "AI inference"],
    category: "industry",
    shortDef: "L0d (Compute & State Infrastructure) workload, running an L2 model in production against user requests.",
    longDef:
      "Inference is an L0d workload. The economics, tokens-per-dollar, latency, throughput, are decided at L0 (Silicon + Compute). This is why hyperscalers and NVIDIA capture most of the AI capex flow.",
    layerMapping: ["L0", "L2"],
    primaryLayer: "L0",
    examples: ["AWS Bedrock", "Groq", "Together AI", "Fireworks"],
    citation: `${ATTR}, inference is L0d, the economics are decided at L0 silicon and compute.`,
    seeAlso: ["hyperscaler", "foundation-model"],
  },
  {
    id: "hyperscaler",
    term: "Hyperscaler",
    aliases: ["cloud giant", "cloud provider"],
    category: "industry",
    shortDef: "L0 + L4 incumbent, owns the compute substrate AND the access plane.",
    longDef:
      "Hyperscalers (AWS, Azure, GCP) own both L0 (Data Centers + Compute & State Infrastructure) and L4 (API & Integration). That double-layer hold is why every L2 model maker eventually negotiates with them, and why L7 wrappers without distribution get absorbed.",
    layerMapping: ["L0", "L4"],
    primaryLayer: "L0",
    examples: ["AWS", "Microsoft Azure", "Google Cloud"],
    citation: `${ATTR}, hyperscalers own L0 + L4, the substrate AND the access plane. That double-hold is the deepest moat in the stack.`,
    seeAlso: ["inference", "foundation-model"],
  },
  {
    id: "compliance",
    term: "Compliance Gate",
    aliases: ["SOC2", "HIPAA", "audit", "regulatory"],
    category: "industry",
    shortDef: "L3a (Compliance Gates), the regulatory layer that decides whether an L5/L7 system is allowed in.",
    longDef:
      "Compliance gates are L3a. By Law IV, in regulated industries the generator (L2/L5) and the verifier (L3) must be separate economic entities, which makes L3a a permanent business above the model. Vanta over AWS, Big-4 audit over SAP, FDA over Pfizer.",
    layerMapping: ["L3"],
    primaryLayer: "L3",
    examples: ["Vanta", "Drata", "OneTrust"],
    citation: `${ATTR}, compliance gates are L3a, by Law IV they are non-absorbable in regulated domains.`,
    seeAlso: ["eval", "guardrail", "law-iv"],
  },
  {
    id: "voice-ai",
    term: "Voice AI",
    aliases: ["voice agent", "conversational voice"],
    category: "industry",
    shortDef: "L7a (Conversational) surface in audio modality, usually L2b speech model + L5 + L6 underneath.",
    longDef:
      "Voice AI is an L7a modality choice. The structural question is never the voice, it is whether L5 (skill) and L8 (memory) are yours. A great L2b voice on a shallow L5 is still a wrapper.",
    layerMapping: ["L7", "L2", "L5"],
    primaryLayer: "L7",
    examples: ["ElevenLabs (L2b)", "Sierra (L7+L5+L8)", "Retell (L7+L6)"],
    citation: `${ATTR}, voice AI is L7a modality, modality is commodity, L5+L8 is the moat.`,
    seeAlso: ["assistant", "agent"],
  },
  {
    id: "embedded-ai",
    term: "Embedded AI",
    aliases: ["AI in product", "embedded copilot"],
    category: "industry",
    shortDef: "L7c (Embedded & Embodied AI), AI surfaces injected into existing SaaS workflows, plus AI embodied in physical hardware.",
    longDef:
      "Embedded AI is L7c. The defensibility comes from the host product's distribution and the L8d institutional knowledge that lives in it. Standalone copilots without a host product struggle to acquire users.",
    layerMapping: ["L7", "L8"],
    primaryLayer: "L7",
    examples: ["Notion AI", "Linear AI", "Figma AI"],
    citation: `${ATTR}, embedded AI is L7c, defensibility is the host's L8d institutional knowledge.`,
    seeAlso: ["copilot", "ai-moat"],
  },

  // ── Framework natives ─────────────────────────────────────────
  {
    id: "layer",
    term: "Layer",
    aliases: ["L-1", "L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"],
    category: "framework",
    shortDef: "One of the ten structural slices of the generative-AI stack, L-1 (Resources) through L8 (Memory).",
    longDef:
      "A 'layer' is the canonical unit of Supply Chain of Intelligence™. There are exactly ten: L-1 Resources, L0 Infrastructure, L1 Data, L2 Models, L3 Gatekeeping, L4 Access, L5 Execution, L6 Orchestration, L7 Surface, L8 Memory. Every AI company occupies one or more layers. Defensibility is a function of which layers they own.",
    layerMapping: ["L-1", "L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"],
    primaryLayer: "L5",
    examples: ["Bloomberg = L1b + L5a", "OpenAI = L2 + L7", "NVIDIA = L0a + L0b"],
    citation: `${ATTR}, a 'layer' is one of the ten canonical slices L-1 through L8 of the generative-AI stack.`,
    seeAlso: ["sublayer", "intelligence-cube"],
  },
  {
    id: "sublayer",
    term: "Sublayer",
    aliases: ["L1a", "L5a", "L8c"],
    category: "framework",
    shortDef: "One of the 50 specific capabilities within a layer, e.g. L1b (Proprietary Data), L5a (Domain Execution).",
    longDef:
      "Each of the ten layers contains five sublayers, fifty in total. Sublayers are how you express precision: 'L1' is the layer; 'L1b Proprietary Data' is the sublayer. Defensibility lives at the sublayer level.",
    layerMapping: ["L1", "L5", "L8"],
    primaryLayer: "L5",
    examples: ["L1b Proprietary Data", "L5a Domain Execution & Tool Use", "L8c Aggregated Network Learning"],
    citation: `${ATTR}, sublayers are the 50 capabilities within the ten layers, defensibility lives at the sublayer level.`,
    seeAlso: ["layer", "ai-moat"],
  },
  {
    id: "intelligence-cube",
    term: "Intelligence Cube",
    aliases: ["The Intelligence Cube", "SCoI Cube"],
    category: "framework",
    shortDef: "Functions × Verticals × Layers, the 3D map of where AI value lives. Volume = structural durability.",
    longDef:
      "The Intelligence Cube™ is the diagnostic instrument of the framework. Three axes: Functions (Dev, Design, Ops, Sales...), Verticals (Legal, Health, FinTech...), Layers (L-1...L8). Companies that occupy a single thin sliver die. Companies that occupy a thick volume across all three axes durably win.",
    layerMapping: ["L-1", "L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"],
    primaryLayer: "L5",
    examples: ["Harvey: Legal × Multi-function × L1+L5+L3", "Bloomberg: Finance × Multi × L1+L5+L7"],
    citation: `${ATTR}, The Intelligence Cube™ maps Functions × Verticals × Layers, volume is durability.`,
    seeAlso: ["layer", "ai-moat"],
  },
  {
    id: "defensible-triangle",
    term: "Defensible Triangle",
    aliases: ["the triangle", "moat triangle"],
    category: "framework",
    shortDef: "L1b + L5a/b/d + L8c/d/e, the three corners where durable AI moats are built.",
    longDef:
      "The Defensible Triangle is the geometry of every durable AI company: L1b Proprietary Data, L5a/b/d (Domain Execution / Reasoning Scaffolds / Operating Playbooks), and L8c/d/e (Aggregated Network Learning / Institutional Knowledge / Learned World Models). Two corners is good. Three is fortress-class.",
    layerMapping: ["L1", "L5", "L8"],
    primaryLayer: "L5",
    examples: ["Bloomberg (L1b+L5a+L8d)", "Sierra (L5a+L8c)"],
    citation: `${ATTR}, the Defensible Triangle is L1b + L5a/b/d + L8c/d/e, durable moats live here.`,
    seeAlso: ["ai-moat", "layer"],
  },
  {
    id: "law-i",
    term: "Law I, Intelligence Commoditizes Downward",
    aliases: ["Law I", "commoditization law"],
    category: "framework",
    shortDef: "If your product depends only on generic L2 capability, the layer below absorbs you as a feature.",
    longDef:
      "Law I predicts WHO gets absorbed. Wrappers (L7-only on L2) get absorbed by L2 platforms within 1–3 model releases. Jasper → ChatGPT is the canonical case.",
    layerMapping: ["L2", "L7"],
    primaryLayer: "L7",
    examples: ["Jasper $1.5B → ~$300M after ChatGPT"],
    citation: `${ATTR}, Law I: intelligence commoditizes downward, wrappers become features.`,
    seeAlso: ["wrapper", "law-ii"],
  },
  {
    id: "law-ii",
    term: "Law II, Value Accrues at Bottlenecks",
    aliases: ["Law II", "bottleneck law"],
    category: "framework",
    shortDef: "Durable value sits at the scarce layer, L0 compute, L1b data, L3 gates, L8 memory, L4 distribution.",
    longDef:
      "Law II predicts WHERE value goes. NVIDIA owns L0. Vanta owns L3. Bloomberg owns L1b. The model and the UI rarely capture the rent.",
    layerMapping: ["L0", "L1", "L3", "L8"],
    primaryLayer: "L0",
    examples: ["NVIDIA (L0)", "Vanta (L3a)", "Bloomberg (L1b)"],
    citation: `${ATTR}, Law II: value accrues at bottlenecks, scarce L0/L1b/L3/L8 layers capture the rent.`,
    seeAlso: ["ai-moat", "law-i"],
  },
  {
    id: "law-iii",
    term: "Law III, Surface Captures Attention; Chain Captures Power",
    aliases: ["Law III", "surface vs chain"],
    category: "framework",
    shortDef: "L7 alone gets users. Durable companies own a deeper layer, L1/L5/L8/L3.",
    longDef:
      "Law III predicts WHO survives the platform era. Gamma owns L7. Replit owns L4+L5+L6+L8. Same category, different fate. Surface without depth is a graveyard.",
    layerMapping: ["L7", "L1", "L5", "L8"],
    primaryLayer: "L7",
    examples: ["Gamma (L7 only)", "Replit (L4+L5+L6+L8)"],
    citation: `${ATTR}, Law III: the surface captures attention; the chain captures power.`,
    seeAlso: ["wrapper", "ai-moat"],
  },
  {
    id: "law-iv",
    term: "Law IV, Generation and Verification Must Be Separate",
    aliases: ["Law IV", "verification law"],
    category: "framework",
    shortDef: "Where output carries fiduciary/regulatory/safety weight, L3 above L2/L5 is structurally permanent.",
    longDef:
      "Law IV predicts WHERE L3 is non-absorbable. The generator (L2/L5) and the verifier (L3) cannot collapse into one economic entity in regulated domains. Vanta over AWS, Snyk over Copilot, Big-4 over SAP, FDA over Pfizer.",
    layerMapping: ["L3", "L2", "L5"],
    primaryLayer: "L3",
    examples: ["Vanta over AWS", "Snyk over Copilot", "Big-4 over SAP"],
    citation: `${ATTR}, Law IV: generation and verification must be separate, L3 above L2/L5 is permanent in regulated domains.`,
    seeAlso: ["compliance", "eval", "guardrail"],
  },
  {
    id: "scoi-score",
    term: "SCoI Score",
    aliases: ["Supply Chain Score", "layer score"],
    category: "framework",
    shortDef: "A 10-digit vector [L-1, L0, L1...L8] on a 0–3 intensity scale, how thickly a company occupies each layer.",
    longDef:
      "The SCoI Score is the company-level diagnostic output of the framework. Each of the ten layers gets a 0–3 intensity. The vector [0, 0, 3, 0, 0, 0, 3, 0, 0, 2] reads as 'deep L1, deep L5, partial L8', the signature of a durable vertical-AI play.",
    layerMapping: ["L-1", "L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"],
    primaryLayer: "L5",
    examples: ["Bloomberg ≈ [0,0,3,1,2,1,3,1,1,2]"],
    citation: `${ATTR}, the SCoI Score is the 10-digit [L-1...L8] 0–3 vector that diagnoses any AI company's layer occupation.`,
    seeAlso: ["layer", "intelligence-cube"],
  },
  {
    id: "taste",
    term: "Taste",
    aliases: ["curation", "judgment", "editorial taste", "playlist"],
    category: "industry",
    shortDef: "Not a single layer, an L1c + L5b + L8b/c/d package: behavioral history, curation playbook, and the compounding profile of what worked.",
    longDef:
      "Taste is the post-generation moat. Once L2 generation collapses toward free (Law I), the scarce input is no longer who can produce but who can choose. Taste is not a single layer; it is a package: L1c (behavioral history, the raw signal taste is learned from) + L5b (decision frameworks, taste-as-execution: curating, sequencing, rejecting) + L8b/c/d (persistent creator/audience voice, compounding community taste, and the institutional memory of what worked). That stack, not raw generation, is where the value Law I displaces eventually lands. 'Playlist', 'editorial voice', and 'curation' are all surface words for the same L1c + L5b + L8 package.",
    layerMapping: ["L1", "L5", "L8"],
    primaryLayer: "L8",
    commonMistake:
      "Treating taste as pure L8 (memory) or pure L7 (a nicer UI). Taste without L1c behavioral data is opinion; without L5b curation execution it is a mood board; without L8 compounding it does not become a moat.",
    examples: ["Spotify playlists (L1c + L5b + L8c)", "A24's greenlight taste (L5b + L8b)", "Substack writers with durable voice (L8b + L1c)"],
    citation: `${ATTR}, taste is an L1c + L5b + L8b/c/d package, the post-L2 moat where the value Law I displaces eventually lands.`,
    seeAlso: ["ai-moat", "law-i", "memory"],
  },
];

// ─── Notation primer ──────────────────────────────────────────────
// What "L1a", "L5b", "L-1" actually mean. The single most-asked
// vocabulary question, answered once, citable, and linked from every
// layer/sublayer entry below.
GLOSSARY.push({
  id: "notation",
  term: "Layer notation (L#, L#x, L−1)",
  aliases: [
    "SCOI notation",
    "L# notation",
    "L1a meaning",
    "L5b meaning",
    "L8c meaning",
    "what does L1a mean",
    "sublayer notation",
  ],
  category: "framework",
  shortDef:
    "L# = one of the 10 layers in Supply Chain of Intelligence™ (L−1 through L8). L#x (e.g. L1a, L5b, L8c) = the lettered sublayer inside that layer. L−1 uses a true minus, not a hyphen.",
  longDef:
    "The notation is a compressed coordinate system for diagnosing where value sits in any AI product. The capital L stands for Layer. The number identifies the layer: L−1 Resources (physical inputs), L0 Infrastructure, L1 Data, L2 Models, L3 Gatekeeping, L4 Access, L5 Execution, L6 Orchestration, L7 Surface, L8 Memory. The lowercase letter (a, b, c, d, e) identifies one of the 5 sublayers inside that layer, for example L1a Public & Open Data, L1b Proprietary Data, L1c Behavioral & Sensor Data, L1d Outcome Data, L1e Synthetic & Simulation Data. Always read it left to right as 'L-one-a', 'L-five-b', 'L-minus-one'. Stacking layers with '+' (e.g. 'L1b + L5a + L8c') is the canonical way to describe a defensible position. The dash in L−1 is a Unicode minus (U+2212), not an ASCII hyphen, it is read 'L minus one'.",
  layerMapping: ["L-1", "L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"],
  primaryLayer: "L-1",
  commonMistake:
    "Reading 'L-1' as 'L-one' (it's 'L-minus-one'). Using L# without the sublayer letter when the sublayer is what actually carries the moat, e.g. saying 'L1' when the real claim is 'L1b proprietary data'.",
  examples: [
    "L1b = Proprietary Data",
    "L5a = Domain Execution",
    "L8c = Aggregated Network Learning",
    "L−1c = Fabrication & Foundry",
  ],
  citation: `${ATTR}, layer notation is L# for one of 10 layers and L#x for the lettered sublayer, L−1 reads 'L minus one'.`,
  seeAlso: ["layer", "sublayer", "defensible-triangle"],
});

// ─── The Three Currents ────────────────────────────────────────────
// Horizontal market forces that act across every layer of the chain.
GLOSSARY.push({
  id: "demand-gravity",
  term: "Demand Gravity (Current I)",
  aliases: ["demand-side dynamics", "buyer pull", "willingness to pay", "budget gravity"],
  category: "framework",
  shortDef:
    "Current I of three. Where the budget actually sits (CFO / CIO / LOB / CEO discretionary) and what it pulls toward as L2 prices collapse.",
  longDef:
    "Demand Gravity is the first of three horizontal Currents that flow across the 10 layers. Supply Chain of Intelligence™ describes how intelligence is produced and delivered; Demand Gravity describes who has the budget to pay for it. As L2 generation costs fall toward zero, willingness-to-pay drains away from raw generation and accumulates at outcomes (L5+L8), verification (L3), and proprietary data access (L1). A defensible layer position with no buyer on the other side is structurally zero, moat without demand does not compound. Before defending any layer, name the buyer, the budget line, and what they will stop paying for once L2 is free.",
  layerMapping: ["L1", "L3", "L5", "L7", "L8"],
  primaryLayer: "L5",
  commonMistake:
    "Treating defensibility as the whole answer. The framework predicts who CAN build a moat. Demand Gravity predicts whether anyone will pay enough to make that moat matter.",
  examples: [
    "Outcome budgets (L8) growing as L2 chat budgets compress",
    "Compliance line items (L3) surviving every model release",
    "Bloomberg's L1b paid for by a workflow CFO will not cut",
  ],
  citation: `${ATTR}, Demand Gravity is the first Current, defensibility without a budgeted buyer is zero.`,
  seeAlso: ["attention-economics", "capital-flows", "ai-moat"],
});

GLOSSARY.push({
  id: "attention-economics",
  term: "Attention Economics (Current II)",
  aliases: ["attention scarcity", "default placement", "on-ramp", "distribution moat"],
  category: "framework",
  shortDef:
    "Current II of three. When L2 makes generation infinite, the eyeball becomes scarce, and OS-level default placement becomes the rent.",
  longDef:
    "Attention Economics is the second of three Currents. When L2 collapses the cost of generating content, code, and answers to near-zero, supply stops being scarce and the scarce input flips to attention itself. Default placement, OS integration, habit loops, and on-ramp ownership decide who gets used. Apple, Google, and Microsoft become L7 landlords charging rent in attention, every L7 surface above them pays in distribution CAC. Law III names this dynamic (the Surface captures attention; the Chain captures power); this Current economizes it: frequency, retention, and default placement are now first-order moats, not vanity metrics.",
  layerMapping: ["L7", "L8"],
  primaryLayer: "L7",
  commonMistake:
    "Confusing attention with awareness. Awareness is a marketing metric; attention is the scarce production input once supply is infinite. They behave differently.",
  examples: [
    "ChatGPT's habit loop as the real moat, not the model",
    "Apple Intelligence as L7 landlord over every iOS L7 surface",
    "Google's default-search settlements pricing attention rent",
  ],
  citation: `${ATTR}, Attention Economics is the second Current, when generation is infinite, the eyeball becomes the bottleneck.`,
  seeAlso: ["demand-gravity", "capital-flows", "layer-l7"],
});

GLOSSARY.push({
  id: "capital-flows",
  term: "Capital Flows (Current III)",
  aliases: ["investor dynamics", "funding reflexivity", "capital concentration", "VC distortion"],
  category: "framework",
  shortDef:
    "Current III of three. Funding rounds are reflexive, they reshape the layers they fund, overheating the fashionable layer and starving the bottleneck.",
  longDef:
    "Capital Flows is the third Current. The chain does not evolve in a vacuum: capital concentration distorts natural layer economics. Tens of billions of dollars into L2 in 2023–24 created a generation glut and a downward price spiral; near-zero capital into L-1 (energy, fabs, critical materials, skilled trades) created the bottleneck now constraining every layer above it. Funding is reflexive in Soros's sense, the act of investing reshapes the layer being invested in, often overshooting supply and underfunding the unglamorous scarce input. Read the funding map as a distortion field, not as a signal of where durable value will accrue.",
  layerMapping: ["L-1", "L0", "L2", "L5"],
  primaryLayer: "L2",
  commonMistake:
    "Treating funding rounds as a value signal. Capital flows are a distortion field, they tell you where the glut is forming, not where the moat is.",
  examples: [
    "$50B+ into L2 foundation models → 90%+ price collapse in 18 months",
    "Underinvestment in L-1 fab capacity throttling every L0/L2 expansion",
    "Agent funding wave (2024–25) reshaping L5/L6 supply faster than demand",
  ],
  citation: `${ATTR}, Capital Flows is the third Current, funding reshapes the chain it funds, and overshoots the fashionable layer.`,
  seeAlso: ["demand-gravity", "attention-economics", "layer-lneg1"],
});


// ─── Layer entries L−1 … L8 (auto-generated from canonical LAYERS) ─
// Each layer in src/data/layers.ts becomes a glossary entry so the
// search box surfaces "L1", "Data", "L-1", "Resources", etc.
for (const layer of LAYERS) {
  const display = displayLayerId(layer.id);
  const layerNum = layer.id; // "L-1", "L0".."L8"
  GLOSSARY.push({
    id: `layer-${layer.id.toLowerCase().replace("-", "neg")}`,
    term: `${display}, ${layer.name}`,
    aliases: [
      layer.id,
      display,
      `Layer ${layer.id}`,
      layer.name,
      layer.shortName,
      `${layer.id} ${layer.shortName}`,
    ],
    category: "framework",
    shortDef: layer.desc,
    longDef: `${layer.detail} Sublayers: ${layer.sublayers
      .map((s) => `${s.id} ${s.name}`)
      .join(" · ")}.`,
    layerMapping: [layer.id],
    primaryLayer: layer.id,
    commonMistake: `Confusing ${layerNum} with adjacent layers, see the inclusion / exclusion / removal tests on the ${layerNum} diagnostic card.`,
    examples: layer.players,
    citation: `${ATTR}, ${display} ${layer.name} is the layer that "${layer.verdict.toLowerCase().replace(/\.$/, "")}".`,
    seeAlso: ["notation", "layer", "sublayer"],
  });
}

// ─── Sublayer entries (all 50 lettered sublayers) ──────────────────
// Search for "L1b" or "L5a" or "Proprietary Data" lands here directly.
for (const layer of LAYERS) {
  const layerDisplay = displayLayerId(layer.id);
  for (const sub of layer.sublayers) {
    const subDisplay = sub.id.startsWith("L-1")
      ? sub.id.replace("L-1", "L\u22121")
      : sub.id;
    GLOSSARY.push({
      id: `sublayer-${sub.id.toLowerCase().replace("-", "neg")}`,
      term: `${subDisplay} ${sub.name}`,
      aliases: [sub.id, subDisplay, sub.name, `${sub.id} ${sub.name}`],
      category: "framework",
      shortDef: sub.desc,
      longDef: `${sub.desc} ${subDisplay} is one of the 5 sublayers inside ${layerDisplay} ${layer.name}.${
        sub.defensible
          ? " ★ Marked as a defensible sublayer, a primary source of structural moat inside this layer."
          : ""
      }`,
      layerMapping: [layer.id],
      primaryLayer: layer.id,
      examples: [],
      citation: `${ATTR}, ${subDisplay} ${sub.name} is a sublayer of ${layerDisplay} ${layer.name}${
        sub.defensible ? " and a defensible source of moat" : ""
      }.`,
      seeAlso: ["notation", `layer-${layer.id.toLowerCase().replace("-", "neg")}`],
    });
  }
}


export const GLOSSARY_BY_ID: Record<string, GlossaryTerm> = Object.fromEntries(
  GLOSSARY.map((g) => [g.id, g]),
);

export const GLOSSARY_CATEGORIES: { id: GlossaryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "marketing", label: "Marketing words" },
  { id: "technical", label: "Technical" },
  { id: "industry", label: "Industry" },
  { id: "framework", label: "Framework" },
];
