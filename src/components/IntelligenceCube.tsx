import React, { useState } from "react";
import { motion } from "framer-motion";

const FUNCTIONS = ["Dev/Eng", "Design", "Product", "PM/Proj", "Ops", "Mktg", "Sales", "CustCare", "Strategy", "Finance"];
const FUNCTIONS_SHORT = ["Dev", "Des", "Prod", "PM", "Ops", "Mkt", "Sale", "CX", "Strat", "Fin"];
const VERTICALS = ["FinTech", "EdTech", "Legal", "Health", "Travel", "eCom", "Media", "Gov", "SaaS", "Horizontal"];
const VERTICALS_SHORT = ["Fin", "Edu", "Law", "Hlth", "Trvl", "eCom", "Med", "Gov", "SaaS", "Horiz"];
const LAYERS = ["L-1", "L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"];

const layerVar = (l: string) => `--layer-${l === "L-1" ? "neg1" : l.replace("L", "")}`;

interface CompanyPlot {
  name: string;
  color: string;
  /** Indices into FUNCTIONS, VERTICALS, LAYERS — explicit cells, not ranges. */
  functions: number[];
  verticals: number[];
  layers: number[];
  verdict: string;
}

// Indices: LAYERS = ["L-1"=0, "L0"=1, "L1"=2, "L2"=3, "L3"=4, "L4"=5, "L5"=6, "L6"=7, "L7"=8, "L8"=9]
// FUNCTIONS = ["Dev/Eng"=0, "Design"=1, "Product"=2, "PM/Proj"=3, "Ops"=4, "Mktg"=5, "Sales"=6, "CustCare"=7, "Strategy"=8, "Finance"=9]
// VERTICALS = ["FinTech"=0, "EdTech"=1, "Legal"=2, "Health"=3, "Travel"=4, "eCom"=5, "Media"=6, "Gov"=7, "SaaS"=8, "Horizontal"=9]
const COMPANIES: CompanyPlot[] = [
  {
    name: "Sierra",
    color: "#10B981",
    // CX agents: serves Sales/CustCare across FinTech/Health/eCom. Owns L1 (convo data),
    // L3 (safety/QA), L5 (skills/playbooks), L6 (orchestration), L7 (surface), L8 (memory). Rents L2.
    functions: [6, 7],
    verticals: [0, 3, 5],
    layers: [2, 4, 6, 7, 8, 9],
    verdict: "CX agent fortress — owns L1 data, L3 gates, L5 skills, L6 orchestration, L8 memory.",
  },
  {
    name: "Gamma",
    color: "#9CA3AF",
    // AI deck builder: Design/Product across horizontal use. Surface (L7) on rented L2, with
    // a thin L5 templating layer. No proprietary data, no memory, no gates.
    functions: [1, 2],
    verticals: [9],
    layers: [3, 6, 8],
    verdict: "Thin L7 surface + light L5 templating on rented L2 — vulnerable to platform absorb.",
  },
  {
    name: "Harvey",
    color: "#4F46E5",
    // Legal AI: Dev/Eng + Strategy + CustCare inside Legal only. Owns L1 (legal corpus),
    // L3 (citation/compliance), L5 (legal workflows), L7 (chat surface), L8 (matter memory). Rents L2.
    functions: [0, 8],
    verticals: [2],
    layers: [2, 4, 6, 8, 9],
    verdict: "Vertical spike in Legal — L1 corpus, L3 citation gates, L5 workflows, L8 matter memory.",
  },
];

const occupies = (c: CompanyPlot, axis: "layers" | "verticals" | "functions", idx: number) =>
  c[axis].includes(idx);

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

/* ─────────────────────────  Isometric 3D Cube view  ───────────────────────── */

const ISO_STEP = 22; // pixel size of one cell along F / V axes
const ISO_Z = 18; // pixel size of one cell along L axis (up)
const ISO_COS = Math.cos(Math.PI / 6); // 0.866
const ISO_SIN = Math.sin(Math.PI / 6); // 0.5
const N = 10;

// viewBox 560×500; cube fully centered with room for axis labels
const ORIGIN_X = 280;
const ORIGIN_Y = 320;

const isoX = (f: number, v: number) => ORIGIN_X + (f - v) * ISO_STEP * ISO_COS;
const isoY = (f: number, v: number, l: number) =>
  ORIGIN_Y + (f + v) * ISO_STEP * ISO_SIN - l * ISO_Z;

const point = (f: number, v: number, l: number) => `${isoX(f, v)},${isoY(f, v, l)}`;

const IsoCube: React.FC<{ visible: Record<string, boolean> }> = ({ visible }) => {
  // Collect all occupied cells from all visible companies, then depth-sort.
  type Dot = { f: number; v: number; l: number; company: CompanyPlot; depth: number };
  const dots: Dot[] = [];
  COMPANIES.forEach((c) => {
    if (!visible[c.name]) return;
    c.functions.forEach((f) =>
      c.verticals.forEach((v) =>
        c.layers.forEach((l) => {
          dots.push({ f, v, l, company: c, depth: f + v - l * 0.35 });
        }),
      ),
    );
  });
  // Smaller depth = further back, drawn first.
  dots.sort((a, b) => b.depth - a.depth);

  // Stagger overlapping dots (same f/v/l from multiple companies)
  const cellCount = new Map<string, number>();
  const offsetFor = (key: string) => {
    const i = cellCount.get(key) ?? 0;
    cellCount.set(key, i + 1);
    return i;
  };

  const edge = (
    f1: number,
    v1: number,
    l1: number,
    f2: number,
    v2: number,
    l2: number,
    dashed = false,
  ) => (
    <line
      x1={isoX(f1, v1)}
      y1={isoY(f1, v1, l1)}
      x2={isoX(f2, v2)}
      y2={isoY(f2, v2, l2)}
      stroke="hsl(var(--foreground) / 0.18)"
      strokeWidth={1}
      strokeDasharray={dashed ? "3 3" : undefined}
    />
  );

  return (
    <svg viewBox="0 80 560 500" className="w-full max-w-[640px] mx-auto block">
      {/* ─── 3 visible cube faces — translucent, drawn back-to-front ─── */}
      {/* Back-left wall (V = N plane) — lightest tint */}
      <polygon
        points={`${point(0, N, 0)} ${point(N, N, 0)} ${point(N, N, N)} ${point(0, N, N)}`}
        fill="hsl(40 30% 99% / 0.65)"
        stroke="hsl(var(--foreground) / 0.1)"
        strokeWidth={0.6}
      />
      {/* Back-right wall (F = N plane) */}
      <polygon
        points={`${point(N, 0, 0)} ${point(N, N, 0)} ${point(N, N, N)} ${point(N, 0, N)}`}
        fill="hsl(40 28% 96% / 0.65)"
        stroke="hsl(var(--foreground) / 0.1)"
        strokeWidth={0.6}
      />
      {/* Floor (L = 0 plane) — soft cream */}
      <polygon
        points={`${point(0, 0, 0)} ${point(N, 0, 0)} ${point(N, N, 0)} ${point(0, N, 0)}`}
        fill="hsl(38 32% 93% / 0.8)"
        stroke="hsl(var(--foreground) / 0.15)"
        strokeWidth={0.6}
      />

      {/* Floor grid (L = 0 plane) — faint */}
      {Array.from({ length: N + 1 }).map((_, i) => (
        <React.Fragment key={`fl-${i}`}>
          <line
            x1={isoX(i, 0)}
            y1={isoY(i, 0, 0)}
            x2={isoX(i, N)}
            y2={isoY(i, N, 0)}
            stroke="hsl(var(--foreground) / 0.08)"
            strokeWidth={0.5}
          />
          <line
            x1={isoX(0, i)}
            y1={isoY(0, i, 0)}
            x2={isoX(N, i)}
            y2={isoY(N, i, 0)}
            stroke="hsl(var(--foreground) / 0.08)"
            strokeWidth={0.5}
          />
        </React.Fragment>
      ))}

      {/* Layer "shelves" — colored horizontal stripes across BOTH back walls */}
      {LAYERS.map((l, i) => (
        <React.Fragment key={`shelf-${l}`}>
          {/* on V=N back wall */}
          <line
            x1={isoX(0, N)}
            y1={isoY(0, N, i)}
            x2={isoX(N, N)}
            y2={isoY(N, N, i)}
            stroke={`hsl(var(${layerVar(l)}) / 0.35)`}
            strokeWidth={1.2}
          />
          {/* on F=N back wall */}
          <line
            x1={isoX(N, 0)}
            y1={isoY(N, 0, i)}
            x2={isoX(N, N)}
            y2={isoY(N, N, i)}
            stroke={`hsl(var(${layerVar(l)}) / 0.22)`}
            strokeWidth={1}
          />
        </React.Fragment>
      ))}

      {/* Cube wireframe — 12 edges. Dashed = hidden behind. */}
      {/* bottom rectangle — front 2 edges solid, back 2 dashed-ish but visible since floor is faint */}
      {edge(0, 0, 0, N, 0, 0)}
      {edge(0, 0, 0, 0, N, 0)}
      {edge(N, 0, 0, N, N, 0)}
      {edge(0, N, 0, N, N, 0)}
      {/* verticals — front-most is dashed (it's the hidden corner closest in iso) */}
      {edge(0, 0, 0, 0, 0, N, true)}
      {edge(N, 0, 0, N, 0, N)}
      {edge(0, N, 0, 0, N, N)}
      {edge(N, N, 0, N, N, N)}
      {/* top rectangle */}
      {edge(0, 0, N, N, 0, N)}
      {edge(0, 0, N, 0, N, N)}
      {edge(N, 0, N, N, N, N)}
      {edge(0, N, N, N, N, N)}

      {/* Axis labels — OUTSIDE the cube */}
      <text
        x={isoX(N, 0)}
        y={isoY(N, 0, 0) + 22}
        fill="hsl(var(--muted-foreground))"
        fontSize={10}
        fontFamily="ui-monospace, monospace"
        fontWeight={700}
        textAnchor="middle"
      >
        FUNCTIONS →
      </text>
      <text
        x={isoX(0, N)}
        y={isoY(0, N, 0) + 22}
        fill="hsl(var(--muted-foreground))"
        fontSize={10}
        fontFamily="ui-monospace, monospace"
        fontWeight={700}
        textAnchor="middle"
      >
        ← VERTICALS
      </text>
      <text
        x={isoX(0, N) - 6}
        y={isoY(0, N, N) - 10}
        fill="hsl(var(--muted-foreground))"
        fontSize={10}
        fontFamily="ui-monospace, monospace"
        fontWeight={700}
        textAnchor="end"
      >
        LAYERS ↑
      </text>

      {/* Layer ticks on the back-LEFT vertical edge (f=0, v=N) */}
      {LAYERS.map((l, i) => (
        <text
          key={`lt-${l}`}
          x={isoX(0, N) - 6}
          y={isoY(0, N, i) + 3}
          fill={`hsl(var(${layerVar(l)}))`}
          fontSize={9}
          fontFamily="ui-monospace, monospace"
          fontWeight={700}
          textAnchor="end"
        >
          {l}
        </text>
      ))}

      {/* The dots — depth-sorted, with drop lines to floor for spatial anchor */}
      {dots.map((d, idx) => {
        const key = `${d.f}-${d.v}-${d.l}`;
        const stackIdx = offsetFor(key);
        const cx = isoX(d.f + 0.5, d.v + 0.5) + stackIdx * 3.5 - 3;
        const cy = isoY(d.f + 0.5, d.v + 0.5, d.l + 0.5) - stackIdx * 3.5;
        const floorY = isoY(d.f + 0.5, d.v + 0.5, 0);
        return (
          <g key={idx}>
            {/* drop line to floor — only for first occupant of a cell */}
            {stackIdx === 0 && (
              <line
                x1={cx}
                y1={cy}
                x2={cx}
                y2={floorY}
                stroke={d.company.color}
                strokeOpacity={0.25}
                strokeWidth={0.8}
                strokeDasharray="2 2"
              />
            )}
            {/* floor footprint dot */}
            {stackIdx === 0 && (
              <circle
                cx={cx}
                cy={floorY}
                r={1.5}
                fill={d.company.color}
                opacity={0.5}
              />
            )}
            <circle
              cx={cx}
              cy={cy + 1.5}
              r={4.5}
              fill="hsl(var(--foreground) / 0.18)"
            />
            <circle
              cx={cx}
              cy={cy}
              r={4.5}
              fill={d.company.color}
              stroke="hsl(40 30% 97%)"
              strokeWidth={1.2}
            >
              <title>{`${d.company.name} · ${LAYERS[d.l]} × ${VERTICALS[d.v]} × ${FUNCTIONS[d.f]}`}</title>
            </circle>
          </g>
        );
      })}
    </svg>
  );
};

const IntelligenceCube = () => {
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(COMPANIES.map((c) => [c.name, true])),
  );
  const [view, setView] = useState<"cube" | "grids">("cube");

  const toggle = (name: string) =>
    setVisible((v) => ({ ...v, [name]: !v[name] }));

  return (
    <div className="space-y-5">
      {/* Company legend / toggles */}
      <div className="flex flex-wrap gap-2 justify-center">
        {COMPANIES.map((c) => {
          const on = visible[c.name];
          const vol = c.functions.length * c.verticals.length * c.layers.length;
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

      {/* View toggle */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-border bg-card p-0.5">
          {(["cube", "grids"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-full text-[12px] font-display font-bold transition-all ${
                view === v
                  ? "bg-foreground text-background"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {v === "cube" ? "3D Cube" : "Flat Grids"}
            </button>
          ))}
        </div>
      </div>

      {/* Visualization panel */}
      <motion.div
        key={view}
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
        {view === "cube" ? (
          <IsoCube visible={visible} />
        ) : (
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
        )}

        <p className="mt-5 pt-4 border-t border-foreground/10 font-mono-marker text-[10px] text-muted-foreground">
          {view === "cube"
            ? "Each dot = one company occupies one (Function × Vertical × Layer) cell. Stacked dots = contested cells. Toggle a name above to isolate its footprint."
            : "Each colored dot = one company occupies that intersection. Stacked dots = contested cells. Toggle a name above to isolate its footprint."}
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
