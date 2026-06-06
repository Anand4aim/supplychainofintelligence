import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * GoldMiningAnchor — Tier-1 anchor (Home only).
 *
 * One-line metaphor + a two-row parallel snapshot (gold flow ↔ AI flow)
 * so the reader gets the "aha" in a single glance before any layer codes
 * appear. Full layer-by-layer mapping lives on /framework#gold-mining.
 */

// Condensed 6-beat parallel — chosen so each pair reads as the same idea
// in two languages. Not every layer is shown; the goal is intuition, not
// completeness.
const FLOW: { gold: string; ai: string }[] = [
  { gold: "Land & power", ai: "Energy & fabs" },
  { gold: "Shovels", ai: "Chips & clouds" },
  { gold: "Ore", ai: "Data" },
  { gold: "Refining", ai: "Models" },
  { gold: "Assay & hallmark", ai: "Gates & guardrails" },
  { gold: "Ring on a finger", ai: "The product you use" },
];

const GoldMiningAnchor = () => (
  <section
    aria-label="Gold mining analogy — one-line anchor"
    className="bg-background border-y border-foreground/10"
  >
    <div className="max-w-5xl mx-auto px-6 py-10 md:py-14 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <p className="font-display text-[18px] md:text-[22px] text-foreground/90 leading-snug max-w-3xl">
          AI is a supply chain. <span className="text-accent font-semibold">Like gold:</span>{" "}
          ore in the ground, refining, assay, retail, the ring on a finger.
          Value moves through 10 layers — most products sit on one,
          usually the wrong one.
        </p>
        <Link
          to="/framework#gold-mining"
          className="shrink-0 inline-flex items-center gap-1.5 font-mono-marker text-[11px] tracking-[0.16em] uppercase text-accent hover:gap-2 transition-all"
        >
          Read the full analogy <ArrowRight size={12} />
        </Link>
      </div>

      {/* Two-line parallel snapshot — Gold flow on top, AI flow beneath. */}
      <div className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 md:p-6 overflow-x-auto">
        <div
          className="grid gap-x-2 gap-y-2 min-w-[640px]"
          style={{ gridTemplateColumns: `repeat(${FLOW.length}, minmax(0, 1fr))` }}
        >
          {/* Row labels above the grid */}
          <div className="col-span-full flex items-center justify-between mb-1">
            <span className="font-mono-marker text-[10px] tracking-[0.18em] uppercase text-accent">
              Gold
            </span>
            <span className="font-mono-marker text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
              flow →
            </span>
          </div>

          {/* Gold row */}
          {FLOW.map((f, i) => (
            <div
              key={`g-${i}`}
              className="rounded-md bg-background border border-foreground/10 px-2.5 py-2 text-center"
            >
              <p className="font-display text-[12px] md:text-[13px] text-foreground/90 leading-tight">
                {f.gold}
              </p>
            </div>
          ))}

          {/* Connector arrows */}
          {FLOW.map((_, i) => (
            <div
              key={`arrow-${i}`}
              className="flex items-center justify-center text-accent/60 text-[14px] leading-none"
              aria-hidden
            >
              ↓
            </div>
          ))}

          {/* AI row */}
          {FLOW.map((f, i) => (
            <div
              key={`a-${i}`}
              className="rounded-md bg-accent/5 border border-accent/30 px-2.5 py-2 text-center"
            >
              <p className="font-display text-[12px] md:text-[13px] text-foreground font-semibold leading-tight">
                {f.ai}
              </p>
            </div>
          ))}

          <div className="col-span-full flex items-center justify-between mt-1">
            <span className="font-mono-marker text-[10px] tracking-[0.18em] uppercase text-accent">
              AI
            </span>
            <span className="font-sketch text-[12px] text-muted-foreground italic">
              same chain, different century
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default GoldMiningAnchor;
