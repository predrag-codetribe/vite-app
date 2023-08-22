// import reflect-metadata ASAP, important for decorators to work (TypeOrm)
import 'reflect-metadata'

// load environment variables
import * as dotenv from 'dotenv'
import { validateEnv } from './framework/validation/EnvValidator'

dotenv.config()
validateEnv()

// this makes 'production' the default
// see https://nodejs.dev/learn/nodejs-the-difference-between-development-and-production
process.env.NODE_ENV = process.env.NODE_ENV || 'production'

// initialize logger
import { logOutput } from './framework/logging/LogOutput'

// handle unhandled rejection (pun intended)
import { LoggingUtil } from './framework/logging/LoggingUtil'
process.on('unhandledRejection', LoggingUtil.logUnhandledPromiseRejection)

// regular imports, order not important
import db from './framework/database/TypeOrmConfig'
import { setupApp } from './App'
import { mapError } from './framework/utils/JavaScriptUtils'

async function main() {
    try {
        logOutput.info('Server booting...')
        await db.initialize()
        setupApp()
        logOutput.info('Server booted successfully!')
    } catch (err) {
        logOutput.error('Error booting server')
        logOutput.error(mapError(err))
    }
}

main()

