/**
 * Converts string from camel_case to upperCase.
 * @author Miljus
 */
export const camelizeString = (input: string): string => {
    if (typeof input !== 'string') {
        throw new Error('camelizeString: input must be a string!')
    }

    let output = ''
    let flag = false
    for (const char of input) {
        if (char === '_') {
            flag = true
            continue
        }
        if (flag) {
            output += char.toUpperCase()
            flag = false
        } else {
            output += char
        }
    }
    return output
}
/**
 * Converts object's keys from snake_case to camelCase.
 * @param input
 */
export const camelizeObject = (input: Json): Json => {
    if (!input || typeof input !== 'object' || Array.isArray(input)) {
        throw new Error('camelizeObject: input must be an object')
    }

    const output: Json = {}
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    for (const [ key, value ] of Object.entries(input)) {
        output[camelizeString(key)] = value
    }
    return output
}
/**
 * Converts keys of an array of objects from snake_case to camelCase.
 * @param input
 */
export const camelizeObjectArray = (input: Json[]): Json[] => {
    if (!Array.isArray(input)) {
        throw new Error('camelizeObjectArray: input must be an array!z')
    }

    return input.map(camelizeObject)
}
