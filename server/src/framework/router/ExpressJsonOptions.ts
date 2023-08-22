import { OptionsJson } from 'body-parser'
import { IncomingMessage } from 'http'

/**
 * Parses all request bodies as json, regardless of content-type header.
 * Used like this app.use(express.json(PARSE_ALL_AS_JSON)) .
 * This is perfect for our case as we're using only REST JSON apis in this application.
 */
export const PARSE_ALL_AS_JSON: OptionsJson = {
    type(_req: IncomingMessage) {
        return true
    },
}
