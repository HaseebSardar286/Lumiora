"""Create a light-on-dark variant of the brand logo for footer / dark UI."""
from PIL import Image, ImageDraw, ImageFilter

src = r"D:\Portfolio\lumiora\public\brand-logo.png"
out = r"D:\Portfolio\lumiora\public\brand-logo-on-dark.png"
preview = r"D:\Portfolio\lumiora\public\logo-concepts\07-on-dark-preview.png"

im = Image.open(src).convert("RGBA")
pixels = im.load()
w, h = im.size


def is_navy(r, g, b, a, loose=False):
    if a < 20:
        return False
    if loose:
        # includes anti-aliased navy fringes
        return b > r and b > g and r < 120 and g < 140 and b < 200 and (b - r) > 10
    return r < 50 and g < 70 and b > 40 and b > r + 20 and b > g


def is_orange(r, g, b, a):
    return a > 40 and r > 170 and g < 170 and b < 150 and r > g and r > b


def is_near_white(r, g, b, a):
    return a > 40 and r > 200 and g > 200 and b > 200


ys = []
for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if a > 40 and (is_navy(r, g, b, a) or is_near_white(r, g, b, a) or is_orange(r, g, b, a)):
            ys.append(y)

ymin, ymax = min(ys), max(ys)
split_y = ymin + int((ymax - ymin) * 0.58)

out_im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
out_px = out_im.load()

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if a == 0:
            continue

        if is_orange(r, g, b, a):
            out_px[x, y] = (241, 90, 41, a)  # brand coral
            continue

        if y >= split_y:
            # Wordmark: any navy-ish -> solid white
            if is_navy(r, g, b, a, loose=True):
                out_px[x, y] = (255, 255, 255, 255)
            continue

        # Badge: white circle, navy pixels, orange kept above
        if is_navy(r, g, b, a, loose=True):
            out_px[x, y] = (255, 255, 255, 255)
        elif is_near_white(r, g, b, a):
            out_px[x, y] = (11, 31, 58, 255)

out_im.save(out, optimize=True)

# Preview on dark navy like the footer
bg = Image.new("RGBA", (w + 80, h + 80), (2, 12, 27, 255))  # brand-950-ish
bg.paste(out_im, (40, 40), out_im)
bg.convert("RGB").save(preview, quality=92)
print("wrote", out)
print("preview", preview)
