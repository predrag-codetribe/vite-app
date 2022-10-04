import { GetUserResponse } from '@/http/apis/useExampleApi'
import { createContext, useState, ReactNode, useContext } from 'react'

type Context = {
    user: GetUserResponse | null,
    setUser: (user: GetUserResponse | null) => void
}

const AuthContext = createContext<Context | undefined>(undefined)

export function useAuthContext() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('Component is outside of the <AuthProvider />')
    return context
}

type Props = {
    children: ReactNode
}
export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<GetUserResponse | null>(null)

    return <AuthContext.Provider value={{ user, setUser }}>
        {children}
    </AuthContext.Provider>
}