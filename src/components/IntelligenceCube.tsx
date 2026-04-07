import React, { useState } from "react";
import { motion } from "framer-motion";
import { LAYERS } from "@/data/layers";

const FUNCTIONS = [
  "Dev/Eng", "Design", "Product", "PM/Proj",
  "Ops", "Mktg", "Sales", "CustCare", "Strategy",
];

const VERTICALS = [
  "FinTech", "EdTech", "Legal", "Health",
  "Travel", "eCom", "Media", "Gov", "SaaS",
];

const LAYER_LABELS = [
  "L0 Silicon", "L1 Data", "L2 Model", "L3 Trust",
  "L4 Infra", "L5 Orch", "L6 Skills", "L7 Surface", "L8 Memory",
];

interface CompanyPlot {
  name: string;
  color: string;
  opacity: number;
  // ranges: [start, end] indices on each axis
  functions: [number, number];
  verticals: [number, number];
  layers: [number, number];
  verdict: string;
}

const COMPANIES: CompanyPlot[] = [
  {
    name: "Sierra",
    color: "#10B981",
    opacity: 0.55,
    functions: [5, 8],   // Mktg → Strategy
    verticals: [0, 3],   // FinTech → Health
    layers: [3, 8],      // L3 Trust → L8 Memory
    verdict: "Deep vertical fortress — owns trust through memory across customer-facing functions.",
  },
  {
    name: "Gamma",
    color: "#9CA3AF",
    opacity: 0.5,
    functions: [1, 3],   // Design → PM/Proj
    verticals: [2, 5],   // Legal → Travel
    layers: [7, 8],      // L7 Surface → L8 Memory
    verdict: "Thin surface wrapper — limited depth, vulnerable to platform commoditization.",
  },
  {
    name: "Harvey",
    color: "#4F46E5",
    opacity: 0.5,
    functions: [0, 1],   // Dev/Eng → Design (narrow)
    verticals: [2, 2],   // Legal only
    layers: [1, 7],      // L1 Data → L7 Surface
    verdict: "Vertical spike — single vertical, deep layer ownership. Defensible if layers harden.",
  },
];

// Isometric projection helpers
const ISO_SCALE = 0.9;
const ORIGIN_X = 120;
const ORIGIN_Y = 520;
const X_STEP = 52;  // functions axis → right-up
const Y_STEP = 52;  // verticals axis → right-down
const Z_STEP = 42;  // layers axis → straight up

function isoX(fx: number, vy: number) {
  return ORIGIN_X + fx * X_STEP * 0.866 + vy * Y_STEP * 0.866;
}
function isoY(fx: number, vy: number, lz: number) {
  return ORIGIN_Y - fx * X_STEP * 0.5 + vy * Y_STEP * 0.5 - lz * Z_STEP;
}

function IsoLine({ x1, y1, x2, y2, dashed = false }: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean }) {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="rgba(255,255,255,0.15)"
      strokeWidth={1}
      strokeDasharray={dashed ? "4 3" : undefined}
    />
  );
}

function IsoBox({ company, highlighted }: { company: CompanyPlot; highlighted: boolean }) {
  const [fx0, fx1] = company.functions;
  const [vy0, vy1] = company.verticals;
  const [lz0, lz1] = company.layers;

  const w = fx1 - fx0 + 1;
  const d = vy1 - vy0 + 1;
  const h = lz1 - lz0 + 1;

  // 8 corners of the box
  const corners = {
    // bottom face
    fbl: [fx0, vy0, lz0],
    fbr: [fx0 + w, vy0, lz0],
    bbl: [fx0, vy0 + d, lz0],
    bbr: [fx0 + w, vy0 + d, lz0],
    // top face
    ftl: [fx0, vy0, lz0 + h],
    ftr: [fx0 + w, vy0, lz0 + h],
    btl: [fx0, vy0 + d, lz0 + h],
    btr: [fx0 + w, vy0 + d, lz0 + h],
  };

  const p = (c: number[]) => `${isoX(c[0], c[1])},${isoY(c[0], c[1], c[2])}`;

  const opacity = highlighted ? company.opacity + 0.2 : company.opacity;

  // Draw 3 visible faces of the isometric box
  const topFace = `${p(corners.ftl)} ${p(corners.ftr)} ${p(corners.btr)} ${p(corners.btl)}`;
  const rightFace = `${p(corners.ftr)} ${p(corners.fbr)} ${p(corners.bbr)} ${p(corners.btr)}`;
  const leftFace = `${p(corners.ftl)} ${p(corners.btl)} ${p(corners.bbl)} ${p(corners.fbl)}`;

  // Label position (center of top face)
  const cx = (isoX(fx0, vy0) + isoX(fx0 + w, vy0) + isoX(fx0, vy0 + d) + isoX(fx0 + w, vy0 + d)) / 4;
  const cy = (isoY(fx0, vy0, lz0 + h) + isoY(fx0 + w, vy0, lz0 + h) + isoY(fx0, vy0 + d, lz0 + h) + isoY(fx0 + w, vy0 + d, lz0 + h)) / 4;

  return (
    <g style={{ cursor: "pointer" }}>
      {/* Top face - lightest */}
      <polygon points={topFace} fill={company.color} opacity={opacity * 0.8} stroke={company.color} strokeWidth={1.5} />
      {/* Right face */}
      <polygon points={rightFace} fill={company.color} opacity={opacity * 0.6} stroke={company.color} strokeWidth={1} />
      {/* Left face - darkest */}
      <polygon points={leftFace} fill={company.color} opacity={opacity * 0.45} stroke={company.color} strokeWidth={1} />
      {/* Label */}
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
        fill="white" fontSize={13} fontWeight={700} fontFamily="Inter, sans-serif"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>
        {company.name}
      </text>
    </g>
  );
}

const IntelligenceCube = () => {
  const [activeCompany, setActiveCompany] = useState<string | null>(null);

  const N = 9;

  return (
    <div className="space-y-8">
      {/* SVG Isometric Cube */}
      <div className="flex justify-center overflow-x-auto">
        <svg viewBox="0 40 920 540" className="w-full max-w-[800px]" style={{ minWidth: 600 }}>
          {/* Axis lines */}
          {/* X-axis: Functions → */}
          <line
            x1={isoX(0, 0)} y1={isoY(0, 0, 0)}
            x2={isoX(N, 0)} y2={isoY(N, 0, 0)}
            stroke="#4F46E5" strokeWidth={2.5}
          />
          <text x={isoX(N, 0) + 8} y={isoY(N, 0, 0) + 4} fill="#4F46E5" fontSize={13} fontWeight={700} fontFamily="Inter, sans-serif">
            FUNCTIONS →
          </text>

          {/* Y-axis: Verticals → */}
          <line
            x1={isoX(0, 0)} y1={isoY(0, 0, 0)}
            x2={isoX(0, N)} y2={isoY(0, N, 0)}
            stroke="#10B981" strokeWidth={2.5}
          />
          <text x={isoX(0, N) + 8} y={isoY(0, N, 0) + 16} fill="#10B981" fontSize={13} fontWeight={700} fontFamily="Inter, sans-serif">
            VERTICALS →
          </text>

          {/* Z-axis: Layers ↑ */}
          <line
            x1={isoX(0, 0)} y1={isoY(0, 0, 0)}
            x2={isoX(0, 0)} y2={isoY(0, 0, N)}
            stroke="#EF4444" strokeWidth={2.5}
          />
          <text x={isoX(0, 0) - 8} y={isoY(0, 0, N) - 12} fill="#EF4444" fontSize={13} fontWeight={700} fontFamily="Inter, sans-serif" textAnchor="middle">
            LAYERS ↑
          </text>

          {/* Wireframe cube edges (back edges dashed) */}
          {/* Bottom face */}
          <IsoLine x1={isoX(N, 0)} y1={isoY(N, 0, 0)} x2={isoX(N, N)} y2={isoY(N, N, 0)} />
          <IsoLine x1={isoX(0, N)} y1={isoY(0, N, 0)} x2={isoX(N, N)} y2={isoY(N, N, 0)} />
          {/* Top face */}
          <IsoLine x1={isoX(0, 0)} y1={isoY(0, 0, N)} x2={isoX(N, 0)} y2={isoY(N, 0, N)} />
          <IsoLine x1={isoX(0, 0)} y1={isoY(0, 0, N)} x2={isoX(0, N)} y2={isoY(0, N, N)} />
          <IsoLine x1={isoX(N, 0)} y1={isoY(N, 0, N)} x2={isoX(N, N)} y2={isoY(N, N, N)} />
          <IsoLine x1={isoX(0, N)} y1={isoY(0, N, N)} x2={isoX(N, N)} y2={isoY(N, N, N)} />
          {/* Verticals */}
          <IsoLine x1={isoX(N, 0)} y1={isoY(N, 0, 0)} x2={isoX(N, 0)} y2={isoY(N, 0, N)} />
          <IsoLine x1={isoX(0, N)} y1={isoY(0, N, 0)} x2={isoX(0, N)} y2={isoY(0, N, N)} />
          <IsoLine x1={isoX(N, N)} y1={isoY(N, N, 0)} x2={isoX(N, N)} y2={isoY(N, N, N)} />
          {/* Back dashed edges */}
          <IsoLine x1={isoX(N, 0)} y1={isoY(N, 0, 0)} x2={isoX(0, 0)} y2={isoY(0, 0, 0)} dashed />
          
          {/* Function labels along X-axis */}
          {FUNCTIONS.map((f, i) => (
            <text key={f}
              x={isoX(i + 0.5, 0)} y={isoY(i + 0.5, 0, 0) + 18}
              fill="#4F46E5" fontSize={9} fontFamily="Inter, sans-serif"
              textAnchor="end" transform={`rotate(-30, ${isoX(i + 0.5, 0)}, ${isoY(i + 0.5, 0, 0) + 18})`}
            >
              {f}
            </text>
          ))}

          {/* Vertical labels along Y-axis */}
          {VERTICALS.map((v, i) => (
            <text key={v}
              x={isoX(0, i + 0.5)} y={isoY(0, i + 0.5, 0) + 18}
              fill="#10B981" fontSize={9} fontFamily="Inter, sans-serif"
              textAnchor="start" transform={`rotate(30, ${isoX(0, i + 0.5)}, ${isoY(0, i + 0.5, 0) + 18})`}
            >
              {v}
            </text>
          ))}

          {/* Layer labels along Z-axis */}
          {LAYER_LABELS.map((l, i) => (
            <text key={l}
              x={isoX(0, 0) - 12} y={isoY(0, 0, i + 0.5)}
              fill="#EF4444" fontSize={9} fontFamily="Inter, sans-serif"
              textAnchor="end" dominantBaseline="middle"
            >
              {l}
            </text>
          ))}

          {/* Company volumes */}
          {COMPANIES.map((c) => (
            <IsoBox key={c.name} company={c} highlighted={activeCompany === c.name} />
          ))}
        </svg>
      </div>

      {/* Legend + verdicts */}
      <div className="space-y-3">
        {COMPANIES.map((c) => {
          const isActive = activeCompany === c.name;
          const vol = (c.functions[1] - c.functions[0] + 1) * (c.verticals[1] - c.verticals[0] + 1) * (c.layers[1] - c.layers[0] + 1);
          return (
            <motion.button
              key={c.name}
              onClick={() => setActiveCompany(isActive ? null : c.name)}
              className={`w-full text-left rounded-lg border p-4 transition-all ${
                isActive
                  ? "border-white/15 bg-white/[0.06]"
                  : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
              }`}
              layout
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-sm" style={{ background: c.color }} />
                  <span className="text-sm font-display font-bold text-white">{c.name}</span>
                </div>
                <span className="text-xs text-white/30 font-mono">{vol} cells</span>
              </div>
              <p className="text-xs text-white/50 mt-1">{c.verdict}</p>
            </motion.button>
          );
        })}
      </div>

      <p className="text-[10px] text-white/20 text-center">
        The Intelligence Cube™ — Volume = Functions × Verticals × Layers = structural durability
      </p>
    </div>
  );
};

export default IntelligenceCube;
