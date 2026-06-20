// Admin-only dashboard listing every prerendered route with its last
// crawl status, title presence, and timestamp.
//
// Same diagnosis as scripts/crawl-content-check.ts, but in-browser and
// on demand: fetches each route as plain HTML (no JS exec), compares
// against the homepage shell, and surfaces per-route verdicts so we can
// spot a regressing route without redeploying or hitting the CLI.
//
// Passcode-gated via the existing verify-remaster-passcode function.
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { CASE_STUDIES } from "@/data/caseStudies";
import { LAW_ESSAYS } from "@/data/lawEssays";
import { POSTS } from "@/data/posts";
import { VERTICAL_REGISTRY } from "@/data/verticalsRegistry";
import { LAYERS } from "@/data/layers";

const PASSCODE_KEY = "remaster_admin_passcode";

type Group = "live" | "market-map" | "analysis" | "laws" | "posts" | "framework" | "static";

interface RouteRow {
  path: string;
  group: Group;
  /** Substring expected in the rendered HTML, usually the headline. */
  expect?: string;
}

type Status = "pending" | "running" | "ok" | "fail";

interface CrawlResult {
  status: Status;
  httpStatus?: number;
  bytes?: number;
  title?: string;
  hasTitle: boolean;
  matchesShell: boolean;
  expectFound: boolean | null;
  reason: string;
  checkedAt?: string;
}

function PasscodeGate({ onUnlock }: { onUnlock: (code: string) => void }) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "verify-remaster-passcode",
        { body: { passcode: code.trim() } },
      );
      if (error || !data?.ok) { toast.error("Invalid passcode"); return; }
      localStorage.setItem(PASSCODE_KEY, code.trim());
      onUnlock(code.trim());
    } finally { setBusy(false); }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 border border-border rounded-lg p-6 bg-card">
        <h1 className="text-xl font-display">Crawl Admin</h1>
        <p className="text-sm text-muted-foreground">Enter admin passcode.</p>
        <input
          type="password" autoFocus value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-3 py-2 rounded border border-border bg-background"
          placeholder="Passcode"
        />
        <Button type="submit" disabled={busy || !code.trim()} className="w-full">
          {busy ? "Checking…" : "Unlock"}
        </Button>
      </form>
    </div>
  );
}

const titleFrom = (html: string) => {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? m[1].trim() : "";
};
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ");

async function fetchLiveSlugs(): Promise<Array<{ slug: string; headline: string }>> {
  const { data, error } = await supabase
    .from("live_articles")
    .select("slug,headline")
    .order("published_at", { ascending: false })
    .limit(500);
  if (error) { console.warn("live_articles fetch failed", error); return []; }
  return (data ?? []) as Array<{ slug: string; headline: string }>;
}

const STATIC_ROUTES: RouteRow[] = [
  { path: "/", group: "static" },
  { path: "/framework", group: "static", expect: "Supply Chain" },
  { path: "/analysis", group: "static", expect: "Analysis" },
  { path: "/live", group: "static", expect: "Live" },
  { path: "/market-map", group: "static", expect: "Market Map" },
  { path: "/posts", group: "static", expect: "Posts" },
  { path: "/audit", group: "static", expect: "Audit" },
  { path: "/paper", group: "static", expect: "Paper" },
  { path: "/for-product-leaders", group: "static" },
  { path: "/for-investors", group: "static" },
  { path: "/about", group: "static" },
  { path: "/faq", group: "static", expect: "FAQ" },
  { path: "/glossary", group: "static", expect: "Glossary" },
  { path: "/predictions", group: "static" },
];

function buildLayerPath(l: { id: string; shortName: string }) {
  return `/framework/${l.id.toLowerCase()}-${l.shortName.toLowerCase().replace(/\s+/g, "-")}`;
}

const GROUP_ORDER: Group[] = ["static", "framework", "live", "market-map", "analysis", "laws", "posts"];

const STATUS_COLOR: Record<Status, string> = {
  pending: "bg-muted text-muted-foreground",
  running: "bg-blue-500/15 text-blue-400 border-blue-500/40",
  ok: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
  fail: "bg-red-500/15 text-red-400 border-red-500/40",
};

export default function CrawlAdmin() {
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);
  const [routes, setRoutes] = useState<RouteRow[]>([]);
  const [results, setResults] = useState<Record<string, CrawlResult>>({});
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filter, setFilter] = useState<"all" | "fail" | "ok" | "pending">("all");
  const [groupFilter, setGroupFilter] = useState<"all" | Group>("all");
  const [homeBaseline, setHomeBaseline] = useState<{ bytes: number; title: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(PASSCODE_KEY);
    if (!stored) { setChecking(false); return; }
    supabase.functions.invoke("verify-remaster-passcode", { body: { passcode: stored } })
      .then(({ data, error }) => {
        if (!error && data?.ok) setUnlocked(true);
        else localStorage.removeItem(PASSCODE_KEY);
      })
      .finally(() => setChecking(false));
  }, []);

  // Build the canonical route set from the same registries prerender uses.
  useEffect(() => {
    if (!unlocked) return;
    (async () => {
      const live = await fetchLiveSlugs();
      const list: RouteRow[] = [
        ...STATIC_ROUTES,
        ...LAYERS.map((l) => ({
          path: buildLayerPath(l),
          group: "framework" as Group,
          expect: l.name,
        })),
        ...live.map((a) => ({
          path: `/live/${a.slug}`,
          group: "live" as Group,
          expect: a.headline.split(/\s+/).slice(0, 5).join(" "),
        })),
        ...VERTICAL_REGISTRY.map((v) => ({
          path: `/market-map/${v.slug}`,
          group: "market-map" as Group,
          expect: v.label,
        })),
        ...CASE_STUDIES.map((c) => ({
          path: `/analysis/${c.slug}`,
          group: "analysis" as Group,
          expect: c.title.split(/\s+/).slice(0, 4).join(" "),
        })),
        ...LAW_ESSAYS.map((e) => ({
          path: `/laws/${e.slug}`,
          group: "laws" as Group,
          expect: e.title.split(/\s+/).slice(0, 4).join(" "),
        })),
        ...POSTS.map((p) => ({
          path: `/posts/${p.slug}`,
          group: "posts" as Group,
          expect: p.title.split(/\s+/).slice(0, 4).join(" "),
        })),
      ];
      setRoutes(list);
      const seed: Record<string, CrawlResult> = {};
      for (const r of list) {
        seed[r.path] = {
          status: "pending", hasTitle: false, matchesShell: false,
          expectFound: null, reason: "not yet crawled",
        };
      }
      setResults(seed);
    })();
  }, [unlocked]);

  async function checkOne(r: RouteRow, baseline: { bytes: number; title: string }): Promise<CrawlResult> {
    try {
      const res = await fetch(r.path, {
        headers: { accept: "text/html" },
        redirect: "follow",
        cache: "no-store",
      });
      const html = await res.text();
      const title = titleFrom(html);
      const bytes = html.length;
      const hasTitle = title.length > 0;
      const matchesShell = bytes === baseline.bytes;
      const needle = r.expect ? norm(r.expect) : "";
      const expectFound = needle ? norm(html).includes(needle) : null;

      let status: Status = "ok";
      let reason = "";
      if (!res.ok) { status = "fail"; reason = `HTTP ${res.status}`; }
      else if (r.path !== "/" && matchesShell) { status = "fail"; reason = "byte-identical to homepage shell"; }
      else if (expectFound === false) { status = "fail"; reason = `expected "${r.expect}" not in HTML`; }
      else if (r.path !== "/" && title && title === baseline.title) {
        status = "fail"; reason = "title matches homepage, SPA fallback";
      } else {
        reason = expectFound ? `found "${r.expect}"` : "title present, differs from home";
      }
      return {
        status, httpStatus: res.status, bytes, title, hasTitle,
        matchesShell, expectFound, reason, checkedAt: new Date().toISOString(),
      };
    } catch (err) {
      return {
        status: "fail", hasTitle: false, matchesShell: false, expectFound: null,
        reason: `fetch failed: ${(err as Error).message}`,
        checkedAt: new Date().toISOString(),
      };
    }
  }

  async function runAll() {
    if (running || routes.length === 0) return;
    setRunning(true);
    setProgress(0);
    try {
      // Baseline first: "/" tells us the homepage shell signature.
      const homeRes = await fetch("/", { headers: { accept: "text/html" }, cache: "no-store" });
      const homeHtml = await homeRes.text();
      const baseline = { bytes: homeHtml.length, title: titleFrom(homeHtml) };
      setHomeBaseline(baseline);

      // Bounded concurrency, 6 in flight is enough for a few hundred routes
      // without hammering the edge.
      const queue = [...routes];
      let done = 0;
      const workers = Array.from({ length: 6 }, async () => {
        while (queue.length) {
          const r = queue.shift();
          if (!r) break;
          setResults((s) => ({ ...s, [r.path]: { ...s[r.path], status: "running", reason: "fetching…" } }));
          const result = await checkOne(r, baseline);
          setResults((s) => ({ ...s, [r.path]: result }));
          done += 1;
          setProgress(Math.round((done / routes.length) * 100));
        }
      });
      await Promise.all(workers);
      const fails = Object.values(results).filter((r) => r.status === "fail").length;
      toast.success(`Crawl complete, ${done} routes checked${fails ? `, ${fails} failing` : ""}`);
    } finally {
      setRunning(false);
    }
  }

  async function recheck(path: string) {
    const r = routes.find((x) => x.path === path);
    if (!r) return;
    let baseline = homeBaseline;
    if (!baseline) {
      const homeRes = await fetch("/", { headers: { accept: "text/html" }, cache: "no-store" });
      const homeHtml = await homeRes.text();
      baseline = { bytes: homeHtml.length, title: titleFrom(homeHtml) };
      setHomeBaseline(baseline);
    }
    setResults((s) => ({ ...s, [path]: { ...s[path], status: "running", reason: "fetching…" } }));
    const result = await checkOne(r, baseline);
    setResults((s) => ({ ...s, [path]: result }));
  }

  const summary = useMemo(() => {
    const all = Object.values(results);
    return {
      total: all.length,
      ok: all.filter((r) => r.status === "ok").length,
      fail: all.filter((r) => r.status === "fail").length,
      pending: all.filter((r) => r.status === "pending").length,
      withTitle: all.filter((r) => r.hasTitle).length,
    };
  }, [results]);

  const filtered = useMemo(() => {
    return routes
      .filter((r) => groupFilter === "all" || r.group === groupFilter)
      .filter((r) => {
        const res = results[r.path];
        if (!res) return true;
        if (filter === "all") return true;
        return res.status === filter;
      })
      .sort((a, b) => {
        const ai = GROUP_ORDER.indexOf(a.group);
        const bi = GROUP_ORDER.indexOf(b.group);
        if (ai !== bi) return ai - bi;
        return a.path.localeCompare(b.path);
      });
  }, [routes, results, filter, groupFilter]);

  function fmtTime(iso?: string) {
    if (!iso) return " - ";
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Checking…</div>;
  }
  if (!unlocked) {
    return (
      <>
        <Helmet><meta name="robots" content="noindex" /></Helmet>
        <PasscodeGate onUnlock={() => setUnlocked(true)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Crawl Admin, SCoAI</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-3xl font-bold">Crawl Status</h1>
            <p className="text-sm text-muted-foreground max-w-2xl mt-1">
              Per-route check of the prerendered HTML on{" "}
              <code className="text-xs">{typeof window !== "undefined" ? window.location.origin : ""}</code>.
              Verifies the page returns its own content (not the homepage shell)
              and exposes a <code>&lt;title&gt;</code> for crawlers.
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <Link to="/admin/audit" className="text-sm text-muted-foreground hover:text-foreground">→ audit</Link>
            <Link to="/admin/remaster" className="text-sm text-muted-foreground hover:text-foreground">→ remaster</Link>
            <Button onClick={runAll} disabled={running || routes.length === 0}>
              {running ? `Crawling… ${progress}%` : `Run crawl (${routes.length} routes)`}
            </Button>
          </div>
        </div>

        <Card className="p-4 mb-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div><div className="text-xs uppercase text-muted-foreground">Total</div><div className="font-mono text-xl">{summary.total}</div></div>
            <div><div className="text-xs uppercase text-muted-foreground">Pass</div><div className="font-mono text-xl text-emerald-400">{summary.ok}</div></div>
            <div><div className="text-xs uppercase text-muted-foreground">Fail</div><div className="font-mono text-xl text-red-400">{summary.fail}</div></div>
            <div><div className="text-xs uppercase text-muted-foreground">Pending</div><div className="font-mono text-xl">{summary.pending}</div></div>
            <div><div className="text-xs uppercase text-muted-foreground">With &lt;title&gt;</div><div className="font-mono text-xl">{summary.withTitle}</div></div>
          </div>
          {running && (
            <div className="mt-3 h-1.5 bg-secondary rounded overflow-hidden">
              <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
            </div>
          )}
          {homeBaseline && (
            <div className="mt-3 text-xs text-muted-foreground">
              Homepage baseline: {homeBaseline.bytes.toLocaleString()} bytes · <code>{homeBaseline.title}</code>
            </div>
          )}
        </Card>

        <div className="flex gap-2 mb-4 flex-wrap items-center">
          {(["all", "fail", "ok", "pending"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1 rounded border ${filter === f ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
              {f}
            </button>
          ))}
          <span className="text-muted-foreground text-xs ml-2">·</span>
          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value as typeof groupFilter)}
            className="bg-background border border-border rounded px-2 py-1 text-xs"
          >
            <option value="all">all groups</option>
            {GROUP_ORDER.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          <div className="ml-auto text-xs text-muted-foreground">{filtered.length} shown</div>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Status</TableHead>
                <TableHead className="w-24">Group</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="w-32">Reason</TableHead>
                <TableHead className="w-24">Checked</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => {
                const res = results[r.path];
                if (!res) return null;
                return (
                  <TableRow key={r.path}>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] font-bold ${STATUS_COLOR[res.status]}`}>
                        {res.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{r.group}</TableCell>
                    <TableCell className="font-mono text-xs">
                      <a href={r.path} target="_blank" rel="noreferrer" className="hover:underline">{r.path}</a>
                    </TableCell>
                    <TableCell className="text-xs">
                      {res.hasTitle ? (
                        <span className="truncate block max-w-[28rem]" title={res.title}>{res.title}</span>
                      ) : (
                        <span className="text-red-400">missing</span>
                      )}
                    </TableCell>
                    <TableCell className="text-[11px] text-muted-foreground" title={res.reason}>
                      <span className="truncate block max-w-[12rem]">{res.reason}</span>
                    </TableCell>
                    <TableCell className="text-[11px] text-muted-foreground font-mono">{fmtTime(res.checkedAt)}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" onClick={() => recheck(r.path)} disabled={res.status === "running"}>
                        recheck
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-10">
                    No routes match the current filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
