import ExportablePng from "@/components/ExportablePng";
import { layerColor } from "@/data/layers";

const ARCS = [
  {
    code: "ARC-01",
    name: "Wrapper → Workflow",
    from: "L7",
    via: ["L5", "L6"],
    line: "Stop renting features from L2. Embed inside the work.",
    examples: "Harvey · Cresta",
  },
  {
    code: "ARC-02",
    name: "Surface → Memory",
    from: "L7",
    via: ["L8"],
    line: "Trade attention for accumulation. Make leaving painful.",
    examples: "Notion AI · Granola",
  },
  {
    code: "ARC-03",
    name: "Tool → System of Record",
    from: "L7",
    via: ["L4", "L5"],
    line: "Become the place the workflow runs through, not on.",
    examples: "Linear · Rippling",
  },
  {
    code: "ARC-04",
    name: "Data → Platform",
    from: "L1",
    via: ["L4", "L2"],
    line: "Open the API. Let others build the surface on your bottleneck.",
    examples: "Apollo · Bloomberg",
  },
];

const MigrationPathsPoster = () => {
  return (
    <ExportablePng
      fileName="scoi-migration-paths"
      caption="The Migration Paths"
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
            Four Strategic Arcs
          </p>
          <h2 className="font-display text-2xl md:text-[34px] leading-[1.1] text-foreground mt-1 font-bold">
            The Migration Paths.
          </h2>
          <p className="text-[12px] md:text-sm text-muted-foreground mt-2">
            Companies that survive Law I migrate. Four arcs cover almost every move worth making.
          </p>
        </div>

        {/* Arcs */}
        <div className="flex flex-col gap-5 md:gap-6">
          {ARCS.map((arc) => (
            <div
              key={arc.code}
              className="rounded-md p-4 md:p-5 border"
              style={{
                background: "hsl(40 25% 99%)",
                borderColor: "hsl(var(--foreground) / 0.1)",
              }}
            >
              {/* Header row */}
              <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono-marker text-[10px] tracking-[0.2em] uppercase font-bold text-accent">
                    {arc.code}
                  </span>
                  <h3 className="font-display text-[16px] md:text-[20px] font-bold text-foreground">
                    {arc.name}
                  </h3>
                </div>
                <span className="font-sketch text-[11px] md:text-[12px] italic text-muted-foreground">
                  e.g. {arc.examples}
                </span>
              </div>

              {/* Arrow row */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className="font-mono-marker text-[11px] md:text-[13px] font-bold tracking-wider text-white px-2.5 py-1 rounded"
                  style={{ background: layerColor(arc.from) }}
                >
                  {arc.from}
                </span>
                {arc.via.map((v, i) => (
                  <div key={v} className="flex items-center gap-2">
                    <span
                      className="text-muted-foreground font-mono-marker text-[14px]"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      →
                    </span>
                    <span
                      className="font-mono-marker text-[11px] md:text-[13px] font-bold tracking-wider text-white px-2.5 py-1 rounded"
                      style={{
                        background: layerColor(v),
                        opacity: i === arc.via.length - 1 ? 1 : 0.85,
                      }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
                <span className="ml-1 font-sketch text-[11px] italic text-muted-foreground">
                  or die.
                </span>
              </div>

              <p className="text-[12px] md:text-[13.5px] text-foreground/80 leading-snug">
                {arc.line}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-foreground/15 flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-sketch text-[11px] md:text-xs text-muted-foreground italic">
            Standing still on L7 is the only move that always loses.
          </p>
          <p className="font-mono-marker text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-foreground/60">
            Anand Arivukkarasu · SupplyChainOfAI.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default MigrationPathsPoster;
