import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Rss } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";

interface LiveArticle {
  id: string;
  slug: string;
  headline: string;
  subheadline: string | null;
  news_summary: string;
  verdict: string;
  vertical: string | null;
  published_at: string;
}

const verdictTone = (v: string) => {
  switch (v) {
    case "DEAD": return "text-[hsl(var(--verdict-exposed))] border-[hsl(var(--verdict-exposed))]";
    case "CONTESTED": return "text-[hsl(var(--verdict-consolidating))] border-[hsl(var(--verdict-consolidating))]";
    case "SAFE": return "text-[hsl(var(--verdict-fortified))] border-[hsl(var(--verdict-fortified))]";
    case "DOMINANT": return "text-[hsl(var(--verdict-dominant))] border-[hsl(var(--verdict-dominant))]";
    default: return "text-foreground border-foreground/30";
  }
};

const LivePage = () => {
  const [articles, setArticles] = useState<LiveArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("live_articles")
      .select("id, slug, headline, subheadline, news_summary, verdict, vertical, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    setArticles(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const triggerNow = async () => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-live-article");
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error ?? "Failed");
      await load();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      alert(`Generation failed: ${msg}`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <SiteLayout>
      <Seo
        title="The Live Feed — Weekly AI Launches Scored on the 10 Layers"
        description="Every Monday: one major AI product launch analyzed through the Supply Chain of Intelligence framework. Structural take + vertical lens + LinkedIn-ready post."
        path="/live"
      />

      <section className="bg-background">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-6">
              <Rss size={16} className="text-accent" />
              <p className="font-sketch text-lg font-bold text-accent">— The Live Feed</p>
            </div>
            <h1 className="font-display text-4xl md:text-[52px] font-bold text-foreground leading-[1.05] mb-6">
              Every Monday. One launch. <br />Scored on the 10 layers, 50 sublayers, and the 10 laws.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-3">
              An always-on analysis of the most strategically important AI move each week —
              run through the Supply Chain of Intelligence™ framework, the three structural laws,
              and the vertical lens that matters most.
            </p>
            <p className="text-sm text-muted-foreground/80 italic">
              Auto-published Monday 09:00 UTC · Free to read, copy and repost anywhere.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary/30 border-y border-foreground/10">
        <div className="max-w-5xl mx-auto px-6 py-16">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="animate-spin mr-2" size={18} /> Loading the feed…
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-6">No articles yet — the first edition publishes Monday.</p>
              <button
                onClick={triggerNow}
                disabled={generating}
                className="btn-sketch text-[11px] px-4 py-2 inline-flex items-center gap-2"
              >
                {generating ? <><Loader2 className="animate-spin" size={12}/> Scanning news & analyzing…</> : "Generate the first article now"}
              </button>
              <p className="text-xs text-muted-foreground/70 mt-3">Takes ~30 seconds</p>
            </div>
          ) : (
            <>
            <div className="flex justify-end mb-6">
              <button
                onClick={triggerNow}
                disabled={generating}
                className="font-mono-marker text-[10px] text-muted-foreground hover:text-accent inline-flex items-center gap-1.5 disabled:opacity-50"
              >
                {generating ? <><Loader2 className="animate-spin" size={11}/> generating…</> : "+ generate now"}
              </button>
            </div>
            <div className="space-y-6">
              {articles.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={`/live/${a.slug}`}
                    className="block bg-card border border-foreground/10 hover:border-accent transition-all p-6 md:p-8 group"
                  >
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="font-mono-marker text-[10px] text-muted-foreground">
                        {new Date(a.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </span>
                      {a.vertical && (
                        <span className="font-mono-marker text-[10px] text-foreground/60 border border-foreground/20 px-2 py-0.5">
                          {a.vertical.toUpperCase()}
                        </span>
                      )}
                      <span className={`font-mono-marker text-[10px] border px-2 py-0.5 ${verdictTone(a.verdict)}`}>
                        {a.verdict}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl md:text-[28px] font-bold text-foreground leading-tight mb-3 group-hover:text-accent transition-colors">
                      {a.headline}
                    </h2>
                    {a.subheadline && (
                      <p className="text-foreground/80 mb-3 italic">{a.subheadline}</p>
                    )}
                    <p className="text-muted-foreground leading-relaxed line-clamp-2">{a.news_summary}</p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-accent font-mono-marker text-[11px]">
                      Read analysis <ArrowRight size={12} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            </>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default LivePage;
