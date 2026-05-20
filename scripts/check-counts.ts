/**
 * check-counts.ts — guards against count drift across the site.
 *
 * Source of truth: src/data/{layers,caseStudies,lawEssays}.ts
 * Enforced patterns (case-insensitive):
 *   • "N structural laws"            → must equal LAWS.length
 *   • "N laws and M observations"    → must equal LAWS.length / OBSERVATIONS.length
 *   • "· N laws" / ", N laws"        → must equal LAWS.length (enumeration form)
 *   • "N+? worked verdicts|case studies" → must equal CASE_STUDIES.length
 *   • "N case studies"               → must equal CASE_STUDIES.length
 *   • "N layers and M sublayers"     → must equal 10 / 50
 *   • "N sublayers" (standalone total) → must equal 50, unless line mentions
 *     "per layer", "inside", or "of the 5" (per-layer references)
 *
 * Run modes:
 *   bunx tsx scripts/check-counts.ts          → report, exit 1 if mismatched
 *   bunx tsx scripts/check-counts.ts --fix    → rewrite files to canonical
 *
 * Escape hatch: lines containing `counts-ok` are skipped (use for legacy
 * snippet examples that intentionally cite outdated numbers).
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { globSync } from "fs";
import { execSync } from "child_process";

import { LAYERS, LAWS, OBSERVATIONS } from "../src/data/layers";
import { CASE_STUDIES } from "../src/data/caseStudies";

const CANON = {
  layers: LAYERS.length,
  sublayers: LAYERS.reduce((s, l) => s + l.sublayers.length, 0),
  laws: LAWS.length,
  observations: OBSERVATIONS.length,
  caseStudies: CASE_STUDIES.length,
};

type Rule = {
  name: string;
  /** Regex with capture groups. Each capture corresponds to a canonical key. */
  pattern: RegExp;
  /** Canonical value(s) the captures should equal, in order. */
  canon: (keyof typeof CANON)[];
  /** Build the replacement string. Receives original match + canonical numbers. */
  replace: (match: string, ...vals: number[]) => string;
  /** Skip this match if line contains any of these substrings. */
  skipIfLineHas?: string[];
};

const RULES: Rule[] = [
  {
    name: "structural-laws",
    pattern: /\b(\d+)\s+structural\s+laws?\b/gi,
    canon: ["laws"],
    replace: (_m, _n, laws) => `${laws} structural laws`,
  },
  {
    name: "laws-and-observations",
    pattern: /\b(\d+)\s+laws?\s+and\s+(\d+)\s+observations?\b/gi,
    canon: ["laws", "observations"],
    replace: (_m, _a, _b, laws, obs) => `${laws} structural laws and ${obs} observations`,
  },
  {
    name: "laws-enumeration",
    // " · N laws" or ", N laws" — enumeration form following sublayers etc.
    pattern: /([·,—-])\s*(\d+)\s+laws\b/gi,
    canon: ["laws"],
    replace: (_m, sep, _n, laws) => `${sep} ${laws} laws`,
  },
  {
    name: "worked-verdicts-or-cases",
    pattern: /\b(\d+)\+?\s+worked\s+(verdicts?|case\s+studies)\b/gi,
    canon: ["caseStudies"],
    replace: (_m, _n, noun, cases) => `${cases} worked ${noun}`,
  },
  {
    name: "case-studies-total",
    pattern: /\b(\d+)\+?\s+case\s+studies\b/gi,
    canon: ["caseStudies"],
    replace: (_m, _n, cases) => `${cases} case studies`,
    skipIfLineHas: ["per ", "each ", "inside"],
  },
  {
    name: "layers-and-sublayers",
    pattern: /\b(\d+)\s+layers\s+and\s+(\d+)\s+sublayers\b/gi,
    canon: ["layers", "sublayers"],
    replace: (_m, _a, _b, layers, sub) => `${layers} layers and ${sub} sublayers`,
  },
  {
    name: "sublayers-total",
    pattern: /\b(\d+)\s+sublayers\b/gi,
    canon: ["sublayers"],
    replace: (_m, _n, sub) => `${sub} sublayers`,
    skipIfLineHas: ["per layer", "inside", "of the 5", "the 5 sublayers", "5 sublayers per"],
  },
];

const TARGET_GLOBS = [
  "src/**/*.{ts,tsx,md,mdx}",
  "public/llms.txt",
  "public/humans.txt",
  "index.html",
];

const IGNORE = [
  /\/components\/ui\//,
  /\/integrations\/supabase\//,
  /\/test\//,
  /\.test\.tsx?$/,
  /\/data\/layers\.ts$/,
  /\/data\/caseStudies\.ts$/,
  /\/data\/lawEssays\.ts$/,
  /\/data\/lawPrecedents\.ts$/,
  /scripts\/check-counts\.ts$/,
];

function collectFiles(): string[] {
  const root = resolve(process.cwd());
  const out = new Set<string>();
  for (const g of TARGET_GLOBS) {
    for (const f of globSync(g, { cwd: root })) {
      const full = resolve(root, f);
      if (IGNORE.some((re) => re.test(full))) continue;
      out.add(full);
    }
  }
  return [...out].sort();
}

type Finding = {
  file: string;
  line: number;
  rule: string;
  found: string;
  expected: string;
};

function scan(content: string, file: string) {
  const findings: Finding[] = [];
  let next = content;
  let changed = false;

  for (const rule of RULES) {
    next = next.replace(rule.pattern, (match, ...groups) => {
      // groups = [...captures, offset, fullString]
      const fullString = groups[groups.length - 1] as string;
      const offset = groups[groups.length - 2] as number;
      const captures = groups.slice(0, rule.canon.length) as string[];

      // Line-context skip
      const lineStart = fullString.lastIndexOf("\n", offset) + 1;
      const lineEnd = fullString.indexOf("\n", offset);
      const line = fullString.slice(lineStart, lineEnd === -1 ? undefined : lineEnd);
      if (line.includes("counts-ok")) return match;
      if (rule.skipIfLineHas?.some((s) => line.toLowerCase().includes(s.toLowerCase()))) {
        return match;
      }

      const canonVals = rule.canon.map((k) => CANON[k]);
      const foundNums = captures.map((c) => Number(c));
      const mismatch = foundNums.some((n, i) => n !== canonVals[i]);
      if (!mismatch) return match;

      const replacement = rule.replace(match, ...(captures as any[]), ...canonVals);
      const lineNum = content.slice(0, offset).split("\n").length;
      findings.push({
        file,
        line: lineNum,
        rule: rule.name,
        found: match,
        expected: replacement,
      });
      changed = true;
      return replacement;
    });
  }

  return { findings, next, changed };
}

function main() {
  const fix = process.argv.includes("--fix");
  const files = collectFiles();
  const allFindings: Finding[] = [];
  let filesChanged = 0;

  for (const file of files) {
    const original = readFileSync(file, "utf8");
    const { findings, next, changed } = scan(original, file);
    if (findings.length) allFindings.push(...findings);
    if (changed && fix) {
      writeFileSync(file, next, "utf8");
      filesChanged++;
    }
  }

  console.log(`\nCanonical counts: ${JSON.stringify(CANON)}`);
  console.log(`Scanned ${files.length} files.\n`);

  if (allFindings.length === 0) {
    console.log("✅ All counts consistent.");
    return;
  }

  const grouped = new Map<string, Finding[]>();
  for (const f of allFindings) {
    const rel = f.file.replace(process.cwd() + "/", "");
    if (!grouped.has(rel)) grouped.set(rel, []);
    grouped.get(rel)!.push(f);
  }

  for (const [file, items] of grouped) {
    console.log(`\n${file}`);
    for (const it of items) {
      console.log(`  L${it.line}  [${it.rule}]`);
      console.log(`    found:    ${it.found}`);
      console.log(`    expected: ${it.expected}`);
    }
  }

  if (fix) {
    console.log(`\n🔧 Fixed ${filesChanged} file(s).`);
    return;
  }

  console.log(
    `\n❌ ${allFindings.length} count mismatch(es) across ${grouped.size} file(s).`,
  );
  console.log(`   Run: bunx tsx scripts/check-counts.ts --fix`);
  process.exit(1);
}

main();
