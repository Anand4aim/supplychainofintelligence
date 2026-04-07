import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { LAYERS } from "@/data/layers";

const FUNCTIONS = [
  "Sales", "Marketing", "Engineering", "Support",
  "Finance", "Legal", "HR", "Operations", "Product",
];

const VERTICALS = [
  "Healthcare", "Finance", "Legal", "Retail",
  "Manufacturing", "Education", "Media", "Energy", "SaaS",
];

interface CompanyPlot {
  name: string;
  color: string;
  // positions as indices (0-8) on each axis
  functions: number[];   // which functions they serve
  verticals: number[];   // which verticals they serve
  layers: number[];      // which layers they own (L0-L8)
  logo?: string;
}

const COMPANIES: CompanyPlot[] = [
  {
    name: "Harvey",
    color: "#10B981",
    functions: [5],       // Legal
    verticals: [2],       // Legal
    layers: [1, 5, 8],    // L1 data, L5 skills, L8 memory
    logo: "https://logo.clearbit.com/harvey.ai",
  },
  {
    name: "Grammarly",
    color: "#15803D",
    functions: [0, 1, 3, 8], // Sales, Mktg, Support, Product
    verticals: [0, 1, 2, 3, 4, 5, 6, 7, 8], // all
    layers: [4, 5, 7, 8],  // L4 integrations, L5 skills, L7 expression, L8 memory
    logo: "https://logo.clearbit.com/grammarly.com",
  },
  {
    name: "Jasper",
    color: "#DC2626",
    functions: [1],       // Marketing only
    verticals: [0, 1, 3, 6, 8], // scattered
    layers: [7],          // L7 only — thin wrapper
    logo: "https://logo.clearbit.com/jasper.ai",
  },
];

const CUBE_SIZE = 280;
const HALF = CUBE_SIZE / 2;

/**
 * 3D Intelligence Cube™ — CSS 3D transforms
 * X = Functions, Y = Verticals, Z = Layers
 */
const IntelligenceCube = () => {
  const [rotation, setRotation] = useState({ x: -25, y: -35 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeCompany, setActiveCompany] = useState<string | null>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      setRotation((r) => ({ x: r.x + dy * 0.4, y: r.y + dx * 0.4 }));
      lastPos.current = { x: e.clientX, y: e.clientY };
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => setIsDragging(false), []);

  // Auto-rotate when not dragging
  useEffect(() => {
    if (isDragging) return;
    const id = setInterval(() => {
      setRotation((r) => ({ ...r, y: r.y + 0.15 }));
    }, 30);
    return () => clearInterval(id);
  }, [isDragging]);

  // Grid lines helper
  const gridLines = [];
  const step = CUBE_SIZE / 8;
  for (let i = 0; i <= 8; i++) {
    const pos = -HALF + i * step;
    // Lines along Z on bottom face (X-Z plane at y=HALF)
    gridLines.push(
      <line key={`bx${i}`} x1={-HALF} y1={pos} x2={HALF} y2={pos} stroke="rgba(99,102,241,0.12)" strokeWidth="0.5" />,
      <line key={`bz${i}`} x1={pos} y1={-HALF} x2={pos} y2={HALF} stroke="rgba(99,102,241,0.12)" strokeWidth="0.5" />
    );
  }

  // Map company to 3D dot positions
  const companyDots = COMPANIES.flatMap((company) => {
    const dots: { x: number; y: number; z: number; company: CompanyPlot }[] = [];
    for (const fn of company.functions) {
      for (const vt of company.verticals) {
        for (const ly of company.layers) {
          dots.push({
            x: -HALF + fn * step + step / 2,
            y: -HALF + vt * step + step / 2,
            z: -HALF + ly * step + step / 2,
            company,
          });
        }
      }
    }
    return dots;
  });

  return (
    <div className="relative">
      {/* Axis labels */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[2px]">
          <span className="text-indigo">X: Functions</span>
          <span className="text-emerald-400">Y: Verticals</span>
          <span style={{ color: "hsl(var(--layer-4))" }}>Z: Layers (L0–L8)</span>
        </div>
      </div>

      {/* 3D scene */}
      <div
        ref={containerRef}
        className="relative mx-auto select-none cursor-grab active:cursor-grabbing"
        style={{
          width: CUBE_SIZE + 120,
          height: CUBE_SIZE + 120,
          perspective: "900px",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          {/* Wireframe edges */}
          {[
            // Bottom face edges (y = HALF)
            [[-HALF, HALF, -HALF], [HALF, HALF, -HALF]],
            [[HALF, HALF, -HALF], [HALF, HALF, HALF]],
            [[HALF, HALF, HALF], [-HALF, HALF, HALF]],
            [[-HALF, HALF, HALF], [-HALF, HALF, -HALF]],
            // Top face edges (y = -HALF)
            [[-HALF, -HALF, -HALF], [HALF, -HALF, -HALF]],
            [[HALF, -HALF, -HALF], [HALF, -HALF, HALF]],
            [[HALF, -HALF, HALF], [-HALF, -HALF, HALF]],
            [[-HALF, -HALF, HALF], [-HALF, -HALF, -HALF]],
            // Vertical edges
            [[-HALF, -HALF, -HALF], [-HALF, HALF, -HALF]],
            [[HALF, -HALF, -HALF], [HALF, HALF, -HALF]],
            [[HALF, -HALF, HALF], [HALF, HALF, HALF]],
            [[-HALF, -HALF, HALF], [-HALF, HALF, HALF]],
          ].map(([from, to], i) => {
            const midX = (from[0] + to[0]) / 2;
            const midY = (from[1] + to[1]) / 2;
            const midZ = (from[2] + to[2]) / 2;
            const dx = to[0] - from[0];
            const dy = to[1] - from[1];
            const dz = to[2] - from[2];
            const length = Math.sqrt(dx * dx + dy * dy + dz * dz);

            // Determine rotation for the line
            let rotateY = 0, rotateX = 0, rotateZ = 0;
            if (Math.abs(dx) > 0) { /* along X */ }
            else if (Math.abs(dy) > 0) { rotateZ = 90; }
            else { rotateY = 90; }

            return (
              <div
                key={`edge-${i}`}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: `${length}px`,
                  height: "1px",
                  background: "linear-gradient(90deg, rgba(99,102,241,0.25), rgba(99,102,241,0.08))",
                  transformStyle: "preserve-3d",
                  transform: `translate3d(${midX - length / 2}px, ${midY}px, ${midZ}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
                }}
              />
            );
          })}

          {/* Layer planes (semi-transparent slices along Z) */}
          {LAYERS.map((layer, i) => {
            const z = -HALF + i * step + step / 2;
            return (
              <div
                key={layer.id}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: CUBE_SIZE,
                  height: CUBE_SIZE,
                  transformStyle: "preserve-3d",
                  transform: `translate3d(${-HALF}px, ${-HALF}px, ${z}px)`,
                  background: `hsl(${layer.color} / 0.04)`,
                  border: `1px solid hsl(${layer.color} / 0.12)`,
                  pointerEvents: "none",
                }}
              />
            );
          })}

          {/* Company dots */}
          {companyDots.map((dot, i) => {
            const isActive = activeCompany === dot.company.name;
            const size = isActive ? 6 : 4;
            return (
              <div
                key={`dot-${i}`}
                className="rounded-full transition-all duration-200"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: size,
                  height: size,
                  marginLeft: -size / 2,
                  marginTop: -size / 2,
                  background: dot.company.color,
                  boxShadow: isActive
                    ? `0 0 8px ${dot.company.color}, 0 0 16px ${dot.company.color}40`
                    : `0 0 4px ${dot.company.color}60`,
                  opacity: activeCompany && !isActive ? 0.15 : 0.85,
                  transformStyle: "preserve-3d",
                  transform: `translate3d(${dot.x}px, ${dot.y}px, ${dot.z}px)`,
                }}
              />
            );
          })}

          {/* Axis arrow labels in 3D space */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate3d(${HALF + 12}px, ${HALF + 8}px, ${-HALF}px)`,
              transformStyle: "preserve-3d",
              whiteSpace: "nowrap",
            }}
          >
            <span className="text-[9px] font-bold text-indigo/60 uppercase tracking-wider">Functions →</span>
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate3d(${-HALF - 8}px, ${-HALF - 12}px, ${-HALF}px)`,
              transformStyle: "preserve-3d",
              whiteSpace: "nowrap",
            }}
          >
            <span className="text-[9px] font-bold text-emerald-400/60 uppercase tracking-wider">↑ Verticals</span>
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate3d(${-HALF - 8}px, ${HALF + 8}px, ${HALF + 12}px)`,
              transformStyle: "preserve-3d",
              whiteSpace: "nowrap",
            }}
          >
            <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "hsl(var(--layer-4) / 0.6)" }}>Layers →</span>
          </div>
        </div>
      </div>

      {/* Company legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
        {COMPANIES.map((c) => (
          <button
            key={c.name}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-xs font-medium ${
              activeCompany === c.name
                ? "border-white/20 bg-white/10 text-white"
                : "border-white/5 bg-white/[0.03] text-white/50 hover:bg-white/[0.06]"
            }`}
            onClick={() => setActiveCompany(activeCompany === c.name ? null : c.name)}
          >
            {c.logo && (
              <img
                src={c.logo}
                alt={c.name}
                className="w-4 h-4 rounded-sm object-contain bg-white p-0.5"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            )}
            <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
            {c.name}
            <span className="text-[9px] text-white/25">
              {c.layers.length}L · {c.functions.length}F · {c.verticals.length}V
            </span>
          </button>
        ))}
      </div>

      {/* Active company detail */}
      {activeCompany && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center"
        >
          {(() => {
            const c = COMPANIES.find((co) => co.name === activeCompany)!;
            return (
              <div className="inline-block bg-white/[0.04] border border-white/[0.08] rounded-lg px-5 py-3">
                <span className="text-sm font-bold text-white">{c.name}</span>
                <span className="text-xs text-white/30 ml-2">
                  Layers: {c.layers.map((l) => `L${l}`).join(", ")} ·
                  Functions: {c.functions.map((f) => FUNCTIONS[f]).join(", ")} ·
                  Verticals: {c.verticals.length === 9 ? "All" : c.verticals.map((v) => VERTICALS[v]).join(", ")}
                </span>
                <p className="text-[10px] text-white/20 mt-1">
                  Volume = {c.layers.length} × {c.functions.length} × {c.verticals.length} = {c.layers.length * c.functions.length * c.verticals.length} cells
                  {c.layers.length * c.functions.length * c.verticals.length < 20 && " — thin sliver ⚠️"}
                  {c.layers.length * c.functions.length * c.verticals.length >= 100 && " — structural fortress ✓"}
                </p>
              </div>
            );
          })()}
        </motion.div>
      )}

      <p className="text-[9px] text-white/15 text-center mt-3">
        Drag to rotate · Click a company to isolate · Volume = structural durability
      </p>
    </div>
  );
};

export default IntelligenceCube;
