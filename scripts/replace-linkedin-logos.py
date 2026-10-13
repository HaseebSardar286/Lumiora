"""
Replace inconsistent logos in LinkedIn posts with brand-logo-source-07.jpg.
Covers old logo areas with a solid sampled background color, then pastes the official mark.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
LOGO_SRC = ROOT / "public" / "brand-logo-source-07.jpg"
ASSETS = Path(r"C:\Users\ATOnline\.cursor\projects\d-Portfolio\assets")
OUT_DIR = ROOT / "marketing" / "linkedin"

SOURCES = [
    (
        "linkedin-post-1-intro.png",
        ASSETS
        / "c__Users_ATOnline_AppData_Roaming_Cursor_User_workspaceStorage_4c083f059a899a581eceaa75acea832a_images_linkedin-post-1-intro-8e322f31-3649-466d-8b84-696f63b3dc18.jpg",
        {
            "covers": [(16, 16, 300, 85)],
            "sample_at": (350, 40),
            "logo_xy": (42, 24),
            "logo_h": 110,
        },
    ),
    (
        "linkedin-post-2-mvp.png",
        ASSETS
        / "c__Users_ATOnline_AppData_Roaming_Cursor_User_workspaceStorage_4c083f059a899a581eceaa75acea832a_images_linkedin-post-2-mvp-d172da25-bbc2-4437-8083-ebe4281a5cb8.jpg",
        {
            "covers": [(12, 12, 340, 145)],
            "sample_at": (500, 40),
            "logo_xy": (36, 14),
            "logo_h": 100,
            "extra_covers": [
                {"box": (16, 900, 90, 995), "sample_at": (120, 940)},
            ],
        },
    ),
    (
        "linkedin-post-3-ai.png",
        ASSETS
        / "c__Users_ATOnline_AppData_Roaming_Cursor_User_workspaceStorage_4c083f059a899a581eceaa75acea832a_images_linkedin-post-3-ai-a4fab302-c33b-41fa-a20a-696b82ec1432.jpg",
        {
            "covers": [(8, 8, 420, 190)],
            "sample_at": (520, 40),
            "logo_xy": (36, 14),
            "logo_h": 110,
        },
    ),
    (
        "linkedin-post-4-practical.png",
        ASSETS
        / "c__Users_ATOnline_AppData_Roaming_Cursor_User_workspaceStorage_4c083f059a899a581eceaa75acea832a_images_linkedin-post-4-practical-cd387bbe-75c2-49c1-8347-b57cc6d205f4.jpg",
        {
            "covers": [(12, 14, 345, 100)],
            "sample_at": (450, 40),
            "logo_xy": (36, 16),
            "logo_h": 105,
        },
    ),
    (
        "linkedin-post-5-business-apps.png",
        ASSETS
        / "c__Users_ATOnline_AppData_Roaming_Cursor_User_workspaceStorage_4c083f059a899a581eceaa75acea832a_images_linkedin-post-5-business-apps-362df42b-d0c1-4c4b-90b4-36fa8b4a0aaa.jpg",
        {
            "covers": [(12, 12, 345, 95)],
            "sample_at": (520, 40),
            "logo_xy": (36, 10),
            "logo_h": 95,
            "extra_covers": [
                # Wipe entire sidebar header brand row (keep within sidebar width)
                {"box": (480, 286, 562, 352), "color": (0, 27, 54)},
            ],
            # Small official badge only — no wordmark (sidebar is narrow)
            "sidebar_badge": {"xy": (498, 298), "h": 34},
            "sidebar_wordmark": False,
        },
    ),
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


def prepare_badge(full: Image.Image) -> Image.Image:
    w, h = full.size
    top = full.crop((0, 0, w, int(h * 0.58)))
    bbox = top.getbbox()
    return top.crop(bbox) if bbox else top


def fill(im: Image.Image, box: tuple[int, int, int, int], color: tuple[int, int, int]) -> None:
    ImageDraw.Draw(im).rectangle(list(box), fill=(*color, 255))


def sample(im: Image.Image, xy: tuple[int, int]) -> tuple[int, int, int]:
    c = im.getpixel(xy)
    return c[0], c[1], c[2]


def paste_logo(base: Image.Image, logo: Image.Image, xy: tuple[int, int], target_h: int) -> None:
    w, h = logo.size
    scale = target_h / h
    nw, nh = max(1, int(w * scale)), max(1, int(h * scale))
    resized = logo.resize((nw, nh), Image.Resampling.LANCZOS)
    base.paste(resized, xy, resized)


def process_one(
    out_name: str,
    src: Path,
    cfg: dict,
    logo: Image.Image,
    badge: Image.Image,
) -> Path:
    im = Image.open(src).convert("RGBA")
    bg = sample(im, cfg["sample_at"])

    for box in cfg["covers"]:
        fill(im, box, bg)

    for item in cfg.get("extra_covers", []):
        color = item.get("color") or sample(im, item["sample_at"])
        fill(im, item["box"], color)

    paste_logo(im, logo, cfg["logo_xy"], cfg["logo_h"])

    if "sidebar_badge" in cfg:
        sb = cfg["sidebar_badge"]
        paste_logo(im, badge, sb["xy"], sb["h"])
        if cfg.get("sidebar_wordmark"):
            # Horizontal wordmark for dark sidebar
            try:
                from PIL import ImageFont

                font = ImageFont.truetype(r"C:\Windows\Fonts\arialbd.ttf", 18)
            except Exception:
                font = ImageFont.load_default()
            draw = ImageDraw.Draw(im)
            bx, by = sb["xy"]
            draw.text((bx + sb["h"] + 8, by + sb["h"] // 2 - 10), "8BitField", font=font, fill=(255, 255, 255, 255))

    out = OUT_DIR / out_name
    rgb = im.convert("RGB")
    rgb.save(out, "PNG", optimize=True)
    rgb.save(OUT_DIR / out_name.replace(".png", ".jpg"), "JPEG", quality=93)
    return out


def main() -> None:
    if not LOGO_SRC.exists():
        raise SystemExit(f"Missing {LOGO_SRC}")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    logo = prepare_logo()
    badge = prepare_badge(logo)

    for out_name, src, cfg in SOURCES:
        if not src.exists():
            print("SKIP", src)
            continue
        print("wrote", process_one(out_name, src, cfg, logo, badge))


if __name__ == "__main__":
    main()
