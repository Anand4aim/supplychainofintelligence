/**
 * IndexNow submission — pings Bing + Yandex (and downstream consumers
 * like DuckDuckGo and ChatGPT search via Bing's index) with every URL
 * in public/sitemap.xml so they recrawl now instead of on their own
 * cadence.
 *
 * Prerequisite: public/ae61abb56a664b2b8f993b8fa0988b19.txt must be
 * Published and reachable at the domain root — IndexNow rejects the
 * batch with 403 if it can't fetch the key file.
 *
 * Usage:
 *   bunx tsx scripts/indexnow-submit.ts          # submit all sitemap URLs
 *   bunx tsx scripts/indexnow-submit.ts --dry    # print payload, don't POST
 *
 * Re-run anytime new content ships. Bing typically refreshes within
 * hours; Yandex within a day.
 */

import { readFileSync } from "fs";
import { resolve } from "path";

const HOST = "supplychainofai.com";
const KEY = "ae61abb56a664b2b8f993b8fa0988b19";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINTS = [
  "https://api.indexnow.org/IndexNow",
  "https://www.bing.com/IndexNow",
  "https://yandex.com/indexnow",
];

const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length === 0) {
  console.error("No URLs found in public/sitemap.xml");
  process.exit(1);
}

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls,
};

const dry = process.argv.includes("--dry");
console.log(`IndexNow: ${urls.length} URLs for ${HOST}`);
console.log(`  keyLocation: ${KEY_LOCATION}`);

if (dry) {
  console.log("\nPayload (dry run):");
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

// Sanity-check the key file is published before spamming endpoints.
const keyCheck = await fetch(KEY_LOCATION);
if (!keyCheck.ok) {
  console.error(`\n✗ Key file not reachable at ${KEY_LOCATION} (HTTP ${keyCheck.status}).`);
  console.error("  Publish the project (click Update in the publish dialog) and re-run.");
  process.exit(2);
}
const keyBody = (await keyCheck.text()).trim();
if (keyBody !== KEY) {
  console.error(`\n✗ Key file contents mismatch — expected "${KEY}", got "${keyBody.slice(0, 40)}…"`);
  process.exit(2);
}
console.log(`  ✓ key file verified live (${keyBody})`);

let allOk = true;
for (const endpoint of ENDPOINTS) {
  process.stdout.write(`\n→ POST ${endpoint} … `);
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    // 200 = accepted, 202 = accepted (async), both are success.
    const body = await res.text().catch(() => "");
    if (res.status === 200 || res.status === 202) {
      console.log(`✓ HTTP ${res.status}`);
    } else {
      console.log(`✗ HTTP ${res.status}${body ? ` — ${body.slice(0, 200)}` : ""}`);
      allOk = false;
    }
  } catch (e: any) {
    console.log(`✗ ${e?.message ?? e}`);
    allOk = false;
  }
}

console.log(allOk ? "\nAll endpoints accepted the batch." : "\nOne or more endpoints failed — see above.");
process.exit(allOk ? 0 : 1);
