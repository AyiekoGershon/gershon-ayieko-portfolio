import { defineConfig } from 'vite';

// Relative base keeps the build portable to any static host
// (Netlify, GitHub Pages, Vercel, or a subdirectory).
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
});
