import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import { CHANGELOG, type ChangelogKind } from "@/data/changelog";

const KIND_LABEL: Record<ChangelogKind, string> = {
  framework: "Framework",
  map: "Map",
  verdict: "Verdict",
  prediction: "Prediction",
  site: "Site",
};

const KIND_COLOR: Record<ChangelogKind, string> = {
  framework: "hsl(var(--layer-2))",
  map: "hsl(var(--layer-5))",
  verdict: "hsl(var(--layer-7))",
  prediction: "hsl(var(--layer-6))",
  site: "hsl(var(--layer-0))",
};

const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric", timeZone: "UTC",
  });

const Changelog = () => (
  <SiteLayout>
    <Seo
      title="Changelog, Every Re-review, Re-grade, and Framework Bump"
      description="Public revision log for the Supply Chain of Intelligence™. Every map re-review, verdict change, and Paper revision is recorded here."
      path="/changelog"
    />
    <section className="bg-background border-b border-foreground/10">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <Eyebrow>Public Revision Log</Eyebrow>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-[1.05] mt-3 mb-4">
          Changelog.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Every re-review of a Map, every re-grade of a company, every revision
          of the Paper is recorded here in plain text. If a living surface
          changes without an entry on this page, that's a bug, please flag it.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          See <Link to="/methodology" className="text-accent hover:underline">the methodology</Link>{" "}
          for the two-register editorial contract.
        </p>
      </div>
    </section>

    <section className="bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        {CHANGELOG.map((entry, i) => (
          <article
            key={i}
            className="border-l-2 pl-5 py-1"
            style={{ borderColor: KIND_COLOR[entry.kind] }}
          >
            <div className="flex items-center gap-3 mb-1.5">
              <span
                className="font-mono-marker text-[10px] tracking-wider uppercase px-2 py-0.5 border"
                style={{ color: KIND_COLOR[entry.kind], borderColor: KIND_COLOR[entry.kind] + "55" }}
              >
                {KIND_LABEL[entry.kind]}
              </span>
              <time className="font-mono-marker text-[11px] text-muted-foreground">
                {fmtDate(entry.date)}
              </time>
            </div>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">
              {entry.title}
            </h2>
            <p className="text-[15px] text-foreground/80 leading-relaxed">
              {entry.body}
            </p>
            {entry.links && entry.links.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {entry.links.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    className="font-mono-marker text-[11px] tracking-wider uppercase text-accent hover:underline"
                  >
                    {l.label} →
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  </SiteLayout>
);

export default Changelog;
