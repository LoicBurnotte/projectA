# ProjectA — Module Federation (Remote)

React + TypeScript + Vite **remote** application using **@originjs/vite-plugin-federation**. ProjectA is consumed by the **host** and can consume exposed modules from the host (e.g. `host/Header`, `host/config`).

---

## Overview & Summary

| Concept     | Description                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Remote**  | This app. It is **consumed** by the host: the host loads projectA’s `remoteEntry.js` and imports `projectA/App`.                |
| **Host**    | The shell app that loads this remote and exposes components/config. ProjectA can import from `host/Header`, `host/config`, etc. |
| **Exposes** | Modules this app **exposes** to the host. The host imports them as `projectA/App`.                                              |
| **Remotes** | Apps this app **consumes**. Here, the host: projectA imports `host/Header` and `host/config` from the host’s `remoteEntry.js`.  |

**Flow:**

- ProjectA builds and serves `remoteEntry.js` (from `exposes`).
- The host loads projectA’s `remoteEntry.js` from the URL it configures (e.g. `VITE_PROJECT_A_URL`).
- ProjectA loads the host’s `remoteEntry.js` from the URL it configures (e.g. `VITE_HOST_URL`) to use `host/Header` and `host/config`.

**Important:** `remoteEntry.js` is generated only at **build** time. For local dev with federation you must use **build + preview** for both host and projectA, not the Vite dev server.

---

## Environment Variables

| Variable        | Required           | Description                                                                                                                                        |
| --------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_BASENAME` | No                 | Base path when running **standalone** (e.g. `/about`). Same as the path where the host mounts this app.                                            |
| `VITE_HOST_URL` | Yes when not local | Base URL of the **host** build (no trailing slash). ProjectA loads `{VITE_HOST_URL}/assets/remoteEntry.js` to import `host/Header`, `host/config`. |

**When to set:**

- **Run inside host (local):** host at `http://localhost:3000`. Set `VITE_HOST_URL=http://localhost:3000/build` (or leave default in `vite.config.ts`).
- **Run inside host (production):** set `VITE_HOST_URL=https://your-host.vercel.app/build` (or your host’s build URL).
- **Run standalone:** set `VITE_BASENAME=/about` (or whatever path the host uses) so routing matches. `VITE_HOST_URL` still needed if the app imports from the host.

Use `.env.local` for local overrides; add `.env.example` with documented variables (no secrets).

---

## Vite config — Federation

In `vite.config.ts`:

1. **Host URL from env**  
   Read the host base URL from `process.env.VITE_HOST_URL` and append the path to the host’s `remoteEntry.js`:

```ts
const hostUrl = (process.env.VITE_HOST_URL ?? '').replace(/\/$/, '') || 'http://localhost:3000/build'
```

2. **Plugin: `name`**  
   Unique federation name for this app (e.g. `'projectA'`). The host uses this when importing: `import ... from 'projectA/App'`.

3. **Plugin: `filename`**  
   Output file name for this app’s federated entry (e.g. `'remoteEntry.js'`). The host will load `{projectABaseUrl}/assets/remoteEntry.js`.

4. **Plugin: `exposes`**  
   Map of public names to local modules so the host can import them:

```ts
exposes: {
  './App': './src/App.tsx',
}
```

5. **Plugin: `remotes`**  
   Map of remote names to the **full URL** of their `remoteEntry.js` (here, the host):

```ts
remotes: {
  host: `${hostUrl}/assets/remoteEntry.js`,
}
```

6. **Plugin: `shared`**  
   List of dependencies shared with the host (same versions recommended): e.g. `['react', 'react-dom', 'react-router-dom']`.

7. **CORS**  
   In dev/preview, the host (or other remotes) may load this app’s `remoteEntry.js` from another origin. Add a small CORS middleware so `Access-Control-Allow-Origin` (and related headers) are set for the build assets.

8. **Build settings**  
   Same as host: consistent `build.outDir` (e.g. `'build'`), `build.target` (e.g. `'esnext'`), and optionally `build.cssCodeSplit: false`.

---

## Step-by-Step: Implement the Remote (or Add Exposes/Remotes)

### 1. Install the plugin

```bash
npm i -D @originjs/vite-plugin-federation
```

### 2. Add environment variables

- In **projectA** root, create or edit `.env.example`:

```env
# Optional. Base path when running standalone (e.g. /about).
VITE_BASENAME=/about

# Host URL. Required when host is not at http://localhost:3000.
# VITE_HOST_URL=http://localhost:3000/build
# VITE_HOST_URL=https://your-host.vercel.app/build
```

- Copy to `.env.local` and set `VITE_HOST_URL` when the host is not at the default URL.

### 3. Configure `vite.config.ts`

- Import the plugin:

```ts
import federation from '@originjs/vite-plugin-federation'
```

- Derive the host base URL from env:

```ts
const hostUrl = (process.env.VITE_HOST_URL ?? '').replace(/\/$/, '') || 'http://localhost:3000/build'
```

- Add CORS middleware so the host (or other remotes) can load this app’s `remoteEntry.js` (implement `corsForFederation()` or equivalent and register it in `configureServer` and `configurePreviewServer`).

- Register the federation plugin **after** React (or other transform plugins):

```ts
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
})
```

- Set `build.outDir` (e.g. `'build'`) so the host’s URL `{VITE_PROJECT_A_URL}/assets/remoteEntry.js` points to the built file.

### 4. Expose modules to the host

- Add entries to `exposes` for each module the host should import:

```ts
exposes: {
  './App': './src/App.tsx',
  // './Something': './src/Something.tsx',
}
```

The host will use: `import('projectA/App')` and (if you add it) `import('projectA/Something')`.

### 5. Consume the host (or other remotes)

- In projectA code, import exposed host modules by the host’s federation name and expose key:

```ts
import { Header } from 'host/Header'
import { appConfig } from 'host/config'
```

- Declare types for host modules in `src/vite-env.d.ts` (or use a shared types package):

```ts
declare module 'host/config' {
  export const appConfig: { appName: string; apiBaseUrl: string; features: { darkMode: boolean; analytics: boolean } }
  export type AppConfig = typeof appConfig
}

declare module 'host/Header' {
  export const Header: React.FC<{ links: Link[]; basename?: string }>
}
```

### 6. Run with federation locally

Because `remoteEntry.js` is emitted only at build time:

1. **Terminal 1 — host**

   ```bash
   cd host
   npm run build
   npm run preview
   ```

2. **Terminal 2 — projectA**

   ```bash
   cd projectA
   npm run build
   npm run preview
   ```

3. Open the host URL (e.g. `http://localhost:3000`). The host loads projectA; projectA loads the host’s exposed modules from the URL in `VITE_HOST_URL`.

If you see _Failed to fetch …/remoteEntry.js_, ensure the app that serves that URL is running with `npm run preview` (or equivalent), not `npm run dev`.

### 7. Run standalone (optional)

- Set `VITE_BASENAME=/about` (or the path where the host mounts this app).
- Set `VITE_HOST_URL` to the host’s build URL so projectA can still load `host/Header` and `host/config`.
- Run projectA with its own router and basename so routes match `/about`, `/about/test1`, etc.

### 8. Add more exposes

- Add an entry in `exposes` in `vite.config.ts`.
- The host can then `import('projectA/NewModule')` and declare `declare module 'projectA/NewModule'` in its types.

---

## Project structure (federation-related)

```
projectA/
├── .env.example       # VITE_BASENAME, VITE_HOST_URL
├── .env.local         # Local overrides (e.g. production host URL)
├── vite.config.ts     # federation plugin: name, exposes, remotes, shared + CORS
├── src/
│   ├── vite-env.d.ts  # declare module 'host/Header', 'host/config'
│   ├── App.tsx        # import from 'host/Header', 'host/config'
│   └── ...
└── README.md          # This file
```

---

## Quick reference

| Task                              | Where                                                                                                |
| --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Change host URL                   | `VITE_HOST_URL` in `.env.local` or default in `vite.config.ts`                                       |
| Expose a new module to host       | Add entry to `exposes` in `vite.config.ts`                                                           |
| Import another remote             | Add remote URL and entry in `remotes`, then `import ... from 'remoteName/Expose'` + type declaration |
| Fix “Failed to fetch remoteEntry” | Run both host and projectA with `npm run build && npm run preview` (not dev server)                  |
| Standalone base path              | Set `VITE_BASENAME` (e.g. `/about`) and use it in your router                                        |
