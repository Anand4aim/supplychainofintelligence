/**
 * check-exports.ts — fails fast if critical data-module exports are missing
 * or shaped wrong, so the prerender step doesn't throw a cryptic Node ESM error.
 */

import { resolve } from "path";

const REQUIRED = [
  {
    module: "../src/data/verticalsRegistry",
    exports: ["VERTICAL_REGISTRY", "getVertical"],
    validate(mod: any) {
      if (!Array.isArray(mod.VERTICAL_REGISTRY)) {
        throw new Error("VERTICAL_REGISTRY must be an array");
      }
      if (mod.VERTICAL_REGISTRY.length === 0) {
        throw new Error("VERTICAL_REGISTRY is empty");
      }
      for (const v of mod.VERTICAL_REGISTRY) {
        if (!v.slug || typeof v.slug !== "string") {
          throw new Error(`VERTICAL_REGISTRY entry missing string "slug": ${JSON.stringify(v)}`);
        }
        if (!v.label || typeof v.label !== "string") {
          throw new Error(`VERTICAL_REGISTRY entry missing string "label": ${JSON.stringify(v)}`);
        }
      }
    },
  },
];

let ok = 0;
let failed = 0;

for (const req of REQUIRED) {
    const modPath = resolve(import.meta.dirname, req.module);
  try {
    const mod = await import(modPath);
    const missing = req.exports.filter((name) => !(name in mod));
    if (missing.length) {
      console.error(`❌ ${req.module}: missing exports [${missing.join(", ")}]`);
      failed++;
      continue;
    }
    if (req.validate) {
      req.validate(mod);
    }
    console.log(`✅ ${req.module}: ${req.exports.join(", ")}`);
    ok++;
  } catch (err: any) {
    console.error(`❌ ${req.module}: ${err.message}`);
    failed++;
  }
}

if (failed > 0) {
  console.error(`\n${failed} module(s) failed export checks. Fix the data source before building.`);
  process.exit(1);
}

console.log(`\n✅ All ${ok} required export checks passed.`);
