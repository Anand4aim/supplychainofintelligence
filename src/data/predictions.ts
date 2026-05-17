/**
 * Predictions archive — public track record for The Supply Chain of Intelligence™.
 *
 * Each entry is a dated structural call made through the framework, the layer
 * exposure that triggered the call, what has happened since, and the case
 * study slug where the full analysis lives. The goal is falsifiability:
 * a skeptical reader (PE/VC, operator, journalist) should be able to scan
 * this table and decide whether the lens has predictive value.
 *
 * Status taxonomy is intentionally narrow:
 *   - "playing-out": directionally tracking, not yet resolved
 *   - "confirmed":   the structural call has materialized in public outcomes
 *   - "pending":     too early to score; flagged for monitoring
 *   - "wrong":       the call did not hold — kept for honesty
 */

export type PredictionStatus = "playing-out" | "confirmed" | "pending" | "wrong";

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
  /** Current status. */
  status: PredictionStatus;
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
    status: "confirmed",
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
    status: "confirmed",
    caseStudySlug: "chegg-collapse",
    source: {
      label: "CNBC — Chegg shares plunge 48% on ChatGPT impact",
      url: "https://www.cnbc.com/2023/05/02/chegg-drops-more-than-40percent-after-saying-chatgpt-is-killing-its-business.html",
    },
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
    status: "playing-out",
    caseStudySlug: "glean-enterprise-search-fortress",
  },
  {
    id: "sierra-l1-l5-l8-stack",
    subject: "Sierra",
    date: "2024-10-01",
    call:
      "A vertical agent platform that owns L1 (per-customer policy + transcript data), L5 (workflow integration into existing CX stacks), and L8 (learning loop on resolution outcomes) is the structurally correct way to build durable agent value — and is what Jasper was not.",
    layers: ["L1", "L5", "L8"],
    outcome:
      "Sierra raised at $4.5B in late 2024 and $10B in 2025 on the back of named enterprise CX deployments and reported per-resolution economics. The L1/L5/L8 stack is exactly what acquirers and investors are paying a premium for.",
    status: "confirmed",
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
      "A general-purpose L7 'AI software engineer' agent demo without L1 codebase ownership, L3 review/policy primitives, or L5 IDE workflow lock-in faces the same exposure as Jasper: the surface is reproducible inside Cursor, Copilot, and Claude Code the moment they decide to ship it.",
    layers: ["L7"],
    outcome:
      "Through 2024–2025, the agent-coding surface compressed: Cursor, Copilot Workspace, Claude Code, and Codex all shipped equivalents. Cognition pivoted toward Devin-as-teammate inside engineering orgs (an L5 move), validating the structural read.",
    status: "playing-out",
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
    status: "confirmed",
    caseStudySlug: "stability-ai-open-model-trap",
  },
];

export const PREDICTIONS_BY_STATUS: Record<PredictionStatus, Prediction[]> =
  PREDICTIONS.reduce(
    (acc, p) => {
      acc[p.status].push(p);
      return acc;
    },
    {
      "playing-out": [] as Prediction[],
      confirmed: [] as Prediction[],
      pending: [] as Prediction[],
      wrong: [] as Prediction[],
    },
  );
