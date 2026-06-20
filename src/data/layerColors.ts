/**
 * SINGLE SOURCE OF TRUTH for layer colors as hex.
 * Mirrors the HSL tokens in src/index.css (--layer-neg1 … --layer-8).
 * Use this in any context that can't read CSS variables, PDFs, SVG exports,
 * social-image generators, embeddable widgets.
 *
 * In React components, prefer layerColor(id) / layerVar(id) from ./layers.ts
 * so the values stay reactive to theme changes.
 */
export const LAYER_HEX: Record<string, string> = {
  "L-1": "#372e63", // hsl(263 35% 30%)
  L0: "#4a4373",   // hsl(258 30% 38%)
  L1: "#923cb8",   // hsl(273 51% 48%)
  L2: "#3b5a96",   // hsl(221 44% 41%)
  L3: "#4787b4",   // hsl(207 44% 49%)
  L4: "#1fb3a8",   // hsl(177 70% 41%)
  L5: "#2e8a55",   // hsl(146 50% 36%)
  L6: "#dab023",   // hsl(43 74% 49%)
  L7: "#d16a1e",   // hsl(25 75% 47%)
  L8: "#b03065",   // hsl(336 56% 44%)
};

export const LAYER_HEX_TINT: Record<string, string> = {
  "L-1": "#ebe5f0",
  L0: "#eae5f0",
  L1: "#f1e5f5",
  L2: "#e5ebf4",
  L3: "#e3ecf4",
  L4: "#dff2f0",
  L5: "#e3efe7",
  L6: "#f5edd6",
  L7: "#f5e7d8",
  L8: "#f3e0e8",
};

// Paper canvas (sandalwood), for any artifact (PDF/SVG/canvas) that needs
// the same surface the web Stack page uses.
export const PAPER = {
  bg: "#ede5d3",       // hsl(38 30% 92%)
  bgDeep: "#dcd1ba",   // hsl(36 22% 86%)
  rule: "#c8bba0",     // hsl(36 18% 78%)
  ink: "#0f172a",      // hsl(220 50% 12%), navy
  gold: "#b08a3a",     // accent
};
