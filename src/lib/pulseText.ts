// Serializers that turn site content into LinkedIn-Pulse-ready long form.
//
// Pulse variables, the two that matter:
//   1. The Pulse editor does NOT parse markdown on paste. "## " or "**bold**"
//      paste literally. So we never emit markdown markers.
//   2. It DOES accept rich text on paste. When the clipboard carries a
//      text/html flavour, Pulse keeps h2 headings, bold, italic, blockquote,
//      bulleted and numbered lists, and links. Tables and images-in-text are
//      dropped, so every table-shaped thing becomes prose bullets here and the
//      diagram is carried by the PNG hero.
//
// Therefore each serializer builds a block model once, then renders it twice:
// toHtml() for the rich clipboard flavour (formatting survives), toText() for
// the plain fallback (clean bare lines, typographic quotes, bullet characters).

import { LAYER_SHORT_LABEL } from "@/data/layers";
import { verdictLabel } from "@/data/verdictLabels";

const SITE = "https://supplychainofai.com";

const AUTHOR_LINE =
  "Anand Arivukkarasu — Ex-Meta (Instagram) Product Leader & AI Product Architect. San Francisco.";

const BRAND_LINE =
  "The Supply Chain of Intelligence™ — the 10 layers of the generative AI stack. Not logistics.";

const DISCLOSURE =
  "Written in a personal capacity, on personal time. Views are my own and do not represent any employer. The Supply Chain of Intelligence™ and The Intelligence Cube™ are trademarks of the author.";

/* ------------------------------------------------------------------ */
/* Block model                                                         */
/* ------------------------------------------------------------------ */

/** A list row: optional bold lead-in, then the rest of the sentence. */
export interface Row {
  lead?: string;
  text: string;
}

export type Block =
  | { t: "h2"; text: string }
  | { t: "title"; text: string }
  | { t: "lead"; text: string }
  | { t: "p"; text: string }
  | { t: "quote"; text: string; cite?: string }
  | { t: "ul"; rows: Row[] }
  | { t: "ol"; rows: Row[] }
  | { t: "kv"; lead: string; text: string }
  | { t: "hr" }
  | { t: "small"; text: string };

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Turn bare URLs into anchors, after escaping. */
const linkify = (s: string) =>
  esc(s).replace(/(https?:\/\/[^\s<]+[^\s<.,)])/g, '<a href="$1">$1</a>');

const rowHtml = (r: Row) =>
  `<li>${r.lead ? `<strong>${esc(r.lead)}</strong>${r.text ? " — " : ""}` : ""}${
    r.text ? linkify(r.text) : ""
  }</li>`;

const rowText = (r: Row) =>
  `${r.lead ? `${r.lead}${r.text ? " — " : ""}` : ""}${r.text}`;

/** Rich-text flavour. Pulse keeps h2 / strong / em / blockquote / ul / ol / a. */
export function toHtml(blocks: Block[]): string {
  const out: string[] = [];
  for (const b of blocks) {
    switch (b.t) {
      case "title":
        out.push(`<h1>${esc(b.text)}</h1>`);
        break;
      case "h2":
        out.push(`<h2>${esc(b.text)}</h2>`);
        break;
      case "lead":
        out.push(`<p><em>${linkify(b.text)}</em></p>`);
        break;
      case "p":
        out.push(`<p>${linkify(b.text)}</p>`);
        break;
      case "quote":
        out.push(
          `<blockquote><p><strong><em>${linkify(b.text)}</em></strong>${
            b.cite ? `<br><em>${esc(b.cite)}</em>` : ""
          }</p></blockquote>`,
        );
        break;
      case "ul":
        out.push(`<ul>${b.rows.map(rowHtml).join("")}</ul>`);
        break;
      case "ol":
        out.push(`<ol>${b.rows.map(rowHtml).join("")}</ol>`);
        break;
      case "kv":
        out.push(`<p><strong>${esc(b.lead)}</strong> ${linkify(b.text)}</p>`);
        break;
      case "hr":
        out.push("<hr>");
        break;
      case "small":
        out.push(`<p><em>${linkify(b.text)}</em></p>`);
        break;
    }
  }
  return `<meta charset="utf-8"><div>${out.join("\n")}</div>`;
}

/** Plain fallback. No markdown markers, they would paste literally. */
export function toText(blocks: Block[]): string {
  const L: string[] = [];
  for (const b of blocks) {
    switch (b.t) {
      case "title":
      case "h2":
      case "p":
      case "lead":
      case "small":
        L.push(b.text, "");
        break;
      case "quote":
        L.push(`“${b.text}”`, "");
        break;
      case "ul":
        L.push(...b.rows.map((r) => `• ${rowText(r)}`), "");
        break;
      case "ol":
        L.push(...b.rows.map((r, i) => `${i + 1}. ${rowText(r)}`), "");
        break;
      case "kv":
        L.push(`${b.lead} ${b.text}`, "");
        break;
      case "hr":
        L.push("—", "");
        break;
    }
  }
  return L.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export interface PulseDoc {
  text: string;
  html: string;
  blocks: Block[];
}

const doc = (blocks: Block[]): PulseDoc => ({
  blocks,
  text: toText(blocks),
  html: toHtml(blocks),
});

/* ------------------------------------------------------------------ */
/* Inputs                                                              */
/* ------------------------------------------------------------------ */

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

const clean = (s?: string | null) =>
  (s ?? "").replace(/\*\*/g, "").replace(/\s+\n/g, "\n").trim();

/** Split a long block into paragraphs so Pulse gets breathing room. */
const paras = (s?: string | null): Block[] =>
  clean(s)
    .split(/\n{2,}|\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((text) => ({ t: "p", text }) as Block);

/** Pick the sharpest single sentence from a block, for use as a pull-quote. */
export const sharpestSentence = (text?: string | null): string => {
  const body = clean(text);
  if (!body) return "";
  const sentences = body
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 40 && s.length < 220);
  if (!sentences.length) return "";
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

const layerRows = (scores: PulseLayerScore[]): Row[] =>
  scores
    .filter((s) => s.owned || (s.intensity ?? 0) > 0)
    .map((s) => {
      const short = LAYER_SHORT_LABEL[s.layer] ?? "";
      const bits = [s.owned ? "owned" : "contested", intensityWord(s.intensity)].filter(Boolean);
      return {
        lead: `${s.layer}${short ? ` ${short}` : ""} (${bits.join(", ")})`,
        text: clean(s.note),
      };
    });

const sublayerRows = (scores: PulseLayerScore[]): Row[] => {
  const out: Row[] = [];
  for (const s of scores) {
    for (const sub of s.sublayers ?? []) {
      const name = typeof sub === "string" ? sub : sub.name;
      const who = typeof sub === "string" ? "" : sub.who;
      if (!name) continue;
      out.push({ lead: name, text: clean(who) });
    }
  }
  return out.slice(0, 10);
};

const attribution = (path: string): Block[] => [
  { t: "hr" },
  { t: "kv", lead: "Author.", text: AUTHOR_LINE.replace("Anand Arivukkarasu — ", "") },
  { t: "small", text: BRAND_LINE },
  {
    t: "small",
    text: `Originally published at ${SITE}${path} — the canonical version, with the full interactive layer map.`,
  },
  { t: "small", text: DISCLOSURE },
];

/* ------------------------------------------------------------------ */
/* Live analysis article                                               */
/* ------------------------------------------------------------------ */

export function buildLivePulseDoc(a: PulseLiveArticle): PulseDoc {
  const an = a.analysis;
  const B: Block[] = [];

  B.push({ t: "title", text: clean(a.headline) });
  if (a.subheadline) B.push({ t: "lead", text: clean(a.subheadline) });

  B.push({ t: "h2", text: "What happened" });
  B.push(...paras(a.news_summary));

  const quote = sharpestSentence(an.structural_take);
  if (quote) B.push({ t: "quote", text: quote });

  if (an.why_now) {
    B.push({ t: "h2", text: "Why it matters now" });
    B.push(...paras(an.why_now));
  }

  B.push({ t: "h2", text: "The structural read" });
  B.push(...paras(an.structural_take));

  const rows = layerRows(an.layer_scores ?? []);
  if (rows.length) {
    B.push({ t: "h2", text: "Where it lands on the supply chain" });
    B.push({ t: "ul", rows });
    B.push({ t: "kv", lead: "Verdict:", text: `${verdictLabel(a.verdict)}.` });
  }

  const subs = sublayerRows(an.layer_scores ?? []);
  if (subs.length) {
    B.push({ t: "h2", text: "The sublayers actually moving" });
    B.push({ t: "ul", rows: subs });
  }

  if (an.second_order_effects) {
    B.push({ t: "h2", text: "Second-order effects" });
    B.push(...paras(an.second_order_effects));
  }

  if (an.who_wins?.length || an.who_loses?.length) {
    B.push({ t: "h2", text: "Who gains, who is exposed" });
    if (an.who_wins?.length) {
      B.push({ t: "kv", lead: "Gaining ground.", text: "" });
      B.push({
        t: "ul",
        rows: an.who_wins.map((w) => ({ lead: w.name, text: clean(w.reason) })),
      });
    }
    if (an.who_loses?.length) {
      B.push({ t: "kv", lead: "Under pressure.", text: "" });
      B.push({
        t: "ul",
        rows: an.who_loses.map((w) => ({ lead: w.name, text: clean(w.reason) })),
      });
    }
  }

  if (an.counter_thesis) {
    B.push({ t: "h2", text: "The counter-case" });
    B.push(...paras(an.counter_thesis));
  }

  if (an.what_to_watch?.length) {
    B.push({ t: "h2", text: "What to watch next" });
    B.push({ t: "ol", rows: an.what_to_watch.map((s) => ({ text: clean(s) })) });
  }

  if (an.new_law_candidate && an.new_law_candidate.trim()) {
    B.push({
      t: "quote",
      text: clean(an.new_law_candidate),
      cite: "Supply Chain of Intelligence™, candidate law",
    });
  }

  if (a.source_urls?.length) {
    B.push({ t: "h2", text: "Sources" });
    B.push({ t: "ul", rows: a.source_urls.map((u) => ({ text: u })) });
  }

  B.push(...attribution(`/live/${a.slug}`));
  return doc(B);
}

/** Backwards-compatible plain-text form. */
export const buildLivePulse = (a: PulseLiveArticle): string => buildLivePulseDoc(a).text;

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
    ].join("\n");

  return [
    core,
    "",
    `Full breakdown, with the layer map: ${SITE}/live/${a.slug}`,
    "",
    "#AI #Strategy #SupplyChainOfIntelligence #ProductStrategy #VentureCapital",
  ].join("\n");
}

/* ------------------------------------------------------------------ */
/* Essays and opinion posts                                            */
/* ------------------------------------------------------------------ */

export interface PulsePost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  body: string[];
}

export function buildPostPulseDoc(p: PulsePost): PulseDoc {
  const B: Block[] = [];
  B.push({ t: "title", text: clean(p.title) });
  if (p.subtitle) B.push({ t: "lead", text: clean(p.subtitle) });

  let pendingList: Row[] = [];
  const flush = () => {
    if (pendingList.length) {
      B.push({ t: "ul", rows: pendingList });
      pendingList = [];
    }
  };

  for (const para of p.body) {
    const t = clean(para);
    if (!t) continue;
    if (/^\[\[poster:[a-z-]+\]\]$/.test(t)) continue;
    if (t === "---") {
      flush();
      B.push({ t: "hr" });
      continue;
    }
    if (t.startsWith("## ")) {
      flush();
      B.push({ t: "h2", text: t.slice(3) });
      continue;
    }
    if (t.startsWith(">> ")) {
      flush();
      B.push({ t: "quote", text: t.slice(3) });
      continue;
    }
    if (t.startsWith("^^ ")) {
      flush();
      B.push({ t: "lead", text: t.slice(3) });
      continue;
    }
    if (/^[-•*]\s+/.test(t)) {
      const item = t.replace(/^[-•*]\s+/, "");
      const m = item.match(/^([^—:]{2,48})\s*[—:]\s+(.*)$/);
      pendingList.push(m ? { lead: m[1].trim(), text: m[2].trim() } : { text: item });
      continue;
    }
    flush();
    // A short standalone line that ends without punctuation reads as a kicker.
    B.push({ t: "p", text: t });
  }
  flush();

  B.push(...attribution(`/posts/${p.slug}`));
  return doc(B);
}

/** Backwards-compatible plain-text form. */
export const buildPostPulse = (p: PulsePost): string => buildPostPulseDoc(p).text;

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
