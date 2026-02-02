import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// Host URL: set VITE_HOST_URL when running projectA standalone (e.g. host on Vercel). Default: local dev.
const hostUrl = (process.env.VITE_HOST_URL ?? '').replace(/\/$/, '') || 'http://localhost:3000/build'

/** Ensures CORS headers so remotes (e.g. projectA on Vercel) can load host remoteEntry from localhost. */
function corsForFederation() {
  const corsMiddleware = (
    _req: import('http').IncomingMessage,
    res: import('http').ServerResponse,
    next: () => void,
  ) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    if (_req.method === 'OPTIONS') {
      res.statusCode = 204
      res.end()
      return
    }
    next()
  }
  return {
    name: 'cors-for-federation',
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use(corsMiddleware)
    },
    configurePreviewServer(server: { middlewares: { use: (m: typeof corsMiddleware) => void } }) {
      server.middlewares.use(corsMiddleware)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    corsForFederation(),
    react(),
    federation({
      name: 'projectA',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
      },
      remotes: {
        host: `${hostUrl}/assets/remoteEntry.js`,
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3001,
    cors: true,
  },
  preview: {
    port: 3001,
    cors: true,
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
