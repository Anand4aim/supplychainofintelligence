import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, AlertTriangle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LayerTag from "@/components/LayerTag";
import CopySnippet from "@/components/CopySnippet";
import { LAYERS } from "@/data/layers";
import type { GlossaryTerm } from "@/data/glossary";
import { GLOSSARY_BY_ID } from "@/data/glossary";

interface Props {
  term: GlossaryTerm;
  defaultOpen?: boolean;
}

const layerSlug = (layerId: string) => {
  const l = LAYERS.find((x) => x.id === layerId);
  if (!l) return "";
  return `${l.id.toLowerCase()}-${l.shortName.toLowerCase().replace(/\s+/g, "-")}`;
};

const CATEGORY_LABELS: Record<string, string> = {
  marketing: "Marketing word",
  technical: "Technical",
  industry: "Industry",
  framework: "Framework",
};

const GlossaryCard = ({ term, defaultOpen = false }: Props) => {
  const [open, setOpen] = useState(defaultOpen);
  const primarySlug = layerSlug(term.primaryLayer.replace(/[a-z]$/, ""));

  return (
    <article
      id={term.id}
      className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent/40 transition-colors scroll-mt-24"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="font-mono-marker text-[10px] uppercase tracking-wider text-muted-foreground">
              {CATEGORY_LABELS[term.category]}
            </span>
            <span className="text-muted-foreground/40">·</span>
            <div className="flex gap-1 flex-wrap">
              {term.layerMapping.map((id) => (
                <LayerTag key={id} id={id} variant="chip" />
              ))}
            </div>
          </div>
          <h3 className="font-display text-xl font-bold text-foreground leading-tight">{term.term}</h3>
          <p className="text-[15px] text-foreground/75 leading-snug mt-1.5">{term.shortDef}</p>
        </div>
        <ChevronDown
          size={20}
          className={`text-muted-foreground shrink-0 mt-1 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-border/60 space-y-4">
              <p className="text-[15px] text-foreground/85 leading-[1.75]">{term.longDef}</p>

              {term.commonMistake && (
                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3.5 flex gap-2.5">
                  <AlertTriangle size={16} className="text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono-marker text-[10px] uppercase tracking-wider text-destructive mb-1">
                      Common mis-mapping
                    </p>
                    <p className="text-[14px] text-foreground/85 leading-snug">{term.commonMistake}</p>
                  </div>
                </div>
              )}

              {term.examples.length > 0 && (
                <div>
                  <p className="font-mono-marker text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
                    Examples
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {term.examples.map((ex) => (
                      <span
                        key={ex}
                        className="text-[13px] bg-secondary/60 border border-border px-2.5 py-1 rounded-md text-foreground/80"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {term.aliases.length > 0 && (
                <div>
                  <p className="font-mono-marker text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
                    Also called
                  </p>
                  <p className="text-[13px] text-foreground/70 italic">{term.aliases.join(" · ")}</p>
                </div>
              )}

              <div className="bg-secondary/40 border border-border rounded-lg p-3.5">
                <p className="font-mono-marker text-[10px] uppercase tracking-wider text-accent mb-1.5">
                  Citation-ready
                </p>
                <p className="text-[14px] text-foreground/85 leading-snug italic mb-2.5">"{term.citation}"</p>
                <CopySnippet text={term.citation} path={`/glossary#${term.id}`} label="Copy citation" variant="quote" />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                {primarySlug && (
                  <Link
                    to={`/framework/${primarySlug}`}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:underline"
                  >
                    Read {term.primaryLayer.replace(/[a-z]$/, "")} in depth <ArrowRight size={13} />
                  </Link>
                )}
                {term.seeAlso && term.seeAlso.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono-marker text-[10px] uppercase tracking-wider text-muted-foreground">
                      See also
                    </span>
                    {term.seeAlso.map((id) => {
                      const t = GLOSSARY_BY_ID[id];
                      if (!t) return null;
                      return (
                        <a
                          key={id}
                          href={`#${id}`}
                          className="text-[12px] px-2 py-0.5 border border-border rounded-full text-foreground/75 hover:text-accent hover:border-accent/40 transition-colors"
                        >
                          {t.term}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default GlossaryCard;
