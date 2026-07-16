import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

type Candidate = {
  id: string;
  headline: string;
  company: string | null;
  summary: string;
  source_urls: string[];
  source_domains: string[];
  status: "pending" | "approved" | "rejected" | "published" | "processing";
  rejected_reason: string | null;
  published_article_id: string | null;
  tier1_verified: boolean;
  discovered_for_date: string;
  created_at: string;
};

const PASSCODE_KEY = "remaster_admin_passcode";

function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("verify-remaster-passcode", { body: { passcode: code.trim() } });
      if (error || !data?.ok) return toast.error("Invalid passcode");
      localStorage.setItem(PASSCODE_KEY, code.trim());
      onUnlock();
    } finally { setBusy(false); }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 border border-border rounded-lg p-6 bg-card">
        <h1 className="text-xl font-serif">Story Queue</h1>
        <input type="password" autoFocus value={code} onChange={(e) => setCode(e.target.value)}
          className="w-full px-3 py-2 rounded border border-border bg-background" placeholder="Passcode" />
        <Button type="submit" disabled={busy || !code.trim()} className="w-full">
          {busy ? "Checking…" : "Unlock"}
        </Button>
      </form>
    </div>
  );
}

export default function StoryQueueAdmin() {
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);
  const [items, setItems] = useState<Candidate[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [discovering, setDiscovering] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "published" | "rejected">("pending");

  useEffect(() => {
    const stored = localStorage.getItem(PASSCODE_KEY);
    if (!stored) { setChecking(false); return; }
    supabase.functions.invoke("verify-remaster-passcode", { body: { passcode: stored } })
      .then(({ data, error }) => {
        if (!error && data?.ok) setUnlocked(true);
        else localStorage.removeItem(PASSCODE_KEY);
      }).finally(() => setChecking(false));
  }, []);

  async function load() {
    const passcode = localStorage.getItem(PASSCODE_KEY);
    if (!passcode) return;
    const { data, error } = await supabase.functions.invoke("admin-read", {
      body: { passcode, resource: "story_candidates" },
    });
    if (error || !data?.ok) return toast.error("Failed to load");
    setItems((data.candidates ?? []) as Candidate[]);
  }
  useEffect(() => { if (unlocked) load(); }, [unlocked]);

  async function discover() {
    const passcode = localStorage.getItem(PASSCODE_KEY);
    if (!passcode) return toast.error("Session expired");
    setDiscovering(true);
    try {
      const { data, error } = await supabase.functions.invoke("discover-story-candidates", { body: { passcode } });
      if (error) throw new Error(error.message);
      if (!data?.ok) throw new Error(data?.error ?? "discover failed");
      toast.success(`Discovered ${data.inserted} new · ${data.skipped} dupes · ${data.rejected?.length ?? 0} rejected`);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : String(e));
    } finally { setDiscovering(false); }
  }

  async function act(id: string, action: "approve" | "reject", reason?: string) {
    const passcode = localStorage.getItem(PASSCODE_KEY) ?? "";
    setBusy(id);
    try {
      const { data, error } = await supabase.functions.invoke("curate-story-candidate", {
        body: { passcode, candidate_id: id, action, reason },
      });
      if (error) throw new Error(error.message);
      if (!data?.ok) throw new Error(data?.error ?? "failed");
      toast.success(action === "approve" ? "Article generated and published" : "Rejected");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : String(e));
    } finally { setBusy(null); }
  }

  if (checking) return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Checking…</div>;
  if (!unlocked) return <><Helmet><title>Story Queue</title><meta name="robots" content="noindex,nofollow" /></Helmet><Gate onUnlock={() => setUnlocked(true)} /></>;

  const visible = filter === "all" ? items : items.filter((i) => i.status === filter);
  const counts = items.reduce((acc, i) => { acc[i.status] = (acc[i.status] ?? 0) + 1; return acc; }, {} as Record<string, number>);

  return (
    <>
      <Helmet><title>Story Queue, Admin</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
          <header className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-serif">Story Queue</h1>
              <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                Daily Perplexity scout drops tier-1 AI candidates here. Approve one to trigger framework analysis and publish — no story gets published without your click.
              </p>
            </div>
            <Button onClick={discover} disabled={discovering}>
              {discovering ? "Scouting…" : "Run discovery now"}
            </Button>
          </header>

          <div className="flex flex-wrap gap-2 text-xs">
            {(["all", "pending", "published", "rejected"] as const).map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-1 rounded border ${filter === s ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}>
                {s} {s !== "all" && counts[s] ? `(${counts[s]})` : ""}
              </button>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="text-sm text-muted-foreground">Nothing here. Click "Run discovery now" to scout fresh stories.</p>
          )}

          <div className="space-y-3">
            {visible.map((c) => (
              <Card key={c.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <Badge variant={c.status === "pending" ? "secondary" : c.status === "published" ? "default" : "outline"}>
                        {c.status}
                      </Badge>
                      {c.tier1_verified && <Badge variant="outline" className="text-emerald-600 border-emerald-600">tier-1 ✓</Badge>}
                      {c.company && <Badge variant="outline">{c.company}</Badge>}
                      <span className="text-xs text-muted-foreground">{c.discovered_for_date}</span>
                    </div>
                    <p className="font-medium">{c.headline}</p>
                    <p className="text-sm text-muted-foreground mt-1">{c.summary}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      {(c.source_urls ?? []).map((u) => (
                        <a key={u} href={u} target="_blank" rel="noreferrer" className="text-primary underline truncate max-w-xs">
                          {new URL(u).hostname.replace(/^www\./, "")}
                        </a>
                      ))}
                    </div>
                    {c.rejected_reason && <p className="text-xs text-destructive mt-2">{c.rejected_reason}</p>}
                  </div>
                  {c.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => act(c.id, "approve")} disabled={!!busy}>
                        {busy === c.id ? "Working…" : "Approve & publish"}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => act(c.id, "reject", "not worth publishing")} disabled={!!busy}>
                        Reject
                      </Button>
                    </div>
                  )}
                  {c.status === "published" && c.published_article_id && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={`/live`}>View on /live</a>
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
