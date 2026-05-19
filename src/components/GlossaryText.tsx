import React from "react";
import { Link } from "react-router-dom";
import { GLOSSARY } from "@/data/glossary";

// Build a single ranked match table once. Longest phrases first so
// "Foundation Model" beats "Model", "AI Agent" beats "Agent", etc.
type Entry = { needle: string; id: string };
const ENTRIES: Entry[] = GLOSSARY.flatMap((g) => [
  { needle: g.term, id: g.id },
  ...g.aliases.map((a) => ({ needle: a, id: g.id })),
])
  .filter((e) => e.needle.length >= 3)
  .sort((a, b) => b.needle.length - a.needle.length);

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Single combined regex with word boundaries, case-insensitive.
const PATTERN = new RegExp(
  `\\b(?:${ENTRIES.map((e) => escapeRe(e.needle)).join("|")})\\b`,
  "gi",
);

const lookup = (matched: string): string | null => {
  const lower = matched.toLowerCase();
  for (const e of ENTRIES) if (e.needle.toLowerCase() === lower) return e.id;
  return null;
};

interface Props {
  children: string;
  className?: string;
}

/**
 * Renders plain text, auto-linking any phrase that matches a glossary
 * term or alias to /glossary#{id}. Each term is linked at most once
 * per block to avoid visual noise.
 */
const GlossaryText: React.FC<Props> = ({ children, className }) => {
  const text = children;
  const out: React.ReactNode[] = [];
  const seen = new Set<string>();
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  PATTERN.lastIndex = 0;

  while ((m = PATTERN.exec(text)) !== null) {
    const id = lookup(m[0]);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    if (m.index > lastIndex) out.push(text.slice(lastIndex, m.index));
    out.push(
      <Link
        key={`${id}-${m.index}`}
        to={`/glossary#${id}`}
        className="text-foreground underline decoration-accent/40 decoration-dotted underline-offset-2 hover:decoration-accent hover:text-accent transition-colors"
        title={`Glossary: ${m[0]}`}
      >
        {m[0]}
      </Link>,
    );
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < text.length) out.push(text.slice(lastIndex));
  return <span className={className}>{out}</span>;
};

export default GlossaryText;
