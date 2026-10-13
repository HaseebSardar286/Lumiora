"""LinkedIn square posts (1200×1200) using the live brand-logo.png asset."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
LOGO_PATH = ROOT / "public" / "brand-logo.png"
OUT_DIR = ROOT / "marketing" / "linkedin"

NAVY = (11, 42, 74)  # #0B2A4A
SLATE = (71, 85, 105)
ORANGE = (255, 138, 31)
CYAN = (0, 168, 232)
BG = (243, 248, 252)
WHITE = (255, 255, 255)
SIZE = 1200

POSTS = [
    {
        "file": "linkedin-post-1-intro.png",
        "headline": "Software That Moves\nBusiness Forward",
        "sub": "Custom web apps, SaaS, mobile, backend & AI for businesses and startups.",
        "tag": "8bitfield.com",
        "card_lines": [
            ("Web & backend systems", ORANGE),
            ("SaaS & MVP products", CYAN),
            ("Mobile applications", ORANGE),
            ("AI / ML solutions", CYAN),
        ],
    },
    {
        "file": "linkedin-post-2-mvp.png",
        "headline": "From Idea to\nWorking Product",
        "sub": "MVP & SaaS development — ship the right features, then iterate with confidence.",
        "tag": "Build · Launch · Learn · Improve",
        "card_lines": [
            ("Core user flows", ORANGE),
            ("Auth & admin dashboards", CYAN),
            ("APIs & payments", ORANGE),
            ("Foundation to iterate on", CYAN),
        ],
    },
    {
        "file": "linkedin-post-3-ai.png",
        "headline": "AI That Solves\nReal Business Problems",
        "sub": "Computer vision, OCR, document processing & prediction APIs — practical, not hype.",
        "tag": "Discuss your use case · 8bitfield.com",
        "card_lines": [
            ("Image classification & detection", ORANGE),
            ("OCR & document processing", CYAN),
            ("Prediction APIs", ORANGE),
            ("Python ML services in your stack", CYAN),
        ],
    },
    {
        "file": "linkedin-post-4-practical.png",
        "headline": "Less Complexity.\nMore Results.",
        "sub": "Practical engineering, direct communication, and systems built to grow with you.",
        "tag": "Why teams choose 8BitField",
        "card_lines": [
            ("Practical engineering", ORANGE),
            ("Flexible specialist teams", CYAN),
            ("Direct communication", ORANGE),
            ("Built to grow", CYAN),
        ],
    },
    {
        "file": "linkedin-post-5-business-apps.png",
        "headline": "Beyond\nSpreadsheets",
        "sub": "Custom CRM, ERP, dashboards, booking systems & internal tools.",
        "tag": "Strategic software. Real business impact.",
        "card_lines": [
            ("CRM · ERP · Dashboards", ORANGE),
            ("Booking & inventory systems", CYAN),
            ("Customer & internal portals", ORANGE),
            ("One platform, clear workflows", CYAN),
        ],
    },
]


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    names = (
        [r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arialbd.ttf"]
        if bold
        else [r"C:\Windows\Fonts\segoeui.ttf", r"C:\Windows\Fonts\arial.ttf"]
    )
    for p in names:
        path = Path(p)
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def paste_logo(base: Image.Image, logo: Image.Image, *, max_h: int = 130) -> None:
    w, h = logo.size
    scale = max_h / h
    nw, nh = int(w * scale), int(h * scale)
    mark = logo.resize((nw, nh), Image.Resampling.LANCZOS)
    base.paste(mark, (56, 52), mark)


def draw_card(draw: ImageDraw.ImageDraw, y: int, h: int) -> None:
    draw.rounded_rectangle((56, y, SIZE - 56, y + h), radius=20, fill=WHITE, outline=(215, 230, 242))


def render_post(post: dict, logo: Image.Image) -> Image.Image:
    im = Image.new("RGB", (SIZE, SIZE), BG)
    draw = ImageDraw.Draw(im)
    draw.rectangle((0, 0, SIZE, 8), fill=ORANGE)

    paste_logo(im, logo)

    title_font = load_font(72, bold=True)
    sub_font = load_font(34)
    tag_font = load_font(26, bold=True)

    y = 220
    for line in post["headline"].split("\n"):
        draw.text((56, y), line, font=title_font, fill=NAVY)
        y += 82

    draw.text((56, y + 24), post["sub"], font=sub_font, fill=SLATE)

    card_y = 520
    card_h = 420
    draw_card(draw, card_y, card_h)

    accent_font = load_font(28, bold=True)
    by = card_y + 48
    for label, color in post["card_lines"]:
        draw.rounded_rectangle((88, by + 6, 108, by + 26), radius=4, fill=color)
        draw.text((128, by), label, font=accent_font, fill=NAVY)
        by += 56

    draw.rectangle((0, SIZE - 72, SIZE, SIZE), fill=NAVY)
    draw.text((56, SIZE - 52), post["tag"].upper(), font=tag_font, fill=WHITE)

    return im


def main() -> None:
    if not LOGO_PATH.exists():
        raise SystemExit(f"Missing logo: {LOGO_PATH}")

    logo = Image.open(LOGO_PATH).convert("RGBA")
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for post in POSTS:
        out = OUT_DIR / post["file"]
        render_post(post, logo).save(out, "PNG", optimize=True)
        print("wrote", out)

    copy_md = OUT_DIR / "linkedin-posts-copy.md"
    lines = ["# 8BitField LinkedIn posts\n", "Images use `public/brand-logo.png`.\n"]
    for i, post in enumerate(POSTS, 1):
        lines.append(f"## Post {i} — `{post['file']}`\n")
        lines.append(f"**Headline:** {post['headline'].replace(chr(10), ' ')}\n")
        lines.append(f"**On-image sub:** {post['sub']}\n\n")
    copy_md.write_text("".join(lines), encoding="utf-8")
    print("wrote", copy_md)


if __name__ == "__main__":
    main()
