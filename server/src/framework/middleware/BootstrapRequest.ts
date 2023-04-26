import { uuid4 } from '../utils/StringsUtil'
import { ResLocals } from './ResLocals'

export const bootstrapRequestMiddleware: Middleware = (req, res, next) => {
    const locals = res.locals as ResLocals
    locals.requestId = uuid4()
    locals.requestTime = process.hrtime()
    // `route` is only available if this middleware is set on router, rather than app level
    locals.route = req.route?.path

    next()
}
