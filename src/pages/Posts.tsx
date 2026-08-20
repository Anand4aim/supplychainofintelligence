import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, FileText } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import { POSTS } from "@/data/posts";

// Posted, long-form essays. Shares the News Feed visual vocabulary
// (mono-marker eyebrows, color-rail spine, secondary/30 section bg, issue
// indexing) but adopts a magazine rhythm: one featured cover essay + a
// generous 2-col list. Essays earn the visual gravity that Live's river
// deliberately compresses.

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const Posts = () => {
  const [featured, ...rest] = POSTS;
  const total = POSTS.length;

  return (
    <SiteLayout>
      <Seo
        title="Posted, Long-Form Essays on the Generative AI Stack"
        description="Long-form essays on Supply Chain of Intelligence™, the 10-layer generative AI stack (not logistics). Archived here as the canonical version."
        path="/posts"
      />

      {/* Header, mirrors Live header shape */}
      <section className="bg-background">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={16} className="text-accent" />
              <Eyebrow>Posted · Essays</Eyebrow>
            </div>
            <h1 className="font-display text-4xl md:text-[52px] font-bold text-foreground leading-[1.05] mb-6">
              Essays, in the wild.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-3">
              Long-form arguments around Supply Chain of Intelligence™, originally posted to LinkedIn
              and archived here as the canonical version. The framework itself lives at{" "}
              <Link to="/framework" className="text-accent hover:underline">/framework</Link>.
            </p>
            <p className="text-sm text-muted-foreground/80 italic">
              {total} {total === 1 ? "essay" : "essays"} · Free to read, copy, and repost anywhere.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Body, matches Live's secondary/30 + border-y body band */}
      <section className="bg-secondary/30 border-y border-foreground/10">
        <div className="max-w-5xl mx-auto px-6 py-16">

          {/* Featured cover essay, shares the Live "Latest Issue" card grammar */}
          {featured && (
            <div className="mb-12">
              <div className="flex items-baseline justify-between gap-4 mb-4 pb-3 border-b border-foreground/10">
                <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                  Featured essay
                </h2>
                <p className="font-mono-marker text-[10px] uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                  Essay #{total} · most recent
                </p>
              </div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <Link
                  to={`/posts/${featured.slug}`}
                  className="block group relative overflow-hidden border border-foreground/15 bg-gradient-to-br from-card via-card to-secondary/40 hover:border-accent transition-all"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent" />
                  <div className="p-8 md:p-12">
                    <div className="flex items-center gap-2 mb-5">
                      <span className="font-mono-marker text-[10px] uppercase tracking-[0.18em] text-accent">
                        ◆ Cover essay
                      </span>
                      <span className="font-mono-marker text-[10px] text-muted-foreground">
                        · {formatDate(featured.publishedAt)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-5 flex-wrap">
                      <span className="font-mono-marker text-[10px] text-foreground/70 border border-foreground/25 px-2 py-0.5">
                        ESSAY
                      </span>
                      <span className="font-mono-marker text-[10px] text-foreground/55 inline-flex items-center gap-1">
                        <FileText size={10} />
                        {featured.readingMinutes} min read · originally on {featured.channel}
                      </span>
                    </div>

                    <h3 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5 group-hover:text-accent transition-colors max-w-3xl">
                      {featured.title}
                    </h3>
                    {featured.subtitle && (
                      <p className="text-lg md:text-xl text-foreground/85 mb-6 italic leading-snug max-w-2xl">
                        {featured.subtitle}
                      </p>
                    )}
                    <p className="text-muted-foreground leading-relaxed max-w-2xl mb-6">
                      {featured.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-accent font-sketch font-bold text-sm group-hover:underline">
                      Read the essay <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            </div>
          )}

          {/* The rest, 2-col magazine list */}
          {rest.length > 0 && (
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-4 pb-3 border-b border-foreground/10">
                <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                  More essays
                </h2>
                <p className="font-mono-marker text-[10px] uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                  {rest.length} {rest.length === 1 ? "piece" : "pieces"}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {rest.map((post, idx) => {
                  const issueNum = total - 1 - idx;
                  return (
                    <motion.article
                      key={post.slug}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="relative border border-foreground/10 bg-card hover:border-accent/60 transition-colors group"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/40 group-hover:bg-accent transition-colors" />
                      <Link to={`/posts/${post.slug}`} className="block p-6 md:p-7">
                        <div className="flex items-center gap-2 mb-3 font-mono-marker text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          <span>Essay #{issueNum}</span>
                          <span>·</span>
                          <span>{formatDate(post.publishedAt)}</span>
                          <span>·</span>
                          <span>{post.readingMinutes} min</span>
                        </div>
                        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight mb-3 group-hover:text-accent transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4">
                          {post.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1 text-accent font-sketch font-bold text-sm">
                          Read <ArrowRight size={13} />
                        </span>
                      </Link>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cross-link back to Live, reinforcing the shared publication */}
          <div className="mt-12 pt-8 border-t border-foreground/10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Looking for shorter, time-stamped takes on breaking AI moves?
            </p>
            <Link
              to="/live"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground border border-foreground/20 rounded-md px-3 py-1.5 hover:bg-foreground hover:text-background transition-colors"
            >
              Read The News Feed <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Posts;
