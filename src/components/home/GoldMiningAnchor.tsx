import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { LAYERS, layerColor } from "@/data/layers";

/**
 * GoldMiningAnchor — Tier-1 anchor (Home only).
 *
 * One-line metaphor + full 10-layer parallel snapshot:
 * Gold flow on top, AI Layer beneath, color-coded by layer.
 * Mirrors the deck slide so the "aha" lands in one glance.
 * Full per-layer mapping lives on /framework#gold-mining.
 */

// Short gold word per layer — matches the deck. Kept ≤2 words so all
// 10 columns fit a single horizontal strip.
const GOLD_SHORT: Record<string, string> = {
  "L-1": "Earth",
  L0: "Shovels",
  L1: "Ore",
  L2: "Refinery",
  L3: "Assay",
  L4: "Railroads",
  L5: "Jeweler",
  L6: "Collection",
  L7: "Storefront",
  L8: "Record Book",
};

const GoldMiningAnchor = () => (
  <section
    aria-label="Gold mining analogy — one-line anchor"
    className="bg-background border-y border-foreground/10"
  >
    <div className="max-w-6xl mx-auto px-6 py-10 md:py-14 space-y-8">
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

      {/* Full 10-layer parallel strip — color-coded, scrolls on mobile. */}
      <div className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 md:p-6 overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Row label: Gold */}
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="font-mono-marker text-[10px] tracking-[0.18em] uppercase text-accent">
              Gold supply chain
            </span>
            <span className="font-mono-marker text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
              flow →
            </span>
          </div>

          {/* Gold row */}
          <div
            className="grid gap-1.5"
            style={{ gridTemplateColumns: `repeat(${LAYERS.length}, minmax(0, 1fr))` }}
          >
            {LAYERS.map((l) => (
              <div
                key={`g-${l.id}`}
                className="rounded-md bg-background border px-1.5 py-2 text-center"
                style={{ borderColor: `${layerColor(l.id)}55` }}
              >
                <p className="font-display text-[12px] md:text-[13px] text-foreground/90 leading-tight">
                  {GOLD_SHORT[l.id]}
                </p>
              </div>
            ))}
          </div>

          {/* Connector arrows */}
          <div
            className="grid gap-1.5 my-1"
            style={{ gridTemplateColumns: `repeat(${LAYERS.length}, minmax(0, 1fr))` }}
            aria-hidden
          >
            {LAYERS.map((l) => (
              <div
                key={`a-${l.id}`}
                className="flex items-center justify-center text-[14px] leading-none"
                style={{ color: layerColor(l.id) }}
              >
                ↓
              </div>
            ))}
          </div>

          {/* AI row — color-coded by layer */}
          <div
            className="grid gap-1.5"
            style={{ gridTemplateColumns: `repeat(${LAYERS.length}, minmax(0, 1fr))` }}
          >
            {LAYERS.map((l) => (
              <div
                key={`ai-${l.id}`}
                className="rounded-md px-1.5 py-2 text-center text-white"
                style={{ background: layerColor(l.id) }}
              >
                <p className="font-mono-marker text-[9px] tracking-[0.12em] uppercase opacity-80 leading-none">
                  {l.id}
                </p>
                <p className="font-display text-[12px] md:text-[13px] font-semibold leading-tight mt-1">
                  {l.shortName}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-2 px-1">
            <span className="font-mono-marker text-[10px] tracking-[0.18em] uppercase text-accent">
              Supply Chain of Intelligence
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
