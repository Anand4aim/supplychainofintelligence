import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { ArrowRight } from "lucide-react";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anand Arivukkarasu",
  jobTitle: "Product Leader, AI Strategist",
  url: "https://supplychainofai.com/about",
  description:
    "Ex-Meta product leader. Creator of The Supply Chain of Intelligence™ — a structural framework for where AI value accrues, where moats form, and which AI products survive the platform era.",
  alumniOf: [{ "@type": "Organization", name: "Meta" }],
  sameAs: ["https://www.linkedin.com/in/anandarivu"],
};

const AboutPage = () => (
  <SiteLayout>
    <Seo
      title="About Anand Arivukkarasu — Author of The Supply Chain of Intelligence™"
      description="Ex-Meta product leader. Built the framework after watching a decade of SaaS roadmaps die not from bad features but from bad layer positioning."
      path="/about"
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </Helmet>

    <section className="bg-background">
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="font-sketch text-lg font-bold text-accent mb-4">— About</p>

        <div className="flex items-start gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center font-display font-bold text-accent text-3xl shrink-0">
            AA
          </div>
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
              Anand Arivukkarasu
            </h1>
            <p className="font-sketch text-base text-muted-foreground">
              Ex-Meta Product Leader · Creator of The Supply Chain of Intelligence™
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none space-y-5 text-foreground/85 text-[17px] leading-[1.8]">
          <p>
            I spent the last decade shipping product at Meta and across consumer + B2B SaaS — the kind of
            roadmap work where every quarter someone asked "what does AI mean for this surface?" and the
            honest answer was usually "we don't have a framework that explains it."
          </p>
          <p>
            JTBD told us <strong className="text-foreground">what users want</strong>. It never told us
            whether a model release, a hyperscaler bundle, or a productivity-suite plugin would erase the
            entire feature six months later. After watching Jasper collapse, Chegg lose 99%, Stack Overflow
            bleed traffic, and Grammarly get squeezed by Copilot — all predictable structurally, none
            predictable by demand alone — I started writing this framework down.
          </p>
          <p>
            <strong className="text-foreground">The Supply Chain of Intelligence™</strong> is that
            framework. Ten layers, fifty sublayers, three structural laws, one diagnostic cube. It is
            opinionated, it is portable across categories, and it is free.
          </p>
          <p>
            I write it for the audience I wish had it when I was building: founders, product leaders,
            boards, and investors who need to decide{" "}
            <em>"is this layer ours, or are we renting it from someone bigger?"</em> before they commit a
            roadmap or a check.
          </p>
        </div>

        <div className="mt-10 pt-8 border-t border-border">
          <p className="font-sketch text-sm font-bold text-muted-foreground mb-3">Elsewhere</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.linkedin.com/in/anandarivu"
              target="_blank"
              rel="noopener"
              className="btn-sketch-outline"
            >
              LinkedIn
            </a>
            <Link to="/framework" className="btn-sketch inline-flex items-center gap-2">
              Read the Framework <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default AboutPage;
