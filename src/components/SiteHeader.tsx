import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Framework", path: "/framework" },
  { label: "Case Studies", path: "/analysis" },
  { label: "Analysis", path: "/for-product-leaders" },
  { label: "Speaking", path: "/speaking" },
];

const SiteHeader = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-[15px] font-semibold text-foreground tracking-tight">
            Supply Chain of Intelligence<span className="text-accent">™</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-[13px] font-semibold transition-colors ${
                location.pathname === item.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="#newsletter"
            className="btn-sketch text-[12px] px-3.5 py-1.5"
          >
            Subscribe
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-muted-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden bg-background border-t border-border px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block text-sm font-semibold ${
                location.pathname === item.path
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
              style={{ fontFamily: "'Nunito', sans-serif" }}
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