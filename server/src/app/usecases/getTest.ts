import { z } from 'zod'
import { createUseCase } from '../../framework/router/UseCase'
import { Test } from '../model/Test.entity'

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

        return {
            id: testEntity.id,
        }
    },
})
