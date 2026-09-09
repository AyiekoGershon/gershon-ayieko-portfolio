# Gershon Ayieko — Portfolio

A dark, editorial single-page portfolio for **Gershon Ayieko** — Data, AI & Automation
Engineer, Nairobi, Kenya.

- **Stack:** Vite + vanilla HTML / CSS / JavaScript (no runtime framework — fast, static-host friendly)
- **Identity:** custom "KNIGHT RIDER" helmet emblem (cleaned from `mylogo.jpg`), cyan-on-graphite design system
- **Opening experience:** animated logo splash / boot screen (skippable, reduced-motion aware)
- **Content:** capabilities, GitHub-verified project catalog, experience, tech stack, education, about, contact

## Quickstart

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Repositories & links

| Channel | URL |
|---|---|
| GitHub | https://github.com/AyiekoGershon |
| LinkedIn | https://www.linkedin.com/in/gershon-ayieko-2a96162b0 |
| DataCamp | https://www.datacamp.com/portfolio/GershonAyieko |
| Email | gershonayieko3@gmail.com |

## Owner operations — quick answers

| I want to… | Where |
|---|---|
| Change name / hero / site title | `index.html` (header, hero) + `package.json` name — see `docs/content-management.md` |
| Add / remove a project | `src/data/projects.js` — no HTML changes needed |
| Change project images/visuals | `src/data/projects.js` (`visual` field) — see `docs/image-management.md` |
| Change GitHub / LinkedIn / email | `index.html` (header, contact) + `src/main.js` (`openMailto`) |
| Configure the contact form | `.env` → `VITE_FORMSPREE_ENDPOINT` — see `docs/contact-form.md` |
| Change the accent color | `src/styles.css` → `:root { --accent: … }` |
| Deploy an update | `docs/deployment.md` |
| Regenerate the logo assets | `python scripts/process_logo.py` (requires Pillow) |

## Documentation

- `docs/setup.md` — environment, commands, toolchain
- `docs/architecture.md` — file structure and design decisions
- `docs/configuration.md` — env vars and site-wide settings
- `docs/content-management.md` — editing copy, projects, sections
- `docs/contact-form.md` — Formspree setup, fallback, troubleshooting
- `docs/deployment.md` — Netlify / static hosting
- `docs/image-management.md` — logo pipeline and project visuals
- `docs/animation-system.md` — motion inventory and reduced-motion behavior
- `docs/maintenance.md` — routine upkeep and troubleshooting

## Factual integrity

All stats, employers, credentials, and project links are sourced from Gershon's public
GitHub profile, LinkedIn, resume, and the existing portfolio at
`myportfolio-gershon.netlify.app`. No fabricated metrics.
