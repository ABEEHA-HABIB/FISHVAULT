// ================================
// DATABASE TYPES FOR FISHVAULT
// ================================

export interface Profile {
  id: string
  encryption_salt: string
  created_at: string
}

export interface VaultItem {
  id: string
  user_id: string
  title: string
  encrypted_blob: string
  created_at: string
  updated_at: string
}

// Decrypted vault item (after client-side decryption)
export interface DecryptedVaultItem {
  id: string
  title: string
  username: string
  password: string
  website_url?: string
  notes?: string
  category?: string
  created_at: string
  updated_at: string
}

// For creating new vault items
export interface CreateVaultItemInput {
  title: string
  username: string
  password: string
  website_url?: string
  notes?: string
  category?: string
}

// User session info
export interface UserSession {
  id: string
  email: string
  encryptionSalt: string
}

// Database schema for Supabase
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
      }
      vault_items: {
        Row: VaultItem
        Insert: Omit<VaultItem, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<VaultItem, 'id' | 'user_id' | 'created_at'>>
      }
    }
  }
}



