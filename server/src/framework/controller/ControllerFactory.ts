import { Router as ExpressRouter } from 'express'

import { bootstrapRequestMiddleware } from '../middleware/BootstrapRequest'
import { requestLoggingMiddleware } from '../middleware/RequestLoggingMiddleware'
import { createUseCaseExecutionMiddleware } from './UseCaseExecutionMiddleware'

type Route = `/${string}`

type RouteOptions = {
    disableResponseBodyLogging?: boolean
}

/**
 * Solve this `any`, if you can
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UseCase = any

type RouteDefinition = [
    HttpMethod, Route, UseCase, RouteOptions?
]

export type CreateControllerInfo = {
    middleware: Array<Middleware>,
    routes: NonEmptyArray<RouteDefinition>,
}

export const createController = (info: CreateControllerInfo): ExpressRouter => {
    const retvalRouter = ExpressRouter()

    for (const routeDefinition of info.routes) {
        const [ method, route, func, routeOptions ] = routeDefinition
        const responseLoggingAllowed = !routeOptions?.disableResponseBodyLogging

        const useCaseExecutionMiddleware: Middleware = createUseCaseExecutionMiddleware(method, route, func, responseLoggingAllowed)

        const middlewareStack: Middleware[] = [
            bootstrapRequestMiddleware,
            ...info.middleware,
            requestLoggingMiddleware,
            // here is where request validation and further usecase execution is done
            useCaseExecutionMiddleware,
        ]

        retvalRouter[method](route, middlewareStack)
    }

    return retvalRouter
}
