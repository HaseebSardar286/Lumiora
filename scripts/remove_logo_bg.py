"""Remove logo background thoroughly via edge flood-fill + color rules."""
from PIL import Image
from collections import deque
import os

backup = r"D:\Portfolio\lumiora\public\8bitfieldlogo-original.png"
out = r"D:\Portfolio\lumiora\public\8bitfieldlogo.png"

img = Image.open(backup).convert("RGBA")
w, h = img.size
px = img.load()


def is_background(r, g, b):
    br = (r + g + b) / 3.0
    sat = max(r, g, b) - min(r, g, b)

    # Dark charcoal plate
    if br < 85 and sat < 40:
        return True

    # Soft dark halo / dither around logo
    if br < 110 and sat < 50:
        return True

    # Near white (if any)
    if br > 230 and sat < 35:
        return True

    return False


# Flood fill from edges so we only clear connected background,
# preserving dark navy outlines that are part of the logo art.
visited = [[False] * w for _ in range(h)]
q = deque()

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
    r, g, b, a = px[x, y]
    if not is_background(r, g, b):
        continue
    px[x, y] = (0, 0, 0, 0)
    q.append((x + 1, y))
    q.append((x - 1, y))
    q.append((x, y + 1))
    q.append((x, y - 1))

# Clean leftover fringe: low-alpha / desaturated pixels near cleared areas
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if a == 0:
            continue
        br = (r + g + b) / 3.0
        sat = max(r, g, b) - min(r, g, b)
        # Drop weak grain fringe
        if sat < 28 and br < 120:
            # only if neighbor is transparent (edge fringe)
            edge = False
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h and px[nx, ny][3] == 0:
                    edge = True
                    break
            if edge:
                px[x, y] = (0, 0, 0, 0)

bbox = img.getbbox()
if not bbox:
    raise SystemExit("Everything was removed — adjust thresholds")

pad = 24
l, t, r, b = bbox
img = img.crop((max(0, l - pad), max(0, t - pad), min(w, r + pad), min(h, b + pad)))

# Reasonable web size
max_side = 1000
ow, oh = img.size
scale = min(1.0, max_side / max(ow, oh))
if scale < 1:
    img = img.resize((int(ow * scale), int(oh * scale)), Image.Resampling.LANCZOS)

img.save(out, "PNG", optimize=True)
zero = sum(1 for p in img.getdata() if p[3] == 0)
print("saved", img.size, "bytes", os.path.getsize(out), "transparent%", round(100 * zero / (img.size[0] * img.size[1]), 1))
