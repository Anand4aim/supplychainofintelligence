// Soft display labels for raw verdict tokens used in the DB / generation pipeline.
// Editorial rule (mem://preferences/tone): the site is a counter-move site, not a
// crystal ball. Never display "DEAD" / "DOOMED" / "EXPOSED" as a verdict to the
// reader — translate to directional, structural language.

export type VerdictToken =
  | "DOMINANT"
  | "SAFE"
  | "CONTESTED"
  | "DEAD"
  | "EXPOSED"
  | "DOOMED"
  | string;

export const VERDICT_DISPLAY: Record<string, string> = {
  DOMINANT: "LEADING",
  SAFE: "DEFENSIBLE",
  CONTESTED: "CONTESTED",
  DEAD: "AT RISK",
  EXPOSED: "AT RISK",
  DOOMED: "AT RISK",
};

export const verdictLabel = (v: string | null | undefined): string => {
  if (!v) return "";
  const key = v.toUpperCase();
  return VERDICT_DISPLAY[key] ?? v;
};
