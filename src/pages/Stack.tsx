import { Link } from "react-router-dom";
import { Download, ArrowRight } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { LAYERS, displayLayerId, layerColor, layerVar } from "@/data/layers";

const layerSlug = (id: string, shortName: string) =>
  `${id.toLowerCase()}-${shortName.toLowerCase().replace(/\s+/g, "-")}`;

const ANALOGY: Record<string, string> = {
  "L-1": "Mines", L0: "Shovels", L1: "Ore", L2: "Smelter", L3: "Hallmark",
  L4: "Railroad", L5: "Jeweler", L6: "Store", L7: "Wearing", L8: "Ledger",
};

const StackPage = () => {
  return (
    <SiteLayout>
      <Seo
        title="The Stack — 10 Layers, 50 Sublayers, 4 Laws | Supply Chain of Intelligence"
        description="The complete visual map of the generative AI stack — 10 layers, 50 sublayers, 18 defensible positions, and the structural laws that govern them. Free PDF download."
        path="/stack"
      />

      <article className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
        {/* Header */}
        <header className="mb-8">
          <div className="font-mono-marker text-[10px] uppercase tracking-[0.22em] text-accent mb-4">
            ACT 3 &nbsp;·&nbsp; THE STACK
          </div>
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[0.95] tracking-tight mb-5">
            The Supply Chain of Intelligence<span className="text-accent">.</span>
          </h1>
          <div className="h-[3px] w-20 bg-accent mb-4" />
          <p className="font-display italic text-xl sm:text-2xl text-foreground/75 max-w-4xl leading-snug">
            10 layers · 50 sublayers · 4 laws. Below the line is foundation.
            Above is where intelligence actually compounds.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="/supply-chain-of-intelligence.pdf"
              download
              className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-md font-semibold text-sm hover:bg-foreground/85 transition-colors"
            >
              <Download size={15} /> Download the PDF (one page per layer)
            </a>
            <Link
              to="/framework"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              Read the framework in depth <ArrowRight size={14} />
            </Link>
          </div>
        </header>

        {/* The big diagram — sandalwood paper canvas */}
        <section
          className="rounded-lg p-5 sm:p-8 lg:p-10 overflow-x-auto"
          style={{
            background: "hsl(var(--paper))",
            boxShadow: "inset 0 0 0 1px hsl(var(--paper-rule) / 0.5)",
          }}
          aria-label="The 10-layer stack diagram"
        >
          {/* Eyebrow + serif title, attachment style */}
          <div
            className="font-mono-marker text-[10px] uppercase tracking-[0.24em] mb-3"
            style={{ color: "hsl(var(--accent))" }}
          >
            The Framework · Ten Layers
          </div>
          <h2
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] mb-2"
            style={{ color: "hsl(var(--paper-ink))" }}
          >
            The supply chain of intelligence.
          </h2>
          <div className="h-[2px] w-24 mb-7" style={{ background: "hsl(var(--accent))" }} />

          {/* Chip row — the visual signature from the attachment */}
          <div className="min-w-[1100px]">
            <div className="grid grid-cols-10 gap-2 mb-3">
              {LAYERS.map((l) => (
                <div key={`${l.id}-chip`} className="flex flex-col items-center">
                  <div
                    className="font-mono-marker text-[10px] tracking-[0.18em] text-center mb-1.5 leading-tight min-h-[28px] flex items-end justify-center"
                    style={{ color: "hsl(var(--paper-ink) / 0.55)" }}
                  >
                    {l.shortName.toUpperCase()}
                  </div>
                  <Link
                    to={`/framework/${layerSlug(l.id, l.shortName)}`}
                    className="w-full rounded-md py-2.5 px-2 text-center transition-transform hover:-translate-y-0.5"
                    style={{ background: layerColor(l.id) }}
                  >
                    <div className="font-mono-marker text-white text-sm tracking-[0.1em] font-semibold">
                      {displayLayerId(l.id)}
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Sublayer columns under each chip */}
            <div className="grid grid-cols-10 gap-2 mt-3">
              {LAYERS.map((l) => (
                <div key={`${l.id}-subs`} className="flex flex-col gap-1.5">
                  {l.sublayers.map((s) => (
                    <div
                      key={s.id}
                      className="rounded px-2 py-2 text-[11px] leading-tight text-center transition-colors"
                      style={{
                        background: `hsl(var(${layerVar(l.id)}-bg))`,
                        color: "hsl(var(--paper-ink) / 0.82)",
                        border: `1px solid hsl(var(${layerVar(l.id)}) / 0.25)`,
                      }}
                      title={`${s.id} ${s.name} — ${s.desc}`}
                    >
                      <span className="block font-medium">{s.name}</span>
                      {s.defensible && (
                        <span style={{ color: "hsl(var(--accent))" }} className="text-[10px]"> ★</span>
                      )}
                    </div>
                  ))}
                  <div
                    className="font-display italic text-[11px] text-center mt-1"
                    style={{ color: "hsl(var(--paper-ink) / 0.5)" }}
                  >
                    {ANALOGY[l.id]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Italic caption — attachment signature */}
          <p
            className="font-display italic text-center text-base sm:text-lg mt-8 max-w-3xl mx-auto leading-snug"
            style={{ color: "hsl(var(--paper-ink) / 0.72)" }}
          >
            Below the line is foundation — slow, capital-intensive, structurally permanent.
            Above the line is where intelligence compounds and value accrues.
            <span style={{ color: "hsl(var(--accent))" }}> ★</span> marks the 18 defensible sublayers.
          </p>
        </section>

        {/* Laws strip */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            ["LAW I · GRAVITY", "Intelligence commoditizes downward.", "Wrappers don't survive — wrappers become features."],
            ["LAW II · BOTTLENECKS", "Value accrues at the scarce layer.", "Data, gates, memory, distribution — find the bottleneck, own it."],
            ["LAW III · CHAIN > SURFACE", "Surface captures attention; chain captures power.", "A beautiful UI gets users. The chain keeps them."],
            ["LAW IV · SEPARATION", "Generation and verification must be separate.", "L3 above L2/L5 is structurally permanent in regulated industries."],
          ].map(([head, title, body]) => (
            <div key={head} className="border-l-4 border-accent pl-4 py-1">
              <div className="font-mono-marker text-[10px] tracking-[0.14em] text-accent mb-1">{head}</div>
              <p className="font-display italic text-foreground/85 text-sm leading-snug mb-1">{title}</p>
              <p className="text-xs text-foreground/65 leading-snug">{body}</p>
            </div>
          ))}
        </section>

        {/* Sheet footer */}
        <div className="mt-8 pt-4 border-t border-foreground/10 flex flex-wrap items-center justify-between gap-3 font-mono-marker text-[10px] tracking-[0.14em] text-foreground/50 uppercase">
          <span>The Supply Chain of Intelligence™ · By Anand Arivukkarasu</span>
          <span>DWG SCI-010 · SHEET 01 / 01 · REV 1.1</span>
        </div>

        {/* CTA */}
        <section className="mt-12 bg-foreground text-background rounded-lg p-8 sm:p-10">
          <div className="font-mono-marker text-[10px] tracking-[0.18em] text-accent mb-3 uppercase">
            For Product Leaders, Founders & Investors
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 leading-tight">
            Print it. Pin it. Use it in your next roadmap review.
          </h2>
          <p className="text-background/75 max-w-2xl mb-5 leading-relaxed">
            The PDF is a 12-page learning deck — one color-coded page per layer, plus a
            conclusion on how to map your own product, your competitors, and your moats
            against the stack. Free, citation-ready, no signup.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/supply-chain-of-intelligence.pdf"
              download
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <Download size={15} /> Download PDF
            </a>
            <Link
              to="/glossary"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-background hover:underline px-2"
            >
              Decode "wrapper / agent / copilot" → layers <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </article>
    </SiteLayout>
  );
};

export default StackPage;
