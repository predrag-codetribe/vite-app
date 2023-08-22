import { RawRouteDefinition, RouteDefinition } from '../router/RouterTypes'

export type WebApiSpecification = {
    name: string
    baseRoute: `/${string}`
    version: string
    // middleware
    routers: {
        name: string
        baseRoute?: `/${string}`
        middleware: Middleware[]
        // this is currently an array for convenience, but object might be more readable
        routes: RouteDefinition[]
        rawRoutes?: RawRouteDefinition[]
    }[]
}
