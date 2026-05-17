import { Linkedin, Rss } from "lucide-react";
import NewsletterCTA from "./NewsletterCTA";

interface Props {
  shareText?: string;
  shareUrl?: string;
  source?: string;
}

const ArticleFooterCTA = ({ shareText, shareUrl, source = "article" }: Props) => {
  const shareHref = shareUrl
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    : "https://www.linkedin.com/in/anandarivu";
  const rssHref = "https://pjococttuifybrwsxscy.supabase.co/functions/v1/rss-feed";

  return (
    <div className="mt-14 pt-10 border-t border-foreground/10 space-y-6">
      <NewsletterCTA source={source} />
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={shareHref}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground border border-foreground/20 rounded-md px-3 py-1.5 hover:bg-foreground hover:text-background transition-colors"
        >
          <Linkedin size={14} /> {shareUrl ? "Share on LinkedIn" : "Follow Anand on LinkedIn"}
        </a>
        {shareUrl && (
          <a
            href="https://www.linkedin.com/in/anandarivu"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground border border-foreground/20 rounded-md px-3 py-1.5 hover:bg-foreground hover:text-background transition-colors"
          >
            <Linkedin size={14} /> Follow author
          </a>
        )}
        <a
          href={rssHref}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground border border-foreground/20 rounded-md px-3 py-1.5 hover:bg-foreground hover:text-background transition-colors"
        >
          <Rss size={14} /> RSS
        </a>
      </div>
      {shareText && (
        <p className="text-xs text-muted-foreground italic">
          Worth sharing? Pull-quote: "{shareText}"
        </p>
      )}
    </div>
  );
};

export default ArticleFooterCTA;
