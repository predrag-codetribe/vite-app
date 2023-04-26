import * as jwt from 'jsonwebtoken'

import { UnauthorizedError } from '../../framework/security/UnauthorizedError'
import { ResLocals } from '../../framework/middleware/ResLocals'
import { mapError } from '../../framework/utils/JavaScriptUtils'
import { logOutput } from '../../framework/logging/LogOutput'

const jwtOptions: jwt.VerifyOptions = {
    algorithms: ['ES512'],
    audience: 'xxx',
    issuer: 'xxx',
    clockTolerance: 120,
}

// TODO rename this to be generic
const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY
if (!JWT_PUBLIC_KEY) throw new Error('JWT_PUBLIC_KEY is missing from the env!')

type JwtPayload = {
    sub: string
    email: string
}

/**
 * Extracts the jwt from the Authorization header, validates it, decodes, and stores in res.locals.jwtPayload
 */
export const jwtMiddleware: Middleware = (req, res, next) => {
    try {
        let token = req.headers['authorization']
        if (!token) {
            next(new UnauthorizedError('Unauthorized, no bearer!'))
            return
        }
        token = token.replace('Bearer ', '')

        // token verification, throws an error if it fails
        const jwtPayload = jwt.verify(token, JWT_PUBLIC_KEY, jwtOptions) as JwtPayload

        const principalId = jwtPayload.sub
        if (typeof principalId !== 'string') {
            next(new Error(`jwtPayload.sub (${principalId}) must be of type string!`))
            return
        }

        // http://expressjs.com/en/api.html#res.locals
        const locals = res.locals as ResLocals
        locals.jwtPayload = jwtPayload

        locals.principal = {
            id: jwtPayload.sub,
            email: jwtPayload.email,
        }

        // happy flow
        next()
    } catch (err) {
        const e: Error = mapError(err)

        if (e instanceof jwt.TokenExpiredError) {
            next(new UnauthorizedError(`Token expired at: ${e.expiredAt.toString()} !`))
            return
        }

        logOutput.error(`JwtFilter middleware failed!!! error: (${e}) (${e.message}) (${e.toString()})`)
        next(e)
    }
}
