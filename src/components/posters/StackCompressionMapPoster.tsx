import ExportablePng from "@/components/ExportablePng";
import { layerColor } from "@/data/layers";

const EATEN = [
  { name: "Jasper",          layer: "L7", why: "Prompt + UI. GPT-3.5 wrapper." },
  { name: "Chegg",           layer: "L7", why: "Generic Q&A. -99% market cap." },
  { name: "Stack Overflow",  layer: "L7", why: "Community absorbed into models." },
  { name: "Generic Copilots", layer: "L7", why: "Same prompt, free in ChatGPT." },
  { name: "Prompt Wrappers",  layer: "L7", why: "Feature, not company." },
  { name: "Thin Orchestration", layer: "L5", why: "L5 without L1/L8 = a demo." },
];

const SURVIVES = [
  { name: "Bloomberg",  layers: ["L1b", "L3"], why: "40yr data well + regulated trust." },
  { name: "Apollo.io",  layers: ["L1b"],       why: "Proprietary B2B contact graph." },
  { name: "Epic",       layers: ["L1", "L4"],  why: "Owns the hospital workflow." },
  { name: "Vanta",      layers: ["L3"],        why: "Compliance gate every B2B crosses." },
  { name: "Tempus",     layers: ["L1", "L8"],  why: "Clinical data + per-patient memory." },
  { name: "Notion AI",  layers: ["L8"],        why: "Knows your workspace. Migration = pain." },
];

const StackCompressionMapPoster = () => {
  return (
    <ExportablePng
      fileName="scoi-stack-compression-map"
      caption="The Stack Compression Map"
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
            Law I, Visualized
          </p>
          <h2 className="font-display text-2xl md:text-[34px] leading-[1.1] text-foreground mt-1 font-bold">
            The Stack Compression Map.
          </h2>
          <p className="text-[12px] md:text-sm text-muted-foreground mt-2">
            When the model layer ships your feature for free — who holds, and where the counter-move sits.
          </p>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {/* EATEN */}
          <div
            className="rounded-md p-4 md:p-5"
            style={{
              background: "hsl(0 60% 96%)",
              border: "1px solid hsl(0 50% 80%)",
            }}
          >
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="font-display text-[18px] md:text-[22px] font-bold" style={{ color: "hsl(0 60% 35%)" }}>
                ◌ Compressed
              </h3>
              <span className="font-mono-marker text-[10px] tracking-[0.18em] uppercase font-bold" style={{ color: "hsl(0 50% 40%)" }}>
                Surface-only
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {EATEN.map((e) => (
                <div
                  key={e.name}
                  className="flex items-center gap-3 rounded p-2.5"
                  style={{ background: "white", border: "1px solid hsl(0 30% 88%)" }}
                >
                  <span
                    className="font-mono-marker text-[10px] font-bold tracking-wider text-white px-1.5 py-0.5 rounded flex-shrink-0"
                    style={{ background: layerColor(e.layer) }}
                  >
                    {e.layer}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-[13px] md:text-[14px] font-bold text-foreground leading-tight">{e.name}</div>
                    <div className="text-[11px] text-muted-foreground leading-snug">{e.why}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SURVIVES */}
          <div
            className="rounded-md p-4 md:p-5"
            style={{
              background: "hsl(42 60% 95%)",
              border: "1px solid hsl(42 60% 70%)",
            }}
          >
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="font-display text-[18px] md:text-[22px] font-bold" style={{ color: "hsl(var(--accent))" }}>
                ★ Survives
              </h3>
              <span className="font-mono-marker text-[10px] tracking-[0.18em] uppercase font-bold" style={{ color: "hsl(var(--accent))" }}>
                Bottleneck owners
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {SURVIVES.map((e) => (
                <div
                  key={e.name}
                  className="flex items-center gap-3 rounded p-2.5"
                  style={{ background: "white", border: "1px solid hsl(42 50% 80%)" }}
                >
                  <div className="flex gap-1 flex-shrink-0">
                    {e.layers.map((l) => (
                      <span
                        key={l}
                        className="font-mono-marker text-[10px] font-bold tracking-wider text-white px-1.5 py-0.5 rounded"
                        style={{ background: layerColor(l.replace("b", "")) }}
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-[13px] md:text-[14px] font-bold text-foreground leading-tight">{e.name}</div>
                    <div className="text-[11px] text-muted-foreground leading-snug">{e.why}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-foreground/15 flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-sketch text-[11px] md:text-xs text-muted-foreground italic">
            The model layer absorbs anything that doesn't sit underneath it.
          </p>
          <p className="font-mono-marker text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-foreground/60">
            Anand Arivukkarasu · SupplyChainOfAI.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default StackCompressionMapPoster;
