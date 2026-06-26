import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import { TESTIMONIALS } from "@/data/testimonials";

const SITE = "https://supplychainofai.com";

// Real third-party writers who have publicly discussed the framework.
// Verified via web search; add new entries only when a public URL exists.
const CITED_BY = [
  {
    name: "Sam Israel",
    role: "SaaS, AI & IT Services analyst",
    title: "The 10 Layers of the Supply Chain of Intelligence",
    venue: "LinkedIn",
    url: "https://www.linkedin.com/pulse/7-layers-supply-chain-intelligence-sam-israel-lj3ac",
  },
  {
    name: "Neel Chhabra",
    role: "Writer · Neel's Newsletter",
    title: "The Supply Chain of Intelligence: And the Coherence Problem at Its Heart",
    venue: "Substack · Apr 2026",
    url: "https://neelchhabra.substack.com/p/the-supply-chain-of-intelligence",
  },
  {
    name: "Softlandia",
    role: "AI consultancy",
    title: "AI Juggernauts Are Compressing the Stack — a webinar on the Supply Chain of Intelligence™ framework",
    venue: "Webinar",
    url: "https://softlandia.com/webinars",
  },
];

// Build legitimate Review JSON-LD for each testimonial. Subject = the framework
// (CreativeWork). No AggregateRating — we don't collect numeric ratings, and
// CreativeWork isn't a Google-eligible type for review stars anyway.
const reviewSchemas = TESTIMONIALS.map((t) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "CreativeWork",
    name: "Supply Chain of Intelligence™",
    url: SITE,
    author: { "@type": "Person", name: "Anand Arivukkarasu" },
  },
  author: {
    "@type": "Person",
    name: t.name,
    ...(t.role || t.company
      ? { jobTitle: [t.role, t.company].filter(Boolean).join(", ") }
      : {}),
    ...(t.linkedin ? { sameAs: [t.linkedin] } : {}),
  },
  reviewBody: t.quote,
  publisher: { "@type": "Person", name: "Anand Arivukkarasu" },
}));

const Voices = () => (
  <SiteLayout>
    <Seo
      title="Voices, what operators say about the framework"
      description="Product leaders, founders, and investors on how Supply Chain of Intelligence™, the 10 layers of the generative AI stack, changed how they reason about AI strategy."
      path="/voices"
    />
    <Helmet>
      {reviewSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>


    <section className="bg-background border-b border-foreground/10">
      <div className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 pb-10">
        <Eyebrow tone="accent" className="mb-3">Peer Review · Voices</Eyebrow>
        <h1 className="font-display text-[36px] md:text-[52px] font-bold leading-[1.05] mb-5 text-foreground">
          Operators on the framework.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Supply Chain of Intelligence™ has been pressure-tested in 1:1 strategy sessions, a 25-person product
          leadership workshop, and dozens of conversations with founders, PMs, and investors across FinTech,
          Healthtech, Legal, Media, GovTech, and AI infrastructure. Several venture partners have described it
          as &ldquo;a macroeconomic, industry-defining model&rdquo; once they see the Applications view and the vertical
          maps side by side. These are their reactions.
        </p>

        <p className="text-sm text-foreground/70 mt-5 leading-relaxed">
          Each person below has given permission to be listed. If you see your name and want to edit,
          remove, or sharpen your quote, <a href="mailto:anand@supplychainofai.com" className="text-accent underline underline-offset-2">email Anand</a>.
        </p>
      </div>
    </section>

    <section className="bg-background">
      <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={i}
            className="rounded-xl border border-border bg-card/40 p-6 flex flex-col gap-4"
          >
            <blockquote className="font-display text-[17px] md:text-[18px] leading-[1.55] text-foreground/90">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-auto pt-3 border-t border-border/60 flex items-start justify-between gap-3">
              <div>
                <div className="font-display text-sm font-semibold text-foreground">{t.name}</div>
                <div className="font-mono-marker text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  {[t.role, t.company, t.industry].filter(Boolean).join(" · ")}
                </div>
              </div>
              {t.layerTag && (
                <span
                  className="font-mono-marker text-[10px] tracking-[0.14em] px-2 py-1 rounded border border-accent/40 text-accent whitespace-nowrap"
                >
                  {t.layerTag}
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>

    <section className="bg-card/30 border-t border-foreground/10">
      <div className="max-w-3xl mx-auto px-6 py-14 text-center">
        <Eyebrow tone="muted" className="mb-3">Want to add your voice?</Eyebrow>
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 text-foreground">
          The framework gets sharper when it gets challenged.
        </h2>
        <p className="text-muted-foreground mb-6">
          If you have applied the 10 layers to your own product, roadmap, or investment thesis, share what
          worked, what broke, and which layer definitions felt fuzzy. Counter-cases are especially welcome.
        </p>
        <a
          href="/challenge"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent text-accent-foreground font-mono-marker text-xs tracking-[0.14em] uppercase hover:opacity-90 transition"
        >
          Submit a critique →
        </a>
      </div>
    </section>
  </SiteLayout>
);

export default Voices;
