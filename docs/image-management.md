# Image management

## Logo assets

The source artwork is `mylogo.jpg` (flattened raster with a baked checkerboard).
The pipeline at `scripts/process_logo.py` derives clean web assets:

| Output | Use |
|---|---|
| `public/assets/logo-clean.png` | master transparent emblem |
| `public/assets/logo-clean.webp` | splash + about (94 KB vs 1.4 MB PNG) |
| `public/assets/favicon.png` | favicon, nav mark, footer |
| `public/assets/logo-512.png` | large icon (PWA / touch) |
| `public/assets/og-cover.png` | social sharing card |

### Regenerate

```bash
pip install pillow
npm run logo
```

The script: samples border colors → clusters the checkerboard shades → flood-fills
connected background from the edges → keys out enclosed checker pockets (e.g. the eye
sockets) → trims, resizes, and exports. If the source artwork changes significantly,
verify the result visually (dark preview `_preview.jpg` is generated temporarily) and
adjust `TOL` / `TIGHT` tolerances at the top of the script.

## Project visuals

Project cards use inline SVG schematics defined in `src/data/projects.js` — no image
files, no hotlinks, no licensing exposure. If real screenshots become available:

1. Save optimized files to `public/assets/projects/` (WebP, ≤ 200 KB, 800px wide).
2. Add an `image` field to the project object and render it in `main.js`.
3. Keep `visual` as the fallback.

## Optimization rules

- WebP/AVIF preferred; no image over ~200 KB on a card.
- `loading="lazy"` for below-the-fold images (already applied to the about emblem).
- Only copyright-safe or self-produced material is permitted.
