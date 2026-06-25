/**
 * The canonical Definition of Supply Chain of Intelligence™.
 *
 * Three short strings, used wherever the definition needs to render: meta tags,
 * JSON-LD, social copy, and the <CanonicalDefinition /> component on /framework,
 * /paper, /about, /methodology. Never inline these — import from here.
 *
 * The framework page (/framework) organizes the full body of work into SIX
 * sections (Definition · Map · Laws · Dynamics · Applications · Observations).
 * These three strings cover the first and last sections at a glance:
 *
 *   • DEFINITION_ONE_LINER / DEFINITION_LONG → section 1 (Definition).
 *   • APPLICATION_LINE                       → one-line bridge to section 2 (Map).
 *   • READING_LINE                           → one-line bridge to section 6 (Observations).
 *
 * "The framework does not change weekly. Which company sits in which layer does."
 */

export const DEFINITION_ONE_LINER =
  "Intelligence is a supply chain. Value accrues at the bottlenecks, not the most visible node.";

export const DEFINITION_LONG =
  "Supply Chain of Intelligence™ is a structural definition of generative AI: intelligence is a supply chain, and, like every supply chain, value accrues at the bottlenecks, not the most visible node. JTBD told us what users want. Supply Chain of Intelligence tells us where AI value accrues, and which products a foundation model, hyperscaler, or productivity suite can absorb.";

export const APPLICATION_LINE =
  "The framework resolves that idea into a working map: 10 layers (L-1 Resources → L8 Memory), 50 sublayers, three tiers (Substrate, Workflow, Surface), 4 structural laws, 3 currents, and the Intelligence Cube. The core framework definition remains the same. The architecture itself evolves with the field. It may be 12 layers or a different taxonomy tomorrow, and every structural change is a versioned Paper bump, not a quiet edit.";

export const READING_LINE =
  "Which company sits in which layer changes weekly. The framework does not. Market readings carry a re-review date; the framework does not.";

export const CANONICAL_DEFINITION = {
  definition: DEFINITION_ONE_LINER,
  application: APPLICATION_LINE,
  reading: READING_LINE,
} as const;
