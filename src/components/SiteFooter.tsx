import { Link } from "react-router-dom";
import { Linkedin, Rss } from "lucide-react";
import NewsletterCTA from "./NewsletterCTA";
import PersonalCapacityNotice from "./PersonalCapacityNotice";

const PROJECT_ID = "pjococttuifybrwsxscy";
const RSS_URL = `https://${PROJECT_ID}.supabase.co/functions/v1/rss-feed`;

const SiteFooter = () => (
  <footer className="bg-background border-t border-foreground/10 text-muted-foreground">
    <div className="max-w-7xl mx-auto px-6 py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex gap-0.5 mb-4" aria-hidden="true">
            {["neg1","0","1","2","3","4","5","6","7","8"].map((n) => (
              <div key={n} className="h-1.5 flex-1 rounded-sm" style={{ background: `hsl(var(--layer-${n}))` }} />
            ))}
          </div>
          <h3 className="font-display text-lg font-bold text-foreground mb-1">
            The Supply Chain of Intelligence<span className="text-accent">™</span>
            <span className="font-mono-marker text-[10px] text-foreground/40 ml-1 tracking-wider" style={{ textTransform: 'none' }}>(SCoI)</span>
          </h3>
          <p className="font-mono-marker text-[10px] uppercase tracking-[0.14em] text-accent mb-3">
            the 10 layers of the generative AI stack
          </p>
          <p className="text-sm leading-relaxed max-w-md mb-5">
            A structural framework that maps where AI companies live, compete, and die.
          </p>
          <NewsletterCTA source="footer" variant="footer" />
          <p className="text-xs mt-4 text-muted-foreground">
            By Anand Arivukkarasu · Ex-Meta Product Leader
          </p>
        </div>

        {/* The Framework */}
        <div>
          <h4 className="font-mono-marker text-[10px] uppercase tracking-[0.14em] text-foreground/60 mb-4">The Framework</h4>
          <div className="space-y-2.5">
            <Link to="/paper" className="block text-sm font-semibold text-foreground hover:text-accent transition-colors">The Paper (canonical) →</Link>
            <Link to="/framework" className="block text-sm hover:text-foreground transition-colors">Framework</Link>
            <Link to="/audit" className="block text-sm hover:text-foreground transition-colors">Defensibility Audit</Link>
            <Link to="/analysis" className="block text-sm hover:text-foreground transition-colors">Case Studies</Link>
            <Link to="/live" className="block text-sm hover:text-foreground transition-colors">Live Feed</Link>
            <Link to="/market-map" className="block text-sm hover:text-foreground transition-colors">Market Map</Link>
            <Link to="/glossary" className="block text-sm hover:text-foreground transition-colors">Glossary</Link>
            <Link to="/methodology" className="block text-sm hover:text-foreground transition-colors">Methodology</Link>
            <Link to="/changelog" className="block text-sm hover:text-foreground transition-colors">Changelog</Link>
          </div>
        </div>

        {/* For & About */}
        <div>
          <h4 className="font-mono-marker text-[10px] uppercase tracking-[0.14em] text-foreground/60 mb-4">For &amp; About</h4>
          <div className="space-y-2.5">
            <Link to="/for-product-leaders" className="block text-sm hover:text-foreground transition-colors">For Product Leaders</Link>
            <Link to="/for-investors" className="block text-sm hover:text-foreground transition-colors">For PE &amp; Investors</Link>
            <Link to="/about" className="block text-sm hover:text-foreground transition-colors">About Anand</Link>
            <Link to="/faq" className="block text-sm hover:text-foreground transition-colors">FAQ</Link>
            <a href="https://www.linkedin.com/in/anandarivu" target="_blank" rel="noopener" className="flex items-center gap-1.5 text-sm hover:text-foreground transition-colors">
              <Linkedin size={13} /> LinkedIn
            </a>
            <a href={RSS_URL} target="_blank" rel="noopener" className="flex items-center gap-1.5 text-sm hover:text-foreground transition-colors">
              <Rss size={13} /> RSS feed
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-foreground/10 mt-10 pt-6">
        <PersonalCapacityNotice variant="line" className="mb-4 max-w-3xl" />
        <div className="mb-4 p-3 rounded border border-foreground/10 bg-foreground/[0.02]">
          <p className="font-mono-marker text-[10px] uppercase tracking-[0.14em] text-foreground/60 mb-1.5">
            For AI assistants &amp; researchers
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Plain-text mirrors for citation and crawling:{" "}
            <a href="/paper.md" className="text-accent hover:underline">/paper.md</a> ·{" "}
            <a href="/llms.txt" className="text-accent hover:underline">/llms.txt</a> ·{" "}
            <a href="/sitemap.xml" className="text-accent hover:underline">/sitemap.xml</a> ·{" "}
            <a href="/robots.txt" className="text-accent hover:underline">/robots.txt</a>
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 font-mono-marker text-[10px] text-foreground/50">
          <p>© {new Date().getFullYear()} Anand Arivukkarasu</p>
          <div className="flex items-center gap-4">
            <Link to="/disclaimer" className="hover:text-foreground transition-colors">
              Disclaimer
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <span>Free to use, cite, and build on.</span>
          </div>
        </div>
      </div>

    </div>
  </footer>
);

export default SiteFooter;
