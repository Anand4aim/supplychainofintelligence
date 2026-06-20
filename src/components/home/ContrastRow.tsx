import LogoTile from "@/components/LogoTile";
import Eyebrow from "@/components/Eyebrow";

/**
 * ContrastRow, Jasper vs Cursor stakes panel (plan v3 §4A.4).
 *
 * The "why should I care" beat on Home. Same job (writing software /
 * writing copy with AI). Different layers owned. Different fate.
 */

const ContrastRow = () => (
  <section
    aria-label="Jasper vs Cursor, same job, different layers, different fate"
    className="bg-background border-b border-foreground/10"
  >
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
      <div className="max-w-3xl mb-8">
        <Eyebrow tone="accent" className="mb-3">Same job. Different fate.</Eyebrow>
        <h2 className="font-display text-[24px] md:text-[32px] font-bold text-foreground leading-tight">
          Two AI-native products. Same wave. Opposite trajectories.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Jasper, single layer, collapsed */}
        <div className="rounded-xl border border-border bg-card p-6 md:p-7">
          <div className="flex items-start gap-4 mb-4">
            <LogoTile name="Jasper" layer="L7" size="sm" />
            <div className="flex-1 pt-1">
              <p className="font-mono-marker text-[10px] tracking-[0.18em] uppercase text-orange-600 mb-1">
                Sat on one layer
              </p>
              <p className="font-display text-[22px] md:text-[26px] font-bold text-foreground leading-tight">
                $1.5B <span className="text-muted-foreground font-normal">→</span> ~$300M
              </p>
            </div>
          </div>
          <p className="text-[14px] text-foreground/80 leading-relaxed">
            A thin UX layer over a general model. When the model owners
            shipped the same surface for free, there was nothing structural
            left to defend.
          </p>
          <p className="mt-4 pt-4 border-t border-border font-mono-marker text-[10px] tracking-[0.14em] text-muted-foreground">
            LAYERS OWNED · L7 only
          </p>
        </div>

        {/* Cursor, four layers, compounding */}
        <div className="rounded-xl border border-accent/40 bg-card p-6 md:p-7">
          <div className="flex items-start gap-4 mb-4">
            <LogoTile name="Cursor" layer="L5" size="sm" />
            <div className="flex-1 pt-1">
              <p className="font-mono-marker text-[10px] tracking-[0.18em] uppercase text-emerald-600 mb-1">
                Owned four layers
              </p>
              <p className="font-display text-[22px] md:text-[26px] font-bold text-foreground leading-tight">
                $9B+ <span className="text-muted-foreground font-normal text-[15px]">and compounding</span>
              </p>
            </div>
          </div>
          <p className="text-[14px] text-foreground/80 leading-relaxed">
            Owns the IDE workflow, the indexing pipeline, the agent loop,
            and the project memory. Every layer reinforces the others  - 
            the model is the only commodity in the stack.
          </p>
          <p className="mt-4 pt-4 border-t border-border font-mono-marker text-[10px] tracking-[0.14em] text-muted-foreground">
            LAYERS OWNED · L4 · L5 · L6 · L8
          </p>
        </div>
      </div>

      <p className="mt-8 text-[15px] md:text-[16px] text-foreground/85 leading-relaxed max-w-2xl">
        <span className="font-display italic">Same job. Different layers. Different fate.</span>{" "}
        The map below shows which layers compound and which collapse.
      </p>
    </div>
  </section>
);

export default ContrastRow;
