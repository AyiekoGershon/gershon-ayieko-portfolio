# Configuration

## Environment variables

| Variable | Purpose | Required |
|---|---|---|
| `VITE_FORMSPREE_ENDPOINT` | Formspree submit endpoint for the contact form | No — mailto fallback |

Variables are read at build time. Restart `npm run dev` after changing `.env`.

```bash
# .env (not committed)
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/yourFormId
```

## Site-wide settings

### Accent color

`src/styles.css` → `:root`:

```css
--accent: #37d6e8;          /* primary accent */
--accent-bright: #6cecfa;   /* hover state */
--accent-dim: #1d7e8d;      /* borders / muted accent */
--accent-glow: rgba(55, 214, 232, 0.35);
```

Keep one accent hue. The logo glow color and `theme-color` meta in `index.html`
should match.

### Typography

Fonts load from Google Fonts in `index.html`:

- Display / headings — `Space Grotesk`
- Body — `Inter`
- Technical metadata — `JetBrains Mono`

### Site title & meta

`index.html` `<title>`, `<meta name="description">`, and Open Graph tags.
