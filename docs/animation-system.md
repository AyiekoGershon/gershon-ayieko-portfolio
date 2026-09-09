# Animation system

Motion is CSS-driven where possible; JavaScript only orchestrates timing and state.

## Inventory

| Element | Type | Implementation |
|---|---|---|
| Splash logo | scale/fade in + glow ring orbit | `src/styles.css` → `.splash-*` keyframes |
| Splash boot text | staged text swap | `main.js` → `BOOT_LINES` |
| Splash progress | eased width, driven by rAF | `main.js` → `tick()` |
| Hero headline | masked line reveal after splash | `.headline-line` + `body.site-ready` |
| Hero terminal | blinking caret (CSS) | `@keyframes blink` |
| Hero ticker | infinite marquee | `@keyframes marquee` |
| Section reveals | IntersectionObserver + `.in-view` | `main.js` → `revealObserver` |
| Stagger groups | nth-child transition delays | `.reveal-stagger.in-view > *` |
| Stat counters | eased count-up (verified numbers only) | `main.js` → `counterObserver` |
| Project cards | staggered entrance on render/filter | `@keyframes card-in`, `--i` index |
| Project visuals | scale on hover + scanlines | `.project-visual svg`, `.visual-scan` |
| Timeline dots | glow via box-shadow | `.exp-dot` |
| Sticky CTA | slide up after hero, hide at contact | `main.js` → `stickyObserver` |
| Toast | slide-in, auto-dismiss 4.2s | `.toast.visible` |
| Grain | low-amplitude scroll parallax | `main.js` → `animateGrain` |

## Reduced motion

`@media (prefers-reduced-motion: reduce)`:

- truncates all transitions/animations to ~0
- disables marquee, ring orbit, reveals, and grain parallax
- splash shows a static brand state and exits after ~700 ms

## Guidelines

- No infinite loops beyond the ticker (text-only, decorative).
- Keep entrances ≤ 1 s and stagger ≤ 0.4 s.
- Motion must never block content: splash is skippable and the site is usable
  with animations disabled.
