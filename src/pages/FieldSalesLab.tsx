// Private opportunity map — hidden at /labs/field-sales.
// Not in the public verticals registry, not in the sitemap, noindex.
// This is a working artifact for internal use / share-by-link only.

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Lock, Map as MapIcon, ChevronRight, Layers } from "lucide-react";

import SiteLayout from "@/components/SiteLayout";
import Eyebrow from "@/components/Eyebrow";
import FreshnessBadge from "@/components/FreshnessBadge";
import ExportablePng from "@/components/ExportablePng";
import SublayerGrid from "@/components/SublayerGrid";
import MarketMapShareCard from "@/components/MarketMapShareCard";
import { FIELD_SALES_MAP } from "@/data/verticals/fieldSales";
import { SALES_TECH_MAP } from "@/data/verticals/salesTech";
import type { VerticalMapData, SublayerPlacement } from "@/data/verticals/legal";

const STATE_TAG: Record<string, string> = {
  scarce: "Scarce · captured",
  open: "Open · fundable",
  mid: "Mid · filling",
  contested: "Contested",
};

// Workshop view: overlay B2B Sales Tech as dimmed CONTEXT behind the Field Sales
// opportunity map. Field Sales entries stay PRIMARY (highlighted). Every Sales Tech
// chip drops to SECONDARY (faded) so the audience sees the big picture and where
// the field-sales opportunity is structurally different. On key collisions (e.g.
// `rilla` — present in both maps) the Field Sales entry wins.
function mergeWithContext(fs: VerticalMapData, ctx: VerticalMapData): VerticalMapData {
  const companies = { ...ctx.companies, ...fs.companies };
  const byId = new Map<string, SublayerPlacement>();
  for (const p of ctx.placements) {
    byId.set(p.id, {
      id: p.id,
      secondary: [...(p.primary ?? []), ...(p.secondary ?? [])],
      gap: p.gap,
    });
  }
  for (const p of fs.placements) {
    const prev = byId.get(p.id);
    const fsKeys = new Set([...(p.primary ?? []), ...(p.secondary ?? [])]);
    const ctxSecondary = (prev?.secondary ?? []).filter((k) => !fsKeys.has(k));
    const hasChips = (p.primary?.length ?? 0) + (p.secondary?.length ?? 0) + ctxSecondary.length > 0;
    byId.set(p.id, {
      id: p.id,
      primary: p.primary,
      secondary: [...(p.secondary ?? []), ...ctxSecondary],
      whitespace: p.whitespace,
      gap: hasChips ? undefined : (p.gap ?? prev?.gap),
    });
  }
  return {
    ...fs,
    companies,
    placements: Array.from(byId.values()),
  };
}

const FieldSalesLab = () => {
  const [showContext, setShowContext] = useState(true);
  const dataset = useMemo(
    () => (showContext ? mergeWithContext(FIELD_SALES_MAP, SALES_TECH_MAP) : FIELD_SALES_MAP),
    [showContext],
  );
  const [copied, setCopied] = useState(false);

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <SiteLayout>
      <Helmet>
        <title>Field Sales AI · Private Opportunity Map</title>
        <meta name="robots" content="noindex,nofollow,noarchive" />
        <meta name="googlebot" content="noindex,nofollow,noarchive" />
        <meta name="description" content="Private working map. Not for public distribution." />
      </Helmet>

      <section className="bg-background border-b border-foreground/10">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 mb-3 text-[11px] font-mono-marker text-muted-foreground tracking-wider uppercase">
            <span className="inline-flex items-center gap-1 text-[hsl(var(--layer-5))]">
              <Lock size={11} /> Private / Unlisted
            </span>
            <ChevronRight size={12} />
            <span>Labs</span>
            <ChevronRight size={12} />
            <span className="text-foreground">Field Sales</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <MapIcon size={16} className="text-accent" />
              <Eyebrow>Opportunity Map · Field Sales · Working Draft</Eyebrow>
            </div>
            <h1 className="font-display text-4xl md:text-[44px] font-bold text-foreground leading-[1.05] mb-3">
              Field Sales AI — the structural inverse of B2B Sales Tech.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
              A private opportunity map for in-person, at-the-door, on-site selling —
              home services, franchise operators, medical device reps, insurance in-home.
              Placed on the same 10 × 5 SCoI grid as the public {" "}
              <Link to="/market-map/sales-tech" className="underline hover:text-foreground">
                Sales Tech map
              </Link>{" "}
              so the two can be read side-by-side.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <FreshnessBadge asOf={FIELD_SALES_MAP.asOf} />
              <div className="inline-flex rounded border border-foreground/20 overflow-hidden text-[11px] font-mono-marker tracking-wider uppercase">
                <button
                  type="button"
                  onClick={() => setShowContext(true)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 transition-colors ${
                    showContext
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Overlay B2B Sales Tech vendors as dimmed context. Best for workshops."
                >
                  <Layers size={11} /> Workshop view · with B2B context
                </button>
                <button
                  type="button"
                  onClick={() => setShowContext(false)}
                  className={`px-2.5 py-1 border-l border-foreground/20 transition-colors ${
                    !showContext
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Show only field-sales-specific vendors."
                >
                  Field sales only
                </button>
              </div>
              <button
                type="button"
                onClick={copyShareUrl}
                className="text-[11px] font-mono-marker tracking-wider uppercase border border-foreground/20 hover:border-foreground/50 px-2.5 py-1 rounded text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied ? "Link copied" : "Copy private link"}
              </button>
            </div>

            {showContext && (
              <div className="mt-3 rounded border border-foreground/15 bg-card px-3 py-2 text-[12px] text-foreground/80 max-w-3xl">
                <b className="font-display">Reading this view.</b>{" "}
                Bright chips = field-sales-native vendors (Practis, Rilla, Siro, Yoodli, Hyperbound…).
                Faded chips = the full B2B Sales Tech landscape (Gong, Clay, 11x, Apollo, Outreach…),
                shown as context so the workshop audience can see where field sales is the{" "}
                <i>structural inverse</i>: L5a still filling here, L1c already a fortress,
                L3d/L5d wide open.
              </div>
            )}

            <div className="mt-4 rounded border border-[hsl(var(--layer-5)/0.35)] bg-[hsl(var(--layer-5)/0.06)] px-3 py-2 text-[12px] text-foreground/80 max-w-3xl">
              <b className="font-display">Emptiness warning.</b>{" "}
              Empty cells are the easiest thing on a public map to falsify. Before this
              goes anywhere, every 🟩 deserves one adversarial search — <i>"who is doing
              X in home services"</i> — ten minutes per cell. One wrong green cell
              discredits the rest.
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary/20">
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
          {/* Headline finding */}
          <div className="rounded-md border border-foreground/15 bg-card p-5">
            <div className="font-mono-marker text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">
              Headline finding
            </div>
            <p className="text-[15px] leading-relaxed text-foreground">
              In the public <Link to="/market-map/sales-tech" className="underline">Sales Tech map</Link>,
              L5a is dangerously crowded and the money has already moved down to L1 data.
              <b> Here it's the reverse.</b> L5a is only <i>filling</i> —
              Practis, Yoodli, Hyperbound, Second Nature — while L1c is already the
              best-capitalised position in the vertical because Rilla and Siro own the
              field-recording corpus. The bifurcation documented in B2B{" "}
              <b>hasn't happened here yet.</b>
            </p>
          </div>

          {/* The grid */}
          <ExportablePng
            fileName="scoi-field-sales-opportunity-map"
            caption="Field Sales — Supply Chain of Intelligence™ · PRIVATE"
            exportSlot={
              <MarketMapShareCard
                title="Field Sales AI, Supply Chain of Intelligence Map (PRIVATE)"
                subtitle={dataset.thesis}
                dataset={dataset}
              />
            }
          >
            <div className="bg-background p-4 md:p-6">
              <SublayerGrid data={dataset} />
            </div>
          </ExportablePng>

          {/* Four cells to stake the map on */}
          <div>
            <div className="font-mono-marker text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
              Four cells to stake the map on
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dataset.whitespace.map((w) => (
                <div
                  key={w.title}
                  className="rounded-md border border-[hsl(var(--layer-5)/0.35)] bg-[hsl(var(--layer-5)/0.05)] p-4"
                >
                  <div className="font-display font-bold text-foreground text-[15px] leading-snug mb-1.5">
                    {w.title}
                  </div>
                  <div className="text-[13px] text-foreground/80 leading-relaxed">
                    {w.body}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scorecard */}
          <div>
            <div className="font-mono-marker text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
              Scorecard · sublayer state
            </div>
            <div className="rounded-md border border-foreground/15 overflow-hidden">
              <table className="w-full text-[12.5px]">
                <thead className="bg-secondary/60 text-foreground">
                  <tr>
                    <th className="text-left px-3 py-2 font-mono-marker text-[10px] tracking-wider uppercase">Sublayer</th>
                    <th className="text-left px-3 py-2 font-mono-marker text-[10px] tracking-wider uppercase">Occupants</th>
                    <th className="text-left px-3 py-2 font-mono-marker text-[10px] tracking-wider uppercase">State</th>
                  </tr>
                </thead>
                <tbody>
                  {dataset.scorecard.map((r) => (
                    <tr key={r.sublayer} className="border-t border-foreground/10">
                      <td className="px-3 py-2 font-display font-semibold text-foreground">{r.sublayer}</td>
                      <td className="px-3 py-2 text-muted-foreground">{r.occupants}</td>
                      <td className="px-3 py-2 font-mono-marker text-[10px] tracking-wider uppercase text-foreground/80">
                        {STATE_TAG[r.state] ?? r.state}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Deliberate exclusions + honest counterweight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-md border border-foreground/15 bg-card p-4">
              <div className="font-mono-marker text-[10px] tracking-wider uppercase text-muted-foreground mb-2">
                Deliberate exclusions
              </div>
              <ul className="text-[13px] text-foreground/85 space-y-1.5 list-disc pl-4">
                <li><b>LMS / compliance suites</b> — Cornerstone, Docebo, Litmos. Learning delivery, not field-sales AI. Own sibling map.</li>
                <li><b>B2B inside sales</b> — SDR, dialer, meeting intel, CRM. Covered in the public <Link to="/market-map/sales-tech" className="underline">Sales Tech map</Link>.</li>
                <li><b>Hourly-hiring stack</b> — Fountain runs ~1.2M hires/year, Workday owns Paradox. Kept off-grid on purpose so no false "hiring is thinly tooled" claim slips in.</li>
              </ul>
            </div>
            <div className="rounded-md border border-foreground/15 bg-card p-4">
              <div className="font-mono-marker text-[10px] tracking-wider uppercase text-muted-foreground mb-2">
                Honest counterweight
              </div>
              <p className="text-[13px] text-foreground/85 leading-relaxed">
                L8c/L8d/L8e being empty next to enormous capital in B2B (Clay, Gong, 11x)
                is a warning as often as an invitation. The null hypothesis isn't
                "nobody noticed" — it's "it's harder than it looks, or the value arrives
                too slowly for a venture clock." Gong's position rests on a decade of
                anonymised calls no rival can replicate. A decade. Practis has roughly
                two years of one client. That's the honest scale of the gap, and the
                strongest argument for the pooled-memory play needing deliberate client
                selection starting with the next contract.
              </p>
            </div>
          </div>

          {/* Notes */}
          <div className="rounded-md border border-dashed border-foreground/20 p-4 text-[12px] text-muted-foreground leading-relaxed">
            <div className="font-mono-marker text-[10px] tracking-wider uppercase text-foreground mb-1.5">
              Notes
            </div>
            {dataset.notes}
          </div>

          {/* Epistemic footer */}
          <div className="text-[11px] text-muted-foreground italic max-w-3xl">
            Epistemic note: this map is semi-independent corroboration, not verification.
            Same analyst, same framework, different market and different research month.
            Meaningfully better than one analysis agreeing with itself; meaningfully
            weaker than an outside source. Log accordingly.
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default FieldSalesLab;
