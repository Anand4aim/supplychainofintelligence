import React, { useState } from "react";
import { motion } from "framer-motion";
import { LAYERS, LAYER_ID_LABEL } from "@/data/layers";

const FUNCTIONS = ["Dev/Eng", "Design", "Product", "PM/Proj", "Ops", "Mktg", "Sales", "CustCare", "Strategy"];
const VERTICALS = ["FinTech", "EdTech", "Legal", "Health", "Travel", "eCom", "Media", "Gov", "SaaS"];
const LAYER_LABELS = LAYERS.map((l) => LAYER_ID_LABEL[l.id]);

interface CompanyPlot {
  name: string; color: string; opacity: number;
  functions: [number, number]; verticals: [number, number]; layers: [number, number];
  verdict: string;
}

const COMPANIES: CompanyPlot[] = [
  { name: "Sierra", color: "#10B981", opacity: 0.55, functions: [5, 8], verticals: [0, 3], layers: [3, 8], verdict: "Deep vertical fortress — owns trust through memory." },
  { name: "Gamma", color: "#9CA3AF", opacity: 0.5, functions: [1, 3], verticals: [2, 5], layers: [7, 8], verdict: "Thin surface wrapper — vulnerable to commoditization." },
  { name: "Harvey", color: "#4F46E5", opacity: 0.5, functions: [0, 1], verticals: [2, 2], layers: [1, 7], verdict: "Vertical spike — single vertical, deep layer ownership." },
];

const ISO_SCALE = 0.9;
const ORIGIN_X = 120; const ORIGIN_Y = 520;
const X_STEP = 52; const Y_STEP = 52; const Z_STEP = 42;

function isoX(fx: number, vy: number) { return ORIGIN_X + fx * X_STEP * 0.866 + vy * Y_STEP * 0.866; }
function isoY(fx: number, vy: number, lz: number) { return ORIGIN_Y - fx * X_STEP * 0.5 + vy * Y_STEP * 0.5 - lz * Z_STEP; }

function IsoLine({ x1, y1, x2, y2, dashed = false }: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--border))" strokeWidth={1} strokeDasharray={dashed ? "4 3" : undefined} />;
}

function IsoBox({ company, highlighted }: { company: CompanyPlot; highlighted: boolean }) {
  const [fx0, fx1] = company.functions;
  const [vy0, vy1] = company.verticals;
  const [lz0, lz1] = company.layers;
  const w = fx1 - fx0 + 1; const d = vy1 - vy0 + 1; const h = lz1 - lz0 + 1;

  const corners = {
    fbl: [fx0, vy0, lz0], fbr: [fx0 + w, vy0, lz0], bbl: [fx0, vy0 + d, lz0], bbr: [fx0 + w, vy0 + d, lz0],
    ftl: [fx0, vy0, lz0 + h], ftr: [fx0 + w, vy0, lz0 + h], btl: [fx0, vy0 + d, lz0 + h], btr: [fx0 + w, vy0 + d, lz0 + h],
  };

  const p = (c: number[]) => `${isoX(c[0], c[1])},${isoY(c[0], c[1], c[2])}`;
  const opacity = highlighted ? company.opacity + 0.2 : company.opacity;

  const topFace = `${p(corners.ftl)} ${p(corners.ftr)} ${p(corners.btr)} ${p(corners.btl)}`;
  const rightFace = `${p(corners.ftr)} ${p(corners.fbr)} ${p(corners.bbr)} ${p(corners.btr)}`;
  const leftFace = `${p(corners.ftl)} ${p(corners.btl)} ${p(corners.bbl)} ${p(corners.fbl)}`;

  const cx = (isoX(fx0, vy0) + isoX(fx0 + w, vy0) + isoX(fx0, vy0 + d) + isoX(fx0 + w, vy0 + d)) / 4;
  const cy = (isoY(fx0, vy0, lz0 + h) + isoY(fx0 + w, vy0, lz0 + h) + isoY(fx0, vy0 + d, lz0 + h) + isoY(fx0 + w, vy0 + d, lz0 + h)) / 4;

  return (
    <g style={{ cursor: "pointer" }}>
      <polygon points={topFace} fill={company.color} opacity={opacity * 0.8} stroke={company.color} strokeWidth={1.5} />
      <polygon points={rightFace} fill={company.color} opacity={opacity * 0.6} stroke={company.color} strokeWidth={1} />
      <polygon points={leftFace} fill={company.color} opacity={opacity * 0.45} stroke={company.color} strokeWidth={1} />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
        fill="hsl(var(--foreground))" fontSize={13} fontWeight={700} fontFamily="Fredoka, sans-serif"
        style={{ textShadow: "0 1px 2px rgba(255,255,255,0.5)" }}>
        {company.name}
      </text>
    </g>
  );
}

const IntelligenceCube = () => {
  const [activeCompany, setActiveCompany] = useState<string | null>(null);
  const N = 10;

  return (
    <div className="space-y-8">
      <div className="flex justify-center overflow-x-auto">
        <div className="sketch-paper rounded-2xl p-4 relative">
          <div className="absolute inset-0 sketch-dots rounded-2xl pointer-events-none" />
          <svg viewBox="0 40 920 540" className="w-full max-w-[800px] relative" style={{ minWidth: 600 }}>
            <line x1={isoX(0, 0)} y1={isoY(0, 0, 0)} x2={isoX(N, 0)} y2={isoY(N, 0, 0)} stroke="hsl(var(--accent))" strokeWidth={2.5} />
            <text x={isoX(N, 0) + 8} y={isoY(N, 0, 0) + 4} fill="hsl(var(--accent))" fontSize={13} fontWeight={700} fontFamily="Fredoka, sans-serif">FUNCTIONS →</text>

            <line x1={isoX(0, 0)} y1={isoY(0, 0, 0)} x2={isoX(0, N)} y2={isoY(0, N, 0)} stroke="hsl(var(--verdict-fortified))" strokeWidth={2.5} />
            <text x={isoX(0, N) + 8} y={isoY(0, N, 0) + 16} fill="hsl(var(--verdict-fortified))" fontSize={13} fontWeight={700} fontFamily="Fredoka, sans-serif">VERTICALS →</text>

            <line x1={isoX(0, 0)} y1={isoY(0, 0, 0)} x2={isoX(0, 0)} y2={isoY(0, 0, N)} stroke="hsl(var(--verdict-exposed))" strokeWidth={2.5} />
            <text x={isoX(0, 0) - 8} y={isoY(0, 0, N) - 12} fill="hsl(var(--verdict-exposed))" fontSize={13} fontWeight={700} fontFamily="Fredoka, sans-serif" textAnchor="middle">LAYERS ↑</text>

            <IsoLine x1={isoX(N, 0)} y1={isoY(N, 0, 0)} x2={isoX(N, N)} y2={isoY(N, N, 0)} />
            <IsoLine x1={isoX(0, N)} y1={isoY(0, N, 0)} x2={isoX(N, N)} y2={isoY(N, N, 0)} />
            <IsoLine x1={isoX(0, 0)} y1={isoY(0, 0, N)} x2={isoX(N, 0)} y2={isoY(N, 0, N)} />
            <IsoLine x1={isoX(0, 0)} y1={isoY(0, 0, N)} x2={isoX(0, N)} y2={isoY(0, N, N)} />
            <IsoLine x1={isoX(N, 0)} y1={isoY(N, 0, N)} x2={isoX(N, N)} y2={isoY(N, N, N)} />
            <IsoLine x1={isoX(0, N)} y1={isoY(0, N, N)} x2={isoX(N, N)} y2={isoY(N, N, N)} />
            <IsoLine x1={isoX(N, 0)} y1={isoY(N, 0, 0)} x2={isoX(N, 0)} y2={isoY(N, 0, N)} />
            <IsoLine x1={isoX(0, N)} y1={isoY(0, N, 0)} x2={isoX(0, N)} y2={isoY(0, N, N)} />
            <IsoLine x1={isoX(N, N)} y1={isoY(N, N, 0)} x2={isoX(N, N)} y2={isoY(N, N, N)} />
            <IsoLine x1={isoX(N, 0)} y1={isoY(N, 0, 0)} x2={isoX(0, 0)} y2={isoY(0, 0, 0)} dashed />

            {FUNCTIONS.map((f, i) => (
              <text key={f} x={isoX(i + 0.5, 0)} y={isoY(i + 0.5, 0, 0) + 18}
                fill="hsl(var(--accent))" fontSize={9} fontFamily="Caveat, cursive"
                textAnchor="end" transform={`rotate(-30, ${isoX(i + 0.5, 0)}, ${isoY(i + 0.5, 0, 0) + 18})`}>{f}</text>
            ))}
            {VERTICALS.map((v, i) => (
              <text key={v} x={isoX(0, i + 0.5)} y={isoY(0, i + 0.5, 0) + 18}
                fill="hsl(var(--verdict-fortified))" fontSize={9} fontFamily="Caveat, cursive"
                textAnchor="start" transform={`rotate(30, ${isoX(0, i + 0.5)}, ${isoY(0, i + 0.5, 0) + 18})`}>{v}</text>
            ))}
            {LAYER_LABELS.map((l, i) => (
              <text key={l} x={isoX(0, 0) - 12} y={isoY(0, 0, i + 0.5)}
                fill="hsl(var(--verdict-exposed))" fontSize={9} fontFamily="Caveat, cursive"
                textAnchor="end" dominantBaseline="middle">{l}</text>
            ))}

            {COMPANIES.map((c) => (
              <IsoBox key={c.name} company={c} highlighted={activeCompany === c.name} />
            ))}
          </svg>
        </div>
      </div>

      <div className="space-y-3">
        {COMPANIES.map((c) => {
          const isActive = activeCompany === c.name;
          const vol = (c.functions[1] - c.functions[0] + 1) * (c.verticals[1] - c.verticals[0] + 1) * (c.layers[1] - c.layers[0] + 1);
          return (
            <motion.button key={c.name}
              onClick={() => setActiveCompany(isActive ? null : c.name)}
              className={`w-full text-left rounded-xl border p-4 transition-all sketch-border ${
                isActive ? "border-accent/30 bg-accent/5" : "border-border bg-card hover:bg-secondary"
              }`}
              layout>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-sm" style={{ background: c.color }} />
                  <span className="text-sm font-display font-bold text-foreground">{c.name}</span>
                </div>
                <span className="font-sketch text-xs text-muted-foreground">{vol} cells</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{c.verdict}</p>
            </motion.button>
          );
        })}
      </div>

      <p className="font-sketch text-[11px] text-muted-foreground text-center">
        The Intelligence Cube™ — Volume = Functions × Verticals × Layers = structural durability
      </p>
    </div>
  );
};

export default IntelligenceCube;
