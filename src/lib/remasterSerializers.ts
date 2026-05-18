// Lightweight serializer: turn a static content object into a single text blob
// that the static-content critic can review.
import type { CaseStudy } from "@/components/CaseStudyCard";
import type { LawEssay } from "@/data/lawEssays";
import type { Layer } from "@/data/layers";

export function caseStudyToText(c: CaseStudy): string {
  const parts: string[] = [
    `TITLE: ${c.title}`,
    `TAG: ${c.tag}`,
    `VERDICT: ${c.verdict}`,
    `LAYERS: ${(c.layers ?? []).join(", ")}`,
    `SUBLAYERS: ${(c.sublayers ?? []).join(", ")}`,
    `EXCERPT:\n${c.excerpt}`,
    `BODY:\n${c.content ?? ""}`,
  ];
  if (c.layer_scores?.length) {
    parts.push(`LAYER_SCORES:\n${JSON.stringify(c.layer_scores, null, 2)}`);
  }
  return parts.join("\n\n");
}

export function lawEssayToText(e: LawEssay): string {
  return [
    `TITLE: ${e.title}`,
    `LAW NUMBER: ${e.num}`,
    `ONE-LINE: ${e.oneLine}`,
    `META DESCRIPTION: ${e.description}`,
    `BODY:`,
    ...e.paragraphs,
  ].join("\n\n");
}

export function layerToText(l: Layer): string {
  return [
    `ID: ${l.id}`,
    `NAME: ${l.name} (short: ${l.shortName})`,
    `DESC: ${l.desc}`,
    `DETAIL: ${l.detail}`,
    `GOLD ANALOGY: ${l.goldTitle} — ${l.goldAnalogy}`,
    `PLAYERS: ${(l.players ?? []).join(", ")}`,
    `VERDICT: ${l.verdict}`,
    `SUBLAYERS:\n${l.sublayers.map((s) => `- ${s.id} ${s.name}${s.defensible ? " ★" : ""} — ${s.desc}`).join("\n")}`,
  ].join("\n\n");
}

// Generic: stringify any record
export function genericToText(label: string, obj: unknown): string {
  return `LABEL: ${label}\n\n${JSON.stringify(obj, null, 2)}`;
}
