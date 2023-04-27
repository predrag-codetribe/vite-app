import z from 'zod'

export const ENV_SCHEMA = z.object({
    VITE_BACKEND_BASE_URL: z.string(),
})