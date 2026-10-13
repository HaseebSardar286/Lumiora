"""Stamp brand-logo-source-07.jpg onto LinkedIn batch-2 images."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
LOGO_SRC = ROOT / "public" / "brand-logo-source-07.jpg"
ASSETS = Path(r"C:\Users\ATOnline\.cursor\projects\d-Portfolio\assets")
OUT = ROOT / "marketing" / "linkedin"

JOBS = [
    {
        "src": ASSETS / "linkedin-post-6-ops.jpg",
        "out": "linkedin-post-6-ops.png",
        "covers": [(8, 8, 280, 160)],
        "sample_at": (400, 40),
        "logo_xy": (36, 18),
        "logo_h": 120,
    },
    {
        "src": ASSETS / "linkedin-post-7-mvp-truth.jpg",
        "out": "linkedin-post-7-mvp-truth.png",
        "covers": [(8, 8, 420, 130)],
        "sample_at": (500, 40),
        "logo_xy": (36, 16),
        "logo_h": 110,
    },
    {
        "src": ASSETS / "linkedin-post-8-ai-roi.jpg",
        "out": "linkedin-post-8-ai-roi.png",
        "covers": [(8, 8, 360, 150)],
        "sample_at": (500, 40),
        "logo_xy": (36, 16),
        "logo_h": 115,
    },
    {
        "src": ASSETS / "linkedin-post-9-communication.jpg",
        "out": "linkedin-post-9-communication.png",
        "covers": [(8, 8, 300, 160)],
        "sample_at": (420, 40),
        "logo_xy": (36, 18),
        "logo_h": 120,
    },
    {
        "src": ASSETS / "linkedin-post-10-grow.jpg",
        "out": "linkedin-post-10-grow.png",
        "covers": [(8, 8, 280, 160)],
        "sample_at": (400, 40),
        "logo_xy": (36, 18),
        "logo_h": 120,
    },
]


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


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    logo = prepare_logo()

    for job in JOBS:
        if not job["src"].exists():
            print("SKIP", job["src"])
            continue
        im = Image.open(job["src"]).convert("RGBA")
        sx, sy = job["sample_at"]
        bg = im.getpixel((sx, sy))[:3]
        draw = ImageDraw.Draw(im)
        for box in job["covers"]:
            draw.rectangle(list(box), fill=(*bg, 255))
        w, h = logo.size
        scale = job["logo_h"] / h
        nw, nh = max(1, int(w * scale)), max(1, int(h * scale))
        mark = logo.resize((nw, nh), Image.Resampling.LANCZOS)
        im.paste(mark, job["logo_xy"], mark)
        rgb = im.convert("RGB")
        png = OUT / job["out"]
        jpg = OUT / job["out"].replace(".png", ".jpg")
        rgb.save(png, "PNG", optimize=True)
        rgb.save(jpg, "JPEG", quality=93)
        print("wrote", png.name)


if __name__ == "__main__":
    main()
