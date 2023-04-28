import rateLimit from 'express-rate-limit'
import { CreateControllerInfo } from '../framework/controller/ControllerFactory'
import { jwtMiddleware } from './security/JwtMiddleware'
import { GetMe } from './usecases/user/GetMe'

const rateLimiter = rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS),
    max: Number(process.env.RATE_LIMIT_MAX),
    keyGenerator: req => req.headers['authorization'] ?? req.ip,
})

export const mainApiInfo: CreateControllerInfo = {
    middleware: [ rateLimiter, jwtMiddleware ],
    routes: [
        [ 'get', '/getMe', GetMe ],
    ],
}
