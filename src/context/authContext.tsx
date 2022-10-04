import { createContext, useState, ReactNode, useContext } from 'react'

type User = unknown

type Context = {
  user: User | null,
  setUser: (user: User | null) => void
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
    const [user, setUser] = useState<User | null>(null)

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}