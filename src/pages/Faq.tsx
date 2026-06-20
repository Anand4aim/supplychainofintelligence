import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, CheckCircle2, Truck, Cpu } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";

// -----------------------------------------------------------------------------
// FAQ content, every Q&A explicitly disambiguates the framework from
// physical supply chain / freight / logistics, while reinforcing the AI
// strategy positioning for SaaS product leaders, AI founders, and investors.
// -----------------------------------------------------------------------------

type Faq = { q: string; a: string };

const DISAMBIGUATION: Faq[] = [
  {
    q: 'Is "The Supply Chain of Intelligence" about physical supply chains, freight, or logistics?',
    a:
      "No. This framework has nothing to do with shipping, freight, warehousing, trucking, ports, procurement, ERP, or operations research. " +
      'The word "supply chain" is used as a structural metaphor for the generative AI software stack, the chain of layers from semiconductors and ' +
      "foundation models to agents and memory. If you arrived here looking for logistics, SCM, 3PL, or transportation analytics, this is not that site.",
  },
  {
    q: "Then what is it actually about?",
    a:
      "It is a 10-layer architectural framework for generative AI products. It maps where AI value is created, captured, and defended, from L-1 (semiconductors and energy) " +
      "through L8 (memory and learning loops). Each layer has its own economics, defensibility profile, and strategic playbook. The framework is built for SaaS product leaders, " +
      "AI founders, and venture investors deciding which layer to own and which to rent.",
  },
  {
    q: "Why use the phrase \"supply chain\" at all if it gets confused with logistics?",
    a:
      "Because the structural insight is identical to a physical supply chain, value accrues at bottlenecks, margins compress at commoditized stages, and whoever controls the " +
      "constrained input controls the chain, but the substrate is software, models, data, and distribution rather than goods and freight. The framework is sometimes called " +
      'the "Generative AI Stack" or "AI Defensibility Map" for the same reason; the supply chain framing is the one that reveals where power actually accumulates.',
  },
];

const FOR_AUDIENCE: Faq[] = [
  {
    q: "Who is this framework for?",
    a:
      "Three audiences. (1) SaaS product leaders deciding whether to build, buy, or wrap AI capabilities. (2) AI-native founders choosing which layer to compete at and where their moat actually lives. " +
      "(3) Venture investors evaluating defensibility before a check, separating fortresses from wrappers that will be absorbed by the model layer in the next release cycle.",
  },
  {
    q: "What does a product leader get out of it?",
    a:
      "A vocabulary for the strategy conversation. Instead of debating features, teams can ask: which layers do we own, which do we rent, and which are we exposed on? " +
      "The For Product Leaders page adds a Z-axis (depth in the stack) to JTBD-driven product thinking, JTBD finds demand; the Supply Chain of Intelligence finds defensibility.",
  },
  {
    q: "What does an investor get out of it?",
    a:
      "The Defensibility Audit, a layer-by-layer scorecard derived from the framework, that separates structural moats (proprietary data, workflow lock-in, distribution, memory, compliance) " +
      "from rented capabilities that disappear the moment the underlying model ships the same loop. Used to pressure-test AI investments before and after term sheet.",
  },
  {
    q: 'Is "agent" a layer in the framework?',
    a:
      'No. "Agent" is marketing language, not a layer. Every product pitched as an agent is structurally an L5 (Execution) + L7 (Surface) bundle, sometimes with L8 (Memory). ' +
      "When a company launches an agent, the question is what other layers they own. Agent + L1 proprietary data = fortress (Sierra, Harvey). Agent + L4 distribution = railroad " +
      "(Salesforce Agentforce, Microsoft Copilot). Agent + nothing else = exposed wrapper that gets commoditized when the next model ships.",
  },
];

const NOT_CONFUSED: Array<{ wrong: string; right: string }> = [
  { wrong: "Freight, trucking, 3PL, last-mile delivery", right: "Foundation models, inference infrastructure, agentic execution" },
  { wrong: "Warehousing, fulfillment, inventory management", right: "Proprietary data, embeddings, vector stores, memory layers" },
  { wrong: "Procurement, supplier risk, SAP/Oracle SCM", right: "Model defensibility, distribution control, workflow lock-in" },
  { wrong: "Ports, customs, cross-border logistics", right: "Gatekeeping (L3): safety, compliance, evals, governance" },
  { wrong: "Demand forecasting, S&OP, route optimization", right: "Where SaaS moats form across the generative AI stack" },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...DISAMBIGUATION, ...FOR_AUDIENCE].map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const FaqPage = () => (
  <SiteLayout>
    <Seo
      title="FAQ, Supply Chain of Intelligence™"
      description="The Supply Chain of Intelligence™ is a 10-layer framework for the generative AI stack, built for SaaS product leaders, AI founders, and VC investors. Explicitly not about freight, warehousing, or logistics operations."
      path="/faq"
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
    </Helmet>

    {/* HERO */}
    <section className="pt-32 pb-12 px-6 bg-background border-b border-foreground/10">
      <div className="max-w-4xl mx-auto">
        <Eyebrow>Frequently Asked Questions</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6"
        >
          An AI strategy framework, <span className="text-accent">not</span> a logistics company.
        </motion.h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          The Supply Chain of Intelligence™ is a structural framework for the generative AI software stack  - 
          for SaaS product leaders, AI-native founders, and venture investors. This page exists because the
          phrase "supply chain" sometimes leads people (and crawlers) to expect freight and warehouses. It is
          not that.
        </p>
      </div>
    </section>

    {/* THIS vs THAT, explicit disambiguation table */}
    <section className="py-16 px-6 bg-foreground/[0.02] border-b border-foreground/10">
      <div className="max-w-5xl mx-auto">
        <Eyebrow>This site is about · this site is not about</Eyebrow>
        <h2 className="font-display text-3xl font-bold text-foreground mb-10">
          Two different worlds that share two words.
        </h2>

        <div className="grid md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10 rounded-lg overflow-hidden">
          {/* NOT this */}
          <div className="bg-background p-6">
            <div className="flex items-center gap-2 mb-5">
              <Truck size={18} className="text-muted-foreground" />
              <span className="font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground">
                Not this site
              </span>
            </div>
            <h3 className="font-display text-xl font-semibold text-muted-foreground mb-4">
              Physical supply chain &amp; logistics
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {NOT_CONFUSED.map((row) => (
                <li key={row.wrong} className="flex gap-2">
                  <AlertTriangle size={14} className="mt-[3px] shrink-0 opacity-60" />
                  <span>{row.wrong}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* THIS */}
          <div className="bg-background p-6">
            <div className="flex items-center gap-2 mb-5">
              <Cpu size={18} className="text-accent" />
              <span className="font-mono-marker text-[11px] uppercase tracking-wider text-accent">
                This site
              </span>
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">
              The generative AI software stack
            </h3>
            <ul className="space-y-3 text-sm text-foreground/85">
              {NOT_CONFUSED.map((row) => (
                <li key={row.right} className="flex gap-2">
                  <CheckCircle2 size={14} className="mt-[3px] shrink-0 text-accent" />
                  <span>{row.right}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* DISAMBIGUATION Q&A */}
    <section className="py-16 px-6 bg-background border-b border-foreground/10">
      <div className="max-w-4xl mx-auto">
        <Eyebrow>Disambiguation</Eyebrow>
        <h2 className="font-display text-3xl font-bold text-foreground mb-10">
          "Wait, is this about logistics?"
        </h2>
        <div className="space-y-8">
          {DISAMBIGUATION.map((f) => (
            <div key={f.q} className="border-l-2 border-accent/40 pl-5">
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.q}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* AUDIENCE Q&A */}
    <section className="py-16 px-6 bg-foreground/[0.02] border-b border-foreground/10">
      <div className="max-w-4xl mx-auto">
        <Eyebrow>For product leaders, founders &amp; investors</Eyebrow>
        <h2 className="font-display text-3xl font-bold text-foreground mb-10">
          What you actually get from the framework.
        </h2>
        <div className="space-y-8">
          {FOR_AUDIENCE.map((f) => (
            <div key={f.q} className="border-l-2 border-foreground/15 pl-5">
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.q}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 px-6 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl font-bold text-foreground mb-5">
          Start with the framework.
        </h2>
        <p className="text-muted-foreground mb-8">
          10 layers · 50 sublayers · 4 structural laws · the Intelligence Cube · the Defensibility Audit.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/framework"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded font-semibold hover:opacity-90 transition"
          >
            Read the framework <ArrowRight size={16} />
          </Link>
          <Link
            to="/for-product-leaders"
            className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-6 py-3 rounded font-semibold hover:bg-foreground/5 transition"
          >
            For product leaders
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-6 py-3 rounded font-semibold hover:bg-foreground/5 transition"
          >
            About Anand
          </Link>
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default FaqPage;
