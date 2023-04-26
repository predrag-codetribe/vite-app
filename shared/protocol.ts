import { z } from 'zod'

type API = {
    input: z.ZodSchema
    output: z.ZodSchema
}

export type API_PATHS = keyof typeof APIS
export type ApiInput<T extends API_PATHS> = z.infer<typeof APIS[T]['input']>
export type ApiOutput<T extends API_PATHS> = z.infer<typeof APIS[T]['output']>

export const APIS = {
    getMe: {
        input: z.object({}),
        output: z.object({
            id: z.string().uuid(),
        }),
    }
} satisfies Record<string, API>

