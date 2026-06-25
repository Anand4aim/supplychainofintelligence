# The Intelligence Cube™

A three-axis instrument for placing a company on the map.

> **Functions × Verticals × Layers. Volume = structural durability. Thin slivers die.**

---

## The three axes

**Axis 1 — Functions** (what job is being done)

`Dev/Eng` · `Design` · `Product` · `PM/Proj` · `Ops` · `Mktg` · `Sales` · `CustCare` · `Strategy`

**Axis 2 — Verticals** (which industry context)

`FinTech` · `EdTech` · `Legal` · `Health` · `Travel` · `eCom` · `Media` · `Gov` · `SaaS` · `Horizontal`

**Axis 3 — Layers** (which layers of the supply chain are owned)

`L−1` · `L0` · `L1` · `L2` · `L3` · `L4` · `L5` · `L6` · `L7` · `L8`

A company's position in the Cube is the *volume* it occupies — the union of cells across the three axes where it actually plays.

---

## Why volume matters

A thin sliver (one function × one vertical × one layer) is brittle. The platform absorbs it in one release.

A volumetric position (multiple functions × at least one vertical × multiple owned layers, ideally including one Substrate layer) is durable. There is no single feature release that can compress all three axes simultaneously.

**Examples:**

- **Bloomberg**: many functions (research, trading, news, compliance) × FinTech vertical × L1b + L3 + L7 layers. Volumetric. Permanent.
- **Jasper at peak**: Marketing function × Horizontal × L7 only. A sliver. Compressed.
- **Replit**: Dev/Eng + PM × Horizontal × L4 + L5 + L6 + L8. Volumetric. Durable.

---

## Cube vs Triangle vs Laws — keep them straight

The Cube is an **instrument** — a tool you use to apply the Laws to a specific company. So is the **Defensible Triangle** (`L1b + L5a/b/d + L8c/d/e`).

Instruments are *not* Laws. Laws are falsifiable structural claims about the supply chain itself. Instruments are how you place a company on the map.

| Construct | Type | Lives in |
|---|---|---|
| The 4 Laws | Structural claims | `laws.md` |
| Defensible Triangle | Instrument | this repo's README |
| Intelligence Cube™ | Instrument | this file |
| The 3 Currents | Market forces | `currents.md` |
| 10 Layers / 50 sublayers | Map | `layers/` |

---

## Using the Cube in analysis

1. Identify the company's **functions served** (be honest — the marketing page is not the answer; the actual users are).
2. Identify the **verticals** where they meaningfully ship. "Horizontal" is a valid answer but a riskier one — horizontal companies have to fight Current II harder.
3. Identify the **layers they own** vs the layers they **rent**. Use the layer descriptions in `layers/` to be precise. "Powered by GPT-4" is renting L2, not owning it.
4. Calculate the volume. Few cells = sliver = absorption risk. Many cells = volume = structural durability.
5. Cross-check against the 4 Laws:
   - Are they at L7-only with no L1/L3/L8 underneath? (Law I)
   - Do they own a bottleneck? (Law II)
   - Surface or chain? (Law III)
   - Are they trying to generate *and* verify? (Law IV)

---

## A note on "agents" and the Cube

Because "agent" is not a layer, it does not occupy a Cube axis. Decode the agent first (per the `agent decoder` in the README) and place the underlying L5 + L6 (+ L7 / L8) into the layer axis. Then evaluate the Cube volume normally.
