import React, { useState } from "react";
import { motion } from "framer-motion";
import CubeProjection2D from "@/components/live/CubeProjection2D";

const FUNCTIONS = ["Dev/Eng", "Design", "Product", "PM/Proj", "Ops", "Mktg", "Sales", "CustCare", "Strategy", "Finance"];
const VERTICALS = ["FinTech", "EdTech", "Legal", "Health", "Travel", "eCom", "Media", "Gov", "SaaS", "Horizontal"];
const LAYERS = ["L-1", "L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"];

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

const range = (axis: string[], [a, b]: [number, number]) => axis.slice(a, b + 1);

const IntelligenceCube = () => {
  const [active, setActive] = useState(COMPANIES[0].name);
  const company = COMPANIES.find((c) => c.name === active)!;
  const volume =
    (company.functions[1] - company.functions[0] + 1) *
    (company.verticals[1] - company.verticals[0] + 1) *
    (company.layers[1] - company.layers[0] + 1);

  return (
    <div className="space-y-6">
      {/* Company selector — tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {COMPANIES.map((c) => {
          const isActive = c.name === active;
          return (
            <button
              key={c.name}
              onClick={() => setActive(c.name)}
              className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                isActive
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-foreground/70 border-border hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-sm"
                style={{ background: c.color }}
              />
              <span className="font-display font-bold text-sm">{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* 2D projection for selected company */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <CubeProjection2D
          layers={range(LAYERS, company.layers)}
          verticals={range(VERTICALS, company.verticals)}
          functions={range(FUNCTIONS, company.functions)}
        />
      </motion.div>

      {/* Verdict card */}
      <div className="rounded-xl border border-border bg-card p-4 flex items-start gap-3">
        <span
          className="w-3 h-3 rounded-sm mt-1 shrink-0"
          style={{ background: company.color }}
        />
        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <p className="font-display font-bold text-foreground text-[15px]">{company.name}</p>
            <span className="font-mono-marker text-[11px] text-muted-foreground uppercase tracking-wider">
              {volume} cells
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-snug">{company.verdict}</p>
        </div>
      </div>

      <p className="font-mono-marker text-[11px] text-muted-foreground text-center uppercase tracking-wider">
        The Intelligence Cube™ — Volume = Layers × Verticals × Functions = structural durability
      </p>
    </div>
  );
};

export default IntelligenceCube;
