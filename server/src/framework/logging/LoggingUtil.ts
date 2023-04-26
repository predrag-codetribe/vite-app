import { ForbiddenError } from '../security/ForbiddenError'
import { UnauthorizedError } from '../security/UnauthorizedError'

import { logOutput } from './LogOutput'
import { ResLocals } from '../middleware/ResLocals'
import { getTimeSpentMiliseconds } from '../utils/TimeUtils'
import { getClientIp } from '../controller/ExpressUtils'

export class LoggingUtil {

    static logRequest(req: ExpressRequest, res: ExpressResponse) {
        logOutput.log({
            level: 'info',
            message: `>>> ${req.method} ${this.getRoute(req, res)}`,
            logType: 'REQUEST',

            ...this.commonFields(req, res),

            requestBodyJson: JSON.stringify(req.body),
            headers: { ...req.headers, authorization: '[REDACTED]' },
        })
    }

    static logResponse(req: ExpressRequest, res: ExpressResponse, result: unknown, statusCode: number) {
        logOutput.log({
            level: 'info',
            message: `<<< ${req.method} ${this.getRoute(req, res)}`,
            logType: 'RESPONSE',

            ...this.commonFields(req, res),

            statusCode: statusCode,
            responseBodyJson: JSON.stringify(result),
        })
    }

    static logInternalServerError(req: ExpressRequest, res: ExpressResponse, err: Error) {
        logOutput.log({
            level: 'error',
            message: `${err}`,
            logType: 'EXCEPTION',

            ...this.commonFields(req, res),

            stackTrace: err.stack,
        })
    }

    static logUnauthorized(req: ExpressRequest, res: ExpressResponse, err: UnauthorizedError) {
        logOutput.log({
            level: 'info',
            message: `${err.message}`,
            logType: 'UNAUTHORIZED',

            ...this.commonFields(req, res),
        })
    }

    static logForbidden(req: ExpressRequest, res: ExpressResponse, err: ForbiddenError) {
        logOutput.log({
            level: 'warn',
            message: `${err.message}`,
            logType: 'FORBIDDEN',

            ...this.commonFields(req, res),
        })
    }

    static logRouteNotFound(req: ExpressRequest, res: ExpressResponse) {
        logOutput.log({
            level: 'warn',
            message: `Route not found: ${req.url}`,
            logType: 'ROUTE-NOT-FOUND',

            ...this.commonFields(req, res),
        })
    }

    static logEntityNotFound(req: ExpressRequest, res: ExpressResponse, entityName: string, condition: string) {
        logOutput.log({
            level: 'warn',
            message: `Entity (${entityName}) not found! conditions: (${condition})`,
            logType: 'ENTITY-NOT-FOUND',

            ...this.commonFields(req, res),
        })
    }

    static logValidationException(req: ExpressRequest, res: ExpressResponse, message: string) {
        logOutput.log({
            level: 'warn',
            message: `Validation exception! ${message}`,
            logType: 'VALIDATION-EXCEPTION',

            ...this.commonFields(req, res),
        })
    }

    /**
     * Logs unhandled promise rejection.
     * If error is passed, also logs stack trace, but we're not guaranteed to get an Error object on unhandled rejection so we also accept any type
    */
    static logUnhandledPromiseRejection = (rejectionError: unknown): void => {
        const isError = rejectionError instanceof Error
        logOutput.log({
            level: 'error',
            message: `${isError ? rejectionError.message : rejectionError}`,
            logType: 'UNHANDLED-PROMISE-REJECTION',

            stackTrace: isError ? rejectionError.stack : null,
        })
    }

    private static commonFields(req: ExpressRequest, res: ExpressResponse) {
        const locals = res.locals as ResLocals
        const timeSpent = locals.requestTime ? `${getTimeSpentMiliseconds(locals.requestTime)} ms` : null
        return {
            method: req.method,
            principal: locals.jwtPayload?.['sub'] || null,
            userEmail: locals.jwtPayload?.['email'] || null,
            requestId: locals.requestId,
            route: locals.route || null,
            url: req.url,
            timeSpent: timeSpent,
            clientIp: getClientIp(req),
        }
    }

    private static getRoute(req: ExpressRequest, res: ExpressResponse): string {
        // 'route' should be set in bootstrapRequestMiddleware
        if ('route' in res.locals) {
            return String(res.locals['route'])
        }

        // fallback
        return req.url
    }

}
