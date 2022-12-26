import { useNoInitialEffect } from '@/hooks/useNoInitialEffect'
import { useQueryParam } from '@/hooks/useQueryParams'
import { useState } from 'react'

type Configuration = {
    limit?: number
}
export function usePagination(options?: Configuration) {
    const limit = options?.limit ?? 10

    const [ pageQuery, setPageQuery ] = useQueryParam('page')
    const numberPageQuery = pageQuery ? Number(pageQuery) : 1

    const [ currentPage, setPage ] = useState(numberPageQuery)
    const [ itemsCount, setItemsCount ] = useState(0)

    const totalPages = Math.ceil(itemsCount / limit)
    const offset = (currentPage - 1) * limit

    useNoInitialEffect(() => {
        if (totalPages && totalPages < currentPage) {
            setPage(totalPages)
            return
        }
        setPageQuery(currentPage)
    }, [ currentPage, setPageQuery, totalPages ])

    return {
        /** Current page starts from 1 and above. */
        currentPage,
        setPage,
        limit,
        offset,
        setItemsCount,
        totalPages
    }
}
