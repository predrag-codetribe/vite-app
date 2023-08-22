
export const removeDuplicates = <T>(inputArray: T[]): T[] => {
    return inputArray.filter((item, index) => inputArray.indexOf(item) === index)
}

export const sum = <T>(objects: T[], property: keyof T): number => {
    return objects.reduce((acc: number, obj: T): number => {
        const value = typeof obj[property] === 'function'
            // @ts-expect-error TS2349: This expression is not callable. Type 'unknown' has no call signatures.
            ? obj[property]()
            : obj[property]

        if (typeof value !== 'number') {
            throw new Error('ArraysUtil.sum error! Values must be numbers!')
        }

        return acc + value
    }, 0)
}
