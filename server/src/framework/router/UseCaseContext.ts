import { UseCaseLogger } from './UseCaseLogger'
import { Principal } from '../security/Principal'

export type UseCaseContext<T> = {
    logger: UseCaseLogger

    originalUrl: string
    originalBody: Json

    locale: string
    principal: Principal
    requestId: string

    input: T
}

export const buildUseCaseContext = <T>(req: ExpressRequest, res: ExpressResponse, input: T): UseCaseContext<T> => ({
    logger: new UseCaseLogger(req, res),

    originalUrl: req.url,
    originalBody: req.body,

    locale: res.locals['locale'],
    principal: res.locals['principal'],
    requestId: res.locals['requestId'],

    input,
})
