import { LAYERS, layerColor } from "@/data/layers";
import ExportablePng from "@/components/ExportablePng";

/**
 * HeroBrandPoster, the magazine-cover hero. Dark navy, gold accent,
 * 10 layer chips in a single row, with the "above / below the line"
 * mental model drawn underneath. This is the canonical scroll-stopper
 * for LinkedIn / X.
 */
const HeroBrandPoster = () => {
  const NAVY = "#0F172A";
  const CREAM = "#F1E9D8";
  const GOLD = "#D4A84B";
  const MUTED = "#94A3B8";

  return (
    <ExportablePng
      fileName="scoi-hero-brand"
      caption="The Framework"
      exportBackground={NAVY}
    >
      <div
        className="w-full mx-auto px-8 md:px-14 py-12 md:py-16"
        style={{ background: NAVY, color: CREAM, fontFamily: "Inter, sans-serif" }}
      >
        {/* Eyebrow */}
        <p
          className="text-[10px] md:text-[12px] font-bold uppercase mb-2"
          style={{ color: GOLD, letterSpacing: "0.32em" }}
        >
          A Framework for AI Defensibility
        </p>
        <div className="h-px w-20 mb-8 md:mb-10" style={{ background: GOLD }} />

        {/* Headline */}
        <h1
          className="leading-[0.95] mb-6 md:mb-7"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(40px, 7vw, 88px)",
            color: CREAM,
          }}
        >
          The Supply Chain<br />of Intelligence.
        </h1>
        <p className="text-base md:text-lg mb-10 md:mb-12" style={{ color: MUTED }}>
          10 layers · 50 sublayers · 4 structural laws
        </p>

        {/* Layer chips row */}
        <div className="flex gap-2 md:gap-3 w-full">
          {LAYERS.map((layer) => {
            const c = layerColor(layer.id);
            return (
              <div
                key={layer.id}
                className="flex-1 aspect-square rounded-md flex items-center justify-center"
                style={{ background: c }}
              >
                <span
                  className="font-bold tracking-wider text-white text-[13px] md:text-[18px]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {layer.id}
                </span>
              </div>
            );
          })}
        </div>

        {/* The line */}
        <div className="mt-3 md:mt-4 flex gap-2 md:gap-3">
          <div className="flex-1 flex flex-col items-center" style={{ flex: 2 }}>
            <div
              className="w-full h-px"
              style={{
                borderTop: `1px dashed ${MUTED}`,
              }}
            />
            <p
              className="mt-3 text-[11px] md:text-[13px] italic"
              style={{ color: MUTED, fontFamily: "'Playfair Display', serif" }}
            >
              below the line
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center" style={{ flex: 8 }}>
            <div className="w-full h-[2px]" style={{ background: GOLD }} />
            <p
              className="mt-3 text-[11px] md:text-[13px] italic"
              style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}
            >
              above the line, where intelligence compounds
            </p>
          </div>
        </div>

        {/* Footer attribution */}
        <div className="mt-12 md:mt-16">
          <div className="h-[2px] w-16 mb-3" style={{ background: GOLD }} />
          <p className="text-[12px] md:text-[13px]" style={{ color: MUTED }}>
            By Anand Arivukkarasu · supplychainofai.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default HeroBrandPoster;
