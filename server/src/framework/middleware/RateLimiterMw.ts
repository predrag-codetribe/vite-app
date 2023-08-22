import rateLimit from 'express-rate-limit'

const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 1000
const max = Number(process.env.RATE_LIMIT_MAX) || 20

export const rateLimiterMw = rateLimit({
    windowMs,
    max,
    keyGenerator: (req) => (req.headers['authorization']) ?? req.ip,
})
