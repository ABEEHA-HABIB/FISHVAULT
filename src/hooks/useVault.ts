'use client'

import { useState, useCallback } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { VaultItem, DecryptedVaultItem, CreateVaultItemInput } from '@/lib/supabase/types'

interface VaultState {
  items: VaultItem[]
  loading: boolean
  error: Error | null
}

export function useVault(userId: string | undefined) {
  const [state, setState] = useState<VaultState>({
    items: [],
    loading: false,
    error: null,
  })

  const supabase = getSupabaseClient()

  // Fetch all vault items for the user
  const fetchVaultItems = useCallback(async () => {
    if (!userId) return

    setState(prev => ({ ...prev, loading: true, error: null }))

    const { data, error } = await supabase
      .from('vault_items')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })

    if (error) {
      setState(prev => ({ ...prev, loading: false, error: error as unknown as Error }))
      return { error }
    }

    setState({
      items: data as VaultItem[],
      loading: false,
      error: null,
    })

    return { data }
  }, [userId, supabase])

  // Add a new vault item
  const addVaultItem = async (title: string, encryptedBlob: string) => {
    if (!userId) return { error: new Error('Not authenticated') }

    setState(prev => ({ ...prev, loading: true, error: null }))

    const { data, error } = await supabase
      .from('vault_items')
      .insert({
        user_id: userId,
        title,
        encrypted_blob: encryptedBlob,
      })
      .select()
      .single()

    if (error) {
      setState(prev => ({ ...prev, loading: false, error: error as unknown as Error }))
      return { error }
    }

    setState(prev => ({
      ...prev,
      items: [data as VaultItem, ...prev.items],
      loading: false,
    }))

    return { data }
  }

  // Update a vault item
  const updateVaultItem = async (id: string, title: string, encryptedBlob: string) => {
    if (!userId) return { error: new Error('Not authenticated') }

    setState(prev => ({ ...prev, loading: true, error: null }))

    const { data, error } = await supabase
      .from('vault_items')
      .update({
        title,
        encrypted_blob: encryptedBlob,
      })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      setState(prev => ({ ...prev, loading: false, error: error as unknown as Error }))
      return { error }
    }

    setState(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? data as VaultItem : item),
      loading: false,
    }))

    return { data }
  }

  // Delete a vault item
  const deleteVaultItem = async (id: string) => {
    if (!userId) return { error: new Error('Not authenticated') }

    setState(prev => ({ ...prev, loading: true, error: null }))

    const { error } = await supabase
      .from('vault_items')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)

    if (error) {
      setState(prev => ({ ...prev, loading: false, error: error as unknown as Error }))
      return { error }
    }

    setState(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
      loading: false,
    }))

    return { error: null }
  }

  // Search vault items by title
  const searchVaultItems = async (query: string) => {
    if (!userId) return { data: [] }

    const { data, error } = await supabase
      .from('vault_items')
      .select('*')
      .eq('user_id', userId)
      .ilike('title', `%${query}%`)
      .order('updated_at', { ascending: false })

    if (error) {
      return { error }
    }

    return { data: data as VaultItem[] }
  }

  return {
    items: state.items,
    loading: state.loading,
    error: state.error,
    fetchVaultItems,
    addVaultItem,
    updateVaultItem,
    deleteVaultItem,
    searchVaultItems,
  }
}

// Helper types for encryption/decryption workflow
export type { VaultItem, DecryptedVaultItem, CreateVaultItemInput }



