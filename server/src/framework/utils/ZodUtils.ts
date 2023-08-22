import { z } from 'zod'

export const zodUtils = {
    dateInFuture: () => z.coerce.date().refine(v => v > new Date(), {
        message: 'Date must be in future!',
    }),
} as const
