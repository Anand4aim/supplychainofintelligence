import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { CASE_STUDIES } from "@/data/caseStudies";
import { LAW_ESSAYS } from "@/data/lawEssays";
import { LAYERS } from "@/data/layers";
import { PREDICTIONS } from "@/data/predictions";
import {
  caseStudyToText,
  lawEssayToText,
  layerToText,
  genericToText,
} from "@/lib/remasterSerializers";

type QueueRow = {
  id: string;
  target_type: string;
  target_id: string;
  target_label: string;
  priority: number;
  status: "queued" | "processing" | "done" | "failed" | "skipped";
  notes: string | null;
  result: any | null;
  error: string | null;
  created_at: string;
  processed_at: string | null;
};

type LiveArticleLite = { id: string; slug: string; headline: string; created_at: string };

// Resolve a queue item's content payload from in-app data
function getPayload(target_type: string, target_id: string): { content: string; title: string } | null {
  switch (target_type) {
    case "case_study": {
      const c = CASE_STUDIES.find((x) => x.slug === target_id);
      return c ? { content: caseStudyToText(c), title: c.title } : null;
    }
    case "law_essay": {
      const e = LAW_ESSAYS.find((x) => x.slug === target_id);
      return e ? { content: lawEssayToText(e), title: e.title } : null;
    }
    case "layer": {
      const l = LAYERS.find((x) => x.id === target_id);
      return l ? { content: layerToText(l), title: `${l.id} ${l.name}` } : null;
    }
    case "prediction": {
      const p = PREDICTIONS.find((x: any) => x.id === target_id || x.slug === target_id);
      return p ? { content: genericToText((p as any).title ?? target_id, p), title: (p as any).title ?? target_id } : null;
    }
    case "page":
      return null; // pages handled with notes-only
    default:
      return null;
  }
}

export default function RemasterAdmin() {
  const [queue, setQueue] = useState<QueueRow[]>([]);
  const [articles, setArticles] = useState<LiveArticleLite[]>([]);
  const [processing, setProcessing] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  async function loadQueue() {
    const { data } = await supabase
      .from("remaster_queue")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    setQueue((data ?? []) as QueueRow[]);
  }

  async function loadArticles() {
    const { data } = await supabase
      .from("live_articles")
      .select("id,slug,headline,created_at")
      .eq("status", "published")
      .order("created_at", { ascending: false });
    setArticles((data ?? []) as LiveArticleLite[]);
  }

  useEffect(() => {
    loadQueue();
    loadArticles();
  }, []);

  async function enqueue(items: Array<{ target_type: string; target_id: string; target_label: string; notes?: string }>) {
    const { data, error } = await supabase.functions.invoke("enqueue-remaster", { body: { items } });
    if (error) return toast.error(error.message);
    if (!data?.success) return toast.error(data?.error ?? "Failed");
    toast.success(`Queued ${data.inserted} · skipped ${data.skipped}`);
    loadQueue();
  }

  async function processItem(item: QueueRow) {
    setProcessing(item.id);
    try {
      const payload = item.target_type === "live_article" ? null : getPayload(item.target_type, item.target_id);
      const body: Record<string, unknown> = { item_id: item.id };
      if (payload) body.payload = payload;
      const { data, error } = await supabase.functions.invoke("process-remaster-queue", { body });
      if (error) throw new Error(error.message);
      if (!data?.success) throw new Error(data?.error ?? "Failed");
      toast.success(`Processed: ${item.target_label}`);
      loadQueue();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : String(e));
    } finally {
      setProcessing(null);
    }
  }

  async function processNext() {
    const next = queue.find((q) => q.status === "queued");
    if (!next) return toast.info("Queue empty");
    await processItem(next);
  }

  const stats = useMemo(() => {
    const s = { queued: 0, processing: 0, done: 0, failed: 0, skipped: 0 };
    queue.forEach((q) => (s[q.status] = (s[q.status] ?? 0) + 1));
    return s;
  }, [queue]);

  const visibleQueue = filter === "all" ? queue : queue.filter((q) => q.status === filter);

  // Bulk enqueue helpers
  const queuedKeys = useMemo(
    () => new Set(queue.filter((q) => ["queued", "processing"].includes(q.status)).map((q) => `${q.target_type}::${q.target_id}`)),
    [queue],
  );
  const isQueued = (t: string, id: string) => queuedKeys.has(`${t}::${id}`);

  return (
    <>
      <Helmet>
        <title>Remaster Queue — Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
          <header className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-serif">Remaster Queue</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Run the AI critic loop across older content. Live articles get rewritten in place.
                Case studies, law essays, predictions, and layer pages get critique-only output (apply by hand).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={processNext} disabled={!!processing || stats.queued === 0}>
                {processing ? "Processing…" : `Process next (${stats.queued})`}
              </Button>
            </div>
          </header>

          <div className="flex flex-wrap gap-2 text-xs">
            {(["all", "queued", "processing", "done", "failed", "skipped"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1 rounded border ${filter === s ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}
              >
                {s} {s !== "all" && stats[s] !== undefined ? `(${stats[s]})` : ""}
              </button>
            ))}
          </div>

          {/* Bulk add buttons */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Add to queue</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Button variant="outline" onClick={() =>
                enqueue(articles.filter((a) => !isQueued("live_article", a.id))
                  .map((a) => ({ target_type: "live_article", target_id: a.id, target_label: a.headline })))
              }>+ All Live articles ({articles.length})</Button>
              <Button variant="outline" onClick={() =>
                enqueue(CASE_STUDIES.filter((c) => !isQueued("case_study", c.slug))
                  .map((c) => ({ target_type: "case_study", target_id: c.slug, target_label: c.title, content: caseStudyToText(c) })))
              }>+ All Case studies ({CASE_STUDIES.length})</Button>
              <Button variant="outline" onClick={() =>
                enqueue(LAW_ESSAYS.filter((e) => !isQueued("law_essay", e.slug))
                  .map((e) => ({ target_type: "law_essay", target_id: e.slug, target_label: e.title, content: lawEssayToText(e) })))
              }>+ All Law essays ({LAW_ESSAYS.length})</Button>
              <Button variant="outline" onClick={() =>
                enqueue(LAYERS.filter((l) => !isQueued("layer", l.id))
                  .map((l) => ({ target_type: "layer", target_id: l.id, target_label: `${l.id} ${l.name}`, content: layerToText(l) })))
              }>+ All Layer pages ({LAYERS.length})</Button>
              <Button variant="outline" onClick={() =>
                enqueue(PREDICTIONS.filter((p: any) => !isQueued("prediction", p.id ?? p.slug))
                  .map((p: any) => ({ target_type: "prediction", target_id: p.id ?? p.slug, target_label: p.title ?? p.id ?? p.slug, content: genericToText((p as any).title ?? (p.id ?? p.slug), p) })))
              }>+ All Predictions ({PREDICTIONS.length})</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Bulk-enqueued items include their content payload, so the every-6h cron job can process them automatically — no need to keep this tab open.
            </p>
          </section>

          {/* Queue table */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Queue</h2>
            {visibleQueue.length === 0 && (
              <p className="text-sm text-muted-foreground">Nothing here.</p>
            )}
            <div className="space-y-2">
              {visibleQueue.map((q) => (
                <Card key={q.id} className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline">{q.target_type}</Badge>
                        <StatusBadge status={q.status} />
                        {q.result?.avg_score !== undefined && (
                          <Badge variant="secondary">avg {q.result.avg_score}/10</Badge>
                        )}
                        {q.result?.rounds && (
                          <Badge variant="secondary">{q.result.rounds} round(s)</Badge>
                        )}
                      </div>
                      <p className="font-medium mt-1 truncate">{q.target_label}</p>
                      <p className="text-xs text-muted-foreground">{q.target_id}</p>
                      {q.error && <p className="text-xs text-destructive mt-1">{q.error}</p>}
                    </div>
                    <div className="flex gap-2">
                      {q.status === "queued" && (
                        <Button size="sm" onClick={() => processItem(q)} disabled={!!processing}>
                          Run critics
                        </Button>
                      )}
                    </div>
                  </div>
                  {q.result && q.target_type !== "live_article" && (
                    <CritiqueView result={q.result} />
                  )}
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: QueueRow["status"] }) {
  const map: Record<string, string> = {
    queued: "bg-muted text-foreground",
    processing: "bg-primary text-primary-foreground",
    done: "bg-emerald-600 text-white",
    failed: "bg-destructive text-destructive-foreground",
    skipped: "bg-muted text-muted-foreground",
  };
  return <span className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded ${map[status]}`}>{status}</span>;
}

function CritiqueView({ result }: { result: any }) {
  const a = result.critic_a;
  const b = result.critic_b;
  if (!a || !b) return null;
  return (
    <details className="text-sm border rounded p-3 bg-muted/30">
      <summary className="cursor-pointer font-medium">
        Critic output — A {a.overall_score}/10 · B {b.overall_score}/10
        {result.ship_as_is && " · ✅ ship as-is"}
      </summary>
      <div className="mt-3 grid md:grid-cols-2 gap-4">
        {[a, b].map((c, i) => (
          <div key={i} className="space-y-2">
            <p className="text-xs text-muted-foreground">{i === 0 ? "Critic A" : "Critic B"} · {c.model}</p>
            <p className="text-sm">{c.summary}</p>
            <ul className="space-y-2">
              {(c.issues ?? []).map((iss: any, j: number) => (
                <li key={j} className="text-xs border-l-2 pl-2 border-border">
                  <div className="flex gap-2 items-center">
                    <Badge variant={iss.severity === "blocker" ? "destructive" : iss.severity === "major" ? "default" : "secondary"}>
                      {iss.severity}
                    </Badge>
                    <span className="text-muted-foreground">{iss.category}</span>
                  </div>
                  {iss.excerpt && <p className="mt-1 italic">"{iss.excerpt}"</p>}
                  <p className="mt-1"><strong>Why:</strong> {iss.why}</p>
                  <p><strong>Fix:</strong> {iss.fix}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </details>
  );
}
