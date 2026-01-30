/// <reference types="vite/client" />

/** Host remote types: use package "host-remote-types" when published, or add declare module per expose. */
declare module 'host/config' {
  export const appConfig: {
    appName: string
    apiBaseUrl: string
    features: { darkMode: boolean; analytics: boolean }
  }
  export type AppConfig = typeof appConfig
}

declare module 'host/Header' {
  export const Header: React.FC<{ links: Link[]; basename?: string }>
}
