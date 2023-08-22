/**
 * PREFACE
 * As the implementation of Date in Javascript is horrid, to say at least, these methods help mitigate the weirdness of Date.
 * If it becomes cumbersome, import a third party library for this (please not Moment).
 * All functions are pure, i.e. do not modify the input.
 */

/**
 * Returns a new Date with seconds incremented by provided value.
 * @param date
 * @param seconds
 */
const addSeconds = (date: Date, seconds: number): Date => {
    const copy = new Date(date)

    copy.setTime(copy.getTime() + (seconds * 1000))
    return copy
}

const addMinutes = (date: Date, minutes: number): Date => {
    const copy = new Date(date)

    copy.setTime(copy.getTime() + (minutes * 60 * 1000))
    return copy
}

const addHours = (date: Date, hours: number): Date => {
    const copy = new Date(date)

    copy.setTime(copy.getTime() + (hours * 60 * 60 * 1000))
    return copy
}

const addDays = (date: Date, days: number): Date => {
    const copy = new Date(date)

    copy.setDate(copy.getDate() + days)
    return copy
}
/**
 * Returns true if provided date is in the future.
 * @param inputDate
 */
const isInFuture = (inputDate: Date): boolean => {
    return inputDate.getTime() > (new Date()).getTime()
}
/**
 * Returns true if provided date is in the past.
 * @param inputDate
 */
const isInPast = (inputDate: Date): boolean => {
    return inputDate.getTime() < (new Date()).getTime()
}
