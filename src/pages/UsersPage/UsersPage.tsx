import { Pagination } from '@/components/Pagination/Pagination'
import { Portal } from '@/components/Portal/Portal'
import { useDebounce } from '@/hooks/useDebounce'
import { usePagination } from '@/hooks/usePagination'
import { useQueryParam } from '@/hooks/useQueryParams'
import { handleError } from '@/http/core/handleError'
import { useGetAllUsers } from '@/http/usersApi'

export default function UsersPage() {
    const { currentPage, setPage, limit, offset, getTotalPages } = usePagination()
    const [ searchQuery, setSearchQuery ] = useQueryParam('search')
    const debounceSearchQuery = useDebounce(searchQuery, 300)

    const { data: users, status } = useGetAllUsers({
        limit,
        offset,
        searchQuery: debounceSearchQuery ?? ''
    })

    return <div>
        <button className='border p-1'>{'Add User'}</button>
        <Portal id="portal.header-search">
            <input
                placeholder='search'
                value={searchQuery ?? ''}
                onChange={e => setSearchQuery(e.target.value)} />
        </Portal>

        {status === 'error' && <p>{'Something went wrong'}</p>}
        {status === 'loading' && <p>{'loading...'}</p>}
        {status === 'success' && <div>
            {users.items.map(user => <div key={user.id}
                className="flex gap-2 mb-2">
                <p>{`${user.name} (${user.age})`}</p>
                <button className='border p-1'>{'Edit'}</button>
                <button className='border p-1'>{'Delete'}</button>
            </div>)}

            <Pagination
                currentPage={currentPage}
                onPageChange={setPage}
                totalPages={getTotalPages(users.totalCount)} />
        </div>}

    </div>
}
