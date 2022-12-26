type Props = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    className?:string
}
export function Pagination({ currentPage, totalPages, onPageChange, className }:Props) {

    const goToNextPage = () => {
        const nextPage = currentPage + 1
        if (nextPage <= totalPages) onPageChange(nextPage)
    }

    const goToPrevPage = () => {
        const prevPage = currentPage - 1
        if (prevPage > 0) onPageChange(prevPage)
    }

    // don't show pagination if there are less then 2 pages
    if (totalPages < 2) return <></>

    return <div className={className}>
        <section className="flex items-center gap-2">
            <button className="border border-red-50"
                onClick={goToPrevPage}>
                {'<'}
            </button>

            <span className="uppercase flex text-xs">
                {currentPage} {'-'} {totalPages}
            </span>

            <button className="border border-red-50"
                onClick={goToNextPage}>
                {'>'}
            </button>
        </section>
    </div>
}
