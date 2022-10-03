import { generatePath, Navigate, useParams } from 'react-router-dom'

type RedirectProps = {
  to: string,
  keepSearchParams?: boolean
}
export function Redirect ({
    to,
    keepSearchParams = false
}: RedirectProps) {
    const params = useParams()

    let generatedPath = generatePath(to, params)

    if (keepSearchParams) {
        const searchParams = window.location.search
        generatedPath += searchParams
    }

    return <Navigate replace
        to={generatedPath} />
}
