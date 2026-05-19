// Admin cockpit for the cross-LLM article audit pipeline.
// Passcode-gated. Lets you start a run, watch progress (auto-ticks every ~75s),
// browse audits sorted by severity / cross-LLM disagreement, and apply
// one-click layer-tag fixes back to live_articles.
import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import LayerTag from "@/components/LayerTag";

const PASSCODE_KEY = "remaster_admin_passcode";
const TICK_INTERVAL_MS = 75_000;

interface Article { id: string; slug: string; headline: string; verdict: string; analysis: any; }
interface DimScore { score: number; rationale: string; }
interface AuditRow {
  id: string; article_id: string; run_id: string; model: string;
  score: number; severity: string;
  dimension_scores: Record<string, DimScore>;
  current_layers: string[]; proposed_layers: string[];
  proposed_sublayers: string[];
  flaws: any[]; fixes: any[];
  suggested_headline: string | null; suggested_subheadline: string | null;
  verdict_check: { agrees?: boolean; should_be?: string; why?: string };
  evidence_quotes: string[];
  status: string; error: string | null; created_at: string;
}
interface SummaryRow {
  article_id: string; run_id: string;
  composite_score: number; composite_severity: string;
  layer_jaccard: number | null; sublayer_jaccard: number | null;
  verdict_agreement: boolean | null;
  models_run: string[];
  consensus_layers: string[]; consensus_sublayers: string[];
  disagreements: any[];
  dimension_scores_avg: Record<string, number>;
}
interface AuditRun {
  id: string; status: string; models: string[];
  total_articles: number; completed_articles: number;
  started_at: string; finished_at: string | null;
}

const SEV_RANK: Record<string, number> = { critical: 3, needs_fix: 2, minor: 1, ok: 0 };
const SEV_COLOR: Record<string, string> = {
  critical: "bg-red-500/15 text-red-400 border-red-500/40",
  needs_fix: "bg-orange-500/15 text-orange-400 border-orange-500/40",
  minor: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
  ok: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
};

function PasscodeGate({ onUnlock }: { onUnlock: (code: string) => void }) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("verify-remaster-passcode", { body: { passcode: code.trim() } });
      if (error || !data?.ok) { toast.error("Invalid passcode"); return; }
      localStorage.setItem(PASSCODE_KEY, code.trim());
      onUnlock(code.trim());
    } finally { setBusy(false); }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 border border-border rounded-lg p-6 bg-card">
        <h1 className="text-xl font-display">Audit Admin</h1>
        <p className="text-sm text-muted-foreground">Enter admin passcode.</p>
        <input type="password" autoFocus value={code} onChange={(e) => setCode(e.target.value)}
          className="w-full px-3 py-2 rounded border border-border bg-background" placeholder="Passcode" />
        <Button type="submit" disabled={busy || !code.trim()} className="w-full">{busy ? "Checking…" : "Unlock"}</Button>
      </form>
    </div>
  );
}

export default function AuditAdmin() {
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);
  const [passcode, setPasscode] = useState<string>("");
  const [runs, setRuns] = useState<AuditRun[]>([]);
  const [activeRunId, setActiveRunId] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [audits, setAudits] = useState<AuditRow[]>([]);
  const [summaries, setSummaries] = useState<SummaryRow[]>([]);
  const [autoTick, setAutoTick] = useState(false);
  const [tickBusy, setTickBusy] = useState(false);
  const [filter, setFilter] = useState<"all"|"critical"|"needs_fix"|"agent"|"disagreement">("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const tickTimer = useRef<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(PASSCODE_KEY);
    if (!stored) { setChecking(false); return; }
    supabase.functions.invoke("verify-remaster-passcode", { body: { passcode: stored } })
      .then(({ data, error }) => {
        if (!error && data?.ok) { setUnlocked(true); setPasscode(stored); }
        else localStorage.removeItem(PASSCODE_KEY);
      })
      .finally(() => setChecking(false));
  }, []);

  async function loadAll() {
    const [{ data: r }, { data: a }] = await Promise.all([
      supabase.from("audit_runs").select("*").order("started_at", { ascending: false }).limit(20),
      supabase.from("live_articles").select("id,slug,headline,verdict,analysis").eq("status","published").order("published_at",{ascending:false}),
    ]);
    setRuns((r ?? []) as AuditRun[]);
    setArticles((a ?? []) as Article[]);
    if (!activeRunId && r && r.length) setActiveRunId(r[0].id);
  }

  async function loadRunData(runId: string) {
    if (!runId) return;
    const [{ data: au }, { data: su }] = await Promise.all([
      supabase.from("article_audits").select("*").eq("run_id", runId).order("created_at",{ascending:false}),
      supabase.from("article_audit_summary").select("*").eq("run_id", runId),
    ]);
    setAudits((au ?? []) as unknown as AuditRow[]);
    setSummaries((su ?? []) as unknown as SummaryRow[]);
  }

  useEffect(() => { if (unlocked) loadAll(); }, [unlocked]);
  useEffect(() => { if (activeRunId) loadRunData(activeRunId); }, [activeRunId]);

  async function startRun() {
    const { data, error } = await supabase.functions.invoke("audit-runner", { body: { action: "start", passcode, models: ["google/gemini-2.5-pro","openai/gpt-5"] } });
    if (error || !data?.ok) { toast.error(error?.message ?? data?.error ?? "Failed"); return; }
    toast.success(`Started ${data.run_id} (${data.total_articles} articles × ${data.models.length} models)`);
    await loadAll();
    setActiveRunId(data.run_id);
    setAutoTick(true);
  }

  async function tickOnce() {
    if (!activeRunId || tickBusy) return;
    setTickBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("audit-runner", { body: { action: "tick", run_id: activeRunId, passcode } });
      if (error) { toast.error(error.message); return; }
      if (data?.done) { toast.success("Run complete"); setAutoTick(false); }
      else if (data?.processed) toast.message(`Audited ${data.processed.slug} (${data.processed.model})`);
      await loadAll();
      await loadRunData(activeRunId);
    } finally { setTickBusy(false); }
  }

  useEffect(() => {
    if (!autoTick || !activeRunId) return;
    tickOnce();
    tickTimer.current = window.setInterval(tickOnce, TICK_INTERVAL_MS);
    return () => { if (tickTimer.current) window.clearInterval(tickTimer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoTick, activeRunId]);

  async function pauseResume() {
    const cur = runs.find(r => r.id === activeRunId);
    if (!cur) return;
    const action = cur.status === "running" ? "pause" : "resume";
    await supabase.functions.invoke("audit-runner", { body: { action, run_id: activeRunId, passcode } });
    if (action === "pause") setAutoTick(false);
    await loadAll();
  }

  async function applyLayerFix(articleId: string, proposed: string[]) {
    const a = articles.find(x => x.id === articleId);
    if (!a) return;
    const newAnalysis = { ...(a.analysis ?? {}), cube_position: { ...(a.analysis?.cube_position ?? {}), layers: proposed } };
    const { error } = await supabase.from("live_articles").update({ analysis: newAnalysis }).eq("id", articleId);
    if (error) toast.error(error.message); else { toast.success(`Updated layers for ${a.slug}`); await loadAll(); }
  }

  // Group audits by article + apply filter + sort
  const grouped = useMemo(() => {
    const byArticle = new Map<string, { article: Article | undefined; audits: AuditRow[]; summary?: SummaryRow }>();
    for (const au of audits) {
      const key = au.article_id;
      if (!byArticle.has(key)) byArticle.set(key, { article: articles.find(x => x.id === key), audits: [], summary: summaries.find(s => s.article_id === key) });
      byArticle.get(key)!.audits.push(au);
    }
    let entries = [...byArticle.values()];
    if (filter === "critical") entries = entries.filter(e => e.audits.some(a => a.severity === "critical"));
    if (filter === "needs_fix") entries = entries.filter(e => e.audits.some(a => SEV_RANK[a.severity] >= 2));
    if (filter === "agent") entries = entries.filter(e => e.audits.some(a => a.flaws?.some((f: any) => f.type === "agent_confusion")));
    if (filter === "disagreement") entries = entries.filter(e => e.summary && (e.summary.layer_jaccard ?? 1) < 0.7);
    entries.sort((a, b) => {
      const sa = a.summary?.composite_severity ?? a.audits[0]?.severity ?? "ok";
      const sb = b.summary?.composite_severity ?? b.audits[0]?.severity ?? "ok";
      if (SEV_RANK[sa] !== SEV_RANK[sb]) return SEV_RANK[sb] - SEV_RANK[sa];
      const scoreA = a.summary?.composite_score ?? a.audits[0]?.score ?? 100;
      const scoreB = b.summary?.composite_score ?? b.audits[0]?.score ?? 100;
      return scoreA - scoreB;
    });
    return entries;
  }, [audits, summaries, articles, filter]);

  const activeRun = runs.find(r => r.id === activeRunId);

  if (checking) return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Checking…</div>;
  if (!unlocked) return (<><Helmet><meta name="robots" content="noindex" /></Helmet><PasscodeGate onUnlock={(c)=>{setUnlocked(true);setPasscode(c);}} /></>);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet><title>Audit Admin — SCoAI</title><meta name="robots" content="noindex" /></Helmet>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold">Article Audit</h1>
            <p className="text-sm text-muted-foreground">Cross-LLM framework critique at sublayer depth.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/remaster" className="text-sm text-muted-foreground hover:text-foreground self-center">→ remaster</Link>
            <Button onClick={startRun} variant="default">Start new run</Button>
          </div>
        </div>

        {/* Run picker + progress */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Run</label>
              <select value={activeRunId} onChange={(e)=>setActiveRunId(e.target.value)} className="bg-background border border-border rounded px-2 py-1 text-sm">
                {runs.length === 0 && <option value="">— no runs yet —</option>}
                {runs.map(r => <option key={r.id} value={r.id}>{r.id} · {r.status} · {r.completed_articles}/{r.total_articles}</option>)}
              </select>
              {activeRun && <Badge variant="outline" className="text-xs">{activeRun.models.join(" + ")}</Badge>}
            </div>
            {activeRun && (
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">{activeRun.completed_articles} / {activeRun.total_articles} articles · {audits.length} audits stored</div>
                <Button size="sm" variant="outline" onClick={pauseResume}>{activeRun.status === "running" ? "Pause" : "Resume"}</Button>
                <Button size="sm" variant={autoTick?"default":"outline"} onClick={()=>setAutoTick(v=>!v)} disabled={activeRun.status!=="running"}>
                  {autoTick ? `Auto-ticking (${Math.round(TICK_INTERVAL_MS/1000)}s)` : "Start auto-tick"}
                </Button>
                <Button size="sm" variant="ghost" onClick={tickOnce} disabled={tickBusy || activeRun.status!=="running"}>Tick now</Button>
              </div>
            )}
          </div>
          {activeRun && (
            <div className="mt-3 h-1.5 bg-secondary rounded overflow-hidden">
              <div className="h-full bg-accent transition-all" style={{ width: `${activeRun.total_articles ? (activeRun.completed_articles/activeRun.total_articles)*100 : 0}%` }} />
            </div>
          )}
        </Card>

        {/* Filters */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {(["all","critical","needs_fix","agent","disagreement"] as const).map(f => (
            <button key={f} onClick={()=>setFilter(f)} className={`text-xs px-3 py-1 rounded border ${filter===f?"bg-foreground text-background border-foreground":"border-border text-muted-foreground hover:text-foreground"}`}>
              {f === "all" ? "All" : f === "needs_fix" ? "Needs fix+" : f === "agent" ? "Agent confusion" : f === "disagreement" ? "LLMs disagree" : "Critical only"}
            </button>
          ))}
          <div className="ml-auto text-xs text-muted-foreground self-center">{grouped.length} articles shown</div>
        </div>

        {/* Article list */}
        <div className="space-y-3">
          {grouped.length === 0 && <div className="text-sm text-muted-foreground text-center py-12">No audits yet for this run. Click "Start auto-tick".</div>}
          {grouped.map(({ article, audits: auds, summary }) => {
            const isOpen = expanded.has(article?.id ?? "");
            const sev = summary?.composite_severity ?? auds[0]?.severity ?? "ok";
            const score = summary?.composite_score ?? auds[0]?.score ?? 0;
            const proposedLayers = summary?.consensus_layers ?? auds[0]?.proposed_layers ?? [];
            const currentLayers: string[] = article?.analysis?.cube_position?.layers ?? [];
            const added = proposedLayers.filter(l => !currentLayers.includes(l));
            const removed = currentLayers.filter(l => !proposedLayers.includes(l));
            const jaccard = summary?.layer_jaccard;
            return (
              <Card key={article?.id ?? Math.random()} className="overflow-hidden">
                <button
                  onClick={() => setExpanded(s => { const n = new Set(s); if (n.has(article?.id ?? "")) n.delete(article?.id ?? ""); else n.add(article?.id ?? ""); return n; })}
                  className="w-full text-left p-4 hover:bg-secondary/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge variant="outline" className={`text-[10px] font-bold border ${SEV_COLOR[sev]}`}>{sev.toUpperCase()}</Badge>
                        <span className="font-mono text-xs text-muted-foreground">{score}/100</span>
                        {jaccard !== null && jaccard !== undefined && <span className="font-mono text-[10px] text-muted-foreground">jaccard {jaccard.toFixed(2)}</span>}
                        <span className="text-[10px] text-muted-foreground">{auds.length} critics</span>
                        {summary?.verdict_agreement === false && <Badge variant="destructive" className="text-[10px]">verdict disputed</Badge>}
                      </div>
                      <div className="font-display text-base font-semibold truncate">{article?.headline ?? "(article missing)"}</div>
                      <div className="mt-2 flex items-center gap-2 flex-wrap text-xs">
                        <span className="text-muted-foreground">Current:</span>
                        {currentLayers.length === 0 && <span className="text-muted-foreground italic">none</span>}
                        {currentLayers.map(l => <LayerTag key={`c${l}`} id={l} variant="chip" />)}
                        <span className="text-muted-foreground ml-2">→ Proposed:</span>
                        {proposedLayers.map(l => <LayerTag key={`p${l}`} id={l} variant="chip" />)}
                        {added.length > 0 && <span className="text-emerald-500 text-[10px]">+ {added.join(" ")}</span>}
                        {removed.length > 0 && <span className="text-red-400 text-[10px]">− {removed.join(" ")}</span>}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{isOpen ? "▾" : "▸"}</div>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-border p-4 space-y-4 bg-secondary/20">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link to={`/live/${article?.slug}`} target="_blank" className="text-xs underline text-accent">Open article ↗</Link>
                      {(added.length > 0 || removed.length > 0) && (
                        <Button size="sm" variant="default" onClick={()=>article && applyLayerFix(article.id, proposedLayers)}>
                          Apply proposed layer tags
                        </Button>
                      )}
                    </div>

                    {summary && summary.consensus_sublayers?.length > 0 && (
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Consensus sublayers</div>
                        <div className="flex gap-1 flex-wrap">
                          {summary.consensus_sublayers.map(s => <LayerTag key={s} id={s} variant="chip" withSublayerName />)}
                        </div>
                      </div>
                    )}

                    {summary?.dimension_scores_avg && Object.keys(summary.dimension_scores_avg).length > 0 && (
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Dimension scores (cross-LLM average)</div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-1.5">
                          {Object.entries(summary.dimension_scores_avg).map(([dim, s]) => {
                            const color = s >= 85 ? "text-emerald-400" : s >= 70 ? "text-foreground" : s >= 50 ? "text-orange-400" : "text-red-400";
                            return (
                              <div key={dim} className="border border-border rounded px-2 py-1.5 bg-background/40">
                                <div className="text-[9px] uppercase tracking-wide text-muted-foreground truncate">{dim.replace(/_/g," ")}</div>
                                <div className={`text-sm font-mono font-semibold ${color}`}>{s}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Per-model panels */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {auds.map(au => (
                        <div key={au.id} className="border border-border rounded p-3 bg-background/50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-[10px] text-muted-foreground">{au.model}</span>
                            <Badge variant="outline" className={`text-[10px] ${SEV_COLOR[au.severity]}`}>{au.severity} · {au.score}</Badge>
                          </div>
                          {au.suggested_headline && <div className="mb-2 text-xs"><span className="text-muted-foreground">Suggested headline: </span><span className="italic">{au.suggested_headline}</span></div>}
                          {au.suggested_subheadline && <div className="mb-2 text-xs"><span className="text-muted-foreground">Suggested sub: </span><span className="italic">{au.suggested_subheadline}</span></div>}
                          {au.verdict_check?.should_be && (
                            <div className="mb-2 text-xs">
                              <span className="text-muted-foreground">Verdict: </span>
                              <span className={au.verdict_check.agrees ? "text-emerald-400" : "text-orange-400"}>{au.verdict_check.agrees ? "agrees" : `should be ${au.verdict_check.should_be}`}</span>
                              {au.verdict_check.why && <div className="text-[11px] text-muted-foreground mt-0.5">{au.verdict_check.why}</div>}
                            </div>
                          )}
                          {au.flaws?.length > 0 && (
                            <div className="mt-2">
                              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Flaws ({au.flaws.length})</div>
                              <ul className="space-y-1.5">
                                {au.flaws.map((f: any, i: number) => (
                                  <li key={i} className="text-[11px] border-l-2 pl-2 border-orange-500/40">
                                    <div><span className="font-mono text-muted-foreground">[{f.severity}]</span> <strong>{f.type}</strong> {f.layer && <span className="text-muted-foreground">· {f.layer}</span>}</div>
                                    <div className="text-foreground/80">{f.reason}</div>
                                    {f.evidence_quote && <div className="text-muted-foreground italic mt-0.5">"{f.evidence_quote.slice(0,180)}{f.evidence_quote.length>180?"…":""}"</div>}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {au.error && <div className="mt-2 text-[11px] text-red-400">ERROR: {au.error}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
