import { NextFunction, Request, Response } from 'express'
import { EntityManager } from 'typeorm'

type JsonPrimitive = number | string | boolean | null | JsonArray | JsonObject
type JsonArray = JsonPrimitive[]
type JsonObject = Record<string, JsonPrimitive>

declare global {
    /**
     * JSON.
     * https://github.com/microsoft/TypeScript/issues/1897
     */
    type Json = JsonObject
    /**
     * Array<T> but requires at least one element.
     */
    type NonEmptyArray<T> = [T, ...T[]]

    /**
     * Http status codes. Extend if needed.
     */
    type HttpStatusCode = 200 | 400 | 401 | 403 | 404 | 409 | 500
    /**
     * Http methods. Extend if needed.
     */
    type HttpMethod = 'get' | 'post' | 'put' | 'delete'
    /**
     * ISO language codes. Extend if needed.
     */
    type LanguageCode = 'en' | 'rs'

    type TypeOrmEntityManager = EntityManager

    type ExpressRequest = Request
    type ExpressResponse = Response
    type ExpressNextFunction = NextFunction
    /**
     * Express Middleware.
     */
    type Middleware = (req: Request, res: Response, next: NextFunction) => void
    /**
     * Express Async Middleware.
     */
    type AsyncMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>
    /**
     * Express Error Middleware.
     * Distinguished from regular Middleware by having 4 arguments, instead of the usual 3.
     */
    type ErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => void

    /**
     * EXPERIMENTAL
     * Currently only an alias for string, used only for semantics and readability.
     * In the future, if possible, improve the type.
     */
    type uuid = string
    /**
     * EXPERIMENTAL
     * Created for better readability for optional values, which need careful handling.
     * Makes sure we do not forget both undefined and null.
     */
    type Optional<T> = undefined | null | T

}
