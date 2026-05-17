import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Map } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { LAYERS, LAYER_SHORT_LABEL, layerColor } from "@/data/layers";
import {
import Eyebrow from "@/components/Eyebrow";
  MAP_COMPANIES,
  VERTICAL_LABEL,
  ARCHETYPE_LABEL,
  ARCHETYPE_COLOR,
  type Vertical,
  type Archetype,
  type MapCompany,
} from "@/data/marketMap";

const VERTICALS: ("all" | Vertical)[] = [
  "all", "horizontal", "code", "finance", "legal", "health", "cx", "creative", "sales", "edu", "infra",
];

const ARCHETYPES: Archetype[] = ["fortress", "refinery", "railroad", "memory", "surface", "graveyard"];

// Render order: top of stack (L8) → bottom (L-1), matching the cube.
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

const MarketMap = () => {
  const [vertical, setVertical] = useState<"all" | Vertical>("all");

  const byLayer = useMemo(() => {
    const map: Record<string, MapCompany[]> = {};
    LAYERS.forEach((l) => { map[l.id] = []; });
    MAP_COMPANIES.forEach((co) => {
      if (vertical !== "all" && !co.verticals.includes(vertical)) return;
      co.layers.forEach((lid) => {
        if (map[lid]) map[lid].push(co);
      });
    });
    return map;
  }, [vertical]);

  const totalShown = useMemo(
    () => new Set(
      MAP_COMPANIES.filter((co) => vertical === "all" || co.verticals.includes(vertical)).map((c) => c.name),
    ).size,
    [vertical],
  );

  return (
    <SiteLayout>
      <Seo
        title="The Market Map — Every AI Company on the 10-Layer Supply Chain"
        description="A visual map of where every notable AI company sits on the Supply Chain of Intelligence™. Filter by vertical. Click any company for the structural read."
        path="/market-map"
      />

      {/* Hero */}
      <section className="bg-background border-b border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <Map size={16} className="text-accent" />
              <Eyebrow>The Market Map</Eyebrow>
            </div>
            <h1 className="font-display text-4xl md:text-[52px] font-bold text-foreground leading-[1.05] mb-4">
              Every notable AI company, <br />plotted on the 10 layers.
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              A single picture of the AI stack. Each company sits at the layer(s) it actually owns —
              not the layer it markets. Filter by vertical. Click any company with a case study for
              the full structural read.
            </p>
          </motion.div>

          {/* Archetype legend */}
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {ARCHETYPES.map((a) => (
              <div key={a} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: ARCHETYPE_COLOR[a] }} />
                <span className="font-mono-marker text-[10px] text-muted-foreground">
                  {ARCHETYPE_LABEL[a]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vertical filter */}
      <section className="bg-secondary/30 border-b border-foreground/10 sticky top-14 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center gap-2">
          <span className="font-mono-marker text-[10px] text-muted-foreground mr-2">
            VERTICAL ·
          </span>
          {VERTICALS.map((v) => {
            const active = vertical === v;
            return (
              <button
                key={v}
                onClick={() => setVertical(v)}
                className={`font-mono-marker text-[10px] px-2.5 py-1 border transition-colors ${
                  active
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground/70 border-foreground/20 hover:border-foreground/50"
                }`}
              >
                {v === "all" ? "All" : VERTICAL_LABEL[v]}
              </button>
            );
          })}
          <span className="ml-auto font-mono-marker text-[10px] text-muted-foreground">
            {totalShown} companies shown
          </span>
        </div>
      </section>

      {/* The map */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-3">
          {LAYER_ORDER.map((layer) => {
            const companies = byLayer[layer.id] ?? [];
            const color = layerColor(layer.id);
            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-5 items-start border-l-4 pl-4 py-3"
                style={{ borderColor: color }}
              >
                <Link
                  to={`/framework/${layer.id.toLowerCase()}`}
                  className="block group"
                >
                  <div
                    className="font-mono-marker text-[10px] tracking-wider"
                    style={{ color }}
                  >
                    {layer.id}
                  </div>
                  <div className="font-display text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {LAYER_SHORT_LABEL[layer.id]}
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-snug mt-1 max-w-[170px]">
                    {layer.desc.split(".")[0]}.
                  </div>
                </Link>

                <div className="flex flex-wrap gap-1.5 min-h-[40px] items-start">
                  {companies.length === 0 ? (
                    <span className="font-mono-marker text-[10px] text-muted-foreground/60 italic pt-1.5">
                      no companies in this vertical at this layer
                    </span>
                  ) : (
                    companies.map((co) => (
                      <CompanyCard key={`${layer.id}-${co.name}`} co={co} />
                    ))
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="border-t border-foreground/10 pt-6 text-[11px] text-muted-foreground leading-relaxed max-w-3xl">
            <strong className="text-foreground">How to read this map.</strong> A company appears at
            every layer it <em>structurally owns</em>, not every layer it touches. Logos shown via
            Clearbit. Archetype dots are editorial calls — fortresses own multiple layers in a
            defensible stack, graveyards are exposed surfaces awaiting commoditization. The list is
            curated, not exhaustive — suggest additions via the contact page.
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default MarketMap;
