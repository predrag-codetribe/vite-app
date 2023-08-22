/**
 * Returns client's IP address
 */
export const getClientIp = (req: ExpressRequest): string => {
    return req.header('x-forwarded-for') || req.socket.remoteAddress || 'ip-unknown'
}
/**
 * Returns the IP address of the machine that made the connection
 */
export const getProxyIp = (req: ExpressRequest): string => {
    const forwardedFor = req.headers['x-forwarded-for']
    let proxy
    if (forwardedFor) {
        proxy = (forwardedFor instanceof Array ? forwardedFor : forwardedFor.split(',')).slice(-1).pop()
    }
    return proxy || req.ip || ''
}
/**
 * Returns ISO Language Codes from ExpressRequest.
 * @param req
 */
export const getAcceptLanguage = (req: ExpressRequest): LanguageCode[] => {
    const langHeader = req.headers['accept-language'] || ''
    const acceptedLangs: string[] = langHeader
        .trim()
        // splints into [ 'fr-CH', ' fr;q=0.9', ' en;q=0.8', ' de;q=0.7', ' *;q=0.5' ]
        .split(',')
        // trims and removes quality weight [ 'fr-CH', 'fr', 'en', 'de', '*' ]
        .map(value => value.trim().split(';')[0] || '')

    return acceptedLangs as LanguageCode[]
}
