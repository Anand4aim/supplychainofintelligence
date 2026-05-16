import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { Check, ArrowRight } from "lucide-react";

const OFFERS = [
  {
    name: "Portfolio Audit",
    audience: "For VC / PE / corp-dev teams",
    summary:
      "Score every AI investment in your portfolio across the 10 layers. Identify the wrappers, the contested middles, and the fortresses — before the next markdown cycle does it for you.",
    deliverable: "Layer-by-layer scorecard + 1-page memo per company + thesis-level pattern read",
    timeline: "2 weeks",
    bullets: [
      "Up to 20 companies in one engagement",
      "The Intelligence Cube™ applied to each",
      "Verdict: defend / deepen / exit",
    ],
    cta: "Request scoping call",
  },
  {
    name: "Defensibility Workshop",
    audience: "For SaaS exec teams",
    summary:
      "A 2-day on-site (or remote) workshop that runs your product, your roadmap, and your top 3 competitors through the framework. Output: a layer-ownership map and a defensibility roadmap your team actually owns.",
    deliverable: "Layer map + competitor overlay + 90-day defensibility roadmap",
    timeline: "2 days on-site + 2 weeks follow-up",
    bullets: [
      "Run with PMs, eng leads, and the CEO",
      "Includes the Defensible Triangle exercise",
      "Output the team will actually ship against",
    ],
    cta: "Book a workshop",
  },
  {
    name: "Advisory Retainer",
    audience: "For founders + product leaders",
    summary:
      "Monthly retainer. I become the structural sanity-check on every major roadmap, pricing, and platform-risk decision. Useful when you're shipping into a category where the platform layer is moving every quarter.",
    deliverable: "Monthly working session + async review of artifacts + on-call for board prep",
    timeline: "3-month minimum",
    bullets: [
      "1× 90-minute working session per month",
      "Async review of strategy docs",
      "Board-deck pressure-test included",
    ],
    cta: "Start a conversation",
  },
];

const WorkWithMePage = () => (
  <SiteLayout>
    <Seo
      title="Work With Me — Defensibility Audits, Workshops & Advisory"
      description="Three ways to apply The Supply Chain of Intelligence™ to your product, your roadmap, or your portfolio. Built for founders, product leaders, and investors."
      path="/work-with-me"
    />

    <section className="bg-background">
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
        <p className="font-sketch text-lg font-bold text-accent mb-4">— Engagements</p>
        <h1 className="font-display text-3xl md:text-[42px] font-bold text-foreground leading-[1.1] mb-5">
          Three ways to apply the framework
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Want the framework run on your product, your portfolio, or your team? Pick the shape that fits.
        </p>
      </div>
    </section>

    <section className="bg-secondary/30 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OFFERS.map((o) => (
            <div
              key={o.name}
              className="bg-card border border-border rounded-2xl p-6 sketch-border flex flex-col"
            >
              <p className="font-sketch text-sm font-bold text-accent mb-1">{o.audience}</p>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">{o.name}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{o.summary}</p>

              <div className="space-y-2 mb-5">
                {o.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2 text-sm text-foreground/85">
                    <Check size={14} className="text-accent shrink-0 mt-1" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-border space-y-2">
                <p className="text-xs text-muted-foreground">
                  <span className="font-sketch font-bold text-foreground/80">Deliverable:</span>{" "}
                  {o.deliverable}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-sketch font-bold text-foreground/80">Timeline:</span> {o.timeline}
                </p>
                <a
                  href={`mailto:anand@supplychainofai.com?subject=${encodeURIComponent(
                    o.name + " — inquiry"
                  )}`}
                  className="btn-sketch w-full justify-center inline-flex items-center gap-2 mt-3"
                >
                  {o.cta} <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Or just email{" "}
          <a href="mailto:anand@supplychainofai.com" className="text-accent hover:underline">
            anand@supplychainofai.com
          </a>{" "}
          and tell me what you're trying to figure out.
        </p>
      </div>
    </section>
  </SiteLayout>
);

export default WorkWithMePage;
