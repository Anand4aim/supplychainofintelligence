import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { LAYERS } from "@/data/layers";
import { CASE_STUDIES } from "@/data/caseStudies";
import { SketchIcon } from "@/components/sketch/SketchIcons";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: `${layer.id} — ${layer.name}`,
    description: layer.desc,
    inDefinedTermSet: "https://supplychainofai.com/framework",
  };

  return (
    <SiteLayout>
      <Seo
        title={`${layer.id} ${layer.name} — Layer ${layer.id} of the Supply Chain of Intelligence`}
        description={`${layer.desc} ${layer.verdict}`}
        path={`/framework/${slugFor(layer.id)}`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
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
                      className="bg-card border border-border rounded-xl p-4 sketch-border flex items-start gap-3"
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
