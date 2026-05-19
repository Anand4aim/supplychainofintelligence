import { Link } from "react-router-dom";
import { Linkedin, Quote, ArrowRight } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "@/data/testimonials";
import Eyebrow from "@/components/Eyebrow";

/** Color-bucket the initials avatar by stable hash → layer palette. */
const PALETTE_VARS = [
  "--layer-1", "--layer-2", "--layer-3", "--layer-4",
  "--layer-5", "--layer-6", "--layer-7", "--layer-8",
];

const initialsOf = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const avatarVar = (name: string) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return PALETTE_VARS[Math.abs(h) % PALETTE_VARS.length];
};

const VoiceCard = ({ t }: { t: Testimonial }) => {
  const cssVar = avatarVar(t.name);
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col h-full hover:border-accent/40 transition-colors">
      <Quote size={18} className="text-accent/70 mb-3 shrink-0" aria-hidden />
      <p className="text-foreground/85 text-[14px] leading-[1.65] mb-4 flex-1">
        {t.quote}
      </p>
      <div className="flex items-center gap-3 pt-3 border-t border-border/60">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-[13px] shrink-0"
          style={{
            background: `hsl(var(${cssVar}) / 0.15)`,
            color: `hsl(var(${cssVar}))`,
            border: `1px solid hsl(var(${cssVar}) / 0.35)`,
          }}
          aria-hidden
        >
          {initialsOf(t.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="font-display font-bold text-foreground text-[14px] truncate">
              {t.name}
            </p>
            {t.linkedin && (
              <a
                href={t.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors shrink-0"
                aria-label={`${t.name} on LinkedIn`}
              >
                <Linkedin size={12} />
              </a>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground leading-tight truncate">
            {t.role}
            {t.role && t.company ? " · " : ""}
            {t.company}
          </p>
        </div>
        {t.layerTag && (
          <span className="font-mono-marker text-[10px] uppercase tracking-wider text-accent border border-accent/30 px-1.5 py-0.5 rounded shrink-0">
            {t.layerTag}
          </span>
        )}
      </div>
    </div>
  );
};

interface Props {
  limit?: number;
}

/**
 * Editorial "Voices" strip for the homepage and any other entry surface.
 * Renders cards with initials avatars (no scraped photos) and optional
 * LinkedIn icon links. Source data: src/data/testimonials.ts.
 *
 * NOTE: All quotes are pending formal sign-off (approved: false). The strip
 * carries a small "permission pending" disclaimer to stay honest.
 */
const VoicesStrip: React.FC<Props> = ({ limit = 12 }) => {
  const voices = TESTIMONIALS.filter((t) => t.homepage).slice(0, limit);

  return (
    <section className="bg-secondary/30 border-y border-border">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <Eyebrow className="mb-3">Voices on the framework</Eyebrow>
            <h2 className="font-display text-2xl md:text-[34px] font-bold text-foreground leading-tight max-w-2xl">
              Product leaders, founders, and investors using the 10-layer map.
            </h2>
            <p className="text-foreground/70 text-[15px] leading-relaxed mt-3 max-w-2xl">
              Reactions from workshops, 1:1 reviews, and LinkedIn exchanges. Names and
              quotes are listed with permission pending sign-off — not a marketing wall.
            </p>
          </div>
          <Link
            to="/voices"
            className="btn-sketch-outline inline-flex items-center gap-2 text-sm self-start md:self-end shrink-0"
          >
            Read all voices <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {voices.map((t) => (
            <VoiceCard key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoicesStrip;
