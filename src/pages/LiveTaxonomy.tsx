import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Layers, Tag } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import NewsletterCTA from "@/components/NewsletterCTA";
import NotFound from "@/pages/NotFound";
import { supabase } from "@/integrations/supabase/client";
import { getPrerenderedLiveArticles } from "@/lib/liveArticleCache";
import { verdictLabel } from "@/data/verdictLabels";
import { layerVar } from "@/data/layers";
import {
  LAYER_CATEGORIES,
  articlesInLayer,
  articlesInTopic,
  layerCategoryBySlug,
  layerCategoryPath,
  titleCase,
  topicPath,
  topicTags,
  type TaxonomyArticle,
} from "@/lib/newsTaxonomy";

interface Article extends TaxonomyArticle {
  id: string;
  headline: string;
  subheadline: string | null;
  news_summary: string;
  verdict: string;
  published_at: string;
}

const SELECT =
  "id, slug, headline, subheadline, news_summary, verdict, vertical, published_at, analysis";

const LiveTaxonomy = ({ kind }: { kind: "layer" | "topic" }) => {
  const { slug } = useParams<{ slug: string }>();
  const prerendered = getPrerenderedLiveArticles<Article>();
  const [articles, setArticles] = useState<Article[]>(prerendered ?? []);
  const [loading, setLoading] = useState(!prerendered);

  useEffect(() => {
    if (prerendered) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("live_articles")
        .select(SELECT)
        .eq("status", "published")
        .order("published_at", { ascending: false });
      if (cancelled) return;
      setArticles((data ?? []) as unknown as Article[]);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [prerendered]);

  const layer = kind === "layer" ? layerCategoryBySlug(slug) : null;
  const allTags = useMemo(() => topicTags(articles), [articles]);
  const topicLabel = useMemo(() => {
    if (kind !== "topic" || !slug) return "";
    const known = allTags.find((t) => t.slug === slug);
    return known ? known.label : titleCase(slug.replace(/-/g, " "));
  }, [kind, slug, allTags]);

  const matches = useMemo(() => {
    if (kind === "layer") return layer ? articlesInLayer(articles, layer.id) : [];
    return slug ? articlesInTopic(articles, slug) : [];
  }, [kind, layer, slug, articles]);

  if (kind === "layer" && !layer) return <NotFound />;

  const label = kind === "layer" ? `${layer!.id} ${layer!.short}` : titleCase(topicLabel);
  const path = kind === "layer" ? layerCategoryPath(slug!) : topicPath(slug!);

  const title =
    kind === "layer"
      ? `${label} AI News: Every Move at Layer ${layer!.id} of the AI Stack`
      : `${label} AI News and Analysis, Scored by Layer`;

  const description =
    kind === "layer"
      ? `Every AI launch, funding round, and structural shift that lands on ${layer!.id} ${layer!.short} of the generative AI stack (not logistics) — ${layer!.desc.slice(0, 110)} Each story scored on the 10-layer Supply Chain of Intelligence™.`
      : `AI news and analysis tagged ${label}: launches, funding, and competitive shifts in the generative AI stack (not logistics), each scored across the 10 layers of the Supply Chain of Intelligence™.`;

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: `https://supplychainofai.com${path}`,
    isPartOf: {
      "@type": "WebSite",
      name: "Supply Chain of Intelligence™",
      url: "https://supplychainofai.com",
    },
    about: { "@type": "Thing", name: label },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: matches.length,
      itemListElement: matches.slice(0, 30).map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://supplychainofai.com/live/${a.slug}`,
        name: a.headline,
      })),
    },
  };

  return (
    <SiteLayout>
      <Seo
        title={title}
        description={description}
        path={path}
        keywords={[
          label,
          "AI news",
          "generative AI stack",
          "Supply Chain of Intelligence",
          "AI strategy analysis",
        ]}
        jsonLd={[collectionLd]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "News Feed", path: "/live" },
          ...(kind === "layer"
            ? [{ name: "Layers", path: "/live" }]
            : [{ name: "Topics", path: "/live" }]),
          { name: label, path },
        ]}
      />

      <section className="bg-background">
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-12">
          <div className="flex items-center gap-2 mb-6">
            {kind === "layer" ? <Layers size={16} className="text-accent" /> : <Tag size={16} className="text-accent" />}
            <Eyebrow>{kind === "layer" ? "News by layer" : "News by topic"}</Eyebrow>
          </div>
          <h1 className="font-display text-4xl md:text-[52px] font-bold text-foreground leading-[1.05] mb-6">
            {kind === "layer" ? (
              <>
                <span style={{ color: `hsl(var(${layerVar(layer!.id)}))` }}>{layer!.id}</span>{" "}
                {layer!.name} — AI news at this layer
              </>
            ) : (
              <>{label} — AI news and analysis</>
            )}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-4">
            {kind === "layer"
              ? layer!.desc
              : `Every story in the feed that touches ${label}, read through the 10-layer Supply Chain of Intelligence™.`}
          </p>
          <p className="font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground">
            {matches.length} {matches.length === 1 ? "story" : "stories"} ·{" "}
            <Link to="/live" className="text-accent hover:underline">Back to the News Feed</Link>
            {kind === "layer" && (
              <>
                {" "}·{" "}
                <Link to={`/framework/${layer!.slug}`} className="text-accent hover:underline">
                  What {layer!.id} is
                </Link>
              </>
            )}
          </p>
        </div>
      </section>

      <section className="bg-secondary/30 border-y border-foreground/10">
        <div className="max-w-5xl mx-auto px-6 py-14">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-muted-foreground">
              <Loader2 className="animate-spin mr-2" size={18} /> Loading stories…
            </div>
          ) : matches.length === 0 ? (
            <p className="text-muted-foreground py-10">
              No stories filed here yet. <Link to="/live" className="text-accent hover:underline">Read the full feed</Link>.
            </p>
          ) : (
            <div className="space-y-5">
              {matches.map((a, i) => (
                <motion.article
                  key={a.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i, 8) * 0.03 }}
                >
                  <Link
                    to={`/live/${a.slug}`}
                    className="block bg-card border border-foreground/10 hover:border-accent transition-all p-6 md:p-8 group"
                  >
                    <div className="flex items-center gap-3 mb-3 flex-wrap font-mono-marker text-[10px] text-muted-foreground">
                      <span>
                        {new Date(a.published_at).toLocaleDateString("en-US", {
                          year: "numeric", month: "short", day: "numeric",
                        })}
                      </span>
                      <span className="border border-foreground/20 px-2 py-0.5 text-foreground/70">
                        {verdictLabel(a.verdict)}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl md:text-[28px] font-bold text-foreground leading-tight mb-3 group-hover:text-accent transition-colors">
                      {a.headline}
                    </h2>
                    {a.subheadline && <p className="text-foreground/80 mb-3 italic">{a.subheadline}</p>}
                    <p className="text-muted-foreground leading-relaxed line-clamp-2">{a.news_summary}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-accent font-mono-marker text-[11px]">
                      Read analysis <ArrowRight size={12} />
                    </span>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cross-links: keeps every category one click apart and crawlable */}
      <section className="bg-background border-b border-foreground/10">
        <div className="max-w-5xl mx-auto px-6 py-14 space-y-10">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Browse news by layer</h2>
            <div className="flex flex-wrap gap-2">
              {LAYER_CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  to={layerCategoryPath(c.slug)}
                  className={`font-mono-marker text-[11px] border px-2.5 py-1.5 transition-colors ${
                    kind === "layer" && c.slug === slug
                      ? "bg-foreground text-background border-foreground"
                      : "border-foreground/20 text-muted-foreground hover:border-accent hover:text-accent"
                  }`}
                >
                  {c.id} {c.short}
                </Link>
              ))}
            </div>
          </div>
          {allTags.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Browse news by topic</h2>
              <div className="flex flex-wrap gap-2">
                {allTags.map((t) => (
                  <Link
                    key={t.slug}
                    to={topicPath(t.slug)}
                    className={`font-mono-marker text-[11px] border px-2.5 py-1.5 transition-colors ${
                      kind === "topic" && t.slug === slug
                        ? "bg-foreground text-background border-foreground"
                        : "border-foreground/20 text-muted-foreground hover:border-accent hover:text-accent"
                    }`}
                  >
                    {titleCase(t.label)} <span className="opacity-60">{t.count}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-background">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <NewsletterCTA source={`live-${kind}`} />
        </div>
      </section>
    </SiteLayout>
  );
};

export default LiveTaxonomy;
