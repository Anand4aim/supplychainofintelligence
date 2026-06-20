// Sources & Precedents per Structural Law.
// Anchors each law to prior strategy thinking so it is read as a synthesis,
// not a one-person invention. Rendered at the bottom of each Law essay.

export type Precedent = {
  thinker: string;
  work: string;
  year?: string;
  echo: string; // how it echoes / extends the prior work
};

export const PRECEDENTS_BY_LAW: Record<string, Precedent[]> = {
  "intelligence-commoditizes-downward": [
    {
      thinker: "Clayton Christensen",
      work: "The Law of Conservation of Attractive Profits",
      year: "2003",
      echo:
        "Christensen's observation that profit migrates to whichever layer is integrated when the layer above it modularizes. Law I is the AI-stack-specific case: as model capability modularizes, profit migrates downward into L0 silicon and upward into L8 memory, but evaporates from L7 wrappers.",
    },
    {
      thinker: "Ben Thompson",
      work: "Aggregation Theory",
      year: "2015",
      echo:
        "Thompson's claim that aggregators commoditize their suppliers and capture demand. Law I extends this: in AI, the model layer is the new aggregator, and surface wrappers are the new suppliers being commoditized.",
    },
    {
      thinker: "Marc Andreessen",
      work: "Software is Eating the World",
      year: "2011",
      echo:
        "Software ate vertical industries. AI is now eating software. Law I describes which software gets eaten first: the kind whose entire value lived at the prompt-and-UI surface.",
    },
  ],

  "value-accrues-at-bottlenecks": [
    {
      thinker: "Michael Porter",
      work: "Competitive Strategy / Five Forces",
      year: "1980",
      echo:
        "Porter's supplier power is essentially bottleneck ownership. Law II names the specific bottlenecks in the AI stack: L0 silicon (NVIDIA), L1b proprietary data (Bloomberg), L3 trust (Vanta), L4 distribution (Salesforce).",
    },
    {
      thinker: "Hal Varian",
      work: "Information Rules",
      year: "1999",
      echo:
        "Varian's network effects and lock-in apply directly to L4 access governance and L8 institutional memory. The framework specializes his analysis to AI-era bottlenecks.",
    },
    {
      thinker: "Bill Gurley",
      work: "All Markets Are Not Created Equal",
      year: "2012",
      echo:
        "Gurley's marketplace-quality framework identifies where defensibility compounds. Law II is the AI-stack analog: defensibility compounds at scarce structural layers, not at differentiated features.",
    },
  ],

  "surface-captures-attention-chain-captures-power": [
    {
      thinker: "Jim Barksdale",
      work: "Bundling and Unbundling",
      year: "1990s",
      echo:
        "'There are only two ways to make money in business: bundle and unbundle.' Law III is the AI variant: surface unbundles the chain, but the chain re-bundles itself underneath the next interface.",
    },
    {
      thinker: "Andrew Chen",
      work: "The Cold Start Problem",
      year: "2021",
      echo:
        "Chen's argument that network and data effects matter more than initial UX. Law III names this in stack terms: the surface attracts the first user, the chain keeps them, and the chain is what compounds.",
    },
    {
      thinker: "Brian Arthur",
      work: "Increasing Returns and Path Dependence",
      year: "1994",
      echo:
        "Arthur's increasing-returns dynamics describe why owning a deeper layer is structurally durable. Law III translates that into product terms: L8 memory and L1b data create increasing-returns moats; L7 surface does not.",
    },
  ],
};
