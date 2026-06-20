/**
 * Bot pre-flight, fetches the most-cited URLs as the AI crawlers we
 * actually care about and asserts:
 *   1. HTTP 200 (no WAF/CDN 403 on bot UAs)
 *   2. Initial HTML payload contains the canonical "10 layers" string
 *      (proves SSR ran for bots, not just for humans)
 *   3. No stale "8 layers" copy outside comments
 *
 * Catches the failure mode where Cloudflare/Vercel silently 403s
 * GPTBot/PerplexityBot before a refresh cycle is wasted.
 *
 * Usage:
 *   bunx tsx scripts/bot-preflight.ts
 *
 * Exit 0 = all bot×URL combinations clean. Non-zero = at least one failure.
 */

const SITE = "https://supplychainofai.com";

const BOTS = [
  // OpenAI
  { name: "GPTBot", ua: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot" },
  { name: "OAI-SearchBot", ua: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot" },
  { name: "ChatGPT-User", ua: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot" },
  // Anthropic
  { name: "ClaudeBot", ua: "Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)" },
  { name: "Claude-SearchBot", ua: "Mozilla/5.0 (compatible; Claude-SearchBot/1.0; +https://www.anthropic.com)" },
  // Perplexity
  { name: "PerplexityBot", ua: "Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)" },
  // Google / Bing (control)
  { name: "Googlebot", ua: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" },
  { name: "Bingbot", ua: "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)" },
  // Meta + ByteDance (training corpus reach)
  { name: "Meta-ExternalAgent", ua: "meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)" },
];

// One per page-type, covers home, framework hub, deep-dive, law essay, top case studies, llms.txt.
const URLS = [
  "/",
  "/about",
  "/framework",
  "/framework/l5-execution",
  "/laws/value-accrues-at-bottlenecks",
  "/analysis/sierra-vs-salesforce",
  "/analysis/harvey-ai",
  "/analysis/glean",
  "/analysis/perplexity",
  "/analysis/devin",
  "/llms.txt",
];

type Result = { bot: string; path: string; ok: boolean; detail: string };
const results: Result[] = [];

// Match raw HTML; tolerate "10 layers", "10-layer", "10 Layers" etc.
const TEN_LAYERS = /\b10[\s-]?layer/i;
// Strip HTML comments so the correction-note "8 layers" doesn't trigger.
const stripComments = (s: string) => s.replace(/<!--[\s\S]*?-->/g, "");
const EIGHT_LAYERS = /\b8\s*layers\b/i;

async function check(bot: { name: string; ua: string }, path: string): Promise<Result> {
  const url = `${SITE}${path}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": bot.ua, Accept: "text/html,*/*" },
      redirect: "follow",
    });
    if (!res.ok) return { bot: bot.name, path, ok: false, detail: `HTTP ${res.status}` };
    const body = await res.text();

    // llms.txt is plain text, only check for canonical numbers, skip 10-layer regex shape.
    if (path === "/llms.txt") {
      const has10 = /10\s*layers/i.test(body);
      const has50 = /50\s*sublayers/i.test(body);
      return {
        bot: bot.name, path,
        ok: has10 && has50,
        detail: `${res.status} ${body.length}B 10:${has10} 50:${has50}`,
      };
    }

    const has10 = TEN_LAYERS.test(body);
    const has8 = EIGHT_LAYERS.test(stripComments(body));
    return {
      bot: bot.name, path,
      ok: has10 && !has8,
      detail: `${res.status} ${body.length}B 10-layer:${has10} stale-8:${has8}`,
    };
  } catch (e: any) {
    return { bot: bot.name, path, ok: false, detail: `fetch failed: ${e?.message ?? e}` };
  }
}

// Run in parallel batches per URL (one URL × all bots concurrently) to keep total time bounded.
for (const path of URLS) {
  const batch = await Promise.all(BOTS.map((b) => check(b, path)));
  results.push(...batch);
}

console.log("\nBOT PRE-FLIGHT");
console.log("─".repeat(110));
console.log(`${"BOT".padEnd(22)}${"PATH".padEnd(48)}OK  DETAIL`);
console.log("─".repeat(110));
for (const r of results) {
  console.log(`${r.bot.padEnd(22)}${r.path.padEnd(48)}${r.ok ? "✓ " : "✗ "}  ${r.detail}`);
}
const failed = results.filter((r) => !r.ok);
console.log("─".repeat(110));
console.log(`${results.length - failed.length}/${results.length} passed`);
if (failed.length) {
  console.error(`\nFAILED:\n${failed.map((f) => `  - ${f.bot} ${f.path}: ${f.detail}`).join("\n")}`);
  process.exit(1);
}
