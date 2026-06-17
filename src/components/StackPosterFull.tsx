import { LAYERS, layerColor } from "@/data/layers";
import ExportablePng from "@/components/ExportablePng";

/**
 * StackPosterFull — the dense, shareable "whole stack on one page" artifact.
 * Each row = one layer (chip on the left, 5 sublayer cells on the right) in
 * the layer's color tinted shades. Designed for LinkedIn/X share + as a
 * pin-on-the-wall reference. Reads from src/data/layers.ts.
 */
const StackPosterFull = () => {
  // Top → bottom: L8 → L-1 (matches the stack mental model)
  const ordered = [...LAYERS].reverse();

  return (
    <ExportablePng
      fileName="scoi-stack-full-poster"
      caption="The 10 Layers × 50 Sublayers"
      exportBackground="hsl(40 30% 97%)"
    >
      <div
        className="w-full mx-auto p-5 md:p-7"
        style={{
          background:
            "linear-gradient(160deg, hsl(40 30% 97%) 0%, hsl(38 26% 94%) 100%)",
        }}
      >
        {/* Header */}
        <div className="mb-4 md:mb-5 flex items-end justify-between gap-4 border-b border-foreground/15 pb-3">
          <div>
            <p className="font-mono-marker text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-accent">
              The Supply Chain of Intelligence™ (SCoI)
            </p>
            <h2 className="font-display text-xl md:text-2xl leading-tight text-foreground mt-1">
              The 10 layers · 50 sublayers of the generative AI stack.
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <p className="font-mono-marker text-[9px] tracking-[0.18em] uppercase text-foreground/60">
              SCoAI · SHEET 01/01
            </p>
            <p className="font-sketch text-[11px] italic text-muted-foreground mt-0.5">
              Not logistics. The AI stack.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="flex flex-col gap-[5px]">
          {ordered.map((layer) => {
            const c = layerColor(layer.id);
            return (
              <div
                key={layer.id}
                className="grid grid-cols-[110px_1fr] md:grid-cols-[140px_1fr] gap-[5px] items-stretch"
              >
                {/* Layer chip (left) */}
                <div
                  className="rounded-md px-2.5 py-2 flex flex-col justify-center"
                  style={{ background: c }}
                >
                  <div className="font-mono-marker text-white text-[11px] md:text-[13px] font-bold tracking-wider leading-none">
                    {layer.id}
                  </div>
                  <div className="font-display text-white text-[12px] md:text-sm leading-tight mt-0.5">
                    {layer.shortName}
                  </div>
                  <div className="font-sketch text-white/75 text-[9px] md:text-[10px] italic mt-0.5 truncate">
                    {layer.name !== layer.shortName ? layer.name : ""}
                  </div>
                </div>

                {/* 5 Sublayer cells (right) — progressively lighter shades of layer color */}
                <div className="grid grid-cols-5 gap-[5px]">
                  {layer.sublayers.slice(0, 5).map((s, idx) => {
                    // Only the BACKGROUND shifts in shade — text stays in
                    // readable foreground tones so the sublayer name is always
                    // legible. Lighter as you move right (0.28 → 0.10).
                    const bgAlpha = 0.38 - idx * 0.055; // 0.38 → 0.16
                    // Build hsl(var(--layer-X) / alpha) — must replace the
                    // LAST ')' so the alpha sits inside the outer hsl(...).
                    const tinted = `hsla(0,0%,0%,0)`; // fallback
                    const inner = layer.id === "L-1" ? "neg1" : layer.id.replace("L", "");
                    const bg = `hsl(var(--layer-${inner}) / ${bgAlpha})`;
                    return (
                      <div
                        key={s.id}
                        className="rounded-md px-2 py-2 flex flex-col justify-center min-w-0"
                        style={{ background: bg }}
                        title={s.desc}
                      >
                        <div className="font-mono-marker text-[9px] md:text-[10px] tracking-wider font-bold leading-none flex items-center gap-1 text-foreground/70">
                          <span>{s.id}</span>
                          {s.defensible && <span className="text-accent">★</span>}
                        </div>
                        <div className="font-display text-foreground text-[11px] md:text-[12.5px] leading-tight mt-1 line-clamp-2">
                          {s.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-4 md:mt-5 pt-3 border-t border-foreground/15 flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-sketch text-[11px] md:text-xs text-muted-foreground italic">
            ★ = structurally defensible sublayer. Below L1 = foundation. Above = where intelligence compounds.
          </p>
          <p className="font-mono-marker text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-foreground/60">
            Anand Arivukkarasu · SupplyChainOfAI.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default StackPosterFull;
