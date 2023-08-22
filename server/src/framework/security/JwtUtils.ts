import * as jwtLib from 'jsonwebtoken'
import { JwtPayload, parseJwtPayload } from './JwtSchema'
/**
 * Extracts and returns kid (key id) from JWT. DOES NOT validate the JWT in any way.
 * @param jwt
 */
export const getKeyIdFromJwt = (jwt: string): string => {
    const keyId = jwtLib
        .decode(jwt, { complete: true })
        ?.header
        .kid

    if (!keyId) throw new Error('No "kid" found in jwt!')

    return keyId
}
/**
 * Validates the JWT and returns parsed payload, throws an error if it fails.
 */
export const validateJwt = (jwt: string, key: string, options?: jwtLib.VerifyOptions): JwtPayload => {
    const jwtPayload = jwtLib.verify(jwt, key, options)
    return parseJwtPayload(jwtPayload)
}
/**
 * Warning: Function does not validate jwt.
 * Returns issuer from jwt
 * @param jwt
 */
export const getIssuerFromJwt = (jwt: string): string => {
    const decodedJwt = jwtLib.decode(jwt, { complete: true })
    if (!decodedJwt)
        return ''

    if (typeof decodedJwt.payload === 'string')
        throw new Error('decodedJwt.payload is string!')

    const issuer = decodedJwt.payload.iss ?? ''
    return issuer
}

