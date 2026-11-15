"""
Portrait pipeline — cuts the studio portrait out of its plain light
background so it can sit on the hero's accent circle.

  photo-source.jpg  ->  public/assets/portrait.webp   (transparent cut-out)
                        public/assets/portrait.png    (fallback)

The source has a near-uniform off-white backdrop, so a colour-distance
flood fill from the top/side edges is enough (no ML model needed).

Run from the repository root:
    python scripts/process_portrait.py
"""

import os

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
import cv2

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "photo-source.jpg")
OUT = os.path.join(ROOT, "public", "assets")

img = Image.open(SRC).convert("RGB")
w, h = img.size
arr = np.asarray(img).astype(np.float32)

# Background colour = median of a thin border strip (top + sides).
strip = np.concatenate([arr[:20].reshape(-1, 3), arr[:, :20].reshape(-1, 3), arr[:, -20:].reshape(-1, 3)])
bg = np.median(strip, axis=0)
dist = np.sqrt(((arr - bg) ** 2).sum(axis=2))

# Binary "looks like background" mask, then keep only the region connected
# to the top/side borders (so light highlights inside the face survive).
THRESH = 34
labels, _ = ndimage.label(dist < THRESH)
edge_labels = set(np.unique(labels[0])) | set(np.unique(labels[:, 0])) | set(np.unique(labels[:, -1]))
edge_labels.discard(0)
bg_region = np.isin(labels, list(edge_labels))
# Grow slightly so the soft ramp below covers the anti-aliased hair fringe.
bg_region = ndimage.binary_dilation(bg_region, iterations=3) & (dist < THRESH * 2.2)
bg_region |= np.isin(labels, list(edge_labels))

# Refine with GrabCut: the soft shadow behind the shoulders is too dark for
# a plain colour threshold, but GrabCut separates it from the navy shirt.
SCALE = 0.4
small = cv2.resize(arr.astype(np.uint8)[..., ::-1], None, fx=SCALE, fy=SCALE, interpolation=cv2.INTER_AREA)
sd = cv2.resize(dist, (small.shape[1], small.shape[0]), interpolation=cv2.INTER_AREA)
sbg = cv2.resize(bg_region.astype(np.uint8), (small.shape[1], small.shape[0]), interpolation=cv2.INTER_NEAREST) > 0
gc = np.full(sd.shape, cv2.GC_PR_BGD, np.uint8)
gc[sd > 70] = cv2.GC_PR_FGD
gc[sd > 140] = cv2.GC_FGD
gc[sbg] = cv2.GC_BGD
bgm = np.zeros((1, 65), np.float64); fgm = np.zeros((1, 65), np.float64)
cv2.grabCut(small, gc, None, bgm, fgm, 6, cv2.GC_INIT_WITH_MASK)
fg_small = np.isin(gc, [cv2.GC_FGD, cv2.GC_PR_FGD]).astype(np.uint8) * 255
fg_small = cv2.morphologyEx(fg_small, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
# keep the largest connected component (the person)
lab, n = ndimage.label(fg_small > 0)
if n > 1:
    sizes = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
    fg_small = (lab == (np.argmax(sizes) + 1)).astype(np.uint8) * 255
fg = cv2.resize(fg_small, (w, h), interpolation=cv2.INTER_LINEAR).astype(np.float32) / 255

# Soft alpha: GrabCut matte, with a colour-distance ramp on the light fringe
# so frizzy hair edges stay soft instead of getting a hard cut.
ramp = np.clip((dist - 10) / 40, 0, 1)
alpha = np.where(fg > 0.5, np.where(bg_region, ramp, 1.0), fg * ramp)
alpha_img = Image.fromarray((alpha * 255).astype(np.uint8), "L").filter(ImageFilter.GaussianBlur(1.4))
alpha = np.asarray(alpha_img).astype(np.float32) / 255

# De-fringe: pull semi-transparent edge pixels away from the light backdrop.
a3 = np.clip(alpha, 0.05, 1)[..., None]
rgb = np.clip((arr - bg * (1 - a3)) / a3, 0, 255)
rgb = np.where(alpha[..., None] > 0.98, arr, rgb)

out = Image.fromarray(np.dstack([rgb, alpha * 255]).astype(np.uint8), "RGBA")
bbox = out.getchannel("A").point(lambda v: 255 if v > 10 else 0).getbbox()
out = out.crop(bbox)

target_w = 900
out = out.resize((target_w, round(out.height * target_w / out.width)), Image.LANCZOS)
out.save(os.path.join(OUT, "portrait.webp"), "WEBP", quality=88, method=6)
out.save(os.path.join(OUT, "portrait.png"), optimize=True)
print("portrait:", out.size)
