import React from "react";

const FUNCTIONS = ["Dev/Eng", "Design", "Product", "PM/Proj", "Ops", "Mktg", "Sales", "CustCare", "Strategy"];
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

      <p className="mt-5 pt-4 border-t border-foreground/10 font-mono-marker text-[10px] text-muted-foreground">
        Two 2D projections of the Intelligence Cube (Functions × Verticals × Layers). Filled cells = this move occupies that intersection.
      </p>
    </div>
  );
};

export default CubeProjection2D;
