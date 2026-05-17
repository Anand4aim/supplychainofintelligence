import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Live Feed", path: "/live" },
  { label: "Framework", path: "/framework" },
  { label: "Market Map", path: "/market-map" },
  { label: "Case Studies", path: "/analysis" },
  { label: "About", path: "/about" },
];

const SiteHeader = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-foreground/10">
      {/* 10-layer color spectrum — signature visual language */}
      <div className="h-[3px] w-full flex" aria-hidden="true">
        {["neg1","0","1","2","3","4","5","6","7","8"].map((n) => (
          <div key={n} className="flex-1" style={{ background: `hsl(var(--layer-${n}))` }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span
            className="font-display text-[16px] font-bold tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--layer-3)) 45%, hsl(var(--layer-5)) 75%, hsl(var(--accent)) 100%)",
            }}
          >
            Supply Chain of Intelligence<span className="text-accent">™</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-mono-marker text-[11px] transition-colors ${
                location.pathname === item.path
                  ? "text-accent"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
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
              className={`block font-mono-marker text-xs ${
                location.pathname === item.path ? "text-accent" : "text-foreground/70"
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
