'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface VaultItem {
  id: string
  title: string
  username: string
  password: string
  website?: string
  category: string
  createdAt: Date
}

// Demo vault items for display
const demoVaultItems: VaultItem[] = []

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [vaultItems, setVaultItems] = useState<VaultItem[]>(demoVaultItems)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newItem, setNewItem] = useState({ title: '', username: '', password: '', website: '', category: 'Login' })
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set())
  const router = useRouter()
  const supabase = getSupabaseClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [router, supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handleAddItem = () => {
    if (!newItem.title || !newItem.password) return
    
    const item: VaultItem = {
      id: crypto.randomUUID(),
      title: newItem.title,
      username: newItem.username,
      password: newItem.password,
      website: newItem.website,
      category: newItem.category,
      createdAt: new Date()
    }
    
    setVaultItems([item, ...vaultItems])
    setNewItem({ title: '', username: '', password: '', website: '', category: 'Login' })
    setShowAddModal(false)
  }

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const togglePasswordVisibility = (id: string) => {
    const newVisible = new Set(visiblePasswords)
    if (newVisible.has(id)) {
      newVisible.delete(id)
    } else {
      newVisible.add(id)
    }
    setVisiblePasswords(newVisible)
  }

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let password = ''
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewItem({ ...newItem, password })
  }

  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      'Login': '🔐',
      'Email': '📧',
      'Social': '💬',
      'Finance': '💳',
      'Work': '💼',
      'Shopping': '🛒',
      'Entertainment': '🎮',
      'Other': '📁'
    }
    return emojis[category] || '📁'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[oklch(0.72_0.20_350)] to-[oklch(0.65_0.22_320)] flex items-center justify-center glow-pink animate-pulse">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
            </svg>
          </div>
          <p className="text-muted-foreground">Loading your vault...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background effects */}
      <div className="fixed inset-0 sparkle-grid opacity-40" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.20_350/0.10)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,oklch(0.75_0.15_300/0.08)_0%,transparent_70%)]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-[oklch(1_0_0/0.08)] bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[oklch(0.72_0.20_350)] to-[oklch(0.65_0.22_320)] flex items-center justify-center glow-pink">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
              </svg>
            </div>
            <span className="font-[family-name:var(--font-quicksand)] text-xl font-bold">
              FishVault
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[oklch(0.72_0.19_160/0.15)] border border-[oklch(0.72_0.19_160/0.25)]">
              <div className="w-2 h-2 rounded-full bg-[oklch(0.72_0.19_160)] animate-pulse" />
              <span className="text-xs text-[oklch(0.80_0.15_160)]">Vault Secured</span>
            </div>
            <span className="text-sm text-muted-foreground hidden md:block">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="border-[oklch(1_0_0/0.15)]">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        {/* Welcome section */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="font-[family-name:var(--font-quicksand)] text-3xl font-bold mb-2">
            Welcome back! 💖
          </h1>
          <p className="text-muted-foreground">
            Your vault is secure and ready. {vaultItems.length} passwords stored safely.
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-[oklch(1_0_0/0.08)] bg-[oklch(0.16_0.035_330/0.6)] p-5 animate-fade-in-up stagger-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.72_0.20_350/0.15)] flex items-center justify-center">
                <svg className="w-6 h-6 text-[oklch(0.82_0.16_350)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="18" height="11" x="3" y="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold">{vaultItems.length}</p>
                <p className="text-sm text-muted-foreground">Passwords</p>
              </div>
            </div>
          </Card>

          <Card className="border-[oklch(1_0_0/0.08)] bg-[oklch(0.16_0.035_330/0.6)] p-5 animate-fade-in-up stagger-2">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.75_0.15_300/0.15)] flex items-center justify-center">
                <svg className="w-6 h-6 text-[oklch(0.82_0.12_300)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-sm text-muted-foreground">Secure</p>
              </div>
            </div>
          </Card>

          <Card className="border-[oklch(1_0_0/0.08)] bg-[oklch(0.16_0.035_330/0.6)] p-5 animate-fade-in-up stagger-3">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.72_0.19_160/0.15)] flex items-center justify-center">
                <svg className="w-6 h-6 text-[oklch(0.80_0.15_160)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold">256-bit</p>
                <p className="text-sm text-muted-foreground">Encryption</p>
              </div>
            </div>
          </Card>

          <Card className="border-[oklch(1_0_0/0.08)] bg-[oklch(0.16_0.035_330/0.6)] p-5 animate-fade-in-up stagger-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.75_0.18_80/0.15)] flex items-center justify-center">
                <svg className="w-6 h-6 text-[oklch(0.82_0.14_80)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold">15 min</p>
                <p className="text-sm text-muted-foreground">Auto-lock</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Add password button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-[family-name:var(--font-quicksand)] text-xl font-semibold">
            Your Passwords ✨
          </h2>
          <Button onClick={() => setShowAddModal(true)} className="glow-pink">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Add Password
          </Button>
        </div>

        {/* Vault items */}
        {vaultItems.length === 0 ? (
          <Card className="border-[oklch(1_0_0/0.10)] bg-[oklch(0.16_0.035_330/0.6)] p-12 text-center animate-fade-in-up">
            <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-[oklch(0.72_0.20_350/0.15)] border border-[oklch(0.72_0.20_350/0.25)] flex items-center justify-center">
              <svg className="w-10 h-10 text-[oklch(0.82_0.16_350)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h3 className="font-[family-name:var(--font-quicksand)] text-xl font-semibold mb-2">
              Your vault is empty ✨
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start adding your passwords and credentials to keep them safe and secure with Twofish encryption.
            </p>
            <Button onClick={() => setShowAddModal(true)} className="glow-pink">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Add First Password
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4">
            {vaultItems.map((item, index) => (
              <Card 
                key={item.id} 
                className="border-[oklch(1_0_0/0.08)] bg-[oklch(0.16_0.035_330/0.6)] p-5 hover:bg-[oklch(0.18_0.04_330/0.7)] transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.72_0.20_350/0.15)] flex items-center justify-center text-2xl">
                    {getCategoryEmoji(item.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{item.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[oklch(0.72_0.20_350/0.15)] text-[oklch(0.82_0.16_350)]">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{item.username}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => togglePasswordVisibility(item.id)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {visiblePasswords.has(item.id) ? (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCopy(item.password, item.id)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {copiedId === item.id ? (
                        <svg className="w-4 h-4 text-[oklch(0.72_0.19_160)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                      )}
                    </Button>
                  </div>
                </div>
                {visiblePasswords.has(item.id) && (
                  <div className="mt-3 pt-3 border-t border-[oklch(1_0_0/0.08)]">
                    <p className="text-sm font-mono bg-[oklch(0.12_0.03_330)] px-3 py-2 rounded-lg">
                      {item.password}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[oklch(1_0_0/0.08)] bg-background/60 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[oklch(0.72_0.20_350)] to-[oklch(0.65_0.22_320)] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                </svg>
              </div>
              <span className="font-[family-name:var(--font-quicksand)] font-semibold">FishVault</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <svg className="w-4 h-4 text-[oklch(0.72_0.20_350)] animate-heart-beat" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
              <span>by</span>
              <span className="font-semibold text-[oklch(0.82_0.16_350)]">ABEEHA HABIB</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2025 FishVault. Zero-Knowledge Security ✨
            </p>
          </div>
        </div>
      </footer>

      {/* Add Password Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <Card className="relative z-10 w-full max-w-md border-[oklch(1_0_0/0.10)] bg-[oklch(0.16_0.035_330/0.95)] backdrop-blur-xl p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-quicksand)] text-xl font-bold">
                Add New Password 🔐
              </h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Gmail, Netflix"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="mt-1.5 bg-[oklch(0.12_0.03_330)] border-[oklch(1_0_0/0.10)]"
                />
              </div>

              <div>
                <Label htmlFor="username">Username / Email</Label>
                <Input
                  id="username"
                  placeholder="your@email.com"
                  value={newItem.username}
                  onChange={(e) => setNewItem({ ...newItem, username: e.target.value })}
                  className="mt-1.5 bg-[oklch(0.12_0.03_330)] border-[oklch(1_0_0/0.10)]"
                />
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    id="password"
                    type="text"
                    placeholder="Enter or generate password"
                    value={newItem.password}
                    onChange={(e) => setNewItem({ ...newItem, password: e.target.value })}
                    className="bg-[oklch(0.12_0.03_330)] border-[oklch(1_0_0/0.10)]"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={generatePassword}
                    className="border-[oklch(1_0_0/0.15)] shrink-0"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
                      <path d="M21 3v5h-5"/>
                    </svg>
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  placeholder="https://example.com"
                  value={newItem.website}
                  onChange={(e) => setNewItem({ ...newItem, website: e.target.value })}
                  className="mt-1.5 bg-[oklch(0.12_0.03_330)] border-[oklch(1_0_0/0.10)]"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="mt-1.5 w-full h-10 px-3 rounded-md bg-[oklch(0.12_0.03_330)] border border-[oklch(1_0_0/0.10)] text-foreground"
                >
                  <option value="Login">🔐 Login</option>
                  <option value="Email">📧 Email</option>
                  <option value="Social">💬 Social</option>
                  <option value="Finance">💳 Finance</option>
                  <option value="Work">💼 Work</option>
                  <option value="Shopping">🛒 Shopping</option>
                  <option value="Entertainment">🎮 Entertainment</option>
                  <option value="Other">📁 Other</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 border-[oklch(1_0_0/0.15)]"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddItem}
                  className="flex-1 glow-pink"
                  disabled={!newItem.title || !newItem.password}
                >
                  Save Password 💖
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
