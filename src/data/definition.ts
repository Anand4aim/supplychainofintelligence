/**
 * The canonical Definition of the Supply Chain of Intelligence™.
 *
 * THREE REGISTERS, never collapse them:
 *
 *   1. DEFINITION (evergreen, never changes), the idea itself.
 *      Same altitude as Christensen's "people hire products to get a job done."
 *      Names no technology, no company, no layer. Cannot go stale.
 *
 *   2. APPLICATION (evergreen structure), the contribution.
 *      The vocabulary: 10 layers, 50 sublayers, 4 laws, 3 currents, the Cube.
 *      Number and names of layers are part of the framework; a new layer = major version bump.
 *
 *   3. READING (living, monthly cadence), readings of the market.
 *      Which company sits in which layer. Verdicts. Predictions. Re-reviewed monthly.
 *      See /methodology for the cadence contract.
 *
 * Use the <CanonicalDefinition /> component to render. Import these strings
 * directly for meta tags, JSON-LD, alt text, social copy.
 */

export const DEFINITION_ONE_LINER =
  "Intelligence is a supply chain. Value accrues at the scarce, defensible nodes, not the most visible one.";

export const DEFINITION_LONG =
  "The Supply Chain of Intelligence™ is a structural definition of generative AI: intelligence is a supply chain, and, like every supply chain, value accrues at the scarce, defensible nodes, not the most visible one. JTBD told us what users want. The Supply Chain of Intelligence tells us where AI value accrues, and which products a foundation model, hyperscaler, or productivity suite can absorb.";

export const APPLICATION_LINE =
  "The framework resolves that idea into a working map: 10 layers (L-1 Resources → L8 Memory), 50 sublayers, 4 structural laws, 3 currents, and the Intelligence Cube. The core framework definition remains the same. The architecture itself evolves with the field. It may be 12 layers or a different taxonomy tomorrow, and every structural change is a versioned Paper bump, not a quiet edit.";

export const READING_LINE =
  "Which company sits in which layer changes weekly. The framework does not. Market readings carry a re-review date; the framework does not.";

export const CANONICAL_DEFINITION = {
  definition: DEFINITION_ONE_LINER,
  application: APPLICATION_LINE,
  reading: READING_LINE,
} as const;
