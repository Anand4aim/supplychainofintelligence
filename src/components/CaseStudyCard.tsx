import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingDown, TrendingUp, ArrowRight, Minus } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";

type SubLayer = string | { name: string; impact?: number; who?: string };
export interface LayerScore {
  layer: string;
  owned?: boolean;
  intensity?: number;
  note?: string;
  sublayers?: SubLayer[];
}
export interface CubePosition {
  functions?: string[];
  verticals?: string[];
  layers?: string[];
}
export interface TimelinePoint {
  date: string;
  label: string;
  tone?: "up" | "down" | "neutral";
}
export interface WinnerLoser { name: string; reason: string; }

export interface CaseStudy {
  slug: string;
  companies: { name: string; logo: string; color: string }[];
  tag: string;
  title: string;
  verdict: string;
  excerpt: string;
  layers: string[];
  /**
   * Canonical sublayer ids (e.g. ["L1b","L5d","L8c"]) — drives sublayer-precision
   * chips and verdicts. Optional for back-compat with case studies that
   * haven't been upgraded from layer-level yet. See src/data/sublayerIndex.ts.
   */
  sublayers?: string[];
  date: string;
  readTime: string;
  brief?: boolean; // visually tag as a short take vs full teardown
  track?: "software" | "vertical" | "physical"; // which analysis track this case belongs to (default: software)
  valuation?: {
    label: string;
    before: string;
    after: string;
    trend: "down" | "up" | "flat";
    changeLabel: string;
  };
  content: string;
  // Optional depth modules (live-article parity)
  layer_scores?: LayerScore[];
  cube_position?: CubePosition;
  timeline?: TimelinePoint[];
  counter_thesis?: string;
  who_wins?: WinnerLoser[];
  who_loses?: WinnerLoser[];
  for_you?: {
    product_leader?: string;
    investor?: string;
    operator?: string;
  };
  pull_quote?: string;
  /**
   * Pre-formatted ~120-150 word LinkedIn-ready snippet. Surfaces a "Copy as
   * LinkedIn post" affordance on the detail page. The CopySnippet component
   * appends the canonical attribution footer automatically — do NOT include
   * the attribution in this string.
   */
  linkedin_snippet?: string;
  sources?: { url: string; outlet?: string }[];
}

interface Props {
  study: CaseStudy;
  index: number;
  featured?: boolean;
}

const getVerdictClass = (trend?: "down" | "up" | "flat") => {
  if (trend === "down") return "verdict-exposed";
  if (trend === "up") return "verdict-fortified";
  return "verdict-consolidating";
};

const CaseStudyCard = ({ study, index, featured = false }: Props) => {
  const TrendIcon = study.valuation?.trend === "down" ? TrendingDown : study.valuation?.trend === "up" ? TrendingUp : Minus;
  const trendColor = study.valuation?.trend === "down" ? "text-verdict-exposed" : study.valuation?.trend === "up" ? "text-verdict-fortified" : "text-muted-foreground";

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className={`group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-500 sketch-border ${getVerdictClass(study.valuation?.trend)}`}
      >
        <Link to={`/analysis/${study.slug}`} className="block p-8 md:p-10" aria-label={`Read case study: ${study.title}`}>
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <Eyebrow dash={false} className="bg-accent/10 px-3 py-1 rounded-full">
  {study.tag}
</Eyebrow>
            <span className="text-sm text-muted-foreground">{study.date}</span>
            <span className="text-sm text-muted-foreground">· {study.readTime}</span>
            {study.brief && (
              <span className="font-mono-marker text-[10px] uppercase tracking-wider text-foreground/60 border border-foreground/20 px-2 py-0.5 rounded">
                Brief
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 mb-6">
            {study.companies.map((company, ci) => (
              <div key={company.name} className="flex items-center gap-2">
                {ci > 0 && <span className="text-muted-foreground text-lg font-light mx-1">vs</span>}
                <div className="flex items-center gap-2.5">
                  <img src={company.logo} alt={`${company.name} logo`}
                    className="w-8 h-8 rounded-lg object-contain bg-white p-0.5 border border-border"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <span className="text-sm font-bold text-foreground">{company.name}</span>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors leading-tight">
            {study.title}
          </h2>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-2xl">
            {study.excerpt}
          </p>

          <div className="flex flex-wrap items-end justify-between gap-6">
            {study.valuation && (
              <div className="bg-secondary border border-border rounded-xl p-5 min-w-[260px] sketch-border">
                <p className="font-sketch text-sm font-bold text-muted-foreground mb-3">{study.valuation.label}</p>
                <div className="flex items-baseline gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Peak</p>
                    <p className="font-display text-2xl font-bold text-foreground">{study.valuation.before}</p>
                  </div>
                  <ArrowRight size={18} className="text-muted-foreground mb-1" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Now</p>
                    <p className="font-display text-2xl font-bold text-foreground">{study.valuation.after}</p>
                  </div>
                  <div className={`flex items-center gap-1 ml-2 ${trendColor}`}>
                    <TrendIcon size={16} />
                    <span className="font-sketch text-sm font-bold">{study.valuation.changeLabel}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col items-end gap-3">
              <div className="flex gap-2">
                {study.layers.map((l) => {
                  const n = parseInt(l.replace("L", ""));
                  return (
                    <span key={l} className="font-sketch text-sm font-bold px-3 py-1 rounded-lg"
                      style={{ color: `hsl(var(--layer-${n}))`, background: `hsl(var(--layer-${n}-bg))` }}>
                      {l}
                    </span>
                  );
                })}
              </div>
              <p className={`font-sketch text-sm font-bold uppercase ${study.valuation?.trend === "down" ? "text-verdict-exposed" : "text-verdict-fortified"}`}>
                {study.verdict}
              </p>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`group bg-card border border-border rounded-xl hover:shadow-md transition-all duration-300 sketch-border ${getVerdictClass(study.valuation?.trend)}`}
    >
      <Link to={`/analysis/${study.slug}`} className="block p-6" aria-label={`Read case study: ${study.title}`}>
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className="font-mono-marker text-[11px] md:text-[12px] font-bold uppercase tracking-[0.18em] text-accent">{study.tag}</span>
        <span className="text-sm text-muted-foreground">{study.readTime}</span>
        {study.brief && (
          <span className="font-mono-marker text-[9px] uppercase tracking-wider text-foreground/60 border border-foreground/20 px-1.5 py-0.5 rounded">
            Brief
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 mb-3">
        {study.companies.map((company) => (
          <img key={company.name} src={company.logo} alt={`${company.name} logo`}
            className="w-6 h-6 rounded object-contain bg-white p-0.5 border border-border"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        ))}
      </div>

      <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors leading-snug">
        {study.title}
      </h3>

      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{study.excerpt}</p>

      {study.valuation && (
        <div className="flex items-center gap-3 mb-4 text-sm">
          <span className="text-muted-foreground">{study.valuation.before}</span>
          <ArrowRight size={12} className="text-muted-foreground" />
          <span className="text-foreground font-semibold">{study.valuation.after}</span>
          <span className={`flex items-center gap-1 ${trendColor} font-sketch text-sm font-bold`}>
            <TrendIcon size={12} /> {study.valuation.changeLabel}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {study.layers.map((l) => {
            const n = parseInt(l.replace("L", ""));
            return (
              <span key={l} className="font-sketch text-sm font-bold px-2 py-0.5 rounded-md"
                style={{ color: `hsl(var(--layer-${n}))`, background: `hsl(var(--layer-${n}-bg))` }}>
                {l}
              </span>
            );
          })}
        </div>
        <span className="text-sm text-accent font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
          Read <ArrowRight size={12} />
        </span>
      </div>
      </Link>
    </motion.article>
  );
};

export default CaseStudyCard;