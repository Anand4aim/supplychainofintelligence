import ExportablePng from "@/components/ExportablePng";

const LAWS = [
  {
    num: "I",
    title: "Intelligence Commoditizes Downward",
    line: "Wrappers don't survive. Wrappers become features.",
    layerHint: "L7-only → absorbed by L2",
  },
  {
    num: "II",
    title: "Value Accrues at Bottlenecks",
    line: "Find the scarce layer. Own it. Everything else is rent.",
    layerHint: "L1b · L3 · L8",
  },
  {
    num: "III",
    title: "Surface Captures Attention; Chain Captures Power",
    line: "Beautiful UIs get users. Deep chains keep them.",
    layerHint: "L4 + L5 + L6 + L8",
  },
  {
    num: "IV",
    title: "Memory Is the Final Moat",
    line: "What the system remembers about the user, no one else can rebuild.",
    layerHint: "L8 compounds",
  },
];

const FourLawsPoster = () => {
  const NAVY = "#0F172A";
  const CREAM = "#F1E9D8";
  const GOLD = "#D4A84B";
  const MUTED = "#94A3B8";

  return (
    <ExportablePng
      fileName="scoi-four-laws"
      caption="The 4 Structural Laws"
      exportBackground={NAVY}
    >
      <div
        className="w-full mx-auto px-8 md:px-12 py-10 md:py-14"
        style={{ background: NAVY, color: CREAM, fontFamily: "Inter, sans-serif" }}
      >
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <p
            className="text-[10px] md:text-[11px] font-bold uppercase mb-2"
            style={{ color: GOLD, letterSpacing: "0.28em" }}
          >
            The Physics of the Stack
          </p>
          <h2
            className="leading-tight font-bold"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4.5vw, 52px)",
              color: CREAM,
            }}
          >
            The Four Structural Laws.
          </h2>
          <div className="h-[2px] w-16 mt-4" style={{ background: GOLD }} />
        </div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {LAWS.map((law) => (
            <div
              key={law.num}
              className="p-5 md:p-6 rounded-md"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid rgba(255,255,255,0.08)`,
              }}
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span
                  className="font-bold leading-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: GOLD,
                    fontSize: "44px",
                  }}
                >
                  {law.num}
                </span>
                <span
                  className="text-[10px] font-bold uppercase"
                  style={{ color: MUTED, letterSpacing: "0.2em" }}
                >
                  Law {law.num}
                </span>
              </div>
              <h3
                className="text-[16px] md:text-[19px] font-bold mb-2 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", color: CREAM }}
              >
                {law.title}
              </h3>
              <p className="text-[13px] md:text-[14px] leading-snug" style={{ color: "#CBD5E1" }}>
                {law.line}
              </p>
              <p
                className="text-[10px] mt-3 font-bold uppercase"
                style={{ color: GOLD, letterSpacing: "0.18em", fontFamily: "'JetBrains Mono', monospace" }}
              >
                {law.layerHint}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 pt-4 flex flex-wrap items-baseline justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p className="text-[11px] md:text-xs italic" style={{ color: MUTED, fontFamily: "'Playfair Display', serif" }}>
            Laws describe what the market will do — not what you wish it would do.
          </p>
          <p
            className="text-[9px] md:text-[10px] font-bold uppercase"
            style={{ color: MUTED, letterSpacing: "0.15em", fontFamily: "'JetBrains Mono', monospace" }}
          >
            Anand Arivukkarasu · SupplyChainOfAI.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default FourLawsPoster;
