import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, HelpCircle, Loader2, Search, CheckCircle2, XCircle, Circle, Swords, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import LayerTag from "@/components/LayerTag";
import ExportablePng from "@/components/ExportablePng";
import IntelligenceGrid from "@/components/IntelligenceGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/defensibility-audit`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type SubClaim = { sublayer: string; confidence: "high" | "medium" | "low"; evidence: string; cross_confirmed?: boolean };
type Gap = { sublayer: string; why: string };
type Player = { name: string; collides_at: string; note: string };
type Juggernaut = { actor: string; move: string; compresses: string; timeframe: "shipped" | "0-6mo" | "6-18mo" };
type RoadmapMove = { priority: "P0" | "P1" | "P2"; horizon: "90d" | "180d" | "365d"; sublayer: string; move: string; why: string };
type AuditResult = {
  company?: string;
  domain?: string;
  verdict_tier: "fortress" | "tilting_fortress" | "mixed" | "exposed" | "wrapper_at_risk" | "insufficient_data";
  score: number | null;
  one_line: string;
  layers_owned?: string[];
  layers_rented?: string[];
  sublayer_claims?: SubClaim[];
  sublayer_gaps?: Gap[];
  sublayer_depth?: Record<string, number>;
  triangle?: { proprietary_data: string; deep_execution: string; compounding_memory: string };
  archetype?: string;
  laws_triggered?: string[];
  strengths?: string[];
  risks?: string[];
  competitive_landscape?: { adjacent_players: Player[]; juggernaut_moves: Juggernaut[] };
  roadmap?: RoadmapMove[];
  open_questions?: string[];
  snippet?: string;
  guidance?: string;
  research_snippet?: string;
  cross_check?: { drafter_score: number; critic_score: number; drafter_tier: string; critic_tier: string };
};

const prioStyle: Record<"P0" | "P1" | "P2", string> = {
  P0: "bg-verdict-exposed/15 text-verdict-exposed border-verdict-exposed/40",
  P1: "bg-accent/15 text-accent border-accent/40",
  P2: "bg-foreground/10 text-foreground/70 border-foreground/20",
};
const tfStyle: Record<Juggernaut["timeframe"], string> = {
  shipped: "bg-verdict-exposed/15 text-verdict-exposed",
  "0-6mo": "bg-accent/15 text-accent",
  "6-18mo": "bg-foreground/10 text-foreground/70",
};

const tierMeta: Record<AuditResult["verdict_tier"], { label: string; color: string; bg: string; icon: typeof Shield }> = {
  fortress: { label: "Fortress", color: "hsl(var(--verdict-fortified))", bg: "hsl(var(--verdict-fortified) / 0.1)", icon: Shield },
  tilting_fortress: { label: "Tilting Fortress", color: "hsl(var(--verdict-fortified))", bg: "hsl(var(--verdict-fortified) / 0.08)", icon: Shield },
  mixed: { label: "Ambiguous", color: "hsl(var(--foreground))", bg: "hsl(var(--foreground) / 0.06)", icon: HelpCircle },
  exposed: { label: "Exposed", color: "hsl(var(--verdict-exposed))", bg: "hsl(var(--verdict-exposed) / 0.08)", icon: AlertTriangle },
  wrapper_at_risk: { label: "Wrapper-at-Risk", color: "hsl(var(--verdict-exposed))", bg: "hsl(var(--verdict-exposed) / 0.1)", icon: AlertTriangle },
  insufficient_data: { label: "Insufficient Data", color: "hsl(var(--muted-foreground))", bg: "hsl(var(--muted-foreground) / 0.06)", icon: HelpCircle },
};

const TriangleSide = ({ label, status }: { label: string; status: string }) => {
  const Icon = status === "true" ? CheckCircle2 : status === "partial" ? Circle : XCircle;
  const color = status === "true" ? "text-verdict-fortified" : status === "partial" ? "text-foreground/60" : "text-verdict-exposed";
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} className={color} />
      <span className="text-sm text-foreground/80">{label}</span>
      <span className={`ml-auto font-mono-marker text-[10px] uppercase ${color}`}>{status === "true" ? "Present" : status === "partial" ? "Building" : "Absent"}</span>
    </div>
  );
};

const ConfidenceDots = ({ c }: { c: "high" | "medium" | "low" }) => {
  const n = c === "high" ? 3 : c === "medium" ? 2 : 1;
  return (
    <div className="inline-flex gap-0.5">
      {[1, 2, 3].map((i) => (
        <span key={i} className={`w-1.5 h-1.5 rounded-full ${i <= n ? "bg-accent" : "bg-foreground/15"}`} />
      ))}
    </div>
  );
};

const AuditPage = () => {
  const [company, setCompany] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");

  const run = async () => {
    if (!company.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    setStage("Researching public footprint…");
    setProgress(5);
    // staged messaging + progress during a single long call
    const timers = [
      setTimeout(() => { setStage("Mapping to the 10 layers…"); setProgress(28); }, 4500),
      setTimeout(() => { setStage("Cross-checking with a second model…"); setProgress(55); }, 12000),
      setTimeout(() => { setStage("Reconciling verdicts…"); setProgress(80); }, 22000),
      setTimeout(() => { setStage("Almost there…"); setProgress(92); }, 35000),
    ];
    try {
      const r = await fetch(FN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${ANON}` },
        body: JSON.stringify({ company: company.trim(), context: context.trim() }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Audit failed");
      setProgress(100);
      setResult(j);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      timers.forEach(clearTimeout);
      setLoading(false);
      setStage("");
      setTimeout(() => setProgress(0), 600);
    }
  };

  const tier = result ? tierMeta[result.verdict_tier] : null;
  const TierIcon = tier?.icon;

  return (
    <SiteLayout>
      <Seo
        title="AI Defensibility Lens — Read Any Company by Layer"
        description="A diagnostic lens, not a scoring app. Paste a company, get a layer-by-layer reading of where its defensibility actually sits on the 10-layer generative AI stack. Two models cross-check; the verdict is conservative by design."
        path="/audit"
      />

      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12">
          <Eyebrow className="mb-4">The Defensibility Lens</Eyebrow>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-[1.1] mb-5 text-foreground">
            A lens for reading AI companies, not a calculator for ranking them.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Paste a company. Get a layer-by-layer reading against the 10-layer Supply Chain of Intelligence™ — what they own, what they rent, and which sublayers actually hold. Two models audit independently and we keep the conservative read.
          </p>
          <p className="mt-4 text-sm text-muted-foreground/90 leading-relaxed max-w-3xl border-l-2 border-accent/40 pl-4">
            <span className="font-semibold text-foreground/80">What this is, honestly:</span> the score is a structuring device, not the answer. The real output is the sublayer-by-sublayer reframe — a vocabulary for arguing about defensibility instead of vibes. Treat it as a companion to the case studies, not a verdict machine.
          </p>
        </div>


        {/* Form */}
        <Card className="p-6 md:p-8 mb-10 border-2 border-foreground/15">
          <div className="space-y-5">
            <div>
              <Label htmlFor="company" className="font-mono-marker text-[11px] uppercase tracking-wider text-foreground/70">
                Company name
              </Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Sierra, Harvey, Jasper, Cursor, Glean"
                className="mt-2 text-base"
                disabled={loading}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && run()}
              />
            </div>
            <div>
              <Label htmlFor="context" className="font-mono-marker text-[11px] uppercase tracking-wider text-foreground/70">
                Optional context <span className="text-muted-foreground/70 normal-case">(early-stage? not much public data? paste what you know)</span>
              </Label>
              <Textarea
                id="context"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="What they ship, who their customers are, what data they own, how the workflow works…"
                className="mt-2 min-h-[100px] text-sm"
                disabled={loading}
                maxLength={2000}
              />
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={run} disabled={loading || !company.trim()} size="lg" className="gap-2">
                {loading ? <><Loader2 size={16} className="animate-spin" /> Auditing…</> : <><Search size={16} /> Run audit</>}
              </Button>
              {loading && stage && (
                <span className="font-mono-marker text-[11px] uppercase tracking-wider text-accent animate-pulse">{stage}</span>
              )}
            </div>
            {loading && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="font-mono-marker text-[10px] uppercase tracking-wider text-muted-foreground">
                  Usually 30–60 seconds. Keep this tab open.
                </p>
              </div>
            )}
            {error && <p className="text-sm text-verdict-exposed">{error}</p>}
          </div>
        </Card>

        {/* Result */}
        <AnimatePresence mode="wait">
          {result && tier && (
            <motion.div
              key={result.company}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Score header */}
              <Card className="p-8 border-2" style={{ borderColor: tier.color, background: tier.bg }}>
                <div className="flex items-start justify-between gap-6 flex-wrap">
                  <div className="flex-1 min-w-[260px]">
                    <div className="flex items-center gap-2 mb-3">
                      {TierIcon && <TierIcon size={18} style={{ color: tier.color }} />}
                      <span className="font-mono-marker text-[11px] uppercase tracking-[0.15em]" style={{ color: tier.color }}>
                        {tier.label}
                      </span>
                      {result.archetype && (
                        <span className="font-mono-marker text-[10px] uppercase tracking-wider text-muted-foreground border border-foreground/15 px-2 py-0.5 rounded">
                          {result.archetype}
                        </span>
                      )}
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{result.company}</h2>
                    <p className="text-base md:text-lg text-foreground/90 leading-relaxed">{result.one_line}</p>
                  </div>
                  {typeof result.score === "number" && (
                    <div className="text-right">
                      <div className="font-display text-6xl md:text-7xl font-bold leading-none" style={{ color: tier.color }}>
                        {result.score}
                      </div>
                      <div className="font-mono-marker text-[10px] uppercase tracking-wider text-muted-foreground mt-1">/ 100 defensibility</div>
                      {/* Meter bar */}
                      <div className="w-44 h-1.5 bg-foreground/10 rounded-full mt-3 overflow-hidden ml-auto">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.score}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full rounded-full"
                          style={{ background: tier.color }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Honesty banner — sets expectations before they share */}
              <div className="text-[11px] font-mono-marker uppercase tracking-[0.12em] text-muted-foreground -mt-2 px-1">
                Mapped from user-provided inputs + public footprint. Not verified. Not an endorsement. You can push back or remap in Claude/ChatGPT with the blank template below.
              </div>


              {/* Insufficient data branch */}
              {result.verdict_tier === "insufficient_data" && result.guidance && (
                <Card className="p-6 border-dashed">
                  <p className="text-sm text-foreground/80 leading-relaxed mb-3">{result.guidance}</p>
                  {result.research_snippet && (
                    <details className="text-xs text-muted-foreground">
                      <summary className="cursor-pointer font-mono-marker uppercase tracking-wider">What we found</summary>
                      <p className="mt-2 leading-relaxed whitespace-pre-wrap">{result.research_snippet}</p>
                    </details>
                  )}
                </Card>
              )}

              {/* Full audit */}
              {result.verdict_tier !== "insufficient_data" && (
                <>
                  {/* EXECUTIVE VERDICT — read in 15 seconds */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <Card className="p-4">
                      <p className="font-mono-marker text-[9px] uppercase tracking-[0.12em] text-muted-foreground mb-1.5">Archetype</p>
                      <p className="font-display text-base font-bold text-foreground leading-tight">{result.archetype || "—"}</p>
                    </Card>
                    <Card className="p-4">
                      <p className="font-mono-marker text-[9px] uppercase tracking-[0.12em] text-verdict-exposed mb-1.5">Biggest risk</p>
                      <p className="text-[13px] text-foreground/85 leading-snug">{result.risks?.[0] || "—"}</p>
                    </Card>
                    <Card className="p-4">
                      <p className="font-mono-marker text-[9px] uppercase tracking-[0.12em] text-verdict-fortified mb-1.5">Biggest opportunity</p>
                      {result.sublayer_gaps?.[0] ? (
                        <>
                          <div className="mb-1 [&>span]:!whitespace-normal [&>span]:max-w-full"><LayerTag id={result.sublayer_gaps[0].sublayer} variant="chip" withSublayerName /></div>
                          <p className="text-[12px] text-foreground/75 leading-snug">{result.sublayer_gaps[0].why}</p>
                        </>
                      ) : <p className="text-[13px] text-foreground/85 leading-snug">{result.strengths?.[0] || "—"}</p>}
                    </Card>
                    <Card className="p-4">
                      <p className="font-mono-marker text-[9px] uppercase tracking-[0.12em] text-accent mb-1.5">Top threat</p>
                      {result.competitive_landscape?.juggernaut_moves?.[0] ? (
                        <p className="text-[13px] text-foreground/85 leading-snug">
                          <span className="font-bold">{result.competitive_landscape.juggernaut_moves[0].actor}</span>{" "}
                          <span className="text-muted-foreground">({result.competitive_landscape.juggernaut_moves[0].timeframe})</span>
                          {" "}— {result.competitive_landscape.juggernaut_moves[0].move}
                        </p>
                      ) : <p className="text-[13px] text-foreground/85 leading-snug">—</p>}
                    </Card>
                  </div>

                  {/* The Map — 10×5 grid with depth dots. Most shareable artifact. */}
                  {result.sublayer_depth && Object.keys(result.sublayer_depth).length > 0 && (
                    <div>
                      <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-accent mb-3">
                        The map · where {result.company} plays on the 10-layer stack
                      </p>
                      <ExportablePng
                        fileName={`scoi-grid-${(result.company || "company").toLowerCase().replace(/\s+/g, "-")}`}
                        caption={`${result.company} on the Supply Chain of Intelligence`}
                      >
                        <IntelligenceGrid
                          mode="audit"
                          sublayerDepth={result.sublayer_depth}
                          title={`${result.company} — depth across the 10 layers`}
                          subtitle={result.domain || undefined}
                        />
                      </ExportablePng>
                    </div>
                  )}

                  {/* Sublayer-level Owns / Partial / Rents map. Derived from sublayer_depth so
                      we never overclaim a whole layer when the company only touches a few cells.
                      Downloadable so customers can paste into a deck. */}
                  {(() => {
                    const depth = result.sublayer_depth || {};
                    const entries = Object.entries(depth).filter(([, v]) => v > 0);
                    const owns = entries.filter(([, v]) => v >= 3).sort((a, b) => b[1] - a[1]).map(([k]) => k);
                    const partial = entries.filter(([, v]) => v >= 1 && v <= 2).sort((a, b) => b[1] - a[1]).map(([k]) => k);
                    return (
                      <ExportablePng
                        fileName={`scoi-positioning-${(result.company || "company").toLowerCase().replace(/\s+/g, "-")}`}
                        caption={`${result.company} — Owns / Partial / Rents`}
                      >
                        <Card className="p-5 bg-background">
                          <p className="font-mono-marker text-[10px] uppercase tracking-[0.15em] text-accent mb-1">{result.company} · positioning</p>
                          <p className="font-display text-lg text-foreground mb-4">Owns · Partial · Rents</p>
                          <div className="grid sm:grid-cols-3 gap-4">
                            <div>
                              <p className="font-mono-marker text-[9px] uppercase tracking-[0.12em] text-verdict-fortified mb-2">Owns · sublayer depth 3+</p>
                              <div className="flex flex-wrap gap-1.5">
                                {owns.map((id) => <LayerTag key={id} id={id} variant="chip" withSublayerName link />)}
                                {owns.length === 0 && <span className="text-xs text-muted-foreground italic">Nothing structural yet.</span>}
                              </div>
                            </div>
                            <div>
                              <p className="font-mono-marker text-[9px] uppercase tracking-[0.12em] text-foreground/60 mb-2">Partial · depth 1–2</p>
                              <div className="flex flex-wrap gap-1.5">
                                {partial.slice(0, 8).map((id) => <LayerTag key={id} id={id} variant="chip" withSublayerName link />)}
                                {partial.length === 0 && <span className="text-xs text-muted-foreground italic">—</span>}
                              </div>
                            </div>
                            <div>
                              <p className="font-mono-marker text-[9px] uppercase tracking-[0.12em] text-verdict-exposed mb-2">Rents · whole layer</p>
                              <div className="flex flex-wrap gap-1.5">
                                {(result.layers_rented || []).map((l) => <LayerTag key={l} id={l} variant="chip" link />)}
                                {(!result.layers_rented || result.layers_rented.length === 0) && <span className="text-xs text-muted-foreground italic">—</span>}
                              </div>
                            </div>
                          </div>
                          {(result.competitive_landscape?.juggernaut_moves?.length ?? 0) > 0 && (
                            <div className="mt-4 pt-4 border-t border-foreground/10">
                              <p className="font-mono-marker text-[9px] uppercase tracking-[0.12em] text-accent mb-2">Compressed by</p>
                              <div className="flex flex-wrap gap-1.5">
                                {result.competitive_landscape!.juggernaut_moves!.slice(0, 3).map((j, i) => (
                                  <span key={i} className="font-mono-marker text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-foreground/15 text-foreground/80">{j.actor}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </Card>
                      </ExportablePng>
                    );
                  })()}



                  {/* Strategic snippet — short, keep visible */}
                  {result.snippet && (
                    <Card className="p-6 border-2 border-accent/40 bg-accent/[0.03]">
                      <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-accent mb-3">How to apply this verdict</p>
                      <p className="text-base text-foreground/90 leading-relaxed">{result.snippet}</p>
                    </Card>
                  )}

                  {/* Downloadable share card — MOVED UP so they see it first */}
                  {result.score !== null && (
                    <div>
                      <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-accent mb-3">Send-ready · download as PNG or PDF</p>
                      <ExportablePng
                        fileName={`scoi-audit-${(result.company || "company").toLowerCase().replace(/\s+/g, "-")}`}
                        caption={`Defensibility Audit · ${result.company}`}
                      >
                        <div className="p-8 bg-background" style={{ minHeight: 800 }}>
                          {/* Header */}
                          <div className="flex items-start justify-between gap-4 mb-6 pb-5 border-b border-foreground/15">
                            <div className="flex-1 min-w-0">
                              <p className="font-mono-marker text-[10px] uppercase tracking-[0.15em] text-accent mb-1">{result.domain || "AI Company"} · Defensibility Audit</p>
                              <h3 className="font-display text-2xl font-bold text-foreground">{result.company}</h3>
                              <p className="text-sm text-foreground/80 mt-1 leading-snug">{result.one_line}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="font-display text-5xl font-bold leading-none" style={{ color: tier.color }}>{result.score}</div>
                              <div className="font-mono-marker text-[9px] uppercase tracking-wider text-muted-foreground mt-1">/ 100</div>
                              <div className="font-mono-marker text-[10px] uppercase tracking-wider mt-1.5" style={{ color: tier.color }}>{tier.label}</div>
                            </div>
                          </div>

                          {/* Layers + Triangle */}
                          <div className="grid grid-cols-2 gap-5 mb-6">
                            <div>
                              {(() => {
                                const depth = result.sublayer_depth || {};
                                const owns = Object.entries(depth).filter(([, v]) => v >= 3).sort((a, b) => b[1] - a[1]).map(([k]) => k);
                                return (
                                  <>
                                    <p className="font-mono-marker text-[9px] uppercase tracking-wider text-verdict-fortified mb-2">Owns · sublayers (depth 3+)</p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {owns.map((id) => <LayerTag key={id} id={id} variant="chip" withSublayerName />)}
                                      {owns.length === 0 && <span className="text-xs text-muted-foreground italic">Nothing structural.</span>}
                                    </div>
                                  </>
                                );
                              })()}
                              <p className="font-mono-marker text-[9px] uppercase tracking-wider text-verdict-exposed mt-3 mb-2">Rents · whole layer</p>
                              <div className="flex flex-wrap gap-1.5">
                                {(result.layers_rented || []).map((l) => <LayerTag key={l} id={l} variant="chip" />)}
                              </div>
                            </div>
                            <div>
                              <p className="font-mono-marker text-[9px] uppercase tracking-wider text-accent mb-2">Defensible Triangle</p>
                              <div className="space-y-1.5">
                                <TriangleSide label="L1b Data" status={result.triangle?.proprietary_data || "false"} />
                                <TriangleSide label="L5 Execution" status={result.triangle?.deep_execution || "false"} />
                                <TriangleSide label="L8 Memory" status={result.triangle?.compounding_memory || "false"} />
                              </div>
                              {result.archetype && (
                                <p className="font-mono-marker text-[9px] uppercase tracking-wider text-muted-foreground mt-3">Archetype: <span className="text-foreground/80">{result.archetype}</span></p>
                              )}
                            </div>
                          </div>

                          {/* Top roadmap moves */}
                          {result.roadmap && (
                            <div className="mb-5">
                              <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-foreground/70 mb-3">Roadmap · top 3 prioritized moves</p>
                              <div className="space-y-2.5">
                                {result.roadmap.slice(0, 3).map((r, i) => (
                                  <div key={i} className="grid grid-cols-[auto_1fr] gap-3 items-start">
                                    <span className={`font-mono-marker text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded border shrink-0 mt-0.5 ${prioStyle[r.priority]}`}>{r.priority}</span>
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                        <LayerTag id={r.sublayer} variant="chip" withSublayerName />
                                        <span className="font-mono-marker text-[9px] uppercase text-muted-foreground">{r.horizon}</span>
                                      </div>
                                      <p className="text-[12.5px] text-foreground/85 leading-snug">{r.move}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Top juggernaut threat */}
                          {result.competitive_landscape?.juggernaut_moves?.[0] && (
                            <div className="p-3 rounded border border-verdict-exposed/30 bg-verdict-exposed/[0.04]">
                              <p className="font-mono-marker text-[9px] uppercase tracking-wider text-verdict-exposed mb-1">⚡ Top compression threat</p>
                              <p className="text-[12.5px] text-foreground/90 leading-snug">
                                <span className="font-bold">{result.competitive_landscape.juggernaut_moves[0].actor}</span> ({result.competitive_landscape.juggernaut_moves[0].timeframe}) — {result.competitive_landscape.juggernaut_moves[0].move} <span className="text-muted-foreground">[hits {result.competitive_landscape.juggernaut_moves[0].compresses}]</span>
                              </p>
                            </div>
                          )}
                        </div>
                      </ExportablePng>
                    </div>
                  )}

                  {/* DEEP DIVE — collapsed by default to reduce cognitive load */}
                  <div className="pt-4 border-t border-foreground/10">
                    <p className="font-mono-marker text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4">Deep dive · expand any section</p>
                    <div className="space-y-3">

                      {/* Prioritized Roadmap — open by default, it's the killer feature */}
                      {result.roadmap && result.roadmap.length > 0 && (
                        <details open className="group border border-foreground/15 rounded-lg">
                          <summary className="cursor-pointer p-4 font-mono-marker text-[11px] uppercase tracking-wider text-foreground hover:bg-foreground/[0.02]">
                            Prioritized roadmap · {result.roadmap.length} moves
                          </summary>
                          <div className="p-5 pt-0">
                            <ExportablePng
                              fileName={`scoi-roadmap-${(result.company || "company").toLowerCase().replace(/\s+/g, "-")}`}
                              caption={`${result.company} — prioritized roadmap`}
                            >
                              <div className="p-6 bg-background">
                                <p className="font-mono-marker text-[10px] uppercase tracking-[0.15em] text-accent mb-1">{result.company} · Defensibility roadmap</p>
                                <p className="font-display text-lg text-foreground mb-1">{result.roadmap.length} prioritized moves</p>
                                <p className="text-xs text-muted-foreground mb-4 italic">P0 = next 90d (existential) · P1 = next 180d (defensive moat) · P2 = next 365d (long-game)</p>
                                <div className="space-y-4">
                                  {result.roadmap.map((r, i) => (
                                    <div key={i} className="grid grid-cols-[auto_1fr] gap-4 pb-4 border-b border-foreground/5 last:border-0">
                                      <div className="flex flex-col items-center gap-1.5 pt-0.5">
                                        <span className={`font-mono-marker text-[10px] font-bold tracking-wider px-2 py-1 rounded border ${prioStyle[r.priority]}`}>{r.priority}</span>
                                        <span className="font-mono-marker text-[9px] uppercase tracking-wider text-muted-foreground">{r.horizon}</span>
                                      </div>
                                      <div className="min-w-0">
                                        <div className="mb-1.5"><LayerTag id={r.sublayer} variant="chip" withSublayerName /></div>
                                        <p className="text-[14px] text-foreground/90 leading-relaxed font-medium">{r.move}</p>
                                        <p className="text-[12px] text-muted-foreground italic mt-1">Why: {r.why}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </ExportablePng>
                          </div>
                        </details>
                      )}

                      {/* Sublayer claims */}
                      {result.sublayer_claims && result.sublayer_claims.length > 0 && (
                        <details className="group border border-foreground/15 rounded-lg">
                          <summary className="cursor-pointer p-4 font-mono-marker text-[11px] uppercase tracking-wider text-foreground hover:bg-foreground/[0.02]">
                            Sublayer claims · {result.sublayer_claims.length}, cross-checked
                          </summary>
                          <div className="p-5 pt-0">
                            <div className="space-y-3">
                              {result.sublayer_claims.map((s) => (
                                <div key={s.sublayer} className="flex items-start gap-3 pb-3 border-b border-foreground/5 last:border-0">
                                  <div className="shrink-0 pt-0.5"><LayerTag id={s.sublayer} variant="chip" withSublayerName /></div>
                                  <p className="text-[13px] text-foreground/80 leading-relaxed flex-1">{s.evidence}</p>
                                  <div className="shrink-0 flex items-center gap-2 pt-1">
                                    <ConfidenceDots c={s.confidence} />
                                    {s.cross_confirmed && <CheckCircle2 size={12} className="text-verdict-fortified" aria-label="Confirmed by both models" />}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <p className="font-sketch text-xs italic text-muted-foreground mt-4">✓ = both drafter and critic confirmed.</p>
                          </div>
                        </details>
                      )}

                      {/* Sublayer gaps */}
                      {result.sublayer_gaps && result.sublayer_gaps.length > 0 && (
                        <details className="group border border-foreground/15 rounded-lg">
                          <summary className="cursor-pointer p-4 font-mono-marker text-[11px] uppercase tracking-wider text-foreground hover:bg-foreground/[0.02]">
                            Sublayer gaps · what they should own but don't
                          </summary>
                          <div className="p-5 pt-0">
                            <div className="space-y-3">
                              {result.sublayer_gaps.map((g) => (
                                <div key={g.sublayer} className="flex items-start gap-3 pb-3 border-b border-foreground/5 last:border-0">
                                  <div className="shrink-0 pt-0.5"><LayerTag id={g.sublayer} variant="chip" withSublayerName /></div>
                                  <p className="text-[13px] text-foreground/80 leading-relaxed flex-1">{g.why}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </details>
                      )}

                      {/* Triangle + Laws + Strengths/Risks bundled */}
                      <details className="group border border-foreground/15 rounded-lg">
                        <summary className="cursor-pointer p-4 font-mono-marker text-[11px] uppercase tracking-wider text-foreground hover:bg-foreground/[0.02]">
                          Triangle, laws, strengths & risks
                        </summary>
                        <div className="p-5 pt-0 space-y-5">
                          <div className="grid md:grid-cols-2 gap-5">
                            <div>
                              <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-accent mb-3">Defensible Triangle</p>
                              <div className="space-y-2.5">
                                <TriangleSide label="Proprietary data (L1b)" status={result.triangle?.proprietary_data || "false"} />
                                <TriangleSide label="Deep execution (L5a/b/d)" status={result.triangle?.deep_execution || "false"} />
                                <TriangleSide label="Compounding memory (L8c/d/e)" status={result.triangle?.compounding_memory || "false"} />
                              </div>
                            </div>
                            <div>
                              <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-accent mb-3">Laws triggered</p>
                              <div className="space-y-1.5">
                                {(result.laws_triggered || []).map((l) => (
                                  <Link key={l} to={`/laws/${l.replace("Law ", "law-").toLowerCase()}`} className="block text-sm text-foreground/80 hover:text-accent transition-colors">→ {l}</Link>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-5">
                            <div>
                              <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-verdict-fortified mb-3">Structural strengths</p>
                              <ul className="space-y-2">
                                {(result.strengths || []).map((s, i) => (
                                  <li key={i} className="text-sm text-foreground/85 leading-relaxed flex gap-2"><span className="text-verdict-fortified">▸</span>{s}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-verdict-exposed mb-3">Compression risks</p>
                              <ul className="space-y-2">
                                {(result.risks || []).map((s, i) => (
                                  <li key={i} className="text-sm text-foreground/85 leading-relaxed flex gap-2"><span className="text-verdict-exposed">▸</span>{s}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </details>

                      {/* Competitive landscape */}
                      {result.competitive_landscape && (
                        <details className="group border border-foreground/15 rounded-lg">
                          <summary className="cursor-pointer p-4 font-mono-marker text-[11px] uppercase tracking-wider text-foreground hover:bg-foreground/[0.02]">
                            Competitive landscape · adjacent players & juggernaut moves
                          </summary>
                          <div className="p-5 pt-0">
                            <ExportablePng
                              fileName={`scoi-compression-${(result.company || "company").toLowerCase().replace(/\s+/g, "-")}`}
                              caption={`${result.company} — competitive landscape`}
                            >
                              <div className="p-6 bg-background">
                                <p className="font-mono-marker text-[10px] uppercase tracking-[0.15em] text-accent mb-1">{result.company} · Competitive landscape</p>
                                <p className="font-display text-lg text-foreground mb-4">Adjacent players & juggernaut moves</p>
                                <div className="grid md:grid-cols-2 gap-5">
                                  <div>
                                    <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-accent mb-4 flex items-center gap-2"><Swords size={12} /> Adjacent players</p>
                                    <div className="space-y-3">
                                      {(result.competitive_landscape.adjacent_players || []).map((p, i) => (
                                        <div key={i} className="flex items-start gap-3 pb-3 border-b border-foreground/5 last:border-0">
                                          <div className="shrink-0">
                                            <p className="font-display font-bold text-sm text-foreground">{p.name}</p>
                                            <div className="mt-1"><LayerTag id={p.collides_at} variant="chip" /></div>
                                          </div>
                                          <p className="text-[13px] text-foreground/80 leading-relaxed flex-1">{p.note}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-verdict-exposed mb-4 flex items-center gap-2"><Zap size={12} /> L2 / L4 juggernaut moves</p>
                                    <div className="space-y-3">
                                      {(result.competitive_landscape.juggernaut_moves || []).map((j, i) => (
                                        <div key={i} className="pb-3 border-b border-foreground/5 last:border-0">
                                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                            <span className="font-display font-bold text-sm text-foreground">{j.actor}</span>
                                            <span className={`font-mono-marker text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded ${tfStyle[j.timeframe]}`}>{j.timeframe}</span>
                                            <span className="font-mono-marker text-[10px] text-muted-foreground">compresses {j.compresses}</span>
                                          </div>
                                          <p className="text-[13px] text-foreground/80 leading-relaxed">{j.move}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </ExportablePng>
                          </div>
                        </details>
                      )}

                      {/* Open questions */}
                      {result.open_questions && (
                        <details className="group border border-foreground/15 rounded-lg">
                          <summary className="cursor-pointer p-4 font-mono-marker text-[11px] uppercase tracking-wider text-foreground hover:bg-foreground/[0.02]">
                            3 open questions for the next 90 days
                          </summary>
                          <div className="p-5 pt-0">
                            <ol className="space-y-3">
                              {result.open_questions.map((q, i) => (
                                <li key={i} className="text-[15px] text-foreground/90 leading-relaxed flex gap-3">
                                  <span className="font-display font-bold text-accent shrink-0">{i + 1}.</span>
                                  <span>{q}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </details>
                      )}

                      {/* Cross-check transparency */}
                      {result.cross_check && (
                        <details className="text-xs text-muted-foreground px-1">
                          <summary className="cursor-pointer font-mono-marker uppercase tracking-wider hover:text-foreground/70 py-2">Cross-check details</summary>
                          <div className="mt-2 grid grid-cols-2 gap-4 p-4 bg-foreground/[0.02] rounded">
                            <div>
                              <p className="font-medium text-foreground/70">Drafter (GPT-5-mini)</p>
                              <p>Score: {result.cross_check.drafter_score} · Tier: {result.cross_check.drafter_tier}</p>
                            </div>
                            <div>
                              <p className="font-medium text-foreground/70">Critic (Gemini-2.5-pro)</p>
                              <p>Score: {result.cross_check.critic_score} · Tier: {result.cross_check.critic_tier}</p>
                            </div>
                          </div>
                        </details>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="pt-6 text-center">
                <Button variant="outline" onClick={() => { setResult(null); setCompany(""); setContext(""); }}>
                  Audit another company
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Blank template + How it works */}
        {!result && !loading && (
          <>
            <div className="mt-16">
              <Eyebrow className="mb-4">Or skip the form — map yourself</Eyebrow>
              <p className="text-sm text-muted-foreground mb-5 max-w-2xl leading-relaxed">
                We don't gate the template. Download the blank 10×5 grid, drop it into Claude or ChatGPT, and map your own company — or any company you're tracking. We're providing the framework, not the verdict.
              </p>
              <ExportablePng fileName="scoi-blank-grid-template" caption="Blank Supply Chain of Intelligence — map your company">
                <IntelligenceGrid mode="blank" />
              </ExportablePng>
            </div>

            <div className="mt-16 pt-12 border-t border-foreground/10">
              <Eyebrow className="mb-4">How it works</Eyebrow>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { n: "01", t: "Public research", d: "We pull public data on the company — product, customers, model dependencies, funding, integrations." },
                  { n: "02", t: "Two-model audit", d: "GPT-5-mini drafts a layer map. Gemini-2.5-pro audits the draft as the critic. Claims survive only if both confirm." },
                  { n: "03", t: "Reconciled verdict", d: "We take the lower of the two on every disagreement. The score is conservative by design — wrapper-at-risk is the default until proven otherwise." },
                ].map((s) => (
                  <div key={s.n}>
                    <p className="font-mono-marker text-[10px] uppercase tracking-[0.15em] text-accent mb-2">{s.n}</p>
                    <h3 className="font-display text-lg font-bold mb-2">{s.t}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </SiteLayout>
  );
};

export default AuditPage;
