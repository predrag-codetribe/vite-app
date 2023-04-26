import { IpDeniedError } from 'express-ipfilter'
import { TranslationKey } from '../../i18n/locales/en'

import { ApiError } from '../controller/ApiError'
import { ForbiddenError } from '../security/ForbiddenError'
import { UnauthorizedError } from '../security/UnauthorizedError'

import { LoggingUtil } from '../logging/LoggingUtil'
import { i18n } from '../../i18n/i18n'
import { getEntityNotFound } from '../utils/TypeOrmUtils'
import { getAcceptLanguage } from '../controller/ExpressUtils'
import { ZodError } from 'zod'
import { ValidationException } from '../validation/ValidationException'
import { logOutput } from '../logging/LogOutput'

export const exceptionHandlerMiddleware: ErrorMiddleware = (err, req, res, _next) => {
    // @ts-expect-error TS2339: Property 'type' does not exist on type 'Error'.
    // thrown by express.json middleware when JSON is malformed
    if (err.type === 'entity.parse.failed') {
        return response({
            req,
            res,
            statusCode: 400,
            errorKey: 'malformed.json',
        })
    }

    if (err instanceof UnauthorizedError) {
        LoggingUtil.logUnauthorized(req, res, err)
        return response({
            req,
            res,
            statusCode: 401,
            errorKey: 'unauthorized',
        })
    }

    if (err instanceof ForbiddenError) {
        LoggingUtil.logForbidden(req, res, err)
        return response({
            req,
            res,
            statusCode: 403,
            errorKey: 'forbidden',
        })
    }

    if (err instanceof ZodError || err instanceof ValidationException) {
        LoggingUtil.logValidationException(req, res, err.message)
        return response({
            req,
            res,
            statusCode: 400,
            errorKey: 'bad.request',
            resBody: {
                reason: err.message,
                errors: 'errors' in err ? err.errors : [],
            },
        })
    }

    // this Error is thrown by TypeOrm when an Entity is not found after calling findOneOrFail
    if (err.name === 'EntityNotFound' || err.stack?.startsWith('EntityNotFoundError')) {
        const [ entityName, conditions ] = getEntityNotFound(err)
        LoggingUtil.logEntityNotFound(req, res, entityName, conditions)
        return response({
            req,
            res,
            statusCode: 404,
            errorKey: 'entity.not.found',
            resBody: {
                entity: entityName,
            },
        })
    }

    // UseCase/business errors
    if (err instanceof ApiError) {
        return response({
            req,
            res,
            statusCode: err.statusCode,
            errorKey: err.errorKey,
            resBody: { data: err.data },
        })
    }

    if (err instanceof IpDeniedError) {
        logOutput.error(err)
        return response({
            req,
            res,
            statusCode: 403,
            errorKey: 'access.forbidden',
        })
    }

    LoggingUtil.logInternalServerError(req, res, err)
    return response({
        req,
        res,
        statusCode: 500,
        errorKey: 'internal.server.error',
        resBody: {
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        },
    })
}

const response = (args: {
    req: ExpressRequest
    res: ExpressResponse
    statusCode: HttpStatusCode
    errorKey: TranslationKey
    resBody?: Json
}): void => {
    const { req, res, statusCode, errorKey } = args
    const resBody: Json = args.resBody || {}

    const acceptLanguage = getAcceptLanguage(req)

    // common fields to all error responses
    resBody['errorKey'] = errorKey
    resBody['message'] = i18n.translate(errorKey, acceptLanguage)

    LoggingUtil.logResponse(req, res, resBody, statusCode)
    res.status(statusCode).json(resBody)
}
