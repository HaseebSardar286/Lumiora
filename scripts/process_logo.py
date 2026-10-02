from PIL import Image
import os

backup = r"D:\Portfolio\lumiora\public\8bitfieldlogo-original.png"
src = backup if os.path.exists(backup) else r"D:\Portfolio\lumiora\public\8bitfieldlogo.png"
out = r"D:\Portfolio\lumiora\public\8bitfieldlogo.png"
out_nav = r"D:\Portfolio\lumiora\public\8bitfieldlogo-nav.png"

img = Image.open(src).convert("RGBA")
pixels = img.load()
w, h = img.size


def is_bg(r, g, b, a):
    brightness = (r + g + b) / 3.0
    mx, mn = max(r, g, b), min(r, g, b)
    sat = mx - mn
    if brightness < 70 and sat < 35:
        return True
    if brightness > 235 and sat < 30:
        return True
    if r > 245 and g > 245 and b > 245:
        return True
    if 70 <= brightness <= 210 and sat < 22:
        return True
    return False


for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if is_bg(r, g, b, a):
            pixels[x, y] = (0, 0, 0, 0)

# Soften remaining semi-transparent grain near edges: if low alpha or weak gray, drop
pixels = img.load()
for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if a == 0:
            continue
        brightness = (r + g + b) / 3.0
        sat = max(r, g, b) - min(r, g, b)
        if a < 90 and sat < 40:
            pixels[x, y] = (0, 0, 0, 0)
        elif brightness > 220 and sat < 18 and a < 200:
            pixels[x, y] = (0, 0, 0, 0)

bbox = img.getbbox()
pad = 20
l, t, r, b = bbox
l, t = max(0, l - pad), max(0, t - pad)
r, b = min(w, r + pad), min(h, b + pad)
img = img.crop((l, t, r, b))

full = img.copy()
max_side = 900
ow, oh = full.size
scale = min(1.0, max_side / max(ow, oh))
if scale < 1:
    full = full.resize((int(ow * scale), int(oh * scale)), Image.Resampling.LANCZOS)
full.save(out, "PNG", optimize=True)
print("full", full.size, os.path.getsize(out))

# Nav: use nearly full lockup but scale to header height (56px display => 112px @2x)
# Wider is better — keep full composition, just resize by HEIGHT
nav_h = 112
nav_w = max(1, int(img.size[0] * (nav_h / img.size[1])))
nav = img.resize((nav_w, nav_h), Image.Resampling.LANCZOS)
nav.save(out_nav, "PNG", optimize=True)
print("nav", nav.size, os.path.getsize(out_nav))
