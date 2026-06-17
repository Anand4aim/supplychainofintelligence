import { SketchBox, SketchLabel } from "@/components/sketch/SketchElements";

/**
 * AuthorNote — an editorial-register callout box. Drop into any page
 * (including reference pages) when Anand's personal voice should break
 * through the surrounding copy. Bounded so the register switch is
 * intentional and does not bleed into adjacent content.
 *
 * Usage:
 *   <AuthorNote>Here's the bit I actually believe.</AuthorNote>
 *   <AuthorNote label="Anand, off the record">…</AuthorNote>
 *
 * In post bodies, the `^^ ` line prefix in posts.ts renders as one of
 * these automatically — see src/pages/PostDetail.tsx.
 */
interface AuthorNoteProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
}

const AuthorNote = ({
  children,
  label = "Anand's note",
  className = "",
}: AuthorNoteProps) => {
  return (
    <div className={`my-8 ${className}`}>
      <SketchBox
        color="hsl(0 65% 48% / 0.55)"
        fill="hsl(40 30% 97%)"
        className="px-5 py-4 md:px-6 md:py-5"
      >
        <div className="flex items-start gap-3">
          <span
            className="font-sketch flex-shrink-0 mt-0.5"
            style={{
              color: "hsl(0 65% 48%)",
              fontSize: "15px",
              fontWeight: 500,
              transform: "rotate(-2deg)",
            }}
          >
            {label} →
          </span>
          <div
            className="font-sketch text-[17px] md:text-[18px] leading-[1.55] text-foreground/85"
            style={{ fontWeight: 500 }}
          >
            {children}
          </div>
        </div>
      </SketchBox>
    </div>
  );
};

export default AuthorNote;
