import { LAYERS, layerColor } from "@/data/layers";
import ExportablePng from "@/components/ExportablePng";

/**
 * Minimal, iconic. Stack of 10 layer chips, three arrows:
 *   ↓ data flows down
 *   ↑ value flows up
 *   ↻ memory compounds recursively
 */
const GravityFlowPoster = () => {
  const ordered = [...LAYERS].reverse(); // L8 top → L-1 bottom
  const NAVY = "#0F172A";
  const CREAM = "#F1E9D8";
  const GOLD = "#D4A84B";
  const MUTED = "#94A3B8";

  return (
    <ExportablePng
      fileName="scoi-gravity-flow"
      caption="The Gravity Flow"
      exportBackground={NAVY}
    >
      <div
        className="w-full mx-auto aspect-square max-w-[720px] px-8 md:px-12 py-10 md:py-14 flex flex-col"
        style={{ background: NAVY, color: CREAM, fontFamily: "Inter, sans-serif" }}
      >
        {/* Header */}
        <div className="mb-6">
          <p className="text-[10px] md:text-[11px] font-bold uppercase mb-2" style={{ color: GOLD, letterSpacing: "0.28em" }}>
            How The Stack Moves
          </p>
          <h2
            className="leading-[1.05] font-bold"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4.5vw, 44px)", color: CREAM }}
          >
            The Gravity Flow.
          </h2>
        </div>

        {/* Body, 3 columns: data-arrow | stack | value-arrow */}
        <div className="flex-1 grid grid-cols-[60px_1fr_60px] md:grid-cols-[80px_1fr_80px] gap-3 md:gap-4 items-stretch">
          {/* Data arrow (down) */}
          <div className="flex flex-col items-center justify-between py-2">
            <span
              className="text-[10px] font-bold uppercase rotate-180"
              style={{ color: GOLD, letterSpacing: "0.2em", writingMode: "vertical-rl" }}
            >
              Data ↓
            </span>
            <div className="flex-1 w-px my-2" style={{ background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)` }} />
            <span style={{ color: GOLD, fontSize: "24px", lineHeight: 1 }}>▼</span>
          </div>

          {/* Stack */}
          <div className="flex flex-col gap-1.5">
            {ordered.map((l) => {
              const c = layerColor(l.id);
              const isMemory = l.id === "L8";
              return (
                <div
                  key={l.id}
                  className="rounded-md px-3 py-2 flex items-center justify-between relative"
                  style={{ background: c }}
                >
                  <span className="font-bold text-white text-[12px] md:text-[14px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {l.id}
                  </span>
                  <span className="font-display text-white text-[11px] md:text-[13px] opacity-90">
                    {l.shortName}
                  </span>
                  {isMemory && (
                    <span
                      className="absolute -right-1 -top-1 w-7 h-7 rounded-full flex items-center justify-center font-bold"
                      style={{ background: GOLD, color: NAVY, fontSize: "16px" }}
                      title="Memory compounds recursively"
                    >
                      ↻
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Value arrow (up) */}
          <div className="flex flex-col items-center justify-between py-2">
            <span style={{ color: GOLD, fontSize: "24px", lineHeight: 1 }}>▲</span>
            <div className="flex-1 w-px my-2" style={{ background: `linear-gradient(to top, transparent, ${GOLD}, transparent)` }} />
            <span
              className="text-[10px] font-bold uppercase"
              style={{ color: GOLD, letterSpacing: "0.2em", writingMode: "vertical-rl" }}
            >
              Value ↑
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-3 gap-3 md:gap-4">
          {[
            { sym: "↓", k: "DATA",   v: "flows down, training, fine-tuning, context fill." },
            { sym: "↑", k: "VALUE",  v: "flows up, margin accrues at orchestration & surface." },
            { sym: "↻", k: "MEMORY", v: "compounds, every interaction makes leaving more painful." },
          ].map((row) => (
            <div
              key={row.k}
              className="p-3 rounded-md"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span style={{ color: GOLD, fontSize: "18px", lineHeight: 1 }}>{row.sym}</span>
                <span
                  className="text-[10px] font-bold uppercase"
                  style={{ color: GOLD, letterSpacing: "0.2em", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {row.k}
                </span>
              </div>
              <p className="text-[11px] md:text-[12px]" style={{ color: "#CBD5E1" }}>
                {row.v}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 flex items-baseline justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p className="text-[11px] italic" style={{ color: MUTED, fontFamily: "'Playfair Display', serif" }}>
            Build where things accumulate. Not where they pass through.
          </p>
          <p
            className="text-[9px] md:text-[10px] font-bold uppercase whitespace-nowrap"
            style={{ color: MUTED, letterSpacing: "0.15em", fontFamily: "'JetBrains Mono', monospace" }}
          >
            SupplyChainOfAI.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default GravityFlowPoster;
