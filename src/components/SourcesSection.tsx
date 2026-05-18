import { ExternalLink, FileText, Newspaper, BookOpen, Search } from "lucide-react";
import { PREDICTIONS } from "@/data/predictions";
import ReportCitationDialog from "./ReportCitationDialog";

/**
 * Sources & Citations — aggregated public-source list for every call
 * on the Board. Each prediction's `sources[]` is shown grouped under
 * its subject. Honest sourcing is part of the framework's credibility.
 */

const KIND_META = {
  primary: { Icon: FileText, label: "Primary", color: "hsl(var(--layer-1))" },
  news: { Icon: Newspaper, label: "News", color: "hsl(var(--layer-4))" },
  reference: { Icon: BookOpen, label: "Reference", color: "hsl(var(--layer-7))" },
  search: { Icon: Search, label: "Search", color: "hsl(var(--layer-5))" },
} as const;

const SourcesSection = () => {
  const entries = PREDICTIONS.filter((p) => p.sources && p.sources.length).sort(
    (a, b) => (a.subject < b.subject ? -1 : 1),
  );
  const totalSources = entries.reduce((n, p) => n + (p.sources?.length ?? 0), 0);

  return (
    <section className="mt-16" id="sources">
      <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
            Sources &amp; citations
          </h2>
          <p className="mt-2 text-foreground/65 text-[14px] leading-relaxed max-w-2xl">
            Every call on the Board is grounded in publicly reported
            information. {totalSources} citations across {entries.length}{" "}
            companies — company posts (Primary), press coverage (News), stable
            reference pages (Reference), and live news searches (Search) for
            ongoing stories. Deeper sourcing lives inside each linked case
            study.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          {(Object.keys(KIND_META) as (keyof typeof KIND_META)[]).map((k) => {
            const m = KIND_META[k];
            const Icon = m.Icon;
            return (
              <span
                key={k}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-mono-marker"
                style={{ background: `${m.color.replace(")", " / 0.1)")}`, color: m.color }}
              >
                <Icon size={10} /> {m.label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
        {entries.map((p) => (
          <div key={p.id} className="border-l-2 border-foreground/15 pl-4">
            <a
              href={`#${p.id}`}
              className="font-display text-[15.5px] font-semibold text-foreground hover:text-accent transition-colors"
            >
              {p.subject}
            </a>
            <ul className="mt-2 space-y-1.5">
              {p.sources!.map((s, i) => {
                const meta = KIND_META[s.kind ?? "news"];
                const Icon = meta.Icon;
                return (
                  <li key={i} className="text-[13px] leading-snug flex items-start gap-2">
                    <Icon
                      size={11}
                      className="mt-1 shrink-0"
                      style={{ color: meta.color }}
                      aria-hidden
                    />
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/75 hover:text-accent hover:underline underline-offset-2 inline-flex items-baseline gap-1 group flex-1 min-w-0"
                    >
                      <span className="truncate">{s.label}</span>
                      <ExternalLink
                        size={10}
                        className="opacity-50 group-hover:opacity-100 transition-opacity translate-y-[1px] shrink-0"
                      />
                    </a>
                    <span className="mt-[3px] shrink-0">
                      <ReportCitationDialog
                        subjectId={p.id}
                        subject={p.subject}
                        sourceUrl={s.url}
                        sourceLabel={s.label}
                      />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-8 text-[12px] text-foreground/55 italic leading-relaxed">
        Spotted a broken link or wrong source? Click the small flag next to
        any citation to report it — or see the{" "}
        <a href="/disclaimer" className="text-accent hover:underline">
          Disclaimer
        </a>{" "}
        page. Corrections applied promptly.
      </p>
    </section>
  );
};

export default SourcesSection;
