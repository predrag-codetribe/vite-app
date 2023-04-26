import { LoggingUtil } from '../logging/LoggingUtil'

export const requestLoggingMiddleware: Middleware = (req, res, next) => {
    LoggingUtil.logRequest(req, res)
    next()
}
