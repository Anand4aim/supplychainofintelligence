// Build-time cache of live_articles rows.
//
// scripts/prerender.ts fetches every published article before rendering and
// stashes them on globalThis under this key. LiveArticleDetail reads the row
// synchronously during the SSR pass so the prerendered HTML carries the real
// headline, body, and per-article <Seo> tags instead of a loading spinner.
// In the browser the map is empty and the component falls back to its fetch.

export const LIVE_ARTICLE_CACHE_KEY = "__SCOI_LIVE_ARTICLES__";

export function getPrerenderedLiveArticle<T>(slug: string | undefined): T | null {
  if (!slug) return null;
  const store = (globalThis as Record<string, unknown>)[LIVE_ARTICLE_CACHE_KEY] as
    | Record<string, unknown>
    | undefined;
  if (!store) return null;
  return (store[slug] as T) ?? null;
}

export const LIVE_ARTICLE_LIST_KEY = "__SCOI_LIVE_ARTICLE_LIST__";

/** Ordered (newest first) list of published articles, available during prerender only. */
export function getPrerenderedLiveArticles<T>(): T[] | null {
  const list = (globalThis as Record<string, unknown>)[LIVE_ARTICLE_LIST_KEY];
  return Array.isArray(list) ? (list as T[]) : null;
}
