
type RuntimeEnvironment = 'development' | 'production' | 'debugger'

export function getRuntimeEnvironment(): RuntimeEnvironment {
    // @ts-expect-error TS7053: Element implicitly has an 'any' type because expression of type 'symbol' can't be used to index type 'Process'.
    const tsNodeDetected = Boolean(process[Symbol.for('ts-node.register.instance')])

    if (tsNodeDetected)
        return 'debugger'

    if (process.env.NODE_ENV === 'development')
        return 'development'

    return 'production'
}
/**
 * Returns true if ts-node is detected.
 */
export function inDebuggerMode(): boolean {
    return getRuntimeEnvironment() === 'debugger'
}
