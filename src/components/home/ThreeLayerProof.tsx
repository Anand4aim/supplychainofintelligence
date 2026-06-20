import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import LogoTile from "@/components/LogoTile";

/**
 * ThreeLayerProof, the new spine of the Home page (plan v3 §4A.3).
 *
 * Tier 1 → 2 → 3 ordering:
 *   1. Plain-English headline (stakes first)
 *   2. Three logo tiles: Bloomberg, Harvey, Sierra
 *   3. Tiny caption naming the codes (L1 · L5 · L8), reference grammar
 *
 * This replaces the old "Start Here · 5 beats" strip as the first
 * concept the reader meets after the hero + gold-mining anchor.
 */

const VERTICES = [
  {
    name: "Bloomberg",
    layer: "L1",
    role: "the data",
    caption: "Owns the data nobody else can buy.",
  },
  {
    name: "Harvey",
    layer: "L5",
    role: "the work",
    caption: "Built deep inside the legal workflow, still contested by Claude.",
  },
  {
    name: "Sierra",
    layer: "L8",
    role: "the memory",
    caption: "Accumulates per-customer memory that makes leaving costly.",
  },
] as const;

const ThreeLayerProof = () => (
  <section
    aria-label="Three-layer proof, Bloomberg, Harvey, Sierra"
    className="bg-secondary/30 border-y border-foreground/10"
  >
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
      <div className="max-w-3xl mb-10">
        <Eyebrow tone="accent" className="mb-3">The 30-second aha</Eyebrow>
        <h2 className="font-display text-[26px] md:text-[36px] font-bold text-foreground leading-[1.15]">
          Three companies. Three different layers.{" "}
          <span className="text-accent">Three different ways to be hard to displace.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {VERTICES.map((v) => (
          <div key={v.name} className="flex flex-col">
            <LogoTile name={v.name} layer={v.layer} size="lg" />
            <div className="mt-4 px-1">
              <p className="font-mono-marker text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-1.5">
                {v.role}
              </p>
              <p className="font-display text-[15px] md:text-[16px] text-foreground/90 leading-snug">
                {v.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tier 3, codes, small, last */}
      <p className="mt-10 text-[13px] md:text-[14px] text-muted-foreground leading-relaxed max-w-3xl">
        In the framework:{" "}
        <span className="font-mono-marker tracking-[0.08em]">L1 Data</span> ·{" "}
        <span className="font-mono-marker tracking-[0.08em]">L5 Execution</span> ·{" "}
        <span className="font-mono-marker tracking-[0.08em]">L8 Memory</span>.
        Own the three corners and you&rsquo;ve built the{" "}
        <Link to="/framework#triangle" className="text-accent underline-offset-2 hover:underline">
          Defensible Triangle
        </Link>
        .
      </p>

      <div className="mt-6">
        <Link to="/framework" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2 transition-all">
          See the full framework <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  </section>
);

export default ThreeLayerProof;
