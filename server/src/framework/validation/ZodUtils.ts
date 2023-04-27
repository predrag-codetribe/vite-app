import { z } from 'zod'

export const zodUtils = {

    numberString: z.string()
        .refine(str => str && !isNaN(Number(str)), {
            message: 'Must be a number string!',
        }),

    idWrapper: z.object({
        id: z.string().uuid(),
    }),

    trimmedString: z.string()
        // string must not be empty
        .min(1)
        // string must not have whitespace on ends
        .refine(str => str.length === str.trim().length, {
            message: 'String must be trimmed!',
        }),

    stringToBoolean: z.preprocess((val) => {
        return val === 'true'
    }, z.boolean()),

    stringToInteger: z.preprocess((val) => {
        return Number(val)
    }, z.number().int()),
} as const
