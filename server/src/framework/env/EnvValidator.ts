import { logOutput } from '../logging/LogOutput'
import { z } from 'zod'
import { ENV_SCHEMA } from '../../../.env.validate'

export const validateEnv = () => {
    const parseResult = ENV_SCHEMA.safeParse(process.env)

    if (!parseResult.success) {
        const message: string = parseResult.error.message
        console.error(message)
        logOutput.error(message)
        throw new Error('Env validation errors occurred!!')
    }
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
        interface ProcessEnv extends z.infer<typeof ENV_SCHEMA> {
            API_BASE_ROUTE: `/${string}`

        }
    }
}
