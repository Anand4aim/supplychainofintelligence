import ExportablePng from "@/components/ExportablePng";
import { LAYERS } from "@/data/layers";

/**
 * The "what is this framework" poster. Designed for first-time visitors to
 * screenshot and share, 10 layers with a one-liner each + 4 laws strip +
 * tagline + URL. Editorial, copyable, no author promo.
 */

const LAWS = [
  { num: "I", t: "Intelligence commoditizes downward." },
  { num: "II", t: "Value accrues at bottlenecks." },
  { num: "III", t: "Surface captures attention; chain captures power." },
  { num: "IV", t: "Generation and verification must be separate." },
];

const FrameworkSummaryPoster = () => {
  const INK = "#0F172A";
  const PAPER = "#F4ECD8";
  const GOLD = "#C9A84C";
  const MUTED = "#94A3B8";
  const ordered = [...LAYERS].reverse(); // L8 at top

  return (
    <ExportablePng
      fileName="scoi-framework-at-a-glance"
      caption="The Framework, At a Glance"
      exportBackground={INK}
    >
      <div
        className="w-full mx-auto px-7 md:px-12 py-10 md:py-12"
        style={{ background: INK, color: PAPER, fontFamily: "Inter, sans-serif" }}
      >
        {/* Header */}
        <div className="mb-7 md:mb-8">
          <p
            className="text-[10px] md:text-[11px] font-bold uppercase mb-2"
            style={{ color: GOLD, letterSpacing: "0.28em" }}
          >
            The Framework · At a Glance
          </p>
          <h2
            className="leading-[1.05] font-bold"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(26px, 4.4vw, 48px)",
              color: PAPER,
            }}
          >
            The Supply Chain of Intelligence™
          </h2>
          <p
            className="mt-2 text-[12px] md:text-[14px]"
            style={{ color: "#CBD5E1", fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            The 10 layers of the generative AI stack, not logistics, not freight.
          </p>
        </div>

        {/* 10 layers */}
        <div className="flex flex-col gap-1.5 mb-7">
          {ordered.map((l) => {
            const idLabel = l.id === "L-1" ? "L\u22121" : l.id;
            const num = l.id === "L-1" ? "neg1" : l.id.replace("L", "");
            const cssVar = `--layer-${num}`;
            return (
              <div
                key={l.id}
                className="grid grid-cols-[58px_92px_1fr] md:grid-cols-[64px_120px_1fr] gap-3 md:gap-4 items-center rounded-md p-2.5 md:p-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderLeft: `3px solid hsl(var(${cssVar}))`,
                }}
              >
                <span
                  className="font-bold text-center"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: `hsl(var(${cssVar}))`,
                    fontSize: "15px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {idLabel}
                </span>
                <span
                  className="font-bold leading-tight"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: PAPER,
                    fontSize: "15px",
                  }}
                >
                  {l.shortName}
                </span>
                <span
                  className="text-[11px] md:text-[12.5px] leading-snug"
                  style={{ color: "#CBD5E1" }}
                >
                  {l.desc}
                </span>
              </div>
            );
          })}
        </div>

        {/* 4 laws strip */}
        <div
          className="p-4 md:p-5 rounded-md"
          style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)" }}
        >
          <p
            className="text-[10px] md:text-[11px] font-bold uppercase mb-3"
            style={{ color: GOLD, letterSpacing: "0.22em" }}
          >
            The Four Structural Laws
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            {LAWS.map((law) => (
              <div key={law.num} className="flex gap-2.5 items-baseline">
                <span
                  className="font-bold leading-none shrink-0"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: GOLD,
                    fontSize: "20px",
                  }}
                >
                  {law.num}
                </span>
                <p
                  className="text-[12px] md:text-[13.5px] leading-snug"
                  style={{ color: PAPER, fontFamily: "'Playfair Display', serif" }}
                >
                  {law.t}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-6 pt-4 flex flex-wrap items-baseline justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p className="text-[11px] italic" style={{ color: MUTED, fontFamily: "'Playfair Display', serif" }}>
            10 layers · 50 sublayers · 4 laws. The map for every AI strategy conversation.
          </p>
          <p
            className="text-[9px] md:text-[10px] font-bold uppercase"
            style={{ color: MUTED, letterSpacing: "0.18em", fontFamily: "'JetBrains Mono', monospace" }}
          >
            SupplyChainOfAI.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default FrameworkSummaryPoster;
