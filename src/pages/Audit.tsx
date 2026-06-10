import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Search, Sparkles, Shield, AlertTriangle, HelpCircle, Swords } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import LayerTag from "@/components/LayerTag";
import ExportablePng from "@/components/ExportablePng";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/defensibility-audit`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type Player = { name: string; collides_at: string; note: string };
type AuditResult = {
  company?: string;
  domain?: string;
  verdict_tier:
    | "fortress"
    | "tilting_fortress"
    | "mixed"
    | "exposed"
    | "wrapper_at_risk"
    | "insufficient_data";
  one_line: string;
  aha?: string;
  layers_owned?: string[];
  layers_rented?: string[];
  archetype?: string;
  competitive_landscape?: { adjacent_players?: Player[] };
  guidance?: string;
};

const tierMeta: Record<
  AuditResult["verdict_tier"],
  { label: string; color: string; bg: string; icon: typeof Shield }
> = {
  fortress: { label: "Defensible", color: "hsl(var(--verdict-fortified))", bg: "hsl(var(--verdict-fortified) / 0.08)", icon: Shield },
  tilting_fortress: { label: "Defensible — Tilting", color: "hsl(var(--verdict-fortified))", bg: "hsl(var(--verdict-fortified) / 0.06)", icon: Shield },
  mixed: { label: "Contested", color: "hsl(var(--foreground))", bg: "hsl(var(--foreground) / 0.05)", icon: HelpCircle },
  exposed: { label: "At Risk", color: "hsl(var(--verdict-exposed))", bg: "hsl(var(--verdict-exposed) / 0.07)", icon: AlertTriangle },
  wrapper_at_risk: { label: "Wrapper — At Risk", color: "hsl(var(--verdict-exposed))", bg: "hsl(var(--verdict-exposed) / 0.08)", icon: AlertTriangle },
  insufficient_data: { label: "Not Enough Signal", color: "hsl(var(--muted-foreground))", bg: "hsl(var(--muted-foreground) / 0.05)", icon: HelpCircle },
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

  return (
    <SiteLayout>
      <Seo
        title="AI Defensibility Read — One Sentence, One Map"
        description="Type a company. Get a one-sentence read of where it sits on the 10-layer generative AI stack — what it owns, what it rents, which archetype it plays, and who it collides with. Two models cross-check."
        path="/audit"
      />

      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-10">
          <Eyebrow className="mb-4">The Defensibility Read</Eyebrow>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-[1.1] mb-5 text-foreground">
            One company. One sentence. One map.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Type a company name. Two models read its public footprint against the 10-layer
            Supply Chain of Intelligence™ and return a single sentence — what it owns, what it
            rents, which archetype it plays, and who it collides with.
          </p>
        </div>

        {/* Single input */}
        <Card className="p-5 md:p-6 mb-8 border-2 border-foreground/15">
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
              {loading ? <><Loader2 size={16} className="animate-spin" /> Reading…</> : <><Search size={16} /> Read</>}
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
              className="space-y-5"
            >
              {/* Verdict line */}
              <Card className="p-6 md:p-8 border-2" style={{ borderColor: tier.color, background: tier.bg }}>
                <div className="flex items-center gap-2 mb-3">
                  {TierIcon && <TierIcon size={16} style={{ color: tier.color }} />}
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
              </Card>

              {result.verdict_tier === "insufficient_data" && result.guidance && (
                <Card className="p-5 border-dashed">
                  <p className="text-sm text-foreground/80 leading-relaxed">{result.guidance}</p>
                </Card>
              )}

              {result.verdict_tier !== "insufficient_data" && (
                <>
                  {/* The Aha */}
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

                  {/* Owns / Rents */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Card className="p-5">
                      <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-verdict-fortified mb-3">Owns</p>
                      <div className="flex flex-wrap gap-1.5">
                        {(result.layers_owned ?? []).map((l) => (
                          <LayerTag key={l} id={l} variant="chip" link />
                        ))}
                        {(!result.layers_owned || result.layers_owned.length === 0) && (
                          <span className="text-xs text-muted-foreground italic">Nothing structural yet.</span>
                        )}
                      </div>
                    </Card>
                    <Card className="p-5">
                      <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-verdict-exposed mb-3">Rents</p>
                      <div className="flex flex-wrap gap-1.5">
                        {(result.layers_rented ?? []).map((l) => (
                          <LayerTag key={l} id={l} variant="chip" link />
                        ))}
                        {(!result.layers_rented || result.layers_rented.length === 0) && (
                          <span className="text-xs text-muted-foreground italic">—</span>
                        )}
                      </div>
                    </Card>
                  </div>

                  {/* Peers */}
                  {peers.length > 0 && (
                    <Card className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Swords size={14} className="text-accent" />
                        <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-accent">Collides with</p>
                      </div>
                      <div className="space-y-2.5">
                        {peers.map((p, i) => (
                          <div key={i} className="text-sm leading-snug">
                            <span className="font-bold text-foreground">{p.name}</span>
                            {p.collides_at && (
                              <span className="ml-2 inline-block align-middle"><LayerTag id={p.collides_at} variant="chip" /></span>
                            )}
                            {p.note && <span className="text-foreground/75"> — {p.note}</span>}
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Shareable card */}
                  <div>
                    <p className="font-mono-marker text-[10px] uppercase tracking-[0.12em] text-accent mb-3">
                      Send-ready · download as PNG or PDF
                    </p>
                    <ExportablePng
                      fileName={`scoi-read-${(result.company || "company").toLowerCase().replace(/\s+/g, "-")}`}
                      caption={`Defensibility Read · ${result.company}`}
                    >
                      <div className="p-8 bg-background">
                        <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-foreground/15">
                          <div className="flex-1 min-w-0">
                            <p className="font-mono-marker text-[10px] uppercase tracking-[0.15em] text-accent mb-1">
                              {result.domain || "AI Company"} · Defensibility Read
                            </p>
                            <h3 className="font-display text-2xl font-bold text-foreground">{result.company}</h3>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-mono-marker text-[10px] uppercase tracking-wider" style={{ color: tier.color }}>
                              {tier.label}
                            </div>
                            {result.archetype && (
                              <div className="font-mono-marker text-[9px] uppercase tracking-wider text-muted-foreground mt-1">
                                {result.archetype}
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-base text-foreground/90 leading-relaxed mb-5">{result.one_line}</p>
                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <p className="font-mono-marker text-[9px] uppercase tracking-wider text-verdict-fortified mb-2">Owns</p>
                            <div className="flex flex-wrap gap-1.5">
                              {(result.layers_owned ?? []).map((l) => <LayerTag key={l} id={l} variant="chip" />)}
                            </div>
                          </div>
                          <div>
                            <p className="font-mono-marker text-[9px] uppercase tracking-wider text-verdict-exposed mb-2">Rents</p>
                            <div className="flex flex-wrap gap-1.5">
                              {(result.layers_rented ?? []).map((l) => <LayerTag key={l} id={l} variant="chip" />)}
                            </div>
                          </div>
                        </div>
                        <p className="font-mono-marker text-[9px] uppercase tracking-wider text-muted-foreground mt-6 pt-4 border-t border-foreground/10">
                          Supply Chain of Intelligence™ · supplychainofai.com
                        </p>
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
