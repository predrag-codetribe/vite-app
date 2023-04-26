import { Principal } from '../security/Principal'

/**
 * Here we define what we're storing in res.locals
 * http://expressjs.com/en/api.html#res.locals
 */
export type ResLocals = {
    requestId: string
    route: string
    requestTime: [number, number] // [seconds, nanoseconds]
    principal: Principal
    locale: string
    jwtPayload: Record<string, string>
}
