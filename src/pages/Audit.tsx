import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Search, Sparkles, Shield, AlertTriangle, HelpCircle, Swords, Target } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import LayerTag from "@/components/LayerTag";
import ExportablePng from "@/components/ExportablePng";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { LAYERS, SUBLAYER_LABEL, layerColor, layerVar } from "@/data/layers";

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/defensibility-audit`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type Player = { name: string; collides_at: string; note: string };
type Juggernaut = { actor: string; move: string; compresses: string; timeframe: string };
type RoadmapMove = { priority: string; horizon: string; sublayer: string; move: string; law: string; why: string };
type Gap = { sublayer: string; provenance: string; why: string };

type AuditResult = {
  company?: string;
  domain?: string;
  verdict_tier:
    | "fortress" | "tilting_fortress" | "mixed" | "exposed" | "wrapper_at_risk" | "insufficient_data";
  one_line: string;
  aha?: string;
  archetype?: string;
  layers_owned?: string[];
  layers_rented?: string[];
  sublayer_depth?: Record<string, number>;
  sublayer_gaps?: Gap[];
  roadmap?: RoadmapMove[];
  competitive_landscape?: { adjacent_players?: Player[]; juggernaut_moves?: Juggernaut[] };
  guidance?: string;
};

const tierMeta: Record<AuditResult["verdict_tier"], { label: string; color: string; bg: string; icon: typeof Shield }> = {
  fortress: { label: "Defensible", color: "hsl(var(--verdict-fortified))", bg: "hsl(var(--verdict-fortified) / 0.08)", icon: Shield },
  tilting_fortress: { label: "Defensible, Tilting", color: "hsl(var(--verdict-fortified))", bg: "hsl(var(--verdict-fortified) / 0.06)", icon: Shield },
  mixed: { label: "Contested", color: "hsl(var(--foreground))", bg: "hsl(var(--foreground) / 0.05)", icon: HelpCircle },
  exposed: { label: "At Risk", color: "hsl(var(--verdict-exposed))", bg: "hsl(var(--verdict-exposed) / 0.07)", icon: AlertTriangle },
  wrapper_at_risk: { label: "Wrapper, At Risk", color: "hsl(var(--verdict-exposed))", bg: "hsl(var(--verdict-exposed) / 0.08)", icon: AlertTriangle },
  insufficient_data: { label: "Not Enough Signal", color: "hsl(var(--muted-foreground))", bg: "hsl(var(--muted-foreground) / 0.05)", icon: HelpCircle },
};

// 10×5 Defensibility Map cell
const DefensibilityMap = ({
  depth,
  gaps,
  rented,
  compact = false,
}: {
  depth: Record<string, number>;
  gaps: Set<string>;
  rented: Set<string>;
  compact?: boolean;
}) => {
  const orderedLayers = [...LAYERS].reverse(); // L8 → L-1
  return (
    <div className="w-full">
      <div className={`grid grid-cols-[88px_repeat(5,1fr)] gap-1 mb-1 ${compact ? "" : ""}`}>
        <div />
        {["A", "B", "C", "D", "E"].map((c) => (
          <div key={c} className="text-center font-mono-marker text-[8.5px] tracking-[0.2em] uppercase text-muted-foreground">
            · {c} ·
          </div>
        ))}
      </div>
      {orderedLayers.map((layer) => {
        const isRented = rented.has(layer.id);
        return (
          <div key={layer.id} className="grid grid-cols-[88px_repeat(5,1fr)] gap-1 mb-1 items-stretch">
            <div
              className="rounded-sm px-2 py-1 flex flex-col justify-center"
              style={{
                background: `hsl(${layerVar(layer.id)} / 0.12)`,
                borderLeft: `3px solid ${layerColor(layer.id)}`,
              }}
            >
              <div className="font-mono-marker text-[9px] tracking-wider" style={{ color: layerColor(layer.id) }}>
                {layer.id.replace("L-1", "L\u22121")}
              </div>
              <div className="font-display text-[11px] font-bold leading-tight text-foreground">
                {layer.shortName}
              </div>
            </div>
            {layer.sublayers.map((sl) => {
              const d = depth[sl.id] ?? 0;
              const isGap = gaps.has(sl.id);
              const owns = d >= 3;
              const touches = d >= 1 && d < 3;
              return (
                <div
                  key={sl.id}
                  className={`relative border rounded-sm p-1 min-h-[44px] flex flex-col justify-between ${
                    owns
                      ? "border-foreground/25"
                      : isGap
                      ? "border-[hsl(var(--brand-gold)/0.6)]"
                      : "border-foreground/10"
                  }`}
                  style={{
                    background: owns
                      ? `hsl(${layerVar(layer.id)} / 0.18)`
                      : isGap
                      ? "hsl(var(--brand-gold) / 0.06)"
                      : touches
                      ? `hsl(${layerVar(layer.id)} / 0.05)`
                      : isRented
                      ? "hsl(var(--verdict-exposed) / 0.04)"
                      : "transparent",
                  }}
                  title={`${sl.id} · ${SUBLAYER_LABEL[sl.id]}${d ? ` · depth ${d}/5` : ""}${isGap ? " · counter-move" : ""}`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono-marker text-[7.5px] tracking-wider text-muted-foreground/80">
                      {sl.id.toUpperCase()}
                    </span>
                    {owns && (
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{ background: layerColor(layer.id) }}
                      />
                    )}
                    {!owns && touches && (
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full ring-1"
                        style={{ background: "transparent", borderColor: layerColor(layer.id) }}
                      />
                    )}
                    {isGap && !owns && (
                      <span className="font-mono-marker text-[7px] tracking-wider text-[hsl(var(--brand-gold))]">⌁</span>
                    )}
                  </div>
                  {!compact && (
                    <div className="text-[7.5px] leading-tight text-foreground/55 truncate">
                      {SUBLAYER_LABEL[sl.id]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
      {/* Legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[9px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-foreground/70" /> Owns (depth 3+)
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full ring-1 ring-foreground/60" /> Touches
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-sm border border-[hsl(var(--brand-gold))]" /> Counter-move
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-sm bg-[hsl(var(--verdict-exposed)/0.2)]" /> Rented layer
        </span>
      </div>
    </div>
  );
};

const AuditPage = () => {
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");

  const run = async () => {
    if (!company.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    setStage("Reading public footprint…");
    const timers = [
      setTimeout(() => setStage("Mapping to the 10 layers…"), 6000),
      setTimeout(() => setStage("Cross-checking with a second model…"), 16000),
      setTimeout(() => setStage("Almost there…"), 30000),
    ];
    try {
      const r = await fetch(FN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${ANON}` },
        body: JSON.stringify({ company: company.trim(), context: "" }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Audit failed");
      setResult(j);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      timers.forEach(clearTimeout);
      setLoading(false);
      setStage("");
    }
  };

  const tier = result ? tierMeta[result.verdict_tier] : null;
  const TierIcon = tier?.icon;
  const peers = result?.competitive_landscape?.adjacent_players?.slice(0, 3) ?? [];
  const juggernauts = result?.competitive_landscape?.juggernaut_moves?.slice(0, 3) ?? [];
  const counterMoves = result?.roadmap?.slice(0, 3) ?? [];
  const depth = result?.sublayer_depth ?? {};
  const gapSet = useMemo(() => new Set((result?.sublayer_gaps ?? []).map((g) => g.sublayer)), [result]);
  const rentedSet = useMemo(() => new Set(result?.layers_rented ?? []), [result]);

  // "What they own", top 3-4 sublayers by depth (counts-ok)
  const ownedTop = useMemo(() => {
    return Object.entries(depth)
      .filter(([, d]) => d >= 3)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([s]) => s);
  }, [depth]);

  return (
    <SiteLayout>
      <Seo
        title="AI Defensibility Map, Where a Company Sits on the 10-Layer Stack"
        description="Type a company. Get a one-page map of where it sits on the 10×5 generative AI stack, what it owns, where it's exposed, the counter-moves, and who collides with it. Two models cross-check."
        path="/audit"
      />

      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-10 max-w-3xl">
          <Eyebrow className="mb-4">The Defensibility Map</Eyebrow>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-[1.1] mb-5 text-foreground">
            One company. One map. The whole stack.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Type a company. Two models read its public footprint and plot it on the 10×5 Supply
            Chain of Intelligence™, what it owns, what it rents, the open cells where a
            counter-move lives, and the juggernauts about to compress it.
          </p>
        </div>

        {/* Single input */}
        <Card className="p-5 md:p-6 mb-8 border-2 border-foreground/15 max-w-3xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Sierra · Harvey · Cursor · Glean · Jasper…"
              className="text-base"
              disabled={loading}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && run()}
              autoFocus
            />
            <Button onClick={run} disabled={loading || !company.trim()} size="lg" className="gap-2 shrink-0">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Reading…</> : <><Search size={16} /> Map it</>}
            </Button>
          </div>
          {loading && stage && (
            <p className="mt-3 font-mono-marker text-[11px] uppercase tracking-wider text-accent animate-pulse">
              {stage}
            </p>
          )}
          {error && <p className="mt-3 text-sm text-verdict-exposed">{error}</p>}
        </Card>

        <AnimatePresence mode="wait">
          {result && tier && (
            <motion.div
              key={result.company}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Verdict ribbon */}
              <Card className="p-6 md:p-8 border-2" style={{ borderColor: tier.color, background: tier.bg }}>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {TierIcon && <TierIcon size={16} style={{ color: tier.color }} />}
                  <span className="font-mono-marker text-[11px] uppercase tracking-[0.15em]" style={{ color: tier.color }}>
                    {tier.label}
                  </span>
                  {result.archetype && (
                    <span className="font-mono-marker text-[10px] uppercase tracking-wider text-muted-foreground border border-foreground/15 px-2 py-0.5 rounded">
                      {result.archetype}
                    </span>
                  )}
                  {result.domain && (
                    <span className="font-mono-marker text-[10px] uppercase tracking-wider text-muted-foreground">
                      · {result.domain}
                    </span>
                  )}
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{result.company}</h2>
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed">{result.one_line}</p>
              </Card>

              {result.verdict_tier === "insufficient_data" && result.guidance && (
                <Card className="p-5 border-dashed">
                  <p className="text-sm text-foreground/80 leading-relaxed">{result.guidance}</p>
                </Card>
              )}

              {result.verdict_tier !== "insufficient_data" && (
                <>
                  {/* The Map */}
                  <Card className="p-4 md:p-5">
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <div>
                        <p className="font-mono-marker text-[10px] uppercase tracking-[0.15em] text-accent">
                          Defensibility Map · 10 layers × 5 sublayers per layer
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Each cell scored 0–5. Filled dot = owns. Ring = touches. Gold = open counter-move.
                        </p>
                      </div>
                    </div>
                    <DefensibilityMap depth={depth} gaps={gapSet} rented={rentedSet} />
                  </Card>

                  {/* Aha */}
                  {result.aha && (
                    <Card className="p-5 border-2 border-accent/50 bg-accent/[0.05]">
                      <div className="flex items-start gap-3">
                        <Sparkles size={18} className="text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="font-mono-marker text-[10px] uppercase tracking-[0.15em] text-accent mb-1.5">The aha</p>
                          <p className="text-[15px] md:text-base text-foreground/95 leading-relaxed font-medium">{result.aha}</p>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Three takeaway blocks */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Owns */}
                    <Card className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield size={14} className="text-verdict-fortified" />
                        <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-verdict-fortified">
                          What they own
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {ownedTop.length > 0
                          ? ownedTop.map((s) => <LayerTag key={s} id={s} variant="chip" withSublayerName link />)
                          : (result.layers_owned ?? []).map((l) => <LayerTag key={l} id={l} variant="chip" link />)}
                        {ownedTop.length === 0 && (result.layers_owned ?? []).length === 0 && (
                          <span className="text-xs text-muted-foreground italic">Nothing structural yet.</span>
                        )}
                      </div>
                      <p className="text-[12.5px] text-foreground/75 leading-snug">
                        The cells they hold deep enough to be hard to copy in 12–18 months.
                      </p>
                    </Card>

                    {/* Exposed */}
                    <Card className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle size={14} className="text-verdict-exposed" />
                        <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-verdict-exposed">
                          Where they're exposed
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {(result.layers_rented ?? []).map((l) => <LayerTag key={l} id={l} variant="chip" link />)}
                        {(!result.layers_rented || result.layers_rented.length === 0) && (
                          <span className="text-xs text-muted-foreground italic"> - </span>
                        )}
                      </div>
                      {juggernauts.length > 0 && (
                        <p className="text-[12.5px] text-foreground/75 leading-snug">
                          <span className="font-semibold text-foreground">{juggernauts[0].actor}</span> moves on{" "}
                          <span className="font-mono-marker text-[10.5px] text-foreground">{juggernauts[0].compresses}</span>{" "}
                          ({juggernauts[0].timeframe}): {juggernauts[0].move}
                        </p>
                      )}
                    </Card>

                    {/* Counter-moves */}
                    <Card className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Target size={14} className="text-accent" />
                        <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-accent">
                          Counter-moves
                        </p>
                      </div>
                      <div className="space-y-2.5">
                        {counterMoves.map((m, i) => (
                          <div key={i} className="text-[12.5px] leading-snug">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="font-mono-marker text-[9px] uppercase tracking-wider text-muted-foreground">
                                {m.priority} · {m.horizon}
                              </span>
                              <LayerTag id={m.sublayer} variant="chip" />
                            </div>
                            <p className="text-foreground/85">{m.move}</p>
                          </div>
                        ))}
                        {counterMoves.length === 0 && (result.sublayer_gaps ?? []).slice(0, 3).map((g, i) => (
                          <div key={i} className="text-[12.5px] leading-snug">
                            <LayerTag id={g.sublayer} variant="chip" />
                            <p className="text-foreground/85 mt-1">{g.why}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Peers */}
                  {peers.length > 0 && (
                    <Card className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Swords size={14} className="text-accent" />
                        <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-accent">
                          Who they collide with
                        </p>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {peers.map((p, i) => (
                          <div key={i} className="text-sm leading-snug">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="font-bold text-foreground">{p.name}</span>
                              {p.collides_at && <LayerTag id={p.collides_at} variant="chip" />}
                            </div>
                            {p.note && <p className="text-foreground/70 text-[12.5px]">{p.note}</p>}
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Shareable card */}
                  <div>
                    <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-accent mb-3">
                      Send-ready · download as PNG or PDF (A4 landscape)
                    </p>
                    <ExportablePng
                      fileName={`scoi-defensibility-${(result.company || "company").toLowerCase().replace(/\s+/g, "-")}`}
                      caption={`Defensibility Map · ${result.company}`}
                      exportSlot={
                        <div className="w-full h-full p-10 bg-background flex flex-col">
                          {/* Header */}
                          <div className="flex items-start justify-between gap-6 pb-5 border-b border-foreground/15">
                            <div className="flex-1 min-w-0">
                              <p className="font-mono-marker text-[12px] uppercase tracking-[0.18em] text-accent mb-2">
                                Defensibility Map · {result.domain || "AI Company"}
                              </p>
                              <h3 className="font-display text-4xl font-bold text-foreground leading-tight">
                                {result.company}
                              </h3>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="font-mono-marker text-[13px] uppercase tracking-[0.15em] font-bold" style={{ color: tier.color }}>
                                {tier.label}
                              </div>
                              {result.archetype && (
                                <div className="font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground mt-1">
                                  {result.archetype}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Body: map left, takeaways right */}
                          <div className="flex-1 grid grid-cols-[1.45fr_1fr] gap-8 pt-5 min-h-0">
                            <div className="min-w-0">
                              <p className="text-[15px] text-foreground/90 leading-snug mb-3 italic">
                                {result.one_line}
                              </p>
                              <div className="scale-[1.05] origin-top-left" style={{ width: "95%" }}>
                                <DefensibilityMap depth={depth} gaps={gapSet} rented={rentedSet} compact />
                              </div>
                            </div>
                            <div className="space-y-4 min-w-0">
                              {result.aha && (
                                <div className="border-l-2 border-accent pl-3">
                                  <p className="font-mono-marker text-[9px] uppercase tracking-[0.15em] text-accent mb-1">The aha</p>
                                  <p className="text-[12.5px] text-foreground leading-snug font-medium">{result.aha}</p>
                                </div>
                              )}
                              <div>
                                <p className="font-mono-marker text-[9px] uppercase tracking-[0.15em] text-verdict-fortified mb-1.5">Owns</p>
                                <div className="flex flex-wrap gap-1">
                                  {(ownedTop.length ? ownedTop : (result.layers_owned ?? [])).slice(0, 5).map((s) => (
                                    <LayerTag key={s} id={s} variant="chip" />
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="font-mono-marker text-[9px] uppercase tracking-[0.15em] text-verdict-exposed mb-1.5">Exposed</p>
                                <div className="flex flex-wrap gap-1">
                                  {(result.layers_rented ?? []).slice(0, 5).map((l) => (
                                    <LayerTag key={l} id={l} variant="chip" />
                                  ))}
                                </div>
                              </div>
                              {counterMoves.length > 0 && (
                                <div>
                                  <p className="font-mono-marker text-[9px] uppercase tracking-[0.15em] text-accent mb-1.5">Counter-moves</p>
                                  <div className="space-y-1.5">
                                    {counterMoves.slice(0, 3).map((m, i) => (
                                      <div key={i} className="text-[11.5px] leading-snug flex items-start gap-1.5">
                                        <LayerTag id={m.sublayer} variant="chip" />
                                        <span className="text-foreground/85 flex-1">{m.move}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="pt-4 mt-4 border-t border-foreground/10 flex items-center justify-between">
                            <div className="flex h-[3px] w-32 rounded-sm overflow-hidden">
                              {["neg1","0","1","2","3","4","5","6","7","8"].map((n) => (
                                <div key={n} className="flex-1" style={{ background: `hsl(var(--layer-${n}))` }} />
                              ))}
                            </div>
                            <p className="font-mono-marker text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                              The Supply Chain of Intelligence™ · supplychainofai.com
                            </p>
                          </div>
                        </div>
                      }
                    >
                      <div className="p-6 bg-background">
                        <div className="text-center text-[12px] text-muted-foreground italic">
                          Preview of the share card, use the PNG / PDF buttons above to download A4 landscape.
                        </div>
                      </div>
                    </ExportablePng>
                  </div>

                  <p className="text-[11px] font-mono-marker uppercase tracking-[0.12em] text-muted-foreground px-1">
                    Mapped from public signals. Not verified. Push back in Claude/ChatGPT using the framework at /framework.
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SiteLayout>
  );
};

export default AuditPage;
