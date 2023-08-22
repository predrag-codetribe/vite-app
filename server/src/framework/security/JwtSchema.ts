import { z } from 'zod'
/**
 * The complete schema for Jwt payload can be found here:
 *  https://www.iana.org/assignments/jwt/jwt.xhtml
 * As there are many fields, we're adding only the ones we're actually interested in.
 */
const JwtPayloadSchema = z.object({
    sub: z.string(),
    aud: z.string(),
    iss: z.string(),
    exp: z.number(),
    email: z.string().optional(),
})

export type JwtPayload = z.infer<typeof JwtPayloadSchema>

export const parseJwtPayload = (payload: unknown): JwtPayload => {
    return JwtPayloadSchema.parse(payload)
}
