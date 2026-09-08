// Taxonomy for the News Feed: layer categories (/live/layer/:slug) and
// topic tags (/live/topic/:slug). Both are derived from the article rows so
// the landing pages, the prerenderer, and the sitemap stay in sync.

import { LAYERS } from "@/data/layers";

export interface TaxonomyArticle {
  slug: string;
  vertical?: string | null;
  analysis?: {
    cube_position?: { layers?: string[]; functions?: string[]; verticals?: string[] };
  } | null;
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export interface LayerCategory {
  id: string;          // "L1"
  slug: string;        // "l1-data"
  short: string;       // "Data"
  name: string;        // "Data"
  desc: string;
}

export const LAYER_CATEGORIES: LayerCategory[] = LAYERS.map((l) => ({
  id: l.id,
  slug: `${l.id.toLowerCase()}-${slugify(l.shortName)}`,
  short: l.shortName,
  name: l.name,
  desc: l.desc,
}));

export const layerCategoryBySlug = (slug?: string) =>
  LAYER_CATEGORIES.find((c) => c.slug === slug) ?? null;

const normLayer = (s: string) => s.trim().toUpperCase();

/** Layers a single article touches, as canonical layer ids (L-1 … L8). */
export function articleLayerIds(a: TaxonomyArticle): string[] {
  const raw = a.analysis?.cube_position?.layers ?? [];
  const ids = new Set<string>();
  for (const r of raw) {
    const n = normLayer(r);
    const hit = LAYER_CATEGORIES.find((c) => c.id.toUpperCase() === n);
    if (hit) ids.add(hit.id);
  }
  return [...ids];
}

export function articlesInLayer<T extends TaxonomyArticle>(articles: T[], layerId: string): T[] {
  return articles.filter((a) => articleLayerIds(a).includes(layerId));
}

/** Topic tags an article carries: its vertical plus cube verticals and functions. */
export function articleTopics(a: TaxonomyArticle): { slug: string; label: string }[] {
  const cube = a.analysis?.cube_position ?? {};
  const raw = [a.vertical ?? "", ...(cube.verticals ?? []), ...(cube.functions ?? [])];
  const out = new Map<string, string>();
  for (const r of raw) {
    const label = (r ?? "").trim();
    if (!label || label.length > 48) continue;
    const s = slugify(label);
    if (!s) continue;
    if (!out.has(s)) out.set(s, label);
  }
  return [...out].map(([slug, label]) => ({ slug, label }));
}

export interface TopicTag {
  slug: string;
  label: string;
  count: number;
}

/** All topic tags across the feed, most-covered first. Tags with a single
 *  story are excluded so we don't ship thin, near-duplicate landing pages. */
export function topicTags(articles: TaxonomyArticle[], minCount = 2): TopicTag[] {
  const map = new Map<string, TopicTag>();
  for (const a of articles) {
    for (const t of articleTopics(a)) {
      const cur = map.get(t.slug);
      if (cur) cur.count += 1;
      else map.set(t.slug, { slug: t.slug, label: t.label, count: 1 });
    }
  }
  return [...map.values()]
    .filter((t) => t.count >= minCount)
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function articlesInTopic<T extends TaxonomyArticle>(articles: T[], topicSlug: string): T[] {
  return articles.filter((a) => articleTopics(a).some((t) => t.slug === topicSlug));
}

export const titleCase = (s: string) =>
  s.replace(/\b[a-z]/g, (c) => c.toUpperCase());

export const layerCategoryPath = (slug: string) => `/live/layer/${slug}`;
export const topicPath = (slug: string) => `/live/topic/${slug}`;
