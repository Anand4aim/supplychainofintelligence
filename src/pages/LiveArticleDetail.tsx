import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";
import SublayerImpactMap from "@/components/live/SublayerImpactMap";
import CubeProjection2D from "@/components/live/CubeProjection2D";
import ExportablePng from "@/components/ExportablePng";
import WhatThisMeans from "@/components/WhatThisMeans";
import ArticleFooterCTA from "@/components/ArticleFooterCTA";
import { LAYER_LABEL, LAYER_SHORT_LABEL } from "@/data/layers";
import { verdictLabel } from "@/data/verdictLabels";
import Eyebrow from "@/components/Eyebrow";


type SubLayer = string | { name: string; impact?: number; who?: string };
interface LayerScore { layer: string; owned: boolean; intensity?: number; note: string; sublayers?: SubLayer[]; }
interface CubePosition { functions?: string[]; verticals?: string[]; layers?: string[]; }

interface LiveArticle {
  id: string;
  slug: string;
  headline: string;
  subheadline: string | null;
  news_summary: string;
  source_urls: string[];
  verdict: string;
  vertical: string | null;
  linkedin_post: string;
  published_at: string;
  analysis: {
    layer_scores: LayerScore[];
    cube_position?: CubePosition;
    why_now?: string;
    structural_take: string;
    second_order_effects?: string;
    who_wins?: { name: string; reason: string }[];
    who_loses?: { name: string; reason: string }[];
    vertical_lens: string;
    deep_product_lens?: string;
    deep_strategy_lens?: string;
    counter_thesis?: string;
    what_to_watch?: string[];
    new_law_candidate: string;
    for_you?: {
      product_leader?: string;
      investor?: string;
      operator?: string;
    };
  };
}

const LAYER_ORDER = ["L-1","L0","L1","L2","L3","L4","L5","L6","L7","L8"];
const layerVar = (l: string) => {
  const key = l === "L-1" ? "neg1" : l.replace("L", "");
  return `--layer-${key}`;
};

const verdictTone = (v: string) => {
  switch (v) {
    case "DEAD": return "bg-[hsl(var(--verdict-exposed))] text-white";
    case "CONTESTED": return "bg-[hsl(var(--verdict-consolidating))] text-white";
    case "SAFE": return "bg-[hsl(var(--verdict-fortified))] text-white";
    case "DOMINANT": return "bg-[hsl(var(--verdict-dominant))] text-white";
    default: return "bg-foreground text-background";
  }
};




const LiveArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<LiveArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data } = await supabase.from("live_articles").select("*").eq("slug", slug).maybeSingle();
      setArticle(data ? (data as unknown as LiveArticle) : null);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return <SiteLayout><div className="max-w-3xl mx-auto py-32 text-center text-muted-foreground"><Loader2 className="animate-spin inline mr-2" size={18}/>Loading…</div></SiteLayout>;
  }
  if (!article) {
    return <SiteLayout><div className="max-w-3xl mx-auto py-32 text-center"><p className="text-muted-foreground mb-4">Article not found.</p><Link to="/live" className="text-accent underline">Back to the feed</Link></div></SiteLayout>;
  }

  const scoreMap = new Map(article.analysis.layer_scores.map(s => [s.layer, s]));

  return (
    <SiteLayout>
      <Seo
        title={`${article.headline}, Live Analysis`}
        description={article.subheadline ?? article.news_summary.slice(0, 155)}
        path={`/live/${article.slug}`}
        article
        datePublished={article.published_at}
      />

      <article className="bg-background">
        <div className="max-w-3xl mx-auto px-6 pt-12 pb-20">
          <Link to="/live" className="inline-flex items-center gap-1.5 font-mono-marker text-[11px] text-muted-foreground hover:text-accent mb-8">
            <ArrowLeft size={12}/> Back to feed
          </Link>

          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className="font-mono-marker text-[10px] text-muted-foreground">
              {new Date(article.published_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}
            </span>
            {article.vertical && (
              <span className="font-mono-marker text-[10px] text-foreground/60 border border-foreground/20 px-2 py-0.5">
                {article.vertical.toUpperCase()}
              </span>
            )}
            <span className={`font-mono-marker text-[10px] px-2 py-0.5 ${verdictTone(article.verdict)}`}>
              {verdictLabel(article.verdict)}
            </span>
          </div>

          <motion.h1
            initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
            className="font-display text-3xl md:text-[44px] font-bold text-foreground leading-[1.1] mb-4"
          >
            {article.headline}
          </motion.h1>
          {article.subheadline && (
            <p className="text-xl text-foreground/80 italic mb-10 leading-relaxed">{article.subheadline}</p>
          )}

          {/* The news */}
          <section className="mb-12">
            <Eyebrow className="mb-3">The News</Eyebrow>
            <p className="text-foreground leading-relaxed text-[17px]">{article.news_summary}</p>
            {article.source_urls?.length > 0 && (
              <div className="mt-4 space-y-1">
                {article.source_urls.map((u, i) => (
                  <a key={i} href={u} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent break-all">
                    <ExternalLink size={11}/> {u}
                  </a>
                ))}
              </div>
            )}
          </section>

          {/* Layer scoring, chip + dot intensity matrix */}
          <section className="mb-12">
            <Eyebrow className="mb-4">Layer Scoring</Eyebrow>

            <ExportablePng
              fileName={`${article.slug}-layer-scoring`}
              caption={`${article.headline}, Layer Scoring`}
              exportBackground="hsl(40 30% 97%)"
            >
            <div
              className="p-5 md:p-6"
              style={{
                background: "linear-gradient(145deg, hsl(40 30% 97%) 0%, hsl(38 28% 95%) 60%, hsl(40 30% 96%) 100%)",
                border: "1px solid hsl(35 20% 88%)",
              }}
            >
              {/* Chip header row, canonical "L# Short" */}
              <div className="grid grid-cols-10 gap-1.5 mb-3">
                {LAYER_ORDER.map((layer) => (
                  <div
                    key={layer}
                    className="text-center font-mono-marker text-[10px] font-bold py-1.5 px-0.5 rounded-sm text-white leading-[1.15]"
                    style={{ background: `hsl(var(${layerVar(layer)}))` }}
                    title={LAYER_LABEL[layer]}
                  >
                    <div>{layer}</div>
                    <div className="text-[9px] opacity-95 mt-0.5">{LAYER_SHORT_LABEL[layer]}</div>
                  </div>
                ))}
              </div>

              {/* Dot intensity row */}
              <div className="grid grid-cols-10 gap-1.5">
                {LAYER_ORDER.map((layer) => {
                  const s = scoreMap.get(layer);
                  const intensity = s?.intensity ?? (s?.owned ? 2 : 0);
                  return (
                    <div key={layer} className="flex justify-center items-center gap-[3px] h-7">
                      {[1, 2, 3].map((d) => (
                        <span
                          key={d}
                          className="rounded-full"
                          style={{
                            width: 7,
                            height: 7,
                            background: d <= intensity ? `hsl(var(${layerVar(layer)}))` : "transparent",
                            border: d <= intensity ? "none" : "1px solid hsl(var(--foreground) / 0.12)",
                          }}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>

              {/* Sublayer stack, tiles stacked under each layer column in lighter shades */}
              <div className="grid grid-cols-10 gap-1.5 mt-1.5 pb-4 border-b border-foreground/10 items-start">
                {LAYER_ORDER.map((layer) => {
                  const s = scoreMap.get(layer);
                  const subs = s?.sublayers ?? [];
                  return (
                    <div key={layer} className="flex flex-col gap-1">
                      {subs.map((sub, i) => {
                        const name = typeof sub === "string" ? sub : sub.name;
                        const alpha = Math.max(0.08, 0.22 - i * 0.05);
                        return (
                          <div
                            key={i}
                            className="text-center font-mono-marker text-[9px] leading-tight px-1 py-1 rounded-sm break-words"
                            style={{
                              background: `hsl(var(${layerVar(layer)}) / ${alpha})`,
                              color: `hsl(var(${layerVar(layer)}))`,
                              border: `1px solid hsl(var(${layerVar(layer)}) / 0.18)`,
                              minHeight: 22,
                            }}
                            title={name}
                          >
                            {name}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Per-layer notes (sublayers shown in matrix above) */}
              <div className="mt-4 space-y-2.5">
                {LAYER_ORDER.map((layer) => {
                  const s = scoreMap.get(layer);
                  const intensity = s?.intensity ?? (s?.owned ? 2 : 0);
                  if (intensity === 0) return null;
                  return (
                    <div key={layer} className="flex gap-3 items-start">
                      <span
                        className="font-mono-marker text-[10px] font-bold text-white px-2 py-0.5 text-center shrink-0 mt-0.5 whitespace-nowrap"
                        style={{ background: `hsl(var(${layerVar(layer)}))` }}
                      >
                        {layer} {LAYER_SHORT_LABEL[layer]}
                      </span>
                      <div className="flex-1 text-[14px] leading-snug text-foreground">
                        {s?.note}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-foreground/10 font-mono-marker text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="flex gap-[3px]">{[1, 2, 3].map((d) => <span key={d} className="w-1.5 h-1.5 rounded-full bg-foreground/70" />)}</span> Core
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="flex gap-[3px]"><span className="w-1.5 h-1.5 rounded-full bg-foreground/70" /><span className="w-1.5 h-1.5 rounded-full bg-foreground/70" /></span> Significant
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground/70" /> Emerging
                </span>
                <span>Empty = no presence</span>
              </div>
            </div>
            </ExportablePng>
          </section>

          {/* Sublayer impact map, what specifically is touched and by what magnitude */}
          {article.analysis.layer_scores.some(s => (s.intensity ?? 0) > 0 && (s.sublayers?.length ?? 0) > 0) && (
            <section className="mb-12">
              <Eyebrow className="mb-2">Sublayer Impact Map</Eyebrow>
              <p className="text-foreground/70 text-[14px] mb-4 italic">
                Which of the 50 sublayers this move actually touches, the magnitude of impact, and who plays that slice today.
              </p>
              <SublayerImpactMap layerScores={article.analysis.layer_scores} />
            </section>
          )}

          {/* Intelligence Cube, 2D projection */}
          {article.analysis.cube_position && (
            <section className="mb-12">
              <Eyebrow className="mb-2">Intelligence Cube · 2D</Eyebrow>
              <p className="text-foreground/70 text-[14px] mb-4 italic">
                The move's footprint across the three Cube axes, Functions, Verticals, Layers, flattened into two readable 2D projections.
              </p>
              <CubeProjection2D
                functions={article.analysis.cube_position.functions}
                verticals={article.analysis.cube_position.verticals}
                layers={article.analysis.cube_position.layers}
              />
            </section>
          )}

          {/* Why now */}
          {article.analysis.why_now && (
            <section className="mb-12">
              <Eyebrow className="mb-3">Why Now</Eyebrow>
              <p className="text-foreground leading-relaxed text-[17px] whitespace-pre-line">{article.analysis.why_now}</p>
            </section>
          )}

          {/* Structural take */}
          <section className="mb-12">
            <Eyebrow className="mb-3">The Structural Take</Eyebrow>
            <p className="text-foreground leading-relaxed text-[17px] whitespace-pre-line">{article.analysis.structural_take}</p>
          </section>

          {/* Second order */}
          {article.analysis.second_order_effects && (
            <section className="mb-12">
              <Eyebrow className="mb-3">Second-Order Effects</Eyebrow>
              <p className="text-foreground leading-relaxed text-[17px] whitespace-pre-line">{article.analysis.second_order_effects}</p>
            </section>
          )}

          {/* Winners & losers */}
          {((article.analysis.who_wins?.length ?? 0) > 0 || (article.analysis.who_loses?.length ?? 0) > 0) && (
            <section className="mb-12 grid md:grid-cols-2 gap-6">
              {(article.analysis.who_wins?.length ?? 0) > 0 && (
                <div className="border-l-4 border-[hsl(var(--verdict-fortified))] pl-4">
                  <p className="font-sketch text-base font-bold text-[hsl(var(--verdict-fortified))] mb-3"> -  Who Wins</p>
                  <ul className="space-y-3">
                    {article.analysis.who_wins!.map((w, i) => (
                      <li key={i} className="text-[15px] leading-snug">
                        <span className="font-display font-bold text-foreground">{w.name}.</span>{" "}
                        <span className="text-foreground/75">{w.reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(article.analysis.who_loses?.length ?? 0) > 0 && (
                <div className="border-l-4 border-[hsl(var(--verdict-exposed))] pl-4">
                  <p className="font-sketch text-base font-bold text-[hsl(var(--verdict-exposed))] mb-3"> -  Who's Exposed</p>
                  <ul className="space-y-3">
                    {article.analysis.who_loses!.map((w, i) => (
                      <li key={i} className="text-[15px] leading-snug">
                        <span className="font-display font-bold text-foreground">{w.name}.</span>{" "}
                        <span className="text-foreground/75">{w.reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Deep Product Lens */}
          {article.analysis.deep_product_lens && (
            <section className="mb-12">
              <Eyebrow className="mb-3">Deep Product Lens</Eyebrow>
              <p className="text-foreground leading-relaxed text-[17px] whitespace-pre-line">{article.analysis.deep_product_lens}</p>
            </section>
          )}

          {/* Deep Strategy Lens */}
          {article.analysis.deep_strategy_lens && (
            <section className="mb-12">
              <Eyebrow className="mb-3">Deep Strategy Lens</Eyebrow>
              <p className="text-foreground leading-relaxed text-[17px] whitespace-pre-line">{article.analysis.deep_strategy_lens}</p>
            </section>
          )}

          {/* Vertical lens */}
          {article.vertical && (
            <section className="mb-12">
              <Eyebrow className="mb-3">
  The {article.vertical} Lens
</Eyebrow>
              <p className="text-foreground leading-relaxed text-[17px] whitespace-pre-line">{article.analysis.vertical_lens}</p>
            </section>
          )}

          {/* Counter thesis */}
          {article.analysis.counter_thesis && (
            <section className="mb-12 bg-card border-l-4 border-foreground/40 p-5">
              <p className="font-sketch text-base font-bold text-foreground/70 mb-2"> -  Steelman: The Counter-Thesis</p>
              <p className="text-foreground/85 leading-relaxed text-[16px] whitespace-pre-line">{article.analysis.counter_thesis}</p>
            </section>
          )}

          {/* What to watch */}
          {(article.analysis.what_to_watch?.length ?? 0) > 0 && (
            <section className="mb-12">
              <Eyebrow className="mb-3">What to Watch (Next 90 Days)</Eyebrow>
              <ul className="space-y-2">
                {article.analysis.what_to_watch!.map((s, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-snug">
                    <span className="font-mono-marker text-[10px] text-accent mt-1.5">0{i + 1}</span>
                    <span className="text-foreground/85">{s}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* What this means for you */}
          <WhatThisMeans
            for_you={article.analysis.for_you}
            fallback={{
              verdict: article.verdict,
              layers: article.analysis.layer_scores?.filter((s) => s.owned || (s.intensity ?? 0) >= 2).map((s) => s.layer) ?? [],
            }}
          />

          {/* New law candidate */}
          {article.analysis.new_law_candidate && article.analysis.new_law_candidate.trim() && (
            <section className="mb-12 bg-card border-l-4 border-accent p-5">
              <Eyebrow className="mb-2">Candidate Law</Eyebrow>
              <p className="font-display text-lg text-foreground italic leading-snug">
                "{article.analysis.new_law_candidate}"
              </p>
            </section>
          )}

          {article.source_urls?.length > 0 && (
            <section className="mb-10">
              <Eyebrow className="mb-3">Sources</Eyebrow>
              <ul className="space-y-1.5">
                {article.source_urls.map((u, i) => (
                  <li key={i}>
                    <a href={u} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 text-[13px] text-foreground/75 hover:text-accent break-all">
                      <ExternalLink size={11} className="mt-1 shrink-0"/> {u}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="border-t border-foreground/10 mt-10 pt-8">
            <p className="text-sm text-muted-foreground">
              Written by the Supply Chain of Intelligence™ analysis engine, reviewed weekly.
              By <Link to="/about" className="text-accent underline">Anand Arivukkarasu</Link> · Ex-Meta Product Leader.
            </p>
          </div>

          {/* Inbox capture, last */}
          <ArticleFooterCTA
            source={`live:${article.slug}`}
            shareUrl={`https://supplychainofai.com/live/${article.slug}`}
            shareText={article.subheadline ?? article.verdict}
          />
        </div>
      </article>
    </SiteLayout>
  );
};

export default LiveArticleDetail;
