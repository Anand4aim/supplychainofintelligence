import { Link } from "react-router-dom";

const SiteFooter = () => (
  <footer className="bg-navy text-white/60">
    <div className="max-w-7xl mx-auto px-6 py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <h3 className="font-display text-lg font-bold text-white mb-2">
            The Supply Chain of Intelligence<span className="text-indigo">™</span>
          </h3>
          <p className="text-xs leading-relaxed max-w-md">
            A structural framework that maps where AI companies live, compete, and die. 
            9 Layers. 32+ Sublayers. 3 Laws. The Intelligence Cube™.
          </p>
          <p className="text-[11px] mt-3 text-white/25">
            By Anand Arivukkarasu · Ex-Meta Product Leader
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-body text-[10px] font-semibold uppercase tracking-[2px] text-white/30 mb-4">Navigate</h4>
          <div className="space-y-2">
            <Link to="/framework" className="block text-xs hover:text-white transition-colors">The Framework</Link>
            <Link to="/analysis" className="block text-xs hover:text-white transition-colors">Case Studies</Link>
            <Link to="/for-product-leaders" className="block text-xs hover:text-white transition-colors">For Product Leaders</Link>
            <Link to="/speaking" className="block text-xs hover:text-white transition-colors">Speaking & Workshops</Link>
          </div>
        </div>

        <div>
          <h4 className="font-body text-[10px] font-semibold uppercase tracking-[2px] text-white/30 mb-4">Connect</h4>
          <div className="space-y-2">
            <a href="https://supplychainofai.com" className="block text-xs hover:text-white transition-colors">SupplyChainOfAI.com</a>
            <a href="#newsletter" className="block text-xs hover:text-white transition-colors">Newsletter</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-[10px] text-white/25">
          © {new Date().getFullYear()} Anand Arivukkarasu. All rights reserved.
        </p>
        <p className="text-[10px] text-white/25">
          The Supply Chain of Intelligence™ and The Intelligence Cube™ are trademarks of Anand Arivukkarasu.
        </p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
