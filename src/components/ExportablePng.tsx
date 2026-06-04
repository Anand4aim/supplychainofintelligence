import { useRef, useState } from "react";
import { Download, Check, FileText } from "lucide-react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

interface Props {
  children: React.ReactNode;
  /** Filename without extension. */
  fileName: string;
  /** Optional title rendered into the corner watermark (e.g. "Sales & Marketing Tech — Layer Matrix"). */
  caption?: string;
  /**
   * Optional fixed-dimension share card rendered offscreen and rasterized
   * on export. When provided, the export captures THIS instead of the
   * visible children — producing a consistent A4-landscape PNG/PDF that's
   * LinkedIn-friendly regardless of how the page looks on screen.
   */
  exportSlot?: React.ReactNode;
  /** Where to position the download button. */
  buttonPlacement?: "top-right" | "top-left";
  /** Background color for the exported PNG. */
  exportBackground?: string;
  /** Optional className for wrapper. */
  className?: string;
}

const SHARE_W = 1600;
const SHARE_H = 1131; // A4 landscape ratio (~1.414)

/**
 * Wraps a visual block with PNG / PDF export.
 *
 * - Visible content = `children`, rendered normally for interactive use.
 * - Exported content = `exportSlot` if provided (fixed A4-landscape share
 *   card rendered offscreen), otherwise `children`.
 */
const ExportablePng = ({
  children,
  fileName,
  caption,
  exportSlot,
  buttonPlacement = "top-right",
  exportBackground = "hsl(var(--background))",
  className = "",
}: Props) => {
  const childRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<false | "png" | "pdf">(false);
  const [done, setDone] = useState<false | "png" | "pdf">(false);

  const rasterize = async () => {
    const target = exportSlot ? exportRef.current : childRef.current;
    if (!target) throw new Error("no ref");
    target.setAttribute("data-exporting", "true");
    await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));

    try {
      return await toPng(target, {
        pixelRatio: 2,
        backgroundColor: exportBackground,
        cacheBust: true,
        skipFonts: true,
        imagePlaceholder:
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
        filter: (node) => {
          if (!(node instanceof HTMLElement)) return true;
          return !node.hasAttribute?.("data-export-hide") && !node.hasAttribute?.("data-export-skip");
        },
      });
    } finally {
      target.removeAttribute("data-exporting");
    }
  };

  const handleDownload = async () => {
    setBusy("png");
    try {
      const dataUrl = await rasterize();
      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
      setDone("png");
      toast.success("PNG downloaded — ready for LinkedIn", {
        description: "A4-landscape, watermarked, single-image.",
      });
      setTimeout(() => setDone(false), 2200);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't export PNG");
    } finally {
      setBusy(false);
    }
  };

  const handleDownloadPdf = async () => {
    setBusy("pdf");
    try {
      const dataUrl = await rasterize();
      const img = new Image();
      img.src = dataUrl;
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
      });
      // If using share card → emit a real A4 landscape PDF (mm units).
      // Otherwise fall back to pixel-sized PDF matching the captured area.
      let pdf: jsPDF;
      if (exportSlot) {
        pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
        pdf.addImage(dataUrl, "PNG", 0, 0, 297, 210);
      } else {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const orientation = w >= h ? "landscape" : "portrait";
        pdf = new jsPDF({ orientation, unit: "px", format: [w, h] });
        pdf.addImage(dataUrl, "PNG", 0, 0, w, h);
      }
      pdf.save(`${fileName}.pdf`);
      setDone("pdf");
      toast.success("PDF downloaded — A4 landscape");
      setTimeout(() => setDone(false), 2200);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't export PDF");
    } finally {
      setBusy(false);
    }
  };

  const buttonPos =
    buttonPlacement === "top-left" ? "left-3 md:left-4" : "right-3 md:right-4";

  const btnCls = `inline-flex items-center gap-1.5 text-[11px] font-mono-marker tracking-[0.15em] uppercase bg-background/90 backdrop-blur border border-foreground/15 rounded-md px-2.5 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 disabled:opacity-50`;

  return (
    <div className={`relative group ${className}`}>
      <style>{`
        [data-exporting="true"] [data-export-logo-fallback] { display: inline-flex !important; }
        [data-exporting="true"] [data-export-logo-img] { display: none !important; }
      `}</style>

      {/* Download buttons (hidden in any rasterized output) */}
      <div
        data-export-hide
        className={`absolute top-3 md:top-4 ${buttonPos} z-30 flex items-center gap-2`}
      >
        <button
          onClick={handleDownload}
          disabled={!!busy}
          aria-label="Download as PNG"
          className={btnCls}
        >
          {done === "png" ? <Check size={12} /> : <Download size={12} />}
          {busy === "png" ? "..." : done === "png" ? "Saved" : "PNG"}
        </button>
        <button
          onClick={handleDownloadPdf}
          disabled={!!busy}
          aria-label="Download as PDF"
          className={btnCls}
        >
          {done === "pdf" ? <Check size={12} /> : <FileText size={12} />}
          {busy === "pdf" ? "..." : done === "pdf" ? "Saved" : "PDF"}
        </button>
      </div>

      {/* Visible interactive content */}
      <div ref={childRef} className="relative">
        {!exportSlot && (
          /* Legacy mode: bake a watermark band into the visible content so
             it appears in the exported PNG too. */
          <div
            className="flex items-center justify-between gap-3 px-4 py-2 border-b"
            style={{
              borderColor: "hsl(var(--foreground) / 0.08)",
              background: "hsl(var(--background) / 0.6)",
            }}
            aria-hidden
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-[3px] w-16 md:w-24 rounded-sm overflow-hidden flex-shrink-0">
                {["neg1", "0", "1", "2", "3", "4", "5", "6", "7", "8"].map((n) => (
                  <div key={n} className="flex-1" style={{ background: `hsl(var(--layer-${n}))` }} />
                ))}
              </div>
              {caption && (
                <span
                  className="font-mono-marker text-[10px] md:text-[11px] tracking-[0.12em] uppercase truncate"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {caption}
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1.5 leading-none flex-shrink-0">
              <span
                className="font-mono-marker text-[9px] md:text-[10px] tracking-[0.14em] uppercase"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                SCOI ·
              </span>
              <span
                className="font-mono-marker text-[10px] md:text-[11px] tracking-[0.08em] font-bold"
                style={{ color: "hsl(var(--accent))" }}
              >
                supplychainofai.com
              </span>
            </div>
          </div>
        )}
        {children}
      </div>

      {/* Offscreen share card — only rendered when exportSlot is provided.
          Positioned far off-canvas so it never affects layout but is still
          rasterizable by html-to-image. */}
      {exportSlot && (
        <div
          data-export-hide
          aria-hidden
          style={{
            position: "fixed",
            left: "-20000px",
            top: 0,
            width: `${SHARE_W}px`,
            height: `${SHARE_H}px`,
            pointerEvents: "none",
            zIndex: -1,
          }}
        >
          <div
            ref={exportRef}
            style={{
              width: `${SHARE_W}px`,
              height: `${SHARE_H}px`,
              background: exportBackground,
              overflow: "hidden",
            }}
          >
            {exportSlot}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportablePng;
