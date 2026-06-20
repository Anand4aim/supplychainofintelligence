import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";

/**
 * /terms, Terms of Use for SupplyChainOfAI.com.
 * Editorial site; light terms covering acceptable use, IP, citations, no warranty.
 */
const Terms = () => (
  <SiteLayout>
    <Seo
      title="Terms of Use | Supply Chain of Intelligence™"
      description="Terms of Use for SupplyChainOfAI.com, acceptable use, intellectual property, citation policy, and no-warranty terms for the 10-layer generative AI stack site (not logistics/freight)."
      path="/terms"
    />

    <section className="max-w-3xl mx-auto px-6 pt-20 pb-24">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mt-4">
        Terms of Use.
      </h1>
      <p className="mt-4 text-foreground/65 text-sm">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>
      <p className="mt-2 text-foreground/65 text-sm">
        Plain English. Read, cite, build on it. Don't impersonate or misuse it.
      </p>

      <div className="mt-10 space-y-8 text-[15.5px] text-foreground/80 leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Acceptance
          </h2>
          <p>
            By accessing SupplyChainOfAI.com (the "Site") you agree to these
            Terms of Use. If you don't agree, please don't use the Site. These
            terms apply alongside our{" "}
            <Link to="/privacy" className="underline underline-offset-4 hover:text-foreground">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/disclaimer" className="underline underline-offset-4 hover:text-foreground">
              Disclaimer
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Editorial purpose
          </h2>
          <p>
            The Site publishes a structural framework, The Supply Chain of
            Intelligence™, and related analysis, case studies, and a live
            feed about the generative AI stack (not logistics or freight).
            Everything here is editorial commentary and strategic analysis. It
            is not investment, legal, tax, or professional advice, and it is
            not a recommendation to buy, sell, or hold any security, token, or
            product.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Intellectual property
          </h2>
          <p className="mb-3">
            The Site's original written content, diagrams, the 10-layer color
            system, and the structure of the framework are © Anand
            Arivukkarasu. <strong className="text-foreground">The Supply
            Chain of Intelligence™</strong> and <strong className="text-foreground">
            The Intelligence Cube™</strong> are trademarks of Anand
            Arivukkarasu.
          </p>
          <p>
            Third-party names, logos, and marks referenced in analysis remain
            the property of their respective owners and are used descriptively
            for editorial commentary, see the{" "}
            <Link to="/disclaimer" className="underline underline-offset-4 hover:text-foreground">
              Disclaimer
            </Link>{" "}
            for the full position.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Permitted use &amp; citation
          </h2>
          <p className="mb-3">
            You may read, quote, and reference the framework in your own work
           , decks, essays, internal memos, talks, research, provided you:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Attribute the source ("Anand Arivukkarasu, Supply Chain of Intelligence™, SupplyChainOfAI.com")</li>
            <li>Don't alter the framework's structure or rename the 10 layers and present it as your own original work</li>
            <li>Don't republish full essays or large verbatim passages without permission</li>
            <li>Don't use the trademarks to imply endorsement, partnership, or affiliation</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Acceptable use
          </h2>
          <p className="mb-3">
            When using the Site, you agree not to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Scrape, mirror, or systematically harvest content for training datasets or competing products without permission</li>
            <li>Attempt to disrupt, overload, or probe the Site's infrastructure or backend</li>
            <li>Impersonate the author or misrepresent the Site's content</li>
            <li>Submit unlawful, defamatory, or abusive content via the newsletter form or any other input</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            No warranty
          </h2>
          <p>
            The Site is provided "as is" and "as available." We make no
            warranties, express or implied, about accuracy, completeness,
            timeliness, fitness for a particular purpose, or non-infringement.
            The market map, case studies, predictions, and live feed reflect
            judgments based on public information at a point in time and may
            be wrong, incomplete, or outdated.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Limitation of liability
          </h2>
          <p>
            To the maximum extent permitted by law, neither Anand Arivukkarasu
            nor the Site shall be liable for any indirect, incidental,
            consequential, or punitive damages arising from your use of the
            Site or reliance on its content, including investment decisions,
            business decisions, or actions taken based on any essay or
            prediction published here.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Third-party links
          </h2>
          <p>
            The Site links to third-party sources, news outlets, company
            sites, arXiv, LinkedIn, and others. We don't control those
            destinations and aren't responsible for their content, policies,
            or availability.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Governing law &amp; changes
          </h2>
          <p>
            These Terms are governed by the laws of the State of California,
            USA, without regard to conflict-of-law principles. We may update
            these Terms as the Site evolves; material changes will be
            reflected in the "last updated" date above. Continued use after
            changes constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Contact
          </h2>
          <p>
            For permissions, citation questions, or anything else, reach out
            via the{" "}
            <Link to="/about" className="underline underline-offset-4 hover:text-foreground">
              About
            </Link>{" "}
            page.
          </p>
        </section>
      </div>
    </section>
  </SiteLayout>
);

export default Terms;
