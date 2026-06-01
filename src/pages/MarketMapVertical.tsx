import { useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Map, ChevronRight, Lock } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import ExportablePng from "@/components/ExportablePng";
import { LAYERS, LAYER_SHORT_LABEL, layerColor } from "@/data/layers";
import {
  MAP_COMPANIES,
  ARCHETYPE_LABEL,
  ARCHETYPE_COLOR,
  type MapCompany,
} from "@/data/marketMap";
import { VERTICAL_REGISTRY, getVertical } from "@/data/verticalsRegistry";

const ARCHETYPES = ["fortress", "refinery", "railroad", "memory", "surface", "agent", "graveyard"] as const;
const LAYER_ORDER = [...LAYERS].reverse();

const CompanyCard = ({ co }: { co: MapCompany }) => {
  const card = (
    <div
      className="group flex items-center gap-2 bg-card border border-foreground/10 hover:border-accent transition-colors px-2.5 py-1.5"
      title={co.note ?? `${co.name} · ${ARCHETYPE_LABEL[co.archetype]}`}
    >
      <img
        src={co.logo}
        alt=""
        loading="lazy"
        className="w-5 h-5 object-contain rounded-sm bg-white"
        onError={(e) => { (e.currentTarget.style.visibility = "hidden"); }}
      />
      <span className="font-mono-marker text-[10px] text-foreground whitespace-nowrap">
        {co.name}
      </span>
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: ARCHETYPE_COLOR[co.archetype] }}
        aria-label={ARCHETYPE_LABEL[co.archetype]}
      />
    </div>
  );
  if (co.caseStudy) {
    return (
      <Link to={`/analysis/${co.caseStudy}`} className="hover:no-underline">
        {card}
      </Link>
    );
  }
  return card;
};

const VerticalSidebar = ({ activeSlug }: { activeSlug: string }) => (
  <aside className="md:sticky md:top-20 self-start">
    <div className="font-mono-marker text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
      24 Verticals
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
      One vertical published. Twenty-three more in the queue — each researched on the same 10×5 grid.
    </div>
  </aside>
);

const VerticalGrid = ({ companies, label }: { companies: MapCompany[]; label: string }) => {
  const byLayer = useMemo(() => {
    const m: Record<string, MapCompany[]> = {};
    LAYERS.forEach((l) => { m[l.id] = []; });
    companies.forEach((co) => {
      co.layers.forEach((lid) => { if (m[lid]) m[lid].push(co); });
    });
    return m;
  }, [companies]);

  return (
    <div className="bg-background p-5 md:p-7 space-y-2">
      <div className="mb-3">
        <div className="font-mono-marker text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
          Vertical Market Map
        </div>
        <div className="font-display text-2xl md:text-3xl font-bold text-foreground">
          {label}
        </div>
        <div className="text-[11px] text-muted-foreground mt-1">
          Companies plotted at the layers they structurally own — not the layers they market.
        </div>
      </div>

      {LAYER_ORDER.map((layer) => {
        const cos = byLayer[layer.id] ?? [];
        const color = layerColor(layer.id);
        return (
          <div
            key={layer.id}
            className="grid grid-cols-[120px_1fr] gap-3 items-start border-l-4 pl-3 py-2"
            style={{ borderColor: color }}
          >
            <div>
              <div className="font-mono-marker text-[10px] tracking-wider" style={{ color }}>
                {layer.id}
              </div>
              <div className="font-display text-sm font-bold text-foreground leading-tight">
                {LAYER_SHORT_LABEL[layer.id]}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 min-h-[28px] items-start">
              {cos.length === 0 ? (
                <span className="font-mono-marker text-[10px] text-muted-foreground/50 italic pt-1">
                  —
                </span>
              ) : (
                cos.map((co) => (
                  <CompanyCard key={`${layer.id}-${co.name}`} co={co} />
                ))
              )}
            </div>
          </div>
        );
      })}

      <div className="mt-4 pt-3 border-t border-foreground/10 flex flex-wrap gap-x-4 gap-y-1.5">
        {ARCHETYPES.map((a) => (
          <div key={a} className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: ARCHETYPE_COLOR[a] }} />
            <span className="font-mono-marker text-[9px] text-muted-foreground tracking-wider uppercase">
              {ARCHETYPE_LABEL[a]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MarketMapVertical = () => {
  const { vertical: slug } = useParams<{ vertical: string }>();
  const entry = slug ? getVertical(slug) : undefined;

  if (!entry) return <Navigate to="/market-map" replace />;
  if (entry.status !== "live") return <Navigate to="/market-map" replace />;

  const companies = useMemo(
    () => MAP_COMPANIES.filter((co) => entry.mapsTo && co.verticals.includes(entry.mapsTo)),
    [entry],
  );

  return (
    <SiteLayout>
      <Seo
        title={`${entry.label} — AI Market Map on the 10-Layer Stack`}
        description={`Where every notable ${entry.label.toLowerCase()} AI company sits on the Supply Chain of Intelligence™. ${entry.blurb}`}
        path={`/market-map/${entry.slug}`}
      />

      <section className="bg-background border-b border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-2 mb-3 text-[11px] font-mono-marker text-muted-foreground tracking-wider uppercase">
            <Link to="/market-map" className="hover:text-foreground">Market Map</Link>
            <ChevronRight size={12} />
            <span className="text-foreground">{entry.label}</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <Map size={16} className="text-accent" />
              <Eyebrow>Vertical Market Map · 1 of 24</Eyebrow>
            </div>
            <h1 className="font-display text-4xl md:text-[48px] font-bold text-foreground leading-[1.05] mb-3">
              The {entry.label} AI Stack.
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">{entry.blurb}</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary/20">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          <VerticalSidebar activeSlug={entry.slug} />

          <div>
            <ExportablePng
              fileName={`market-map-${entry.slug}`}
              caption={`${entry.label} — Supply Chain of Intelligence™`}
            >
              <VerticalGrid companies={companies} label={entry.label} />
            </ExportablePng>

            <div className="mt-6 text-[12px] text-muted-foreground leading-relaxed max-w-3xl">
              <strong className="text-foreground">How to read this.</strong>{" "}
              A company appears at every layer it structurally owns, not every layer it touches.
              Archetype dots are editorial reads — fortresses own multiple layers; thin stacks
              sit on a single surface with a counter-move available (deepen into L1, L5, or L8).
              Curated, not exhaustive — corrections welcome.
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default MarketMapVertical;
