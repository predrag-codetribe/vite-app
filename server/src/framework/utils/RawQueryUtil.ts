import { z } from 'zod'
import { camelizeObjectArray } from './CamelizeString'

type Args<T extends z.ZodArray<z.ZodObject<z.ZodRawShape>>> = {
    query: string
    parameters: Record<string, unknown>
    schema: T
}

/**
 * Custom solution for executing raw SQL queries.
 * Has a couple of advantages over directly using t.query or the pg driver:
 *  1. Return value type safety using Zod
 *  2. Using named parameters in the query instead of $1 or ?
 *  3. Converting the result from snake_case to camelCase (PostgreSQL is case-insensitive, so returning camelCase directly is not possible)
 */
export const rawQuery = async <T extends z.ZodArray<z.ZodObject<z.ZodRawShape>>>(
    t: TypeOrmEntityManager,
    args: Args<T>,
): Promise<z.infer<T>> => {
    const { query, parameters, schema } = args

    const parametersKeys = Object.keys(parameters)

    // replace named parameters with indexed ones
    const preparedQuery = parametersKeys
        .reduce((query, paramKey, index) =>
            query.replaceAll(`:${paramKey}`, `$${index + 1}`)
        , query)

    const parametersArray = parametersKeys.map(key => parameters[key])

    const rawResult: unknown[] = await t.query(preparedQuery, parametersArray)

    const camelCasedResult = camelizeObjectArray(rawResult)

    const parsingResult = schema.parse(camelCasedResult)

    return parsingResult
}
