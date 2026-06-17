---
name: Two-register visual system — editorial vs reference
description: When to use sketch (Caveat, wobble, red arrows, paper) vs clean reference (Fredoka/Nunito, sharp, layer-color system). Prevents framework canon from looking doodled and opinion writing from looking sterile.
type: design
---

The site runs on TWO design registers. Every new page, component, or content surface picks ONE and commits to it. Mixing registers within the same surface is the failure mode.

## Editorial register (sketch / hand-drawn)
Used when: a human is talking. POV, opinion, narrative, author voice, personal-capacity notice.

Visual signals:
- Caveat font for annotations and pull-quotes (font-sketch)
- SketchBox / SketchBoard wrappers, wobble filter, dot-grid paper
- Red sketched arrows (SketchArrow, SketchConnector) for transitions and dividers
- Hand-drawn underlines (SketchUnderline) and circles (SketchCircle) for emphasis
- Warm cream paper background (hsl 40 30% 97%) over default bg
- Caveat margin glosses and "Anand's note" callouts (<AuthorNote>)

Surfaces:
- /posts/:slug (opinion post detail) — full editorial treatment
- /posts list — editorial card treatment
- /about — narrative bio, sketch asides
- /for-investors, /for-product-leaders — sketch hero, sketch pull-quotes OK
- /disclaimer, PersonalCapacityNotice — sketch box treatment
- Article hero illustrations on opinion posts
- <AuthorNote> callouts embedded anywhere

## Reference register (clean / engineered)
Used when: canonical framework truth, market data, reported news. Authority signals.

Visual signals:
- Fredoka (display) + Nunito (body) only
- Sharp borders, layer-color system as the visual language
- No wobble filter, no Caveat in body copy, minimal red arrows
- Layer chips, LayerTag, structured grids and tables
- McKinsey-grade poster aesthetic (StackPosterFull, IntelligenceCubePoster, FourLawsPoster, etc.)

Surfaces:
- / (home) — magazine cover, reference-led; sketch only as accent on hero
- /framework — canonical layer reference (NEVER doodled)
- /framework/:layer — deep dives, reference-led
- /market-map and /market-map/:vertical — data, tables, layer chips
- /predictions, /glossary, /analysis, /analysis/:slug — reference
- /live (news feed) — reported items, reference register
- /live/:slug — reference (reported news, not opinion)
- /posters — gallery of reference-grade artifacts

## Hybrid zone (handled, not avoided)
- Article hero illustrations on opinion posts: sketched image + crisp framework chips below
- <AuthorNote> embedded INSIDE a reference page: a single sketch-styled callout breaking through, scoped to that block only — does not infect surrounding content
- Editorial pull-quotes inside an otherwise-reference page: allowed sparingly, ALWAYS wrapped in a clearly-bounded sketch box so the register switch is intentional

## Tactical rules
- Caveat (font-sketch) is for ANNOTATIONS, never body copy. Body copy is Nunito everywhere.
- Layer chips, LayerTag, and layer colors render the SAME in both registers — they are the framework's identity, not a register choice.
- Hero posters render the SAME in both registers — they are artifacts.
- Sketch wobble filter (SketchFilters) must be mounted in any page tree that uses sketch SVG elements; it's mounted ad-hoc per page today, not globally.

## Failure modes to reject
- Caveat-styled body paragraphs on framework pages
- Sketch wobble applied to layer chips, LayerTag, or framework diagrams
- Reference-clean sans-serif on opinion post pull-quotes (kills the human voice)
- Mixing >2 sketch flourishes in a single block (becomes cluttered)
- "Sketch up the framework page to feel more friendly" — NO, friendliness comes from copy, not register switching
