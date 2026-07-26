"""
Shared PDF renderer for the Supply Chain of Intelligence document set.

Produces academically formatted PDFs (DejaVu Serif body, layer-colored
accents) from a simple block list. Used by build_papers.py.
"""
import os
import subprocess

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    KeepTogether,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


def _font(query):
    return subprocess.check_output(["fc-match", "-f", "%{file}", query], text=True).strip()


pdfmetrics.registerFont(TTFont("Serif", _font("DejaVu Serif")))
pdfmetrics.registerFont(TTFont("Serif-Bold", _font("DejaVu Serif:bold")))
pdfmetrics.registerFont(TTFont("Serif-Italic", _font("DejaVu Serif:italic")))
pdfmetrics.registerFont(TTFont("Sans", _font("DejaVu Sans")))
pdfmetrics.registerFont(TTFont("Sans-Bold", _font("DejaVu Sans:bold")))
pdfmetrics.registerFontFamily("Serif", normal="Serif", bold="Serif-Bold", italic="Serif-Italic")

INK = colors.HexColor("#0f172a")
MUTED = colors.HexColor("#4a5568")
RULE = colors.HexColor("#c5d0de")
ACCENT = colors.HexColor("#4f46e5")
GOLD = colors.HexColor("#b08a3a")
TINT = colors.HexColor("#f2f5fa")

LAYER_HEX = {
    "L-1": "#372e63", "L0": "#4a4373", "L1": "#923cb8", "L2": "#3b5a96",
    "L3": "#4787b4", "L4": "#1fb3a8", "L5": "#2e8a55", "L6": "#8a6d10",
    "L7": "#d16a1e", "L8": "#b03065",
}
LAYER_TINT = {
    "L-1": "#ebe5f0", "L0": "#eae5f0", "L1": "#f1e5f5", "L2": "#e5ebf4",
    "L3": "#e3ecf4", "L4": "#dff2f0", "L5": "#e3efe7", "L6": "#f5edd6",
    "L7": "#f5e7d8", "L8": "#f3e0e8",
}

S = {
    "title": ParagraphStyle("title", fontName="Serif-Bold", fontSize=24, leading=29,
                            textColor=INK, spaceAfter=10),
    "subtitle": ParagraphStyle("subtitle", fontName="Serif-Italic", fontSize=13.5, leading=19,
                               textColor=MUTED, spaceAfter=18),
    "cover-meta": ParagraphStyle("cover-meta", fontName="Sans", fontSize=9.5, leading=15,
                                 textColor=MUTED),
    "h1": ParagraphStyle("h1", fontName="Serif-Bold", fontSize=16, leading=20, textColor=INK,
                         spaceBefore=20, spaceAfter=8),
    "h2": ParagraphStyle("h2", fontName="Serif-Bold", fontSize=12.5, leading=16, textColor=INK,
                         spaceBefore=14, spaceAfter=5),
    "h3": ParagraphStyle("h3", fontName="Sans-Bold", fontSize=9.5, leading=13,
                         textColor=ACCENT, spaceBefore=11, spaceAfter=3),
    "p": ParagraphStyle("p", fontName="Serif", fontSize=10, leading=15.4, textColor=INK,
                        alignment=TA_JUSTIFY, spaceAfter=8),
    "small": ParagraphStyle("small", fontName="Serif", fontSize=8.8, leading=13.4,
                            textColor=MUTED, alignment=TA_JUSTIFY, spaceAfter=6),
    "ref": ParagraphStyle("ref", fontName="Serif", fontSize=8.8, leading=13,
                          textColor=INK, spaceAfter=5, leftIndent=16, firstLineIndent=-16),
    "bullet": ParagraphStyle("bullet", fontName="Serif", fontSize=10, leading=15,
                             textColor=INK, leftIndent=15, bulletIndent=3, spaceAfter=4),
    "quote": ParagraphStyle("quote", fontName="Serif-Italic", fontSize=11, leading=17,
                            textColor=INK, leftIndent=14, rightIndent=10, spaceBefore=6,
                            spaceAfter=10),
    "caption": ParagraphStyle("caption", fontName="Sans", fontSize=8, leading=11,
                              textColor=MUTED, spaceAfter=10),
    "cell": ParagraphStyle("cell", fontName="Serif", fontSize=8.8, leading=12.4, textColor=INK),
    "cellb": ParagraphStyle("cellb", fontName="Sans-Bold", fontSize=8.5, leading=12, textColor=INK),
    "toc": ParagraphStyle("toc", fontName="Serif", fontSize=10, leading=17, textColor=INK),
    "center": ParagraphStyle("center", fontName="Sans", fontSize=9, leading=14,
                             textColor=MUTED, alignment=TA_CENTER),
}


def rule(color=RULE, width=0.6, before=2, after=8):
    return HRFlowable(width="100%", thickness=width, color=color,
                      spaceBefore=before, spaceAfter=after)


def callout(title, body, color=ACCENT, tint=TINT):
    inner = [Paragraph(title, S["h3"]), Paragraph(body, S["p"])]
    t = Table([[inner]], colWidths=[6.5 * inch])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), tint),
        ("LINEBEFORE", (0, 0), (0, -1), 2.2, color),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    return KeepTogether([t, Spacer(1, 10)])


def data_table(rows, widths, header=True):
    body = [[Paragraph(c, S["cellb"] if (header and r == 0) else S["cell"]) for c in row]
            for r, row in enumerate(rows)]
    t = Table(body, colWidths=[w * inch for w in widths], repeatRows=1 if header else 0)
    style = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.4, RULE),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]
    if header:
        style.append(("BACKGROUND", (0, 0), (-1, 0), TINT))
    t.setStyle(TableStyle(style))
    return KeepTogether([t, Spacer(1, 10)])


def layer_header(layer_id, name, tagline):
    chip = Table([[Paragraph(f'<font color="#ffffff"><b>{layer_id}</b></font>', S["cellb"])]],
                 colWidths=[0.62 * inch])
    chip.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor(LAYER_HEX[layer_id])),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    head = Table([[chip, Paragraph(f"<b>{name}</b>", S["h1"])]], colWidths=[0.8 * inch, 5.7 * inch])
    head.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return [head,
            HRFlowable(width="100%", thickness=2, color=colors.HexColor(LAYER_HEX[layer_id]),
                       spaceBefore=4, spaceAfter=8),
            Paragraph(f"<i>{tagline}</i>", S["small"])]


def build(path, blocks, running_title, cover=None):
    """blocks: list of (kind, payload). Renders to `path`."""
    os.makedirs(os.path.dirname(path), exist_ok=True)

    def decorate(canvas, doc):
        canvas.saveState()
        canvas.setFont("Sans", 7.5)
        canvas.setFillColor(MUTED)
        if doc.page > 1:
            canvas.setStrokeColor(RULE)
            canvas.setLineWidth(0.4)
            canvas.line(1 * inch, 0.78 * inch, 7.5 * inch, 0.78 * inch)
            canvas.drawString(1 * inch, 0.6 * inch, running_title)
            canvas.drawRightString(7.5 * inch, 0.6 * inch, str(doc.page))
        canvas.restoreState()

    def cover_bg(canvas, doc):
        canvas.saveState()
        x = 0.0
        for lid in ["L-1", "L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"]:
            canvas.setFillColor(colors.HexColor(LAYER_HEX[lid]))
            canvas.rect(x, 10.7 * inch, 0.85 * inch, 0.32 * inch, stroke=0, fill=1)
            x += 0.85 * inch
        canvas.restoreState()
        decorate(canvas, doc)

    doc = BaseDocTemplate(path, pagesize=letter,
                          leftMargin=1 * inch, rightMargin=1 * inch,
                          topMargin=0.95 * inch, bottomMargin=1 * inch,
                          title=running_title, author="Anand Arivukkarasu")
    frame = Frame(1 * inch, 1 * inch, 6.5 * inch, 9.05 * inch, id="body",
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    cover_frame = Frame(1 * inch, 1 * inch, 6.5 * inch, 8.6 * inch, id="cover",
                        leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[cover_frame], onPage=cover_bg),
        PageTemplate(id="body", frames=[frame], onPage=decorate),
    ])

    story = []
    if cover:
        story += cover
        story.append(NextPageTemplate("body"))
        story.append(PageBreak())
    else:
        story.append(NextPageTemplate("body"))

    for blk in blocks:
        kind, payload = (blk, None) if isinstance(blk, str) else blk
        if kind == "h1":
            story.append(KeepTogether([Paragraph(payload, S["h1"]),
                                       rule(GOLD, 1.1, 0, 8)]))

        elif kind == "h2":
            story.append(Paragraph(payload, S["h2"]))
        elif kind == "h3":
            story.append(Paragraph(payload.upper(), S["h3"]))
        elif kind == "p":
            story.append(Paragraph(payload, S["p"]))
        elif kind == "small":
            story.append(Paragraph(payload, S["small"]))
        elif kind == "ref":
            story.append(Paragraph(payload, S["ref"]))
        elif kind == "quote":
            story.append(Paragraph(payload, S["quote"]))
        elif kind == "caption":
            story.append(Paragraph(payload, S["caption"]))
        elif kind == "toc":
            story.append(Paragraph(payload, S["toc"]))
        elif kind == "bullets":
            for b in payload:
                story.append(Paragraph(b, S["bullet"], bulletText="\u2022"))
            story.append(Spacer(1, 6))
        elif kind == "numbers":
            for i, b in enumerate(payload, 1):
                story.append(Paragraph(b, S["bullet"], bulletText=f"{i}."))
            story.append(Spacer(1, 6))
        elif kind == "callout":
            story.append(callout(*payload))
        elif kind == "table":
            rows, widths = payload
            story.append(data_table(rows, widths))
        elif kind == "table-split":
            # Same as "table" but allowed to break across pages.
            rows, widths = payload
            story.append(data_table(rows, widths, keep=False))
            story.append(Spacer(1, 10))


        elif kind == "layer":
            story += layer_header(*payload)
        elif kind == "rule":
            story.append(rule())
        elif kind == "space":
            story.append(Spacer(1, payload))
        elif kind == "pagebreak":
            story.append(PageBreak())
        else:
            raise ValueError(f"unknown block: {kind}")

    doc.build(story)
    return path


def cover_page(title, subtitle, kicker, meta_lines, abstract=None):
    out = [Spacer(1, 1.0 * inch),
           Paragraph(kicker.upper().replace("&MIDDOT;", "\u00b7"), S["h3"]),
           Paragraph(title, S["title"]),
           Paragraph(subtitle, S["subtitle"]),
           rule(GOLD, 1.4, 0, 16)]
    if abstract:
        out.append(Paragraph("ABSTRACT", S["h3"]))
        out.append(Paragraph(abstract, S["p"]))
        out.append(Spacer(1, 14))
    out.append(rule(RULE, 0.6, 6, 10))
    for line in meta_lines:
        out.append(Paragraph(line, S["cover-meta"]))
    return out
