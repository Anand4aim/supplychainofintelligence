import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, AlertTriangle, HelpCircle } from "lucide-react";
import Eyebrow from "./Eyebrow";

/**
 * Framework Applied — three worked audits side by side.
 *
 * Critique we're answering: "the framework is over-spec'd for its current
 * evidence base." Fix: show it producing non-obvious verdicts on three named
 * companies, with the audit visible inline.
 *
 * Picked deliberately to span the verdict space — Fortress / Wrapper-at-risk /
 * Ambiguous — so the framework demonstrably differentiates rather than just
 * labelling everything "exposed."
 */

type AuditScore = { q: string; score: 1 | 2 | 3 | 4 | 5; note: string };
type Audit = {
  slug: string;
  company: string;
  domain: string; // for Clearbit logo
  tier: "fortress" | "exposed" | "mixed";
  tierLabel: string;
  icon: typeof Shield;
  layers: string;
  oneLine: string;
  scores: AuditScore[];
  total: number; // out of 40
  verdict: string;
};

const AUDITS: Audit[] = [
  {
    slug: "sierra-vs-salesforce",
    company: "Sierra",
    domain: "sierra.ai",
    tier: "fortress",
    tierLabel: "Fortress",
    icon: Shield,
    layers: "L1b + L5a/b + L8c",
    oneLine: "Customer-care agent built on proprietary tenant data, deep playbooks, and per-customer compounding memory.",
    scores: [
      { q: "Proprietary data (L1b)", score: 5, note: "Tenant conversations live behind their walls." },
      { q: "Deep playbooks (L5b)", score: 4, note: "Per-customer policies, escalation rules, brand voice." },
      { q: "Compounding memory (L8c)", score: 5, note: "Every resolution updates the customer-specific model." },
      { q: "Distribution / railroad (L4)", score: 2, note: "Direct enterprise sales — not Salesforce's reach." },
    ],
    total: 33,
    verdict: "Hard to displace even by L4 owners. Triangle complete.",
  },
  {
    slug: "jasper-vs-grammarly-copilot",
    company: "Jasper",
    domain: "jasper.ai",
    tier: "exposed",
    tierLabel: "Wrapper-at-risk",
    icon: AlertTriangle,
    layers: "L7 only",
    oneLine: "Marketing copy surface with prompt templates and brand voice presets — no layer below the UI.",
    scores: [
      { q: "Proprietary data (L1b)", score: 1, note: "User prompts; nothing exclusive." },
      { q: "Deep playbooks (L5b)", score: 2, note: "Brand voice configs — replicable in any L2 system prompt." },
      { q: "Compounding memory (L8c)", score: 1, note: "Per-doc state. No org-level loop." },
      { q: "Distribution / railroad (L4)", score: 1, note: "Standalone web app. No editor footprint." },
    ],
    total: 12,
    verdict: "Commoditized the moment L2 shipped chat. 80% mark-down confirmed.",
  },
  {
    slug: "glean-enterprise-search-fortress",
    company: "Glean",
    domain: "glean.com",
    tier: "mixed",
    tierLabel: "Ambiguous → tilting fortress",
    icon: HelpCircle,
    layers: "L1b + L8c (claimed) · L4 (contested)",
    oneLine: "Enterprise search that crawls every tenant SaaS and accumulates query-graph memory — but Copilot owns the OS.",
    scores: [
      { q: "Proprietary data (L1b)", score: 4, note: "Tenant-wide connector graph; deeper than Copilot for non-Microsoft stacks." },
      { q: "Deep playbooks (L5b)", score: 3, note: "Permissions, ranking, dept routing — encoded enterprise know-how." },
      { q: "Compounding memory (L8c)", score: 4, note: "Per-employee answer graph compounds with usage." },
      { q: "Distribution / railroad (L4)", score: 2, note: "Strong inside enterprise IT — but Copilot is bundled in 365." },
    ],
    total: 26,
    verdict: "Triangle nearly complete. The L4 fight against Copilot decides the next 24 months.",
  },
];

const tierStyles: Record<Audit["tier"], { ring: string; chip: string; bar: string; total: string }> = {
  fortress: {
    ring: "border-verdict-fortified/40",
    chip: "text-verdict-fortified bg-verdict-fortified/10 border-verdict-fortified/30",
    bar: "bg-verdict-fortified",
    total: "text-verdict-fortified",
  },
  exposed: {
    ring: "border-verdict-exposed/40",
    chip: "text-verdict-exposed bg-verdict-exposed/10 border-verdict-exposed/30",
    bar: "bg-verdict-exposed",
    total: "text-verdict-exposed",
  },
  mixed: {
    ring: "border-foreground/25",
    chip: "text-foreground/80 bg-foreground/5 border-foreground/20",
    bar: "bg-foreground/60",
    total: "text-foreground",
  },
};

const FrameworkApplied = () => (
  <section className="bg-background border-y border-border">
    <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 max-w-3xl"
      >
        <Eyebrow className="mb-4">The audit, applied — three worked verdicts</Eyebrow>
        <h2 className="font-display text-[26px] md:text-[34px] font-bold text-foreground leading-[1.15] mb-4">
          One audit. Three different verdicts. No hand-waving.
        </h2>
        <p className="text-base md:text-[17px] text-muted-foreground leading-relaxed">
          The 8-question Defensibility Audit applied to three companies that look adjacent
          but sit on completely different structural ground. Same scoring rubric — radically
          different futures. Click any card for the full case study.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {AUDITS.map((a, i) => {
          const styles = tierStyles[a.tier];
          const Icon = a.icon;
          return (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                to={`/analysis/${a.slug}`}
                className={`group block h-full rounded-lg border-2 ${styles.ring} bg-card p-6 hover:shadow-lg transition-all hover:-translate-y-0.5`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3 gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <img
                      src={`https://logo.clearbit.com/${a.domain}`}
                      alt={`${a.company} logo`}
                      loading="lazy"
                      className="w-10 h-10 rounded bg-white object-contain border border-border shrink-0"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="min-w-0">
                      <h3 className="font-display text-xl font-bold text-foreground mb-1 leading-tight">{a.company}</h3>
                      <span className={`inline-flex items-center gap-1 font-mono-marker text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 rounded border ${styles.chip}`}>
                        <Icon size={10} /> {a.tierLabel}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`font-display text-3xl font-bold leading-none ${styles.total}`}>{a.total}</span>
                    <span className="block font-mono-marker text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">/ 40</span>
                  </div>
                </div>

                <p className="font-mono-marker text-[10px] uppercase tracking-[0.1em] text-accent mb-2">
                  {a.layers}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{a.oneLine}</p>

                {/* Scored questions */}
                <div className="space-y-2.5 mb-5">
                  {a.scores.map((s) => (
                    <div key={s.q}>
                      <div className="flex items-center justify-between mb-1 gap-2">
                        <span className="text-[12.5px] text-foreground/80 font-medium">{s.q}</span>
                        <div className="flex gap-0.5 shrink-0">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <span
                              key={n}
                              className={`w-1.5 h-1.5 rounded-full ${n <= s.score ? styles.bar : "bg-foreground/15"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[11.5px] text-muted-foreground leading-snug">{s.note}</p>
                    </div>
                  ))}
                </div>

                {/* Verdict */}
                <div className="pt-4 border-t border-foreground/10">
                  <p className="text-sm text-foreground/90 leading-relaxed font-medium mb-2">{a.verdict}</p>
                  <span className="inline-flex items-center gap-1 font-mono-marker text-[10px] uppercase tracking-[0.12em] text-accent group-hover:gap-2 transition-all">
                    Read the full audit <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <p className="font-sketch text-sm text-muted-foreground italic mt-8 text-center max-w-2xl mx-auto">
        Same 8 questions. Same 1–5 scale. The framework earns its complexity by producing
        non-obvious verdicts — Glean isn't an obvious fortress, Jasper isn't an obvious wrapper
        until you score it.
      </p>
    </div>
  </section>
);

export default FrameworkApplied;
