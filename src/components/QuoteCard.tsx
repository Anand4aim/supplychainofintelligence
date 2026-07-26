import ExportablePng from "@/components/ExportablePng";

export type QuoteCardData = {
  name: string;
  title?: string | null;
  institution?: string | null;
  quote: string;
  document?: string | null;
};

/**
 * Shareable endorsement card. Rendered on screen and exported as a
 * fixed-dimension PNG/PDF via ExportablePng.
 */
const Card = ({ data, fixed = false }: { data: QuoteCardData; fixed?: boolean }) => {
  const attribution = [data.title, data.institution].filter(Boolean).join(", ");
  return (
    <div
      className={
        fixed
          ? "flex h-[1131px] w-[1600px] flex-col justify-between bg-card px-24 py-20"
          : "flex flex-col justify-between rounded-lg border border-border bg-card px-8 py-10"
      }
    >
      <div>
        <div className="flex gap-1" aria-hidden>
          {["-1", "0", "1", "2", "3", "4", "5", "6", "7", "8"].map((l) => (
            <span
              key={l}
              className={fixed ? "h-4 w-16" : "h-2 w-8"}
              style={{ background: `hsl(var(--layer-${l}))` }}
            />
          ))}
        </div>
        <p
          className={`font-serif italic leading-snug text-foreground ${
            fixed ? "mt-16 text-[54px]" : "mt-8 text-2xl md:text-3xl"
          }`}
        >
          “{data.quote}”
        </p>
      </div>

      <div className={fixed ? "mt-20" : "mt-8"}>
        <div className={`h-px w-full bg-border ${fixed ? "mb-10" : "mb-5"}`} />
        <p className={`font-semibold text-foreground ${fixed ? "text-[34px]" : "text-base"}`}>
          {data.name}
        </p>
        {attribution && (
          <p className={`text-muted-foreground ${fixed ? "mt-2 text-[26px]" : "mt-1 text-sm"}`}>
            {attribution}
          </p>
        )}
        <p
          className={`text-muted-foreground ${
            fixed ? "mt-8 text-[22px]" : "mt-4 text-xs"
          } uppercase tracking-[0.18em]`}
        >
          Supply Chain of Intelligence™
          {data.document ? ` · on ${data.document}` : ""} · supplychainofai.com
        </p>
      </div>
    </div>
  );
};

const QuoteCard = ({ data, fileName }: { data: QuoteCardData; fileName: string }) => (
  <ExportablePng fileName={fileName} exportSlot={<Card data={data} fixed />}>
    <Card data={data} />
  </ExportablePng>
);

export default QuoteCard;
