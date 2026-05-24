import { useState } from "react";
import { layerVar } from "@/data/layers";

/**
 * LogoTile — real logo via Clearbit, with a monogram fallback.
 *
 * Renders the company's actual logo (Clearbit Logo API), with the layer-color
 * stripe on top so the framework's visual language stays visible.
 * Falls back to a Playfair monogram if the logo fails to load.
 */

interface LogoTileProps {
  name: string;
  domain?: string;       // override if the auto-mapped domain is wrong
  layer?: string;
  caption?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const DOMAINS: Record<string, string> = {
  Bloomberg: "bloomberg.com",
  Harvey: "harvey.ai",
  Sierra: "sierra.ai",
  Jasper: "jasper.ai",
  Cursor: "cursor.com",
  Apollo: "apollo.io",
  Tempus: "tempus.com",
  Glean: "glean.com",
  Clay: "clay.com",
  NVIDIA: "nvidia.com",
  Supabase: "supabase.com",
  Twilio: "twilio.com",
  Salesforce: "salesforce.com",
  HubSpot: "hubspot.com",
  Gamma: "gamma.app",
  Chegg: "chegg.com",
  ChatGPT: "openai.com",
  Claude: "anthropic.com",
  Copilot: "github.com",
  OpenAI: "openai.com",
  Vanta: "vanta.com",
  LangChain: "langchain.com",
  Replit: "replit.com",
};

const SIZE = {
  sm: { tile: "p-3", img: "h-9", mono: "text-[32px]", word: "text-[10px]", cap: "text-[10px] mt-2" },
  md: { tile: "p-4", img: "h-12", mono: "text-[44px]", word: "text-[11px]", cap: "text-[11px] mt-2.5" },
  lg: { tile: "p-5", img: "h-16", mono: "text-[60px]", word: "text-[12px]", cap: "text-[12px] mt-3" },
};

const LogoTile = ({ name, domain, layer, caption, size = "md", className = "" }: LogoTileProps) => {
  const s = SIZE[size];
  const stripe = layer ? `hsl(${layerVar(layer)})` : "hsl(var(--border))";
  const resolved = domain ?? DOMAINS[name];
  const sources = resolved
    ? [
        `https://www.google.com/s2/favicons?domain=${resolved}&sz=128`,
        `https://icons.duckduckgo.com/ip3/${resolved}.ico`,
      ]
    : [];
  const [srcIdx, setSrcIdx] = useState(0);
  const [failed, setFailed] = useState(sources.length === 0);

  return (
    <div
      className={`relative rounded-lg border border-border bg-card overflow-hidden ${s.tile} ${className}`}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: stripe }}
        aria-hidden
      />
      {layer && (
        <span
          className="absolute top-2 right-2.5 font-mono-marker text-[9px] tracking-[0.14em] font-bold"
          style={{ color: stripe }}
        >
          {layer}
        </span>
      )}
      <div className="flex flex-col items-center text-center pt-3">
        <div className={`flex items-center justify-center ${s.img}`}>
          {!failed ? (
            <img
              src={sources[srcIdx]}
              alt={`${name} logo`}
              loading="lazy"
              onError={() => {
                if (srcIdx + 1 < sources.length) setSrcIdx(srcIdx + 1);
                else setFailed(true);
              }}
              className={`${s.img} w-auto max-w-full object-contain`}
            />
          ) : (
            <span
              aria-hidden
              className={`font-display font-bold leading-none text-foreground ${s.mono}`}
            >
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <span
          className={`font-mono-marker tracking-[0.14em] uppercase font-semibold text-foreground/85 mt-3 ${s.word}`}
        >
          {name}
        </span>
        {caption && (
          <span className={`text-muted-foreground leading-snug ${s.cap}`}>
            {caption}
          </span>
        )}
      </div>
    </div>
  );
};

export default LogoTile;
