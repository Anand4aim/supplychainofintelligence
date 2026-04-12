import React from "react";

/**
 * Highlighter marker effect — cyan brush stroke behind text.
 * Mimics the real sketchnote highlight pen look.
 */
export const SketchHighlight = ({
  children,
  color = "cyan",
  className = "",
}: {
  children: React.ReactNode;
  color?: "cyan" | "yellow" | "pink" | "green" | string;
  className?: string;
}) => {
  const colors: Record<string, string> = {
    cyan: "rgba(0, 200, 220, 0.18)",
    yellow: "rgba(255, 210, 0, 0.22)",
    pink: "rgba(255, 100, 130, 0.15)",
    green: "rgba(80, 200, 120, 0.18)",
  };
  const bg = colors[color] || color;

  return (
    <span className={`relative inline ${className}`}>
      <span
        className="absolute -left-1 -right-1 bottom-0 -z-10"
        style={{
          background: bg,
          height: "45%",
          transform: "rotate(-0.8deg) skewX(-3deg)",
          borderRadius: "2px 4px 3px 2px",
        }}
      />
      <span className="relative">{children}</span>
    </span>
  );
};

/**
 * Speech bubble — hand-drawn wobbly border with tail.
 */
export const SketchBubble = ({
  children,
  className = "",
  tail = "bottom-left",
  accentColor = "hsl(189 75% 40%)",
}: {
  children: React.ReactNode;
  className?: string;
  tail?: "bottom-left" | "bottom-right" | "top-left" | "left";
  accentColor?: string;
}) => {
  const tailPaths: Record<string, string> = {
    "bottom-left": "M25 95 L10 115 L40 98",
    "bottom-right": "M165 95 L180 115 L150 98",
    "top-left": "M25 5 L10 -15 L40 2",
    left: "M5 40 L-15 35 L2 55",
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
        style={{ filter: "url(#sketch-wobble)" }}
      >
        <rect
          x="3" y="3" width="194" height="94" rx="14"
          fill="white"
          stroke={accentColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={tailPaths[tail]}
          fill="white"
          stroke={accentColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="relative px-5 py-4">{children}</div>
    </div>
  );
};

/**
 * Big word emphasis — renders text HUGE with optional rotation.
 * Core sketchnote technique for visual hierarchy.
 */
export const SketchBigWord = ({
  children,
  className = "",
  rotate = 0,
  color,
  size = "4xl",
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  color?: string;
  size?: "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
}) => {
  const sizes: Record<string, string> = {
    "2xl": "text-2xl md:text-3xl",
    "3xl": "text-3xl md:text-4xl",
    "4xl": "text-4xl md:text-5xl",
    "5xl": "text-5xl md:text-6xl",
    "6xl": "text-6xl md:text-7xl",
  };

  return (
    <span
      className={`font-sketch font-bold inline-block ${sizes[size]} ${className}`}
      style={{
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        color,
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
};

/**
 * Doodle divider — wavy hand-drawn line between sections.
 */
export const SketchDivider = ({
  className = "",
  color = "hsl(25 12% 80%)",
  width = "100%",
}: {
  className?: string;
  color?: string;
  width?: string;
}) => (
  <div className={`flex justify-center ${className}`} style={{ width }}>
    <svg
      className="w-full h-4"
      viewBox="0 0 400 16"
      preserveAspectRatio="none"
      style={{ filter: "url(#sketch-wobble)" }}
    >
      <path
        d="M0 8 C30 3, 50 13, 80 8 C110 3, 130 13, 160 8 C190 3, 210 13, 240 8 C270 3, 290 13, 320 8 C350 3, 370 13, 400 8"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

/**
 * Scattered wrapper — applies slight rotation to create organic feel.
 */
export const SketchScatter = ({
  children,
  className = "",
  rotate = 0,
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
}) => (
  <div
    className={`${className}`}
    style={{
      transform: `rotate(${rotate}deg)`,
      transition: "transform 0.3s ease",
    }}
  >
    {children}
  </div>
);

/**
 * Annotation arrow with label — like margin notes in a sketchnote.
 */
export const SketchAnnotation = ({
  children,
  className = "",
  position = "right",
}: {
  children: React.ReactNode;
  className?: string;
  position?: "right" | "left" | "top";
}) => (
  <span
    className={`font-sketch text-sm font-bold inline-flex items-center gap-1 ${className}`}
    style={{ color: "hsl(189 75% 35%)" }}
  >
    {position === "left" && (
      <svg width="20" height="12" viewBox="0 0 20 12" style={{ filter: "url(#sketch-wobble)" }}>
        <path d="M18 6 C12 4, 8 8, 2 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 2 L1 6 L6 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )}
    {children}
    {position === "right" && (
      <svg width="20" height="12" viewBox="0 0 20 12" style={{ filter: "url(#sketch-wobble)" }}>
        <path d="M2 6 C8 4, 12 8, 18 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 2 L19 6 L14 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )}
  </span>
);
