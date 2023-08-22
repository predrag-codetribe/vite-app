import { z } from 'zod'

export const ENV_SCHEMA = z.object({
    NODE_ENV: z.enum([ 'development', 'production', 'test' ]),
    APP_ENV: z.string(),
    PORT: z.string(),

    DATABASE_URL: z.string(),

    SENTRY_DSN: z.string(),
    RATE_LIMIT_WINDOW_MS: z.string(),
    RATE_LIMIT_MAX: z.string(),

    JWT_PUBLIC_KEY: z.string()
})
