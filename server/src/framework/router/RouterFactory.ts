import { Router as ExpressRouter } from 'express'

import { bootstrapRequestMw } from '../middleware/BootstrapRequestMw'
import { requestLoggingMw } from '../middleware/RequestLoggingMw'
import { createUseCaseExecutionMw } from './UseCaseExecutionMw'
import { rateLimiterMw } from '../middleware/RateLimiterMw'
import { CreateRouterInfo } from './RouterTypes'

export const createRouter = (info: CreateRouterInfo): ExpressRouter => {
    const retvalRouter = ExpressRouter()

    // TODO solve duplicate code below
    for (const routeDefinition of info.routes) {
        const [ method, route, func, routeOptions ] = routeDefinition
        const responseLoggingAllowed = !routeOptions?.disableResponseBodyLogging

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const useCaseExecutionMiddleware: Middleware = createUseCaseExecutionMw(method, route, func, responseLoggingAllowed)

        const middlewareStack: Middleware[] = [
            bootstrapRequestMw,
            rateLimiterMw,
            ...info.middleware,
            requestLoggingMw,
            // here is where request validation and further usecase execution is done
            useCaseExecutionMiddleware,
        ]

        retvalRouter[method](route, middlewareStack)
    }

    if (info.rawRoutes) {
        for (const routeDefinition of info.rawRoutes) {
            const [ method, route, routeMiddleware ] = routeDefinition

            const middlewareStack: Middleware[] = [
                bootstrapRequestMw,
                rateLimiterMw,
                ...info.middleware,
                requestLoggingMw,
                routeMiddleware,
            ]

            retvalRouter[method](route, middlewareStack)
        }
    }

    return retvalRouter
}
