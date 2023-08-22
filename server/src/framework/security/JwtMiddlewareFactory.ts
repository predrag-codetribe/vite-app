import * as jwtLib from 'jsonwebtoken'

import { UnauthorizedError } from './UnauthorizedError'
import { ForbiddenError } from './ForbiddenError'
import { logOutput } from '../logging/LogOutput'
import { getIssuerFromJwt, validateJwt } from './JwtUtils'
import { asyncHandler } from '../router/ExpressAsyncHandler'
import { JwtPayload } from './JwtSchema'
import { Principal } from './Principal'

export type JwtVerificationConfig = {
    /**
     * key can be a string or a function that returns Promise<string>
     * common usecase:
     *     1. key is string when we configure it through env
     *     2. key is function when we fetch key over network (e.g. jwks)
     */
    key:
    | string
    | ((jwt: string) => Promise<string>)
    issuer: string
    jwtOptions?: jwtLib.VerifyOptions
    /**
     * Loads principal for a given jwtPayload (e.g. from a db, memory, redis).
     * Improvement: make optional if possible, for now it's mandatory
     * @param userId
     */
    loadPrincipal: (jwtPayload: JwtPayload) => Promise<Principal | null>
}
export const createJwtMiddleware = (jwtConfigs: JwtVerificationConfig[]): Middleware => {
    return asyncHandler(async (req, res, next) => {
        try {
            const jwtToken = (req.headers['authorization'] || '')
                .replace('Bearer ', '')

            if (!jwtToken)
                throw new UnauthorizedError('Unauthorized, no bearer!')

            const jwtIssuer = getIssuerFromJwt(jwtToken)
            const jwtConfig = jwtConfigs.find(conf => conf.issuer === jwtIssuer)

            if (!jwtConfig)
                throw new Error(`Key not found for issuer: ${jwtIssuer} .`)

            const key: string = typeof jwtConfig.key === 'string'
                ? jwtConfig.key
                : await jwtConfig.key(jwtToken)

            const jwtPayload = validateJwt(jwtToken, key, jwtConfig.jwtOptions)

            const principal = await jwtConfig.loadPrincipal(jwtPayload)

            if (!principal) {
                logOutput.error(`Principal (${jwtPayload.sub}) not found!`)
                throw new ForbiddenError()
            }

            res.locals.jwtPayload = jwtPayload
            res.locals.principal = principal

            // happy flow
            next()
        } catch (err) {
            if (err instanceof ForbiddenError) {
                next(err)
                return
            }

            if (err instanceof jwtLib.TokenExpiredError) {
                next(new UnauthorizedError(`Token expired at: ${err.expiredAt.toString()} !`))
                return
            }

            logOutput.error(`Unhandled authentication error: (${err})`)
            next(new UnauthorizedError())
        }
    })
}
