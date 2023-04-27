import { createUseCase } from '@/framework/controller/UseCase'
import { APIS } from '@app/shared/protocol'

export const GetMe = createUseCase({
    input: APIS.getMe.input,

    output: APIS.getMe.output,

    execute: async (_ctx) => {
        return Promise.resolve({
            id: 'x',
        })
    },
})
