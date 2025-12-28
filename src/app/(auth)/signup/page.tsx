'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Validate password strength
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

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

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      // Create profile with encryption salt if user was created
      if (data.user) {
        // Generate a random salt for encryption
        const saltArray = new Uint8Array(32)
        crypto.getRandomValues(saltArray)
        const encryptionSalt = Array.from(saltArray)
          .map(b => b.toString(16).padStart(2, '0'))
          .join('')

        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            encryption_salt: encryptionSalt,
          }, { onConflict: 'id' })

        if (profileError) {
          console.warn('Profile creation will happen on first login:', profileError.message)
          // Don't fail signup - profile can be created on first login
        }
      }

      // Show success message
      setSuccess(true)
      setLoading(false)
    } catch {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md animate-fade-in-up">
        <Card className="border-[oklch(1_0_0/0.10)] bg-[oklch(0.16_0.035_330/0.8)] backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-[oklch(0.72_0.19_160)] to-[oklch(0.65_0.20_140)] flex items-center justify-center glow-pink">
              <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </div>
            <CardTitle className="font-[family-name:var(--font-quicksand)] text-2xl font-bold">
              Check your email! 💌
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              We&apos;ve sent a confirmation link to <span className="text-[oklch(0.82_0.16_350)] font-medium">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-6">
            <p className="text-sm text-muted-foreground mb-4">
              Click the link in the email to verify your account and start using FishVault.
            </p>
            <Button 
              variant="outline" 
              onClick={() => router.push('/login')}
              className="border-[oklch(1_0_0/0.15)] hover:bg-[oklch(1_0_0/0.05)]"
            >
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md animate-fade-in-up">
      <Card className="border-[oklch(1_0_0/0.10)] bg-[oklch(0.16_0.035_330/0.8)] backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-[oklch(0.72_0.20_350)] to-[oklch(0.65_0.22_320)] flex items-center justify-center glow-pink animate-heart-beat">
            <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </div>
          <CardTitle className="font-[family-name:var(--font-quicksand)] text-2xl font-bold">
            Create your vault ✨
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Start protecting your passwords today
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSignup}>
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
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="h-11 bg-[oklch(0.12_0.03_330)] border-[oklch(1_0_0/0.10)] focus:border-[oklch(0.72_0.20_350)] focus:ring-[oklch(0.72_0.20_350/0.25)] placeholder:text-muted-foreground/50"
              />
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-11 bg-[oklch(0.12_0.03_330)] border-[oklch(1_0_0/0.10)] focus:border-[oklch(0.72_0.20_350)] focus:ring-[oklch(0.72_0.20_350/0.25)] placeholder:text-muted-foreground/50"
              />
            </div>

            {/* Password strength indicator */}
            {password && (
              <div className="space-y-1">
                <div className="flex gap-1">
                  <div className={`h-1 flex-1 rounded-full transition-colors ${password.length >= 8 ? 'bg-[oklch(0.72_0.19_160)]' : 'bg-[oklch(0.30_0.03_330)]'}`} />
                  <div className={`h-1 flex-1 rounded-full transition-colors ${password.length >= 12 ? 'bg-[oklch(0.72_0.19_160)]' : 'bg-[oklch(0.30_0.03_330)]'}`} />
                  <div className={`h-1 flex-1 rounded-full transition-colors ${/[A-Z]/.test(password) && /[0-9]/.test(password) ? 'bg-[oklch(0.72_0.19_160)]' : 'bg-[oklch(0.30_0.03_330)]'}`} />
                  <div className={`h-1 flex-1 rounded-full transition-colors ${/[^A-Za-z0-9]/.test(password) ? 'bg-[oklch(0.72_0.19_160)]' : 'bg-[oklch(0.30_0.03_330)]'}`} />
                </div>
                <p className="text-xs text-muted-foreground">
                  {password.length < 8 && 'Too short'}
                  {password.length >= 8 && password.length < 12 && 'Good'}
                  {password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && 'Strong 💪'}
                </p>
              </div>
            )}
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
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                  Create Account
                </span>
              )}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="text-[oklch(0.82_0.16_350)] hover:text-[oklch(0.88_0.14_350)] font-medium transition-colors"
              >
                Sign in 💖
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        By signing up, you agree to our{' '}
        <Link href="/terms" className="underline hover:text-foreground">Terms</Link>
        {' '}and{' '}
        <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>
      </p>
    </div>
  )
}
