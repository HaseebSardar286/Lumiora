from collections import deque
import os
from PIL import Image

src = r"D:\Portfolio\lumiora\public\logo-concepts\07-badge-word.jpg"
out_brand = r"D:\Portfolio\lumiora\public\brand-logo.png"
out_orig = r"D:\Portfolio\lumiora\public\brand-logo-source-07.jpg"
out_icon = r"D:\Portfolio\lumiora\src\app\icon.png"
out_apple = r"D:\Portfolio\lumiora\src\app\apple-icon.png"
out_favicon = r"D:\Portfolio\lumiora\public\favicon.ico"
backup = r"D:\Portfolio\lumiora\public\brand-logo-previous.png"

im = Image.open(src).convert("RGBA")
if os.path.exists(out_brand):
    Image.open(out_brand).convert("RGBA").save(backup)
im.convert("RGB").save(out_orig, quality=95)

pixels = im.load()
w, h = im.size
visited = [[False] * w for _ in range(h)]
q = deque()


def is_bg(r, g, b, a):
    return a > 0 and r > 245 and g > 245 and b > 245


for x in range(w):
    q.append((x, 0))
    q.append((x, h - 1))
for y in range(h):
    q.append((0, y))
    q.append((w - 1, y))

while q:
    x, y = q.popleft()
    if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
        continue
    visited[y][x] = True
    r, g, b, a = pixels[x, y]
    if not is_bg(r, g, b, a):
        continue
    pixels[x, y] = (r, g, b, 0)
    q.append((x + 1, y))
    q.append((x - 1, y))
    q.append((x, y + 1))
    q.append((x, y - 1))

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if a == 0:
            continue
        if r > 250 and g > 250 and b > 250:
            pixels[x, y] = (r, g, b, 0)

bbox = im.getbbox()
if bbox:
    pad = 40
    x0 = max(0, bbox[0] - pad)
    y0 = max(0, bbox[1] - pad)
    x1 = min(w, bbox[2] + pad)
    y1 = min(h, bbox[3] + pad)
    im = im.crop((x0, y0, x1, y1))

bw, bh = im.size
side = max(bw, bh)
canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
canvas.paste(im, ((side - bw) // 2, (side - bh) // 2), im)
canvas.save(out_brand, optimize=True)
print("brand", canvas.size, "bbox", bbox)

cw, ch = canvas.size
badge = canvas.crop((0, 0, cw, int(ch * 0.62)))
bb = badge.getbbox()
if bb:
    badge = badge.crop(bb)
    side2 = max(badge.size)
    badge_sq = Image.new("RGBA", (side2, side2), (0, 0, 0, 0))
    badge_sq.paste(badge, ((side2 - badge.size[0]) // 2, (side2 - badge.size[1]) // 2), badge)
else:
    badge_sq = canvas


def fit(img, size):
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    tmp = img.copy()
    tmp.thumbnail((size, size), Image.Resampling.LANCZOS)
    out.paste(tmp, ((size - tmp.size[0]) // 2, (size - tmp.size[1]) // 2), tmp)
    return out


fit(badge_sq, 64).save(out_icon, optimize=True)
fit(badge_sq, 180).save(out_apple, optimize=True)
fit(badge_sq, 32).save(out_favicon, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print("icons ok")
total = canvas.size[0] * canvas.size[1]
transparent = sum(1 for p in canvas.getdata() if p[3] == 0)
print("transparent_ratio", round(transparent / total, 3))
