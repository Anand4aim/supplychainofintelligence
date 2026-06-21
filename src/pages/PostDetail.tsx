import { useParams, Link, Navigate } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import AuthorNote from "@/components/AuthorNote";
import {
  SketchFilters,
  SketchBox,
  SketchConnector,
} from "@/components/sketch/SketchElements";
import HeroBrandPoster from "@/components/posters/HeroBrandPoster";
import AboveBelowLinePoster from "@/components/posters/AboveBelowLinePoster";
import AgentDecoderPoster from "@/components/posters/AgentDecoderPoster";
import StackCompressionMapPoster from "@/components/posters/StackCompressionMapPoster";
import FourLawsPoster from "@/components/posters/FourLawsPoster";
import SoftwareForOnePoster from "@/components/posters/SoftwareForOnePoster";
import NoNewLayersPoster from "@/components/posters/NoNewLayersPoster";
import FrameworkComparisonHero from "@/components/posts/FrameworkComparisonHero";
import FrameworkCoverageMatrix from "@/components/posts/FrameworkCoverageMatrix";
import { getPostBySlug } from "@/data/posts";
import { ArrowLeft, Linkedin } from "lucide-react";

// Inline poster markers in post body:
// [[poster:hero|four-laws|agent-decoder|above-below|compression|framework-compare-hero|framework-coverage]]
const INLINE_POSTERS: Record<string, React.ComponentType> = {
  hero: HeroBrandPoster,
  "four-laws": FourLawsPoster,
  "agent-decoder": AgentDecoderPoster,
  "above-below": AboveBelowLinePoster,
  compression: StackCompressionMapPoster,
  "framework-compare-hero": FrameworkComparisonHero,
  "framework-coverage": FrameworkCoverageMatrix,
};

// Tiny inline markdown: **bold**, _italic_, drop everything else.
const renderInline = (text: string) => {
  const parts: (string | JSX.Element)[] = [];
  let i = 0;
  let key = 0;
  const regex = /(\*\*([^*]+)\*\*|_([^_]+)_)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > i) parts.push(text.slice(i, m.index));
    if (m[2]) parts.push(<strong key={key++} className="text-foreground font-semibold">{m[2]}</strong>);
    else if (m[3]) parts.push(<em key={key++}>{m[3]}</em>);
    i = m.index + m[0].length;
  }
  if (i < text.length) parts.push(text.slice(i));
  return parts;
};

const PostDetail = () => {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;
  if (!post) return <Navigate to="/posts" replace />;

  const HeroComponent =
    post.heroPoster === "above-below"
      ? AboveBelowLinePoster
      : post.heroPoster === "agent-decoder"
        ? AgentDecoderPoster
        : post.heroPoster === "compression"
          ? StackCompressionMapPoster
          : post.heroPoster === "framework-compare-hero"
            ? FrameworkComparisonHero
            : post.heroPoster === "software-for-one"
              ? SoftwareForOnePoster
              : post.heroPoster === "no-new-layers"
                ? NoNewLayersPoster
                : HeroBrandPoster;

  return (
    <SiteLayout>
      <Seo
        title={`${post.title}, Supply Chain of Intelligence`}
        description={post.excerpt}
        path={`/posts/${post.slug}`}
        article
        datePublished={post.publishedAt}
      />


      <SketchFilters />

      <article
        className="relative"
        style={{
          background:
            "linear-gradient(180deg, hsl(40 30% 97%) 0%, hsl(38 28% 95%) 60%, hsl(40 30% 96%) 100%)",
        }}
      >
        {/* Paper dot-grid */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(25 15% 30%) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden
        />

        <div className="relative max-w-3xl mx-auto px-6 pt-12 md:pt-16 pb-14">
          <Link
            to="/posts"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm font-mono-marker uppercase tracking-[0.14em] mb-8"
          >
            <ArrowLeft size={14} /> Posted
          </Link>

          <Eyebrow tone="accent" className="mb-3">
            {post.channel} · {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
          </Eyebrow>
          <h1 className="font-display text-[32px] md:text-[48px] font-bold leading-[1.08] mb-5 text-foreground">
            {post.title}
          </h1>
          <p
            className="font-sketch text-xl md:text-2xl text-foreground/85 leading-snug mb-8 pl-4"
            style={{
              fontWeight: 500,
              borderLeft: "3px solid hsl(0 65% 48%)",
              transform: "rotate(-0.3deg)",
            }}
          >
            {post.subtitle}
          </p>

          <p className="font-mono-marker text-[11px] tracking-[0.14em] uppercase text-muted-foreground mb-10">
            {post.readingMinutes} min read · Opinion
          </p>

          {/* Hero poster (also serves as the LinkedIn share image) */}
          {HeroComponent && (
            <div className="mb-12">
              <HeroComponent />
              <p className="font-sketch text-[13px] text-muted-foreground mt-3 text-center" style={{ fontWeight: 500 }}>
                ↓ download as the LinkedIn share image
              </p>
            </div>
          )}

          {/* Body */}
          <div className="space-y-6 text-[17px] md:text-[18px] leading-[1.78] text-foreground/85">
            {post.body.map((para, idx) => {
              if (para === "---") {
                return (
                  <div key={idx} className="my-12 flex justify-center" aria-hidden>
                    <SketchConnector length={120} />
                  </div>
                );
              }
              if (para.startsWith("## ")) {
                return (
                  <h2 key={idx} className="font-display text-2xl md:text-3xl font-bold text-foreground mt-10 mb-2">
                    {renderInline(para.slice(3))}
                  </h2>
                );
              }
              if (para.startsWith("^^ ")) {
                return (
                  <AuthorNote key={idx}>{renderInline(para.slice(3))}</AuthorNote>
                );
              }
              if (para.startsWith(">> ")) {
                return (
                  <div key={idx} className="my-10">
                    <SketchBox
                      color="hsl(0 65% 48% / 0.5)"
                      fill="hsl(40 30% 97%)"
                      className="px-6 py-5 md:px-8 md:py-6"
                    >
                      <blockquote
                        className="font-sketch text-xl md:text-2xl leading-[1.45] text-foreground"
                        style={{ fontWeight: 500, transform: "rotate(-0.2deg)" }}
                      >
                        “{renderInline(para.slice(3))}”
                      </blockquote>
                    </SketchBox>
                  </div>
                );
              }
              const posterMatch = para.match(/^\[\[poster:([a-z-]+)\]\]$/);
              if (posterMatch) {
                const Poster = INLINE_POSTERS[posterMatch[1]];
                if (Poster) {
                  return (
                    <div key={idx} className="my-10">
                      <Poster />
                    </div>
                  );
                }
              }
              return <p key={idx}>{renderInline(para)}</p>;
            })}
          </div>


          {/* Tail CTA, drive back to framework + LinkedIn */}
          <div className="mt-14 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Originally posted on <strong className="text-foreground">{post.channel}</strong>.
              This is the canonical archived version.
            </p>
            <div className="flex flex-wrap gap-3">
              {post.channelUrl && (
                <a
                  href={post.channelUrl}
                  target="_blank"
                  rel="noopener"
                  className="btn-sketch inline-flex items-center gap-2"
                >
                  <Linkedin size={14} /> Follow on LinkedIn
                </a>
              )}
              <Link to="/framework" className="btn-sketch-outline">
                Read the full framework →
              </Link>
              <Link to="/posters" className="btn-sketch-outline">
                Grab the posters →
              </Link>
            </div>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
};

export default PostDetail;
