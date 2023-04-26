import { z } from 'zod'
import { createUseCase } from '../../../framework/controller/UseCase'

export const GetMe = createUseCase({
    input: z.object({}),

    output: z.object({
        id: z.string().uuid(),
    }),

    execute: async (_ctx) => {
        return Promise.resolve({
            id: 'x',
        })
    },

})
