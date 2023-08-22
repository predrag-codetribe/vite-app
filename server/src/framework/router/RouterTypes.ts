import { UseCase } from './UseCase'

type Route = `/${string}`

type RouteOptions = {
    disableResponseBodyLogging?: boolean
}

/**
 * Solve this `any`, if you can
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

export type RouteDefinition = [
    // TODO @useCaseAny solve this, in the meantime use createUseCase to get typings
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    HttpMethod, Route, UseCase<any, any>, RouteOptions?
]

export type RawRouteDefinition = [
    HttpMethod, Route, Middleware, RouteOptions?
]

export type CreateRouterInfo = {
    middleware: Middleware[],
    routes: RouteDefinition[],
    rawRoutes?: RawRouteDefinition[]
}
