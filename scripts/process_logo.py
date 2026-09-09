"""
IRONFORGE-style portfolio — logo asset pipeline.

Takes the supplied mylogo.jpg (flattened artwork with a baked checkerboard
background) and produces:

  public/assets/logo-clean.png   - tightly cropped transparent emblem (web master)
  public/assets/logo-clean.webp  - same, optimized for web delivery
  public/assets/favicon.png      - 128px icon (browser favicon / icons)
  public/assets/favicon.svg      - optional vector reference (not generated here)
  public/assets/og-cover.png     - 1200x630 dark composed open-graph cover

Run from the repository root:
    python scripts/process_logo.py
"""

import os
import sys
from collections import deque

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "mylogo.jpg")
OUT = os.path.join(ROOT, "public", "assets")
os.makedirs(OUT, exist_ok=True)

# ---------------------------------------------------------------------------
# 1. Analyze source
# ---------------------------------------------------------------------------
img = Image.open(SRC).convert("RGBA")
w, h = img.size
print(f"source size: {w}x{h}")

px = img.load()

def border_samples(step=32):
    pts = []
    for x in range(0, w, step):
        pts.append(px[x, 0]); pts.append(px[x, h - 1])
    for y in range(0, h, step):
        pts.append(px[0, y]); pts.append(px[w - 1, y])
    return pts

samples = border_samples()
print("border sample count:", len(samples))
for c, n in sorted({tuple(s[:3]): samples.count(s) for s in samples}.items(),
                   key=lambda kv: -kv[1])[:8]:
    print("  border color:", c, "x", n)

# ---------------------------------------------------------------------------
# 2. Identify checkerboard colors (cluster border samples)
# ---------------------------------------------------------------------------
def cluster_colors(pixels, tol=24):
    clusters = []  # list of (mean, count)
    for p in pixels:
        for mean, count in clusters:
            if all(abs(p[i] - mean[i]) <= tol for i in range(3)):
                clusters[clusters.index((mean, count))] = (
                    tuple(int((mean[i] * count + p[i]) / (count + 1)) for i in range(3)),
                    count + 1,
                )
                break
        else:
            clusters.append((p[:3], 1))
    return clusters

clusters = cluster_colors([s for s in samples], tol=22)
clusters.sort(key=lambda c: -c[1])
print("clustered border colors:")
for c, n in clusters[:6]:
    print("  ", c, "x", n)

# checker colors: clusters covering > 3% of border samples
total = len(samples)
checker_colors = [c for c, n in clusters if n / total > 0.03][:3]
print("checker colors:", checker_colors)

if not checker_colors:
    print("!! no reliable background colors found — falling back to corner colors")
    checker_colors = [px[0, 0][:3], px[w - 1, 0][:3], px[0, h - 1][:3], px[w - 1, h - 1][:3]]

TOL = 26

def is_checker(p):
    for c in checker_colors:
        if all(abs(p[i] - c[i]) <= TOL for i in range(3)):
            return True
    return False

# ---------------------------------------------------------------------------
# 3. Flood-fill background from borders (keeps enclosed checker islands
#    from being removed while catching all connected background)
# ---------------------------------------------------------------------------
try:
    import cv2
    import numpy as np
    HAVE_CV2 = True
except ImportError:
    HAVE_CV2 = False

print("cv2 available:", HAVE_CV2)

if HAVE_CV2:
    arr = np.array(img.convert("RGB"))
    mask = np.zeros((h + 2, w + 2), np.uint8)
    seed = (0, 0)
    # find an actual background seed among the border
    for x, y in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0)]:
        if is_checker(arr[y, x]):
            seed = (x, y)
            break
    # flood fill connected checker pixels (both checker shades)
    filled = np.zeros((h, w), np.uint8)
    for c in checker_colors:
        lo = tuple(max(0, int(v - TOL)) for v in c)
        hi = tuple(min(255, int(v + TOL)) for v in c)
        m = cv2.inRange(arr, lo, hi)
        m8 = m.astype(np.uint8)
        fm = np.zeros((h + 2, w + 2), np.uint8)
        cv2.floodFill(m8, fm, seed, 255)
        filled |= (fm[1:-1, 1:-1] > 0)
    alpha = np.where(filled > 0, 0, 255).astype(np.uint8)
else:
    from PIL import ImageFilter

    # Pure-PIL flood fill on a downsampled checker mask.
    # Only pixels that look like a checker square AND are connected to the
    # outer border are removed — enclosed emblem detail is preserved.
    DS = 4  # downsample factor
    dw, dh = (w + DS - 1) // DS, (h + DS - 1) // DS
    mask = Image.new("L", (dw, dh), 0)
    mpx = mask.load()
    for y in range(dh):
        sy = min(y * DS, h - 1)
        for x in range(dw):
            sx = min(x * DS, w - 1)
            if is_checker(px[sx, sy]):
                mpx[x, y] = 255

    filled = bytearray(dw * dh)  # 0 = unchecked, 1 = filled bg
    q = deque()
    seeds = [(0, 0), (dw - 1, 0), (0, dh - 1), (dw - 1, dh - 1), (dw // 2, 0), (dw // 2, dh - 1)]
    for sx, sy in seeds:
        if mpx[sx, sy] and not filled[sy * dw + sx]:
            filled[sy * dw + sx] = 1
            q.append((sx, sy))
    while q:
        x, y = q.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < dw and 0 <= ny < dh:
                i = ny * dw + nx
                if not filled[i] and mpx[nx, ny]:
                    filled[i] = 1
                    q.append((nx, ny))

    alpha_small = Image.frombytes("L", (dw, dh), bytes(255 if v == 0 else 0 for v in filled))
    # erode the mask a touch so gray checker fringes don't halo the emblem
    alpha_small = alpha_small.filter(ImageFilter.MinFilter(3))
    alpha = alpha_small.resize((w, h), Image.BILINEAR).point(lambda v: 255 if v > 200 else 0)

if HAVE_CV2:
    img.putalpha(Image.fromarray(alpha))
else:
    img.putalpha(alpha)

# ---------------------------------------------------------------------------
# 3b. Second pass — key out ENCLOSED checker pockets (e.g. the white socket
#     behind the emblem's eyes) that the flood fill could not reach.
#     Tight tolerance protects dark metal and saturated cyan.
# ---------------------------------------------------------------------------
TIGHT = 18
apx = img.getchannel("A")
pixels = img.load()
apixels = apx.load()
for y in range(h):
    for x in range(w):
        if apixels[x, y] == 0:
            continue
        p = pixels[x, y]
        hit = False
        for c in checker_colors:
            if all(abs(p[i] - c[i]) <= TIGHT for i in range(3)):
                hit = True
                break
        if hit:
            apixels[x, y] = 0

# gentle de-fringe: erode alpha 1px then blur the alpha edge slightly
img.putalpha(apx.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.6)))

# ---------------------------------------------------------------------------
# 4. Trim to emblem bounds + slight pad
# ---------------------------------------------------------------------------
bbox = img.getbbox()
print("content bbox:", bbox)
if bbox is None:
    print("!! removal failed — keeping original")
    img = Image.open(SRC).convert("RGBA")
    bbox = (0, 0, w, h)

PAD = 18
l = max(0, bbox[0] - PAD)
t = max(0, bbox[1] - PAD)
r = min(w, bbox[2] + PAD)
b = min(h, bbox[3] + PAD)
trimmed = img.crop((l, t, r, b))
tw, th = trimmed.size
print(f"trimmed size: {tw}x{th}")

MAX_W = 1600
if tw > MAX_W:
    s = MAX_W / tw
    trimmed = trimmed.resize((MAX_W, max(1, int(th * s))), Image.LANCZOS)
    tw, th = trimmed.size
    print(f"resized to: {tw}x{th}")

trimmed.save(os.path.join(OUT, "logo-clean.png"))
try:
    trimmed.convert("RGB").save(os.path.join(OUT, "logo-clean.webp"), "WEBP", quality=88, method=6)
    print("webp ok")
except Exception as e:
    print("webp skipped:", e)

# favicon 128 + 512
fav = trimmed.copy()
fav.thumbnail((128, 128), Image.LANCZOS)
fav.save(os.path.join(OUT, "favicon.png"))
fav512 = trimmed.copy()
fav512.thumbnail((512, 512), Image.LANCZOS)
fav512.save(os.path.join(OUT, "logo-512.png"))

# og cover: dark canvas, emblem centered-left with cyan band
og = Image.new("RGB", (1200, 630), (10, 13, 18))
mark = trimmed.copy()
mw = 340
mark.thumbnail((mw, 560), Image.LANCZOS)
og.paste(mark, (90, (630 - mark.height) // 2), mark)
og.save(os.path.join(OUT, "og-cover.png"))

# quick dark-preview jpg for visual checking
prev = Image.new("RGBA", trimmed.size, (10, 13, 18, 255))
prev.alpha_composite(trimmed)
prev.convert("RGB").save(os.path.join(OUT, "_preview.jpg"), quality=92)

print("done ->", OUT)
