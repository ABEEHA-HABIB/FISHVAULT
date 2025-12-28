'use client'

import { useEffect, useState, useCallback } from 'react'
import { User, AuthError, type AuthChangeEvent, type Session } from '@supabase/supabase-js'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { Profile } from '@/lib/supabase/types'

interface AuthState {
  user: User | null
  profile: Profile | null
  loading: boolean
  error: AuthError | Error | null
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null,
  })

  const supabase = getSupabaseClient()

  // Fetch user profile (contains encryption_salt)
  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }
    return data as Profile
  }, [supabase])

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error) throw error

        let profile = null
        if (user) {
          profile = await fetchProfile(user.id)
        }

        setState({
          user,
          profile,
          loading: false,
          error: null,
        })
      } catch (error) {
        setState({
          user: null,
          profile: null,
          loading: false,
          error: error as AuthError,
        })
      }
    }

    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        const user = session?.user ?? null
        let profile = null

        if (user) {
          profile = await fetchProfile(user.id)
        }

        setState(prev => ({
          ...prev,
          user,
          profile,
          loading: false,
        }))
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, fetchProfile])

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setState(prev => ({ ...prev, loading: false, error }))
      return { error }
    }

    return { data }
  }

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setState(prev => ({ ...prev, loading: false, error }))
      return { error }
    }

    return { data }
  }

  // Sign out
  const signOut = async () => {
    setState(prev => ({ ...prev, loading: true }))
    
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      setState(prev => ({ ...prev, loading: false, error }))
      return { error }
    }

    setState({
      user: null,
      profile: null,
      loading: false,
      error: null,
    })

    return { error: null }
  }

  return {
    user: state.user,
    profile: state.profile,
    loading: state.loading,
    error: state.error,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!state.user,
  }
}

