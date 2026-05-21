import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import { POSTS } from "@/data/posts";
import { ArrowRight } from "lucide-react";

// Posted — long-form essays already published to LinkedIn / X.
// Linked from the footer only (not in top nav).

const Posts = () => (
  <SiteLayout>
    <Seo
      title="Posted — essays from The Supply Chain of Intelligence"
      description="Long-form essays on the 10-layer generative AI stack, originally posted to LinkedIn and archived here as the canonical version."
      path="/posts"
    />

    <section className="bg-background">
      <div className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 pb-10">
        <Eyebrow tone="accent" className="mb-3">Posted</Eyebrow>
        <h1 className="font-display text-[34px] md:text-[48px] font-bold leading-[1.08] mb-4 text-foreground">
          Essays, in the wild.
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Long-form pieces posted to LinkedIn and elsewhere, archived here as the
          canonical version. The framework lives at <Link to="/framework" className="text-accent hover:underline">/framework</Link> — these are the arguments around it.
        </p>
      </div>
    </section>

    <section className="bg-background border-t border-border">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        {POSTS.map((post) => (
          <article
            key={post.slug}
            className="border-b border-border pb-8 last:border-b-0"
          >
            <div className="flex items-center gap-3 font-mono-marker text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-3">
              <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
              <span>·</span>
              <span className="text-accent">{post.channel}</span>
              <span>·</span>
              <span>{post.readingMinutes} min read</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3">
              <Link to={`/posts/${post.slug}`} className="hover:text-accent transition-colors">
                {post.title}
              </Link>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {post.excerpt}
            </p>
            <Link
              to={`/posts/${post.slug}`}
              className="inline-flex items-center gap-1 text-accent font-sketch font-bold text-sm hover:underline"
            >
              Read the essay <ArrowRight size={14} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  </SiteLayout>
);

export default Posts;
