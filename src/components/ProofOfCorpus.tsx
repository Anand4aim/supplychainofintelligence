import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CASE_STUDIES } from "@/data/caseStudies";
import { LAYERS } from "@/data/layers";
import Eyebrow from "./Eyebrow";

// ── Counts ──────────────────────────────────────────────────────────────────
// These are derived (not hand-maintained) so the strip is always honest.
const CASE_COUNT = CASE_STUDIES.length;
const LAYER_PAGE_COUNT = LAYERS.length; // L-1 → L8

// Featured "recently analyzed" companies, verdict + slug pulled from the
// case-study corpus. Order chosen to span Fortress / Wrapper / Ambiguous so
// readers immediately see the framework producing different verdicts.
const FEATURED: Array<{ slug: string; company: string; verdict: string; tier: "fortress" | "exposed" | "mixed" }> = [
  { slug: "sierra-vs-salesforce", company: "Sierra", verdict: "Fortress · L1c + L5d + L8c", tier: "fortress" },
  { slug: "jasper-vs-grammarly-copilot", company: "Jasper", verdict: "Exposed · L7c only", tier: "exposed" },
  { slug: "harvey-vs-generic-legal", company: "Harvey", verdict: "Fortress · L1b + L5b + L8d", tier: "fortress" },
  { slug: "devin-cognition-l7-agent", company: "Devin", verdict: "Wrapper-at-risk · L7c on L2a", tier: "exposed" },
  { slug: "glean-enterprise-search-fortress", company: "Glean", verdict: "Memory moat · L8d + L1c", tier: "fortress" },
  { slug: "bloomberg-gpt-vertical-fortress", company: "Bloomberg", verdict: "Vertical fortress · L1b + L2b", tier: "fortress" },
];

const tierClasses: Record<typeof FEATURED[number]["tier"], string> = {
  fortress: "text-verdict-fortified border-verdict-fortified/30 bg-verdict-fortified/5",
  exposed: "text-verdict-exposed border-verdict-exposed/30 bg-verdict-exposed/5",
  mixed: "text-foreground/80 border-foreground/20 bg-foreground/5",
};

/**
 * Proof-of-corpus strip, shown right under the hero so first-time visitors
 * (and crawlers that only fetch the homepage) immediately see that the site
 * is a body of work, not a single-page manifesto.
 */
const ProofOfCorpus = () => (
  <section className="bg-background border-y border-border">
    <div className="max-w-6xl mx-auto px-6 py-10 md:py-12">
      {/* Counters ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
        <div>
          <Eyebrow className="mb-2">The Framework, Applied</Eyebrow>
          <h2 className="font-display text-2xl md:text-[28px] font-bold text-foreground leading-tight">
            A working corpus.
          </h2>
        </div>
        <div className="flex flex-wrap gap-6 md:gap-8">
          <Stat n={CASE_COUNT} label="Worked case studies" />
          <Stat n={LAYER_PAGE_COUNT} label="Per-layer deep dives" />
          <Stat n={28} label="Live-feed posts" suffix="+" />
        </div>
      </div>

      {/* Recently analyzed rail ───────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {FEATURED.map((f, i) => (
          <motion.div
            key={f.slug}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.35 }}
          >
            <Link
              to={`/analysis/${f.slug}`}
              className="block h-full p-3.5 rounded-md border border-foreground/10 hover:border-foreground/30 bg-card transition-all hover:-translate-y-0.5"
            >
              <p className="font-display text-[15px] font-bold text-foreground mb-1.5">{f.company}</p>
              <p className={`font-mono-marker text-[9.5px] uppercase tracking-[0.08em] px-1.5 py-0.5 rounded inline-block border ${tierClasses[f.tier]}`}>
                {f.verdict}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Links out ────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-7 font-mono-marker text-[11px] uppercase tracking-[0.14em]">
        <Link to="/analysis" className="text-accent font-semibold hover:underline flex items-center gap-1">
          All {CASE_COUNT} case studies <ArrowRight size={11} />
        </Link>
        <Link to="/framework" className="text-foreground/70 hover:text-foreground">
          10 layer deep-dives →
        </Link>
        <Link to="/live" className="text-foreground/70 hover:text-foreground">
          News feed →
        </Link>
        <Link to="/market-map" className="text-foreground/70 hover:text-foreground">
          Market map →
        </Link>
      </div>
    </div>
  </section>
);

const Stat = ({ n, label, suffix = "" }: { n: number; label: string; suffix?: string }) => (
  <div className="flex flex-col">
    <span className="font-display text-3xl md:text-[38px] font-bold text-accent leading-none">
      {n}{suffix}
    </span>
    <span className="font-mono-marker text-[10px] uppercase tracking-[0.14em] text-muted-foreground mt-1">
      {label}
    </span>
  </div>
);

export default ProofOfCorpus;
