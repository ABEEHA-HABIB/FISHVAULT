'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured yet. Please add your credentials to .env.local')
      setLoading(false)
      return
    }

    try {
      const supabase = getSupabaseClient()
      if (!supabase) {
        setError('Supabase client not available')
        setLoading(false)
        return
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      // Redirect to dashboard on success
      router.push('/dashboard')
    } catch {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md animate-fade-in-up">
      <Card className="border-[oklch(1_0_0/0.10)] bg-[oklch(0.16_0.035_330/0.8)] backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-[oklch(0.72_0.20_350)] to-[oklch(0.65_0.22_320)] flex items-center justify-center glow-pink">
            <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <CardTitle className="font-[family-name:var(--font-quicksand)] text-2xl font-bold">
            Welcome back! 💖
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to access your secure vault
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4 pt-4">
            {/* Show setup notice if Supabase not configured */}
            {!isSupabaseConfigured() && (
              <div className="p-3 rounded-lg bg-[oklch(0.75_0.18_80/0.15)] border border-[oklch(0.75_0.18_80/0.3)] text-sm text-[oklch(0.85_0.14_80)]">
                ⚠️ Demo mode - Supabase not configured. Add your credentials to <code className="font-mono bg-[oklch(0_0_0/0.2)] px-1 rounded">.env.local</code>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-lg bg-[oklch(0.65_0.25_25/0.15)] border border-[oklch(0.65_0.25_25/0.3)] text-sm text-[oklch(0.80_0.20_25)]">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-[oklch(0.12_0.03_330)] border-[oklch(1_0_0/0.10)] focus:border-[oklch(0.72_0.20_350)] focus:ring-[oklch(0.72_0.20_350/0.25)] placeholder:text-muted-foreground/50"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs text-[oklch(0.82_0.16_350)] hover:text-[oklch(0.88_0.14_350)] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 bg-[oklch(0.12_0.03_330)] border-[oklch(1_0_0/0.10)] focus:border-[oklch(0.72_0.20_350)] focus:ring-[oklch(0.72_0.20_350/0.25)] placeholder:text-muted-foreground/50"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-2">
            <Button 
              type="submit" 
              className="w-full h-11 text-base glow-pink"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" x2="3" y1="12" y2="12"/>
                  </svg>
                  Sign In
                </span>
              )}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Don&apos;t have an account?{' '}
              <Link 
                href="/signup" 
                className="text-[oklch(0.82_0.16_350)] hover:text-[oklch(0.88_0.14_350)] font-medium transition-colors"
              >
                Sign up ✨
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        By signing in, you agree to our{' '}
        <Link href="/terms" className="underline hover:text-foreground">Terms</Link>
        {' '}and{' '}
        <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>
      </p>
    </div>
  )
}
