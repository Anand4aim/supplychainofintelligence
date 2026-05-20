import ExportablePng from "@/components/ExportablePng";
import { layerColor } from "@/data/layers";

const ARCHETYPES = [
  { key: "Fortress",  layers: ["L1", "L3", "L8"],  layerKey: "L3", line: "Multi-layer ownership. Built to outlast the model layer.", ex: "Bloomberg · Epic · Tempus" },
  { key: "Refinery",  layers: ["L1"],              layerKey: "L1", line: "Owns the data well. Sells refined intelligence upward.",      ex: "Apollo · Scale · Getty" },
  { key: "Railroad",  layers: ["L0", "L4"],        layerKey: "L4", line: "Owns the rails. Every workload pays the toll.",               ex: "NVIDIA · AWS · Stripe" },
  { key: "Memory",    layers: ["L8"],              layerKey: "L8", line: "Compounds context per user. Switching cost becomes painful.",  ex: "Notion AI · Granola · Linear" },
  { key: "Surface",   layers: ["L7"],              layerKey: "L7", line: "Beautiful, exposed, structurally absorbable by L2.",          ex: "Jasper · Copy.ai · Gamma" },
  { key: "Agent",     layers: ["L5", "L7"],        layerKey: "L5", line: "Packaged as 'an agent.' Decode it: L5 + L7 (+L8) only works with L8.", ex: "Sierra · Lindy · Cognition" },
];

const SixArchetypesPoster = () => {
  return (
    <ExportablePng
      fileName="scoi-six-archetypes"
      caption="The 6 Archetypes"
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
            Pattern Recognition
          </p>
          <h2 className="font-display text-2xl md:text-[34px] leading-[1.1] text-foreground mt-1 font-bold">
            The 6 Archetypes of AI companies.
          </h2>
          <p className="text-[12px] md:text-sm text-muted-foreground mt-2">
            Every AI company collapses into one of six shapes. Find yours.
          </p>
        </div>

        {/* 2x3 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {ARCHETYPES.map((a) => {
            const c = layerColor(a.layerKey);
            return (
              <div
                key={a.key}
                className="rounded-md p-4 md:p-5 border"
                style={{
                  background: "hsl(40 25% 99%)",
                  borderColor: "hsl(var(--foreground) / 0.1)",
                  borderLeft: `4px solid ${c}`,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-[18px] md:text-[22px] font-bold text-foreground">
                    {a.key}
                  </h3>
                  <div className="flex gap-1">
                    {a.layers.map((lid) => (
                      <span
                        key={lid}
                        className="font-mono-marker text-[10px] font-bold tracking-wider px-2 py-0.5 rounded text-white"
                        style={{ background: layerColor(lid) }}
                      >
                        {lid}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-[12px] md:text-[13px] text-foreground/80 leading-snug">
                  {a.line}
                </p>
                <p className="font-sketch text-[10px] md:text-[11px] italic text-muted-foreground mt-2">
                  e.g. {a.ex}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-foreground/15 flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-sketch text-[11px] md:text-xs text-muted-foreground italic">
            Archetype is not a vibe. It is the layer-set you own.
          </p>
          <p className="font-mono-marker text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-foreground/60">
            Anand Arivukkarasu · SupplyChainOfAI.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default SixArchetypesPoster;
