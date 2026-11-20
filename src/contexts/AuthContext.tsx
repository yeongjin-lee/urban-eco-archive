import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextValue {
  user: User | null
  loading: boolean
  isConfigured: boolean
  signIn: (email: string, password: string) => Promise<string | null>
  signUp: (
    email: string,
    password: string,
    nickname: string,
    locationConsent: boolean,
  ) => Promise<string | null>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(Boolean(supabase))

  useEffect(() => {
    if (!supabase) return

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      },
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!supabase) return 'Supabase 환경변수가 아직 연결되지 않았습니다.'
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return error ? error.message : null
  }

  const signUp = async (
    email: string,
    password: string,
    nickname: string,
    locationConsent: boolean,
  ) => {
    if (!supabase) return 'Supabase 환경변수가 아직 연결되지 않았습니다.'
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nickname } },
    })
    if (error) return error.message

    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        nickname,
        email,
        location_consent: locationConsent,
      })
    }
    return null
  }

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured: Boolean(supabase),
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
