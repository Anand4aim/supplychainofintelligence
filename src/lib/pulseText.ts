// Serializers that turn site content into LinkedIn-Pulse-safe long-form text.
//
// LinkedIn's Article editor preserves headings, bold, bullets, numbered lists
// and blockquotes on paste. It drops tables, colors, and components. So every
// table-shaped thing (layer scores, sublayer impact) becomes prose bullets here,
// and the diagram work is carried by the exported hero PNG instead.

import { LAYER_SHORT_LABEL } from "@/data/layers";
import { verdictLabel } from "@/data/verdictLabels";

const SITE = "https://supplychainofai.com";

const AUTHOR_LINE =
  "Anand Arivukkarasu — Ex-Meta (Instagram) Product Leader & AI Product Architect. San Francisco.";

const BRAND_LINE =
  "The Supply Chain of Intelligence™ — the 10 layers of the generative AI stack. Not logistics.";

const DISCLOSURE =
  "Written in a personal capacity, on personal time. Views are my own and do not represent any employer. The Supply Chain of Intelligence™ and The Intelligence Cube™ are trademarks of the author.";

type SubLayer = string | { name: string; impact?: number; who?: string };

export interface PulseLayerScore {
  layer: string;
  owned: boolean;
  intensity?: number;
  note: string;
  sublayers?: SubLayer[];
}

export interface PulseLiveArticle {
  slug: string;
  headline: string;
  subheadline: string | null;
  news_summary: string;
  verdict: string;
  source_urls?: string[];
  analysis: {
    layer_scores: PulseLayerScore[];
    why_now?: string;
    structural_take: string;
    second_order_effects?: string;
    who_wins?: { name: string; reason: string }[];
    who_loses?: { name: string; reason: string }[];
    counter_thesis?: string;
    what_to_watch?: string[];
    new_law_candidate?: string;
  };
}

const clean = (s?: string | null) => (s ?? "").replace(/\s+\n/g, "\n").trim();

/** Pick the sharpest single sentence from a block, for use as a pull-quote. */
export const sharpestSentence = (text?: string | null): string => {
  const body = clean(text);
  if (!body) return "";
  const sentences = body
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 40 && s.length < 220);
  if (!sentences.length) return "";
  // Prefer a sentence that names a layer or a structural verb.
  const scored = sentences.map((s) => {
    let score = 0;
    if (/\bL-?\d\b/.test(s)) score += 3;
    if (/(owns|controls|compresses|collapses|shifts|becomes|moat|defensib)/i.test(s)) score += 2;
    if (s.length > 80 && s.length < 170) score += 1;
    return { s, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored[0].s;
};

const intensityWord = (n?: number) => {
  if (!n || n <= 0) return "";
  if (n >= 4) return "heavy impact";
  if (n === 3) return "strong impact";
  if (n === 2) return "moderate impact";
  return "light impact";
};

const layerBullets = (scores: PulseLayerScore[]): string[] =>
  scores
    .filter((s) => s.owned || (s.intensity ?? 0) > 0)
    .map((s) => {
      const short = LAYER_SHORT_LABEL[s.layer] ?? "";
      const bits = [s.owned ? "owned" : "contested", intensityWord(s.intensity)].filter(Boolean);
      return `- **${s.layer}${short ? ` ${short}` : ""}** (${bits.join(", ")}) — ${clean(s.note)}`;
    });

const sublayerBullets = (scores: PulseLayerScore[]): string[] => {
  const out: string[] = [];
  for (const s of scores) {
    for (const sub of s.sublayers ?? []) {
      const name = typeof sub === "string" ? sub : sub.name;
      const who = typeof sub === "string" ? "" : sub.who;
      if (!name) continue;
      out.push(`- **${name}**${who ? ` — ${who}` : ""}`);
    }
  }
  return out.slice(0, 10);
};

const attribution = (path: string) =>
  [
    "---",
    "",
    AUTHOR_LINE,
    "",
    BRAND_LINE,
    "",
    `Originally published at ${SITE}${path} — the canonical version, with the full interactive layer map.`,
    "",
    DISCLOSURE,
  ].join("\n");

/** Long-form, Pulse-ready version of a live analysis article. */
export function buildLivePulse(a: PulseLiveArticle): string {
  const an = a.analysis;
  const L: string[] = [];

  L.push(clean(a.headline));
  L.push("");
  if (a.subheadline) {
    L.push(`_${clean(a.subheadline)}_`);
    L.push("");
  }

  L.push("## What happened");
  L.push("");
  L.push(clean(a.news_summary));
  L.push("");

  const quote = sharpestSentence(an.structural_take);
  if (quote) {
    L.push(`> ${quote}`);
    L.push("");
  }

  if (an.why_now) {
    L.push("## Why it matters now");
    L.push("");
    L.push(clean(an.why_now));
    L.push("");
  }

  L.push("## The structural read");
  L.push("");
  L.push(clean(an.structural_take));
  L.push("");

  const bullets = layerBullets(an.layer_scores ?? []);
  if (bullets.length) {
    L.push("## Where it lands on the supply chain");
    L.push("");
    L.push(...bullets);
    L.push("");
    L.push(`**Verdict: ${verdictLabel(a.verdict)}**`);
    L.push("");
  }

  const subs = sublayerBullets(an.layer_scores ?? []);
  if (subs.length) {
    L.push("### The sublayers actually moving");
    L.push("");
    L.push(...subs);
    L.push("");
  }

  if (an.second_order_effects) {
    L.push("## Second-order effects");
    L.push("");
    L.push(clean(an.second_order_effects));
    L.push("");
  }

  if (an.who_wins?.length || an.who_loses?.length) {
    L.push("## Who gains, who is exposed");
    L.push("");
    if (an.who_wins?.length) {
      L.push("**Gaining ground**");
      L.push("");
      L.push(...an.who_wins.map((w) => `- **${w.name}** — ${clean(w.reason)}`));
      L.push("");
    }
    if (an.who_loses?.length) {
      L.push("**Under pressure**");
      L.push("");
      L.push(...an.who_loses.map((w) => `- **${w.name}** — ${clean(w.reason)}`));
      L.push("");
    }
  }

  if (an.counter_thesis) {
    L.push("## The counter-case");
    L.push("");
    L.push(clean(an.counter_thesis));
    L.push("");
  }

  if (an.what_to_watch?.length) {
    L.push("## What to watch next");
    L.push("");
    L.push(...an.what_to_watch.map((s, i) => `${i + 1}. ${clean(s)}`));
    L.push("");
  }

  if (an.new_law_candidate && an.new_law_candidate.trim()) {
    L.push(`> ${clean(an.new_law_candidate)}`);
    L.push("");
  }

  if (a.source_urls?.length) {
    L.push("## Sources");
    L.push("");
    L.push(...a.source_urls.map((u) => `- ${u}`));
    L.push("");
  }

  L.push(attribution(`/live/${a.slug}`));
  return L.join("\n").replace(/\n{3,}/g, "\n\n");
}

/** Short feed post. Falls back to a derived version when none is stored. */
export function buildLiveFeedPost(a: PulseLiveArticle, stored?: string | null): string {
  const body = clean(stored);
  const core =
    body ||
    [
      clean(a.headline),
      "",
      clean(a.subheadline ?? a.news_summary).slice(0, 320),
      "",
      sharpestSentence(a.analysis.structural_take),
      "",
      `Verdict: ${verdictLabel(a.verdict)}.`,
    ]
      .filter((x) => x !== undefined)
      .join("\n");

  return [
    core,
    "",
    `Full breakdown, with the layer map: ${SITE}/live/${a.slug}`,
    "",
    "#AI #Strategy #SupplyChainOfIntelligence #ProductStrategy #VentureCapital",
  ].join("\n");
}

export interface PulsePost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  body: string[];
}

/** Long-form Pulse version of an archived essay / opinion post. */
export function buildPostPulse(p: PulsePost): string {
  const L: string[] = [];
  L.push(clean(p.title));
  L.push("");
  L.push(`_${clean(p.subtitle).replace(/\*\*/g, "")}_`);
  L.push("");

  for (const para of p.body) {
    const t = clean(para);
    if (!t) continue;
    if (t === "---") {
      L.push("");
      continue;
    }
    if (t.startsWith("## ")) {
      L.push(`## ${t.slice(3)}`);
      L.push("");
      continue;
    }
    if (t.startsWith(">> ")) {
      L.push(`> ${t.slice(3)}`);
      L.push("");
      continue;
    }
    if (t.startsWith("^^ ")) {
      L.push(`_${t.slice(3)}_`);
      L.push("");
      continue;
    }
    // Inline poster markers have no text equivalent, they become the hero PNG.
    if (/^\[\[poster:[a-z-]+\]\]$/.test(t)) continue;
    L.push(t);
    L.push("");
  }

  L.push(attribution(`/posts/${p.slug}`));
  return L.join("\n").replace(/\n{3,}/g, "\n\n");
}

/** Short feed post derived from an essay. */
export function buildPostFeed(p: PulsePost): string {
  return [
    clean(p.title),
    "",
    clean(p.excerpt).slice(0, 500),
    "",
    `Read the full essay: ${SITE}/posts/${p.slug}`,
    "",
    "#AI #Strategy #SupplyChainOfIntelligence #ProductStrategy",
  ].join("\n");
}
