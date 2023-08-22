import { logOutput } from '../logging/LogOutput'
import { getTimeSpentMiliseconds } from '../utils/TimeUtils'

type Severity = 'info' | 'warn' | 'error'

/**
 * Use for manual logging in UseCases, access like request.logger.
 */
export class UseCaseLogger {

    req: ExpressRequest
    res: ExpressResponse

    constructor(req: ExpressRequest, res: ExpressResponse) {
        this.req = req
        this.res = res
    }

    info = (message: string) => this.log('info', message)
    warn = (message: string) => this.log('warn', message)
    error = (message: string) => this.log('error', message)

    private log(level: Severity, message: string) {
        const locals = this.res.locals

        logOutput.log({
            level: level,
            message: message,
            logType: 'MANUAL',
            method: this.req.method,
            principal: locals.principal?.id,
            requestId: locals.requestId,
            route: locals.route,
            url: this.req.url,

            timeSpent: `${getTimeSpentMiliseconds(locals.requestTime)} ms`,
        })
    }
}

