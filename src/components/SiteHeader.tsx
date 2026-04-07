import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Framework", path: "/framework" },
  { label: "Case Studies", path: "/analysis" },
  { label: "For Product Leaders", path: "/for-product-leaders" },
  { label: "Speaking", path: "/speaking" },
];

const SiteHeader = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-base font-bold text-white tracking-tight">
            Supply Chain of Intelligence<span className="text-indigo">™</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-[13px] font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="#newsletter"
            className="px-3.5 py-1.5 bg-indigo text-white text-[13px] font-semibold rounded-md hover:opacity-90 transition-opacity"
          >
            Subscribe
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden bg-navy border-t border-white/10 px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block text-sm font-medium ${
                location.pathname === item.path
                  ? "text-white"
                  : "text-white/60"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
