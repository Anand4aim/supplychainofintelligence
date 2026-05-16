import { Link } from "react-router-dom";

const SiteFooter = () => (
  <footer className="bg-background border-t border-foreground/10 text-muted-foreground">
    <div className="max-w-7xl mx-auto px-6 py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <p className="font-mono-marker text-[10px] text-accent mb-3">
            DWG · SCI-000 · REV 4.0 · MAY 2026
          </p>
          <h3 className="font-display text-lg font-bold text-foreground mb-3">
            The Supply Chain of Intelligence<span className="text-accent">™</span>
          </h3>
          <p className="text-sm leading-relaxed max-w-md">
            A structural framework that maps where AI companies live, compete, and die.
            10 Layers. 50 Sublayers. 3 Laws. The Intelligence Cube™.
          </p>
          <p className="text-xs mt-3 text-muted-foreground">
            By Anand Arivukkarasu · Ex-Meta Product Leader
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-mono-marker text-[10px] text-foreground/60 mb-4">Navigate</h4>
          <div className="space-y-2.5">
            <Link to="/framework" className="block text-sm hover:text-foreground transition-colors">Framework</Link>
            <Link to="/analysis" className="block text-sm hover:text-foreground transition-colors">Case Studies</Link>
            <Link to="/for-product-leaders" className="block text-sm hover:text-foreground transition-colors">Analysis</Link>
          </div>
        </div>

        <div>
          <h4 className="font-mono-marker text-[10px] text-foreground/60 mb-4">Connect</h4>
          <div className="space-y-2.5">
            <a href="https://supplychainofai.com" className="block text-sm hover:text-foreground transition-colors">SupplyChainOfAI.com</a>
            <a href="#newsletter" className="block text-sm hover:text-foreground transition-colors">Newsletter</a>
          </div>
        </div>
      </div>

      <div className="border-t border-foreground/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 font-mono-marker text-[10px]">
        <p>© {new Date().getFullYear()} Anand Arivukkarasu · All rights reserved</p>
        <p className="text-foreground/50">
          The Supply Chain of Intelligence™ &amp; The Intelligence Cube™ — trademarks of Anand Arivukkarasu
        </p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
