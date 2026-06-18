import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import CiteThis from "@/components/CiteThis";
import { LAYERS } from "@/data/layers";
import { Download, FileText } from "lucide-react";

const PAPER_VERSION = "v1.0";
const PAPER_DATE = "2026-06-18";
const PAPER_TITLE = "The Supply Chain of Intelligence™ — the 10 layers of the generative AI stack";
const PAPER_PATH = "/paper";
const PAPER_URL = `https://supplychainofai.com${PAPER_PATH}`;

/**
 * /paper — the canonical citation target.
 *
 * Stratechery has Aggregation Theory. Christensen has JTBD. This is ours.
 * Every link in the wild should point here. Every poster, every teardown,
 * every law essay carries the SCoI/L# permalink convention that resolves
 * to a section here.
 *
 * Editorial register (cream paper, deliberate hand) so it FEELS like a
 * paper, not a marketing page.
 */
const Paper = () => {
  const scholarlyLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: PAPER_TITLE,
    name: PAPER_TITLE,
    description:
      "The canonical paper defining The Supply Chain of Intelligence™ — a 10-layer structural framework for the generative AI stack, with 50 sublayers, 4 laws, 5 observations, the Defensible Triangle, and the Intelligence Cube.",
    url: PAPER_URL,
    mainEntityOfPage: PAPER_URL,
    datePublished: PAPER_DATE,
    dateModified: PAPER_DATE,
    version: PAPER_VERSION,
    inLanguage: "en",
    license: "https://creativecommons.org/licenses/by/4.0/",
    keywords: [
      "Supply Chain of Intelligence",
      "SCoI",
      "generative AI stack",
      "AI defensibility",
      "10-layer framework",
      "Intelligence Cube",
      "Defensible Triangle",
    ],
    author: {
      "@type": "Person",
      name: "Anand Arivukkarasu",
      url: "https://supplychainofai.com/about",
      sameAs: ["https://www.linkedin.com/in/anandarivu"],
      jobTitle: "AI Product Architect",
    },
    creator: { "@type": "Person", name: "Anand Arivukkarasu" },
    publisher: { "@type": "Person", name: "Anand Arivukkarasu" },
    citation: PAPER_URL,
    about: [
      {
        "@type": "DefinedTerm",
        name: "The Supply Chain of Intelligence",
        alternateName: ["SCoI", "Supply Chain of Intelligence framework"],
        description:
          "A 10-layer structural framework (L-1 Resources → L8 Memory) that maps where generative AI value is created, captured, and defended.",
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "The Supply Chain of Intelligence",
          url: PAPER_URL,
        },
      },
    ],
    encoding: [
      {
        "@type": "MediaObject",
        encodingFormat: "application/pdf",
        contentUrl: "https://supplychainofai.com/paper.pdf",
      },
      {
        "@type": "MediaObject",
        encodingFormat: "text/markdown",
        contentUrl: "https://supplychainofai.com/paper.md",
      },
    ],
  };

  return (
    <SiteLayout>
      <Seo
        title="The Supply Chain of Intelligence™ — the canonical paper"
        description="The canonical paper defining the 10-layer Supply Chain of Intelligence™ framework: 50 sublayers, 4 laws, 5 observations, the Defensible Triangle, and the Intelligence Cube. By Anand Arivukkarasu."
        path={PAPER_PATH}
        article
        datePublished={PAPER_DATE}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(scholarlyLd)}</script>
      </Helmet>

      <article
        className="relative"
        style={{
          background:
            "linear-gradient(180deg, hsl(40 30% 97%) 0%, hsl(38 28% 95%) 60%, hsl(40 30% 96%) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(25 15% 30%) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden
        />

        <div className="relative max-w-3xl mx-auto px-6 pt-12 md:pt-16 pb-16">
          {/* Header */}
          <Eyebrow tone="accent" className="mb-3">
            The Paper · {PAPER_VERSION} · {new Date(PAPER_DATE).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </Eyebrow>
          <h1 className="font-display text-[34px] md:text-[52px] font-bold leading-[1.06] mb-5 text-foreground">
            The Supply Chain of Intelligence™
          </h1>
          <p
            className="font-sketch text-xl md:text-2xl text-foreground/85 leading-snug mb-7 pl-4"
            style={{
              fontWeight: 500,
              borderLeft: "3px solid hsl(0 65% 48%)",
              transform: "rotate(-0.3deg)",
            }}
          >
            The 10 layers of the generative AI stack — where value is created,
            captured, and defended.
          </p>

          <p className="text-sm text-muted-foreground mb-8">
            By <strong className="text-foreground">Anand Arivukkarasu</strong> · Ex-Meta
            (Instagram) Product Leader & AI Product Architect · San Francisco
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href="/paper.md"
              className="btn-sketch inline-flex items-center gap-2"
              download
            >
              <FileText size={14} /> Markdown
            </a>
            <a
              href="/paper.pdf"
              className="btn-sketch inline-flex items-center gap-2"
            >
              <Download size={14} /> PDF ({PAPER_VERSION})
            </a>
            <CiteThis title={PAPER_TITLE} path={PAPER_PATH} date={PAPER_DATE} />
          </div>

          {/* Abstract */}
          <section id="abstract" className="mb-12 scroll-mt-24">
            <Eyebrow size="sm" tone="muted" className="mb-2">§ Abstract</Eyebrow>
            <p className="text-[17px] md:text-[18px] leading-[1.78] text-foreground/85">
              Every generative-AI product sits on a 10-layer stack: <strong>L-1
              Resources, L0 Infrastructure, L1 Data, L2 Models, L3 Gatekeeping,
              L4 Access, L5 Execution, L6 Orchestration, L7 Surface, L8
              Memory</strong>. Four structural laws govern how value moves through
              that stack. Five observations describe the patterns that recur
              under those laws. The <strong>Defensible Triangle</strong> — L1b
              Proprietary Data + L5 Deep Skills & Playbooks + L8 Compounding
              Memory — is the most common application-layer fortress. This paper
              is the canonical definition.
            </p>
          </section>

          {/* The 10 layers — quick reference */}
          <section id="layers" className="mb-14 scroll-mt-24">
            <Eyebrow size="sm" tone="muted" className="mb-2">§ 1 · The 10 layers</Eyebrow>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              The stack at a glance
            </h2>
            <ol className="space-y-3 list-none pl-0">
              {LAYERS.map((l) => (
                <li
                  key={l.id}
                  id={`${l.id.toLowerCase()}-${l.shortName.toLowerCase().replace(/\s+/g, "-")}`}
                  className="scroll-mt-24 flex gap-4 pl-4 border-l-2"
                  style={{ borderColor: l.color }}
                >
                  <span
                    className="font-mono-marker text-sm font-bold tracking-wider shrink-0 w-12 pt-0.5"
                    style={{ color: l.color }}
                  >
                    {l.id}
                  </span>
                  <div className="flex-1">
                    <Link
                      to={`/framework/${l.id.toLowerCase()}-${l.shortName.toLowerCase().replace(/\s+/g, "-")}`}
                      className="font-display text-lg font-bold text-foreground hover:underline"
                    >
                      {l.name}
                    </Link>
                    <p className="text-[15px] leading-snug text-foreground/75 mt-0.5">
                      {l.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* The 4 Laws */}
          <section id="laws" className="mb-14 scroll-mt-24">
            <Eyebrow size="sm" tone="muted" className="mb-2">§ 2 · The 4 structural laws</Eyebrow>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              How value moves through the stack
            </h2>
            <div className="space-y-6 text-[17px] leading-[1.78] text-foreground/85">
              <div id="law-1" className="scroll-mt-24">
                <h3 className="font-display text-xl font-bold mb-1">Law I — Intelligence Commoditizes Downward</h3>
                <p>If a product depends only on generic model capability, the platform layer beneath it eventually absorbs the value. Wrappers don't survive — wrappers become features. <Link to="/laws/intelligence-commoditizes-downward" className="text-accent hover:underline">Read the essay →</Link></p>
              </div>
              <div id="law-2" className="scroll-mt-24">
                <h3 className="font-display text-xl font-bold mb-1">Law II — Value Accrues at Bottlenecks</h3>
                <p>Durable value rarely sits in the model or the UI. It sits at the scarce layer — proprietary data (L1b), workflow control (L5), verification (L3), distribution (L4), memory (L8c–e), compliance (L3a). <Link to="/laws/value-accrues-at-bottlenecks" className="text-accent hover:underline">Read the essay →</Link></p>
              </div>
              <div id="law-3" className="scroll-mt-24">
                <h3 className="font-display text-xl font-bold mb-1">Law III — The Surface Captures Attention; the Chain Captures Power</h3>
                <p>A beautiful UI may win users. Durable companies own a deeper layer — data, execution, memory, gates. Surface without depth is a graveyard. <Link to="/laws/surface-captures-attention-chain-captures-power" className="text-accent hover:underline">Read the essay →</Link></p>
              </div>
              <div id="law-4" className="scroll-mt-24">
                <h3 className="font-display text-xl font-bold mb-1">Law IV — Generation and Verification Must Be Separate</h3>
                <p>Wherever output carries fiduciary, regulatory, safety, or reputational weight, the generator (L2/L5) and the verifier (L3) must be separate economic entities. <Link to="/laws/generation-and-verification-must-be-separate" className="text-accent hover:underline">Read the essay →</Link></p>
              </div>
            </div>
          </section>

          {/* Defensible Triangle */}
          <section id="defensible-triangle" className="mb-14 scroll-mt-24">
            <Eyebrow size="sm" tone="muted" className="mb-2">§ 3 · The Defensible Triangle</Eyebrow>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              L1b + L5 + L8 — the application-layer fortress
            </h2>
            <p className="text-[17px] leading-[1.78] text-foreground/85">
              The most common defensible pattern in the application layer:
              <strong> L1b Proprietary Data</strong> nobody else can acquire,
              <strong> L5 Deep Skills & Playbooks</strong> organisation-shaped enough
              that swapping the model out doesn't replicate them, and
              <strong> L8 Compounding Memory</strong> (network learning, institutional
              knowledge, learned world models) that gets better the longer the
              system runs. Two of three is a workflow product. Three of three is
              an intelligence gate.
            </p>
          </section>

          {/* On the word "agent" */}
          <section id="agent" className="mb-14 scroll-mt-24">
            <Eyebrow size="sm" tone="muted" className="mb-2">§ 4 · On the word "agent"</Eyebrow>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              "Agent" is not a layer
            </h2>
            <p className="text-[17px] leading-[1.78] text-foreground/85">
              "Agent" is marketing for an <strong>L5 Execution + L7 Surface
              (+ sometimes L8 Memory)</strong> package. When a company "launches
              an agent," decode it: what other layers do they own?
              Agent + L1 = fortress (Sierra, Harvey). Agent + L4 = railroad
              (Salesforce Agentforce, Microsoft Copilot). Agent + nothing =
              exposed wrapper that commoditizes the moment the underlying L2
              ships the same loop.
            </p>
          </section>

          {/* How to cite */}
          <section id="cite" className="mt-16 pt-10 border-t border-border scroll-mt-24">
            <Eyebrow size="sm" tone="muted" className="mb-2">§ How to cite this paper</Eyebrow>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Cite the paper
            </h2>
            <p className="text-[15px] text-foreground/80 mb-4">
              Licensed under CC-BY 4.0. Reuse freely with attribution to
              Anand Arivukkarasu and a link to <a href={PAPER_URL} className="underline">supplychainofai.com/paper</a>.
            </p>
            <CiteThis title={PAPER_TITLE} path={PAPER_PATH} date={PAPER_DATE} />

            <div className="mt-8 grid sm:grid-cols-2 gap-4 text-[14px]">
              <Link to="/framework" className="block p-4 border border-border rounded-lg hover:bg-muted/40 transition">
                <p className="font-semibold mb-1">→ The Framework reference</p>
                <p className="text-muted-foreground">All 50 sublayers, archetypes, Intelligence Cube.</p>
              </Link>
              <Link to="/analysis" className="block p-4 border border-border rounded-lg hover:bg-muted/40 transition">
                <p className="font-semibold mb-1">→ Worked teardowns</p>
                <p className="text-muted-foreground">Named companies decoded through the layers.</p>
              </Link>
            </div>
          </section>
        </div>
      </article>
    </SiteLayout>
  );
};

export default Paper;
