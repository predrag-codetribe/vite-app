import { LoggingUtil } from '../logging/LoggingUtil'

export const requestLoggingMw: Middleware = (req, res, next) => {
    LoggingUtil.logRequest(req, res)
    next()
}
