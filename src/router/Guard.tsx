import { ReactElement, Suspense } from 'react'

type Props = {
  element: ReactElement
}

export const Guard = ({
    element
}: Props) => {
    // TODO add auth validation based on app logic
    return <Suspense fallback={<>...</>}>{element}</Suspense>
}
