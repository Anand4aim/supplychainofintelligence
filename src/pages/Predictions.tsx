import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, AlertCircle, XCircle, Search } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import LayerTag from "@/components/LayerTag";
import {
  PREDICTIONS,
  PREDICTIONS_BY_STATUS,
  type Prediction,
  type PredictionStatus,
} from "@/data/predictions";

/**
 * /predictions — The track record.
 *
 * The single page that converts "smart lens" into "lens with a public scorecard".
 * Every entry has: date the call was made, the layer exposure that drove it,
 * what happened since, a status, and a link into the deep analysis. Optional
 * external source link for falsifiability.
 */

const STATUS_META: Record<
  PredictionStatus,
  { label: string; icon: typeof CheckCircle2; color: string; bg: string }
> = {
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    color: "hsl(var(--layer-1))",
    bg: "hsl(var(--layer-1) / 0.08)",
  },
  "playing-out": {
    label: "Playing out",
    icon: Clock,
    color: "hsl(var(--layer-4))",
    bg: "hsl(var(--layer-4) / 0.08)",
  },
  pending: {
    label: "Pending",
    icon: AlertCircle,
    color: "hsl(var(--layer-6))",
    bg: "hsl(var(--layer-6) / 0.08)",
  },
  wrong: {
    label: "Wrong",
    icon: XCircle,
    color: "hsl(var(--destructive))",
    bg: "hsl(var(--destructive) / 0.08)",
  },
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const Predictions = () => {
  const total = PREDICTIONS.length;
  const confirmed = PREDICTIONS_BY_STATUS.confirmed.length;
  const playing = PREDICTIONS_BY_STATUS["playing-out"].length;

  const [query, setQuery] = useState("");

  const sorted = useMemo<Prediction[]>(
    () => [...PREDICTIONS].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter((p) =>
      [p.subject, p.call, p.outcome, ...p.layers, p.status]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [query, sorted]);

  // Quick-jump anchors — one chip per company, scrolls to that prediction.
  const jumpTo = (id: string) => {
    setQuery("");
    // Defer so the filter reset paints before scrolling.
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <SiteLayout>
      <Seo
        title="Predictions — The Supply Chain of Intelligence™ track record"
        description="Public, dated, layer-tagged calls made through the 10-layer generative AI framework — Jasper, Chegg, Sierra, Glean, Devin, Stability — with outcomes and sources."
        path="/predictions"
      />

      <section className="max-w-5xl mx-auto px-6 pt-20 pb-12">
        <Eyebrow>Track Record</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mt-4"
        >
          Predictions.
        </motion.h1>
        <p className="mt-6 text-lg text-foreground/75 max-w-3xl leading-relaxed">
          Every structural call this framework has made, dated, tagged to the layer
          exposure that drove it, with what has happened since and a link to the
          full analysis. A framework without a scorecard is a guess.
        </p>

        <div className="mt-8 grid grid-cols-3 gap-4 max-w-xl">
          <Stat label="Total calls" value={total} />
          <Stat label="Confirmed" value={confirmed} color="hsl(var(--layer-1))" />
          <Stat label="Playing out" value={playing} color="hsl(var(--layer-4))" />
        </div>

        {/* Search + quick-jump */}
        <div className="mt-10 space-y-4">
          <label className="relative block max-w-xl">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search predictions — company, layer, outcome…"
              className="w-full pl-9 pr-3 py-2.5 bg-background border border-foreground/15 rounded-md text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
              aria-label="Search predictions"
            />
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono-marker text-[10px] uppercase tracking-wider text-foreground/50 mr-1">
              Jump to
            </span>
            {sorted.map((p) => (
              <button
                key={p.id}
                onClick={() => jumpTo(p.id)}
                className="px-2.5 py-1 rounded border border-foreground/15 text-xs font-medium text-foreground/80 hover:text-accent hover:border-accent transition-colors"
              >
                {p.subject}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <p className="text-foreground/60 text-sm">No predictions match “{query}”.</p>
        ) : (
        <ol className="relative border-l border-foreground/15 ml-3">
          {filtered
            .map((p, i) => {
              const meta = STATUS_META[p.status];
              const Icon = meta.icon;
              return (
                <motion.li
                  key={p.id}
                  id={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="relative pl-8 pb-12 scroll-mt-24"
                >
                  <span
              const meta = STATUS_META[p.status];
              const Icon = meta.icon;
              return (
                <motion.li
                  key={p.id}
                  id={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="relative pl-8 pb-12"
                >
                  <span
                    className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full border-2 border-background"
                    style={{ background: meta.color }}
                    aria-hidden
                  />
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <time className="font-mono-marker text-foreground/60">
                      {fmtDate(p.date)}
                    </time>
                    <span
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-mono-marker font-semibold"
                      style={{ background: meta.bg, color: meta.color }}
                    >
                      <Icon size={12} />
                      {meta.label}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {p.layers.map((l) => (
                        <LayerTag key={l} id={l} variant="chip" link />
                      ))}
                    </div>
                  </div>

                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mt-3">
                    {p.subject}
                  </h2>

                  <div className="mt-4 grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="font-mono-marker text-[10px] uppercase tracking-wider text-foreground/50 mb-1.5">
                        The call
                      </div>
                      <p className="text-foreground/85 leading-relaxed">{p.call}</p>
                    </div>
                    <div>
                      <div className="font-mono-marker text-[10px] uppercase tracking-wider text-foreground/50 mb-1.5">
                        What happened
                      </div>
                      <p className="text-foreground/85 leading-relaxed">{p.outcome}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                    <Link
                      to={`/analysis/${p.caseStudySlug}`}
                      className="inline-flex items-center gap-1.5 text-accent hover:underline font-medium"
                    >
                      Read the full analysis <ArrowRight size={14} />
                    </Link>
                    {p.source && (
                      <a
                        href={p.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/60 hover:text-foreground underline underline-offset-2"
                      >
                        Source: {p.source.label}
                      </a>
                    )}
                  </div>
                </motion.li>
              );
            })}
        </ol>

        <div className="mt-12 p-6 border border-foreground/15 rounded-lg bg-foreground/[0.02]">
          <h3 className="font-display text-xl font-semibold text-foreground">
            On honesty
          </h3>
          <p className="mt-2 text-foreground/75 leading-relaxed">
            Calls stay on this page whether they age well or not. Anything that
            turns out wrong is marked wrong, not deleted. The framework earns its
            keep one falsifiable call at a time.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
};

const Stat = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) => (
  <div className="border border-foreground/15 rounded-lg p-4">
    <div
      className="font-display text-3xl font-bold"
      style={{ color: color ?? "hsl(var(--foreground))" }}
    >
      {value}
    </div>
    <div className="font-mono-marker text-[10px] uppercase tracking-wider text-foreground/60 mt-1">
      {label}
    </div>
  </div>
);

export default Predictions;
