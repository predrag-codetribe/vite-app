declare namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    export interface ProcessEnv {
        /** 'production' by default */
        NODE_ENV: string
        APP_ENV: string
        PORT: string

        DATABASE_URL: string

        RATE_LIMIT_WINDOW_MS: string
        RATE_LIMIT_PUBLIC_MAX_PER_WINDOW: string
        RATE_LIMIT_AUTH_MAX_PER_WINDOW: string

        JWT_PUBLIC_KEY: string
        SENTRY_DSN: string

    }
}
