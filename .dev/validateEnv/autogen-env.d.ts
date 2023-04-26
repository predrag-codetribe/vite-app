
/// THIS FILE WAS AUTOGENERATED WITH validateEnv.
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    VITE_BACKEND_BASE_URL: string;
}

declare namespace NodeJS {
    export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    APP_ENV: string;
    PORT: string;
    DATABASE_URL: string;
    SENTRY_DSN: string;
    RATE_LIMIT_WINDOW_MS: string;
    RATE_LIMIT_PUBLIC_MAX_PER_WINDOW: string;
    RATE_LIMIT_AUTH_MAX_PER_WINDOW: string;
    JWT_PUBLIC_KEY: string;
}
}
    