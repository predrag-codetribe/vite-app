/**
 * Util for using async functions the safe way in .map
 * @param list
 * @param func
 */
export const mapAsync = async <InputType, OutputType>(
    list: Array<InputType>,
    func: (x: InputType) => Promise<OutputType>,
): Promise<Array<OutputType>> => {

    return await Promise.all(list.map(func))
}
/**
 * Call this function in `catch` blocks to handle Error correctly, as `e` is not guaranteed to be an Error object.
 * This handles the TypeScript rule of useUnknownInCatchVariables since TypeScript v4.4.
 * @param e
 */
export const mapError = (e: unknown): Error => {
    if (e instanceof Error)
        return e

    return new Error(`Unknown error occurred in mapError! type=${typeof e} e=${e}`)
}
/**
 * Properly typed `isTruthy` function for use in TypeScript.
 * The typing does its magic the best when used in a .filter() HOF.
 * @param value
 */
export const isTruthy = <T>(value: T): value is Exclude<T, false | null | undefined | '' | 0> => {
    return Boolean(value)
}
/**
 * Properly typed `isNotNullish` function for use in TypeScript.
 * The typing does its magic the best when used in a .filter() HOF.
 * @param value
 */
export const isNotNullish = <T>(value: T): value is Exclude<T, null | undefined> => {
    return value !== null
        && value !== undefined
}
