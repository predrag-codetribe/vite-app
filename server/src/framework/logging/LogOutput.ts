import winston from 'winston'
import { Log } from './Log'
import Sentry from '@sentry/node'

const APP_ENV = process.env.APP_ENV

/**
 * Class representing an output for logs to whatever, console, elastic...
 * Abstracts the application from the underlying logger, which is currently winston.
 * For custom formats see format.printf https://github.com/winstonjs/winston#formats.
 */
class LogOutput {
    private readonly winstonLogger: winston.Logger

    constructor() {
        // simple logs for development (more-readable), json for everything else
        const logFormat = process.env.NODE_ENV === 'development'
            ? winston.format.simple()
            : winston.format.json()

        this.winstonLogger = winston.createLogger({
            format: logFormat,
            transports: [
                new winston.transports.Console(),
            ],
        })

        if (process.env.NODE_ENV !== 'development') {
            Sentry.init({
                dsn: '', //process.env.SENTRY_DSN,
                environment: process.env.APP_ENV,
            })
        }
        this.winstonLogger.info('Logger set up! Logging to stdout.')
    }

    info = (message: string, context?: unknown) => {
        this.log({ level: 'info', logType: 'MANUAL', message, context })
    }
    warn = (message: string, context?: unknown) => {
        this.log({ level: 'warn', logType: 'MANUAL', message, context })
    }
    error = (message: string | Error, context?: unknown) => {
        if (process.env.NODE_ENV !== 'development') {
            Sentry.captureException(message, { extra: context as Record<string, unknown> })
        }

        if (message instanceof Error) message = `${message.message} - ${message.stack}`
        this.log({ level: 'error', logType: 'MANUAL', message, context })
    }

    log(log: Log) {
        log.appEnv = APP_ENV
        this.winstonLogger.log(log)
    }
}

export const logOutput = new LogOutput()
