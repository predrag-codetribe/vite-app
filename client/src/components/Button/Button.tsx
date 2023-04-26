import { classNames } from '@/client/utils/classNames'
import { HTMLAttributes, ReactNode } from 'react'

/**
 * { function_description }
 *
 * @class      Button (name)
 * @param      {<type>}  children   The children
 * @param      {<type>}  className  The class name
 * @param      {Props}   rest       The rest
 */
type Props = {
    children: ReactNode
    className?: string
    color: 'red' | 'blue'
} & HTMLAttributes<HTMLButtonElement>
export function Button({ children, className, color, ...rest }: Props) {
    const cn = classNames(
        color === 'red' && 'bg-red-500',
        color === 'blue' && 'bg-blue-500',
        className)
    return <button {...rest}
        className={cn}>
        {children}
    </button>
}