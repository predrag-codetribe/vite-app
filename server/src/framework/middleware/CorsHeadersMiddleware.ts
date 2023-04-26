
// TODO add some options to this, should it be * or something else
export const corsHeadersMiddleware: Middleware = (req, res, next) => {
    const origin = req.headers['origin'] ?? '*'

    // Allow-Origin must be explicitly set to a domain if Allow-Credentials=true
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PATCH,PUT,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Max-Age', '600') // cache cors for 10 min
    // Allow-Credentials must be 'true' in order for browser to accept the cross-origin response with cookies
    // Also, frontend must explicitly enable sending credentials, e.g. in Axios it's withCredentials:true
    res.header('Access-Control-Allow-Credentials', 'true')

    if (req.method === 'OPTIONS') {
        res.status(200).send()
        return
    }

    next()
}
