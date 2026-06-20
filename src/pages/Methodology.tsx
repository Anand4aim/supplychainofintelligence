import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import FreshnessBadge from "@/components/FreshnessBadge";
import CanonicalDefinition from "@/components/CanonicalDefinition";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="border-t border-foreground/10 pt-8 mt-8">
    <h2 className="font-display text-2xl font-bold text-foreground mb-3">{title}</h2>
    <div className="prose prose-neutral max-w-none text-foreground/85 leading-relaxed text-[15px] space-y-4">
      {children}
    </div>
  </section>
);

const Methodology = () => (
  <SiteLayout>
    <Seo
      title="Methodology, Two Registers, Monthly Cadence"
      description="How Supply Chain of Intelligence™ stays current: evergreen framework (the 10 layers) vs living market readings (placements, verdicts, predictions) re-reviewed monthly."
      path="/methodology"
    />
    <section className="bg-background border-b border-foreground/10">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <Eyebrow>Editorial Contract</Eyebrow>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-[1.05] mt-3 mb-4">
          Two registers, one cadence.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The framework doesn't move. The placements do. This page is the contract
          between what is evergreen and what is living, so readers always know
          which kind of claim they're reading.
        </p>
        <div className="mt-6">
          <FreshnessBadge asOf="Jun 2026" hideLink />
        </div>
      </div>
    </section>

    <section className="bg-background">
      <div className="max-w-3xl mx-auto px-6 pb-20 pt-10">
        <div className="mb-10">
          <CanonicalDefinition variant="full" />
          <p className="text-xs text-muted-foreground mt-3">
            The three registers below, Evergreen, Living, Cadence, are how
            this site keeps the definition stable while the readings stay fresh.
          </p>
        </div>

        <Section title="1. Evergreen, the framework">
          <p>
            The <strong>10 layers</strong>, the <strong>50 sublayers</strong>,
            the <strong>4 Laws of Defensibility</strong>,
            the <strong>Intelligence Cube</strong>,
            the <strong>6 Archetypes</strong>, the <strong>Gold Mining Analogy</strong>,
            and the <Link to="/paper" className="text-accent hover:underline">canonical Paper</Link>{" "}
            are <strong>evergreen</strong>. They are the periodic table of the
            generative AI stack. Dating them would weaken their authority, so
            they carry no timestamps.
          </p>
          <p>
            If the framework itself ever changes, that is a versioned Paper bump
            recorded on the <Link to="/changelog" className="text-accent hover:underline">/changelog</Link>{" "}
           , not a quiet edit.
          </p>
        </Section>

        <Section title="2. Living, readings of the market">
          <p>
            The <strong>Market Map</strong>, the <strong>Vertical Maps</strong>,{" "}
            <strong>Teardowns</strong>, <strong>Predictions</strong>, and{" "}
            <strong>Verdicts</strong> are <strong>readings</strong>, applications of the
            framework to a market that moves every week. Every one of these
            surfaces carries an <FreshnessBadge asOf="Jun 2026" hideLink className="!inline-flex" /> badge
            and is re-reviewed on a fixed cadence.
          </p>
          <p>
            A company's archetype, layer placement, or verdict can flip between
            re-reviews. That is a feature, not a bug. AI-native companies move
            faster than annual reports can track; pretending otherwise is the
            real intellectual dishonesty.
          </p>
        </Section>

        <Section title="3. The cadence">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>1st of every month</strong>, re-review pass across all Market Maps,
              Vertical Maps, and Predictions. Verdicts get moved, dead companies
              get retired, freshness stamps get bumped.
            </li>
            <li>
              <strong>Weekly</strong>, at least one new Teardown.
            </li>
            <li>
              <strong>Quarterly</strong>, the Paper is reviewed; bumped only if the
              <em> framework</em> changed, not if examples did.
            </li>
            <li>
              <strong>On-demand</strong>, when a major event happens (a model release, a
              regulatory move, a notable failure), the relevant Maps and
              Predictions get an out-of-cycle re-review the same week.
            </li>
          </ul>
        </Section>

        <Section title="4. How to read the badges">
          <p>
            A <FreshnessBadge asOf="Jun 2026" hideLink className="!inline-flex" /> badge means
            the page is a living reading and was reviewed in the month shown. If
            you ever see a living surface without one, that is a bug, please
            flag it.
          </p>
          <p>
            Framework pages (the Paper, the layer deep-dives, the Laws, the
            Cube) deliberately have <strong>no</strong> freshness badge. They are
            evergreen by contract.
          </p>
        </Section>

        <Section title="5. Why this matters">
          <p>
            The most common criticism of any AI map is that it's already stale
            by the time it's read. The answer isn't to publish less often, it's
            to be explicit about which claims are structural (the framework) and
            which are situational (the placements), then re-review the
            situational ones on a public cadence.
          </p>
          <p>
            That is the editorial contract of this site. The full revision log
            lives on <Link to="/changelog" className="text-accent hover:underline">/changelog</Link>.
          </p>
        </Section>
      </div>
    </section>
  </SiteLayout>
);

export default Methodology;
