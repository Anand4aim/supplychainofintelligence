import React, { useState } from "react";
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
  functions: number[];
  verticals: number[];
  layers: number[];
  volume: string;
  verdict: string;
}

const COMPANIES: CompanyPlot[] = [
  {
    name: "Grammarly",
    color: "#15803D",
    functions: [0, 1, 3, 8],
    verticals: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    layers: [4, 5, 7, 8],
    volume: "4F × 9V × 4L = 144 cells",
    verdict: "Structural fortress — deep, wide, multi-layer. Hard to displace.",
  },
  {
    name: "Harvey",
    color: "#10B981",
    functions: [5],
    verticals: [2],
    layers: [1, 5, 8],
    volume: "1F × 1V × 3L = 3 cells",
    verdict: "Vertical spike — narrow but deep. Defensible if layers harden.",
  },
  {
    name: "Jasper",
    color: "#DC2626",
    functions: [1],
    verticals: [0, 1, 3, 6, 8],
    layers: [7],
    volume: "1F × 5V × 1L = 5 cells",
    verdict: "Thin wrapper — single layer, easily dissolved when L7 commoditizes.",
  },
];

const IntelligenceCube = () => {
  const [activeCompany, setActiveCompany] = useState<string | null>(null);

  const active = activeCompany ? COMPANIES.find((c) => c.name === activeCompany) : null;

  return (
    <div className="space-y-8">
      {/* Concept explanation */}
      <div className="grid md:grid-cols-3 gap-4 text-center">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-5">
          <p className="text-xs font-bold uppercase tracking-[2px] text-indigo mb-2">X-Axis</p>
          <p className="text-base font-display font-bold text-white mb-1">9 Functions</p>
          <p className="text-xs text-white/40">{FUNCTIONS.join(" · ")}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-5">
          <p className="text-xs font-bold uppercase tracking-[2px] text-emerald-400 mb-2">Y-Axis</p>
          <p className="text-base font-display font-bold text-white mb-1">9 Verticals</p>
          <p className="text-xs text-white/40">{VERTICALS.join(" · ")}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-5">
          <p className="text-xs font-bold uppercase tracking-[2px] mb-2" style={{ color: "hsl(var(--layer-4))" }}>Z-Axis</p>
          <p className="text-base font-display font-bold text-white mb-1">9 Layers (L0–L8)</p>
          <p className="text-xs text-white/40">{LAYERS.map((l) => l.id).join(" · ")}</p>
        </div>
      </div>

      {/* Core insight */}
      <div className="bg-indigo/5 border border-indigo/15 rounded-lg p-5 text-center">
        <p className="text-sm text-white/70">
          Every AI company occupies a <span className="text-white font-bold">volume</span> inside this 9 × 9 × 9 cube.
        </p>
        <p className="text-sm text-white/50 mt-1">
          Volume = Functions served × Verticals covered × Layers owned.{" "}
          <span className="text-white/70 font-medium">More volume = harder to dissolve.</span>
        </p>
      </div>

      {/* Company comparison */}
      <div className="space-y-3">
        {COMPANIES.map((c) => {
          const isActive = activeCompany === c.name;
          const cellCount = c.functions.length * c.verticals.length * c.layers.length;
          return (
            <motion.button
              key={c.name}
              onClick={() => setActiveCompany(isActive ? null : c.name)}
              className={`w-full text-left rounded-lg border p-5 transition-all ${
                isActive
                  ? "border-white/15 bg-white/[0.06]"
                  : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
              }`}
              layout
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: c.color }}
                  />
                  <span className="text-base font-display font-bold text-white">{c.name}</span>
                </div>
                <span className="text-xs text-white/30 font-mono">{c.volume}</span>
              </div>

              {/* Visual volume bar */}
              <div className="w-full bg-white/[0.04] rounded-full h-2 mb-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((cellCount / 150) * 100, 100)}%`,
                    background: c.color,
                    opacity: 0.7,
                  }}
                />
              </div>

              <p className="text-sm text-white/50">{c.verdict}</p>

              {isActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-4 text-xs"
                >
                  <div>
                    <p className="text-indigo font-bold mb-1">Functions ({c.functions.length})</p>
                    <p className="text-white/40">{c.functions.map((f) => FUNCTIONS[f]).join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-emerald-400 font-bold mb-1">Verticals ({c.verticals.length})</p>
                    <p className="text-white/40">
                      {c.verticals.length === 9 ? "All 9" : c.verticals.map((v) => VERTICALS[v]).join(", ")}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold mb-1" style={{ color: "hsl(var(--layer-4))" }}>
                      Layers ({c.layers.length})
                    </p>
                    <p className="text-white/40">{c.layers.map((l) => `L${l}`).join(", ")}</p>
                  </div>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <p className="text-[10px] text-white/20 text-center">
        Click a company to see its position in the cube · Volume = structural durability
      </p>
    </div>
  );
};

export default IntelligenceCube;
