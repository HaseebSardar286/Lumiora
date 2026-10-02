from PIL import Image
import os

src = r"D:\Portfolio\lumiora\public\8bitfieldlogo.png"
out_nav = r"D:\Portfolio\lumiora\public\8bitfieldlogo-nav.png"

img = Image.open(src).convert("RGBA")
w, h = img.size

# Split: upper graphic vs lower wordmark (approx based on composition)
graphic = img.crop((0, 0, w, int(h * 0.58)))
wordmark = img.crop((0, int(h * 0.52), w, h))

# Trim each to content
def trim(im, pad=4):
    box = im.getbbox()
    if not box:
        return im
    l, t, r, b = box
    return im.crop((
        max(0, l - pad),
        max(0, t - pad),
        min(im.size[0], r + pad),
        min(im.size[1], b + pad),
    ))

graphic = trim(graphic)
wordmark = trim(wordmark)

# Target nav height @2x
target_h = 112
g_scale = target_h / graphic.size[1]
g = graphic.resize((max(1, int(graphic.size[0] * g_scale)), target_h), Image.Resampling.LANCZOS)

wm_scale = target_h / wordmark.size[1]
wm = wordmark.resize((max(1, int(wordmark.size[0] * wm_scale)), target_h), Image.Resampling.LANCZOS)

gap = 10
nav_w = g.size[0] + gap + wm.size[0]
nav = Image.new("RGBA", (nav_w, target_h), (0, 0, 0, 0))
# vertically center both
nav.paste(g, (0, (target_h - g.size[1]) // 2), g)
nav.paste(wm, (g.size[0] + gap, (target_h - wm.size[1]) // 2), wm)
nav.save(out_nav, "PNG", optimize=True)
print("nav horizontal", nav.size, os.path.getsize(out_nav))
