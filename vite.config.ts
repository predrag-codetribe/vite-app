import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import { validateEnv } from './.dev/validateEnv/validateEnv'
import { express } from './.dev/viteExpress/viteExpress'

// https://vitejs.dev/config/
export default defineConfig({
    publicDir: './client/public',
    build: {
        outDir: './dist/client'
    },
    plugins: [
        react(),
        express('./server/src/index.ts'),
        checker({ typescript: true }),
        tsconfigPaths(),
        svgr(),
        validateEnv({
            public: (z) => z.object({
                VITE_BACKEND_BASE_URL: z.string(),
            }),
            secret: (z) => z.object({
                NODE_ENV: z.enum([ 'development', 'production', 'test' ]),
                APP_ENV: z.string(),
                PORT: z.string(),

                DATABASE_URL: z.string(),

                SENTRY_DSN: z.string(),
                RATE_LIMIT_WINDOW_MS: z.string(),
                RATE_LIMIT_PUBLIC_MAX_PER_WINDOW: z.string(),
                RATE_LIMIT_AUTH_MAX_PER_WINDOW: z.string(),

                JWT_PUBLIC_KEY: z.string()
            }),
        })
    ]
})
