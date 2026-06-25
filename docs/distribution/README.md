# Distribution pack

Three articles, three platforms each. Same words, three surfaces. No new arguments — just distribution.

## What's here

| Folder | Article |
|---|---|
| `01-framework/` | The Supply Chain of Intelligence — the 10 layers of the generative AI stack |
| `02-four-laws/` | The 4 Laws of the AI Supply Chain |
| `03-apollo-teardown/` | Apollo and the SaaSpocalypse — a thin-stack survivor, decoded |

Each folder contains:

- `linkedin-article.md` — paste the body directly into LinkedIn's Article editor. Image URLs inline; replace with file uploads of the matching PNG.
- `substack-medium.md` — paste into Substack or Medium. Includes the canonical-link header. Embed images by URL — no download needed.
- `images.md` — list of hosted image URLs, suggested alt text, suggested caption.

## How to post — 5-minute workflow

### LinkedIn Article

1. linkedin.com → **Write article** (not "Start a post").
2. Open `linkedin-article.md`, copy everything between the `---` markers.
3. Paste into the LinkedIn editor. Headings, bold, lists, and the canonical CTA all preserve.
4. **Cover image**: drag `01-framework-cover.jpg` (or matching cover) from `/mnt/documents/distribution/` into LinkedIn's cover slot.
5. **Inline diagrams**: in places the markdown says `[IMAGE: …]`, delete that line and use LinkedIn's image button to upload the matching PNG.
6. Add the 5 hashtags listed at the bottom of each file.
7. Publish.

### Substack / Medium

1. New post → switch to Markdown import (Substack) or paste-in-editor (Medium).
2. Open `substack-medium.md`, copy everything between the `---` markers.
3. Paste. Images embed by URL automatically — no upload needed.
4. Set the canonical URL field (Substack: Settings → SEO; Medium: Story settings → Advanced → Canonical URL) to the source URL noted at the top of the file.
5. Publish.

## Hosted image URLs

All article images live at:

```
https://supplychainofai.com/og/distribution/<filename>
```

These URLs are stable. Substack/Medium can embed them inline. For LinkedIn, the same images are mirrored in `/mnt/documents/distribution/` so you can upload them directly.

## Diagrams you can lift from the site

The site already renders the framework's full diagram library. For any deeper visual than the cover image, screenshot from these live pages and upload:

- `https://supplychainofai.com/framework` — full 10-layer map, Defensible Triangle, Intelligence Cube
- `https://supplychainofai.com/posters` — single-purpose posters (Four Laws, Triangle, Agent Decoder, etc.)
- `https://supplychainofai.com/framework/L1` (substitute any layer id) — per-layer deep dive

Screenshot at 2× zoom, crop, drop in.

## Tone guardrails

Every article follows the existing project tone memory:

- No harsh verdicts ("crushed", "destroyed", "killer"). Soft framing: "compresses", "at risk", "contested".
- No transactional CTAs ("hire me", "engagement", "consulting"). Editorial only: "read the framework", "run the self-assessment", "follow on LinkedIn".
- Author line on every piece: *Anand Arivukkarasu — Ex-Meta (Instagram) Product Leader & AI Product Architect. SF.* Never "Ex-Google".
- Brand line: *The Supply Chain of Intelligence™ — the 10 layers of the generative AI stack.*
- Personal-capacity disclosure footer on every article. L-1A safe.

## Attribution

Auto-appended to every article:

> Originally published at supplychainofai.com. © Anand Arivukkarasu, written in personal capacity. The Supply Chain of Intelligence™ and The Intelligence Cube™ are trademarks of the author. Framework licensed CC BY 4.0 — see github.com/[your-repo]/spec.
