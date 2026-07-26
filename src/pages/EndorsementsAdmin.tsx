import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import QuoteCard from "@/components/QuoteCard";
import { setAdminPasscode, getAdminPasscode, hasAdminPasscode } from "@/lib/adminPasscode";

type Endorsement = {
  id: string;
  name: string;
  title: string | null;
  institution: string | null;
  email: string | null;
  quote: string;
  document: string | null;
  permission_public: boolean;
  status: string;
  created_at: string;
};

function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("verify-remaster-passcode", {
        body: { passcode: code.trim() },
      });
      if (error || !data?.ok) return toast.error("Invalid passcode");
      setAdminPasscode(code.trim());
      onUnlock();
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-lg border border-border bg-card p-6">
        <h1 className="font-serif text-xl">Endorsements</h1>
        <input
          type="password"
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full rounded border border-border bg-background px-3 py-2"
          placeholder="Passcode"
        />
        <Button type="submit" disabled={busy || !code.trim()} className="w-full">
          {busy ? "Checking…" : "Unlock"}
        </Button>
      </form>
    </div>
  );
}

const EndorsementsAdmin = () => {
  const [unlocked, setUnlocked] = useState(hasAdminPasscode());
  const [rows, setRows] = useState<Endorsement[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-read", {
      body: { passcode: getAdminPasscode(), resource: "endorsements" },
    });
    setLoading(false);
    if (error || !data?.ok) return toast.error("Could not load endorsements");
    setRows((data.endorsements ?? []) as Endorsement[]);
  }, []);

  useEffect(() => {
    if (unlocked) void load();
  }, [unlocked, load]);

  if (!unlocked) return <Gate onUnlock={() => setUnlocked(true)} />;

  return (
    <div className="min-h-screen bg-background px-6 py-12 text-foreground">
      <Helmet>
        <title>Endorsements · Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-serif text-2xl">Endorsements ({rows.length})</h1>
          <Button variant="outline" onClick={() => void load()} disabled={loading}>
            {loading ? "Loading…" : "Refresh"}
          </Button>
        </div>

        {rows.length === 0 && !loading && (
          <p className="text-sm text-muted-foreground">Nothing submitted yet.</p>
        )}

        <div className="space-y-10">
          {rows.map((r) => (
            <section key={r.id} className="rounded-lg border border-border p-5">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline">{r.status}</Badge>
                {r.permission_public ? (
                  <Badge variant="outline">public OK</Badge>
                ) : (
                  <Badge variant="destructive">private</Badge>
                )}
                <span>{new Date(r.created_at).toLocaleString()}</span>
                {r.email && <span>· {r.email}</span>}
                {r.document && <span>· {r.document}</span>}
              </div>
              <QuoteCard
                data={{
                  name: r.name,
                  title: r.title,
                  institution: r.institution,
                  quote: r.quote,
                  document: r.document,
                }}
                fileName={`scoi-quote-${r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EndorsementsAdmin;
