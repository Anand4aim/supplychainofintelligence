import ExportablePng from "@/components/ExportablePng";
import { layerColor } from "@/data/layers";

/**
 * The Intelligence Cube™ — three axes: Layer × Sublayer × Depth.
 * Rendered as an isometric cube made from layer-colored cells.
 */
const IntelligenceCubePoster = () => {
  // Layer colors from L1 to L8 (above the line — where intelligence
  // actually compounds). Cube renders an 8-deep isometric stack.
  const layers = ["L8", "L7", "L6", "L5", "L4", "L3", "L2", "L1"];

  return (
    <ExportablePng
      fileName="scoi-intelligence-cube"
      caption="The Intelligence Cube™"
      exportBackground="hsl(40 30% 97%)"
    >
      <div
        className="w-full mx-auto aspect-square max-w-[720px] px-8 md:px-12 py-10 md:py-14 flex flex-col"
        style={{
          background:
            "linear-gradient(160deg, hsl(40 30% 97%) 0%, hsl(38 26% 94%) 100%)",
        }}
      >
        {/* Header */}
        <div className="mb-4">
          <p className="font-mono-marker text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-accent">
            The Intelligence Cube™
          </p>
          <h2 className="font-display text-xl md:text-[28px] leading-[1.1] text-foreground mt-1 font-bold">
            Defensibility has three dimensions.
          </h2>
        </div>

        {/* Cube */}
        <div className="flex-1 flex items-center justify-center">
          <svg viewBox="0 0 600 500" className="w-full h-full max-h-[400px]">
            {/* Isometric cube — built from 8 horizontal layer slabs */}
            {layers.map((lid, i) => {
              const c = layerColor(lid);
              const yTop = 80 + i * 36;
              const skew = 28;
              return (
                <g key={lid}>
                  {/* Top face (parallelogram) */}
                  <polygon
                    points={`200,${yTop} 400,${yTop} 460,${yTop - skew} 260,${yTop - skew}`}
                    fill={c}
                    opacity="0.95"
                    stroke="rgba(0,0,0,0.18)"
                    strokeWidth="1"
                  />
                  {/* Front face */}
                  <polygon
                    points={`200,${yTop} 400,${yTop} 400,${yTop + 36} 200,${yTop + 36}`}
                    fill={c}
                    opacity="0.78"
                    stroke="rgba(0,0,0,0.18)"
                    strokeWidth="1"
                  />
                  {/* Side face */}
                  <polygon
                    points={`400,${yTop} 460,${yTop - skew} 460,${yTop - skew + 36} 400,${yTop + 36}`}
                    fill={c}
                    opacity="0.6"
                    stroke="rgba(0,0,0,0.18)"
                    strokeWidth="1"
                  />
                  {/* Layer label */}
                  <text
                    x="210"
                    y={yTop + 24}
                    fontSize="13"
                    fontWeight="700"
                    fill="white"
                    fontFamily="'JetBrains Mono', monospace"
                  >
                    {lid}
                  </text>
                </g>
              );
            })}

            {/* Axis labels */}
            <text x="300" y="430" textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))" letterSpacing="0.22em">
              ← 5 ACROSS · SUBLAYERS →
            </text>
            <text
              x="50"
              y="250"
              textAnchor="middle"
              fontSize="11"
              fill="hsl(var(--muted-foreground))"
              letterSpacing="0.22em"
              transform="rotate(-90 50 250)"
            >
              ← 8 LAYERS TALL →
            </text>
            <text
              x="540"
              y="80"
              fontSize="11"
              fill="hsl(var(--muted-foreground))"
              letterSpacing="0.18em"
              transform="rotate(-30 540 80)"
            >
              DEPTH →
            </text>
          </svg>
        </div>

        {/* Footer */}
        <div className="mt-2 pt-3 border-t border-foreground/15 flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-sketch text-[11px] md:text-xs text-muted-foreground italic">
            Layer × Sublayer × Depth. Volume = total defensibility.
          </p>
          <p className="font-mono-marker text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-foreground/60 whitespace-nowrap">
            SupplyChainOfAI.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default IntelligenceCubePoster;
