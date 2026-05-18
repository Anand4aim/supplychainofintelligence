import React from "react";
import ExportablePng from "@/components/ExportablePng";

const FUNCTIONS = ["Dev/Eng", "Design", "Product", "PM/Proj", "Ops", "Mktg", "Sales", "CustCare", "Strategy", "Finance"];
const VERTICALS = ["FinTech", "EdTech", "Legal", "Health", "Travel", "eCom", "Media", "Gov", "SaaS", "Horizontal"];
const LAYERS = ["L-1", "L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"];

const layerVar = (l: string) => `--layer-${l === "L-1" ? "neg1" : l.replace("L", "")}`;

interface Props {
  functions?: string[];
  verticals?: string[];
  layers?: string[];
  headline?: string;
}

const norm = (s: string) => s.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

const matchIndex = (axis: string[], picked: string[]) =>
  axis.map((a) => picked.some((p) => norm(p) === norm(a)));

const Grid: React.FC<{
  yAxis: string[];
  xAxis: string[];
  yLabel: string;
  xLabel: string;
  yHits: boolean[];
  xHits: boolean[];
  yDormantHits?: boolean[];
  cellColorFor: (yIdx: number) => string;
}> = ({ yAxis, xAxis, yLabel, xLabel, yHits, xHits, yDormantHits, cellColorFor }) => {
  const yCount = yHits.filter(Boolean).length;
  const xCount = xHits.filter(Boolean).length;
  const cellCount = yCount * xCount;
  const emptyAxis = xCount === 0;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2 gap-3">
        <p className="font-mono-marker text-[10px] text-muted-foreground uppercase tracking-wider">
          {yLabel} × {xLabel}
        </p>
        <p className="font-mono-marker text-[10px] text-foreground/60 uppercase tracking-wider whitespace-nowrap">
          {emptyAxis ? "no footprint" : `${cellCount} cell${cellCount === 1 ? "" : "s"} · ${yCount}×${xCount}`}
        </p>
      </div>
      <div className="flex gap-2">
        {/* Y labels */}
        <div className="flex flex-col-reverse gap-[3px] pt-0">
          {yAxis.map((y, i) => (
            <div
              key={y}
              className="font-mono-marker text-[9px] text-right pr-1 leading-none flex items-center justify-end"
              style={{
                height: 22,
                color: yHits[i]
                  ? `hsl(var(${layerVar(y)}))`
                  : yDormantHits?.[i]
                  ? `hsl(var(${layerVar(y)}) / 0.55)`
                  : "hsl(var(--foreground) / 0.4)",
                fontWeight: yHits[i] ? 700 : 400,
              }}
            >
              {y}
            </div>
          ))}
        </div>
        {/* Grid */}
        <div className="flex-1">
          <div
            className="grid gap-[3px]"
            style={{ gridTemplateColumns: `repeat(${xAxis.length}, minmax(0, 1fr))` }}
          >
            {[...yAxis].reverse().map((y, rowFromTop) => {
              const yIdx = yAxis.length - 1 - rowFromTop;
              const yHit = yHits[yIdx];
              const yDormant = !yHit && yDormantHits?.[yIdx];
              return xAxis.map((x, xIdx) => {
                const xHit = xHits[xIdx];
                const filled = yHit && xHit;
                const dormantFilled = yDormant && xHit;
                return (
                  <div
                    key={`${y}-${x}`}
                    className="rounded-[3px] transition-all"
                    style={{
                      height: 22,
                      background: filled
                        ? cellColorFor(yIdx)
                        : dormantFilled
                        ? `hsl(var(${layerVar(y)}) / 0.22)`
                        : yHit && xHit === false
                        ? `hsl(var(${layerVar(y)}) / 0.10)`
                        : xHit && !yHit
                        ? "hsl(var(--foreground) / 0.07)"
                        : "hsl(var(--foreground) / 0.025)",
                      border: filled
                        ? `1px solid ${cellColorFor(yIdx)}`
                        : dormantFilled
                        ? `1px dashed hsl(var(${layerVar(y)}) / 0.35)`
                        : yHit || xHit
                        ? "1px solid hsl(var(--foreground) / 0.12)"
                        : "1px solid hsl(var(--foreground) / 0.06)",
                      boxShadow: filled
                        ? `0 0 0 1px hsl(var(${layerVar(y)}) / 0.25), 0 2px 8px -2px hsl(var(${layerVar(y)}) / 0.45)`
                        : "none",
                    }}
                    title={
                      filled
                        ? `${y} × ${x}`
                        : dormantFilled
                        ? `${y} × ${x} — dormant / adjacent`
                        : undefined
                    }
                  />
                );
              });
            })}
          </div>
          {/* X labels */}
          <div
            className="grid gap-[3px] mt-1.5"
            style={{ gridTemplateColumns: `repeat(${xAxis.length}, minmax(0, 1fr))` }}
          >
            {xAxis.map((x, xIdx) => (
              <div
                key={x}
                className="font-mono-marker text-[9px] text-center leading-tight break-words"
                style={{
                  color: xHits[xIdx]
                    ? "hsl(var(--foreground))"
                    : "hsl(var(--foreground) / 0.45)",
                  fontWeight: xHits[xIdx] ? 700 : 400,
                }}
              >
                {x}
              </div>
            ))}
          </div>
          {emptyAxis && (
            <p className="font-mono-marker text-[10px] text-foreground/50 italic mt-3">
              Axis-agnostic on {xLabel.toLowerCase()} — this move reshapes the stack itself, not a specific {xLabel.toLowerCase().replace(/s$/, "")}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const CubeProjection2D: React.FC<Props> = ({ functions = [], verticals = [], layers = [] }) => {
  const layerHits = matchIndex(LAYERS, layers);
  const funcHits = matchIndex(FUNCTIONS, functions);
  const vertHits = matchIndex(VERTICALS, verticals);
  const cellColorFor = (layerIdx: number) => `hsl(var(${layerVar(LAYERS[layerIdx])}) / 0.7)`;

  // Dormant footprint — when a position only touches 1–2 layers, faintly project
  // the two adjacent layers so the cube doesn't look empty for sparse moves.
  const layerCount = layerHits.filter(Boolean).length;
  const dormantLayerHits = [...layerHits];
  if (layerCount > 0 && layerCount <= 2) {
    layerHits.forEach((hit, i) => {
      if (!hit) return;
      if (i - 1 >= 0 && !dormantLayerHits[i - 1]) dormantLayerHits[i - 1] = true;
      if (i + 1 < dormantLayerHits.length && !dormantLayerHits[i + 1]) dormantLayerHits[i + 1] = true;
    });
  }
  const hasDormant = dormantLayerHits.some((d, i) => d && !layerHits[i]);

  if (!layers.length && !functions.length && !verticals.length) return null;

  return (
    <div
      className="rounded-2xl p-5 md:p-6"
      style={{
        background: "linear-gradient(145deg, hsl(40 30% 97%) 0%, hsl(38 28% 95%) 60%, hsl(40 30% 96%) 100%)",
        border: "1px solid hsl(35 20% 88%)",
      }}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Grid
          yAxis={LAYERS}
          xAxis={VERTICALS}
          yLabel="Layers"
          xLabel="Verticals"
          yHits={layerHits}
          xHits={vertHits}
          yDormantHits={dormantLayerHits}
          cellColorFor={cellColorFor}
        />
        <Grid
          yAxis={LAYERS}
          xAxis={FUNCTIONS}
          yLabel="Layers"
          xLabel="Functions"
          yHits={layerHits}
          xHits={funcHits}
          yDormantHits={dormantLayerHits}
          cellColorFor={cellColorFor}
        />
      </div>

      <p className="mt-5 pt-4 border-t border-foreground/10 font-mono-marker text-[10px] text-muted-foreground">
        Two 2D projections of the Intelligence Cube (Functions × Verticals × Layers). Filled cells = this move occupies that intersection.
        {hasDormant && " Dashed cells = adjacent layers a sparse move could pull in next."}
      </p>
    </div>
  );
};

export default CubeProjection2D;
