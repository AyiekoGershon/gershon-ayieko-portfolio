# Architecture

## Why Vite + vanilla JS

The brief required performance, SEO, maintainability, and a strong animation system
without unnecessary complexity. A single-page editorial site does not need a UI
framework: vanilla ES modules keep the JS payload ~6 kB gzipped, animations are
CSS-driven (GPU friendly), and Vite handles bundling, dev server, and static export.
No framework lock-in; any static host can serve `dist/`.

## Structure

```
portfolio/
├── index.html            # semantic page structure, all sections, splash markup
├── src/
│   ├── main.js           # interactions: splash, projects, filters, nav, form
│   ├── styles.css        # complete design system (single source of truth)
│   └── data/projects.js  # project catalog + inline SVG visuals (content layer)
├── public/assets/        # logo derivatives, favicon, OG cover
├── scripts/process_logo.py  # asset pipeline for the logo
└── docs/                 # this documentation set
```

## Design decisions

- **Content separation:** project metadata lives in `src/data/projects.js`; adding a
  project never touches markup or components.
- **No runtime CSS framework:** Tailwind-like utility output was rejected in favor of a
  hand-written design system (`--accent`, spacing, typography tokens) — smaller CSS,
  no config overhead.
- **No external images:** project cards use generated inline SVG schematics
  (pipeline / LLM / API / vision motifs). Accurate by construction; zero licensing risk.
- **Accent color:** cyan (`#37d6e8`) derived from the logo's glowing eyes — one accent
  system, no color sprawl.

## Sections (narrative)

Hero → Capabilities → Selected Systems → Experience → Stack → Education → About → Contact
