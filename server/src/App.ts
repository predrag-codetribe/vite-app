import express from 'express'
// import helmet from 'helmet'
import * as Sentry from '@sentry/node'

import { exceptionHandlerMiddleware } from './framework/middleware/exceptions'

import { logOutput } from './framework/logging/LogOutput'

import { mainApiInfo } from './app/MainController'

import { PARSE_ALL_AS_JSON } from './framework/controller/ExpressJsonOptions'
import { createController } from './framework/controller/ControllerFactory'
import { routeNotFoundMiddleware } from './framework/middleware/RouteNotFoundMiddleware'
import { corsHeadersMiddleware } from './framework/middleware/CorsHeadersMiddleware'
import path from 'path'

const PORT = process.env.PORT
const frontendFiles = process.cwd() + '/dist/client'

export const setupApp = () => {
    logOutput.info('Booting the server...')

    const app = express()
        .use(Sentry.Handlers.requestHandler())

        // add headers for security https://expressjs.com/en/advanced/best-practice-security.html
        // .use(helmet())

    // disable CORS protection if we're in development
    // in production there's no need for CORS as we're on the same domain (server and client)
    if (process.env.NODE_ENV === 'development') {
        // add cors headers to response
        app.use(corsHeadersMiddleware)
    }

    app
        // Endpoint for checking server health, returns 200
        .use('/ping', (_req, res) => res.status(200).send())

        // Parses all incoming requests bodies as json and stores it into req.body
        .use(express.json(PARSE_ALL_AS_JSON))

        // Answer API requests.
        .use('/api', createController(mainApiInfo))
        .use('/api/*', routeNotFoundMiddleware)

        //// Exception handlers
        .use(Sentry.Handlers.errorHandler())
        .use(exceptionHandlerMiddleware)

        .use(express.static(frontendFiles))
        .get('/*', (_, res) => {
            res.sendFile(path.resolve(frontendFiles, 'index.html'))
        })

        app.listen(PORT)
            // eslint-disable-next-line no-console
            console.log(`http://localhost:${PORT}`)
}
