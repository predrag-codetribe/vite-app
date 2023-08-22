import * as crypto from 'crypto'

export class CryptoUtils {

    static hmacSha256(value: string, secret: string): string {
        const hmac = crypto.createHmac('sha256', secret)
        hmac.write(value) // write in to the stream
        hmac.end() // can't read from the stream until you call end()

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const hash = hmac.read().toString('hex') as string
        return hash
    }

}
