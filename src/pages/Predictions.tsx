import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Search,
  Zap,
  TrendingDown,
  Minus,
  HelpCircle,
} from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import ChessBoardOfIntelligence from "@/components/ChessBoardOfIntelligence";
import SourcesSection from "@/components/SourcesSection";
import Eyebrow from "@/components/Eyebrow";
import FreshnessBadge from "@/components/FreshnessBadge";
import LayerTag from "@/components/LayerTag";
import {
  PREDICTIONS,
  PREDICTIONS_BY_STRUCTURAL,
  type Prediction,
  type StructuralStatus,
  type TimingStatus,
} from "@/data/predictions";

/**
 * /predictions, The track record.
 *
 * Two-axis scoring: every call is judged on STRUCTURAL (did the framework
 * identify the right layer exposure?) and TIMING (did it arrive on the
 * expected horizon?). Conflating those two is the most common way a
 * framework loses credibility, separating them is how it earns trust.
 */

type PillMeta = {
  label: string;
  icon: typeof CheckCircle2;
  color: string;
  bg: string;
};

const STRUCTURAL_META: Record<StructuralStatus, PillMeta> = {
  confirmed: {
    label: "Structural · Confirmed",
    icon: CheckCircle2,
    color: "hsl(var(--layer-1))",
    bg: "hsl(var(--layer-1) / 0.08)",
  },
  "playing-out": {
    label: "Structural · Playing out",
    icon: Clock,
    color: "hsl(var(--layer-4))",
    bg: "hsl(var(--layer-4) / 0.08)",
  },
  pending: {
    label: "Structural · Pending",
    icon: AlertCircle,
    color: "hsl(var(--layer-6))",
    bg: "hsl(var(--layer-6) / 0.08)",
  },
  wrong: {
    label: "Structural · Wrong",
    icon: XCircle,
    color: "hsl(var(--destructive))",
    bg: "hsl(var(--destructive) / 0.08)",
  },
};

const TIMING_META: Record<TimingStatus, PillMeta> = {
  "on-pace": {
    label: "Timing · On pace",
    icon: Minus,
    color: "hsl(var(--layer-3))",
    bg: "hsl(var(--layer-3) / 0.08)",
  },
  faster: {
    label: "Timing · Faster than expected",
    icon: Zap,
    color: "hsl(var(--layer-7))",
    bg: "hsl(var(--layer-7) / 0.08)",
  },
  slower: {
    label: "Timing · Slower than expected",
    icon: TrendingDown,
    color: "hsl(var(--layer-5))",
    bg: "hsl(var(--layer-5) / 0.08)",
  },
  "too-early": {
    label: "Timing · Too early to score",
    icon: HelpCircle,
    color: "hsl(var(--layer-6))",
    bg: "hsl(var(--layer-6) / 0.08)",
  },
};

const Pill = ({ meta }: { meta: PillMeta }) => {
  const Icon = meta.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-mono-marker text-[10px] font-semibold whitespace-nowrap"
      style={{ background: meta.bg, color: meta.color }}
    >
      <Icon size={11} />
      {meta.label}
    </span>
  );
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

type StructuralFilter = "all" | StructuralStatus;

const STRUCTURAL_FILTERS: { id: StructuralFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "confirmed", label: "Confirmed" },
  { id: "playing-out", label: "Playing out" },
  { id: "wrong", label: "Wrong" },
  { id: "pending", label: "Pending" },
];

const Predictions = () => {
  const total = PREDICTIONS.length;
  const confirmed = PREDICTIONS_BY_STRUCTURAL.confirmed.length;
  const playing = PREDICTIONS_BY_STRUCTURAL["playing-out"].length;
  const wrong = PREDICTIONS_BY_STRUCTURAL.wrong.length;
  const fasterThanExpected = PREDICTIONS.filter((p) => p.timing === "faster").length;

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<StructuralFilter>("all");

  const sorted = useMemo<Prediction[]>(
    () => [...PREDICTIONS].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted.filter((p) => {
      if (filter !== "all" && p.structural !== filter) return false;
      if (!q) return true;
      return [p.subject, p.call, p.outcome, ...p.layers, p.structural, p.timing]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [query, filter, sorted]);

  // Quick-jump anchors, one chip per company, scrolls to that prediction.
  const jumpTo = (id: string) => {
    setQuery("");
    setFilter("all");
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  // ItemList JSON-LD so LLMs can cite individual predictions.
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "The Board, Predictions & track record · Supply Chain of Intelligence™",
    description:
      "Dated, layer-tagged structural calls on the 10-layer generative AI stack (not logistics/freight), each scored on structural accuracy, timing, and the counter-move the subject could still play.",
    numberOfItems: PREDICTIONS.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: sorted.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://supplychainofai.com/predictions#${p.id}`,
      name: `${p.subject}, ${STRUCTURAL_META[p.structural].label.replace("Structural · ", "")} · ${TIMING_META[p.timing].label.replace("Timing · ", "")}`,
      item: {
        "@type": "CreativeWork",
        name: p.subject,
        url: `https://supplychainofai.com/predictions#${p.id}`,
        datePublished: p.date,
        about: p.layers.join(", "),
        description: p.call,
        text: p.outcome,
      },
    })),
  };

  return (
    <SiteLayout>
      <Seo
        title="The Board, AI Predictions & Track Record"
        description="Dated, layer-tagged calls on AI moves, scored on structural accuracy, timing, and counter-moves. Directional reads on the 10-layer AI stack."
        path="/predictions"
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      <section className="max-w-5xl mx-auto px-6 pt-20 pb-12">
        <Eyebrow>Track Record</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mt-4"
        >
          The Board.
        </motion.h1>
        <div className="mt-4">
          <FreshnessBadge asOf="Jun 2026" />
        </div>
        <p className="mt-6 text-lg text-foreground/75 max-w-3xl leading-relaxed">
          Think of this page as a chess board, not a crystal ball. Every call
          names the <strong className="text-foreground">layer exposure</strong> a
          company is sitting on, the square under attack. The juggernaut still
          has a move. A master stroke (acquire L1, ship L3, lock the L5
          workflow) can flip the ending. Most don't make it. That's the read.
        </p>
        <p className="mt-4 text-base text-foreground/70 max-w-3xl leading-relaxed">
          Each entry is scored on two independent axes:
          <strong className="text-foreground"> Structural</strong> (did the lens
          identify the right moat or exposure?) and
          <strong className="text-foreground"> Timing</strong> (did it arrive
          on the expected horizon?). Conflating those two is how frameworks
          lose credibility. Separating them, and naming the counter-move the
          subject could still play, is how this one earns trust.
        </p>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl">
          <Stat label="Total calls" value={total} />
          <Stat label="Structural confirmed" value={confirmed} color="hsl(var(--layer-1))" />
          <Stat label="Structural playing out" value={playing} color="hsl(var(--layer-4))" />
          <Stat label="Structural wrong" value={wrong} color="hsl(var(--destructive))" />
          <Stat label="Faster than expected" value={fasterThanExpected} color="hsl(var(--layer-7))" />
        </div>

        {/* Search + filter chips + quick-jump */}
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
              placeholder="Search by company, layer, outcome…"
              className="w-full pl-9 pr-3 py-2.5 bg-background border border-foreground/15 rounded-md text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
              aria-label="Search predictions"
            />
          </label>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono-marker text-[10px] uppercase tracking-wider text-foreground/50 mr-1">
              Filter
            </span>
            {STRUCTURAL_FILTERS.map((f) => {
              const active = filter === f.id;
              const count =
                f.id === "all"
                  ? PREDICTIONS.length
                  : PREDICTIONS_BY_STRUCTURAL[f.id].length;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors border ${
                    active
                      ? "bg-accent text-accent-foreground border-accent"
                      : "border-foreground/15 text-foreground/70 hover:text-foreground hover:border-foreground/40"
                  }`}
                  aria-pressed={active}
                >
                  {f.label} <span className="opacity-60 ml-0.5">({count})</span>
                </button>
              );
            })}
          </div>

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

      {/* The Chess Board of Intelligence, piece-value mapping of the 10 squares */}
      <section className="max-w-5xl mx-auto px-6">
        <ChessBoardOfIntelligence />
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <Eyebrow className="mb-3">The Calls</Eyebrow>
        <h2 className="font-display text-3xl font-semibold text-foreground tracking-tight mb-8">
          Every dated call, with the counter-move still on the table.
        </h2>
        {filtered.length === 0 ? (
          <p className="text-foreground/60 text-sm">No predictions match the current filter{query ? ` and search “${query}”` : ""}.</p>
        ) : (
        <ol className="relative border-l border-foreground/15 ml-3">
          {filtered.map((p, i) => {
              const sMeta = STRUCTURAL_META[p.structural];
              const tMeta = TIMING_META[p.timing];
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
                    className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full border-2 border-background"
                    style={{ background: sMeta.color }}
                    aria-hidden
                  />
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <time className="font-mono-marker text-foreground/60 mr-1">
                      {fmtDate(p.date)}
                    </time>
                    <Pill meta={sMeta} />
                    <Pill meta={tMeta} />
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.layers.map((l) => (
                      <LayerTag key={l} id={l} variant="chip" link />
                    ))}
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

                  {p.timingNote && (
                    <div className="mt-4 pl-3 border-l-2 text-sm text-foreground/70 italic" style={{ borderColor: tMeta.color }}>
                      <span className="font-mono-marker not-italic text-[10px] uppercase tracking-wider mr-2" style={{ color: tMeta.color }}>
                        Timing note
                      </span>
                      {p.timingNote}
                    </div>
                  )}

                  {p.counterMove && (
                    <div
                      className="mt-4 p-4 rounded-md border bg-foreground/[0.02]"
                      style={{ borderColor: "hsl(var(--accent) / 0.35)" }}
                    >
                      <div className="font-mono-marker text-[10px] uppercase tracking-wider mb-1.5 text-accent">
                        ♞ Counter-move · the master stroke
                      </div>
                      <p className="text-foreground/85 text-[14.5px] leading-relaxed">
                        {p.counterMove}
                      </p>
                    </div>
                  )}

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
        )}

        <SourcesSection />

        <div className="mt-12 p-6 border border-foreground/15 rounded-lg bg-foreground/[0.02] space-y-4">
          <h3 className="font-display text-xl font-semibold text-foreground">
            On honesty, structural vs. timing
          </h3>
          <p className="text-foreground/75 leading-relaxed">
            A framework's job is to identify <em>where</em> value compresses and
            <em> where</em> it accrues. Its job is not to predict <em>when</em>  - 
            that depends on frontier-model release cadence, regulatory shocks,
            distribution deals, and cap-table accidents the lens does not see.
          </p>
          <p className="text-foreground/75 leading-relaxed">
            So every call is scored twice. A <strong className="text-foreground">structural</strong> call
            can be confirmed even when <strong className="text-foreground">timing</strong> is faster
            (Harvey, Jasper, Devin) or slower than expected. Christensen, Porter, and
            JTBD all called direction correctly and timing wrong on multiple cases.
            Naming the variable the framework can't control is how it stays
            intellectually serious, and how it survives the cases it gets wrong.
          </p>
          <p className="text-foreground/75 leading-relaxed">
            Calls stay on this page whether they age well or not. Anything that
            turns out wrong is marked wrong, not deleted.
          </p>
        </div>

        <div className="mt-8 p-6 border border-foreground/15 rounded-lg bg-foreground/[0.015] space-y-3 text-[13.5px] text-foreground/70 leading-relaxed">
          <h3 className="font-mono-marker text-[10px] uppercase tracking-wider text-foreground/55">
            Disclaimer · editorial use only
          </h3>
          <p>
            All company, product, and service names referenced on this page
            (and across <em>Supply Chain of Intelligence™</em>) are used
            <strong className="text-foreground/85"> descriptively, for
            editorial analysis</strong>, and remain the trademarks of their
            respective owners. Their inclusion does not imply endorsement,
            affiliation, or sponsorship, in either direction.
          </p>
          <p>
            Every reference is drawn from <strong className="text-foreground/85">
            publicly reported information</strong>, press, earnings, primary
            documents, official blogs, and treated as a journalistic / blog
            source. Figures (valuations, ARR, headcount, funding) are reported
            as of the cited date and may change. We are not responsible for the
            accuracy of third-party reporting, nor for the real-world business
            outcomes, financings, or operating decisions of any company named.
          </p>
          <p>
            We are not ranking companies as "good" or "bad," "winners" or
            "losers." This is a <strong className="text-foreground/85">lens</strong>,
            not a verdict. The framework identifies <em>layer exposure</em>  - 
            which squares a company is sitting on. The company itself decides
            what to do about it. That's the whole point of the counter-move.
          </p>
          <p className="text-foreground/55 italic">
            "The Chess Board of Intelligence" is a descriptive heading within
            this analysis. It is not claimed as a trademark.
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
