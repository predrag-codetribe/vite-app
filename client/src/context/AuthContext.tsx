import { createContext, useState, ReactNode, useContext } from 'react'

type User = unknown

type Context = {
    me: User | null,
    setMe: (user: User | null) => void
}

const AuthContext = createContext<Context | undefined>(undefined)

/**
 * Gives info about the currently logged in user.
 */
export function useMe() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('Component is outside of the <AuthProvider />')
    return context
}

type Props = {
    children: ReactNode
}
export const AuthProvider = ({ children }: Props) => {
    const [ me, setMe ] = useState<User | null>(null)

    return <AuthContext.Provider value={{ me, setMe }}>
        {children}
    </AuthContext.Provider>
}
