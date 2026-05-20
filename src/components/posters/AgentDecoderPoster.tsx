import ExportablePng from "@/components/ExportablePng";
import { layerColor } from "@/data/layers";

/**
 * Kills the "agent" buzzword by decoding it into layers.
 * Most viral piece for product folks tired of agent-washing.
 */
const AgentDecoderPoster = () => {
  const NAVY = "#0F172A";
  const CREAM = "#F1E9D8";
  const GOLD = "#D4A84B";
  const MUTED = "#94A3B8";

  const L5 = layerColor("L5");
  const L7 = layerColor("L7");
  const L8 = layerColor("L8");

  return (
    <ExportablePng
      fileName="scoi-agent-decoder"
      caption="The Agent Decoder"
      exportBackground={NAVY}
    >
      <div
        className="w-full mx-auto aspect-square max-w-[720px] px-8 md:px-12 py-10 md:py-14 flex flex-col"
        style={{ background: NAVY, color: CREAM, fontFamily: "Inter, sans-serif" }}
      >
        {/* Header */}
        <div className="mb-6">
          <p className="text-[10px] md:text-[11px] font-bold uppercase mb-2" style={{ color: GOLD, letterSpacing: "0.28em" }}>
            Buzzword, Decoded
          </p>
          <h2
            className="leading-[1.05] font-bold"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 4vw, 40px)", color: CREAM }}
          >
            "Agent" is not a layer.
          </h2>
        </div>

        {/* Equation */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center justify-center gap-3 md:gap-5 flex-wrap mb-8">
            <span
              className="font-bold"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 6vw, 64px)",
                color: CREAM,
              }}
            >
              Agent
            </span>
            <span style={{ color: GOLD, fontSize: "clamp(32px, 5vw, 48px)", fontFamily: "'Playfair Display', serif" }}>
              =
            </span>
            {[
              { id: "L5", name: "Orchestration", color: L5 },
              { id: "L7", name: "Surface", color: L7 },
            ].map((l) => (
              <div
                key={l.id}
                className="rounded-md flex flex-col items-center justify-center"
                style={{ background: l.color, width: "92px", height: "92px" }}
              >
                <span className="font-bold text-white text-[22px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {l.id}
                </span>
                <span className="text-white text-[10px] mt-0.5 opacity-90">{l.name}</span>
              </div>
            ))}
            <span style={{ color: MUTED, fontSize: "clamp(28px, 4vw, 40px)", fontFamily: "'Playfair Display', serif" }}>
              (+
            </span>
            <div
              className="rounded-md flex flex-col items-center justify-center"
              style={{ background: L8, width: "92px", height: "92px", opacity: 0.85 }}
            >
              <span className="font-bold text-white text-[22px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                L8
              </span>
              <span className="text-white text-[10px] mt-0.5 opacity-90">Memory</span>
            </div>
            <span style={{ color: MUTED, fontSize: "clamp(28px, 4vw, 40px)", fontFamily: "'Playfair Display', serif" }}>
              )
            </span>
          </div>

          {/* Rules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {[
              { k: "Without L5", v: "It's a chatbot." },
              { k: "Without L7", v: "It's a script." },
              { k: "Without L8", v: "It's a demo." },
            ].map((r) => (
              <div
                key={r.k}
                className="p-3 md:p-4 rounded-md"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-[10px] font-bold uppercase mb-1" style={{ color: GOLD, letterSpacing: "0.18em" }}>
                  {r.k}
                </p>
                <p className="text-[14px] md:text-[15px]" style={{ color: CREAM, fontFamily: "'Playfair Display', serif" }}>
                  {r.v}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 flex items-baseline justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p className="text-[11px] italic" style={{ color: MUTED, fontFamily: "'Playfair Display', serif" }}>
            When someone says "we built an agent," ask which three layers.
          </p>
          <p
            className="text-[9px] md:text-[10px] font-bold uppercase"
            style={{ color: MUTED, letterSpacing: "0.15em", fontFamily: "'JetBrains Mono', monospace" }}
          >
            SupplyChainOfAI.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default AgentDecoderPoster;
