import ExportablePng from "@/components/ExportablePng";
import { layerColor } from "@/data/layers";

const TAXES = [
  { layer: "L0", name: "Inference Margin Collapse", tax: "Every call = compute cost. Margin shrinks with usage, not scale.", color: "L0" },
  { layer: "L2", name: "The Token Tax",             tax: "$/token × every user × forever. The meter never stops running.", color: "L2" },
  { layer: "L2", name: "Model Lock-In Tax",         tax: "Switch providers = rewrite prompts, re-eval, re-validate. Real cost.", color: "L2" },
  { layer: "L4", name: "API Dependency Tax",        tax: "Rate limits, deprecations, ToS shifts. Your roadmap = their decisions.", color: "L4" },
  { layer: "L5", name: "Context Tax",               tax: "Bigger windows = bigger bills. Context cost compounds per turn.", color: "L5" },
  { layer: "L5", name: "Orchestration Tax",         tax: "Each tool-call = a model hop. Latency × cost × failure surface.", color: "L5" },
  { layer: "L7", name: "Distribution Tax",          tax: "App stores, ad platforms, search, they price you. You don't price them.", color: "L7" },
];

const AITaxMapPoster = () => {
  const NAVY = "#0F172A";
  const CREAM = "#F1E9D8";
  const GOLD = "#D4A84B";
  const MUTED = "#94A3B8";

  return (
    <ExportablePng
      fileName="scoi-ai-tax-map"
      caption="The AI Tax Map"
      exportBackground={NAVY}
    >
      <div
        className="w-full mx-auto px-8 md:px-12 py-10 md:py-14"
        style={{ background: NAVY, color: CREAM, fontFamily: "Inter, sans-serif" }}
      >
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <p className="text-[10px] md:text-[11px] font-bold uppercase mb-2" style={{ color: GOLD, letterSpacing: "0.28em" }}>
            Where The Meter Runs
          </p>
          <h2
            className="leading-[1.05] font-bold"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4.5vw, 52px)", color: CREAM }}
          >
            The AI Tax Map.
          </h2>
          <p className="text-[13px] md:text-base mt-3" style={{ color: MUTED }}>
            Every AI product pays seven taxes. Most founders only price for two.
          </p>
          <div className="h-[2px] w-16 mt-4" style={{ background: GOLD }} />
        </div>

        {/* Tax rows */}
        <div className="flex flex-col gap-2.5">
          {TAXES.map((t, i) => {
            const c = layerColor(t.color);
            return (
              <div
                key={i}
                className="grid grid-cols-[64px_1fr] md:grid-cols-[90px_1fr] gap-3 md:gap-4 items-stretch rounded-md p-3 md:p-4"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="rounded-md px-2 py-2 flex flex-col items-center justify-center"
                  style={{ background: c }}
                >
                  <div className="font-bold text-white text-[14px] md:text-[16px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {t.layer}
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3
                      className="font-bold text-[15px] md:text-[18px] leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif", color: CREAM }}
                    >
                      {t.name}
                    </h3>
                    <span
                      className="text-[10px] font-bold uppercase whitespace-nowrap"
                      style={{ color: GOLD, letterSpacing: "0.18em", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Tax #{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-[12px] md:text-[13.5px] mt-1 leading-snug" style={{ color: "#CBD5E1" }}>
                    {t.tax}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 flex flex-wrap items-baseline justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p className="text-[11px] md:text-xs italic" style={{ color: MUTED, fontFamily: "'Playfair Display', serif" }}>
            If you can't name your tax stack, your margin isn't real, it's just unbilled.
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

export default AITaxMapPoster;
