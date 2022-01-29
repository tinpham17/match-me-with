import { useState, createContext, ReactNode, useContext } from 'react'
import { config } from 'config'
import { User } from 'types/user'
import { login as signIn } from 'services/user'

type ContextProps = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

type ProviderProps = {
  children: ReactNode
}

function initUser() {
  const cache = localStorage.getItem(config.localStorage.userKey)
  if (cache) {
    try {
      return JSON.parse(cache) as User
    } catch(e) {
      return null
    }
  }
  return null
}

const AuthContext = createContext({} as ContextProps)

const AuthProvider = (props: ProviderProps) => {
  const [ user, setUser ] = useState<User | null>(initUser())

  const login = async (email: string, password: string) => {
    const result = await signIn({ email, password })
    setUser(result)
    localStorage.setItem(config.localStorage.userKey, JSON.stringify(result))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(config.localStorage.userKey)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }
