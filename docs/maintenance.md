# Maintenance & troubleshooting

## Routine upkeep

- **Dependencies:** `npm outdated` → update `vite` within the current major.
- **Broken links:** verify GitHub / LinkedIn / DataCamp links in `index.html`.
- **Content freshness:** experience dates, stats (GitHub repo/contribution counts),
  and the hero "open to work" messaging live in `index.html` and should be
  reviewed at least quarterly.
- **Logo:** rerun `npm run logo` after replacing `mylogo.jpg` with new artwork.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| White page / `Failed to fetch dynamically imported module` | stale dev server cache | restart `npm run dev`, hard-refresh |
| Splash never disappears | JS error before splash logic | check DevTools console; verify `src/main.js` imports resolve |
| Form always opens mail client | `VITE_FORMSPREE_ENDPOINT` missing | see `docs/contact-form.md` |
| Project cards don't update | content error in `projects.js` | validate the file; DevTools console will point at the line |
| Fonts fall back to system fonts | no network on Google Fonts | fonts are progressive-enhanced; content remains readable |
| Accent color mismatch | `theme-color` meta not updated | keep `--accent` and meta in sync |
| Huge PNG asset | `logo-clean.png` is the master | ship only `logo-clean.webp` in the page (`index.html` already does) |

## Quality gate before every release

- `npm run build` clean
- no horizontal overflow at 320–1440 px
- keyboard-only pass: splash skip, nav, filters, form
- reduced-motion pass (DevTools → Rendering → emulate `prefers-reduced-motion`)
- contact form success + fallback paths
- `.env` absent from git (`git status`)
