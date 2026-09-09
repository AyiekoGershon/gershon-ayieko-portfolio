# Deployment

The build output is fully static — any static host works.

## Netlify

1. Push the repository to GitHub.
2. Netlify → "Add new site" → "Import an existing project".
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Environment variables: add `VITE_FORMSPREE_ENDPOINT` if using Formspree.

## GitHub Pages

`base: './'` is already set in `vite.config.js`, so the build works from a
subdirectory. Deploy the `dist/` folder to a branch (e.g. with the
`actions/deploy-pages` workflow) or upload manually.

## Local production preview

```bash
npm run build
npm run preview
```

## Updating a live site

```bash
git pull
npm ci
npm run build
# redeploy dist/ (automatic on Netlify after push)
```

## Pre-deploy checklist

- [ ] `npm run build` exits clean
- [ ] Splash completes and is skippable
- [ ] Contact form configured or fallback verified
- [ ] No `.env` committed
- [ ] Links open in new tabs (`rel="noopener"`)
