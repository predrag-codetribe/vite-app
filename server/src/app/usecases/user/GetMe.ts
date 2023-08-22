import { createUseCase } from '@/framework/controller/UseCase'
import z from 'zod'

export const GetMe = createUseCase({
    input: z.object({}),

    output: z.object({
        id: z.string(),
    }),

    execute: async (_ctx) => {
        return Promise.resolve({
            id: 'x',
        })
    },
})
