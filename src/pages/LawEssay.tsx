import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import { SketchBoard } from "@/components/sketch/SketchElements";
import { LAW_ESSAYS, LAW_ESSAY_BY_SLUG } from "@/data/lawEssays";
import { PRECEDENTS_BY_LAW } from "@/data/lawPrecedents";

const renderInline = (text: string) => {
  // Render **bold** chunks within a paragraph.
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="text-foreground font-semibold">
        {p.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
};

const LawEssayPage = () => {
  const { slug } = useParams();
  const essay = slug ? LAW_ESSAY_BY_SLUG[slug] : undefined;

  if (!essay) {
    return <Navigate to="/" replace />;
  }

  const idx = LAW_ESSAYS.findIndex((e) => e.slug === essay.slug);
  const prev = idx > 0 ? LAW_ESSAYS[idx - 1] : null;
  const next = idx < LAW_ESSAYS.length - 1 ? LAW_ESSAYS[idx + 1] : null;

  return (
    <SiteLayout>
      <Seo
        title={`${essay.shortTitle} | Supply Chain of Intelligence™`}
        description={essay.description}
        path={`/laws/${essay.slug}`}
        article
      />

      <article className="bg-background">
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-10 md:pt-24">
          <Link
            to="/#three-laws"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to the Four Laws
          </Link>

          <Eyebrow tone="accent" className="mb-3">
            Structural Law · Essay {essay.num} of III
          </Eyebrow>

          <h1 className="font-display text-[34px] md:text-[46px] font-bold text-foreground leading-[1.1] mb-4">
            Law {essay.num} — {essay.title}
          </h1>

          <p className="font-display text-lg md:text-xl text-accent italic leading-snug mb-8 border-l-2 border-accent/60 pl-4">
            {essay.oneLine}
          </p>

          <p className="text-sm text-muted-foreground mb-10">
            By <strong className="text-foreground">Anand Arivukkarasu</strong> · Creator of The Supply Chain of Intelligence™
          </p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose-essay space-y-6"
          >
            {essay.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[17px] md:text-[18px] leading-[1.75] text-foreground/85"
              >
                {renderInline(p)}
              </p>
            ))}
          </motion.div>

          {/* Sources & Precedents */}
          {PRECEDENTS_BY_LAW[essay.slug]?.length ? (
            <div className="mt-14 border-t border-border pt-10">
              <div className="font-mono-marker text-[10px] tracking-[0.22em] text-accent uppercase mb-2">
                SOURCES & PRECEDENTS
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                This law echoes earlier strategy thinking.
              </h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
                Law {essay.num} is a synthesis, not a one-person invention. It restates and specializes prior strategy work for the AI stack era.
              </p>
              <ol className="space-y-4">
                {PRECEDENTS_BY_LAW[essay.slug].map((p, i) => (
                  <li key={i} className="border-l-2 border-accent/40 pl-4">
                    <div className="font-display font-semibold text-foreground">
                      {p.thinker} <span className="font-normal text-muted-foreground">— {p.work}{p.year ? ` (${p.year})` : ""}</span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed mt-1">{p.echo}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-xs text-muted-foreground">
                Have a better precedent or a counter-case? <a href="/challenge" className="text-accent underline underline-offset-2">Submit it →</a>
              </p>
            </div>
          ) : null}

          {/* Footer / nav between essays */}
          <div className="mt-16 pt-8 border-t border-border">
            <SketchBoard className="p-5 md:p-6 mb-8">
              <p className="font-mono-marker text-[10px] tracking-[0.2em] text-muted-foreground mb-2">
                THE FOUR STRUCTURAL LAWS
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Law I predicts who gets absorbed. Law II predicts where value migrates.
                Law III predicts who survives the platform era. Together they form the
                predictive engine of the Supply Chain of Intelligence™.
              </p>
            </SketchBoard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {prev ? (
                <Link
                  to={`/laws/${prev.slug}`}
                  className="group flex items-start gap-3 p-4 rounded-lg border border-border hover:border-accent/60 transition-colors"
                >
                  <ArrowLeft size={16} className="mt-1 text-muted-foreground group-hover:text-accent transition-colors" />
                  <div>
                    <div className="font-mono-marker text-[10px] tracking-[0.18em] text-muted-foreground mb-0.5">
                      PREVIOUS LAW
                    </div>
                    <div className="font-display text-sm font-semibold text-foreground leading-tight">
                      Law {prev.num} — {prev.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  to={`/laws/${next.slug}`}
                  className="group flex items-start gap-3 p-4 rounded-lg border border-border hover:border-accent/60 transition-colors text-right md:flex-row-reverse"
                >
                  <ArrowRight size={16} className="mt-1 text-muted-foreground group-hover:text-accent transition-colors" />
                  <div>
                    <div className="font-mono-marker text-[10px] tracking-[0.18em] text-muted-foreground mb-0.5">
                      NEXT LAW
                    </div>
                    <div className="font-display text-sm font-semibold text-foreground leading-tight">
                      Law {next.num} — {next.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/framework"
                className="inline-flex items-center gap-2 text-sm text-accent font-semibold hover:gap-3 transition-all"
              >
                Read the full framework <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
};

export default LawEssayPage;
