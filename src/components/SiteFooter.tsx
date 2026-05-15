import { Link } from "react-router-dom";

const SiteFooter = () => (
  <footer className="bg-secondary/60 border-t border-border text-muted-foreground">
    <div className="max-w-7xl mx-auto px-6 py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <h3 className="font-display text-base font-semibold text-foreground mb-2">
            The Supply Chain of Intelligence<span className="text-accent">™</span>
          </h3>
          <p className="text-sm leading-relaxed max-w-md">
            A structural framework that maps where AI companies live, compete, and die. 
            10 Layers. 50 Sublayers. 3 Laws. The Intelligence Cube™.
          </p>
          <p className="text-xs mt-3 text-muted-foreground/60">
            By Anand Arivukkarasu · Ex-Meta & Google Product Leader
          </p>
          <p className="text-xs mt-2 text-muted-foreground/70">
            An <a href="https://www.ideas2it.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">Ideas2IT</a> initiative
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-display text-xs font-semibold uppercase tracking-[2px] text-muted-foreground mb-4">Navigate</h4>
          <div className="space-y-2.5">
            <Link to="/framework" className="block text-sm hover:text-foreground transition-colors">Framework</Link>
            <Link to="/analysis" className="block text-sm hover:text-foreground transition-colors">Case Studies</Link>
            <Link to="/for-product-leaders" className="block text-sm hover:text-foreground transition-colors">Analysis</Link>
          </div>
        </div>

        <div>
          <h4 className="font-display text-xs font-semibold uppercase tracking-[2px] text-muted-foreground mb-4">Connect</h4>
          <div className="space-y-2.5">
            <a href="https://supplychainofai.com" className="block text-sm hover:text-foreground transition-colors">SupplyChainOfAI.com</a>
            <a href="#newsletter" className="block text-sm hover:text-foreground transition-colors">Newsletter</a>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Anand Arivukkarasu. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          The Supply Chain of Intelligence™ and The Intelligence Cube™ are trademarks of Anand Arivukkarasu.
        </p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;