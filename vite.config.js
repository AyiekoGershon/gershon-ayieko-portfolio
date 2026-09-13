import { defineConfig } from 'vite';

/**
 * Dev-only bridge: serve api/chat.js through Vite's dev server so the
 * assistant works locally the same way it works on Vercel.
 * (On Vercel, files in api/ are deployed as serverless functions.)
 */
function devApiPlugin() {
  let handlerPromise = null;
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res, next) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Allow', 'POST, OPTIONS');
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'method_not_allowed' }));
          return;
        }
        try {
          handlerPromise ||= import('./api/chat.js');
          const { default: handler } = await handlerPromise;
          let raw = '';
          req.on('data', (chunk) => (raw += chunk));
          req.on('end', async () => {
            const vres = {
              status(code) {
                res.statusCode = code;
                return this;
              },
              setHeader(k, v) {
                res.setHeader(k, v);
              },
              json(obj) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(obj));
                return this;
              },
              end(data) {
                res.end(data);
              },
            };
            await handler({ method: req.method, headers: req.headers, body: raw, socket: req.socket }, vres);
          });
        } catch (err) {
          console.error('[dev-api]', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'dev_api_error' }));
        }
      });
    },
  };
}

// Relative base keeps the build portable to any static host
// (Netlify, Vercel, GitHub Pages, or a subdirectory).
export default defineConfig({
  base: './',
  plugins: [devApiPlugin()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
});
