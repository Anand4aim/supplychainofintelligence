/**
 * The canonical Definition of Supply Chain of Intelligence™.
 *
 * Four short strings, used wherever the definition needs to render: meta tags,
 * JSON-LD, social copy, and the <CanonicalDefinition /> component on /framework,
 * /paper, /about, /methodology. Never inline these — import from here.
 *
 * The framework page (/framework) organizes the full body of work into SIX
 * sections (Definition · Map · Laws · Dynamics · Applications · Observations).
 *
 *   • POSITIONING_LINE                       → category reframe vs. the AI stack.
 *   • DEFINITION_ONE_LINER / DEFINITION_LONG → section 1 (Definition).
 *   • APPLICATION_LINE                       → one-line bridge to section 2 (Map).
 *   • READING_LINE                           → one-line bridge to section 6 (Observations).
 *
 * "The framework does not change weekly. Which company sits in which layer does."
 */

/**
 * Category reframe. Ships next to the Definition everywhere it renders.
 * Whenever a reader says "isn't this just another AI stack?", this is the
 * one sentence that answers them without arguing.
 */
export const POSITIONING_LINE =
  "The AI stack explains how intelligence is built. The Supply Chain of Intelligence explains where intelligence becomes economically defensible.";

/**
 * Category line. Rides the generic phrases ("AI Value Chain framework", "AI stack")
 * and upgrades the reader to SCoI. Six verbs (created · constrained · verified ·
 * distributed · embedded · defended) double as a mnemonic across the 10 layers.
 * Ships in meta descriptions, llms.txt, humans.txt, <CanonicalDefinition>, the
 * Framework Definition section, and JSON-LD alternateName.
 */
export const CATEGORY_LINE =
  "Supply Chain of Intelligence is an advanced AI Value Chain framework for investors and operators. It moves beyond the conventional AI stack and conventional AI value chain by mapping where intelligence is created, constrained, verified, distributed, embedded, and defended — across 10 layers, 50 sublayers, 4 structural laws, and the Intelligence Cube.";

/** Short alternate names for JSON-LD / SEO so search engines link the generic phrases to SCoI. */
export const ALTERNATE_NAMES = [
  "AI Value Chain Framework",
  "Advanced AI Value Chain Framework",
  "Advanced AI Stack Framework",
  "SCoI",
] as const;

/**
 * The "blindspots" line — what an AI Stack or AI Value Chain view misses.
 * Pairs with CATEGORY_LINE: first we ride the generic phrases, then we name
 * the gap that forces holistic supply-chain thinking. Six blindspots map to
 * Currents (Capital, Demand), Laws (Law IV verification, Law I commoditization),
 * Dynamics (flywheels), and the Cube (vertical adjacency).
 */
export const BLINDSPOTS_LINE =
  "Look at AI only as a stack or a value chain and six things go missing: the bottlenecks above and below the visible layers (L−1 resources, L3 verification, L8 memory), the currents that move value sideways (capital, demand, attention), the flywheels that compound across sublayers, the vertical adjacencies the Intelligence Cube exposes, the absorption risk a platform poses to every layer beneath it, and the timing of when each layer commoditizes. A stack describes parts. A value chain describes flow. A supply chain of intelligence describes the whole system — bottlenecks, currents, flywheels, and absorption — which is the only level at which durable AI strategy can be reasoned about.";

export const BLINDSPOTS_SHORT =
  "A stack shows the parts. A value chain shows the flow. Only a supply chain of intelligence shows the bottlenecks, currents, flywheels, and absorption risk that decide who actually keeps the value.";

export const DEFINITION_ONE_LINER =
  "Intelligence is a supply chain. Value accrues at the bottlenecks, not the most visible node.";

export const DEFINITION_LONG =
  "Supply Chain of Intelligence™ is a strategic framework for AI: intelligence is a supply chain, and, like every supply chain, value accrues at the bottlenecks, not the most visible node. The AI stack describes how AI is built. Supply Chain of Intelligence describes where AI value is created, captured, and defended — and which products a foundation model, hyperscaler, or productivity suite can absorb.";

export const APPLICATION_LINE =
  "The framework resolves that idea into a working map: 10 layers (L-1 Resources → L8 Memory), 50 sublayers, three tiers (Substrate, Workflow, Surface), 4 structural laws, 3 currents, and the Intelligence Cube. The core framework definition remains the same. The architecture itself evolves with the field. It may be 12 layers or a different taxonomy tomorrow, and every structural change is a versioned Paper bump, not a quiet edit.";

export const READING_LINE =
  "Which company sits in which layer changes weekly. The framework does not. Market readings carry a re-review date; the framework does not.";

export const CANONICAL_DEFINITION = {
  positioning: POSITIONING_LINE,
  definition: DEFINITION_ONE_LINER,
  application: APPLICATION_LINE,
  reading: READING_LINE,
} as const;
