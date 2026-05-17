/**
 * Predictions archive — public track record for The Supply Chain of Intelligence™.
 *
 * Every entry is scored on TWO independent axes, because conflating them is
 * the most common way frameworks lose credibility:
 *
 *   1. Structural call — did the framework correctly identify which layers
 *      carried the risk or the moat?  This is what the lens is for.
 *
 *   2. Timing call — did the predicted compression / dominance arrive on
 *      the expected horizon?  This is the variable the framework does NOT
 *      control (frontier-model release cadence, regulatory shocks,
 *      distribution deals, cap-table accidents).
 *
 * Christensen, Porter, and JTBD all called direction correctly and timing
 * wrong on many cases.  Naming the two axes separately is how this
 * framework stays intellectually honest.
 */

/** Did the framework identify the right layer exposure / moat? */
export type StructuralStatus = "confirmed" | "playing-out" | "wrong" | "pending";

/** Did it arrive on the expected horizon? */
export type TimingStatus =
  | "on-pace"
  | "faster" // compression / dominance arrived sooner than expected
  | "slower" // arrived later than expected (or still hasn't)
  | "too-early"; // not enough time has passed to score timing yet

export interface Prediction {
  /** Stable id (also URL anchor). */
  id: string;
  /** Company / target of the call. */
  subject: string;
  /** ISO date the call was first made on this site or in the source material. */
  date: string;
  /** The structural call — what the framework predicted, in one sentence. */
  call: string;
  /** Layer exposure that drove the call (e.g. ["L7"], ["L1", "L5", "L8"]). */
  layers: string[];
  /** What has happened since — observable, sourced where possible. */
  outcome: string;
  /** Was the structural read correct? */
  structural: StructuralStatus;
  /** Did the predicted outcome arrive on the expected horizon? */
  timing: TimingStatus;
  /** Optional one-line gloss on the timing call (e.g. "compressed inside 12 months"). */
  timingNote?: string;
  /** Slug of the deep case study this prediction is grounded in. */
  caseStudySlug: string;
  /** Optional external source link (press, earnings, primary doc). */
  source?: { label: string; url: string };
}

export const PREDICTIONS: Prediction[] = [
  {
    id: "jasper-l7-exposure",
    subject: "Jasper",
    date: "2023-03-15",
    call:
      "An L7-only wrapper on GPT with no L1/L3/L5/L8 ownership compresses to zero margin the moment the underlying model ships a comparable surface.",
    layers: ["L7"],
    outcome:
      "Valuation reset from $1.5B (Oct 2022) to a fraction of that following ChatGPT, Copilot, and Gemini shipping native equivalents. Layoffs, CEO change, repositioning toward enterprise workflows in 2024–2025.",
    structural: "confirmed",
    timing: "faster",
    timingNote: "Surface compression hit inside ~6 months of the call.",
    caseStudySlug: "jasper-vs-grammarly-copilot",
    source: {
      label: "The Information — Jasper valuation reset",
      url: "https://www.theinformation.com/articles/jasper-ai-the-buzzy-startup-worth-1-5-billion-faces-an-increasingly-uncertain-future",
    },
  },
  {
    id: "chegg-l2-displacement",
    subject: "Chegg",
    date: "2023-05-02",
    call:
      "A homework-help surface (L7) whose only moat is an aggregated answer corpus loses its job-to-be-done the day an L2 foundation model can answer the same questions for free inside ChatGPT.",
    layers: ["L7", "L2"],
    outcome:
      "Stock dropped ~50% in a single session in May 2023 after CEO acknowledged ChatGPT impact on new-subscriber growth. Continued share-price decline through 2024–2026; subscriber base contracted year-on-year.",
    structural: "confirmed",
    timing: "on-pace",
    timingNote: "Repricing landed within the expected 12–24 month window.",
    caseStudySlug: "chegg-collapse",
    source: {
      label: "CNBC — Chegg shares plunge 48% on ChatGPT impact",
      url: "https://www.cnbc.com/2023/05/02/chegg-drops-more-than-40percent-after-saying-chatgpt-is-killing-its-business.html",
    },
  },
  {
    id: "harvey-l1-l5-fortress",
    subject: "Harvey",
    date: "2023-09-01",
    call:
      "A vertical legal AI that owns L1 (curated case-law + firm corpus) and L5 (workflow into associate / partner review loops) is structurally defensible against general-purpose models, because legal output requires citation-grade L1 and audited L5 — neither of which a frontier model ships natively.",
    layers: ["L1", "L5"],
    outcome:
      "Harvey scaled to top-AmLaw deployments and a multi-billion valuation through 2024–2026. The L1 + L5 moat held — but the compression window narrowed faster than expected as frontier models (GPT-5, Claude 4.5/5) plus general legal agents from LexisNexis, vLex, and Thomson Reuters / Westlaw closed the citation-and-workflow gap. Harvey is still defensible; the lead it gets to keep is years, not decades.",
    structural: "confirmed",
    timing: "faster",
    timingNote:
      "Frontier-model + incumbent-stack pressure arrived ~12–18 months sooner than the original horizon assumed.",
    caseStudySlug: "harvey-vs-generic-legal",
  },
  {
    id: "copilot-pressure-on-glean",
    subject: "Glean (vs. Microsoft Copilot)",
    date: "2024-02-10",
    call:
      "Glean's L1 (enterprise connectors) + L3 (permissions/governance) + L5 (workflow integration) stack holds against Copilot inside non-Microsoft-monoculture enterprises; the bundle pressure is real but the L3 + connector breadth keeps Glean defensible where Microsoft does not own the substrate.",
    layers: ["L1", "L3", "L5"],
    outcome:
      "Glean continued enterprise expansion through 2024–2026 with raises at progressively higher valuations even as Copilot for Microsoft 365 went GA. Win-rate held in Google Workspace shops and mixed-stack enterprises; Microsoft-monoculture accounts remain contested as the call predicted.",
    structural: "playing-out",
    timing: "on-pace",
    caseStudySlug: "glean-enterprise-search-fortress",
  },
  {
    id: "sierra-l1-l5-l8-stack",
    subject: "Sierra",
    date: "2024-10-01",
    call:
      "A vertical platform that owns L1 (per-customer policy + transcript data), L5 (workflow integration into existing CX stacks), and L8 (learning loop on resolution outcomes) is the structurally correct way to build durable agent-shaped value — and is what Jasper was not.",
    layers: ["L1", "L5", "L8"],
    outcome:
      "Sierra raised at $4.5B in late 2024 and $10B in 2025 on the back of named enterprise CX deployments and reported per-resolution economics. The L1/L5/L8 stack is exactly what acquirers and investors are paying a premium for.",
    structural: "confirmed",
    timing: "on-pace",
    caseStudySlug: "sierra-vs-salesforce",
    source: {
      label: "Reuters — Sierra valuation",
      url: "https://www.reuters.com/technology/artificial-intelligence/ai-startup-sierra-valued-45-billion-latest-funding-round-2024-10-28/",
    },
  },
  {
    id: "devin-l7-agent-exposure",
    subject: "Devin (Cognition)",
    date: "2024-04-01",
    call:
      "A general-purpose L7 'AI software engineer' demo without L1 codebase ownership, L3 review/policy primitives, or L5 IDE workflow lock-in faces the same exposure as Jasper: the surface is reproducible inside Cursor, Copilot, and Claude Code the moment they decide to ship it.",
    layers: ["L7"],
    outcome:
      "Through 2024–2025, the agent-coding surface compressed: Cursor, Copilot Workspace, Claude Code, and Codex all shipped equivalents. Cognition pivoted toward Devin-as-teammate inside engineering orgs (an L5 move), validating the structural read.",
    structural: "playing-out",
    timing: "faster",
    timingNote: "Surface compression arrived within 9 months of the call.",
    caseStudySlug: "devin-cognition-l7-agent",
  },
  {
    id: "stability-open-model-trap",
    subject: "Stability AI",
    date: "2023-11-15",
    call:
      "An L2 foundation-model lab that open-sources its primary asset without an L1 data moat or L7 surface to capture demand has no place to extract margin — value flows to whoever owns distribution downstream.",
    layers: ["L2"],
    outcome:
      "Reported revenue / burn mismatch surfaced in 2024; CEO departure, board turmoil, repeated funding crises, and a 2024 rescue investment confirmed the L2-only-without-distribution thesis.",
    structural: "confirmed",
    timing: "on-pace",
    caseStudySlug: "stability-ai-open-model-trap",
  },
  {
    id: "perplexity-vs-google",
    subject: "Perplexity (vs. Google)",
    date: "2024-01-20",
    call:
      "Perplexity is a beautifully executed L7 answer-engine, but the framework's distribution law says L7 without L4 (default-channel placement) loses to whoever owns the query box. Google owns Chrome, Android, Safari-default, and the search slot — Perplexity has to fight for every install.",
    layers: ["L7", "L4"],
    outcome:
      "Through 2024–2026 Perplexity grew query volume meaningfully and raised at progressively higher valuations, but Google's AI Overviews + Gemini integration into Chrome/Android kept Perplexity's share of total AI-assisted search structurally capped. The framework's L4 distribution call held — owning the surface without owning the channel is a permanent ceiling, not a death sentence.",
    structural: "confirmed",
    timing: "on-pace",
    caseStudySlug: "perplexity-vs-google-distribution",
  },
  {
    id: "cursor-ide-consolidation",
    subject: "Cursor",
    date: "2024-03-10",
    call:
      "Cursor owns L5 (the IDE workflow) and L8 (per-developer context / accepted-edit memory) in a way Copilot's bolt-on extension model structurally cannot match — the editor IS the workflow, and the workflow is where the agent loop accrues. The L5 + L8 stack consolidates the coding-agent category to whoever controls the IDE surface, not the model underneath.",
    layers: ["L5", "L8"],
    outcome:
      "Cursor's ARR scaled past $500M through 2024–2025 with developer adoption at the major AI labs themselves. Copilot Workspace, Claude Code, and Codex all repositioned around IDE-native or terminal-native workflows — explicitly conceding the L5 framing. The category consolidated exactly along the L5/L8 axis the framework predicted.",
    structural: "confirmed",
    timing: "faster",
    timingNote: "IDE consolidation arrived inside ~12 months of the call.",
    caseStudySlug: "cursor-ide-consolidation",
  },
  {
    id: "character-ai-memory-orphan",
    subject: "Character.AI",
    date: "2024-02-01",
    call:
      "A consumer companion product whose entire value is L8 (per-user memory + relationship state) but whose L2 model is rented and whose L4 distribution is mobile-app store-dependent is structurally a 'memory orphan' — the L8 asset is real but un-monetizable inside the cap-table constraints of a foundation-model-grade burn rate.",
    layers: ["L8", "L2", "L4"],
    outcome:
      "Google effectively acqui-hired the founding team in August 2024 in a structure that paid out the cap table without buying the company — the textbook outcome for an L8-rich asset trapped inside an L2-dependent cost structure. The L8 memory survived; the company did not.",
    structural: "confirmed",
    timing: "on-pace",
    caseStudySlug: "character-ai-memory-orphan",
    source: {
      label: "The Information — Google's Character.AI deal",
      url: "https://www.theinformation.com/articles/why-googles-character-ai-deal-is-a-template-for-the-ai-talent-wars",
    },
  },
  {
    id: "klarna-l5-l8-customer-service",
    subject: "Klarna",
    date: "2024-02-28",
    call:
      "Klarna's AI customer-service rollout is an L5 (workflow replacement) + L8 (per-resolution learning loop) move that could compress the L7 human-agent surface by ~700 FTEs without quality regression, validating in-house vertical-agent economics over horizontal Salesforce/Zendesk stacks.",
    layers: ["L5", "L8"],
    outcome:
      "Klarna's initial 2024 announcement claimed the cost win. In 2025 the company publicly walked it back, citing quality drift and CSAT issues, and began re-hiring human agents for higher-value tiers. The L5 compression was real; the L8 quality loop did not close fast enough to defend the all-AI tier. The framework's read on the economics was directionally right, the read on the quality-loop maturity was optimistic.",
    structural: "playing-out",
    timing: "slower",
    timingNote:
      "L8 quality loop matured slower than the L5 cost story. The two diverged in public.",
    caseStudySlug: "klarna-customer-service",
  },
  {
    id: "tesla-vs-waymo-stack",
    subject: "Tesla vs. Waymo",
    date: "2024-06-15",
    call:
      "Autonomy is decided at L1 (real-world driving data) + L8 (fleet learning loop), not at L2 (model architecture). Tesla's data + fleet asymmetry compounds faster than Waymo's superior sensor stack + geofenced operational data, even though Waymo ships the safer product today. The framework's call: whoever owns the largest L1 + L8 loop wins the decade, regardless of who's ahead this quarter.",
    layers: ["L1", "L8"],
    outcome:
      "Through 2024–2026 Waymo expanded geographically with the better short-term safety record while Tesla's FSD v12/v13 made step-function progress on the back of fleet-scale data. The contest is unresolved and probably will remain so for years — exactly the multi-year horizon the L1/L8 call implied.",
    structural: "playing-out",
    timing: "too-early",
    caseStudySlug: "tesla-vs-waymo-autonomy-stack",
  },
  {
    id: "adobe-firefly-licensed-data",
    subject: "Adobe Firefly",
    date: "2023-10-01",
    call:
      "Adobe's licensed-data L1 + Creative-Cloud L5 distribution gives it a structural moat against Midjourney and Stable Diffusion in the enterprise creative segment, even if the model quality (L2) is behind. Enterprises will pay for indemnification, not for the best raw model.",
    layers: ["L1", "L5"],
    outcome:
      "Through 2024–2026 Firefly became the default enterprise-safe image surface for Fortune 500 marketing teams, with the indemnification clause driving procurement decisions away from Midjourney despite Midjourney's quality lead. The L1 (licensed data) + L5 (Creative Cloud workflow) call held.",
    structural: "confirmed",
    timing: "on-pace",
    caseStudySlug: "adobe-firefly-licensed-data",
  },
  {
    id: "bloomberg-gpt-l2-fortress",
    subject: "BloombergGPT",
    date: "2023-04-15",
    call:
      "Bloomberg's L1 (terminal proprietary corpus) + L2 (in-house trained 50B financial model) is the textbook vertical-fortress play: own the data AND own the model, and the L2 stays defensible against frontier-lab generalists in finance.",
    layers: ["L1", "L2"],
    outcome:
      "Bloomberg shifted its internal AI strategy toward using frontier models (GPT-4, Claude) over the proprietary BloombergGPT model through 2024. The L1 corpus remained the moat; the L2 ownership thesis did not — frontier-model rate-of-improvement made bespoke 50B-parameter vertical models economically and qualitatively obsolete inside ~18 months.",
    structural: "wrong",
    timing: "faster",
    timingNote:
      "The 'own L2' part of the call aged poorly. The 'L1 corpus is the moat' part survived. Logged honestly: the framework over-weighted L2 ownership against frontier-model improvement curves. This is the kind of call the lens has to get sharper on.",
    caseStudySlug: "bloomberg-gpt-vertical-fortress",
  },
];

export const PREDICTIONS_BY_STRUCTURAL: Record<StructuralStatus, Prediction[]> =
  PREDICTIONS.reduce(
    (acc, p) => {
      acc[p.structural].push(p);
      return acc;
    },
    {
      confirmed: [] as Prediction[],
      "playing-out": [] as Prediction[],
      wrong: [] as Prediction[],
      pending: [] as Prediction[],
    },
  );
