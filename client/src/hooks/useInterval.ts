import { useEffect, useRef } from 'react'

/**
 * Copied from here: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 *
 * @param callback
 * @param delay
 */
export function useInterval(callback: () => void, delay: number | null): void {
    const savedCallback = useRef<() => void>()

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        function tick() {
            // @ts-expect-error TS2722: Cannot invoke an object which is possibly 'undefined'.
            savedCallback.current()
        }
        if (delay !== null) {
            const id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}
