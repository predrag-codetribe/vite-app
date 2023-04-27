import { z } from 'zod'

type API = {
    input: z.ZodSchema
    output: z.ZodSchema
}

export type API_PATHS = keyof typeof APIS
// ts type helper to extract the `input` for an API path
export type ApiInput<T extends API_PATHS> = z.infer<typeof APIS[T]['input']>
// ts type helper to extract the `output` for an API path
export type ApiOutput<T extends API_PATHS> = z.infer<typeof APIS[T]['output']>

type ApiPath = `get${string}` | `post${string}`
export const APIS = {
    getMe: {
        input: z.object({}),
        output: z.object({
            id: z.string().uuid(),
        }),
    },
} satisfies Record<ApiPath, API>

