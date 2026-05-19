"""
Regenerate /public/supply-chain-of-intelligence.pdf
Single source of truth for colors: src/data/layerColors.ts (mirrored below).
Visual language: sandalwood paper + colored layer chips + serif title with
gold underline + italic captions — matches the worked-example aesthetic on
the site.
"""
from reportlab.lib.pagesizes import landscape, letter
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# ── Register actual site fonts (Playfair Display + Inter + JetBrains Mono)
FONT_DIR = os.environ.get("PDF_FONT_DIR", "/tmp/fonts")
pdfmetrics.registerFont(TTFont("Display",        os.path.join(FONT_DIR, "PlayfairDisplay.ttf")))
pdfmetrics.registerFont(TTFont("Display-Italic", os.path.join(FONT_DIR, "PlayfairDisplay-Italic.ttf")))
pdfmetrics.registerFont(TTFont("Body",           os.path.join(FONT_DIR, "Inter.ttf")))
pdfmetrics.registerFont(TTFont("Mono",           os.path.join(FONT_DIR, "JetBrainsMono.ttf")))

# Font aliases used by the drawing helpers
F_TITLE  = "Display"
F_ITALIC = "Display-Italic"
F_BODY   = "Body"
F_MONO   = "Mono"

# ── Canonical color table (mirror of src/data/layerColors.ts) ─────────
PAPER_BG    = HexColor("#ede5d3")
PAPER_DEEP  = HexColor("#dcd1ba")
PAPER_RULE  = HexColor("#c8bba0")
PAPER_INK   = HexColor("#0f172a")
GOLD        = HexColor("#b08a3a")
WHITE       = HexColor("#ffffff")

LAYER_HEX = {
    "L-1": "#372e63", "L0": "#4a4373", "L1": "#923cb8", "L2": "#3b5a96",
    "L3": "#4787b4", "L4": "#1fb3a8", "L5": "#2e8a55", "L6": "#dab023",
    "L7": "#d16a1e", "L8": "#b03065",
}
LAYER_TINT = {
    "L-1": "#ebe5f0", "L0": "#eae5f0", "L1": "#f1e5f5", "L2": "#e5ebf4",
    "L3": "#e3ecf4", "L4": "#dff2f0", "L5": "#e3efe7", "L6": "#f5edd6",
    "L7": "#f5e7d8", "L8": "#f3e0e8",
}

LAYERS = [
    ("L-1", "Resources",     "Mines",     "Energy, water, fabs, materials, skilled trades.",
     ["Energy", "Thermal & Water", "Fabrication & Foundry", "Critical Materials", "Skilled Trades"]),
    ("L0",  "Infrastructure","Shovels",   "Chips, data centers, networking, cloud, edge.",
     ["Silicon (GPU/TPU)", "Data Centers", "Interconnect Fabric", "Compute Access Cloud", "Edge & On-Device"]),
    ("L1",  "Data",          "Ore",       "What raw input do you have that nobody else can get?",
     ["Public & Open Data", "Proprietary Data ★", "Behavioral Data ★", "Outcome Data ★", "Synthetic Data"]),
    ("L2",  "Models",        "Smelter",   "Intelligence refinement. Rent early, build at scale.",
     ["Foundation Models", "Specialized Models", "Embedding & Retrieval", "Routing & Composition", "Reasoning Models"]),
    ("L3",  "Gatekeeping",   "Hallmark",  "Trust, acceptance, approval. Can the system be allowed in?",
     ["Compliance Gates", "Quality / Evals", "Safety & Security", "Editorial Gates ★", "Distribution Gates ★"]),
    ("L4",  "Access",        "Railroad",  "Connectivity, permissions, integrations — the pipes.",
     ["API & Integration", "Agent Protocols ★", "Access Governance", "Real-Time Infra", "Agent Identity ★"]),
    ("L5",  "Execution",     "Jeweler",   "Applied skills and capabilities. Doing the actual work.",
     ["Domain Execution ★", "Decision Scaffolds ★", "RAG Workflows", "Operating Playbooks ★", "Interactional Skills"]),
    ("L6",  "Orchestration", "Store",     "Workflow, routing, coordination — composing skills.",
     ["Agent Loops", "Human-in-the-Loop ★", "Role Routing", "Context & State", "Runtime Assurance"]),
    ("L7",  "Surface",       "Wearing",   "Interface and experience. How users meet the intelligence.",
     ["Conversational", "Visual / Media", "Embedded & Copilot ★", "Transaction Surface ★", "Async & Ambient"]),
    ("L8",  "Memory",        "Ledger",    "Retention, learning, compounding context.",
     ["Session Memory", "User Profiles", "Network Learning ★", "Institutional Knowledge ★", "World Models ★"]),
]

# PM use-cases — one per layer
PM_USE = {
    "L-1": "Map your bottleneck exposure: which L−1 input (power, fabs, materials) caps your growth?",
    "L0":  "Decide build-vs-rent compute. If burn rate is dominated by L0, you're a tenant — not an owner.",
    "L1":  "Audit your proprietary data. If your moat is public data, you don't have a moat.",
    "L2":  "Pick model layer as a portfolio. Never single-source. Track L2 → L5 absorption risk.",
    "L3":  "Treat compliance + evals as product, not paperwork. L3 is the slowest moat to build.",
    "L4":  "Invest in railroad tracks. Deep integrations = switching cost = survival.",
    "L5":  "Go deep, not wide. Generic execution dies; specialized execution compounds.",
    "L6":  "Workflow ownership = customer ownership. Lose orchestration, you become a feature.",
    "L7":  "Modality is commodity. Context (embedded / transactional) is the moat.",
    "L8":  "Build memory from day one. It's the only layer that gets stronger every day.",
}

PAGE = landscape(letter)  # 11 x 8.5 in
W, H = PAGE
MARGIN = 0.55 * 72

def hex_to_color(h): return HexColor(h)

def draw_paper(c, color=PAPER_BG):
    c.setFillColor(color); c.rect(0, 0, W, H, fill=1, stroke=0)
    # subtle deckle rule
    c.setStrokeColor(PAPER_RULE); c.setLineWidth(0.4)
    c.rect(MARGIN/2, MARGIN/2, W - MARGIN, H - MARGIN, fill=0, stroke=1)

def draw_eyebrow(c, text, x, y, color=GOLD):
    c.setFillColor(color); c.setFont(F_MONO, 8)
    c.drawString(x, y, text.upper())

def draw_title(c, text, x, y, size=34, color=PAPER_INK):
    c.setFillColor(color); c.setFont(F_TITLE, size)
    c.drawString(x, y, text)

def draw_rule(c, x, y, w=80, color=GOLD):
    c.setStrokeColor(color); c.setLineWidth(1.6); c.line(x, y, x + w, y)

def draw_italic(c, text, x, y, size=12, color=PAPER_INK, max_w=None):
    c.setFillColor(color); c.setFont(F_ITALIC, size)
    if max_w:
        for line in simpleSplit(text, F_ITALIC, size, max_w):
            c.drawString(x, y, line); y -= size * 1.25
    else:
        c.drawString(x, y, text)
    return y

def draw_body(c, text, x, y, size=11, color=PAPER_INK, max_w=400, font=F_BODY):
    c.setFillColor(color); c.setFont(font, size)
    for line in simpleSplit(text, font, size, max_w):
        c.drawString(x, y, line); y -= size * 1.35
    return y

def draw_footer(c, page_num, total):
    c.setFillColor(HexColor("#0f172a")); c.setFont(F_MONO, 7)
    c.drawString(MARGIN, MARGIN/2 - 4, "THE SUPPLY CHAIN OF INTELLIGENCE™  ·  ANAND ARIVUKKARASU  ·  SUPPLYCHAINOFAI.COM")
    c.drawRightString(W - MARGIN, MARGIN/2 - 4, f"DWG SCI-010  ·  SHEET {page_num:02d} / {total:02d}  ·  REV 1.1")

# ── Cover ─────────────────────────────────────────────────────────────
def cover(c, total):
    draw_paper(c)
    x = MARGIN + 10
    draw_eyebrow(c, "A Visual Field Guide  ·  Free Edition", x, H - MARGIN - 20)
    draw_title(c, "The supply chain", x, H - MARGIN - 70, size=58)
    draw_title(c, "of intelligence.", x, H - MARGIN - 130, size=58, color=GOLD)
    draw_rule(c, x, H - MARGIN - 150, w=140)
    y = H - MARGIN - 180
    y = draw_italic(c,
        "Ten layers. Fifty sublayers. Eighteen defensible positions.",
        x, y, size=18, max_w=W - 2*MARGIN - 20)
    y -= 6
    y = draw_italic(c,
        "The only framework that tells you where value accrues — and who can fire you.",
        x, y, size=14, color=HexColor("#0f172a"), max_w=W - 2*MARGIN - 20)

    # chip strip at bottom
    chip_y = MARGIN + 80
    chip_w = (W - 2*MARGIN - 40) / 10
    for i, (lid, short, *_rest) in enumerate(LAYERS):
        cx = MARGIN + 20 + i * chip_w
        c.setFillColor(hex_to_color(LAYER_HEX[lid]))
        c.rect(cx + 3, chip_y, chip_w - 6, 36, fill=1, stroke=0)
        c.setFillColor(WHITE); c.setFont(F_MONO, 11)
        c.drawCentredString(cx + chip_w/2, chip_y + 13, lid.replace("L-1", "L−1"))
        c.setFillColor(HexColor("#0f172a")); c.setFont(F_MONO, 7)
        c.drawCentredString(cx + chip_w/2, chip_y - 10, short.upper())

    c.setFillColor(HexColor("#0f172a")); c.setFont(F_BODY, 9)
    c.drawString(MARGIN + 10, MARGIN + 25, "By Anand Arivukkarasu  ·  Ex-Meta (Instagram) Product Leader & AI Product Architect")
    draw_footer(c, 1, total)
    c.showPage()

# ── How to use ────────────────────────────────────────────────────────
def how_to_use(c, total):
    draw_paper(c)
    x = MARGIN + 10
    draw_eyebrow(c, "How to use this deck", x, H - MARGIN - 20)
    draw_title(c, "Read it. Print it. Pin it to your roadmap wall.", x, H - MARGIN - 60, size=28)
    draw_rule(c, x, H - MARGIN - 78, w=100)

    items = [
        ("01", "One layer per page", "Each page covers one layer of the stack with its color, definition, sublayers, and how product leaders use it."),
        ("02", "Star = defensible", "★ marks the 18 sublayers where structural moats can be built. Memorize these."),
        ("03", "Read top to bottom", "L−1 → L8. Below the line is foundation. Above the line is where intelligence compounds."),
        ("04", "Map your product", "On the final page, place your product, your competitors, and your moats on the stack."),
        ("05", "Re-use the chips", "Layer colors and labels are canonical. Use them in your own decks for instant recognition."),
    ]
    y = H - MARGIN - 120
    for num, title, body in items:
        c.setFillColor(GOLD); c.setFont(F_MONO, 14)
        c.drawString(x, y, num)
        c.setFillColor(PAPER_INK); c.setFont(F_TITLE, 14)
        c.drawString(x + 36, y, title)
        c.setFont(F_BODY, 10)
        c.drawString(x + 36, y - 16, body)
        y -= 48
    draw_footer(c, 2, total)
    c.showPage()

# ── Per-layer page ────────────────────────────────────────────────────
def layer_page(c, idx, total, lid, short, analogy, summary, sublayers):
    # Paper background, with a colored band on the left
    draw_paper(c)
    band_w = 24
    c.setFillColor(hex_to_color(LAYER_HEX[lid]))
    c.rect(0, 0, band_w, H, fill=1, stroke=0)

    x = MARGIN + 20
    # Eyebrow + huge Lx pill
    draw_eyebrow(c, f"Layer {idx - 2} of 10  ·  {analogy}", x, H - MARGIN - 18, color=hex_to_color(LAYER_HEX[lid]))

    # Lx chip (big)
    pill_x, pill_y, pill_w, pill_h = x, H - MARGIN - 90, 130, 60
    c.setFillColor(hex_to_color(LAYER_HEX[lid]))
    c.rect(pill_x, pill_y, pill_w, pill_h, fill=1, stroke=0)
    c.setFillColor(WHITE); c.setFont(F_MONO, 32)
    display = lid.replace("L-1", "L−1")
    c.drawCentredString(pill_x + pill_w/2, pill_y + 18, display)

    # Title beside the pill
    c.setFillColor(PAPER_INK); c.setFont(F_TITLE, 44)
    c.drawString(pill_x + pill_w + 22, pill_y + 30, short + ".")
    c.setFont(F_ITALIC, 16); c.setFillColor(HexColor("#0f172a"))
    c.drawString(pill_x + pill_w + 22, pill_y + 8, f"The {analogy.lower()} of the stack.")

    # Summary
    draw_rule(c, x, pill_y - 14, w=80, color=hex_to_color(LAYER_HEX[lid]))
    y = pill_y - 38
    y = draw_body(c, summary, x, y, size=14, max_w=W * 0.55, font=F_TITLE)

    # Sublayers (left half)
    y -= 18
    c.setFillColor(hex_to_color(LAYER_HEX[lid])); c.setFont(F_MONO, 9)
    c.drawString(x, y, "FIVE SUBLAYERS")
    y -= 18
    for s in sublayers:
        # tinted chip
        chip_h = 26
        c.setFillColor(hex_to_color(LAYER_TINT[lid]))
        c.rect(x, y - chip_h + 6, W * 0.55 - 10, chip_h, fill=1, stroke=0)
        c.setStrokeColor(hex_to_color(LAYER_HEX[lid])); c.setLineWidth(0.6)
        c.rect(x, y - chip_h + 6, W * 0.55 - 10, chip_h, fill=0, stroke=1)
        c.setFillColor(PAPER_INK); c.setFont(F_BODY, 11)
        c.drawString(x + 10, y - 8, s)
        y -= chip_h + 4

    # Right column — "How Product Leaders Use This Layer"
    rx = x + W * 0.58
    ry = pill_y - 14
    c.setFillColor(PAPER_DEEP)
    c.rect(rx - 10, MARGIN + 50, W - rx - MARGIN + 10, ry - MARGIN - 50, fill=1, stroke=0)
    c.setStrokeColor(hex_to_color(LAYER_HEX[lid])); c.setLineWidth(1)
    c.rect(rx - 10, MARGIN + 50, W - rx - MARGIN + 10, ry - MARGIN - 50, fill=0, stroke=1)

    cy = ry - 30
    draw_eyebrow(c, "How Product Leaders Use This Layer", rx, cy, color=hex_to_color(LAYER_HEX[lid]))
    cy -= 24
    c.setFillColor(PAPER_INK); c.setFont(F_ITALIC, 16)
    for line in simpleSplit(PM_USE[lid], F_ITALIC, 16, W - rx - MARGIN - 10):
        c.drawString(rx, cy, line); cy -= 22

    # ★ marker explainer
    cy -= 14
    c.setFillColor(GOLD); c.setFont(F_BODY, 9)
    c.drawString(rx, cy, "★  STRUCTURAL MOAT")
    cy -= 14
    c.setFillColor(HexColor("#0f172a")); c.setFont(F_BODY, 9)
    for line in simpleSplit(
        "Sublayers marked ★ are positions where competitors cannot easily replicate you. Own at least one per product.",
        F_BODY, 9, W - rx - MARGIN - 10):
        c.drawString(rx, cy, line); cy -= 12

    draw_footer(c, idx, total)
    c.showPage()

# ── Conclusion ────────────────────────────────────────────────────────
def conclusion(c, total):
    draw_paper(c)
    x = MARGIN + 10
    draw_eyebrow(c, "Conclusion  ·  Your turn", x, H - MARGIN - 20)
    draw_title(c, "Pick three layers. Defend them ruthlessly.", x, H - MARGIN - 60, size=32)
    draw_rule(c, x, H - MARGIN - 78, w=120)

    y = H - MARGIN - 110
    y = draw_italic(c,
        "No company wins all ten layers. The companies that survive pick three — usually one foundation layer, one execution layer, and one memory or distribution layer — and out-engineer everyone else there.",
        x, y, size=14, max_w=W - 2*MARGIN - 20)

    # Worksheet — three blank cards
    y -= 30
    card_w = (W - 2*MARGIN - 40) / 3
    for i, label in enumerate(["YOUR FOUNDATION", "YOUR EXECUTION", "YOUR COMPOUNDING LAYER"]):
        cx = MARGIN + 10 + i * (card_w + 10)
        c.setFillColor(PAPER_DEEP); c.rect(cx, MARGIN + 80, card_w, 180, fill=1, stroke=0)
        c.setStrokeColor(GOLD); c.setLineWidth(1)
        c.rect(cx, MARGIN + 80, card_w, 180, fill=0, stroke=1)
        c.setFillColor(GOLD); c.setFont(F_MONO, 9)
        c.drawString(cx + 12, MARGIN + 240, label)
        c.setFillColor(PAPER_INK); c.setFont(F_ITALIC, 11)
        c.drawString(cx + 12, MARGIN + 220, "Layer:  ______________")
        c.drawString(cx + 12, MARGIN + 198, "Sublayer (★):  ______________")
        c.drawString(cx + 12, MARGIN + 176, "Why it's defensible:")
        for j in range(4):
            c.setStrokeColor(PAPER_RULE); c.setLineWidth(0.4)
            c.line(cx + 12, MARGIN + 150 - j*18, cx + card_w - 12, MARGIN + 150 - j*18)

    # Footer line
    c.setFillColor(HexColor("#0f172a")); c.setFont(F_ITALIC, 11)
    c.drawCentredString(W/2, MARGIN + 50,
        "Read the full framework + 50 sublayers at supplychainofai.com/framework")
    draw_footer(c, total, total)
    c.showPage()

# ── Build ─────────────────────────────────────────────────────────────
def build(path):
    total = 1 + 1 + len(LAYERS) + 1  # cover + how-to + 10 layers + conclusion
    c = canvas.Canvas(path, pagesize=PAGE)
    cover(c, total)
    how_to_use(c, total)
    for i, (lid, short, analogy, summary, subs) in enumerate(LAYERS, start=3):
        layer_page(c, i, total, lid, short, analogy, summary, subs)
    conclusion(c, total)
    c.save()
    print(f"Wrote {path}  ·  {total} pages")

if __name__ == "__main__":
    build("public/supply-chain-of-intelligence.pdf")
