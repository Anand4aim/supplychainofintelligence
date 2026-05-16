import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Copy, ExternalLink, Loader2, X } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface LayerScore { layer: string; owned: boolean; note: string; }

interface LiveArticle {
  id: string;
  slug: string;
  headline: string;
  subheadline: string | null;
  news_summary: string;
  source_urls: string[];
  verdict: string;
  vertical: string | null;
  linkedin_post: string;
  published_at: string;
  analysis: {
    layer_scores: LayerScore[];
    why_now?: string;
    structural_take: string;
    second_order_effects?: string;
    who_wins?: { name: string; reason: string }[];
    who_loses?: { name: string; reason: string }[];
    vertical_lens: string;
    counter_thesis?: string;
    what_to_watch?: string[];
    new_law_candidate: string;
  };
}

const LAYER_ORDER = ["L-1","L0","L1","L2","L3","L4","L5","L6","L7","L8"];
const LAYER_LABEL: Record<string,string> = {
  "L-1":"Energy & Power","L0":"Compute & Silicon","L1":"Cloud Infra","L2":"Foundation Models",
  "L3":"Inference & Serving","L4":"Agents & Orchestration","L5":"Tools & APIs","L6":"Applications",
  "L7":"Distribution & Trust","L8":"Memory & Continuity"
};
const layerVar = (l: string) => {
  const key = l === "L-1" ? "neg1" : l.replace("L", "");
  return `--layer-${key}`;
};

const verdictTone = (v: string) => {
  switch (v) {
    case "DEAD": return "bg-[hsl(var(--verdict-exposed))] text-white";
    case "CONTESTED": return "bg-[hsl(var(--verdict-consolidating))] text-white";
    case "SAFE": return "bg-[hsl(var(--verdict-fortified))] text-white";
    case "DOMINANT": return "bg-[hsl(var(--verdict-dominant))] text-white";
    default: return "bg-foreground text-background";
  }
};

const LiveArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<LiveArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data } = await supabase.from("live_articles").select("*").eq("slug", slug).maybeSingle();
      setArticle(data ? (data as unknown as LiveArticle) : null);
      setLoading(false);
    })();
  }, [slug]);

  const copyLinkedIn = async () => {
    if (!article) return;
    await navigator.clipboard.writeText(article.linkedin_post);
    setCopied(true);
    toast.success("LinkedIn post copied — paste anywhere");
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <SiteLayout><div className="max-w-3xl mx-auto py-32 text-center text-muted-foreground"><Loader2 className="animate-spin inline mr-2" size={18}/>Loading…</div></SiteLayout>;
  }
  if (!article) {
    return <SiteLayout><div className="max-w-3xl mx-auto py-32 text-center"><p className="text-muted-foreground mb-4">Article not found.</p><Link to="/live" className="text-accent underline">Back to the feed</Link></div></SiteLayout>;
  }

  const scoreMap = new Map(article.analysis.layer_scores.map(s => [s.layer, s]));

  return (
    <SiteLayout>
      <Seo
        title={`${article.headline} — Live Analysis`}
        description={article.subheadline ?? article.news_summary.slice(0, 155)}
        path={`/live/${article.slug}`}
      />

      <article className="bg-background">
        <div className="max-w-3xl mx-auto px-6 pt-12 pb-20">
          <Link to="/live" className="inline-flex items-center gap-1.5 font-mono-marker text-[11px] text-muted-foreground hover:text-accent mb-8">
            <ArrowLeft size={12}/> Back to feed
          </Link>

          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className="font-mono-marker text-[10px] text-muted-foreground">
              {new Date(article.published_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}
            </span>
            {article.vertical && (
              <span className="font-mono-marker text-[10px] text-foreground/60 border border-foreground/20 px-2 py-0.5">
                {article.vertical.toUpperCase()}
              </span>
            )}
            <span className={`font-mono-marker text-[10px] px-2 py-0.5 ${verdictTone(article.verdict)}`}>
              {article.verdict}
            </span>
          </div>

          <motion.h1
            initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
            className="font-display text-3xl md:text-[44px] font-bold text-foreground leading-[1.1] mb-4"
          >
            {article.headline}
          </motion.h1>
          {article.subheadline && (
            <p className="text-xl text-foreground/80 italic mb-10 leading-relaxed">{article.subheadline}</p>
          )}

          {/* The news */}
          <section className="mb-12">
            <p className="font-sketch text-base font-bold text-accent mb-3">— The News</p>
            <p className="text-foreground leading-relaxed text-[17px]">{article.news_summary}</p>
            {article.source_urls?.length > 0 && (
              <div className="mt-4 space-y-1">
                {article.source_urls.map((u, i) => (
                  <a key={i} href={u} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent break-all">
                    <ExternalLink size={11}/> {u}
                  </a>
                ))}
              </div>
            )}
          </section>

          {/* Layer scoring */}
          <section className="mb-12">
            <p className="font-sketch text-base font-bold text-accent mb-4">— Layer Scoring</p>
            <div className="space-y-1.5">
              {LAYER_ORDER.map((layer) => {
                const s = scoreMap.get(layer);
                const owned = s?.owned ?? false;
                return (
                  <div
                    key={layer}
                    className="flex items-center gap-3 p-3 border-l-4"
                    style={{
                      borderColor: `hsl(var(${layerVar(layer)}))`,
                      background: `hsl(var(${layerVar(layer)}-bg))`,
                    }}
                  >
                    <span
                      className="font-mono-marker text-[10px] font-bold text-white px-2 py-0.5 min-w-[36px] text-center"
                      style={{ background: `hsl(var(${layerVar(layer)}))` }}
                    >
                      {layer}
                    </span>
                    <span className="font-mono-marker text-[11px] text-foreground/70 min-w-[140px] hidden sm:inline">
                      {LAYER_LABEL[layer]}
                    </span>
                    {owned ? (
                      <Check size={16} className="text-[hsl(var(--verdict-fortified))] shrink-0"/>
                    ) : (
                      <X size={16} className="text-foreground/30 shrink-0"/>
                    )}
                    <span className="text-sm text-foreground/80 leading-snug">
                      {s?.note ?? "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Structural take */}
          <section className="mb-12">
            <p className="font-sketch text-base font-bold text-accent mb-3">— The Structural Take</p>
            <p className="text-foreground leading-relaxed text-[17px] whitespace-pre-line">{article.analysis.structural_take}</p>
          </section>

          {/* Vertical lens */}
          {article.vertical && (
            <section className="mb-12">
              <p className="font-sketch text-base font-bold text-accent mb-3">
                — The {article.vertical} Lens
              </p>
              <p className="text-foreground leading-relaxed text-[17px] whitespace-pre-line">{article.analysis.vertical_lens}</p>
            </section>
          )}

          {/* New law candidate */}
          {article.analysis.new_law_candidate && article.analysis.new_law_candidate.trim() && (
            <section className="mb-12 bg-card border-l-4 border-accent p-5">
              <p className="font-sketch text-base font-bold text-accent mb-2">— Candidate Law</p>
              <p className="font-display text-lg text-foreground italic leading-snug">
                "{article.analysis.new_law_candidate}"
              </p>
            </section>
          )}

          {/* LinkedIn post */}
          <section className="mb-12 bg-foreground text-background p-6 md:p-8">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <p className="font-sketch text-base font-bold text-accent">— Ready for LinkedIn</p>
              <button
                onClick={copyLinkedIn}
                className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground px-3 py-1.5 font-mono-marker text-[11px] hover:opacity-90"
              >
                {copied ? <><Check size={12}/> Copied</> : <><Copy size={12}/> Copy post</>}
              </button>
            </div>
            <p className="whitespace-pre-line text-[15px] leading-relaxed text-background/90">
              {article.linkedin_post}
            </p>
          </section>

          <div className="border-t border-foreground/10 pt-8">
            <p className="text-sm text-muted-foreground">
              Written by the Supply Chain of Intelligence™ analysis engine, reviewed weekly.
              By <Link to="/about" className="text-accent underline">Anand Arivukkarasu</Link> · Ex-Meta Product Leader.
            </p>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
};

export default LiveArticleDetail;
