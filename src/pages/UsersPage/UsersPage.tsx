import { Pagination } from '@/components/Pagination/Pagination'
import { usePagination } from '@/hooks/usePagination'
import { useGetAllUsers } from '@/http/usersApi'

export default function UsersPage() {
    const { currentPage, setPage, limit, offset, setItemsCount, totalPages } = usePagination()
    const { data: users, status } = useGetAllUsers({
        limit,
        offset
    }, {
        onSuccess(data) {
            setItemsCount(data.totalCount)
        }
    })

    return <div>
        <button className='border p-1'>{'Add User'}</button>

        {status === 'error' && <p>{'Something went wrong'}</p>}
        {status === 'loading' && <p>{'loading...'}</p>}
        {status === 'success' && <div>
            {users.items.map(user => <div key={user.id}
                className="flex gap-2 mb-2">
                <p>{`${user.name} (${user.age})`}</p>
                <button className='border p-1'>{'Edit'}</button>
                <button className='border p-1'>{'Delete'}</button>
            </div>)}
        </div>}

        <Pagination currentPage={currentPage}
            onPageChange={setPage}
            totalPages={totalPages} />
    </div>
}
