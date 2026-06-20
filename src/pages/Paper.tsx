import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import CanonicalDefinition from "@/components/CanonicalDefinition";
import CiteThis from "@/components/CiteThis";
import { LAYERS } from "@/data/layers";
import { Download, FileText } from "lucide-react";

const PAPER_VERSION = "v1.0";
const PAPER_DATE = "2026-01-04";
const PAPER_TITLE = "Supply Chain of Intelligence™, the 10 layers of the generative AI stack";
const PAPER_PATH = "/paper";
const PAPER_URL = `https://supplychainofai.com${PAPER_PATH}`;

/**
 * /paper, the canonical citation target.
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
      "The canonical paper defining Supply Chain of Intelligence™, a 10-layer structural framework for the generative AI stack, with 50 sublayers, 4 laws, 5 observations, the Defensible Triangle, and the Intelligence Cube.",
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
        name: "Supply Chain of Intelligence",
        alternateName: ["SCoI", "Supply Chain of Intelligence framework"],
        description:
          "A 10-layer structural framework (L-1 Resources → L8 Memory) that maps where generative AI value is created, captured, and defended.",
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Supply Chain of Intelligence",
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
        title="Supply Chain of Intelligence™, the canonical paper"
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
            Supply Chain of Intelligence™
          </h1>
          <p
            className="font-sketch text-xl md:text-2xl text-foreground/85 leading-snug mb-7 pl-4"
            style={{
              fontWeight: 500,
              borderLeft: "3px solid hsl(0 65% 48%)",
              transform: "rotate(-0.3deg)",
            }}
          >
            The 10 layers of the generative AI stack, where value is created,
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

          {/* Definition, three registers, canonical block */}
          <section id="definition" className="mb-12 scroll-mt-24">
            <Eyebrow size="sm" tone="muted" className="mb-3">§ Definition</Eyebrow>
            <CanonicalDefinition variant="full" surface="cream" />
          </section>

          {/* Abstract */}
          <section id="abstract" className="mb-12 scroll-mt-24">
            <Eyebrow size="sm" tone="muted" className="mb-2">§ Abstract</Eyebrow>
            <p className="text-[17px] md:text-[18px] leading-[1.78] text-foreground/85">
              Every generative-AI product sits on a 10-layer supply chain: <strong>L-1
              Resources, L0 Infrastructure, L1 Data, L2 Models, L3 Gatekeeping,
              L4 Access, L5 Execution, L6 Orchestration, L7 Surface, L8
              Memory</strong>. The layers are the supply side. Across them flow
              <strong> three Currents</strong>, Demand Gravity, Attention Economics,
              Capital Flows, which decide whether a position at any layer compounds
              into a business or starves. <strong>Four structural laws</strong> govern
              how value migrates through the stack under those Currents. The <strong>Defensible
              Triangle</strong>, L1b Proprietary Data + L5 Deep Skills & Playbooks +
              L8 Compounding Memory, is the most common application-layer fortress.
              The word "agent" is not a layer; it is marketing for an L5 + L6 (+ L7 /
              + L8) package and must be decoded before it can be analysed.
            </p>
            <p className="text-[16px] leading-[1.78] text-foreground/70 mt-4">
              The framework is descriptive, not predictive. It does not tell you which
              company wins. It tells you, for any given company at any given moment,
              which layers it actually owns, which layers it is renting, and which
              Current is about to move the value somewhere else. That is usually enough.
            </p>
          </section>

          {/* Why a supply chain */}
          <section id="why-supply-chain" className="mb-14 scroll-mt-24">
            <Eyebrow size="sm" tone="muted" className="mb-2">§ 1 · Why a supply chain, not a stack</Eyebrow>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Stacks imply order. Supply chains expose bottlenecks.
            </h2>
            <p className="text-[17px] leading-[1.78] text-foreground/85">
              "AI stack" diagrams treat the industry as a tidy layer cake, chips on
              the bottom, models in the middle, apps on top, and imply that value
              flows cleanly upward. It does not. Value in generative AI behaves like
              value in any real industrial supply chain: it concentrates at scarcity,
              gets squeezed at bottlenecks, and migrates the moment a layer below you
              commoditises what you were charging for. Calling it a <strong>supply
              chain</strong> forces the right questions, who owns the scarce input,
              who controls the gate, who captures the margin when the layer above
              collapses in price.
            </p>
            <p className="text-[17px] leading-[1.78] text-foreground/85 mt-3">
              The 10 layers below are the supply side. They describe what is being
              produced and consumed at each step from raw resources up to the surface
              a user touches. They are deliberately granular, 50 sublayers in total  - 
              because most of the interesting moats live one level below the layer name.
            </p>
          </section>

          {/* The 10 layers, quick reference */}
          <section id="layers" className="mb-14 scroll-mt-24">
            <Eyebrow size="sm" tone="muted" className="mb-2">§ 2 · The 10 layers</Eyebrow>
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

          {/* The 3 Currents */}
          <section id="currents" className="mb-14 scroll-mt-24">
            <Eyebrow size="sm" tone="muted" className="mb-2">§ 3 · The 3 Currents</Eyebrow>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Horizontal forces across the chain
            </h2>
            <p className="text-[17px] leading-[1.78] text-foreground/85 mb-5">
              The 10 layers are vertical. The Currents are horizontal, they flow
              across every layer and decide whether a defensible position is also a
              viable business. Geopolitics and regulation are <strong>not</strong>{" "}
              Currents; they live at their native layers (L-1 and L3 respectively).
              There are exactly three.
            </p>
            <div className="space-y-5 text-[17px] leading-[1.78] text-foreground/85">
              <div>
                <h3 className="font-display text-xl font-bold mb-1">Current I, Demand Gravity</h3>
                <p>Where the budget actually sits and what it pulls toward. As L2 capability commoditises, discretionary AI spend migrates from "buy a model" to "buy an outcome", L5 execution, L8 memory, L3 verification, L1 proprietary data. A defensible layer with no buyer is worth zero.</p>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-1">Current II, Attention Economics</h3>
                <p>When generation becomes infinite, the eyeball becomes scarce. Default placement, OS integration, browser real estate, habit loops, and on-ramp ownership decide which intelligence actually gets used. Apple, Google, Microsoft, Meta, and the major model labs operate as L7 landlords charging rent in attention.</p>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-1">Current III, Capital Flows</h3>
                <p>Funding is reflexive, rounds reshape the layers they fund. Tens of billions into L2 created a generation glut and pulled talent away from L-1, which is now the binding constraint on the whole industry. Read the funding map as a distortion field, not as a value signal.</p>
              </div>
            </div>
            <p className="text-[15px] leading-[1.7] text-foreground/65 mt-5 italic">
              Two of three Currents pointing at a layer is a tailwind. All three is a
              category. None is a press release.
            </p>
          </section>

          {/* The 4 Laws */}
          <section id="laws" className="mb-14 scroll-mt-24">
            <Eyebrow size="sm" tone="muted" className="mb-2">§ 4 · The 4 structural laws</Eyebrow>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              How value moves through the stack
            </h2>
            <div className="space-y-7 text-[17px] leading-[1.78] text-foreground/85">
              <div id="law-1" className="scroll-mt-24">
                <h3 className="font-display text-xl font-bold mb-1">Law I, Intelligence Commoditises Downward</h3>
                <p>If a product depends only on generic model capability, the platform layer beneath it eventually absorbs the value. Wrappers don't survive, wrappers become features. The clock starts the moment the underlying L2 ships the same loop as a default behaviour.</p>
                <p className="text-[15px] text-foreground/70 mt-2">Jasper fell from a $1.5B valuation to roughly $300M once ChatGPT shipped the same capability inside the surface most users already had open. The product did not get worse, the layer beneath it absorbed what the product was charging for. <Link to="/laws/intelligence-commoditizes-downward" className="text-accent hover:underline">Read the essay →</Link></p>
              </div>
              <div id="law-2" className="scroll-mt-24">
                <h3 className="font-display text-xl font-bold mb-1">Law II, Value Accrues at Bottlenecks</h3>
                <p>Durable value rarely sits in the model or the UI. It sits at the scarce layer, proprietary data (L1b), workflow control (L5), verification (L3), distribution (L4), memory (L8c–e), compliance (L3a), and at the moment, energy and fabs (L-1). The exercise for any company is to name, in one sentence, which bottleneck it owns. If the sentence does not write itself, the company does not own one.</p>
                <p className="text-[15px] text-foreground/70 mt-2">NVIDIA owns L0 silicon. Vanta owns the L3 compliance gate above hyperscaler infrastructure. Bloomberg owns L1b proprietary financial data and has survived three platform shifts on the strength of that single position. <Link to="/laws/value-accrues-at-bottlenecks" className="text-accent hover:underline">Read the essay →</Link></p>
              </div>
              <div id="law-3" className="scroll-mt-24">
                <h3 className="font-display text-xl font-bold mb-1">Law III, The Surface Captures Attention; the Chain Captures Power</h3>
                <p>A beautiful UI may win the first cohort of users. Durable companies own a deeper layer of the chain, data, execution, memory, gates. Surface without depth is structurally exposed: the moment a larger surface with deeper layers chooses to compete, the thinner stack compresses.</p>
                <p className="text-[15px] text-foreground/70 mt-2">Gamma owns L7 in the presentation category. Replit owns L4 + L5 + L6 + L8 in the developer category. Both are good products. Only one of them gets harder to displace every month it operates. <Link to="/laws/surface-captures-attention-chain-captures-power" className="text-accent hover:underline">Read the essay →</Link></p>
              </div>
              <div id="law-4" className="scroll-mt-24">
                <h3 className="font-display text-xl font-bold mb-1">Law IV, Generation and Verification Must Be Separate</h3>
                <p>Wherever output carries fiduciary, regulatory, safety, or reputational weight, the generator (L2/L5) and the verifier (L3) must be separate economic entities. Markets force the separation eventually; regulators force it sooner; insurers force it permanently. L3 above L2/L5 is structurally non-absorbable in those industries, no matter how capable the model becomes.</p>
                <p className="text-[15px] text-foreground/70 mt-2">Vanta sits above AWS. Snyk sits above Copilot. Big-4 audit sits above SAP. The FDA sits above Pfizer. None of these L3 incumbents are vulnerable to the L2/L5 capability beneath them getting better; if anything, they become more necessary as that capability scales. <Link to="/laws/generation-and-verification-must-be-separate" className="text-accent hover:underline">Read the essay →</Link></p>
              </div>
            </div>
          </section>

          {/* Defensible Triangle */}
          <section id="defensible-triangle" className="mb-14 scroll-mt-24">
            <Eyebrow size="sm" tone="muted" className="mb-2">§ 5 · The Defensible Triangle</Eyebrow>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              L1b + L5 + L8, the application-layer fortress
            </h2>
            <p className="text-[17px] leading-[1.78] text-foreground/85">
              The most common application-layer fortress is a three-layer stack:
              <strong> L1b Proprietary Data</strong> nobody else can acquire,
              <strong> L5 Deep Skills & Playbooks</strong> organisation-shaped enough
              that swapping the model out doesn't replicate them, and
              <strong> L8 Compounding Memory</strong> (network learning, institutional
              knowledge, learned world models) that gets better the longer the system
              runs. Two of three is a workflow product that improves; three of three is
              an intelligence gate that compounds.
            </p>
            <p className="text-[17px] leading-[1.78] text-foreground/85 mt-3">
              The Triangle is not the only fortress shape. L3 over L2/L5 (Law IV) is a
              different fortress. L0 + L-1 (NVIDIA, the hyperscalers, the fab
              operators) is a different fortress. L4 + L5 + L6 + L8 (the platform-native
              execution stacks like Replit) is a different fortress. But for an
              application-layer company without a hyperscaler's balance sheet or a
              regulator's mandate, the Triangle is the shape to aim for, and the shape
              to test any defensibility claim against.
            </p>
          </section>

          {/* On the word "agent" */}
          <section id="agent" className="mb-14 scroll-mt-24">
            <Eyebrow size="sm" tone="muted" className="mb-2">§ 6 · On the word "agent"</Eyebrow>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              "Agent" is not a layer
            </h2>
            <p className="text-[17px] leading-[1.78] text-foreground/85">
              "Agent" is marketing for a package whose minimum viable composition is
              <strong> L5 Execution + L6 Orchestration</strong>, almost always bundled
              with <strong>L7 Surface</strong>, and, if the system remembers across
              sessions, <strong>L8 Memory</strong>. L4 Access is the substrate the
              agent rides on (connectors, protocols, permissions), not the agent
              itself. Tagging an agent story as "an L4 play" is a category error that
              recurs in roughly half the analyses written in 2025.
            </p>
            <p className="text-[17px] leading-[1.78] text-foreground/85 mt-3">
              When a company launches an agent, decode it in three steps. First, name
              the L5 capability, what work does it actually do, and is the work
              generic or domain-specific. Second, name the other layers it bundles  - 
              L1 proprietary data, L4 platform access, L8 cross-customer learning.
              Third, ask whether any of those bundled layers are structurally hard
              for the underlying L2 to replicate. If the answer is no, the agent is a
              wrapper on a clock; if yes, the agent is a Trojan horse for whichever
              deeper layer the company actually owns.
            </p>
            <ul className="text-[16px] leading-[1.8] text-foreground/80 mt-4 space-y-1 pl-5 list-disc">
              <li>Agent + L1 = fortress (Sierra, Harvey).</li>
              <li>Agent + L4 = railroad (Salesforce Agentforce, Microsoft Copilot).</li>
              <li>Agent + L8 = compounding system (the rare ones that get better the more they run).</li>
              <li>Agent + nothing = exposed wrapper that commoditises the moment the underlying L2 ships the same loop.</li>
            </ul>
          </section>

          {/* How to use it */}
          <section id="how-to-use" className="mb-14 scroll-mt-24">
            <Eyebrow size="sm" tone="muted" className="mb-2">§ 7 · How to use this framework</Eyebrow>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              A discipline, not a forecast
            </h2>
            <p className="text-[17px] leading-[1.78] text-foreground/85">
              For an <strong>operator</strong>, the exercise is to map your own
              product to the 10 layers honestly. Mark the layers you own, the layers
              you rent, and the layers you are exposed to. Then run the four laws and
              three Currents against the map and write down, in plain language, what
              compresses you and on what timeline. The output is a defensibility
              statement that survives contact with the next L2 release.
            </p>
            <p className="text-[17px] leading-[1.78] text-foreground/85 mt-3">
              For an <strong>investor</strong>, the exercise is the same applied to a
              target. Most pitch decks describe an L5 product as if it were an L1 + L5
              + L8 stack. The framework gives you the vocabulary to distinguish the
              two, and the laws give you the timeline on which the distinction matters.
            </p>
            <p className="text-[17px] leading-[1.78] text-foreground/85 mt-3">
              For an <strong>analyst</strong>, the framework is a discipline. Every
              claim about defensibility should name the layer; every claim about
              disruption should name the law; every claim about timing should name
              the Current. Loose vocabulary ("AI-native", "moaty", "platform play") is
              what made the last two years of AI analysis difficult to act on. Precise
              vocabulary is the contribution this paper is trying to make.
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
