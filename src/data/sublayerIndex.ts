// ─── Sublayer registry ──────────────────────────────────────────────
// Single source of truth for sublayer lookups. Sublayer definitions
// themselves live in `src/data/layers.ts`, this file just indexes them
// and exposes typed helpers so the rest of the app can cite sublayers
// (L1b, L5d, L8c) instead of stopping at the layer level.
//
// Why a separate file? `layers.ts` is data the LayerDetail page already
// renders top-down. We need a fast random-access index for chips and
// verdict strings scattered across cards, the homepage, and case
// studies. Keeping the index colocated would force everyone who
// imports a layer to also drag in the helpers.

import { LAYERS, SUBLAYER_LABEL, layerColor, layerVar } from "./layers";

export interface SublayerEntry {
  id: string;           // "L1b"
  name: string;         // "Proprietary Data"
  desc: string;
  defensible: boolean;
  layerId: string;      // "L1"
  layerName: string;    // "Data"
  layerShortName: string; // "Data"
  color: string;        // hsl(var(--layer-1))
  cssVar: string;       // --layer-1
  /** Anchor URL on the framework detail page, e.g. /framework/l1-data#l1b */
  href: string;
  /** "L1b Proprietary Data", canonical inline label */
  label: string;
}

const slugFor = (layerId: string, shortName: string) =>
  `${layerId.toLowerCase()}-${shortName.toLowerCase().replace(/\s+/g, "-")}`;

export const SUBLAYERS: SublayerEntry[] = LAYERS.flatMap((l) =>
  l.sublayers.map((s) => ({
    id: s.id,
    name: s.name,
    desc: s.desc,
    defensible: !!s.defensible,
    layerId: l.id,
    layerName: l.name,
    layerShortName: l.shortName,
    color: layerColor(l.id),
    cssVar: layerVar(l.id),
    href: `/framework/${slugFor(l.id, l.shortName)}#${s.id.toLowerCase()}`,
    label: `${s.id} ${s.name}`,
  })),
);

export const SUBLAYER_BY_ID: Record<string, SublayerEntry> = Object.fromEntries(
  SUBLAYERS.map((s) => [s.id, s]),
);

/** Returns true if `id` looks like a sublayer ("L1b", "L-1a") rather than a layer. */
export const isSublayerId = (id: string): boolean => /[a-z]$/.test(id);

/** "L1b" -> "L1"; layer ids pass through unchanged. */
export const parentLayerId = (id: string): string => id.replace(/[a-z]$/, "");

/**
 * Format a mixed list of layer/sublayer ids into a verdict-style string.
 *   formatSublayers(["L1b","L5d","L8c"]) -> "L1b Proprietary Data + L5d Operating Playbooks + L8c Aggregated Network Learning"
 *   formatSublayers(["L1b","L5"], { terse: true }) -> "L1b + L5"
 */
export const formatSublayers = (
  ids: string[],
  opts: { terse?: boolean; separator?: string } = {},
): string => {
  const sep = opts.separator ?? " + ";
  return ids
    .map((id) => {
      if (opts.terse) return id;
      if (isSublayerId(id)) return SUBLAYER_BY_ID[id]?.label ?? id;
      return id;
    })
    .join(sep);
};

/** Lookup wrapper, returns the name only, falling back to the id. */
export const sublayerName = (id: string): string =>
  SUBLAYER_LABEL[id] ?? id;
