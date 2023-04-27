import { logOutput } from '../logging/LogOutput'
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
