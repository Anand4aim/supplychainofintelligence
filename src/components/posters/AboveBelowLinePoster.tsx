import { LAYERS, layerColor } from "@/data/layers";
import ExportablePng from "@/components/ExportablePng";

/**
 * Above / Below the line, the single most teachable diagram in the
 * framework. Foundation (L-1, L0) sits below the line; everything
 * above compounds into intelligence.
 */
const AboveBelowLinePoster = () => {
  const below = LAYERS.filter((l) => l.id === "L-1" || l.id === "L0");
  const above = LAYERS.filter((l) => l.id !== "L-1" && l.id !== "L0");

  return (
    <ExportablePng
      fileName="scoi-above-below-line"
      caption="Above / Below the Line"
      exportBackground="hsl(40 30% 97%)"
    >
      <div
        className="w-full mx-auto px-8 md:px-12 py-10 md:py-14"
        style={{
          background:
            "linear-gradient(160deg, hsl(40 30% 97%) 0%, hsl(38 26% 94%) 100%)",
        }}
      >
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <p className="font-mono-marker text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-accent">
            The Mental Model
          </p>
          <h2 className="font-display text-2xl md:text-[36px] leading-[1.1] text-foreground mt-1 font-bold">
            Above the line, intelligence compounds.<br className="hidden md:block" />
            Below the line, the inputs get consumed.
          </h2>
        </div>

        {/* ABOVE block */}
        <div className="mb-6">
          <div className="flex items-baseline justify-between mb-3">
            <p className="font-mono-marker text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-accent font-bold">
              ▲ Above, value compounds
            </p>
            <p className="font-sketch text-[11px] italic text-muted-foreground">
              data · trust · distribution · workflow · context · surface · memory
            </p>
          </div>
          <div className="grid grid-cols-8 gap-2">
            {above.map((l) => {
              const c = layerColor(l.id);
              return (
                <div
                  key={l.id}
                  className="rounded-md p-2.5 md:p-3 flex flex-col justify-between min-h-[80px] md:min-h-[110px]"
                  style={{ background: c }}
                >
                  <div className="font-mono-marker text-white text-[12px] md:text-[15px] font-bold leading-none">
                    {l.id}
                  </div>
                  <div className="font-display text-white text-[11px] md:text-[14px] leading-tight">
                    {l.shortName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* THE LINE */}
        <div className="relative my-6 md:my-8">
          <div className="h-[2px] w-full" style={{ background: "hsl(var(--accent))" }} />
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded"
            style={{ background: "hsl(40 30% 97%)" }}
          >
            <span
              className="font-mono-marker text-[10px] tracking-[0.22em] uppercase font-bold"
              style={{ color: "hsl(var(--accent))" }}
            >
              The Line
            </span>
          </div>
        </div>

        {/* BELOW block */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <p className="font-mono-marker text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-muted-foreground font-bold">
              ▼ Below, inputs the chain consumes
            </p>
            <p className="font-sketch text-[11px] italic text-muted-foreground">
              power · water · fabs · chips · data centers
            </p>
          </div>
          <div className="grid grid-cols-8 gap-2">
            {below.map((l) => {
              const c = layerColor(l.id);
              return (
                <div
                  key={l.id}
                  className="rounded-md p-2.5 md:p-3 flex flex-col justify-between min-h-[80px] md:min-h-[110px] col-span-4"
                  style={{ background: c }}
                >
                  <div className="font-mono-marker text-white text-[12px] md:text-[15px] font-bold leading-none">
                    {l.id}
                  </div>
                  <div className="font-display text-white text-[12px] md:text-[15px] leading-tight">
                    {l.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-4 border-t border-foreground/15 flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-sketch text-[11px] md:text-xs text-muted-foreground italic">
            Below the line is consumed. Above the line is accumulated. Build above. Hedge below.
          </p>
          <p className="font-mono-marker text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-foreground/60">
            Anand Arivukkarasu · SupplyChainOfAI.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default AboveBelowLinePoster;
