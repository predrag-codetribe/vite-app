import { Principal } from '../security/Principal'
import { JwtPayload } from '../security/JwtSchema'

/**
 * Here we define what we're storing in res.locals
 * http://expressjs.com/en/api.html#res.locals
 */
type ResLocals = {
    requestId: string
    /**
     * Route might not be available, depending on when we access it.
     */
    route?: string
    requestTime: [number, number] // [seconds, nanoseconds]
    principal: Principal
    locale: string
    jwtPayload: JwtPayload
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        // eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/no-empty-interface
        interface Locals extends ResLocals {
        }
    }
}
