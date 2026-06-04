import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";

/**
 * /privacy — Privacy policy covering cookies, data collection, and third-party analytics.
 */
const Privacy = () => (
  <SiteLayout>
    <Seo
      title="Privacy Policy | Supply Chain of Intelligence™"
      description="How SupplyChainOfAI.com handles cookies, personal data, newsletter signups, and third-party analytics for the 10-layer generative AI stack site (not logistics/freight)."
      path="/privacy"
    />

    <section className="max-w-3xl mx-auto px-6 pt-20 pb-24">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mt-4">
        Privacy Policy.
      </h1>
      <p className="mt-4 text-foreground/65 text-sm">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>
      <p className="mt-2 text-foreground/65 text-sm">
        Plain English. What we collect, why, and what we don't.
      </p>

      <div className="mt-10 space-y-8 text-[15.5px] text-foreground/80 leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Who runs this site
          </h2>
          <p>
            SupplyChainOfAI.com is an independent editorial project published by
            Anand Arivukkarasu. There is no corporate entity behind it, no
            advertising network, and no data brokerage. The site exists to
            publish the 10-layer framework and related analysis.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            What we collect
          </h2>
          <p className="mb-3">
            We try to collect as little as possible. In practice, three buckets:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-foreground">Newsletter signups.</strong>{" "}
              If you submit your email to the newsletter form, we store your
              email address and the source page in our backend so we can send
              you the newsletter. You can unsubscribe at any time.
            </li>
            <li>
              <strong className="text-foreground">Anonymous analytics.</strong>{" "}
              Standard web analytics — page views, referrer, country-level
              location, device type, approximate session duration. No names,
              no precise location, no cross-site tracking profile.
            </li>
            <li>
              <strong className="text-foreground">Server logs.</strong>{" "}
              Like any website, our hosting provider records request metadata
              (IP, timestamp, user agent) for security and abuse prevention.
              These are retained briefly and not used for profiling.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Cookies
          </h2>
          <p>
            The site uses a small number of cookies and similar browser storage,
            limited to what's needed to make the site work and to measure
            aggregate traffic. We do not use advertising cookies, retargeting
            pixels, or cross-site tracking cookies. Your browser settings let
            you block or clear cookies at any time; the site will continue to
            work with cookies disabled, you just won't be counted in analytics.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Third-party services
          </h2>
          <p className="mb-3">
            A small number of third parties process data on our behalf or are
            embedded in the site:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-foreground">Hosting &amp; backend.</strong>{" "}
              A managed cloud backend handles the newsletter database and edge
              functions.
            </li>
            <li>
              <strong className="text-foreground">Analytics.</strong>{" "}
              Privacy-respecting web analytics to count visits and understand
              which essays land. No personally identifying profile is built.
            </li>
            <li>
              <strong className="text-foreground">Embeds.</strong>{" "}
              Outbound links to LinkedIn, news sources, arXiv, company sites,
              and similar — those destinations have their own privacy policies
              once you click through.
            </li>
          </ul>
          <p className="mt-3">
            We do not sell, rent, or share your personal data with advertisers
            or data brokers.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Your rights
          </h2>
          <p>
            You can ask us to access, correct, or delete any personal data we
            hold about you (in practice, this means your newsletter email).
            Email the address on the{" "}
            <Link to="/about" className="underline underline-offset-4 hover:text-foreground">
              About
            </Link>{" "}
            page or unsubscribe directly via any newsletter footer. If you're in
            the EU/UK, this includes the rights afforded under GDPR/UK GDPR;
            if you're in California, the analogous CCPA/CPRA rights apply.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Children
          </h2>
          <p>
            The site is written for an adult professional audience — product
            leaders, founders, investors, researchers — and is not directed at
            children under 13. We do not knowingly collect data from children.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Changes &amp; contact
          </h2>
          <p>
            We may update this policy as the site evolves; material changes
            will be reflected in the "last updated" date above. For editorial,
            trademark, and sourcing questions, see the{" "}
            <Link to="/disclaimer" className="underline underline-offset-4 hover:text-foreground">
              Disclaimer
            </Link>
            . For privacy questions specifically, contact us via the{" "}
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

export default Privacy;
