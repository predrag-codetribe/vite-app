import { LoggingUtil } from '../logging/LoggingUtil'
import { db } from '../database/TypeOrmConfig'
import { buildUseCaseContext } from './UseCaseContext'
import { createUseCase } from './UseCase'
import { asyncHandler } from './ExpressAsyncHandler'
import { ZodVoid } from 'zod'
import { ValidationException } from '../validation/ValidationException'
import { EntityManager } from 'typeorm'

const SUCCESS_STATUS_CODE = 200
const RESERVED_FIELDS: readonly string[] = [
    'logger',
    'originalUrl', 'originalBody',
    'locale', 'principal', 'requestId',
    'bootstrap',
    'principalId',
]

export const createUseCaseExecutionMiddleware = (
    method: HttpMethod,
    route: string,
    useCase: ReturnType<typeof createUseCase>,
    logResponseBody: boolean,
): Middleware => asyncHandler(async (req, res, _next) => {

    // if method is GET we're loading fields from query params, for everything else we're loading the body
    const requestParams: Json = method === 'get' ? req.query : req.body

    const pathParams: Record<string, string> = req.params

    // check if namings of params conflict
    const conflictedParams = Object.keys(pathParams).filter(pathParam => pathParam in requestParams)
    if (conflictedParams.length) {
        const message = `Please provide (${conflictedParams}) through route (${route}) and not through body or query params!`
        throw new ValidationException(message)
    }

    const allParams: Json = { ...requestParams, ...pathParams }

    // check if there's reserved field names in allParams
    const reservedFieldsPresent = RESERVED_FIELDS.filter(field => field in allParams)
    if (reservedFieldsPresent.length) {
        const message = `Cannot use parameters with reserved names: (${reservedFieldsPresent})!`
        throw new ValidationException(message)
    }

    // validating/parsing the request body (input)
    const input = useCase
        // this is a reference to ZodSchema (ZodObject)
        .input
        // strict disallows unknown properties in object
        .strict()
        // parse/validate, throws an exception if validation fails
        .parse(allParams)

    const useCaseContext = buildUseCaseContext(req, res, input)

    //// UseCase execution
    let response: Awaited<ReturnType<typeof useCase.execute>>
    const startTransaction: boolean = useCase.execute.length > 1
    if (startTransaction) {
        // execute usecase inside a transaction
        response = await db.transaction(
            t => useCase.execute(useCaseContext, t),
        )
    } else {
        // execute usecase without a transaction
        response = await useCase.execute(useCaseContext, undefined as unknown as EntityManager)
    }

    // if the response is not `void`, validate it
    if (!(useCase.output instanceof ZodVoid)) {
        // parse before returning response, stripping away unwanted fields
        response = useCase.output.parse(response)
    }

    LoggingUtil.logResponse(req, res, logResponseBody ? response : null, SUCCESS_STATUS_CODE)

    // returning response to client
    res.status(SUCCESS_STATUS_CODE)
        .send(response)
})
