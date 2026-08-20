import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";

/**
 * /disclaimer, editorial-use disclaimer linked from the site footer.
 * Single source of truth for the trademark + sourcing + lens-not-verdict language.
 */
const Disclaimer = () => (
  <SiteLayout>
    <Seo
      title="Disclaimer, Editorial Use & Trademarks"
      description="Editorial-use disclaimer for Supply Chain of Intelligence™, descriptive trademark use, public-source reporting, and lens-not-verdict policy across the 10-layer generative AI stack (not logistics/freight)."
      path="/disclaimer"
    />

    <section className="max-w-3xl mx-auto px-6 pt-20 pb-24">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mt-4">
        Disclaimer.
      </h1>
      <p className="mt-4 text-foreground/65 text-sm">
        Editorial use. Public sources. A lens, not a verdict.
      </p>

      <div className="mt-10 space-y-6 text-[15.5px] text-foreground/80 leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            About this site
          </h2>
          <p>
            Written by <strong className="text-foreground">Anand Arivukkarasu</strong> as
            personal thinking, shared freely. Views are my own. Roles and background are on the{" "}
            <Link to="/about" className="text-accent hover:underline">About</Link> page.
          </p>
        </section>


        <section>


          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Trademarks &amp; descriptive use
          </h2>
          <p>
            All company, product, and service names referenced on this site  - 
            including but not limited to those in case studies, the news feed,
            the market map, and the Board, are used{" "}
            <strong className="text-foreground">descriptively, for editorial
            analysis</strong>, and remain the trademarks of their respective
            owners. Their inclusion does not imply endorsement, affiliation,
            partnership, or sponsorship in either direction.
          </p>
          <p className="mt-3">
            <em>Supply Chain of Intelligence™</em> and{" "}
            <em>The Intelligence Cube™</em> are trademarks of Anand
            Arivukkarasu. Other headings used within the analysis, for
            example, "The Chess Board of Intelligence", are{" "}
            <strong className="text-foreground">descriptive editorial
            framings</strong> and are not claimed as trademarks.
          </p>
          <p className="mt-3">
            You're welcome to cite, teach, and build on the framework with
            attribution to <strong className="text-foreground">Anand
            Arivukkarasu</strong> and a link to{" "}
            <a href="https://supplychainofai.com" className="text-accent hover:underline">
              supplychainofai.com
            </a>. No permission needed.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Sourcing &amp; accuracy
          </h2>
          <p>
            Every company reference, figure, and quote on this site is drawn
            from <strong className="text-foreground">publicly reported
            information</strong>, press, earnings releases, primary
            documents, regulatory filings, official company blogs, and
            news sources, and is treated as a journalistic / blog
            source. Where possible, sources are linked inline.
          </p>
          <p className="mt-3">
            Figures (valuations, ARR, headcount, funding, headcount changes)
            are reported as of the cited date and may change. We are not
            responsible for the accuracy of third-party reporting, nor for
            the real-world business outcomes, financings, hiring, layoffs, or
            operating decisions of any company named. Corrections are
            welcome and will be applied promptly.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            A lens, not a verdict
          </h2>
          <p>
            This site is not ranking companies as "good" or "bad," "winners"
            or "losers." It is a{" "}
            <strong className="text-foreground">structural lens</strong> that
            identifies <em>layer exposure</em>, which of the 10 layers (the
            10 squares on the Chess Board of Intelligence) a company is
            sitting on. Where the lens names risk, the company itself
            decides what to do about it. Every prediction on this site
            carries a <strong className="text-foreground">counter-move</strong>{" "}
            field for exactly that reason, the framework is directional, not
            deterministic.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            No investment, legal, or business advice
          </h2>
          <p>
            Nothing on this site constitutes investment, legal, tax, or
            business advice. Readers should not make decisions about
            buying, selling, holding, building, or investing in any
            company or product based on the analysis here without
            consulting qualified professionals and conducting their own
            independent due diligence.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Forward-looking statements
          </h2>
          <p>
            Calls and predictions on this site are forward-looking
            structural reads. They may turn out to be wrong. When they do,
            they are marked wrong on the{" "}
            <Link to="/predictions" className="text-accent hover:underline">
              Board
            </Link>{" "}
            page rather than deleted. That public record, including
            structural / timing scoring and counter-moves, is the
            framework's accountability.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Contact &amp; corrections
          </h2>
          <p>
            For corrections, takedown requests, or trademark concerns,
            please reach out via{" "}
            <a
              href="https://www.linkedin.com/in/anandarivu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              LinkedIn
            </a>
            . We respond quickly and in good faith.
          </p>
        </section>

        <p className="text-[12px] text-foreground/50 italic pt-6 border-t border-foreground/10">
          Last updated: May 2026. This disclaimer applies to all pages on
          supplychainofai.com.
        </p>
      </div>
    </section>
  </SiteLayout>
);

export default Disclaimer;
