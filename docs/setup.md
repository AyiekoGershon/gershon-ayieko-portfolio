# Setup

## Requirements

- Node.js 18+ (Node 20+ recommended)
- Python 3.9+ with Pillow — only needed to regenerate logo assets

## Install & run

```bash
npm install
npm run dev
```

Dev server: http://localhost:5173

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Local development server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run logo` | Regenerate cleaned logo assets from `mylogo.jpg` |

## Configuration files

| File | Purpose |
|---|---|
| `.env` | Local secrets/config — **not committed** |
| `.env.example` | Template for `.env` |
| `vite.config.js` | Build config (`base: './'` for portable static hosting) |

```bash
# create a local env file when needed
Copy-Item .env.example .env
```
