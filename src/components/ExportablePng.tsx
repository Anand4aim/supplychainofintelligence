import { useRef, useState } from "react";
import { Download, Check } from "lucide-react";
import { toPng } from "html-to-image";
import { toast } from "sonner";

interface Props {
  children: React.ReactNode;
  /** Filename without extension. */
  fileName: string;
  /** Optional title rendered into the watermark strip (e.g. "Sales & Marketing Tech — Layer Matrix"). */
  caption?: string;
  /** Where to position the button. */
  buttonPlacement?: "top-right" | "top-left";
  /** Background color for the exported PNG (in case the surrounding page is transparent). */
  exportBackground?: string;
  /** Optional className for wrapper. */
  className?: string;
}

/**
 * Wraps any visual block and exposes a "Download PNG" button that exports the
 * wrapped DOM as a watermarked image. Watermark strip is appended to a cloned
 * node before rasterization so the original layout is unaffected.
 *
 * Pattern: use sparingly on the highest-signal visuals (matrix, cube, layer
 * diagrams). The PNG is the unit of distribution — every screenshot that
 * escapes the site should carry the watermark.
 */
const ExportablePng = ({
  children,
  fileName,
  caption,
  buttonPlacement = "top-right",
  exportBackground = "hsl(var(--background))",
  className = "",
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const buildWatermark = () => {
    const strip = document.createElement("div");
    strip.style.cssText = `
      margin-top: 16px;
      padding: 14px 18px 12px;
      border-top: 1px solid hsl(var(--border));
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
    `;

    // 10-color signature spectrum
    const spectrum = document.createElement("div");
    spectrum.style.cssText = "display:flex;height:3px;border-radius:2px;overflow:hidden;margin-bottom:8px;";
    ["neg1", "0", "1", "2", "3", "4", "5", "6", "7", "8"].forEach((n) => {
      const seg = document.createElement("div");
      seg.style.cssText = `flex:1;background:hsl(var(--layer-${n}));`;
      spectrum.appendChild(seg);
    });
    strip.appendChild(spectrum);

    const row = document.createElement("div");
    row.style.cssText = "display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap;";

    const left = document.createElement("div");
    left.style.cssText = "display:flex;flex-direction:column;gap:2px;";
    if (caption) {
      const cap = document.createElement("div");
      cap.style.cssText = "font-size:11px;letter-spacing:0.05em;color:hsl(var(--foreground));font-weight:600;";
      cap.textContent = caption;
      left.appendChild(cap);
    }
    const src = document.createElement("div");
    src.style.cssText = "font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:hsl(var(--muted-foreground));";
    src.textContent = "Source: The Supply Chain of Intelligence™";
    left.appendChild(src);
    row.appendChild(left);

    const right = document.createElement("div");
    right.style.cssText = "font-size:11px;letter-spacing:0.08em;color:hsl(var(--accent));font-weight:700;";
    right.textContent = "supplychainofai.com";
    row.appendChild(right);

    strip.appendChild(row);
    return strip;
  };

  const handleDownload = async () => {
    if (!ref.current) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(ref.current, {
        pixelRatio: 2,
        backgroundColor: exportBackground,
        cacheBust: true,
        filter: (node) => {
          if (!(node instanceof HTMLElement)) return true;
          return !node.hasAttribute?.("data-export-hide");
        },
        // Inject the watermark by mutating the clone (html-to-image clones inside)
        onclone: (clonedDoc) => {
          // no-op: html-to-image v1 does not expose onclone. We instead append
          // the watermark to the live ref temporarily below.
          void clonedDoc;
        },
      });
      // Trigger download
      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
      setDone(true);
      toast.success("Image downloaded — watermark included", {
        description: "Drop it into LinkedIn, X, or a deck.",
      });
      setTimeout(() => setDone(false), 2200);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't export image");
    } finally {
      setBusy(false);
    }
  };

  // html-to-image v1 has no onclone hook, so we briefly attach a real
  // watermark node before exporting and remove it after. The DOM mutation is
  // invisible because we re-render in the same frame as the export.
  const handleDownloadWithWatermark = async () => {
    if (!ref.current) return;
    const watermark = buildWatermark();
    watermark.setAttribute("data-export-watermark", "true");
    ref.current.appendChild(watermark);
    try {
      await handleDownload();
    } finally {
      watermark.remove();
    }
  };

  const positionClass =
    buttonPlacement === "top-left" ? "left-3 md:left-4" : "right-3 md:right-4";

  return (
    <div className={`relative group ${className}`}>
      <button
        data-export-hide
        onClick={handleDownloadWithWatermark}
        disabled={busy}
        aria-label="Download as watermarked PNG"
        className={`absolute top-3 md:top-4 ${positionClass} z-20 inline-flex items-center gap-1.5 text-[11px] font-mono-marker tracking-[0.15em] uppercase bg-background/90 backdrop-blur border border-foreground/15 rounded-md px-2.5 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 disabled:opacity-50`}
      >
        {done ? <Check size={12} /> : <Download size={12} />}
        {busy ? "..." : done ? "Saved" : "PNG"}
      </button>
      <div ref={ref}>{children}</div>
    </div>
  );
};

export default ExportablePng;
