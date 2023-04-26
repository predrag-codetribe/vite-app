/**
 * Represents a singular log output, i.e. a document
 */
export type Log = {
    message: string
    level: 'info' | 'warn' | 'error'
    logType: LogType

    // this is mandatory, but set in LogOutput class
    appEnv?: string

    method?: string
    route?: string | null // null for unknown routes
    url?: string
    /** User id */
    principal?: string | null
    userEmail?: string | null
    clientIp?: string

    requestId?: string
    requestBody?: unknown

    timeSpent?: string | null // format: `123.123 ms`

    // this allows unknown properties
    [key: string]: unknown
}
