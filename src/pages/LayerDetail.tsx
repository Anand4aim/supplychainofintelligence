import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { LAYERS } from "@/data/layers";
import { CASE_STUDIES } from "@/data/caseStudies";
import { DIAGNOSTIC_BY_LAYER } from "@/data/layerDiagnostics";
import { SketchIcon } from "@/components/sketch/SketchIcons";
import { ArrowLeft, ArrowRight, Star, Check, X as XIcon } from "lucide-react";
import GlossaryText from "@/components/GlossaryText";

const slugFor = (id: string) => {
  const layer = LAYERS.find((l) => l.id === id);
  return `${id.toLowerCase()}-${layer?.shortName.toLowerCase().replace(/\s+/g, "-")}`;
};

const LayerDetailPage = () => {
  const { layerId } = useParams();
  const layer = LAYERS.find(
    (l) => slugFor(l.id) === layerId || l.id.toLowerCase() === layerId
  );
  if (!layer) return <Navigate to="/framework" replace />;

  const idx = LAYERS.findIndex((l) => l.id === layer.id);
  const prev = idx > 0 ? LAYERS[idx - 1] : null;
  const next = idx < LAYERS.length - 1 ? LAYERS[idx + 1] : null;

  const relevantStudies = CASE_STUDIES.filter((s) => s.layers.includes(layer.id)).slice(0, 4);
  const diag = DIAGNOSTIC_BY_LAYER[layer.id];

  const slug = slugFor(layer.id);
  const layerUrl = `https://supplychainofai.com/framework/${slug}`;
  const definedTerm = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `${layerUrl}#term`,
    termCode: layer.id,
    name: `${layer.id} ${layer.name}`,
    alternateName: [`Layer ${layer.id}`, `${layer.id}, ${layer.shortName}`],
    description: `${layer.desc} ${layer.detail}`,
    url: layerUrl,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      "@id": "https://supplychainofai.com/#framework",
      name: "Supply Chain of Intelligence™, 10 Layers of the Generative AI Stack",
      url: "https://supplychainofai.com/framework",
      numberOfItems: 10,
    },
    hasPart: layer.sublayers.map((s) => ({
      "@type": "DefinedTerm",
      termCode: s.id,
      name: `${s.id} ${s.name}`,
      description: s.desc,
      url: `${layerUrl}#${s.id.toLowerCase()}`,
      ...(s.defensible ? { additionalType: "https://supplychainofai.com/#defensible-sublayer" } : {}),
    })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://supplychainofai.com/" },
      { "@type": "ListItem", position: 2, name: "Framework", item: "https://supplychainofai.com/framework" },
      { "@type": "ListItem", position: 3, name: `${layer.id} ${layer.name}`, item: layerUrl },
    ],
  };

  return (
    <SiteLayout>
      <Seo
        title={`${layer.id} ${layer.name}, Layer ${layer.id} of Supply Chain of Intelligence`}
        description={`${layer.desc} ${layer.verdict}`}
        path={`/framework/${slugFor(layer.id)}`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(definedTerm)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>

      <article className="bg-background">
        <div className="max-w-3xl mx-auto px-6 pt-20 pb-16">
          <Link
            to="/framework"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent mb-8"
          >
            <ArrowLeft size={14} /> Full framework
          </Link>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <div
              className="rounded-3xl p-8 md:p-10 border sketch-border mb-10"
              style={{
                background: `hsl(${layer.bg})`,
                borderColor: `hsl(${layer.color} / 0.3)`,
              }}
            >
              <div className="flex items-start gap-5">
                <div className="shrink-0">
                  <SketchIcon name={layer.goldIcon} size={64} color={`hsl(${layer.color})`} />
                </div>
                <div>
                  <p
                    className="font-sketch text-lg font-bold mb-1"
                    style={{ color: `hsl(${layer.color})` }}
                  >
                    Layer {layer.id}
                  </p>
                  <h1 className="font-display text-3xl md:text-[42px] font-bold text-foreground leading-tight mb-3">
                    {layer.name}
                  </h1>
                  <p className="text-lg text-foreground/85 leading-relaxed">{layer.desc}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                  Why it matters
                </h2>
                <p className="text-foreground/85 text-[17px] leading-[1.8]">{layer.detail}</p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                  {layer.goldTitle}
                </h2>
                <p className="text-foreground/85 text-[17px] leading-[1.8] italic">
                  {layer.goldAnalogy}
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  The 5 sublayers
                </h2>
                <div className="space-y-3">
                  {layer.sublayers.map((s) => (
                    <div
                      key={s.id}
                      id={s.id.toLowerCase()}
                      className="bg-card border border-border rounded-xl p-4 sketch-border flex items-start gap-3 scroll-mt-24 target:ring-2 target:ring-accent/60"
                    >
                      <span
                        className="font-sketch text-sm font-bold px-2 py-0.5 rounded-md shrink-0 mt-0.5"
                        style={{
                          color: `hsl(${layer.color})`,
                          background: `hsl(${layer.bg})`,
                        }}
                      >
                        {s.id}
                      </span>
                      <div>
                        <p className="font-display font-bold text-foreground flex items-center gap-2">
                          {s.name}
                          {s.defensible && (
                            <Star
                              size={13}
                              className="text-accent fill-accent"
                              aria-label="Defensible sublayer"
                            />
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {diag && (
                <section
                  className="rounded-2xl border-2 p-6 md:p-8"
                  style={{
                    borderColor: `hsl(${layer.color} / 0.4)`,
                    background: `hsl(${layer.bg} / 0.4)`,
                  }}
                >
                  <p
                    className="font-mono-marker text-[11px] font-bold uppercase tracking-[0.18em] mb-2"
                    style={{ color: `hsl(${layer.color})` }}
                  >
                   , Layer diagnostic card · SCOI v1
                  </p>
                  <h2 className="font-display text-2xl md:text-[28px] font-bold text-foreground mb-3 leading-tight">
                    Is a company really at {layer.id}?
                  </h2>
                  <p className="text-foreground/85 text-[16px] leading-[1.75] mb-6">
                    <GlossaryText>{diag.oneLineDef}</GlossaryText>
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-card border border-border rounded-xl p-4">
                      <p className="font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground mb-3">Inclusion tests · include if ALL</p>
                      <ul className="space-y-2">
                        {diag.inclusionTests.map((t) => (
                          <li key={t} className="flex gap-2 text-sm text-foreground/90 leading-snug">
                            <Check size={14} className="shrink-0 mt-0.5 text-[hsl(var(--verdict-fortified))]" />
                            <span><GlossaryText>{t}</GlossaryText></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4">
                      <p className="font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground mb-3">Exclusion tests · exclude if ANY</p>
                      <ul className="space-y-2">
                        {diag.exclusionTests.map((t) => (
                          <li key={t} className="flex gap-2 text-sm text-foreground/90 leading-snug">
                            <XIcon size={14} className="shrink-0 mt-0.5 text-[hsl(var(--verdict-exposed))]" />
                            <span><GlossaryText>{t}</GlossaryText></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-foreground text-background rounded-xl p-5 mb-6">
                    <p className="font-mono-marker text-[11px] uppercase tracking-wider text-accent mb-2">The {layer.id} removal test</p>
                    <p className="text-[15px] leading-[1.7]"><GlossaryText>{diag.removalTest}</GlossaryText></p>
                    <p className="font-mono-marker text-[11px] uppercase tracking-wider text-background/60 mt-4 mb-1">Economic work this layer does</p>
                    <p className="text-[14px] text-background/85 leading-snug"><GlossaryText>{diag.economicWork}</GlossaryText></p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Canonical examples</p>
                      <ul className="space-y-2">
                        {diag.canonical.map((c) => (
                          <li key={c.name} className="bg-card border border-border rounded-lg p-3">
                            <p className="font-display font-bold text-foreground text-sm">{c.name}</p>
                            <p className="text-xs text-muted-foreground leading-snug mt-0.5"><GlossaryText>{c.why}</GlossaryText></p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono-marker text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Anti-examples · look-alikes that fail</p>
                      <ul className="space-y-2">
                        {diag.antiExamples.map((c) => (
                          <li key={c.name} className="bg-card border border-dashed border-border rounded-lg p-3">
                            <p className="font-display font-bold text-foreground/80 text-sm">{c.name}</p>
                            <p className="text-xs text-muted-foreground leading-snug mt-0.5"><GlossaryText>{c.why}</GlossaryText></p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground italic">Disagree with a classification?</span>
                    <Link to="/classification" className="text-accent hover:underline font-mono-marker uppercase tracking-wider">
                      Open the classification table →
                    </Link>
                  </div>
                </section>
              )}

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                  Who's playing here
                </h2>
                <div className="flex flex-wrap gap-2">
                  {layer.players.map((p) => (
                    <span
                      key={p}
                      className="px-3 py-1 rounded-lg border border-border bg-card text-sm text-foreground"
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <p
                  className="font-sketch text-base font-bold mt-4"
                  style={{ color: `hsl(${layer.color})` }}
                >
                  Verdict: {layer.verdict}
                </p>
              </section>

              {relevantStudies.length > 0 && (
                <section>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Case studies touching {layer.id}
                  </h2>
                  <div className="space-y-2">
                    {relevantStudies.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/analysis/${s.slug}`}
                        className="block bg-card border border-border rounded-xl p-4 sketch-border hover:border-accent transition-colors"
                      >
                        <p className="font-display font-bold text-foreground">{s.title}</p>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {s.excerpt}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

            </div>

            <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
              {prev ? (
                <Link
                  to={`/framework/${slugFor(prev.id)}`}
                  className="text-sm text-muted-foreground hover:text-accent inline-flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} /> {prev.id} {prev.name}
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  to={`/framework/${slugFor(next.id)}`}
                  className="text-sm text-muted-foreground hover:text-accent inline-flex items-center gap-1.5"
                >
                  {next.id} {next.name} <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </article>
    </SiteLayout>
  );
};

export default LayerDetailPage;
