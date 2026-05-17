import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { CASE_STUDIES } from "@/data/caseStudies";
import DepthModules from "@/components/live/DepthModules";
import WhatThisMeans from "@/components/WhatThisMeans";
import ArticleFooterCTA from "@/components/ArticleFooterCTA";
import { ArrowLeft, ArrowRight, TrendingDown, TrendingUp, Minus, ExternalLink } from "lucide-react";

const SITE = "https://supplychainofai.com";

const renderMarkdown = (text: string) => {
  // ultra-minimal markdown: paragraphs + **bold** + *italics*
  return text.split(/\n\n+/).map((para, i) => {
    const html = para
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="text-muted-foreground">$1</em>')
      .replace(/\n- /g, "<br/>• ")
      .replace(/\n/g, " ");
    return (
      <p
        key={i}
        className="text-foreground/85 leading-[1.8] mb-5 text-[17px]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  });
};

const CaseStudyDetailPage = () => {
  const { slug } = useParams();
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) return <Navigate to="/analysis" replace />;

  const TrendIcon =
    study.valuation?.trend === "down"
      ? TrendingDown
      : study.valuation?.trend === "up"
      ? TrendingUp
      : Minus;
  const trendColor =
    study.valuation?.trend === "down"
      ? "text-verdict-exposed"
      : study.valuation?.trend === "up"
      ? "text-verdict-fortified"
      : "text-muted-foreground";

  const url = `${SITE}/analysis/${study.slug}`;
  const description = study.excerpt.replace(/\s+/g, " ").slice(0, 200);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description,
    author: { "@type": "Person", name: "Anand Arivukkarasu", url: SITE },
    publisher: { "@type": "Person", name: "Anand Arivukkarasu" },
    datePublished: study.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    about: study.companies.map((c) => ({ "@type": "Organization", name: c.name })),
    keywords: ["AI defensibility", "Supply Chain of Intelligence", ...study.companies.map((c) => c.name)].join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE}/analysis` },
      { "@type": "ListItem", position: 3, name: study.title, item: url },
    ],
  };

  // Next study link
  const idx = CASE_STUDIES.findIndex((s) => s.slug === study.slug);
  const next = CASE_STUDIES[(idx + 1) % CASE_STUDIES.length];

  return (
    <SiteLayout>
      <Seo title={`${study.title} — Case Study by Anand Arivukkarasu`} description={description} path={`/analysis/${study.slug}`} article />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <meta property="og:type" content="article" />
        <meta property="article:author" content="Anand Arivukkarasu" />
      </Helmet>

      <article className="bg-background">
        <div className="max-w-3xl mx-auto px-6 pt-20 pb-10">
          <Link
            to="/analysis"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent mb-8"
          >
            <ArrowLeft size={14} /> All case studies
          </Link>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-sketch text-sm font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
                {study.tag}
              </span>
              <span className="text-sm text-muted-foreground">{study.date}</span>
              <span className="text-sm text-muted-foreground">· {study.readTime}</span>
            </div>

            <h1 className="font-display text-3xl md:text-[40px] font-bold text-foreground leading-[1.15] mb-6">
              {study.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              {study.companies.map((c) => (
                <div key={c.name} className="flex items-center gap-2">
                  <img
                    src={c.logo}
                    alt={`${c.name} logo`}
                    className="w-7 h-7 rounded-md object-contain bg-white p-0.5 border border-border"
                    onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                  />
                  <span className="text-sm font-semibold text-foreground">{c.name}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-10 pb-8 border-b border-border">
              <div className="flex gap-1.5">
                {study.layers.map((l) => {
                  const n = parseInt(l.replace("L", ""));
                  return (
                    <span
                      key={l}
                      className="font-sketch text-sm font-bold px-2.5 py-1 rounded-md"
                      style={{ color: `hsl(var(--layer-${n}))`, background: `hsl(var(--layer-${n}-bg))` }}
                    >
                      {l}
                    </span>
                  );
                })}
              </div>
              <span
                className={`font-sketch text-sm font-bold uppercase ${
                  study.valuation?.trend === "down" ? "text-verdict-exposed" : "text-verdict-fortified"
                }`}
              >
                Verdict: {study.verdict}
              </span>
            </div>

            {study.valuation && (
              <div className="bg-secondary border border-border rounded-xl p-5 mb-10 sketch-border">
                <p className="font-sketch text-sm font-bold text-muted-foreground mb-3">
                  {study.valuation.label}
                </p>
                <div className="flex flex-wrap items-baseline gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Peak</p>
                    <p className="font-display text-xl font-bold text-foreground">{study.valuation.before}</p>
                  </div>
                  <ArrowRight size={18} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Now</p>
                    <p className="font-display text-xl font-bold text-foreground">{study.valuation.after}</p>
                  </div>
                  <div className={`flex items-center gap-1 ml-2 ${trendColor}`}>
                    <TrendIcon size={16} />
                    <span className="font-sketch text-sm font-bold">{study.valuation.changeLabel}</span>
                  </div>
                </div>
              </div>
            )}

            <DepthModules
              layer_scores={study.layer_scores}
              fallback_layers={study.layers}
              cube_position={study.cube_position}
              timeline={study.timeline}
              who_wins={study.who_wins}
              who_loses={study.who_loses}
              counter_thesis={study.counter_thesis}
            />

            <div className="prose prose-lg max-w-none">{renderMarkdown(study.content)}</div>

            <WhatThisMeans
              for_you={study.for_you}
              fallback={{ verdict: study.verdict, layers: study.layers }}
            />

            {study.sources && study.sources.length > 0 && (
              <section className="mt-10">
                <p className="font-sketch text-base font-bold text-accent mb-3">— Sources</p>
                <ul className="space-y-1.5">
                  {study.sources.map((s, i) => (
                    <li key={i}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-start gap-1.5 text-[13px] text-foreground/75 hover:text-accent break-all"
                      >
                        <ExternalLink size={11} className="mt-1 shrink-0" />
                        {s.outlet ? <span className="font-semibold text-foreground">{s.outlet}</span> : null}
                        <span className="text-muted-foreground">{s.url}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Author block */}
            <div className="mt-14 pt-8 border-t border-border flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center font-display font-bold text-accent text-lg shrink-0">
                AA
              </div>
              <div>
                <p className="font-display font-bold text-foreground">Anand Arivukkarasu</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ex-Meta product leader. Creator of The Supply Chain of Intelligence™. Writes about where AI value
                  accrues — and who can fire your product.{" "}
                  <a
                    href="https://www.linkedin.com/in/anandarivu"
                    target="_blank"
                    rel="noopener"
                    className="text-accent hover:underline"
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </div>


            {/* Author + CTAs */}
            <ArticleFooterCTA
              source={`case-study:${study.slug}`}
              shareUrl={url}
              shareText={study.pull_quote ?? study.verdict}
            />

            <div className="mt-10 pt-8 border-t border-border flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center font-display font-bold text-accent text-lg shrink-0">
                AA
              </div>
              <div>
                <p className="font-display font-bold text-foreground">Anand Arivukkarasu</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ex-Meta product leader. Creator of The Supply Chain of Intelligence™. Writes about where AI value
                  accrues — and who can fire your product.{" "}
                  <a
                    href="https://www.linkedin.com/in/anandarivu"
                    target="_blank"
                    rel="noopener"
                    className="text-accent hover:underline"
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </div>

            {/* Next */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="font-sketch text-sm text-muted-foreground mb-2">Read next</p>
              <Link
                to={`/analysis/${next.slug}`}
                className="font-display text-lg font-bold text-foreground hover:text-accent inline-flex items-center gap-2"
              >
                {next.title} <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </article>
    </SiteLayout>
  );
};

export default CaseStudyDetailPage;
