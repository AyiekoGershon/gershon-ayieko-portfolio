"""
Frame image pipeline.

Converts the user's pasted frame images (public/assets/Pasted Image*.jpg)
into optimized WebP assets at public/frames/frame-0X.webp and moves the
originals to frames-source/ for safekeeping.

Run from the repository root:
    python scripts/process_frames.py
"""

import os
import shutil

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(ROOT, "public", "assets")
OUT_DIR = os.path.join(ROOT, "public", "frames")
ARCHIVE_DIR = os.path.join(ROOT, "frames-source")

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(ARCHIVE_DIR, exist_ok=True)

MAPPING = {
    "Pasted Image.jpg": "frame-01",
    "Pasted Image 2.jpg": "frame-02",
    "Pasted Image 3.jpg": "frame-03",
    "Pasted Image 4.jpg": "frame-04",
    "Pasted Image 5.jpg": "frame-05",
    "Pasted Image 6.jpg": "frame-06",
    "Pasted Image 7.jpg": "frame-07",
}

MAX_W = 1600

for src_name, slug in MAPPING.items():
    src = os.path.join(SRC_DIR, src_name)
    if not os.path.exists(src):
        print(f"skip (missing): {src_name}")
        continue

    img = Image.open(src).convert("RGB")
    w, h = img.size
    if w > MAX_W:
        img = img.resize((MAX_W, round(h * MAX_W / w)), Image.LANCZOS)
    out = os.path.join(OUT_DIR, f"{slug}.webp")
    img.save(out, "WEBP", quality=80, method=6)

    archive = os.path.join(ARCHIVE_DIR, f"{slug}.jpg")
    shutil.move(src, archive)
    print(f"{src_name} -> {slug}.webp ({img.size[0]}x{img.size[1]}) | original archived")

print("done")
