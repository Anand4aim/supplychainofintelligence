import { Link } from "react-router-dom";

const SiteFooter = () => (
  <footer className="bg-navy text-white/60">
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <h3 className="font-display text-xl font-bold text-white mb-3">
            The Supply Chain of Intelligence<span className="text-indigo">™</span>
          </h3>
          <p className="text-sm leading-relaxed max-w-md">
            The structural framework that maps where AI companies live, compete, and die. 
            8 Layers. 3 Laws. The Intelligence Cube™.
          </p>
          <p className="text-xs mt-4 text-white/30">
            By Anand Arivukkarasu · Ex-Meta & Google Product Leader
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[2px] text-white/40 mb-4">Navigate</h4>
          <div className="space-y-2">
            <Link to="/framework" className="block text-sm hover:text-white transition-colors">The Framework</Link>
            <Link to="/analysis" className="block text-sm hover:text-white transition-colors">Analysis</Link>
            <Link to="/speaking" className="block text-sm hover:text-white transition-colors">Speaking & Workshops</Link>
          </div>
        </div>

        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[2px] text-white/40 mb-4">Connect</h4>
          <div className="space-y-2">
            <a href="https://supplychainofai.com" className="block text-sm hover:text-white transition-colors">SupplyChainOfAI.com</a>
            <a href="#newsletter" className="block text-sm hover:text-white transition-colors">Newsletter</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} Anand Arivukkarasu. All rights reserved.
        </p>
        <p className="text-xs text-white/30">
          The Supply Chain of Intelligence™ and The Intelligence Cube™ are trademarks of Anand Arivukkarasu.
        </p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
