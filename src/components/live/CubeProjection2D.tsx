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
  cellColorFor: (yIdx: number) => string;
}> = ({ yAxis, xAxis, yLabel, xLabel, yHits, xHits, cellColorFor }) => {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <p className="font-mono-marker text-[10px] text-muted-foreground uppercase tracking-wider">
          {yLabel} × {xLabel}
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
                color: yHits[i] ? `hsl(var(${layerVar(y)}))` : "hsl(var(--foreground) / 0.4)",
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
              return xAxis.map((x, xIdx) => {
                const xHit = xHits[xIdx];
                const filled = yHit && xHit;
                return (
                  <div
                    key={`${y}-${x}`}
                    className="rounded-[2px]"
                    style={{
                      height: 22,
                      background: filled
                        ? cellColorFor(yIdx)
                        : yHit || xHit
                        ? "hsl(var(--foreground) / 0.05)"
                        : "hsl(var(--foreground) / 0.03)",
                      border: filled
                        ? `1px solid ${cellColorFor(yIdx)}`
                        : "1px solid hsl(var(--foreground) / 0.08)",
                    }}
                    title={filled ? `${y} × ${x}` : undefined}
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
          cellColorFor={cellColorFor}
        />
        <Grid
          yAxis={LAYERS}
          xAxis={FUNCTIONS}
          yLabel="Layers"
          xLabel="Functions"
          yHits={layerHits}
          xHits={funcHits}
          cellColorFor={cellColorFor}
        />
      </div>

      <p className="mt-5 pt-4 border-t border-foreground/10 font-mono-marker text-[10px] text-muted-foreground">
        Two 2D projections of the Intelligence Cube (Functions × Verticals × Layers). Filled cells = this move occupies that intersection.
      </p>
    </div>
  );
};

export default CubeProjection2D;
