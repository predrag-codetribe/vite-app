// import reflect-metadata ASAP, important for decorators to work (TypeOrm)
import 'reflect-metadata'

// load environment variables
import * as dotenv from 'dotenv'
import express from 'express'

dotenv.config()

// this makes 'production' the default
// see https://nodejs.dev/learn/nodejs-the-difference-between-development-and-production
process.env.NODE_ENV = process.env.NODE_ENV || 'production'

// initialize logger
import { logOutput } from './framework/logging/LogOutput'

// handle unhandled rejection (pun intended)
import { LoggingUtil } from './framework/logging/LoggingUtil'
process.on('unhandledRejection', LoggingUtil.logUnhandledPromiseRejection)

// regular imports, order not important
import { db } from './framework/database/TypeOrmConfig'
import { setupApp } from './App'
import { mapError } from './framework/utils/JavaScriptUtils'
import path from 'path'

export const app = setupApp()
const PORT = process.env.PORT

async function main() {
    try {
        logOutput.info('Server booting...')

        // fix for HMR to not attempt to connect multiple time to the db
        if (!db.isInitialized) await db.initialize()

        // Call app.listen only for production env
        // for development VITE dev server is used, see the viteExpress plugin in .dev folder
        if (!process.env['VITE_DEV_SERVER']) {
            const frontendFiles = process.cwd() + '/dist/client'
            app.use(express.static(frontendFiles))

            app.get('/*', (_, res) => {
                res.sendFile(path.resolve(frontendFiles, 'index.html'))
            })

            app.listen(PORT)
            // eslint-disable-next-line no-console
            console.log(`http://localhost:${PORT}`)
        }

        logOutput.info('Server booted successfully!')
    } catch(err) {
        const e = mapError(err)
        logOutput.error('Error booting server')
        logOutput.error(e)
    }
}

main()

