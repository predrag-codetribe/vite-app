import { v4 as uuidV4, validate } from 'uuid'

export const alphaNumerics = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

/**
 * Returns a randomly generated string of `size`
 * @param size
 */
export const randomString = (size: number): string => {
    const chars = alphaNumerics
    let result = ''
    for (let i = size; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)]
    return result
}
/**
 * Returns a v4 uuid.
 */
export const uuid4 = (): string => uuidV4()

/**
 * Returns a valid fake uuid, identifiable by leading zeros
 */
export const fakeUuid = (): string => {
    return '00000000' + uuid4().slice(8)
}
/**
 * Returns true if `value` is a string uuid.
 */
export const isUuid = (value: unknown): value is string => {
    return typeof value === 'string'
        && validate(value)
}
/**
 * Returns a string with the trailing slash removed
 */
export const removeTrailingSlash = (value: string) => {
    const lastChar = value.substring(value.length - 1)
    if (lastChar === '/') return value.substring(0, value.length - 1)
    return value
}
/**
 * Prepares the query string for searching
 * @param query
 */
export const normalizeSearchQuery = (query: string) => {
    query = query.toLowerCase()
    // split the query into separate words and join with '%', making it possible to find words across the document
    query = query.split(' ').join('%')
    // surround with '%'
    query = '%' + query + '%'

    return query
}
/**
 * Checks the test string against a set of valid characters.
 */
export const isInSetOfValidChars = (value: unknown, validChars: Set<string>): value is string => {
    return typeof value === 'string'
        && [...value].every(char => validChars.has(char))
}
/**
 * Splits the `str` only on the first occurrence of `char`
 * @param str
 * @param char
 */
export const splitStringInTwo = (str: string, char: string): [string, string] => {
    const charIndex = str.indexOf(char)

    // special case if char was not found
    if (charIndex < 1)
        return [ str, '' ]

    return [ str.substring(0, charIndex), str.substring(charIndex + 1) ]
}
/**
 * Splits a string to an array of string by a given value separator
 */
export const listToArray = (str: string, separator = ','): string[] => str.trim().replace(' ', '').split(separator)
