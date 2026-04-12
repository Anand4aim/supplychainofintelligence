import React from "react";

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

const defaults = { size: 24, className: "", color: "currentColor" };

/** Hand-drawn pickaxe — L0 Physical Substrate */
export const IconPickaxe = ({ size = defaults.size, className, color = defaults.color }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ filter: "url(#sketch-wobble)" }}>
    <path d="M8 6C10 4 14 3 18 5C20 6 21 8 20 10L12 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 18L6 24C5 25 5 27 6 28C7 29 9 28 10 27L16 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 8L18 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Hand-drawn rock/ore — L1 Data */
export const IconRock = ({ size = defaults.size, className, color = defaults.color }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ filter: "url(#sketch-wobble)" }}>
    <path d="M6 22C4 20 5 16 8 14L12 10C14 8 18 7 22 9L26 12C28 14 28 18 26 21L22 25C19 27 14 27 10 25Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 14L16 18M18 12L20 16M10 18L14 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

/** Hand-drawn flame — L2 Models */
export const IconFlame = ({ size = defaults.size, className, color = defaults.color }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ filter: "url(#sketch-wobble)" }}>
    <path d="M16 4C16 4 10 12 10 18C10 22 12.5 26 16 28C19.5 26 22 22 22 18C22 12 16 4 16 4Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 16C16 16 14 19 14 21C14 23 15 24 16 25C17 24 18 23 18 21C18 19 16 16 16 16Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
  </svg>
);

/** Hand-drawn shield/checkmark — L3 Trust */
export const IconShield = ({ size = defaults.size, className, color = defaults.color }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ filter: "url(#sketch-wobble)" }}>
    <path d="M16 4L6 9V16C6 22 10 27 16 29C22 27 26 22 26 16V9L16 4Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 16L14 19L21 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Hand-drawn railroad tracks — L4 Access */
export const IconRailroad = ({ size = defaults.size, className, color = defaults.color }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ filter: "url(#sketch-wobble)" }}>
    <path d="M8 6L12 28" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M20 6L24 28" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M9 10L23 10M10 16L24 16M11 22L25 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Hand-drawn gem/diamond — L5 Skills */
export const IconGem = ({ size = defaults.size, className, color = defaults.color }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ filter: "url(#sketch-wobble)" }}>
    <path d="M8 12L12 6H20L24 12L16 27L8 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 12H24" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 6L14 12L16 27M20 6L18 12L16 27" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
  </svg>
);

/** Hand-drawn storefront — L6 Orchestration */
export const IconStorefront = ({ size = defaults.size, className, color = defaults.color }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ filter: "url(#sketch-wobble)" }}>
    <path d="M5 14V27H27V14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 14L6 6H26L29 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 14C3 14 5 17 8 17C11 17 12 14 12 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 14C12 14 13 17 16 17C19 17 20 14 20 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 14C20 14 21 17 24 17C27 17 29 14 29 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <rect x="12" y="20" width="8" height="7" rx="1" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Hand-drawn ring — L7 Expression */
export const IconRing = ({ size = defaults.size, className, color = defaults.color }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ filter: "url(#sketch-wobble)" }}>
    <ellipse cx="16" cy="20" rx="9" ry="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 8L16 4L20 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 8L10 14M20 8L22 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="16" cy="5" r="2" stroke={color} strokeWidth="1.5" />
  </svg>
);

/** Hand-drawn open book — L8 Memory */
export const IconBook = ({ size = defaults.size, className, color = defaults.color }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ filter: "url(#sketch-wobble)" }}>
    <path d="M16 8C16 8 12 5 6 6V25C12 24 16 27 16 27C16 27 20 24 26 25V6C20 5 16 8 16 8Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 8V27" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 11H13M9 15H12M19 11H23M19 15H22" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
  </svg>
);

/** Hand-drawn brain — AI/Intelligence */
export const IconBrain = ({ size = defaults.size, className, color = defaults.color }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ filter: "url(#sketch-wobble)" }}>
    <path d="M16 28V16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 8C8 8 6 10 6 13C4 14 4 17 5 19C5 21 7 23 9 23C10 25 13 27 16 27C19 27 22 25 23 23C25 23 27 21 27 19C28 17 28 14 26 13C26 10 24 8 22 8C20 6 18 5 16 5C14 5 12 6 10 8Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 12C13 14 15 15 16 16C17 15 19 14 20 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

/** Map icon name → component for data-driven rendering */
export const SKETCH_ICON_MAP: Record<string, React.FC<IconProps>> = {
  pickaxe: IconPickaxe,
  rock: IconRock,
  flame: IconFlame,
  shield: IconShield,
  railroad: IconRailroad,
  gem: IconGem,
  storefront: IconStorefront,
  ring: IconRing,
  book: IconBook,
  brain: IconBrain,
};

/** Render a sketch icon by name */
export const SketchIcon = ({ name, ...props }: IconProps & { name: string }) => {
  const Icon = SKETCH_ICON_MAP[name];
  return Icon ? <Icon {...props} /> : null;
};
