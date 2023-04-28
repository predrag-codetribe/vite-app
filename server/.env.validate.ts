import { z } from 'zod'

export const ENV_SCHEMA = z.object({
    NODE_ENV: z.enum([ 'development', 'production', 'test' ]),
    APP_ENV: z.string(),
    PORT: z.string(),

    DATABASE_URL: z.string(),

    SENTRY_DSN: z.string(),
    RATE_LIMIT_WINDOW_MS: z.string(),
    RATE_LIMIT_PUBLIC_MAX_PER_WINDOW: z.string(),
    RATE_LIMIT_AUTH_MAX_PER_WINDOW: z.string(),

    JWT_PUBLIC_KEY: z.string()
})

// make the env variables available to TypeScript thorough process.env.
declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof ENV_SCHEMA> {}
    }
}
