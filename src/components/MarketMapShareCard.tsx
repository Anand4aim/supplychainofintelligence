import SublayerGrid from "@/components/SublayerGrid";
import type { VerticalMapData } from "@/data/verticals/legal";

interface Props {
  title: string;
  subtitle?: string;
  dataset: VerticalMapData;
}

/**
 * Fixed-dimension A4-landscape share card used by ExportablePng.exportSlot.
 * Rendered offscreen at 1600×1131 (≈A4 landscape ratio) so every vertical
 * exports to the same LinkedIn-ready dimensions, regardless of how the
 * interactive page is sized.
 *
 * Layout: brand bar → title → subtitle → 10×5 grid → footer attribution.
 */
const MarketMapShareCard = ({ title, subtitle, dataset }: Props) => {
  return (
    <div
      style={{
        width: 1600,
        height: 1131,
        background: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Top brand bar, 10-layer colour spectrum */}
      <div style={{ display: "flex", height: 6, width: "100%" }}>
        {["neg1", "0", "1", "2", "3", "4", "5", "6", "7", "8"].map((n) => (
          <div key={n} style={{ flex: 1, background: `hsl(var(--layer-${n}))` }} />
        ))}
      </div>

      {/* Header */}
      <div
        style={{
          padding: "20px 32px 14px",
          borderBottom: "1px solid hsl(var(--foreground) / 0.08)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "hsl(var(--muted-foreground))",
              marginBottom: 6,
              fontWeight: 600,
            }}
          >
            The Supply Chain of Intelligence™, Vertical Market Map
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 36,
              lineHeight: 1.05,
              fontWeight: 700,
              margin: 0,
              color: "hsl(var(--foreground))",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <div
              style={{
                marginTop: 6,
                fontSize: 13,
                color: "hsl(var(--muted-foreground))",
                maxWidth: 1100,
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "hsl(var(--muted-foreground))",
            }}
          >
            By Anand Arivukkarasu
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "hsl(var(--accent))",
              letterSpacing: "0.04em",
              marginTop: 4,
            }}
          >
            supplychainofai.com
          </div>
        </div>
      </div>

      {/* Grid, fills the remaining space */}
      <div
        style={{
          flex: 1,
          padding: "14px 32px 8px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1, minHeight: 0 }}>
          <SublayerGrid
            data={dataset}
            compact
            hideLayers={["L-1", "L0"]}
          />
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "10px 32px 14px",
          borderTop: "1px solid hsl(var(--foreground) / 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 11,
          color: "hsl(var(--muted-foreground))",
        }}
      >
        <span>
          <strong style={{ color: "hsl(var(--foreground))" }}>How to read:</strong>{" "}
          Each logo = one AI-native company placed on the layer it primarily owns.
          Gold ring = open whitespace. Shaded cell = absorbed feature or horizontal-owned.
        </span>
        <span style={{ fontWeight: 600, letterSpacing: "0.08em" }}>
          {dataset.asOf}
        </span>
      </div>
    </div>
  );
};

export default MarketMapShareCard;
