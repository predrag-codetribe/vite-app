
export const isObject = (value: unknown): value is Json => {
    return value !== null
        && typeof value === 'object'
}

export const isNonEmptyObject = (value: unknown): value is Json => {
    return value !== null
        && typeof value === 'object'
        && Object.keys(value).length > 0
}

export const isEmptyObject = (value: unknown): value is Json => {
    return value !== null
        && typeof value === 'object'
        && Object.keys(value).length === 0
}
/**
 * Returns true if an object contains all specified keys
 * @param value
 * @param keys
 */
export const containsAllKeys = (value: unknown, ...keys: string[]): value is Json => {
    return value !== null
        && typeof value === 'object'
        && keys.every(key => key in value)
}
/**
 * Returns true if an object contains all specified keys and nothing more
 * @param value
 * @param keys
 */
export const containsExactKeys = (value: unknown, ...keys: string[]): value is Json => {
    return value !== null
        && typeof value === 'object'
        && keys.every(key => key in value)
        && Object.keys(value).every(valueKey => keys.includes(valueKey))
}
