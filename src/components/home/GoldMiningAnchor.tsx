import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * GoldMiningAnchor — single-sentence Tier-1 anchor (Home only).
 *
 * Plan v3 §4A.2. Hands the reader an intuitive picture of "10 layers"
 * before any code or layer label appears. Full analogy lives on
 * /framework#gold-mining.
 */

const GoldMiningAnchor = () => (
  <section
    aria-label="Gold mining analogy — one-line anchor"
    className="bg-background border-y border-foreground/10"
  >
    <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
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
    </div>
  </section>
);

export default GoldMiningAnchor;
