import React, { useState } from "react";
import { motion } from "framer-motion";

const FUNCTIONS = ["Dev/Eng", "Design", "Product", "PM/Proj", "Ops", "Mktg", "Sales", "CustCare", "Strategy", "Finance"];
const VERTICALS = ["FinTech", "EdTech", "Legal", "Health", "Travel", "eCom", "Media", "Gov", "SaaS", "Horizontal"];
const LAYERS = ["L-1", "L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"];

const layerVar = (l: string) => `--layer-${l === "L-1" ? "neg1" : l.replace("L", "")}`;

interface CompanyPlot {
  name: string;
  color: string;
  functions: [number, number];
  verticals: [number, number];
  layers: [number, number];
  verdict: string;
}

const COMPANIES: CompanyPlot[] = [
  { name: "Sierra", color: "#10B981", functions: [5, 8], verticals: [0, 3], layers: [3, 8], verdict: "Deep vertical fortress — owns trust through memory." },
  { name: "Gamma", color: "#9CA3AF", functions: [1, 3], verticals: [2, 5], layers: [7, 8], verdict: "Thin surface wrapper — vulnerable to commoditization." },
  { name: "Harvey", color: "#4F46E5", functions: [0, 1], verticals: [2, 2], layers: [1, 7], verdict: "Vertical spike — single vertical, deep layer ownership." },
];

const occupies = (c: CompanyPlot, axis: "layers" | "verticals" | "functions", idx: number) =>
  idx >= c[axis][0] && idx <= c[axis][1];

const ComparisonGrid: React.FC<{
  yAxis: string[];
  xAxis: string[];
  xAxisKey: "verticals" | "functions";
  yLabel: string;
  xLabel: string;
  visible: Record<string, boolean>;
}> = ({ yAxis, xAxis, xAxisKey, yLabel, xLabel, visible }) => {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2 gap-3">
        <p className="font-mono-marker text-[10px] text-muted-foreground uppercase tracking-wider">
          {yLabel} × {xLabel}
        </p>
      </div>
      <div className="flex gap-2">
        {/* Y labels */}
        <div className="flex flex-col-reverse gap-[3px]">
          {yAxis.map((y, i) => {
            const layerActive = COMPANIES.some(
              (c) => visible[c.name] && occupies(c, "layers", i),
            );
            return (
              <div
                key={y}
                className="font-mono-marker text-[9px] text-right pr-1 leading-none flex items-center justify-end"
                style={{
                  height: 26,
                  color: layerActive ? `hsl(var(${layerVar(y)}))` : "hsl(var(--foreground) / 0.4)",
                  fontWeight: layerActive ? 700 : 400,
                }}
              >
                {y}
              </div>
            );
          })}
        </div>
        {/* Grid */}
        <div className="flex-1">
          <div
            className="grid gap-[3px]"
            style={{ gridTemplateColumns: `repeat(${xAxis.length}, minmax(0, 1fr))` }}
          >
            {[...yAxis].reverse().map((y, rowFromTop) => {
              const yIdx = yAxis.length - 1 - rowFromTop;
              return xAxis.map((x, xIdx) => {
                const present = COMPANIES.filter(
                  (c) =>
                    visible[c.name] &&
                    occupies(c, "layers", yIdx) &&
                    occupies(c, xAxisKey, xIdx),
                );
                const has = present.length > 0;
                return (
                  <div
                    key={`${y}-${x}`}
                    className="rounded-[3px] flex items-center justify-center gap-[2px] transition-all"
                    style={{
                      height: 26,
                      background: has
                        ? `hsl(var(${layerVar(y)}) / 0.08)`
                        : "hsl(var(--foreground) / 0.025)",
                      border: has
                        ? `1px solid hsl(var(${layerVar(y)}) / 0.35)`
                        : "1px solid hsl(var(--foreground) / 0.06)",
                    }}
                    title={
                      has
                        ? `${y} × ${x} — ${present.map((c) => c.name).join(", ")}`
                        : undefined
                    }
                  >
                    {present.map((c) => (
                      <span
                        key={c.name}
                        className="rounded-full"
                        style={{
                          width: 7,
                          height: 7,
                          background: c.color,
                          boxShadow: `0 0 0 1.5px hsl(var(--card)), 0 1px 2px hsl(${c.color} / 0.4)`,
                        }}
                      />
                    ))}
                  </div>
                );
              });
            })}
          </div>
          {/* X labels */}
          <div
            className="grid gap-[3px] mt-1.5"
            style={{ gridTemplateColumns: `repeat(${xAxis.length}, minmax(0, 1fr))` }}
          >
            {xAxis.map((x, xIdx) => {
              const xActive = COMPANIES.some(
                (c) => visible[c.name] && occupies(c, xAxisKey, xIdx),
              );
              return (
                <div
                  key={x}
                  className="font-mono-marker text-[9px] text-center leading-tight break-words"
                  style={{
                    color: xActive ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.45)",
                    fontWeight: xActive ? 700 : 400,
                  }}
                >
                  {x}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const IntelligenceCube = () => {
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(COMPANIES.map((c) => [c.name, true])),
  );

  const toggle = (name: string) =>
    setVisible((v) => ({ ...v, [name]: !v[name] }));

  return (
    <div className="space-y-5">
      {/* Company legend / toggles */}
      <div className="flex flex-wrap gap-2 justify-center">
        {COMPANIES.map((c) => {
          const on = visible[c.name];
          const vol =
            (c.functions[1] - c.functions[0] + 1) *
            (c.verticals[1] - c.verticals[0] + 1) *
            (c.layers[1] - c.layers[0] + 1);
          return (
            <button
              key={c.name}
              onClick={() => toggle(c.name)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                on
                  ? "bg-card border-foreground/30 text-foreground"
                  : "bg-transparent border-border text-foreground/40 line-through"
              }`}
              title={on ? `Hide ${c.name}` : `Show ${c.name}`}
            >
              <span
                className="rounded-full"
                style={{
                  width: 9,
                  height: 9,
                  background: c.color,
                  opacity: on ? 1 : 0.35,
                }}
              />
              <span className="font-display font-bold text-[13px]">{c.name}</span>
              <span className="font-mono-marker text-[10px] text-muted-foreground">{vol}c</span>
            </button>
          );
        })}
      </div>

      {/* Two overlay grids */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl p-5 md:p-6"
        style={{
          background:
            "linear-gradient(145deg, hsl(40 30% 97%) 0%, hsl(38 28% 95%) 60%, hsl(40 30% 96%) 100%)",
          border: "1px solid hsl(35 20% 88%)",
        }}
      >
        <div className="grid md:grid-cols-2 gap-8">
          <ComparisonGrid
            yAxis={LAYERS}
            xAxis={VERTICALS}
            xAxisKey="verticals"
            yLabel="Layers"
            xLabel="Verticals"
            visible={visible}
          />
          <ComparisonGrid
            yAxis={LAYERS}
            xAxis={FUNCTIONS}
            xAxisKey="functions"
            yLabel="Layers"
            xLabel="Functions"
            visible={visible}
          />
        </div>

        <p className="mt-5 pt-4 border-t border-foreground/10 font-mono-marker text-[10px] text-muted-foreground">
          Each colored dot = one company occupies that intersection. Stacked dots = contested cells. Toggle a name above to isolate its footprint.
        </p>
      </motion.div>

      {/* Verdict list */}
      <div className="space-y-2">
        {COMPANIES.map((c) => (
          <div
            key={c.name}
            className="rounded-xl border border-border bg-card p-3 flex items-start gap-3"
            style={{ opacity: visible[c.name] ? 1 : 0.4 }}
          >
            <span
              className="rounded-full mt-1 shrink-0"
              style={{ width: 10, height: 10, background: c.color }}
            />
            <div className="flex-1">
              <p className="font-display font-bold text-foreground text-[14px] leading-tight">
                {c.name}
              </p>
              <p className="text-[13px] text-muted-foreground leading-snug mt-0.5">{c.verdict}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="font-mono-marker text-[11px] text-muted-foreground text-center uppercase tracking-wider">
        The Intelligence Cube™ — Volume = Layers × Verticals × Functions = structural durability
      </p>
    </div>
  );
};

export default IntelligenceCube;
