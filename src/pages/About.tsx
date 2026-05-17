import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { ArrowRight, Linkedin, Mic, Briefcase, Lightbulb, MapPin } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";

const LINKEDIN = "https://www.linkedin.com/in/anandarivu";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anand Arivukkarasu",
  jobTitle: "Product Leader & AI Product Architect",
  url: "https://supplychainofai.com/about",
  description:
    "Ex-Meta (Instagram) product leader. Creator of The Supply Chain of Intelligence — a structural framework for where AI value accrues, where moats form, and which AI products survive the platform era. VP / Head of Product roles at Ideas2IT, Refersion, GRIN. Angel investor and advisor.",
  alumniOf: [
    { "@type": "Organization", name: "Meta (Instagram)" },
    { "@type": "Organization", name: "Vungle" },
  ],
  worksFor: { "@type": "Organization", name: "Ideas2IT" },
  address: { "@type": "PostalAddress", addressLocality: "San Francisco", addressRegion: "CA", addressCountry: "US" },
  sameAs: [LINKEDIN],
};

const ROLES: { era: string; org: string; role: string }[] = [
  { era: "Now", org: "Ideas2IT", role: "VP / Head of Product — AI-first product architecture" },
  { era: "Prior", org: "Refersion", role: "VP, Product Management" },
  { era: "Prior", org: "GRIN", role: "VP, Product Management & Advisor" },
  { era: "2016–2019", org: "Meta (Instagram & Messenger)", role: "Product Growth Leader — Messenger business platform, IG monetization" },
  { era: "Earlier", org: "Vungle · Pinsight Media", role: "Lead Product Manager" },
];

const CRED_CHIPS = [
  { icon: Briefcase, label: "Ex-Meta (Instagram)" },
  { icon: Lightbulb, label: "Angel investor & advisor" },
  { icon: Mic, label: "Product School instructor" },
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
      title="About Anand Arivukkarasu — Author of The Supply Chain of Intelligence"
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
          {/* Portrait placeholder — keeps the monogram identity until a real photo is dropped in */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-[180px] h-[180px] rounded-2xl border-2 border-accent/30 overflow-hidden shrink-0 mx-auto md:mx-0"
            style={{ background: "linear-gradient(145deg, hsl(var(--accent) / 0.12), hsl(var(--accent) / 0.04))" }}
          >
            <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-accent text-6xl tracking-tighter">
              AA
            </div>
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
        <div className="prose prose-lg max-w-none space-y-5 text-foreground/85 text-[17px] leading-[1.85]">
          <p>
            I'm a product architect focused on designing and scaling AI-first products — from 0→1 foundations to the
            growth systems that hold up at scale. I spent a decade shipping product across consumer and B2B SaaS,
            including three years at <strong className="text-foreground">Meta</strong> leading product and growth for
            the Messenger business platform and Instagram monetization surfaces.
          </p>
          <p>
            After Meta I ran product at <strong className="text-foreground">Vungle</strong>,{" "}
            <strong className="text-foreground">Pinsight Media</strong>,{" "}
            <strong className="text-foreground">GRIN</strong>, <strong className="text-foreground">Refersion</strong>,
            and now <strong className="text-foreground">Ideas2IT</strong> — the kind of roadmap work where every
            quarter someone asked <em>"what does AI mean for this surface?"</em> and the honest answer was usually{" "}
            <em>"we don't have a framework that explains it."</em>
          </p>
          <p>
            JTBD told us <strong className="text-foreground">what users want</strong>. It never told us whether a model
            release, a hyperscaler bundle, or a productivity-suite plugin would erase the entire feature six months
            later. After watching Jasper collapse, Chegg lose 99%, Stack Overflow bleed traffic, and Grammarly get
            squeezed by Copilot — all predictable structurally, none predictable by demand alone — I started writing
            this framework down.
          </p>
          <p>
            <strong className="text-foreground">The Supply Chain of Intelligence</strong> is that framework. Ten
            layers, fifty sublayers, three structural laws, one diagnostic cube. It is opinionated, it is portable
            across categories, and it is free.
          </p>
          <p>
            I write it for the audience I wish had it when I was building: founders, product leaders, boards, and
            investors who need to decide <em>"is this layer ours, or are we renting it from someone bigger?"</em>{" "}
            before they commit a roadmap or a check.
          </p>
        </div>
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

    {/* CTA STRIP */}
    <section className="bg-foreground text-background">
      <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
        <div>
          <p className="font-mono-marker text-[11px] md:text-[12px] font-bold uppercase tracking-[0.18em] text-accent mb-2">— Work with the framework</p>
          <h3 className="font-display text-xl md:text-2xl font-bold leading-snug">
            Diagnose your stack. Stress-test a portfolio. Sharpen a roadmap.
          </h3>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener"
            className="bg-accent text-background font-sketch font-bold px-5 py-2.5 rounded-md inline-flex items-center gap-2 hover:bg-accent/90 transition-colors"
          >
            <Linkedin size={14} /> Reach out
          </a>
          <Link
            to="/for-product-leaders"
            className="border border-background/30 font-sketch font-bold px-5 py-2.5 rounded-md inline-flex items-center gap-2 hover:bg-background/10 transition-colors"
          >
            For product leaders <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default AboutPage;
