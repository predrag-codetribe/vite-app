import { LoggingUtil } from '../logging/LoggingUtil'
import { i18n } from '../../i18n/i18n'
import { getAcceptLanguage } from '../controller/ExpressUtils'

/**
 * Handles unknown routes, place this after all other routes under '/' route
 */
export const routeNotFoundMiddleware: Middleware = (req, res, _next) => {
    LoggingUtil.logRouteNotFound(req, res)

    const errorKey = 'route.not.found'
    const acceptLanguage = getAcceptLanguage(req)

    res.status(404).json({
        'errorKey': errorKey,
        'message': i18n.translate(errorKey, acceptLanguage),
    })
}
