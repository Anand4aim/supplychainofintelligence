import { layerVar } from "@/data/layers";

// Editorial hero visual for the "5 Frameworks Every AI Product Leader Should Know" post.
// SCOI sits on top as the largest, multi-layered band (showing the 10-layer DNA).
// The other four frameworks render as quieter, monochrome bands beneath it  - 
// each labeled with the strategic *lens* it uses.
//
// Pure CSS / design tokens, no raster image. Safe for dark + light + SSR.

const FRAMEWORKS = [
  { name: "Jobs to be Done", lens: "User / Outcome lens", year: "1990s · Christensen, Ulwick" },
  { name: "Wardley Mapping", lens: "Evolution / Strategy lens", year: "2005 · Simon Wardley" },
  { name: "Aggregation Theory", lens: "Demand / Distribution lens", year: "2015 · Ben Thompson" },
  { name: "AI TRiSM", lens: "Risk / Governance lens", year: "2023 · Gartner" },
];

const LAYER_IDS = ["L-1", "L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"];

const FrameworkComparisonHero = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-md border border-foreground/15 bg-[#0F172A] text-[#F1E9D8]">
      <div className="px-6 md:px-10 py-10 md:py-14">
        {/* Eyebrow */}
        <p
          className="font-mono-marker text-[10px] md:text-[11px] uppercase mb-3"
          style={{ color: "#D4A84B", letterSpacing: "0.28em" }}
        >
          The Strategy Stack · 2026
        </p>
        <h3
          className="font-display font-bold leading-[1.05] mb-2"
          style={{ fontSize: "clamp(24px, 4vw, 44px)" }}
        >
          Five frameworks. Five lenses.
        </h3>
        <p
          className="font-display italic leading-snug mb-8 md:mb-10 max-w-2xl"
          style={{ color: "#94A3B8", fontSize: "clamp(14px, 1.6vw, 18px)" }}
        >
          Each one looks at the AI product through a different aperture. Only one maps the stack
          underneath.
        </p>

        {/* SCOI band, the hero */}
        <div className="mb-3 relative">
          <div
            className="relative rounded-md overflow-hidden border"
            style={{
              borderColor: "rgba(244, 232, 215, 0.18)",
              background:
                "linear-gradient(180deg, rgba(79,70,229,0.18) 0%, rgba(79,70,229,0.06) 100%)",
            }}
          >
            {/* 10 thin colored stripes */}
            <div className="flex w-full" style={{ height: "14px" }}>
              {LAYER_IDS.map((id) => (
                <div
                  key={id}
                  className="flex-1"
                  style={{ background: `hsl(var(${layerVar(id)}))` }}
                />
              ))}
            </div>

            <div className="px-5 md:px-7 py-6 md:py-7">
              <div className="flex items-baseline gap-3 flex-wrap mb-1">
                <span
                  className="font-mono-marker text-[9px] md:text-[10px] uppercase"
                  style={{ color: "#D4A84B", letterSpacing: "0.2em" }}
                >
                  ◆ Featured · 2026
                </span>
                <span
                  className="font-mono-marker text-[9px] md:text-[10px]"
                  style={{ color: "#94A3B8" }}
                >
                  Anand Arivukkarasu
                </span>
              </div>
              <h4
                className="font-display font-bold leading-tight mb-1"
                style={{ fontSize: "clamp(20px, 2.8vw, 32px)", color: "#F1E9D8" }}
              >
                Supply Chain of Intelligence™
              </h4>
              <p
                className="text-sm md:text-base italic"
                style={{ color: "#C7D2FE" }}
              >
                Stack &amp; Intelligence lens, 10 layers, 50 sublayers, 4 structural laws.
              </p>
            </div>
          </div>
        </div>

        {/* The other four, quieter, monochrome */}
        <div className="space-y-2">
          {FRAMEWORKS.map((f) => (
            <div
              key={f.name}
              className="flex items-baseline justify-between gap-4 px-5 py-3 rounded-sm border"
              style={{
                background: "rgba(241, 233, 216, 0.04)",
                borderColor: "rgba(241, 233, 216, 0.1)",
              }}
            >
              <div className="min-w-0">
                <p
                  className="font-display font-semibold leading-tight"
                  style={{ fontSize: "clamp(14px, 1.6vw, 18px)", color: "#F1E9D8" }}
                >
                  {f.name}
                </p>
                <p
                  className="text-xs italic"
                  style={{ color: "#94A3B8" }}
                >
                  {f.lens}
                </p>
              </div>
              <p
                className="font-mono-marker text-[9px] md:text-[10px] uppercase whitespace-nowrap"
                style={{ color: "#94A3B8", letterSpacing: "0.16em" }}
              >
                {f.year}
              </p>
            </div>
          ))}
        </div>

        {/* Footer line */}
        <p
          className="font-mono-marker text-[9px] md:text-[10px] uppercase mt-8 text-center"
          style={{ color: "#94A3B8", letterSpacing: "0.22em" }}
        >
          Honest side-by-side · supplychainofai.com
        </p>
      </div>
    </div>
  );
};

export default FrameworkComparisonHero;
