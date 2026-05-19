import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowUpDown, ExternalLink, Search } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import LayerTag from "@/components/LayerTag";
import { MAP_COMPANIES, ARCHETYPE_LABEL, type Archetype } from "@/data/marketMap";
import { CASE_STUDIES } from "@/data/caseStudies";
import { layerColor } from "@/data/layers";

type SortKey = "name" | "dominance" | "archetype" | "vertical";
type SortDir = "asc" | "desc";

const LAYER_ORDER = ["L-1", "L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"];

const dominanceOf = (layers: string[]) => layers[0] ?? "";

const SEO_DESC =
  "The canonical SCOI v1 classification table. Every notable AI company plotted across the 10 layers of The Supply Chain of Intelligence™ — sortable by dominant layer, archetype, and vertical, with citations to the live case studies. Not logistics — the generative AI stack.";

const ClassificationPage = () => {
  const [query, setQuery] = useState("");
  const [archetypeFilter, setArchetypeFilter] = useState<Archetype | "all">("all");
  const [layerFilter, setLayerFilter] = useState<string | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("dominance");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const archetypes = Array.from(new Set(MAP_COMPANIES.map((c) => c.archetype)));

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = MAP_COMPANIES.filter((c) => {
      if (archetypeFilter !== "all" && c.archetype !== archetypeFilter) return false;
      if (layerFilter !== "all" && !c.layers.includes(layerFilter)) return false;
      if (q && !c.name.toLowerCase().includes(q)) return false;
      return true;
    });
    const dir = sortDir === "asc" ? 1 : -1;
    const cmp = (a: typeof filtered[number], b: typeof filtered[number]) => {
      if (sortKey === "name") return a.name.localeCompare(b.name) * dir;
      if (sortKey === "archetype") return a.archetype.localeCompare(b.archetype) * dir;
      if (sortKey === "vertical") return a.verticals[0].localeCompare(b.verticals[0]) * dir;
      // dominance
      const ai = LAYER_ORDER.indexOf(dominanceOf(a.layers));
      const bi = LAYER_ORDER.indexOf(dominanceOf(b.layers));
      return (ai - bi) * dir;
    };
    return [...filtered].sort(cmp);
  }, [query, archetypeFilter, layerFilter, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const caseFor = (slug?: string) =>
    slug ? CASE_STUDIES.find((c) => c.slug === slug) : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "SCOI v1 — Canonical AI-Company Classification",
    description: SEO_DESC,
    url: "https://supplychainofai.com/classification",
    creator: {
      "@type": "Person",
      name: "Anand Arivukkarasu",
      url: "https://supplychainofai.com/about",
    },
    keywords: [
      "Supply Chain of Intelligence",
      "generative AI stack",
      "AI company classification",
      "SCOI",
    ],
    variableMeasured: ["layer", "archetype", "vertical"],
  };

  return (
    <SiteLayout>
      <Seo
        title="SCOI Classification Table — 60+ AI companies mapped to the 10-layer stack"
        description={SEO_DESC}
        path="/classification"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* HERO */}
      <section className="bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
          <Eyebrow className="mb-4">SCOI v1 · canonical classification</Eyebrow>
          <h1 className="font-display text-3xl md:text-[44px] font-bold text-foreground leading-[1.1] mb-4">
            Every notable AI company, <span className="text-accent">plotted on the stack.</span>
          </h1>
          <p className="text-foreground/80 text-[17px] leading-[1.75] max-w-2xl mb-8">
            One sortable, citation-grade table. Each row is a company's primary
            structural position across the 10 layers of The Supply Chain of
            Intelligence™ — with its archetype (fortress, refinery, surface,
            graveyard…) and a link to the long-form case study where one exists.
          </p>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter by company name…"
                className="w-full pl-9 pr-3 py-2.5 bg-card border-2 border-border focus:border-accent rounded-lg text-sm outline-none"
              />
            </div>
            <select
              value={layerFilter}
              onChange={(e) => setLayerFilter(e.target.value)}
              className="bg-card border-2 border-border rounded-lg px-3 py-2.5 text-sm font-mono-marker uppercase tracking-wider"
            >
              <option value="all">All layers</option>
              {LAYER_ORDER.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <select
              value={archetypeFilter}
              onChange={(e) => setArchetypeFilter(e.target.value as Archetype | "all")}
              className="bg-card border-2 border-border rounded-lg px-3 py-2.5 text-sm font-mono-marker uppercase tracking-wider"
            >
              <option value="all">All archetypes</option>
              {archetypes.map((a) => (
                <option key={a} value={a}>{ARCHETYPE_LABEL[a]}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <p className="font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground mb-4">
            {rows.length} {rows.length === 1 ? "company" : "companies"}
          </p>

          <div className="overflow-x-auto border border-border rounded-xl bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 border-b border-border">
                <tr className="text-left">
                  <Th onClick={() => toggleSort("name")} active={sortKey === "name"}>Company</Th>
                  <Th onClick={() => toggleSort("dominance")} active={sortKey === "dominance"}>Dominant layer</Th>
                  <th className="px-4 py-3 font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground">All layers</th>
                  <Th onClick={() => toggleSort("archetype")} active={sortKey === "archetype"}>Archetype</Th>
                  <Th onClick={() => toggleSort("vertical")} active={sortKey === "vertical"}>Vertical</Th>
                  <th className="px-4 py-3 font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground">Citation</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => {
                  const dom = dominanceOf(c.layers);
                  const study = caseFor(c.caseStudy);
                  return (
                    <tr
                      key={c.name}
                      className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <a
                          href={`https://${c.domain}`}
                          target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-foreground hover:text-accent font-display font-bold"
                        >
                          {c.name}
                          <ExternalLink size={11} className="opacity-50" />
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="font-mono-marker text-[12px] font-bold px-2 py-1 rounded"
                          style={{ background: `${layerColor(dom)}22`, color: layerColor(dom) }}
                        >
                          {dom}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {c.layers.map((l) => (
                            <LayerTag key={l} id={l} variant="compact" />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-foreground/80">{ARCHETYPE_LABEL[c.archetype]}</td>
                      <td className="px-4 py-3 text-foreground/70 text-xs uppercase font-mono-marker tracking-wider">
                        {c.verticals.join(", ")}
                      </td>
                      <td className="px-4 py-3">
                        {study ? (
                          <Link
                            to={`/analysis/${study.slug}`}
                            className="text-accent hover:underline inline-flex items-center gap-1 text-xs font-mono-marker uppercase tracking-wider"
                          >
                            Case study <ExternalLink size={11} />
                          </Link>
                        ) : c.note ? (
                          <span className="text-xs text-muted-foreground italic">{c.note.slice(0, 80)}{c.note.length > 80 ? "…" : ""}</span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-muted-foreground mt-4 italic">
            Layer assignments reflect a company's <em>primary</em> structural position(s), not every layer they touch. Edits, dissents, and additions welcome — challenge any classification on the <Link to="/challenge" className="text-accent hover:underline">Challenge page</Link>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <p className="font-mono-marker text-[11px] font-bold uppercase tracking-[0.18em] text-accent mb-2">— Diagnose, don't describe</p>
            <h3 className="font-display text-xl md:text-2xl font-bold leading-snug">
              Every classification stands on a per-layer diagnostic test.
            </h3>
            <p className="text-background/70 text-[15px] mt-2 max-w-xl">
              Disagree with a row? Use the layer's inclusion / exclusion / removal tests to challenge it.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/framework" className="bg-accent text-background font-bold px-5 py-2.5 rounded-md text-sm">
              Read the 10 layers
            </Link>
            <Link to="/glossary" className="border border-background/30 text-background font-bold px-5 py-2.5 rounded-md text-sm">
              Decoder glossary
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

const Th = ({ children, onClick, active }: { children: React.ReactNode; onClick: () => void; active: boolean }) => (
  <th
    onClick={onClick}
    className={`px-4 py-3 font-mono-marker text-[11px] uppercase tracking-wider cursor-pointer select-none ${
      active ? "text-accent" : "text-muted-foreground hover:text-foreground"
    }`}
  >
    <span className="inline-flex items-center gap-1.5">{children} <ArrowUpDown size={11} /></span>
  </th>
);

export default ClassificationPage;
