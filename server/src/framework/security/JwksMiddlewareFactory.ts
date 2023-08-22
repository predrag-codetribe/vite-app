import jwksRsa = require('jwks-rsa')

import { getKeyIdFromJwt } from './JwtUtils'
import { createJwtMiddleware, JwtVerificationConfig } from './JwtMiddlewareFactory'

type Args = Omit<JwtVerificationConfig, 'key'> & {
    jwksUri: string
}
/**
 * jwks-rsa
 * Examples of jwks-rsa usage:
 *  - https://github.com/auth0/node-jwks-rsa/blob/master/EXAMPLES.md
 */
/**
 * Tips for onelogin:
 *  - well-known configuration can be found here: https://<subdomain>.onelogin.com/oidc/2/.well-known/openid-configuration
 *  - jwks can be found here: https://<subdomain>.onelogin.com/oidc/2/certs
 * Examples of jwks-rsa usage:
 *  - https://github.com/auth0/node-jwks-rsa/blob/master/EXAMPLES.md
 */
export const createJwksMiddleware = (args: Args): Middleware => {
    const jwksClient = new jwksRsa.JwksClient({
        jwksUri: args.jwksUri,
    })

    return createJwtMiddleware([{
        ...args,
        key: async (token) => {
            const kid = getKeyIdFromJwt(token)
            const key = (await jwksClient.getSigningKey(kid))
                .getPublicKey()
            return key
        },
    }])
}
