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
  /** Where to position the download button. */
  buttonPlacement?: "top-right" | "top-left";
  /** Background color for the exported PNG. */
  exportBackground?: string;
  /** Where to render the watermark inside the image bounds. */
  watermarkPosition?: "bottom-right" | "bottom-left";
  /** Optional className for wrapper. */
  className?: string;
}

/**
 * Wraps a visual block and provides a watermarked PNG export.
 *
 * The watermark sits *inside* the image bounds (bottom corner, always
 * visible) — so both downloads AND screenshots carry attribution. The
 * download button is the only thing stripped from the captured PNG (via the
 * data-export-hide attribute + html-to-image filter).
 */
const ExportablePng = ({
  children,
  fileName,
  caption,
  buttonPlacement = "top-right",
  exportBackground = "hsl(var(--background))",
  watermarkPosition = "bottom-right",
  className = "",
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

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
      });
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

  const buttonPos =
    buttonPlacement === "top-left" ? "left-3 md:left-4" : "right-3 md:right-4";
  const watermarkPos =
    watermarkPosition === "bottom-left"
      ? "left-3 md:left-4 items-start"
      : "right-3 md:right-4 items-end";

  return (
    <div className={`relative group ${className}`}>
      <button
        data-export-hide
        onClick={handleDownload}
        disabled={busy}
        aria-label="Download as watermarked PNG"
        className={`absolute top-3 md:top-4 ${buttonPos} z-30 inline-flex items-center gap-1.5 text-[11px] font-mono-marker tracking-[0.15em] uppercase bg-background/90 backdrop-blur border border-foreground/15 rounded-md px-2.5 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 disabled:opacity-50`}
      >
        {done ? <Check size={12} /> : <Download size={12} />}
        {busy ? "..." : done ? "Saved" : "PNG"}
      </button>

      {/*
        The ref wraps BOTH the content and the watermark band, so the
        watermark is baked into the exported PNG as part of the image
        composition (not an overlay floating outside it).
      */}
      <div
        ref={ref}
        style={{ background: exportBackground }}
        className="relative overflow-hidden rounded-2xl"
      >
        {/*
          Inline watermark band — flows at the TOP of the ref container so
          it reads as part of the card and never overlaps content.
        */}
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

        {children}
      </div>
    </div>
  );
};

export default ExportablePng;
