import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, X, ArrowRight } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import GlossaryCard from "@/components/GlossaryCard";
import { GLOSSARY, GLOSSARY_CATEGORIES, type GlossaryCategory } from "@/data/glossary";

type Filter = GlossaryCategory | "all";

const SEO_DESC =
  "What does 'wrapper' actually mean? 'Agent'? 'Copilot'? 'RAG'? 'MCP'? Precise definitions for every term in the generative AI stack, mapped to the 10 layers (L-1 through L8) of The Supply Chain of Intelligence™. Not logistics — AI strategy.";

const GlossaryPage = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  // Open the entry the URL points at (e.g. /glossary#agent)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);
    }
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY.filter((g) => {
      if (filter !== "all" && g.category !== filter) return false;
      if (!q) return true;
      const hay = [g.term, g.shortDef, ...g.aliases, g.primaryLayer, ...g.layerMapping]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [query, filter]);

  const definedTermSet = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "The Supply Chain of Intelligence™ — Generative AI Stack Glossary",
    description: SEO_DESC,
    url: "https://supplychainofai.com/glossary",
    hasDefinedTerm: GLOSSARY.map((g) => ({
      "@type": "DefinedTerm",
      "@id": `https://supplychainofai.com/glossary#${g.id}`,
      name: g.term,
      alternateName: g.aliases,
      description: g.longDef,
      termCode: g.primaryLayer,
      inDefinedTermSet: "https://supplychainofai.com/glossary",
    })),
  };

  return (
    <SiteLayout>
      <Seo
        title="AI Stack Glossary — Wrapper, Agent, Copilot, RAG, MCP decoded into 10 Layers"
        description={SEO_DESC}
        path="/glossary"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(definedTermSet)}</script>
      </Helmet>

      {/* HERO */}
      <section className="bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-6 pt-16 pb-10">
          <Eyebrow className="mb-4">The decoder</Eyebrow>
          <h1 className="font-display text-3xl md:text-[44px] font-bold text-foreground leading-[1.1] mb-4">
            What people <span className="text-accent">say</span> vs. what they <span className="text-accent">mean</span>.
          </h1>
          <p className="text-foreground/80 text-[17px] leading-[1.75] max-w-2xl mb-8">
            Type any fuzzy word the AI industry actually uses — <em>"wrapper"</em>, <em>"agent"</em>,{" "}
            <em>"copilot"</em>, <em>"RAG"</em>, <em>"MCP"</em>, <em>"voice AI"</em>, <em>"moat"</em> — and get
            the precise <strong className="text-foreground">L# / L#x</strong> layer notation, a clarity-grade
            definition, the common mis-mapping, and a citation-ready one-liner you can paste into any memo.
          </p>

          {/* Search */}
          <div className="relative mb-5">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try: wrapper · agent · copilot · RAG · MCP · vertical AI..."
              className="w-full pl-12 pr-12 py-4 bg-card border-2 border-border focus:border-accent rounded-xl text-[16px] text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Category filter chips */}
          <div className="flex flex-wrap gap-2">
            {GLOSSARY_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id as Filter)}
                className={`text-[12px] font-mono-marker uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors ${
                  filter === c.id
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card text-foreground/70 border-border hover:border-accent/40 hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="bg-background">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <p className="font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground mb-5">
            {results.length} {results.length === 1 ? "term" : "terms"}
            {query && <span> matching "{query}"</span>}
          </p>

          {results.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <p className="font-display text-lg font-bold text-foreground mb-2">No match yet.</p>
              <p className="text-foreground/70 text-[15px] leading-snug mb-5 max-w-md mx-auto">
                The decoder is intentionally curated, not exhaustive. If a term belongs here, suggest it — it
                will be added with full L# mapping and citation.
              </p>
              <Link to="/challenge" className="btn-sketch inline-flex items-center gap-2 text-sm">
                Suggest a term <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((t) => (
                <GlossaryCard key={t.id} term={t} defaultOpen={results.length === 1} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
          <div>
            <p className="font-mono-marker text-[11px] font-bold uppercase tracking-[0.18em] text-accent mb-2">
              — Use the vocabulary
            </p>
            <h3 className="font-display text-xl md:text-2xl font-bold leading-snug">
              Standards become standards when enough people use them.
            </h3>
            <p className="text-background/70 text-[15px] mt-2 max-w-xl">
              Drop the layer notation into your next memo, pitch, or board review. The framework is free,
              citable, and intentionally portable.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/framework"
              className="bg-accent text-background font-bold px-5 py-2.5 rounded-md inline-flex items-center gap-2 hover:bg-accent/90 transition-colors text-sm"
            >
              See all 10 layers <ArrowRight size={14} />
            </Link>
            <Link
              to="/challenge"
              className="border border-background/30 text-background font-bold px-5 py-2.5 rounded-md inline-flex items-center gap-2 hover:bg-background/10 transition-colors text-sm"
            >
              Challenge a definition <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default GlossaryPage;
