import React from "react";

/**
 * SVG filter that adds hand-drawn wobble to strokes.
 * Consistent, subtle wobble — educational, not chaotic.
 */
export const SketchFilters = () => (
  <svg className="absolute w-0 h-0" aria-hidden="true">
    <defs>
      <filter id="sketch-wobble">
        <feTurbulence type="turbulence" baseFrequency="0.012" numOctaves="3" seed="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" />
      </filter>
    </defs>
  </svg>
);

/**
 * Whiteboard wrapper — warm paper background with subtle sketch feel.
 */
export const SketchBoard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`sketch-board relative rounded-2xl overflow-hidden ${className}`}
    style={{
      background: "linear-gradient(145deg, hsl(40 30% 97%) 0%, hsl(38 28% 95%) 60%, hsl(40 30% 96%) 100%)",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      border: "1px solid hsl(35 20% 88%)",
    }}
  >
    {/* Paper grid dots */}
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(circle, hsl(25 15% 30%) 0.5px, transparent 0.5px)",
        backgroundSize: "24px 24px",
      }}
    />
    <div className="relative">{children}</div>
  </div>
);

/**
 * Sketch arrow — consistent 2px stroke, red accent
 */
export const SketchArrow = ({
  direction = "right",
  className = "",
  size = 40,
}: {
  direction?: "right" | "down" | "left";
  className?: string;
  size?: number;
}) => {
  const rotation = direction === "down" ? 90 : direction === "left" ? 180 : 0;
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 60 36"
      className={className}
      style={{ transform: `rotate(${rotation}deg)`, filter: "url(#sketch-wobble)" }}
    >
      <path
        d="M4 18 C12 16, 28 14, 42 17 C44 17.5, 46 18, 48 18"
        fill="none"
        stroke="hsl(0 65% 48%)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 10 L50 18 L42 26"
        fill="none"
        stroke="hsl(0 65% 48%)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Sketch circle — hand-drawn emphasis circle, consistent 1.5px stroke
 */
export const SketchCircle = ({
  children,
  className = "",
  color = "hsl(0 65% 48%)",
}: {
  children?: React.ReactNode;
  className?: string;
  color?: string;
}) => (
  <span className={`relative inline-block ${className}`}>
    <svg
      className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)]"
      viewBox="0 0 100 60"
      preserveAspectRatio="none"
      style={{ filter: "url(#sketch-wobble)" }}
    >
      <ellipse
        cx="50" cy="30" rx="46" ry="24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
    <span className="relative">{children}</span>
  </span>
);

/**
 * Sketch underline — wavy hand-drawn underline, consistent 1.5px
 */
export const SketchUnderline = ({
  children,
  className = "",
  color = "hsl(0 65% 48%)",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) => (
  <span className={`relative inline-block ${className}`}>
    <span className="relative">{children}</span>
    <svg
      className="absolute -bottom-1 left-0 w-full h-2"
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
      style={{ filter: "url(#sketch-wobble)" }}
    >
      <path
        d="M2 5 C20 2, 30 7, 50 4 C70 1, 80 6, 98 3"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

/**
 * Sketch box — hand-drawn rectangle border, consistent 1.5px
 */
export const SketchBox = ({
  children,
  className = "",
  color = "hsl(25 12% 70%)",
  fill = "transparent",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
  fill?: string;
}) => (
  <div className={`relative ${className}`}>
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 100"
      preserveAspectRatio="none"
      style={{ filter: "url(#sketch-wobble)" }}
    >
      <rect
        x="3" y="3" width="194" height="94" rx="6"
        fill={fill}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <div className="relative">{children}</div>
  </div>
);

/**
 * Sketch label — Caveat annotation, consistent sizing
 */
export const SketchLabel = ({
  children,
  className = "",
  color = "hsl(25 6% 55%)",
  rotate = 0,
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
  rotate?: number;
}) => (
  <span
    className={`sketch-label inline-block font-sketch text-[12px] tracking-wide ${className}`}
    style={{
      color,
      fontWeight: 500,
      transform: rotate ? `rotate(${rotate}deg)` : undefined,
    }}
  >
    {children}
  </span>
);

/**
 * Sketch connector — line with optional arrow, consistent 1.5px
 */
export const SketchConnector = ({
  className = "",
  vertical = false,
  length = 40,
  label,
}: {
  className?: string;
  vertical?: boolean;
  length?: number;
  label?: string;
}) => (
  <div className={`flex items-center justify-center ${vertical ? "flex-col" : "flex-row"} ${className}`}>
    <svg
      width={vertical ? 20 : length}
      height={vertical ? length : 20}
      viewBox={`0 0 ${vertical ? 20 : length} ${vertical ? length : 20}`}
      style={{ filter: "url(#sketch-wobble)" }}
    >
      {vertical ? (
        <>
          <line x1="10" y1="2" x2="10" y2={length - 8} stroke="hsl(25 6% 72%)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" />
          <path d={`M6 ${length - 12} L10 ${length - 4} L14 ${length - 12}`} fill="none" stroke="hsl(0 65% 48%)" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="2" y1="10" x2={length - 8} y2="10" stroke="hsl(25 6% 72%)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" />
          <path d={`M${length - 12} 6 L${length - 4} 10 L${length - 12} 14`} fill="none" stroke="hsl(0 65% 48%)" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
    {label && (
      <SketchLabel className="mx-1" color="hsl(0 65% 48%)">{label}</SketchLabel>
    )}
  </div>
);