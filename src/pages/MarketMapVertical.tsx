import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";

import { motion } from "framer-motion";
import { Map, ChevronRight, Lock, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import FreshnessBadge from "@/components/FreshnessBadge";
import ExportablePng from "@/components/ExportablePng";
import SublayerGrid from "@/components/SublayerGrid";
import MarketMapShareCard from "@/components/MarketMapShareCard";
import { VERTICAL_REGISTRY, getVertical } from "@/data/verticalsRegistry";
import { VERTICAL_DATASETS } from "@/data/verticals/legal";
import { LAYERS } from "@/data/layers";

const VerticalSidebar = ({ activeSlug }: { activeSlug: string }) => (
  <aside className="md:sticky md:top-20 self-start">
    <div className="font-mono-marker text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
      25 Verticals · 3 live
    </div>
    <nav className="flex flex-col">
      {VERTICAL_REGISTRY.map((v) => {
        const active = v.slug === activeSlug;
        const live = v.status === "live";
        const className = `group flex items-center justify-between gap-2 px-2 py-1.5 border-l-2 text-[12px] transition-colors ${
          active
            ? "border-accent bg-accent/5 text-foreground"
            : live
              ? "border-foreground/10 hover:border-foreground/40 text-foreground/80 hover:text-foreground"
              : "border-foreground/5 text-muted-foreground/60"
        }`;
        const content = (
          <>
            <span className="truncate">{v.label}</span>
            {live ? (
              <ChevronRight size={12} className="opacity-50 group-hover:opacity-100" />
            ) : (
              <span className="font-mono-marker text-[9px] tracking-wider text-muted-foreground/60 flex items-center gap-1">
                <Lock size={9} /> SOON
              </span>
            )}
          </>
        );
        return live ? (
          <Link key={v.slug} to={`/market-map/${v.slug}`} className={className}>
            {content}
          </Link>
        ) : (
          <div key={v.slug} className={`${className} cursor-not-allowed`}>{content}</div>
        );
      })}
    </nav>
    <div className="mt-4 text-[11px] text-muted-foreground leading-snug">
      Three verticals published. Twenty-two more in the queue, each researched on the same 10×5 grid.
    </div>
  </aside>
);

const MarketMapBody = ({ dataset }: { dataset: typeof VERTICAL_DATASETS[string] }) => (
  <SublayerGrid data={dataset} />
);





const MarketMapVertical = () => {
  const { vertical: slug } = useParams<{ vertical: string }>();
  const entry = slug ? getVertical(slug) : undefined;
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!entry) return <Navigate to="/market-map" replace />;

  const dataset = entry.status === "live" ? VERTICAL_DATASETS[entry.slug] : undefined;
  const isLive = entry.status === "live" && !!dataset;
  const liveVerticals = VERTICAL_REGISTRY.filter((v) => v.status === "live" && v.slug !== entry.slug);

  return (
    <SiteLayout>
      <Seo
        title={
          isLive
            ? `${entry.label} AI Market Map, 10 Layers × 50 Sublayers`
            : `${entry.label} AI, mapped on the Supply Chain of Intelligence™`
        }
        description={
          isLive
            ? `Every AI-native ${entry.label.toLowerCase()} company placed on Supply Chain of Intelligence™, 10 layers × 50 sublayers. ${entry.blurb}`
            : `${entry.blurb} How ${entry.label} AI companies map to the 10 layers and 50 sublayers of the Supply Chain of Intelligence™, the framework Anand Arivukkarasu uses to place where value accrues in the generative AI stack.`
        }
        path={`/market-map/${entry.slug}`}
      />

      <section className="bg-background border-b border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 mb-3 text-[11px] font-mono-marker text-muted-foreground tracking-wider uppercase">
            <Link to="/market-map" className="hover:text-foreground">Market Map</Link>
            <ChevronRight size={12} />
            <span className="text-foreground">{entry.label}</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <Map size={16} className="text-accent" />
              <Eyebrow>Vertical Market Map · {entry.label}</Eyebrow>
            </div>
            <h1 className="font-display text-4xl md:text-[44px] font-bold text-foreground leading-[1.05] mb-3">
              {entry.label} AI, mapped across 10 layers &amp; 50 sublayers.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl">{entry.blurb}</p>
            {isLive && dataset && (
              <div className="mt-4">
                <FreshnessBadge asOf={dataset.asOf} />
              </div>
            )}
            {!isLive && (
              <div className="mt-4 inline-flex items-center gap-2 rounded border border-foreground/15 bg-secondary/40 px-2.5 py-1 text-[10px] font-mono-marker tracking-wider uppercase text-muted-foreground">
                <Lock size={10} /> In research · dataset queued
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary/20">
        <div
          className={`mx-auto px-4 md:px-6 py-8 grid gap-4 transition-[max-width,grid-template-columns] duration-300 ${
            sidebarOpen
              ? "max-w-[1800px] grid-cols-1 md:grid-cols-[200px_1fr]"
              : "max-w-none grid-cols-1 md:grid-cols-[40px_1fr]"
          }`}
        >
          <div className="relative">
            <button
              type="button"
              onClick={() => setSidebarOpen((v) => !v)}
              className="sticky top-20 z-10 mb-3 inline-flex items-center gap-1.5 rounded border border-foreground/15 bg-background px-2 py-1 text-[10px] font-mono-marker tracking-wider uppercase text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              title={sidebarOpen ? "Collapse verticals list" : "Show verticals list"}
            >
              {sidebarOpen ? <PanelLeftClose size={12} /> : <PanelLeftOpen size={12} />}
              {sidebarOpen && <span>Hide</span>}
            </button>
            {sidebarOpen && <VerticalSidebar activeSlug={entry.slug} />}
          </div>


          <div>
            {dataset ? (
              <ExportablePng
                fileName={`scoi-${entry.slug}-market-map`}
                caption={`${entry.label}, Supply Chain of Intelligence™`}
                exportSlot={
                  <MarketMapShareCard
                    title={`${entry.label} AI, Supply Chain of Intelligence Map`}
                    subtitle={dataset.thesis}
                    dataset={dataset}
                  />
                }
              >
                <div className="bg-background p-4 md:p-6">
                  <MarketMapBody dataset={dataset} />
                </div>
              </ExportablePng>

            ) : (
              <div className="bg-background p-6 md:p-8 space-y-8">
                <div className="max-w-3xl space-y-3">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    What this map will answer for {entry.label}
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    The Supply Chain of Intelligence™ places every AI company at the
                    layer(s) where it structurally lives, so you can see who is defensible,
                    who gets absorbed by a platform below them, and where the whitespace
                    is. This is the scaffold the {entry.label} map is being built against.
                    Three verticals are live today ({liveVerticals.map((v, i) => (
                      <span key={v.slug}>
                        {i > 0 ? ", " : ""}
                        <Link to={`/market-map/${v.slug}`} className="underline hover:text-foreground">{v.label}</Link>
                      </span>
                    ))}); {entry.label} is queued behind them and follows the same
                    10&nbsp;×&nbsp;5 discipline &mdash; no fake density, no filler cells.
                  </p>
                </div>

                <div>
                  <div className="font-mono-marker text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
                    The 10 layers · 50 sublayers · the questions we answer per vertical
                  </div>
                  <ol className="space-y-3">
                    {LAYERS.map((layer) => (
                      <li key={layer.id} className="border-l-2 pl-3 py-1" style={{ borderColor: layer.color }}>
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-mono-marker text-[11px] tracking-wider" style={{ color: layer.color }}>
                            {layer.id}
                          </span>
                          <span className="font-display font-semibold text-sm text-foreground">
                            {layer.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            &mdash; who owns {layer.name.toLowerCase()} in {entry.label}?
                          </span>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.5 text-[11px] text-muted-foreground">
                          {layer.sublayers.map((s) => (
                            <li key={s.id}>
                              <span className="font-mono-marker text-foreground/70">{s.id}</span>{" "}
                              {s.name}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded border border-foreground/10 bg-secondary/30 p-4 text-sm text-muted-foreground">
                  <div className="font-mono-marker text-[10px] tracking-wider uppercase text-foreground mb-1.5">
                    Read next
                  </div>
                  <ul className="space-y-1">
                    <li>
                      <Link to="/framework" className="underline hover:text-foreground">The framework</Link> &mdash; the 10 layers, 4 laws, 3 currents, and the Intelligence Cube.
                    </li>
                    <li>
                      <Link to="/market-map" className="underline hover:text-foreground">All 25 verticals</Link> &mdash; what is live, what is queued.
                    </li>
                    {liveVerticals.map((v) => (
                      <li key={v.slug}>
                        <Link to={`/market-map/${v.slug}`} className="underline hover:text-foreground">
                          {v.label} AI market map
                        </Link> &mdash; {v.blurb}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default MarketMapVertical;
