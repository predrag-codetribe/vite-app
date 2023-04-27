import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

type NewQuery<T> = T | null | undefined // passing null or undefined will remove the query

export function useQueryParam(key: string): [
    string | null,
    (newQuery: NewQuery<unknown>) => void
] {
    const [ searchParams, setSearchParams ] = useSearchParams()

    const paramValue = searchParams.get(key)
    const value = useMemo(() => paramValue, [paramValue])

    const setValue = useCallback((newValue: NewQuery<unknown>) => {
        const searchQuery = window.location.search
        const newSearchParams = new URLSearchParams(searchQuery)

        if (newValue === null || newValue === undefined) {
            newSearchParams.delete(key)
        } else {
            newSearchParams.set(key, String(newValue))
        }

        const oldSearchParamsString = searchQuery.replace('?', '')
        // do not update the params if they didn't change
        if (oldSearchParamsString === newSearchParams.toString()) return
        setSearchParams(newSearchParams, { replace: true })
    },
    [ key, setSearchParams ],
    )

    return [ value, setValue ]
}

export function useBooleanQueryParam(key: string): [
    boolean,
    (newQuery: NewQuery<boolean>) => void
] {
    const [ query, setQuery ] = useQueryParam(key)
    const value = useMemo(() => {
    // `?query=true`
        if (query === 'true') return true
        // `?query` will give "", so we consider that true, because the query exist in the url
        if (query === '') return true
        return false
    }, [query])

    return [ value, setQuery ]
}

export function useArrayQueryParam(key: string): [
    string[],
    (newQuery: NewQuery<unknown[]>) => void
] {
    const [ query, setQuery ] = useQueryParam(key)

    const value = useMemo(() => {
        if (!query) return []
        return query.split(',')
    }, [query])

    return [ value, setQuery ]
}
