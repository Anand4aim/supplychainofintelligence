import React from "react";

type SubLayer = string | { name: string; impact?: number; who?: string };
export interface LayerScore {
  layer: string;
  intensity?: number;
  owned?: boolean;
  note?: string;
  sublayers?: SubLayer[];
}

const layerVar = (l: string) => `--layer-${l === "L-1" ? "neg1" : l.replace("L", "")}`;
const LAYER_LABEL: Record<string, string> = {
  "L-1": "Energy & Power", L0: "Compute & Silicon", L1: "Cloud Infra", L2: "Foundation Models",
  L3: "Inference & Serving", L4: "Agents & Orchestration", L5: "Tools & APIs", L6: "Applications",
  L7: "Distribution & Trust", L8: "Memory & Continuity",
};

interface Props { layerScores: LayerScore[]; }

const SublayerImpactMap: React.FC<Props> = ({ layerScores }) => {
  const impacted = layerScores
    .filter((s) => (s.intensity ?? 0) > 0 && (s.sublayers?.length ?? 0) > 0)
    .map((s) => ({
      ...s,
      subs: (s.sublayers ?? []).map((sub) =>
        typeof sub === "string" ? { name: sub, impact: 2, who: "" } : { impact: 2, who: "", ...sub }
      ),
    }));

  if (impacted.length === 0) return null;

  return (
    <div
      className="rounded-2xl p-5 md:p-6"
      style={{
        background: "linear-gradient(145deg, hsl(40 30% 97%) 0%, hsl(38 28% 95%) 60%, hsl(40 30% 96%) 100%)",
        border: "1px solid hsl(35 20% 88%)",
      }}
    >
      <div className="space-y-5">
        {impacted.map(({ layer, subs }) => (
          <div key={layer} className="flex gap-4 items-start">
            {/* Layer column tag */}
            <div className="shrink-0 w-24">
              <div
                className="font-mono-marker text-[10px] font-bold text-white px-2 py-1 text-center rounded-sm"
                style={{ background: `hsl(var(${layerVar(layer)}))` }}
              >
                {layer}
              </div>
              <div className="text-[10px] text-muted-foreground text-center mt-1 leading-tight">
                {LAYER_LABEL[layer]}
              </div>
            </div>

            {/* Sublayer rows */}
            <div className="flex-1 space-y-2">
              {subs.map((sub, i) => {
                const impact = Math.max(1, Math.min(3, sub.impact ?? 2));
                const barAlpha = 0.85;
                return (
                  <div
                    key={i}
                    className="rounded-md px-3 py-2 flex items-center gap-3"
                    style={{
                      background: `hsl(var(${layerVar(layer)}) / 0.08)`,
                      border: `1px solid hsl(var(${layerVar(layer)}) / 0.22)`,
                    }}
                  >
                    {/* Impact bar */}
                    <div className="flex flex-col gap-[2px] shrink-0">
                      {[3, 2, 1].map((d) => (
                        <span
                          key={d}
                          className="rounded-[1px]"
                          style={{
                            width: 18,
                            height: 4,
                            background:
                              d <= impact
                                ? `hsl(var(${layerVar(layer)}) / ${barAlpha})`
                                : `hsl(var(${layerVar(layer)}) / 0.15)`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Sublayer name */}
                    <div className="flex-1 min-w-0">
                      <div
                        className="font-sketch text-[14px] font-bold leading-tight"
                        style={{ color: `hsl(var(${layerVar(layer)}))` }}
                      >
                        {sub.name}
                      </div>
                      {sub.who && (
                        <div className="text-[11px] text-foreground/65 mt-0.5 font-mono-marker">
                          plays here: <span className="text-foreground/85">{sub.who}</span>
                        </div>
                      )}
                    </div>

                    {/* Impact chip */}
                    <span
                      className="shrink-0 font-mono-marker text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide"
                      style={{
                        background: `hsl(var(${layerVar(layer)}))`,
                        color: "white",
                      }}
                    >
                      {impact === 3 ? "Owns" : impact === 2 ? "Share" : "Touch"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-foreground/10 font-mono-marker text-[10px] text-muted-foreground">
        <span>Impact: <strong className="text-foreground/80">Touch</strong> = enters · <strong className="text-foreground/80">Share</strong> = meaningful · <strong className="text-foreground/80">Owns</strong> = dominates</span>
        <span>· bars = magnitude</span>
      </div>
    </div>
  );
};

export default SublayerImpactMap;
