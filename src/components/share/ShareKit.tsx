import { useState } from "react";
import { Check, Copy, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import Eyebrow from "@/components/Eyebrow";
import ShareHero, { type ShareHeroProps } from "@/components/share/ShareHero";
import BattleCard, { type BattleCardProps } from "@/components/share/BattleCard";
import type { PulseDoc } from "@/lib/pulseText";

interface Props {
  /** Short feed post text (150-250 words). */
  feedPost: string;
  /** Long-form Pulse document: rich HTML flavour + plain-text fallback. */
  pulseArticle: PulseDoc;
  /** Props for the hero image, minus the shape/fileName which are set here. */
  hero: Omit<ShareHeroProps, "shape" | "fileName">;
  /** Optional battle-card data: who moves where, who gains, who is exposed. */
  battle?: Omit<BattleCardProps, "shape" | "fileName">;
  /** Slug used for image filenames. */
  slug: string;
}

type Tab = "feed" | "pulse";

/**
 * Copies rich text when `html` is given. Pulse keeps h2 / bold / italic /
 * blockquote / lists from a text/html clipboard flavour, and falls back to the
 * plain flavour anywhere that strips formatting.
 */
const CopyButton = ({
  text,
  html,
  label,
  note,
}: {
  text: string;
  html?: string;
  label: string;
  note: string;
}) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          if (html && typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
            await navigator.clipboard.write([
              new ClipboardItem({
                "text/html": new Blob([html], { type: "text/html" }),
                "text/plain": new Blob([text], { type: "text/plain" }),
              }),
            ]);
          } else {
            await navigator.clipboard.writeText(text);
          }
          setCopied(true);
          toast.success("Copied", { description: note });
          setTimeout(() => setCopied(false), 2200);
        } catch {
          toast.error("Couldn't access clipboard");
        }
      }}
      className="inline-flex items-center gap-2 text-sm font-semibold text-foreground border border-foreground/20 rounded-md px-3 py-1.5 hover:bg-foreground hover:text-background transition-colors"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copied" : label}
    </button>
  );
};


/**
 * ShareKit, the three-artifact distribution block:
 *   1. Hero image (wide for the article header, square for the feed)
 *   2. Short feed post
 *   3. Full "detailed article" for LinkedIn Pulse (tables stripped, sections kept)
 */
const ShareKit = ({ feedPost, pulseArticle, hero, battle, slug }: Props) => {
  const [tab, setTab] = useState<Tab>("feed");
  const [shape, setShape] = useState<"wide" | "square">("wide");
  const [card, setCard] = useState<"hero" | "battle">(battle ? "battle" : "hero");

  return (
    <section className="mt-14 pt-10 border-t border-foreground/10">
      <Eyebrow className="mb-2">Share kit</Eyebrow>
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        Take this to LinkedIn
      </h2>
      <p className="text-[15px] text-muted-foreground mb-6 max-w-2xl">
        Three artifacts, one argument. The image carries the diagram, the short post stops the
        scroll, and the detailed article copies as rich text, so headings, bold lead-ins, italic
        standfirsts, pull-quotes and bulleted lists land in LinkedIn's Pulse editor already
        styled. No markdown markers, no tables, nothing to reformat by hand.
      </p>

      {/* Hero image */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <ImageIcon size={13} className="text-muted-foreground" />
          <span className="font-mono-marker text-[10px] tracking-[0.14em] uppercase text-muted-foreground mr-1">
            Hero image
          </span>
          {battle &&
            (["hero", "battle"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCard(c)}
                className={`font-mono-marker text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 border rounded ${
                  card === c
                    ? "bg-foreground text-background border-foreground"
                    : "border-foreground/20 text-muted-foreground hover:text-foreground"
                }`}
              >
                {c === "hero" ? "Headline" : "Battle card"}
              </button>
            ))}
          <span className="w-px h-4 bg-foreground/15 mx-1" />
          {(["wide", "square"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setShape(s)}
              className={`font-mono-marker text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 border rounded ${
                shape === s
                  ? "bg-foreground text-background border-foreground"
                  : "border-foreground/20 text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "wide" ? "1200×627" : "1:1 feed"}
            </button>
          ))}
        </div>
        {battle && card === "battle" ? (
          <BattleCard {...battle} shape={shape} fileName={`scoi-${slug}-battle-${shape}`} />
        ) : (
          <ShareHero {...hero} shape={shape} fileName={`scoi-${slug}-${shape}`} />
        )}
        <p className="font-sketch text-[13px] text-muted-foreground mt-2" style={{ fontWeight: 500 }}>
          ↑ hover the card and hit PNG to download
        </p>
      </div>

      {/* Text tabs */}
      <div className="flex items-center gap-2 mb-3">
        {([
          ["feed", "Short post"],
          ["pulse", "Detailed article (Pulse)"],
        ] as const).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`font-mono-marker text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 border rounded ${
              tab === k
                ? "bg-foreground text-background border-foreground"
                : "border-foreground/20 text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-card border border-foreground/10 rounded-md">
        {tab === "feed" ? (
          <pre className="p-5 text-[13.5px] leading-[1.7] text-foreground/85 whitespace-pre-wrap font-body max-h-[420px] overflow-auto">
            {feedPost}
          </pre>
        ) : (
          <div
            className="pulse-preview p-5 text-[14px] leading-[1.7] text-foreground/85 font-body max-h-[520px] overflow-auto"
            dangerouslySetInnerHTML={{ __html: pulseArticle.html }}
          />
        )}
        <div className="border-t border-foreground/10 px-5 py-3 flex flex-wrap items-center gap-3">
          <CopyButton
            text={tab === "feed" ? feedPost : pulseArticle.text}
            html={tab === "pulse" ? pulseArticle.html : undefined}
            label={tab === "feed" ? "Copy feed post" : "Copy formatted article"}
            note={
              tab === "feed"
                ? "Paste straight into LinkedIn. Attribution included."
                : "Rich text copied. Headings, bold, quotes and lists survive the paste into Pulse."
            }
          />
          <span className="text-[12px] text-muted-foreground">
            {tab === "feed"
              ? "Paste into “Start a post”, attach the square image."
              : "Paste into “Write article”, use the 1200×627 image as the cover. Formatting comes across as-is."}
          </span>
        </div>
      </div>

    </section>
  );
};

export default ShareKit;
