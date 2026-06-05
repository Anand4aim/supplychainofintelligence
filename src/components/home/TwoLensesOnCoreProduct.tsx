import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";

/**
 * TwoLensesOnCoreProduct — cold-open slide 2.
 *
 * On Core Product, you need TWO lenses, not one. Most teams only use the
 * first (user-side / JTBD) and end up with a real user but a wrapper that
 * a platform absorbs in a release cycle. The second lens — Intelligence —
 * is what this framework adds.
 *
 * Single most important section on the site: in one screen, it tells you
 * what the framework is FOR.
 */

const TwoLensesOnCoreProduct = () => (
  <section
    aria-label="Two lenses for evaluating AI core products"
    className="bg-secondary/30 border-y border-foreground/10"
  >
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
      <div className="max-w-3xl mb-10">
        <Eyebrow tone="accent" className="mb-3">Two Lenses · 02</Eyebrow>
        <h2 className="font-display text-[26px] md:text-[36px] font-bold text-foreground leading-[1.15]">
          On Core Product, you need{" "}
          <span className="text-accent">two lenses — not one.</span>
        </h2>
        <p className="text-foreground/75 mt-3 text-[15px] md:text-[16px] leading-relaxed">
          Most teams only use the first lens. They ship a real user need,
          score a viral launch, and then a platform absorbs them in a
          release cycle. The second lens is what this framework adds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-4 items-stretch">
        {/* Lens 1 — User */}
        <div className="p-6 md:p-7 rounded-xl border border-border bg-card flex flex-col">
          <div className="flex items-baseline justify-between mb-4">
            <span className="font-mono-marker text-[11px] tracking-[0.18em] text-muted-foreground">
              LENS 01
            </span>
            <span className="font-mono-marker text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
              Necessary
            </span>
          </div>
          <h3 className="font-display text-[21px] md:text-[24px] font-bold text-foreground leading-snug mb-2">
            The User Lens
          </h3>
          <p className="font-sketch text-[14px] italic text-muted-foreground mb-4">
            JTBD · NMBA · ICP · positioning
          </p>
          <p className="text-[14.5px] text-foreground/80 leading-relaxed mb-4">
            What job is the user hiring this for? What&rsquo;s the next most
            valuable action? Who exactly is the buyer? This lens finds{" "}
            <strong className="text-foreground">demand</strong>.
          </p>
          <div className="mt-auto pt-4 border-t border-foreground/10">
            <p className="font-sketch text-[14px] italic text-foreground/70">
              Tells you <span className="text-foreground font-semibold not-italic">if anyone wants it.</span>
            </p>
          </div>
        </div>

        {/* Connector */}
        <div className="hidden md:flex items-center justify-center font-mono-marker text-[12px] tracking-[0.2em] text-accent">
          +
        </div>
        <div className="md:hidden flex items-center justify-center font-mono-marker text-[12px] tracking-[0.2em] text-accent">
          +
        </div>

        {/* Lens 2 — Intelligence */}
        <div className="p-6 md:p-7 rounded-xl border-2 border-accent bg-accent/5 flex flex-col shadow-[0_8px_30px_-12px_hsl(var(--accent)/0.35)]">
          <div className="flex items-baseline justify-between mb-4">
            <span className="font-mono-marker text-[11px] tracking-[0.18em] text-accent">
              LENS 02
            </span>
            <span className="font-mono-marker text-[10px] tracking-[0.18em] uppercase text-accent">
              The missing one
            </span>
          </div>
          <h3 className="font-display text-[21px] md:text-[24px] font-bold text-foreground leading-snug mb-2">
            The Intelligence Lens
          </h3>
          <p className="font-sketch text-[14px] italic text-muted-foreground mb-4">
            10 layers · 50 sublayers · defensibility
          </p>
          <p className="text-[14.5px] text-foreground/80 leading-relaxed mb-4">
            Which of the 10 layers does your product actually own?
            Data? Workflow? Memory? Or are you a thin surface on
            someone else&rsquo;s model? This lens proves{" "}
            <strong className="text-foreground">defensibility</strong>.
          </p>
          <div className="mt-auto pt-4 border-t border-accent/30">
            <p className="font-sketch text-[14px] italic text-foreground/70">
              Tells you <span className="text-accent font-semibold not-italic">whether you survive the next platform release.</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 max-w-3xl">
        <p className="text-[15px] md:text-[16px] text-foreground/85 leading-relaxed">
          User Lens without Intelligence Lens →{" "}
          <span className="text-foreground font-semibold">a wrapper with traction.</span>{" "}
          Both lenses together →{" "}
          <span className="text-accent font-semibold">a moat with users.</span>
        </p>
        <Link
          to="/framework"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2 transition-all"
        >
          See the 10 layers <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  </section>
);

export default TwoLensesOnCoreProduct;
