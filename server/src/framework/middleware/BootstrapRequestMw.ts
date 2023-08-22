import { uuid4 } from '../utils/StringsUtil'

export const bootstrapRequestMw: Middleware = (req, res, next) => {
    res.locals.requestId = uuid4()
    res.locals.requestTime = process.hrtime()
    // `route` is only available if this middleware is set on router, rather than app level
    res.locals.route = req.route?.path

    next()
}
