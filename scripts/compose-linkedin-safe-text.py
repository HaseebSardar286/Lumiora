"""
Compose LinkedIn posts with guaranteed readable text (no cutoffs / overlaps).
Uses visual backgrounds + official logo + PIL text with safe margins.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
LOGO_SRC = ROOT / "public" / "brand-logo-source-07.jpg"
ASSETS = Path(r"C:\Users\ATOnline\.cursor\projects\d-Portfolio\assets")
OUT = ROOT / "marketing" / "linkedin"

SIZE = 1024
MARGIN = 56
FOOTER_H = 84
HEADER_H = 330

NAVY = (11, 42, 74)
SLATE = (71, 85, 105)
WHITE = (255, 255, 255)
ORANGE = (255, 138, 31)
PANEL = (248, 250, 252)

POSTS = [
    {
        "vis": "li-vis-6-ops.jpg",
        "out": "linkedin-post-6-ops.png",
        "headline": "Stop managing work in spreadsheets.",
        "sub": "Custom ops systems that cut busywork every week.",
        "footer": "8bitfield.com  ·  Start a project",
        "vis_top": 310,
    },
    {
        "vis": "li-vis-7-mvp.jpg",
        "out": "linkedin-post-7-mvp-truth.png",
        "headline": "An MVP is not a smaller dream product.",
        "sub": "It is the fastest way to learn what customers need.",
        "footer": "Build your MVP  →  8bitfield.com",
        "vis_top": 320,
    },
    {
        "vis": "li-vis-8-ai.jpg",
        "out": "linkedin-post-8-ai-roi.png",
        "headline": "If AI does not save time or money, it is just a demo.",
        "sub": "Practical AI for one clear business problem.",
        "footer": "Computer Vision · OCR · Prediction APIs · 8bitfield.com",
        "vis_top": 290,
    },
    {
        "vis": "li-vis-9-comms.jpg",
        "out": "linkedin-post-9-communication.png",
        "headline": "You should not need a translator to talk to your engineering team.",
        "sub": "Direct communication. Clear scope. Visible weekly progress.",
        "footer": "Work with the people building it · 8bitfield.com",
        "vis_top": 300,
    },
    {
        "vis": "li-vis-10-grow.jpg",
        "out": "linkedin-post-10-grow.png",
        "headline": "Launch day is day one — not the finish line.",
        "sub": "Software that grows with your business, not breaks under it.",
        "footer": "Build foundations that last · 8bitfield.com",
        "vis_top": 300,
    },
]


def load_font(bold: bool, size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    names = (
        [r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arialbd.ttf"]
        if bold
        else [r"C:\Windows\Fonts\segoeui.ttf", r"C:\Windows\Fonts\arial.ttf"]
    )
    for p in names:
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def prepare_logo() -> Image.Image:
    im = Image.open(LOGO_SRC).convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r > 240 and g > 240 and b > 240:
                px[x, y] = (255, 255, 255, 0)
    bbox = im.getbbox()
    return im.crop(bbox) if bbox else im


def wrap_text(draw: ImageDraw.ImageDraw, text: str, fnt, max_width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    cur = ""
    for word in words:
        trial = (cur + " " + word).strip()
        if draw.textlength(trial, font=fnt) <= max_width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def compose(post: dict, logo: Image.Image) -> Image.Image:
    vis = Image.open(ASSETS / post["vis"]).convert("RGB").resize((SIZE, SIZE), Image.Resampling.LANCZOS)

    canvas = Image.new("RGB", (SIZE, SIZE), PANEL)
    draw = ImageDraw.Draw(canvas)

    # Visual between header and footer, inset so edges aren't clipped
    vis_area_top = HEADER_H
    vis_area_bottom = SIZE - FOOTER_H
    vis_h = vis_area_bottom - vis_area_top
    side_pad = 24
    cropped = vis.crop((40, post["vis_top"], SIZE - 40, SIZE - 20))
    fitted = cropped.resize((SIZE - 2 * side_pad, vis_h - 8), Image.Resampling.LANCZOS)
    canvas.paste(fitted, (side_pad, vis_area_top + 4))

    # Solid header panel — marketing text never overlaps visual
    draw.rectangle([0, 0, SIZE, HEADER_H], fill=PANEL)
    draw.line([(MARGIN, HEADER_H - 6), (SIZE - MARGIN, HEADER_H - 6)], fill=(226, 232, 240), width=2)

    # Orange accent
    draw.rectangle([0, 0, SIZE, 8], fill=ORANGE)

    # Logo with safe top margin
    mark_h = 92
    lw, lh = logo.size
    scale = mark_h / lh
    mark = logo.resize((max(1, int(lw * scale)), max(1, int(lh * scale))), Image.Resampling.LANCZOS)
    canvas_rgba = canvas.convert("RGBA")
    canvas_rgba.paste(mark, (MARGIN, 28), mark)
    canvas = canvas_rgba.convert("RGB")
    draw = ImageDraw.Draw(canvas)

    # Text — wrap inside safe width, never past margins
    max_w = SIZE - 2 * MARGIN
    headline_font = load_font(True, 38)
    while True:
        lines = wrap_text(draw, post["headline"], headline_font, max_w)
        if len(lines) <= 3 or headline_font.size <= 28:
            break
        headline_font = load_font(True, headline_font.size - 2)

    sub_font = load_font(False, 23)
    y = 28 + mark_h + 16
    line_gap = int(headline_font.size * 1.2)
    for line in lines:
        draw.text((MARGIN, y), line, font=headline_font, fill=NAVY)
        y += line_gap

    y += 10
    for line in wrap_text(draw, post["sub"], sub_font, max_w):
        draw.text((MARGIN, y), line, font=sub_font, fill=SLATE)
        y += int(sub_font.size * 1.3)

    # Footer with vertical centering and side padding
    draw.rectangle([0, SIZE - FOOTER_H, SIZE, SIZE], fill=NAVY)
    footer_font = load_font(True, 21)
    fw = draw.textlength(post["footer"], font=footer_font)
    while fw > SIZE - 2 * MARGIN and footer_font.size > 15:
        footer_font = load_font(True, footer_font.size - 1)
        fw = draw.textlength(post["footer"], font=footer_font)
    fx = (SIZE - fw) / 2
    fy = SIZE - FOOTER_H + (FOOTER_H - footer_font.size) // 2 - 1
    draw.text((fx, fy), post["footer"], font=footer_font, fill=WHITE)

    return canvas


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    logo = prepare_logo()
    for post in POSTS:
        if not (ASSETS / post["vis"]).exists():
            print("SKIP", post["vis"])
            continue
        im = compose(post, logo)
        path = OUT / post["out"]
        im.save(path, "PNG", optimize=True)
        im.save(OUT / post["out"].replace(".png", ".jpg"), "JPEG", quality=93)
        print("wrote", path.name)


if __name__ == "__main__":
    main()
