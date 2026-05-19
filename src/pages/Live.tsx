import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Rss, FileText } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import NewsletterCTA from "@/components/NewsletterCTA";
import { supabase } from "@/integrations/supabase/client";
import { LAYER_SHORT_LABEL, layerVar } from "@/data/layers";
import Eyebrow from "@/components/Eyebrow";

interface LiveArticle {
  id: string;
  slug: string;
  headline: string;
  subheadline: string | null;
  news_summary: string;
  verdict: string;
  vertical: string | null;
  published_at: string;
  source_urls: string[] | null;
  analysis: { cube_position?: { layers?: string[]; functions?: string[]; verticals?: string[] } } | null;
}

const LAYER_ORDER = ["L-1", "L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"];

const FeaturedLayerStrip: React.FC<{ layers: string[]; functions?: string[]; verticals?: string[] }> = ({ layers, functions = [], verticals = [] }) => {
  const norm = (s: string) => s.trim().toLowerCase();
  const hitSet = new Set(layers.map(norm));
  return (
    <div className="border border-foreground/15 bg-background/60 backdrop-blur-sm p-4 md:p-5 rounded-sm">
      <div className="flex items-center justify-between mb-3 gap-3">
        <p className="font-mono-marker text-[10px] uppercase tracking-[0.18em] text-foreground/70">
          Layer footprint
        </p>
        <p className="font-mono-marker text-[10px] text-foreground/50">
          {layers.length}/10 layers touched
        </p>
      </div>
      <div className="grid grid-cols-10 gap-1 mb-3">
        {LAYER_ORDER.map((id) => {
          const hit = hitSet.has(id.toLowerCase());
          const cssVar = layerVar(id);
          return (
            <div key={id} className="flex flex-col items-center gap-1">
              <div
                className="w-full rounded-[3px] transition-all"
                style={{
                  height: 38,
                  background: hit ? `hsl(var(${cssVar}) / 0.85)` : `hsl(var(${cssVar}) / 0.08)`,
                  border: hit ? `1px solid hsl(var(${cssVar}))` : `1px solid hsl(var(${cssVar}) / 0.18)`,
                  boxShadow: hit ? `0 2px 10px -3px hsl(var(${cssVar}) / 0.6)` : "none",
                }}
                title={`${id} ${LAYER_SHORT_LABEL[id] ?? ""}${hit ? " — touched" : ""}`}
              />
              <span
                className="font-mono-marker text-[8px] leading-none"
                style={{
                  color: hit ? `hsl(var(${cssVar}))` : "hsl(var(--foreground) / 0.4)",
                  fontWeight: hit ? 700 : 400,
                }}
              >
                {id}
              </span>
            </div>
          );
        })}
      </div>
      {(verticals.length > 0 || functions.length > 0) && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-3 border-t border-foreground/10">
          {verticals.length > 0 && (
            <div className="flex items-baseline gap-2">
              <span className="font-mono-marker text-[9px] uppercase tracking-wider text-foreground/50">Verticals</span>
              <span className="font-mono-marker text-[10px] text-foreground/80">{verticals.join(" · ")}</span>
            </div>
          )}
          {functions.length > 0 && (
            <div className="flex items-baseline gap-2">
              <span className="font-mono-marker text-[9px] uppercase tracking-wider text-foreground/50">Functions</span>
              <span className="font-mono-marker text-[10px] text-foreground/80">{functions.join(" · ")}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const RSS_URL = "https://pjococttuifybrwsxscy.supabase.co/functions/v1/rss-feed";

const verdictTone = (v: string) => {
  switch (v) {
    case "DEAD": return "text-[hsl(var(--verdict-exposed))] border-[hsl(var(--verdict-exposed))]";
    case "CONTESTED": return "text-[hsl(var(--verdict-consolidating))] border-[hsl(var(--verdict-consolidating))]";
    case "SAFE": return "text-[hsl(var(--verdict-fortified))] border-[hsl(var(--verdict-fortified))]";
    case "DOMINANT": return "text-[hsl(var(--verdict-dominant))] border-[hsl(var(--verdict-dominant))]";
    default: return "text-foreground border-foreground/30";
  }
};

// ISO week number
const weekKey = (d: Date) => {
  const target = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNr = (target.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNr + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const diff = (target.getTime() - firstThursday.getTime()) / 86400000;
  const week = 1 + Math.round((diff - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  return { year: target.getUTCFullYear(), week };
};
const weekLabel = (d: Date) => {
  const { year, week } = weekKey(d);
  // Start (Monday) of that week
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const dayNr = (jan4.getUTCDay() + 6) % 7;
  const monday = new Date(jan4);
  monday.setUTCDate(jan4.getUTCDate() - dayNr + (week - 1) * 7);
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  const fmt = (x: Date) => x.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  return `Week of ${fmt(monday)}–${fmt(sunday)}, ${year}`;
};

// Outlet name from URL
const KNOWN_OUTLETS: Record<string, string> = {
  "reuters.com": "Reuters",
  "bloomberg.com": "Bloomberg",
  "nytimes.com": "NY Times",
  "wsj.com": "WSJ",
  "ft.com": "FT",
  "techcrunch.com": "TechCrunch",
  "theverge.com": "The Verge",
  "theinformation.com": "The Information",
  "axios.com": "Axios",
  "cnbc.com": "CNBC",
  "wired.com": "Wired",
  "arstechnica.com": "Ars Technica",
  "businessinsider.com": "Business Insider",
  "forbes.com": "Forbes",
  "venturebeat.com": "VentureBeat",
  "theguardian.com": "Guardian",
  "bbc.com": "BBC",
  "bbc.co.uk": "BBC",
  "openai.com": "OpenAI",
  "anthropic.com": "Anthropic",
  "deepmind.google": "DeepMind",
  "blog.google": "Google",
  "microsoft.com": "Microsoft",
  "meta.com": "Meta",
  "about.fb.com": "Meta",
  "huggingface.co": "Hugging Face",
};
const outletFromUrl = (u: string): string => {
  try {
    const host = new URL(u).hostname.replace(/^www\./, "");
    if (KNOWN_OUTLETS[host]) return KNOWN_OUTLETS[host];
    const parts = host.split(".");
    const base = parts.length >= 2 ? parts[parts.length - 2] : host;
    return base.charAt(0).toUpperCase() + base.slice(1);
  } catch {
    return "Source";
  }
};
const summarizeSources = (urls: string[] | null | undefined): { count: number; outlets: string[] } => {
  const list = (urls ?? []).filter(Boolean);
  const outlets: string[] = [];
  for (const u of list) {
    const o = outletFromUrl(u);
    if (!outlets.includes(o)) outlets.push(o);
    if (outlets.length === 3) break;
  }
  return { count: list.length, outlets };
};

const LivePage = () => {
  const [articles, setArticles] = useState<LiveArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase
      .from("live_articles")
      .select("id, slug, headline, subheadline, news_summary, verdict, vertical, published_at, source_urls, analysis")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    setArticles((data ?? []) as LiveArticle[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  // Group by ISO week
  const grouped = useMemo(() => {
    const groups: { key: string; label: string; issueNum: number; items: LiveArticle[] }[] = [];
    const totalCount = articles.length;
    const map = new Map<string, { label: string; items: LiveArticle[] }>();
    articles.forEach((a) => {
      const d = new Date(a.published_at);
      const { year, week } = weekKey(d);
      const key = `${year}-W${String(week).padStart(2, "0")}`;
      if (!map.has(key)) map.set(key, { label: weekLabel(d), items: [] });
      map.get(key)!.items.push(a);
    });
    // Sort keys desc (most recent first)
    const sortedKeys = [...map.keys()].sort().reverse();
    sortedKeys.forEach((key, idx) => {
      const g = map.get(key)!;
      // Issue # counts down: most recent group = highest issue
      groups.push({ key, label: g.label, issueNum: sortedKeys.length - idx, items: g.items });
    });
    void totalCount;
    return groups;
  }, [articles]);

  return (
    <SiteLayout>
      <Seo
        title="The Live Feed — Every Important AI Move, Tracked & Scored"
        description="Always-on analysis of every consequential AI launch, funding round, and structural shift — scored on the Supply Chain of Intelligence™ 10-layer framework."
        path="/live"
      />

      <section className="bg-background">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-6">
              <Rss size={16} className="text-accent" />
              <Eyebrow>The Live Feed</Eyebrow>
            </div>
            <h1 className="font-display text-4xl md:text-[52px] font-bold text-foreground leading-[1.05] mb-6">
              Every important AI move — <br />watched, tracked, analyzed, and scored.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-3">
              An always-on read of the AI market — every consequential launch, funding round, and structural shift run through the
              Supply Chain of Intelligence™ framework, the four laws, and the vertical lens that matters.
            </p>
            <p className="text-sm text-muted-foreground/80 italic mb-6">
              New analysis published as the news breaks · Weekly issue cadence · Free to read, copy, and repost anywhere.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={RSS_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground border border-foreground/20 rounded-md px-3 py-1.5 hover:bg-foreground hover:text-background transition-colors"
              >
                <Rss size={13} /> RSS feed
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary/30 border-y border-foreground/10">
        <div className="max-w-5xl mx-auto px-6 py-16">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="animate-spin mr-2" size={18} /> Loading the feed…
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No articles yet — the first edition publishes Monday.</p>
            </div>
          ) : (
            <>

              <div className="space-y-12">
                {grouped.map((group, gIdx) => (
                  <div key={group.key}>
                    {/* Week header */}
                    <div className="flex items-baseline justify-between gap-4 mb-4 pb-3 border-b border-foreground/10">
                      <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                        {group.label}
                      </h2>
                      <p className="font-mono-marker text-[10px] uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                        Issue #{group.issueNum} · {group.items.length} {group.items.length === 1 ? "piece" : "pieces"}
                      </p>
                    </div>

                    <div className="space-y-5">
                      {group.items.map((a, i) => {
                        const src = summarizeSources(a.source_urls);
                        const isFeatured = gIdx === 0 && i === 0;

                        if (isFeatured) {
                          return (
                            <motion.div
                              key={a.id}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              <Link
                                to={`/live/${a.slug}`}
                                className="block group relative overflow-hidden border border-foreground/15 bg-gradient-to-br from-card via-card to-secondary/40 hover:border-accent transition-all"
                              >
                                {/* Color rail */}
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent" />
                                <div className="p-8 md:p-12">
                                  <div className="flex items-center gap-2 mb-5">
                                    <span className="font-mono-marker text-[10px] uppercase tracking-[0.18em] text-accent">
                                      ◆ Latest Issue
                                    </span>
                                    <span className="font-mono-marker text-[10px] text-muted-foreground">
                                      · {new Date(a.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-3 mb-5 flex-wrap">
                                    {a.vertical && (
                                      <span className="font-mono-marker text-[10px] text-foreground/70 border border-foreground/25 px-2 py-0.5">
                                        {a.vertical.toUpperCase()}
                                      </span>
                                    )}
                                    <span className={`font-mono-marker text-[11px] font-bold border px-2.5 py-1 ${verdictTone(a.verdict)}`}>
                                      {a.verdict}
                                    </span>
                                    {src.count > 0 && (
                                      <span className="font-mono-marker text-[10px] text-foreground/55 inline-flex items-center gap-1">
                                        <FileText size={10} />
                                        {src.count} {src.count === 1 ? "source" : "sources"}
                                        {src.outlets.length > 0 && ` · ${src.outlets.join(", ")}`}
                                      </span>
                                    )}
                                  </div>

                                  <h3 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5 group-hover:text-accent transition-colors max-w-3xl">
                                    {a.headline}
                                  </h3>
                                  {a.subheadline && (
                                    <p className="text-lg md:text-xl text-foreground/85 mb-6 italic leading-snug max-w-2xl">
                                      {a.subheadline}
                                    </p>
                                  )}
                                  <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-6">
                                    {a.news_summary}
                                  </p>

                                  {a.analysis?.cube_position?.layers && a.analysis.cube_position.layers.length > 0 && (
                                    <div className="mb-8 max-w-3xl">
                                      <FeaturedLayerStrip
                                        layers={a.analysis.cube_position.layers}
                                        functions={a.analysis.cube_position.functions ?? []}
                                        verticals={a.analysis.cube_position.verticals ?? []}
                                      />
                                    </div>
                                  )}

                                  <div className="inline-flex items-center gap-2 text-accent font-mono-marker text-[12px] font-bold border-b border-accent/50 group-hover:gap-3 transition-all">
                                    Read the full teardown <ArrowRight size={13} />
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          );
                        }

                        return (
                          <motion.div
                            key={a.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                          >
                            <Link
                              to={`/live/${a.slug}`}
                              className="block bg-card border border-foreground/10 hover:border-accent transition-all p-6 md:p-8 group"
                            >
                              <div className="flex items-center gap-3 mb-3 flex-wrap">
                                <span className="font-mono-marker text-[10px] text-muted-foreground">
                                  {new Date(a.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                </span>
                                {a.vertical && (
                                  <span className="font-mono-marker text-[10px] text-foreground/60 border border-foreground/20 px-2 py-0.5">
                                    {a.vertical.toUpperCase()}
                                  </span>
                                )}
                                <span className={`font-mono-marker text-[10px] border px-2 py-0.5 ${verdictTone(a.verdict)}`}>
                                  {a.verdict}
                                </span>
                                {src.count > 0 && (
                                  <span className="font-mono-marker text-[10px] text-foreground/55 inline-flex items-center gap-1">
                                    <FileText size={10} />
                                    {src.count} {src.count === 1 ? "source" : "sources"}
                                    {src.outlets.length > 0 && ` · ${src.outlets.join(", ")}`}
                                  </span>
                                )}
                              </div>
                              <h3 className="font-display text-2xl md:text-[28px] font-bold text-foreground leading-tight mb-3 group-hover:text-accent transition-colors">
                                {a.headline}
                              </h3>
                              {a.subheadline && (
                                <p className="text-foreground/80 mb-3 italic">{a.subheadline}</p>
                              )}
                              <p className="text-muted-foreground leading-relaxed line-clamp-2">{a.news_summary}</p>
                              <div className="mt-5 inline-flex items-center gap-1.5 text-accent font-mono-marker text-[11px]">
                                Read analysis <ArrowRight size={12} />
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ═══════════ INBOX CAPTURE — LAST ═══════════ */}
      {!loading && articles.length > 0 && (
        <section className="bg-background border-t border-foreground/10">
          <div className="max-w-3xl mx-auto px-6 py-20">
            <NewsletterCTA source="live-bottom" />
          </div>
        </section>
      )}
    </SiteLayout>
  );
};

export default LivePage;
