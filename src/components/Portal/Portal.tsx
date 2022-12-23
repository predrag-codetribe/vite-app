import { useState, useLayoutEffect, ReactNode } from 'react'
import { createPortal } from 'react-dom'

type Props = {
    children: ReactNode
    id: string
}
export function Portal({
    children,
    id,
}: Props) {
    const [ wrapperElement, setWrapperElement ] = useState<HTMLDivElement | null>(
        null
    )
    useLayoutEffect(() => {
        setWrapperElement(createWrapperAndAppendToBody(id))
        return () => {
            createWrapperAndAppendToBody(id)?.remove()
        }
    }, [id])
    return wrapperElement ? createPortal(children, wrapperElement) : null
}

function createWrapperAndAppendToBody(wrapperId: string) {
    if (document.getElementById(wrapperId)) return document.getElementById(wrapperId) as HTMLDivElement
    const wrapperElement = document.createElement('div')
    wrapperElement.setAttribute('id', wrapperId)
    document.body.appendChild(wrapperElement)
    return wrapperElement
}
