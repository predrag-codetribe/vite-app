
/**
 * High resolution time - returned by process.hrtime()
 */
type HRTime = [number, number]

export const getTimeSpentMiliseconds = (hrTime: HRTime): number => {
    const timeSpan = process.hrtime(hrTime)
    const [ seconds, nanoseconds ] = timeSpan
    const secondsMilliseconds = seconds * 1000
    const nanosecondsMilliseconds = nanoseconds / 1000000
    return secondsMilliseconds + nanosecondsMilliseconds
}
