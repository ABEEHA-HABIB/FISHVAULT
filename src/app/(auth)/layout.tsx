import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient background effects */}
      <div className="fixed inset-0 sparkle-grid opacity-60" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.20_350/0.15)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,oklch(0.75_0.15_300/0.10)_0%,transparent_70%)]" />
      </div>

      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-[20%] w-48 h-48 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.20_350/0.10)_0%,transparent_70%)] animate-float" />
        <div className="absolute bottom-[20%] left-[10%] w-32 h-32 rounded-full bg-[radial-gradient(circle,oklch(0.75_0.15_300/0.08)_0%,transparent_70%)] animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[oklch(0.72_0.20_350)] to-[oklch(0.65_0.22_320)] flex items-center justify-center glow-pink group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6-3.56 0-7.56-2.53-8.5-6Z"/>
              <path d="M18 12v.5"/>
              <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/>
              <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5 .23 6.5C6.11 18.03 7 16 7 13.33"/>
            </svg>
          </div>
          <span className="font-[family-name:var(--font-quicksand)] text-xl font-bold tracking-tight">
            FishVault
          </span>
        </Link>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex items-center justify-center px-6 py-12 min-h-[calc(100vh-100px)]">
        {children}
      </main>
    </div>
  )
}



