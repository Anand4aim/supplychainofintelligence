import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { ArrowRight, Linkedin, Mic, Briefcase, Lightbulb, MapPin, Crown } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import LayerTag from "@/components/LayerTag";
import PersonalCapacityNotice from "@/components/PersonalCapacityNotice";
import anandPortrait from "@/assets/anand-portrait.png";
import CanonicalDefinition from "@/components/CanonicalDefinition";

const LINKEDIN = "https://www.linkedin.com/in/anandarivu";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anand Arivukkarasu",
  jobTitle: "Product Leader & AI Product Architect",
  url: "https://supplychainofai.com/about",
  description:
    "Ex-Meta (Instagram) product leader and former higher-level junior chess champion. Creator of The Supply Chain of Intelligence™ — a structural framework for where AI value accrues, where moats form, and which AI products survive the platform era. VP / Head of Product roles at Ideas2IT, Refersion, GRIN. Angel investor and advisor.",
  alumniOf: [
    { "@type": "Organization", name: "Meta (Instagram)" },
    { "@type": "Organization", name: "Vungle" },
  ],
  worksFor: { "@type": "Organization", name: "Ideas2IT" },
  address: { "@type": "PostalAddress", addressLocality: "San Francisco", addressRegion: "CA", addressCountry: "US" },
  sameAs: [LINKEDIN],
};

const ROLES: { era: string; org: string; role: string }[] = [
  { era: "Now", org: "Ideas2IT", role: "Product leader (primary employment, separate from this site)" },
  { era: "Prior", org: "Refersion", role: "VP, Product Management" },
  { era: "Prior", org: "GRIN", role: "VP, Product Management & Advisor" },
  { era: "2016–2019", org: "Meta (Instagram & Messenger)", role: "Product Growth Leader — Messenger business platform, IG monetization" },
  { era: "Earlier", org: "Vungle · Pinsight Media", role: "Lead Product Manager" },
];

const CRED_CHIPS = [
  { icon: Briefcase, label: "Ex-Meta (Instagram)" },
  { icon: Lightbulb, label: "Product enthusiast & angel investor" },
  { icon: Mic, label: "Speaker" },
  { icon: Crown, label: "Former chess champion" },
  { icon: MapPin, label: "San Francisco" },
];

const TALKS = [
  { title: "How to Build AI Products", host: "Product Management Exercises · AI PM Community Session", note: "A framework for designing and building AI-first products." },
  { title: "10 Metrics Every SaaS PM Should Use", host: "Product School webinar", note: "20,000+ views · the metrics talk that established the lens behind this site." },
  { title: "Principles of Product Growth, with case examples", host: "Glorium Technologies", note: "Five core principles, applied to real growth motions." },
];

const AboutPage = () => (
  <SiteLayout>
    <Seo
      title="About Anand Arivukkarasu — Framework Author"
      description="Ex-Meta (Instagram) product leader. VP/Head of Product at Ideas2IT, Refersion, GRIN. Angel investor. Creator of the 10-layer framework for where AI value accrues."
      path="/about"
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </Helmet>

    {/* HERO */}
    <section className="bg-background border-b border-border">
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-12">
        <Eyebrow className="mb-5">About the author</Eyebrow>

        <div className="grid md:grid-cols-[180px_1fr] gap-8 items-start">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-[180px] h-[180px] rounded-2xl border-2 border-accent/30 overflow-hidden shrink-0 mx-auto md:mx-0 shadow-lg"
          >
            <img
              src={anandPortrait}
              alt="Anand Arivukkarasu — Ex-Meta product leader, creator of The Supply Chain of Intelligence"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute bottom-0 inset-x-0 bg-background/90 backdrop-blur px-2 py-1 text-[10px] text-center font-mono-marker text-muted-foreground border-t border-border">
              ANAND ARIVUKKARASU
            </div>
          </motion.div>

          <div>
            <h1 className="font-display text-3xl md:text-[42px] font-bold text-foreground leading-[1.1] mb-3">
              Anand Arivukkarasu
            </h1>
            <p className="font-display text-lg md:text-xl text-foreground/85 leading-snug mb-5">
              Product Leader · Angel Investor · <span className="text-accent">Ex-Meta (Instagram)</span> · AI Product Architect
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {CRED_CHIPS.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 font-sketch text-[12px] font-bold uppercase tracking-wide bg-secondary text-foreground/80 border border-border px-2.5 py-1 rounded-full"
                >
                  <Icon size={12} className="text-accent" /> {label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={LINKEDIN} target="_blank" rel="noopener" className="btn-sketch inline-flex items-center gap-2">
                <Linkedin size={14} /> Follow on LinkedIn
              </a>
              <Link to="/framework" className="btn-sketch-outline inline-flex items-center gap-2">
                Read the Framework <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* SHORT BIO */}
    <section className="bg-background">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <PersonalCapacityNotice variant="block" className="mb-10" />
        <div className="prose prose-lg max-w-none space-y-5 text-foreground/85 text-[17px] leading-[1.85]">
          <p>

            I'm a product leader and architect focused on designing and scaling AI-first products — from 0→1 foundations to the
            growth systems that hold up at scale. I spent a decade shipping product across consumer and B2B SaaS,
            including three years at <strong className="text-foreground">Meta</strong> leading product and growth for
            the Messenger business platform and Instagram monetization surfaces.
          </p>
          <p>
            After Meta I ran product at <strong className="text-foreground">Vungle</strong>,{" "}
            <strong className="text-foreground">Pinsight Media</strong>,{" "}
            <strong className="text-foreground">GRIN</strong>, and{" "}
            <strong className="text-foreground">Refersion</strong>. Today my primary role is at{" "}
            <strong className="text-foreground">Ideas2IT</strong> as a product leader. Across a decade
            of building AI-first products, the same question kept surfacing —{" "}
            <em>"what does AI mean for this surface?"</em> — and the honest answer was usually{" "}
            <em>"we don't have a framework that explains it."</em> So I started writing one down, on
            evenings and weekends, as a personal project. This site is that project.
          </p>
          <p>
            JTBD told us <strong className="text-foreground">what users want</strong>. It never told us whether a model
            release, a hyperscaler bundle, or a productivity-suite plugin would erase the entire feature six months
            later. After watching Jasper collapse, Chegg lose 99%, Stack Overflow bleed traffic, and Grammarly get
            squeezed by Copilot — all predictable structurally, none predictable by demand alone — I started writing
            this framework down.
          </p>
          <p>
            <strong className="text-foreground">The Supply Chain of Intelligence™</strong> is that framework. Ten
            layers, fifty sublayers, four structural laws, one diagnostic cube. It is opinionated, it is portable
            across categories, and it is free — a give-back to the product community.
          </p>
          <div className="not-prose my-8">
            <CanonicalDefinition variant="full" />
          </div>
          <p>
            I spent two decades building products inside Meta, Vungle, and others, and the frameworks I leaned on most — JTBD, Wardley Maps, the Innovator's Dilemma — were all given away by their authors. This is my contribution back. Use it, cite it, fork it, disagree with it in public. That's the whole point.
          </p>
          <p>
            I grew up a <strong className="text-foreground">competitive chess player</strong> — a former
            higher-level junior champion — and that is how I read the AI market. It is a board, not a forecast.
            Every company on this site is sitting on a square. The framework names the square. The juggernaut
            still has a move. The Predictions page tracks who saw the fork and who didn't.
          </p>
          <p>
            I write it for the audience I wish had it when I was building: founders, product leaders, boards, and
            investors who need to decide <em>"is this layer ours, or are we renting it from someone bigger?"</em>{" "}
            before they commit a roadmap or a check.
          </p>
        </div>
      </div>
    </section>

    {/* JTBD × SUPPLY CHAIN — length vs depth */}
    <section className="bg-background border-t border-border">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Eyebrow className="mb-3">How the framework relates to JTBD</Eyebrow>
        <h2 className="font-display text-2xl md:text-[34px] font-bold text-foreground leading-tight mb-3">
          JTBD is the <span className="text-accent">length</span> of the need.<br className="hidden md:block" />
          The Supply Chain is the <span className="text-accent">depth</span> of the answer.
        </h2>
        <p className="text-foreground/80 text-[16px] leading-[1.75] max-w-3xl mb-8">
          Credit to <strong className="text-foreground">Bill Leece (Ex-Google product leader)</strong> for the
          sharpest one-line framing of this. JTBD tells you <em>what job</em> the customer is hiring the product
          to do. The Supply Chain of Intelligence tells you <em>how many layers</em> of the AI stack you have to
          own to deliver that job durably. Same job can be answered <em>shallow</em> (one layer, fast, fragile)
          or <em>deep</em> (multiple layers, slow, defensible). Surface looks identical. Fate is not.
        </p>

        <div className="overflow-x-auto border border-border rounded-xl">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-secondary/60 border-b border-border">
              <tr>
                <th className="px-4 py-3 font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground">Customer job (JTBD)</th>
                <th className="px-4 py-3 font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground">Shallow answer (feature)</th>
                <th className="px-4 py-3 font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground">Deep answer (chain layer)</th>
                <th className="px-4 py-3 font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground">Why depth wins</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/60 [&>tr:last-child]:border-0">
              <tr>
                <td className="px-4 py-3 font-display font-bold text-foreground align-top">"Trust what the AI generated."</td>
                <td className="px-4 py-3 text-foreground/75 align-top">An L7 "verifier" widget bolted onto the output.</td>
                <td className="px-4 py-3 text-foreground/85 align-top">Bake an <strong className="text-foreground">L3 Gatekeeping</strong> layer into the pipeline — provenance, citation, policy, audit trail.</td>
                <td className="px-4 py-3 text-foreground/75 align-top">Any competitor can ship the widget in a weekend. Almost none can ship a gate that regulators and buyers accept.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-display font-bold text-foreground align-top">"Let the AI actually do the thing."</td>
                <td className="px-4 py-3 text-foreground/75 align-top">A button that opens a confirmation modal.</td>
                <td className="px-4 py-3 text-foreground/85 align-top">Own <strong className="text-foreground">L4 Access</strong> + <strong className="text-foreground">L5 Execution</strong> — auth, identity, write-permissions into the system of record.</td>
                <td className="px-4 py-3 text-foreground/75 align-top">Execution requires earned trust with the underlying system. That is a contract, not a feature flag.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-display font-bold text-foreground align-top">"Remember me. Get smarter for me."</td>
                <td className="px-4 py-3 text-foreground/75 align-top">Local chat history in the sidebar.</td>
                <td className="px-4 py-3 text-foreground/85 align-top">Build an <strong className="text-foreground">L8 Memory</strong> layer — user, org, and network-level state that compounds across sessions.</td>
                <td className="px-4 py-3 text-foreground/75 align-top">The shallow version resets every time the model resets. The deep version becomes switching cost.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-display font-bold text-foreground align-top">"Give me a better answer than ChatGPT."</td>
                <td className="px-4 py-3 text-foreground/75 align-top">Better prompt template on top of GPT-5.</td>
                <td className="px-4 py-3 text-foreground/85 align-top">Combine <strong className="text-foreground">L1b proprietary data</strong> with an <strong className="text-foreground">L5</strong> execution loop fine-tuned on your domain.</td>
                <td className="px-4 py-3 text-foreground/75 align-top">A prompt is reproducible. A data + execution flywheel is not.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-foreground/70 text-[14px] leading-relaxed mt-5 max-w-3xl">
          Rule of thumb: when a customer need shows up, do not just ask "what feature ships this?" — ask{" "}
          <strong className="text-foreground">"which layer of the chain do we have to own to make this durable?"</strong>{" "}
          Most AI products die because they answered the right job at the wrong depth.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/framework" className="btn-sketch-outline inline-flex items-center gap-2 text-sm">
            See all 10 layers <ArrowRight size={14} />
          </Link>
          <Link to="/playbook" className="btn-sketch-outline inline-flex items-center gap-2 text-sm">
            Translate it into a PRD <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>


    {/* WHY — INDUSTRY STANDARD VOCABULARY */}
    <section className="bg-background border-t border-border">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Eyebrow className="mb-3">Why I'm really doing this</Eyebrow>
        <h2 className="font-display text-2xl md:text-[34px] font-bold text-foreground leading-tight mb-4">
          The AI industry doesn't have a <span className="text-accent">shared vocabulary</span> yet.<br className="hidden md:block" />
          That's the gap I'm trying to close.
        </h2>
        <div className="prose prose-lg max-w-none space-y-5 text-foreground/85 text-[17px] leading-[1.85]">
          <p>
            Walk into any product review, board meeting, or investor call in 2026 and you'll hear the same three words
            doing all the work: <em>"it's a wrapper"</em>, <em>"it's an agent"</em>, <em>"it's a copilot"</em>.
            That's not analysis. That's a shrug. Two companies called "agents" can sit on completely different layers
            of the stack, with completely different defensibility, and the word tells you nothing about which one
            survives the next platform release.
          </p>
          <p>
            Other industries solved this decades ago. Semiconductors have a fab → foundry → fabless taxonomy.
            Cloud has IaaS → PaaS → SaaS. Logistics has Tier 1 / Tier 2 / Tier 3 suppliers. <strong className="text-foreground">JTBD</strong> became
            durable not because the idea was uniquely brilliant, but because the vocabulary <em>froze</em>:
            job, hire, fire, functional, emotional, social. Same words everywhere. That's what lets a PM in Berlin
            and an investor in Singapore actually talk about the same thing.
          </p>
          <p>
            Generative AI doesn't have that yet. So a product team ships a feature thinking they own a moat, and an
            investor funds a "platform" thinking it's defensible, and six months later a hyperscaler ships the same
            capability as a checkbox — because nobody named which <em>layer</em> the work was actually living on.
          </p>
          <p>
            <strong className="text-foreground">The Supply Chain of Intelligence™</strong> is my attempt at that
            naming layer. Ten layers. Fifty sublayers. Four laws. One cube. Precise enough that a Series B founder, a
            corp-dev lead at a hyperscaler, and a PM at a vertical SaaS can all point at the same square on the board
            and mean the same thing.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-mono-marker text-[10px] uppercase tracking-wider text-accent mb-2">Before</p>
            <p className="font-display font-bold text-foreground text-[16px] leading-snug mb-2">
              "It's just a GPT wrapper."
            </p>
            <p className="text-[13px] text-foreground/70 leading-snug">
              Tells you nothing about who absorbs whom, or when.
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-mono-marker text-[10px] uppercase tracking-wider text-accent mb-2">After</p>
            <p className="font-display font-bold text-foreground text-[16px] leading-snug mb-2">
              "It's an L7 surface on L2 with no L1b, L5d or L8c."
            </p>
            <p className="text-[13px] text-foreground/70 leading-snug">
              Now everyone in the room knows it gets absorbed by the model layer in two quarters.
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-mono-marker text-[10px] uppercase tracking-wider text-accent mb-2">After</p>
            <p className="font-display font-bold text-foreground text-[16px] leading-snug mb-2">
              "It's L1b + L5a + L8d in Legal."
            </p>
            <p className="text-[13px] text-foreground/70 leading-snug">
              Now you can argue about price, moat, and exit on the same map.
            </p>
          </div>
        </div>

        <div className="mt-10 bg-secondary/40 border border-border rounded-xl p-6">
          <p className="font-mono-marker text-[11px] uppercase tracking-wider text-accent mb-3">The ask</p>
          <p className="text-foreground/85 text-[16px] leading-[1.75] mb-4">
            If you're a founder, PM, or investor — try using the layer notation in your next memo, review, or
            pitch. Say <strong className="text-foreground">L5</strong> instead of "the AI doing the work". Say{" "}
            <strong className="text-foreground">L8</strong> instead of "it remembers stuff". Say{" "}
            <strong className="text-foreground">L3</strong> instead of "trust and safety". The framework is{" "}
            <strong className="text-foreground">free, citable, and intentionally portable</strong>. Standards only
            become standards when enough people use them.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/framework" className="btn-sketch inline-flex items-center gap-2 text-sm">
              Get the vocabulary <ArrowRight size={14} />
            </Link>
            <Link to="/challenge" className="btn-sketch-outline inline-flex items-center gap-2 text-sm">
              Challenge a definition <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* WHY THIS FRAMEWORK EXISTS — what disappears without it */}
    <section id="why-this-exists" className="bg-background border-t border-border scroll-mt-24">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <Eyebrow className="mb-3">Why this framework exists</Eyebrow>
        <h2 className="font-display text-2xl md:text-[34px] font-bold text-foreground leading-tight mb-4">
          Six things the AI conversation <span className="text-accent">cannot do</span> without this lens.
        </h2>
        <p className="text-foreground/80 text-[16px] leading-[1.75] max-w-3xl mb-8">
          Every row below names a sentence you hear in board rooms, pitch decks, and Twitter threads —
          and the precise instrument the framework gives you to replace it with. If none of these
          gaps existed, the framework would not need to exist.
        </p>

        <div className="overflow-x-auto border border-border rounded-xl">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-secondary/60 border-b border-border">
              <tr>
                <th className="px-4 py-3 font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground w-[32%]">Without the framework</th>
                <th className="px-4 py-3 font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground w-[44%]">What the framework gives you</th>
                <th className="px-4 py-3 font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground w-[24%]">Where to see it</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/60 [&>tr:last-child]:border-0">
              <tr>
                <td className="px-4 py-3 text-foreground/75 align-top">
                  <span className="font-display font-bold text-foreground block mb-1">"It's agentic / AI-native / a wrapper."</span>
                  Vague labels. Two companies with the same label have completely different fates.
                </td>
                <td className="px-4 py-3 text-foreground/85 align-top">
                  A <strong className="text-foreground">precise vocabulary</strong> — 10 layers, 50 sublayers — so
                  "L1b moat + L2 MCP + receding L7" replaces "AI-native". Same words, everywhere, every room.
                </td>
                <td className="px-4 py-3 align-top">
                  <Link to="/framework" className="text-accent hover:underline font-sketch font-bold text-[13px]">/framework →</Link>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground/75 align-top">
                  <span className="font-display font-bold text-foreground block mb-1">"Cool product. Great UX. Strong distribution."</span>
                  Descriptive vibes. No way to test if it survives the next platform release.
                </td>
                <td className="px-4 py-3 text-foreground/85 align-top">
                  A <strong className="text-foreground">diagnostic instrument</strong> — Defensibility Audit + Triangle —
                  that a product can actually fail. Which layer creates value, captures margin, is vulnerable to absorption.
                </td>
                <td className="px-4 py-3 align-top">
                  <Link to="/" className="text-accent hover:underline font-sketch font-bold text-[13px]">Home audit →</Link>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground/75 align-top">
                  <span className="font-display font-bold text-foreground block mb-1">"It's an agent."</span>
                  Used for chatbots, copilots, automations, tool-callers — seven different architectures, one word.
                </td>
                <td className="px-4 py-3 text-foreground/85 align-top">
                  The <strong className="text-foreground">Agent Decoder</strong> — every "agent" decomposes into{" "}
                  <LayerTag id="L5" /> + <LayerTag id="L6" /> + optional <LayerTag id="L4" /> / <LayerTag id="L7" /> / <LayerTag id="L8" />.
                  Stops the conflation.
                </td>
                <td className="px-4 py-3 align-top">
                  <Link to="/framework" className="text-accent hover:underline font-sketch font-bold text-[13px]">/framework →</Link>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground/75 align-top">
                  <span className="font-display font-bold text-foreground block mb-1">"All AI gets commoditized."</span>
                  Assumes every layer collapses together. It doesn't.
                </td>
                <td className="px-4 py-3 text-foreground/85 align-top">
                  <strong className="text-foreground">Generation ≠ Verification</strong> (Law IV). Explains why{" "}
                  <LayerTag id="L3" /> stays economically durable — compliance, trust, ranking, fiduciary review —
                  even when generation goes to zero.
                </td>
                <td className="px-4 py-3 align-top">
                  <Link to="/laws/generation-verification" className="text-accent hover:underline font-sketch font-bold text-[13px]">Law IV →</Link>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground/75 align-top">
                  <span className="font-display font-bold text-foreground block mb-1">"AI eats SaaS."</span>
                  Binary verdict. Doesn't say which layer compresses, which compounds, which becomes a choke point.
                </td>
                <td className="px-4 py-3 text-foreground/85 align-top">
                  A <strong className="text-foreground">layer-by-layer value-migration map</strong> — surfaces collapse,
                  infrastructure commoditizes, orchestration becomes strategic, memory compounds. Each layer on its own clock.
                </td>
                <td className="px-4 py-3 align-top">
                  <Link to="/predictions" className="text-accent hover:underline font-sketch font-bold text-[13px]">/predictions →</Link>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground/75 align-top">
                  <span className="font-display font-bold text-foreground block mb-1">"Our moat is proprietary data."</span>
                  Over-indexes on datasets. Misses workflow position, memory gravity, gate authority.
                </td>
                <td className="px-4 py-3 text-foreground/85 align-top">
                  A <strong className="text-foreground">structural classification</strong> of companies:{" "}
                  "L7-heavy with weak L8", "strong L3 gatekeeper", "owns L5a but dependent on external L2".
                  Comparable, citable, falsifiable.
                </td>
                <td className="px-4 py-3 align-top">
                  <Link to="/analysis" className="text-accent hover:underline font-sketch font-bold text-[13px]">/analysis →</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-foreground/70 text-[14px] leading-relaxed mt-5 max-w-3xl">
          If you can replace any row with a sharper existing framework, I want to hear it.{" "}
          <Link to="/challenge" className="text-accent hover:underline font-sketch font-bold">Challenge a definition →</Link>
        </p>
      </div>
    </section>

    {/* CAREER ARC */}
    <section className="bg-secondary/40 border-y border-border">
      <div className="max-w-4xl mx-auto px-6 py-14">
        <Eyebrow className="mb-2">Career arc</Eyebrow>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          A decade shipping product. The framework comes from the receipts.
        </h2>
        <div className="space-y-4">
          {ROLES.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-[110px_1fr] md:grid-cols-[140px_180px_1fr] gap-3 md:gap-6 items-baseline pb-4 border-b border-border/60 last:border-b-0"
            >
              <span className="font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground">
                {r.era}
              </span>
              <span className="font-display font-bold text-foreground text-[17px] hidden md:block">{r.org}</span>
              <div>
                <span className="font-display font-bold text-foreground text-[17px] md:hidden block mb-0.5">
                  {r.org}
                </span>
                <span className="text-foreground/75 text-[15px] leading-snug">{r.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* TALKS / EXTERNAL */}
    <section className="bg-background">
      <div className="max-w-4xl mx-auto px-6 py-14">
        <Eyebrow className="mb-2">Talks & teaching</Eyebrow>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          The work, in other people's rooms.
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {TALKS.map((t, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-colors"
            >
              <Mic size={16} className="text-accent mb-3" />
              <p className="font-display font-bold text-foreground text-[16px] leading-snug mb-2">{t.title}</p>
              <p className="font-mono-marker text-[11px] text-muted-foreground uppercase tracking-wide mb-2">
                {t.host}
              </p>
              <p className="text-[13px] text-foreground/70 leading-snug">{t.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* READ MORE STRIP — no services, just where to read next */}
    <section className="bg-foreground text-background">
      <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
        <div>
          <p className="font-mono-marker text-[11px] md:text-[12px] font-bold uppercase tracking-[0.18em] text-accent mb-2">— Read & follow</p>
          <h3 className="font-display text-xl md:text-2xl font-bold leading-snug">
            The framework is free. Use it, cite it, push back on it.
          </h3>
          <p className="text-background/70 text-sm mt-2 max-w-xl">
            No services, no consulting, no paid engagements through this site. Questions and corrections welcome on LinkedIn.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/framework"
            className="bg-accent text-background font-sketch font-bold px-5 py-2.5 rounded-md inline-flex items-center gap-2 hover:bg-accent/90 transition-colors"
          >
            Read the framework <ArrowRight size={14} />
          </Link>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener"
            className="border border-background/30 font-sketch font-bold px-5 py-2.5 rounded-md inline-flex items-center gap-2 hover:bg-background/10 transition-colors"
          >
            <Linkedin size={14} /> Follow on LinkedIn
          </a>
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default AboutPage;
