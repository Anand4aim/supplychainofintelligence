import ExportablePng from "@/components/ExportablePng";
import { layerColor } from "@/data/layers";

// Five GEO/AEO myths Google explicitly debunked in their Nov 2025
// "Optimizing your website for generative AI features" guide,
// reframed through the 10-layer stack. Left = snake oil. Right =
// what actually moves the needle, mapped to a layer.
const ROWS = [
  {
    myth: "Write llms.txt files for AI",
    googleSays: "Not a Google signal. No special treatment.",
    realMove: "Ship unique, expert content at L1b.",
    layer: "L1",
  },
  {
    myth: "Chunk your content for AI parsing",
    googleSays: "No ideal length. Systems read context.",
    realMove: "Write for humans. L7 is downstream of L1.",
    layer: "L7",
  },
  {
    myth: "Rewrite copy in 'AI-friendly' phrasing",
    googleSays: "Models understand synonyms and intent.",
    realMove: "First-hand POV beats keyword fitting.",
    layer: "L1",
  },
  {
    myth: "Farm inauthentic mentions across the web",
    googleSays: "Spam systems catch it. RAG ignores it.",
    realMove: "Earn citations through L3 trust gates.",
    layer: "L3",
  },
  {
    myth: "Pile on structured-data schema everywhere",
    googleSays: "Not required for generative search.",
    realMove: "Technical hygiene + indexability. That's it.",
    layer: "L2",
  },
];

const GoogleGeoMythPoster = () => {
  const NAVY = "#0F172A";
  const CREAM = "#F1E9D8";
  const GOLD = "#D4A84B";
  const MUTED = "#94A3B8";
  const RED = "#B45454";

  return (
    <ExportablePng
      fileName="scoi-google-geo-mythbuster"
      caption="What Google Actually Said About GEO/AEO"
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
            What Google Actually Said
          </p>
          <h2
            className="leading-[1.05] font-bold"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4.5vw, 52px)",
              color: CREAM,
            }}
          >
            GEO is just SEO.
            <br />
            <span style={{ color: GOLD }}>The five myths, debunked.</span>
          </h2>
          <p className="text-[13px] md:text-base mt-3" style={{ color: MUTED }}>
            Google's Nov 2025 generative-AI search guide, decoded through the 10-layer stack.
            Most of the "AEO/GEO playbook" being sold to founders is noise.
          </p>
          <div className="h-[2px] w-16 mt-4" style={{ background: GOLD }} />
        </div>

        {/* Column headers */}
        <div className="hidden md:grid grid-cols-[1fr_1fr_1fr] gap-3 mb-2 px-3">
          <p
            className="text-[10px] font-bold uppercase"
            style={{ color: RED, letterSpacing: "0.2em", fontFamily: "'JetBrains Mono', monospace" }}
          >
            The Myth Being Sold
          </p>
          <p
            className="text-[10px] font-bold uppercase"
            style={{ color: MUTED, letterSpacing: "0.2em", fontFamily: "'JetBrains Mono', monospace" }}
          >
            What Google Says
          </p>
          <p
            className="text-[10px] font-bold uppercase"
            style={{ color: GOLD, letterSpacing: "0.2em", fontFamily: "'JetBrains Mono', monospace" }}
          >
            What Actually Wins · By Layer
          </p>
        </div>

        {/* Myth rows */}
        <div className="flex flex-col gap-2.5">
          {ROWS.map((r, i) => {
            const c = layerColor(r.layer);
            return (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-3 md:gap-4 items-stretch rounded-md p-3 md:p-4"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Myth */}
                <div className="flex items-start gap-2.5">
                  <span
                    className="font-bold text-[14px] md:text-[16px] mt-0.5"
                    style={{ color: RED, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    ✗
                  </span>
                  <p
                    className="text-[13px] md:text-[14.5px] leading-snug font-semibold"
                    style={{ color: CREAM, textDecoration: "line-through", textDecorationColor: "rgba(180,84,84,0.5)" }}
                  >
                    {r.myth}
                  </p>
                </div>

                {/* Google says */}
                <p
                  className="text-[12px] md:text-[13px] leading-snug italic"
                  style={{ color: "#CBD5E1", fontFamily: "'Playfair Display', serif" }}
                >
                  “{r.googleSays}”
                </p>

                {/* Real move + layer chip */}
                <div className="flex items-start gap-2.5">
                  <div
                    className="rounded-md px-2 py-1 flex items-center justify-center shrink-0"
                    style={{ background: c }}
                  >
                    <span
                      className="font-bold text-white text-[11px] md:text-[12px]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {r.layer}
                    </span>
                  </div>
                  <p
                    className="text-[12px] md:text-[13.5px] leading-snug font-semibold"
                    style={{ color: CREAM }}
                  >
                    {r.realMove}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom line */}
        <div
          className="mt-6 rounded-md p-4 md:p-5"
          style={{ background: "rgba(212,168,75,0.08)", border: "1px solid rgba(212,168,75,0.25)" }}
        >
          <p
            className="text-[10px] font-bold uppercase mb-1.5"
            style={{ color: GOLD, letterSpacing: "0.22em", fontFamily: "'JetBrains Mono', monospace" }}
          >
            The Bottom Line
          </p>
          <p
            className="text-[14px] md:text-[16px] leading-snug"
            style={{ color: CREAM, fontFamily: "'Playfair Display', serif" }}
          >
            Google's AI search is grounded in core ranking. The moat is still{" "}
            <span style={{ color: GOLD, fontWeight: 700 }}>L1b unique data</span> ×{" "}
            <span style={{ color: GOLD, fontWeight: 700 }}>L3 trust gates</span> ×{" "}
            <span style={{ color: GOLD, fontWeight: 700 }}>L8 memory</span>. Everything else is rented surface.
          </p>
        </div>

        {/* Footer */}
        <div
          className="mt-8 pt-4 flex flex-wrap items-baseline justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p
            className="text-[11px] md:text-xs italic"
            style={{ color: MUTED, fontFamily: "'Playfair Display', serif" }}
          >
            Source: Google Search Central · "Optimizing your website for generative AI features" (2025).
          </p>
          <p
            className="text-[9px] md:text-[10px] font-bold uppercase"
            style={{
              color: MUTED,
              letterSpacing: "0.15em",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Anand Arivukkarasu · SupplyChainOfAI.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default GoogleGeoMythPoster;
