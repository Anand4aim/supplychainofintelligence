// Public revision log. Append-only. Most recent first.
// Categories: framework (Paper bump), map (Market/Vertical Map re-review),
// verdict (re-grade of a specific company), prediction (new/revised), site.

export type ChangelogKind = "framework" | "map" | "verdict" | "prediction" | "site";

export interface ChangelogEntry {
  date: string;          // ISO yyyy-mm-dd
  kind: ChangelogKind;
  title: string;
  body: string;          // 1–3 sentences
  links?: { label: string; href: string }[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    date: "2026-06-20",
    kind: "site",
    title: "Methodology page + monthly re-review cadence published",
    body: "Made the two-register editorial contract explicit: evergreen framework vs living readings. All Maps, Vertical Maps, and Predictions now carry a freshness badge and are re-reviewed on the 1st of every month.",
    links: [
      { label: "/methodology", href: "/methodology" },
    ],
  },
  {
    date: "2026-06-20",
    kind: "verdict",
    title: "Harvey re-graded from Fortress → Contested",
    body: "Harvey still holds the multi-layer position (L1 + L3 + L5 + L8), but the lead is now measured in years, not decades. Frontier models plus general legal agents from LexisNexis, vLex, Thomson Reuters, and Legora have closed the citation-and-workflow gap faster than expected. Counter-move: deepen L1 (proprietary case corpus) or L3 (jurisdictional gates).",
    links: [
      { label: "Market Map · L3", href: "/market-map" },
      { label: "Legal Vertical Map", href: "/market-map/legal" },
      { label: "Prediction", href: "/predictions" },
    ],
  },
];
