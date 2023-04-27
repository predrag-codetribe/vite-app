// inspired by https://github.com/streamich/react-use/blob/master/src/useSessionStorage.ts
import { useEffect, useState } from 'react'

export function useSessionStorage<T>(
    key: string,
    initialValue?: T,
): [T, (value: T) => void] {
    const [ state, setState ] = useState<T>(() => {
        try {
            const sessionStorageValue = sessionStorage.getItem(key)
            if (typeof sessionStorageValue !== 'string') {
                sessionStorage.setItem(key, JSON.stringify(initialValue))
                return initialValue as T
            } else {
                return JSON.parse(sessionStorageValue || 'null') as T
            }
        } catch {
            // If user is in private mode or has storage restriction
            // sessionStorage can throw. JSON.parse and JSON.stringify
            // can throw, too.
            return initialValue as T
        }
    })

    useEffect(() => {
        const serializedState = JSON.stringify(state)
        sessionStorage.setItem(key, serializedState)
    },[ key, state ])

    return [ state, setState ]
}

