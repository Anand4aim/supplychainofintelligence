// ─── Layer Diagnostic Cards ─────────────────────────────────────────
// For each layer L-1..L8: how to *diagnose* whether a company truly
// occupies that layer. Inclusion tests, exclusion tests, the removal
// test, canonical examples, and anti-examples (look-alikes that fail).
// Surfaced on /framework/:layerId — the per-layer detail page.

export interface LayerDiagnostic {
  id: string;                  // matches Layer.id ("L-1".."L8")
  oneLineDef: string;          // crisp single-sentence definition
  inclusionTests: string[];    // "include if ALL of these are true"
  exclusionTests: string[];    // "exclude if ANY of these are true"
  removalTest: string;         // the L#-removal thought experiment
  economicWork: string;        // what economic work this layer does
  canonical: Array<{ name: string; why: string }>;          // 3 canonical examples
  antiExamples: Array<{ name: string; why: string }>;       // 3 look-alikes that fail
}

export const LAYER_DIAGNOSTICS: LayerDiagnostic[] = [
  {
    id: "L-1",
    oneLineDef:
      "Physical inputs the entire AI stack consumes — power, water, fabs, materials, the trades that build them.",
    inclusionTests: [
      "Owns or directly contracts physical capacity (megawatts, water rights, fab lines, ore deposits, trade crews).",
      "Lead time to add supply is measured in years, not quarters.",
      "Demand from the AI stack shows up as a line item in their P&L or order book.",
    ],
    exclusionTests: [
      "Only consumes power/compute — does not produce it.",
      "Sells software that schedules or monitors physical assets but does not own them.",
      "Brokerage or marketplace with no take-or-pay exposure to capacity.",
    ],
    removalTest:
      "Remove L-1 and the entire stack stops within hours. Nothing above L-1 can substitute on the timescale that matters.",
    economicWork:
      "Converts capital and time into physical capacity that AI demand cannot manufacture on-demand.",
    canonical: [
      { name: "NextEra", why: "Owns generation. Sells the megawatts every hyperscaler is now competing for." },
      { name: "TSMC", why: "Owns leading-edge fab capacity. No L0 silicon ships without it." },
      { name: "Bechtel", why: "Owns the trade workforce and EPC capability to actually build data centers." },
    ],
    antiExamples: [
      { name: "Energy-monitoring SaaS", why: "Measures power. Does not produce it. L7 dashboard on someone else's L-1." },
      { name: "Carbon-offset marketplace", why: "Brokers credits. No physical capacity, no real bottleneck exposure." },
      { name: "DCIM software", why: "Manages a data center. Owning the building is L0; the software is L6/L7." },
    ],
  },
  {
    id: "L0",
    oneLineDef:
      "The compute substrate: chips, interconnect, data centers, cloud, edge — the shovels of the AI gold rush.",
    inclusionTests: [
      "Sells or operates physical compute capacity (silicon, racks, regions, edge devices).",
      "Revenue scales with tokens/inferences processed, not seats or end-users.",
      "Model-agnostic — wins whether OpenAI or Anthropic wins.",
    ],
    exclusionTests: [
      "Rents compute and resells access wrapped as 'AI infrastructure'.",
      "Sells dev-tools that run on someone else's compute.",
      "Calls itself 'AI infra' but the durable asset is a model (L2) or a workflow (L5).",
    ],
    removalTest:
      "Remove L0 and L2 cannot train, L7 cannot serve. There is no software substitute for compute capacity.",
    economicWork:
      "Turns L-1 power and silicon into addressable, schedulable compute that L2 and L5 can rent.",
    canonical: [
      { name: "NVIDIA", why: "Owns the GPU + CUDA stack. Sells to every layer above without picking sides." },
      { name: "CoreWeave", why: "Owns the data-center build-out and GPU fleet others lease against." },
      { name: "AWS / Azure / GCP", why: "Hyperscalers — they own L0 capacity plus the L4 distribution rails on top." },
    ],
    antiExamples: [
      { name: "GPU-arbitrage startups", why: "Reselling rented capacity. No structural cost advantage, no moat." },
      { name: 'Most "AI cloud" wrappers', why: "Marketing label over a thin scheduler on someone else's GPUs." },
      { name: "Inference-API startups w/o silicon", why: "L4/L6 dressed as L0. First margin compression kills them." },
    ],
  },
  {
    id: "L1",
    oneLineDef:
      "Raw input the stack learns from — and crucially, data nobody else can legally or practically obtain.",
    inclusionTests: [
      "Holds data that is proprietary (L1b), behavioral (L1c), or outcome (L1d) — not public crawl.",
      "Data refreshes from a source the company structurally controls (a workflow, a relationship, a contract).",
      "Removing the data degrades the product in a way no public source can repair.",
    ],
    exclusionTests: [
      "Trained on public web only — every competitor can match.",
      "Data is licensed non-exclusively from a third party (renting, not owning).",
      "User-generated content the user can take elsewhere with no friction.",
    ],
    removalTest:
      "Remove the proprietary L1 and the product collapses into a generic L2 call with a prompt. If the answer to 'why us' is the model — you're not at L1.",
    economicWork:
      "Provides the only ingredient L2 cannot synthesize: a verifiable, exclusive view of some slice of reality.",
    canonical: [
      { name: "Bloomberg", why: "Decades of proprietary financial data + terminal-locked behavioral signal." },
      { name: "Tempus", why: "Clinical + genomic outcome data from real treatment, structurally hard to replicate." },
      { name: "Apollo.io", why: "Behavioral + outcome data on B2B contacts compounds with usage." },
    ],
    antiExamples: [
      { name: "Most 'data + AI' decks", why: "Public scrapes relabeled as proprietary. L1a, not L1b." },
      { name: "Stability AI training corpus", why: "Open data → open weights → no L1 moat after release." },
      { name: "Stack Overflow", why: "Once-defensible L1 commoditized by models that trained on it." },
    ],
  },
  {
    id: "L2",
    oneLineDef:
      "The smelter — foundation, specialized, and reasoning models that refine data into general intelligence.",
    inclusionTests: [
      "Trains models from scratch (or substantively post-trains with proprietary L1).",
      "Owns model weights and can ship without third-party model licenses.",
      "Compute spend is the dominant cost line.",
    ],
    exclusionTests: [
      "Calls a closed-source API and fine-tunes prompts. That is L7, not L2.",
      "Distills or wraps another lab's open weights with no novel training.",
      "RAG over a model you don't own — L2c at most, usually L5c.",
    ],
    removalTest:
      "Remove your in-house model and substitute the best public foundation model. If the product is unchanged, you are not at L2.",
    economicWork:
      "Converts raw data + compute into generalized capability that downstream layers can rent per token.",
    canonical: [
      { name: "OpenAI", why: "Trains frontier models; charges per token; absorbs L7 wrappers structurally." },
      { name: "Anthropic", why: "Frontier models plus L3 trust posture for regulated buyers." },
      { name: "Google DeepMind", why: "Frontier models tied to L0/L4 distribution — a fortress, not a pure L2." },
    ],
    antiExamples: [
      { name: "Most 'foundation model' startups", why: "Fine-tunes on someone else's base. L2b at best, no frontier compute." },
      { name: "Open-source distillers", why: "Weights ship to everyone — by Law I, no margin lasts." },
      { name: 'Companies pitching "our model"', why: "Quietly using GPT-4 underneath. L7, not L2." },
    ],
  },
  {
    id: "L3",
    oneLineDef:
      "Trust, acceptance, and approval — the gates a buyer or regulator must pass before the system is allowed in.",
    inclusionTests: [
      "Owns compliance posture (SOC 2, HIPAA, EU AI Act, FedRAMP) as a product, not a checkbox.",
      "Sells the right to be trusted — evals, audits, attestations, editorial review, distribution approval.",
      "Buyer's procurement team is the actual user.",
    ],
    exclusionTests: [
      "Treats compliance as a one-time signup. Real L3 is a continuous posture.",
      "'Responsible AI' marketing with no audit trail or third-party attestation.",
      "An eval framework that is not enforced as a gate in any real workflow.",
    ],
    removalTest:
      "Remove L3 and the product cannot enter the buyer (enterprise, hospital, court, app store). The output may be correct — it still cannot ship.",
    economicWork:
      "Converts model output into outputs an institution is willing to take legal and reputational responsibility for.",
    canonical: [
      { name: "Vanta / Drata", why: "Continuous compliance posture sold as a product. Pure L3 fortress." },
      { name: "Harvey", why: "L3 (privilege, audit, legal-grade evals) is half the moat — not just L5 execution." },
      { name: "Apple App Store", why: "Distribution gate — the canonical L3e. Owning the gate owns the market." },
    ],
    antiExamples: [
      { name: "Generic 'AI safety' eval startups", why: "Evals that no buyer enforces. L3 in form, not in function." },
      { name: "Most chatbot 'guardrails'", why: "Prompt-level filters. Not an attestation, not a gate." },
      { name: "RAI consulting decks", why: "Advice without enforcement. L3 only if it ends in an audit signature." },
    ],
  },
  {
    id: "L4",
    oneLineDef:
      "The pipes: APIs, MCP, integrations, agent identity, real-time transport — how intelligence reaches systems and users.",
    inclusionTests: [
      "Owns the integration surface other products must use (auth, RBAC, audit, transport).",
      "Sits between two systems that would not otherwise talk.",
      "Removing it forces every consumer to rebuild the same plumbing.",
    ],
    exclusionTests: [
      "Builds integrations into someone else's distribution surface (then *they* own L4).",
      "Pure SDK with no hosted runtime, no identity, no governance — closer to L6.",
      "MCP server with no enforced auth or audit — L4 in shape, not in trust.",
    ],
    removalTest:
      "Remove L4 and the agent has hands but no arms. It can think, but it cannot reach the system of record.",
    economicWork:
      "Provides the universal connective tissue so L5/L6/L7 don't each rebuild every integration.",
    canonical: [
      { name: "Stripe", why: "The canonical payments rail. Every L7 commerce surface rides it." },
      { name: "Microsoft 365 / Google Workspace", why: "Own the workplace surface — every copilot rents distribution from them." },
      { name: "Cloudflare", why: "Network edge + zero-trust + AI gateway. The connective rail for the agent web." },
    ],
    antiExamples: [
      { name: "MCP demo servers", why: "Protocol example without governance — not a real L4." },
      { name: "Zapier-clone startups", why: "L4+L6 with no distribution. Absorbed by whichever L7 owns the user." },
      { name: "iPaaS without auth ownership", why: "Pipes that don't carry identity = pipes someone else will replace." },
    ],
  },
  {
    id: "L5",
    oneLineDef:
      "Applied domain skill — the layer that actually performs the economic work (legal drafting, code, diagnosis, CX resolution).",
    inclusionTests: [
      "Performs a specific economic task end-to-end, not just generates text about it.",
      "Embeds non-obvious domain decisions (L5a/b/d) — rubrics, SOPs, playbooks a generic L2 wouldn't know.",
      "Buyer pays per outcome or per workflow, not per token.",
    ],
    exclusionTests: [
      "A prompt template dressed as a product — generic L2 reasoning, no embedded domain logic.",
      "Generates artifacts but humans still do the actual decision work.",
      "Calls itself 'AI for X' but L2 alone matches its output quality.",
    ],
    removalTest:
      "Swap the L5 layer for raw L2 + a clever prompt. If the output is indistinguishable, there is no L5 — only an L7 with vertical paint.",
    economicWork:
      "Encodes the part of expertise that is *not* in the training corpus: decisions, exceptions, escalations, taste.",
    canonical: [
      { name: "Harvey", why: "L5 (legal-specific reasoning + drafting) tied to L1 corpus + L3 trust. Fortress." },
      { name: "Sierra", why: "L5 CX resolution + L8 per-tenant memory. Outcome-priced, not seat-priced." },
      { name: "Cursor", why: "L5 code-editing skill + L4 IDE surface + L8 repo memory." },
    ],
    antiExamples: [
      { name: "Devin (Cognition)", why: "L5+L7 pitched as 'an agent' — thin on L1/L8, easily out-shipped." },
      { name: "Generic 'AI SDR' tools", why: "L7 sequence-writer with no L1 behavioral data or L8 account memory." },
      { name: 'Most "AI for [vertical]" decks', why: "Prompt + vertical landing page. L7 with L5 marketing." },
    ],
  },
  {
    id: "L6",
    oneLineDef:
      "Workflow coordination — how multiple skills, tools, and humans compose into a multi-step outcome.",
    inclusionTests: [
      "Coordinates multi-step plans with branching, retries, human-in-the-loop escalation.",
      "Manages cross-step context/state, not a single prompt-response.",
      "Owns the runtime that decides which agent/tool/human handles which step.",
    ],
    exclusionTests: [
      "Single prompt with a long context window — that's L2/L5, not L6.",
      "A pipeline DSL with no runtime governance — closer to L4.",
      "DAG editor with no L5 skills underneath — UX over emptiness.",
    ],
    removalTest:
      "Remove L6 and either the human stitches the steps together, or it collapses into a single L5 call. Either way, the 'orchestration' was overhead, not value.",
    economicWork:
      "Converts a set of capable-but-isolated skills into a reliable end-to-end workflow with audit and human override.",
    canonical: [
      { name: "Glean", why: "L1 corpus + L6 retrieval+routing + L8 enterprise memory. L6 is load-bearing." },
      { name: "Notion AI", why: "L6 + L8 inside a distribution surface the user already opens daily." },
      { name: "LangChain (the framework)", why: "Reference L6 primitives — but as a product, prone to becoming a feature." },
    ],
    antiExamples: [
      { name: "Pure 'agent framework' startups", why: "L6 with no L5/L1/L8 underneath. By Law I, absorbed by L2 platforms." },
      { name: "Zapier-style automators (AI-painted)", why: "L4+L6 with no L8 memory — wins on inertia, vulnerable to embedded copilots." },
      { name: 'Most "multi-agent" demos', why: "Orchestration theater. No durable buyer outcome." },
    ],
  },
  {
    id: "L7",
    oneLineDef:
      "The surface — chat, dashboard, copilot, ambient agent — where the human meets the intelligence.",
    inclusionTests: [
      "Owns the moment of attention or transaction (L7c embedded or L7d transactional).",
      "Distribution to the end-user is structurally controlled (own app, own OS surface, own browser).",
      "Switching cost is in the surface itself, not just the underlying skill.",
    ],
    exclusionTests: [
      "A web app that anyone with the same L2 can rebuild in a weekend.",
      "Modality novelty (voice, video, AR) without distribution or workflow lock-in.",
      "A 'beautiful UI' on a rented model with no L1/L5/L8 beneath.",
    ],
    removalTest:
      "Remove the surface and ask: does anyone else *want* to rebuild it, or does L2/L4 already ship a free equivalent? If yes — the surface is a feature, not a product.",
    economicWork:
      "Captures attention and converts intelligence into an action (a message, a decision, a transaction).",
    canonical: [
      { name: "ChatGPT", why: "L7 + L2 ownership + distribution flywheel. Surface as fortress, not surface as exposure." },
      { name: "Copilot (Microsoft)", why: "L7c embedded in the workplace surface Microsoft already owns. L4+L7 fortress." },
      { name: "Cursor", why: "L7 IDE + L5 code skill + L8 repo memory. Surface that survives because of what's behind it." },
    ],
    antiExamples: [
      { name: "Jasper", why: "Pure L7 on rented L2 with no L1/L5/L8. Law I in textbook form." },
      { name: "Gamma / generic 'AI [tool] generators'", why: "L7-only. Absorbed the moment L2 platforms ship the same feature." },
      { name: "Perplexity (structurally)", why: "Brilliant L7 surface, but L4 distribution is rented from Google/Apple." },
    ],
  },
  {
    id: "L8",
    oneLineDef:
      "Memory — session, user, network, institutional, and world-model — the only layer that compounds with usage.",
    inclusionTests: [
      "Retains and re-uses context across sessions in a way the user/buyer cannot easily port elsewhere.",
      "The product measurably gets better for that user/tenant the longer it is used.",
      "Memory is structurally owned (L8c network learning, L8d institutional) — not just stored in a vector DB the user controls.",
    ],
    exclusionTests: [
      "A chat history list — that's storage, not memory.",
      "RAG over user documents the user can take elsewhere — L5c retrieval, not L8 institutional memory.",
      "'Personalization' that is actually just preference toggles.",
    ],
    removalTest:
      "Wipe the L8 layer and re-onboard a tenant. If the product is as good on day 1 as it was on day 365, there was no real L8.",
    economicWork:
      "Compounds every interaction into a private asset that makes the next interaction better — and makes leaving expensive.",
    canonical: [
      { name: "Sierra", why: "L8 per-tenant resolution memory + L8c fleet learning across CX deployments." },
      { name: "Glean", why: "L8d institutional memory of the company's docs, people, decisions. Memory as moat." },
      { name: "Clay", why: "L8 account-level memory across GTM workflows — compounds with every enrichment run." },
    ],
    antiExamples: [
      { name: "Character.AI", why: "L8 lives on rented L2 + rented distribution. Memory orphan." },
      { name: 'Most "AI memory" startups', why: "L8a session storage sold as L8c/d. No structural retention asset." },
      { name: "Granola / Cluely (today)", why: "Lovely L7+L8 on rented L2+L4. Either layer can absorb them." },
    ],
  },
];

export const DIAGNOSTIC_BY_LAYER: Record<string, LayerDiagnostic> = Object.fromEntries(
  LAYER_DIAGNOSTICS.map((d) => [d.id, d]),
);
