import { z } from 'zod'
import { createUseCase } from '../../framework/router/UseCase'
import { Test } from '../model/Test.entity'
import { ApiError } from '@/framework/router/ApiError'

export const getTest = createUseCase({
    input: z.object({
        id: z.string(),
    }),
    output: z.object({
        id: z.string(),
    }),
    execute: async (ctx, t) => {
        const { id } = ctx.input

        const testEntity = await t.findOneByOrFail(Test, { id })

        if (Math.random() > 0.5) {
            throw new ApiError('random.example.message')
        }

        return {
            id: testEntity.id,
        }
    },
})
