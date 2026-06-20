import ExportablePng from "@/components/ExportablePng";
import { LAYERS, layerColor } from "@/data/layers";

/**
 * 10 layers told as one extended gold-mining metaphor.
 * Most teachable poster for non-technical audiences.
 */
const GoldMiningPoster = () => {
  // Top-down: L8 → L-1
  const ordered = [...LAYERS].reverse();

  return (
    <ExportablePng
      fileName="scoi-gold-mining"
      caption="The Gold Mining Analogy"
      exportBackground="hsl(40 30% 97%)"
    >
      <div
        className="w-full mx-auto px-7 md:px-10 py-10 md:py-12"
        style={{
          background:
            "linear-gradient(160deg, hsl(40 30% 97%) 0%, hsl(38 26% 94%) 100%)",
        }}
      >
        {/* Header */}
        <div className="mb-8 border-b border-foreground/15 pb-4">
          <p className="font-mono-marker text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-accent">
            For Non-Technical Readers
          </p>
          <h2 className="font-display text-2xl md:text-[34px] leading-[1.1] text-foreground mt-1 font-bold">
            The Supply Chain of Intelligence,<br className="hidden md:block" /> told as a gold mine.
          </h2>
        </div>

        {/* Layer rows */}
        <div className="flex flex-col gap-2">
          {ordered.map((l) => {
            const c = layerColor(l.id);
            return (
              <div
                key={l.id}
                className="grid grid-cols-[80px_1fr] md:grid-cols-[110px_1fr] gap-3 items-stretch"
              >
                <div
                  className="rounded-md px-3 py-2 flex flex-col justify-center"
                  style={{ background: c }}
                >
                  <div className="font-mono-marker text-white text-[12px] md:text-[14px] font-bold leading-none">
                    {l.id}
                  </div>
                  <div className="font-display text-white text-[11px] md:text-[13px] leading-tight mt-1">
                    {l.shortName}
                  </div>
                </div>
                <div
                  className="rounded-md px-3 md:px-4 py-2 md:py-2.5 border"
                  style={{
                    background: "hsl(40 25% 99%)",
                    borderColor: "hsl(var(--foreground) / 0.08)",
                  }}
                >
                  <p className="font-display text-[13px] md:text-[15px] font-bold text-foreground leading-tight">
                    {l.goldTitle}
                  </p>
                  <p className="text-[11px] md:text-[12px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">
                    {l.goldAnalogy.split(". ")[0]}.
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-foreground/15 flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-sketch text-[11px] md:text-xs text-muted-foreground italic">
            Every gold rush enriches the shovel sellers, the assayers, and the refiners, long after the miners are gone.
          </p>
          <p className="font-mono-marker text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-foreground/60">
            Anand Arivukkarasu · SupplyChainOfAI.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default GoldMiningPoster;
