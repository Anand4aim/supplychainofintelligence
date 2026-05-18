import React from "react";
import { LAYER_LABEL, LAYER_SHORT_LABEL, layerVar } from "@/data/layers";
import SublayerImpactMap from "@/components/live/SublayerImpactMap";
import CubeProjection2D from "@/components/live/CubeProjection2D";
import ExportablePng from "@/components/ExportablePng";
import type { LayerScore, CubePosition, TimelinePoint, WinnerLoser } from "@/components/CaseStudyCard";
import Eyebrow from "@/components/Eyebrow";

const LAYER_ORDER = ["L-1", "L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"];

interface Props {
  layer_scores?: LayerScore[];
  fallback_layers?: string[]; // existing CaseStudy.layers — used if no layer_scores
  cube_position?: CubePosition;
  timeline?: TimelinePoint[];
  who_wins?: WinnerLoser[];
  who_loses?: WinnerLoser[];
  counter_thesis?: string;
}

const DepthModules: React.FC<Props> = ({
  layer_scores,
  fallback_layers,
  cube_position,
  timeline,
  who_wins,
  who_loses,
  counter_thesis,
}) => {
  // Build effective layer_scores. If none provided, infer from fallback_layers.
  const effective: LayerScore[] =
    layer_scores && layer_scores.length > 0
      ? layer_scores
      : (fallback_layers ?? []).map((l) => ({ layer: l, owned: true, intensity: 3 }));

  const scoreMap = new Map(effective.map((s) => [s.layer, s]));
  const hasAnyScore = effective.length > 0;
  const hasSublayers = effective.some((s) => (s.intensity ?? 0) > 0 && (s.sublayers?.length ?? 0) > 0);
  const hasCube = !!cube_position && (
    (cube_position.functions?.length ?? 0) +
    (cube_position.verticals?.length ?? 0) +
    (cube_position.layers?.length ?? 0) > 0
  );
  const hasTimeline = (timeline?.length ?? 0) > 0;
  const hasWinners = (who_wins?.length ?? 0) > 0 || (who_loses?.length ?? 0) > 0;

  return (
    <div className="space-y-12 my-12">
      {hasAnyScore && (
        <section>
          <Eyebrow className="mb-4">Layer Scoring</Eyebrow>
          <ExportablePng
            fileName="layer-scoring"
            caption="Layer Scoring"
            exportBackground="hsl(40 30% 97%)"
          >
          <div
            className="p-3 sm:p-5 md:p-6 overflow-x-auto"
            style={{
              background: "linear-gradient(145deg, hsl(40 30% 97%) 0%, hsl(38 28% 95%) 60%, hsl(40 30% 96%) 100%)",
              border: "1px solid hsl(35 20% 88%)",
            }}
          >
            <div className="min-w-[520px]">
              <div className="grid grid-cols-10 gap-1.5 mb-3">
                {LAYER_ORDER.map((layer) => (
                  <div
                    key={layer}
                    className="text-center font-mono-marker text-[10px] font-bold py-1.5 px-0.5 rounded-sm text-white leading-[1.15]"
                    style={{ background: `hsl(var(${layerVar(layer)}))` }}
                    title={LAYER_LABEL[layer]}
                  >
                    <div>{layer}</div>
                    <div className="text-[9px] opacity-95 mt-0.5">{LAYER_SHORT_LABEL[layer]}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-10 gap-1.5">
                {LAYER_ORDER.map((layer) => {
                  const s = scoreMap.get(layer);
                  const intensity = s?.intensity ?? (s?.owned ? 2 : 0);
                  return (
                    <div key={layer} className="flex justify-center items-center gap-[3px] h-7">
                      {[1, 2, 3].map((d) => (
                        <span
                          key={d}
                          className="rounded-full"
                          style={{
                            width: 7,
                            height: 7,
                            background: d <= intensity ? `hsl(var(${layerVar(layer)}))` : "transparent",
                            border: d <= intensity ? "none" : "1px solid hsl(var(--foreground) / 0.12)",
                          }}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 space-y-2.5">
              {LAYER_ORDER.map((layer) => {
                const s = scoreMap.get(layer);
                const intensity = s?.intensity ?? (s?.owned ? 2 : 0);
                if (intensity === 0 || !s?.note) return null;
                return (
                  <div key={layer} className="flex gap-3 items-start">
                    <span
                      className="font-mono-marker text-[10px] font-bold text-white px-2 py-0.5 text-center shrink-0 mt-0.5 whitespace-nowrap"
                      style={{ background: `hsl(var(${layerVar(layer)}))` }}
                    >
                      {layer} {LAYER_SHORT_LABEL[layer]}
                    </span>
                    <div className="flex-1 text-[14px] leading-snug text-foreground">{s.note}</div>
                  </div>
                );
              })}
            </div>
          </div>
          </ExportablePng>
        </section>
      )}

      {hasSublayers && (
        <section>
          <Eyebrow className="mb-2">Sublayer Impact Map</Eyebrow>
          <p className="text-foreground/70 text-[14px] mb-4 italic">
            Which of the 50 sublayers this case actually touches, and at what magnitude.
          </p>
          <SublayerImpactMap layerScores={effective} />
        </section>
      )}

      {hasCube && (
        <section>
          <Eyebrow className="mb-2">Intelligence Cube · 2D</Eyebrow>
          <p className="text-foreground/70 text-[14px] mb-4 italic">
            Footprint across Functions × Verticals × Layers — the three axes that determine structural fate.
          </p>
          <CubeProjection2D
            functions={cube_position!.functions}
            verticals={cube_position!.verticals}
            layers={cube_position!.layers}
          />
        </section>
      )}

      {hasTimeline && (
        <section>
          <Eyebrow className="mb-4">Timeline</Eyebrow>
          <div className="relative pl-6 border-l-2 border-foreground/15 space-y-5">
            {timeline!.map((t, i) => {
              const dotColor =
                t.tone === "up"
                  ? "hsl(var(--verdict-fortified))"
                  : t.tone === "down"
                  ? "hsl(var(--verdict-exposed))"
                  : "hsl(var(--foreground) / 0.4)";
              return (
                <div key={i} className="relative">
                  <span
                    className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full"
                    style={{ background: dotColor, border: "2px solid hsl(var(--background))" }}
                  />
                  <p className="font-mono-marker text-[11px] text-muted-foreground mb-0.5">{t.date}</p>
                  <p className="text-[15px] text-foreground leading-snug">{t.label}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {hasWinners && (
        <section className="grid md:grid-cols-2 gap-6">
          {(who_wins?.length ?? 0) > 0 && (
            <div className="border-l-4 border-[hsl(var(--verdict-fortified))] pl-4">
              <p className="font-sketch text-base font-bold text-[hsl(var(--verdict-fortified))] mb-3">— Who Wins</p>
              <ul className="space-y-3">
                {who_wins!.map((w, i) => (
                  <li key={i} className="text-[15px] leading-snug">
                    <span className="font-display font-bold text-foreground">{w.name}.</span>{" "}
                    <span className="text-foreground/75">{w.reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {(who_loses?.length ?? 0) > 0 && (
            <div className="border-l-4 border-[hsl(var(--verdict-exposed))] pl-4">
              <p className="font-sketch text-base font-bold text-[hsl(var(--verdict-exposed))] mb-3">— Who Loses</p>
              <ul className="space-y-3">
                {who_loses!.map((w, i) => (
                  <li key={i} className="text-[15px] leading-snug">
                    <span className="font-display font-bold text-foreground">{w.name}.</span>{" "}
                    <span className="text-foreground/75">{w.reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {counter_thesis && (
        <section className="bg-card border-l-4 border-foreground/40 p-5">
          <p className="font-sketch text-base font-bold text-foreground/70 mb-2">— Steelman: The Counter-Thesis</p>
          <p className="text-foreground/85 leading-relaxed text-[16px] whitespace-pre-line">{counter_thesis}</p>
        </section>
      )}
    </div>
  );
};

export default DepthModules;
