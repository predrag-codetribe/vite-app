import * as path from 'path'
import express from 'express'
import helmet from 'helmet'
import * as Sentry from '@sentry/node'

import { logOutput } from '../logging/LogOutput'

import { PARSE_ALL_AS_JSON } from '../router/ExpressJsonOptions'
import { createRouter } from '../router/RouterFactory'

import { cloudflareIpFilterMw } from '../middleware/CloudflareIpFilterMw'
import { corsMw } from '../middleware/CorsMw'
import { routeNotFoundMw } from '../middleware/RouteNotFoundMw'
import { exceptionHandlerMw } from '../middleware/ExceptionHandlerMw'

import { WebApiSpecification } from './WebApiSpecification'
import { webApiToOpenApi } from '../openapi/WebApiOpenApi'
import { getRuntimeEnvironment } from '../runtime/runtimeUtils'

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../../openapi.json'

const PORT = process.env.PORT
/**
 * Path to the client app.
 * ATM client app is referenced from the server app, not sure if this is the best solution.
 * Possibly it's better to copy /client/dist into /server/dist and creating a prod bundle that way
 */
const CLIENT_APP_PATH = path.join(__dirname, '../../../../../client/dist')

const CACHE_CONTROL_MAX_AGE_SECONDS = 60

const inDevelopmentEnv = process.env.NODE_ENV === 'development'
const inProductionEnv = !inDevelopmentEnv

export const webApi = (spec: WebApiSpecification) => {
    logOutput.info('Booting the server...')
    const apiBaseRoute = spec.baseRoute

    const app = express()
        .use(Sentry.Handlers.requestHandler())

        // add headers for security https://expressjs.com/en/advanced/best-practice-security.html
        .use(helmet({
            crossOriginEmbedderPolicy: false,
            contentSecurityPolicy: {
                useDefaults: true,
                directives: { 'connect-src': ['\'self\''] },
            },
        }))

    if (inProductionEnv) {
        app.use(cloudflareIpFilterMw)
    }

    // disable CORS protection if we're in development
    // in production there's no need for CORS as we're on the same domain (server and client)
    if (inDevelopmentEnv) {
        // add cors headers to response
        app.use(corsMw)
    }

    app
        // Endpoint for checking server health, returns 200
        .use('/ping', (_req, res) => res.status(200).send())

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        .use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {}))

        // specify directory from which to serve static assets
        .use(express.static(CLIENT_APP_PATH, { maxAge: CACHE_CONTROL_MAX_AGE_SECONDS * 1_000 }))

        // Parses all incoming requests bodies as json and stores it into req.body
        .use(express.json(PARSE_ALL_AS_JSON))

    for (const router of spec.routers) {
        const baseRoute = apiBaseRoute + (router.baseRoute ?? '')
        // Answer API requests.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        app.use(baseRoute, createRouter(router))
    }

    app
        .use(`${apiBaseRoute}/*`, routeNotFoundMw)

        // All remaining requests return the React app, so it can handle routing.
        .use('*', (_req, res) => {
            res.sendFile(path.resolve(__dirname, CLIENT_APP_PATH, 'index.html'), {
                maxAge: CACHE_CONTROL_MAX_AGE_SECONDS * 1_000,
            })
        })

        //// Exception handlers
        .use(Sentry.Handlers.errorHandler())
        .use(exceptionHandlerMw)

    const messagePart = inDevelopmentEnv ? 'http://localhost:' : 'port '
    app.listen(PORT, () => logOutput.info(
        `Server started in ${getRuntimeEnvironment().toUpperCase()} mode
        ${messagePart}${PORT} - frontend 
        ${messagePart}${PORT}${apiBaseRoute}/ - api`,
    ))

    if (inDevelopmentEnv) {
        webApiToOpenApi(spec)
    }
}
