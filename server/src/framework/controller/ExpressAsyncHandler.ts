
/**
 * Express doesn't handle async middleware correctly, so we need to wrap such middleware in asyncHandler.
 * Accepts AsyncMiddleware (one which returns Promise<void>) and returns regular Middleware (one which returns void)
 * @param fn
 */
export const asyncHandler = (fn: AsyncMiddleware): Middleware =>
    (req, res, next) =>
        Promise
            .resolve(fn(req, res, next))
            .catch(next)
