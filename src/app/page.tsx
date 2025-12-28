import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient background effects */}
      <div className="fixed inset-0 sparkle-grid opacity-60" />
      <div className="fixed inset-0 pointer-events-none">
        {/* Top glow - Pink */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.20_350/0.15)_0%,transparent_70%)]" />
        {/* Bottom accent glow - Lavender */}
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,oklch(0.75_0.15_300/0.10)_0%,transparent_70%)]" />
        {/* Right accent - Rose */}
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.16_340/0.08)_0%,transparent_70%)]" />
      </div>

      {/* Floating orbs decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-[15%] w-64 h-64 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.20_350/0.12)_0%,transparent_70%)] animate-float" />
        <div className="absolute top-[60%] left-[10%] w-48 h-48 rounded-full bg-[radial-gradient(circle,oklch(0.75_0.15_300/0.10)_0%,transparent_70%)] animate-float" style={{ animationDelay: '-2s' }} />
        <div className="absolute top-[30%] left-[5%] w-32 h-32 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.16_340/0.08)_0%,transparent_70%)] animate-float" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/5 backdrop-blur-xl bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[oklch(0.72_0.20_350)] to-[oklch(0.65_0.22_320)] flex items-center justify-center glow-pink">
              <FishIcon className="w-6 h-6 text-white" />
            </div>
            <span className="font-[family-name:var(--font-quicksand)] text-xl font-bold tracking-tight">
              FishVault
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Security</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          </div>
          
          <div className="flex items-center gap-3">
            <a href="/login">
              <Button variant="ghost" className="text-sm">
                Sign In
              </Button>
            </a>
            <a href="/signup">
              <Button className="text-sm glow-pink">
                Get Started ✨
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.72_0.20_350/0.3)] bg-[oklch(0.72_0.20_350/0.10)] mb-8 animate-fade-in-up opacity-0">
              <SparkleIcon className="w-4 h-4 text-[oklch(0.72_0.20_350)]" />
              <span className="text-sm font-medium text-[oklch(0.82_0.16_350)]">
                Zero-Knowledge Architecture
              </span>
            </div>
            
            {/* Headline */}
            <h1 className="font-[family-name:var(--font-quicksand)] text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up opacity-0 stagger-1">
              Your secrets.{" "}
              <span className="text-gradient-pink">
                Encrypted locally.
              </span>
              <br />
              Stored securely. 💖
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up opacity-0 stagger-2">
              FishVault uses military-grade Twofish encryption to protect your passwords. 
              We never see your data—encryption happens entirely in your browser.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 stagger-3">
              <a href="/signup">
                <Button size="lg" className="text-base px-8 h-12 glow-pink-lg">
                  <HeartIcon className="w-5 h-5 mr-2" />
                  Create Your Vault
                </Button>
              </a>
              <Button size="lg" variant="outline" className="text-base px-8 h-12 border-[oklch(1_0_0/0.15)] hover:bg-[oklch(1_0_0/0.05)]">
                <PlayIcon className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust badges */}
            <div className="flex items-center justify-center gap-8 mt-12 animate-fade-in-up opacity-0 stagger-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckIcon className="w-5 h-5 text-[oklch(0.75_0.15_300)]" />
                <span className="text-sm">Open Source</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckIcon className="w-5 h-5 text-[oklch(0.75_0.15_300)]" />
                <span className="text-sm">No Tracking</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckIcon className="w-5 h-5 text-[oklch(0.75_0.15_300)]" />
                <span className="text-sm">256-bit Encryption</span>
              </div>
            </div>
          </div>
          
          {/* Hero Visual - Vault Preview */}
          <div className="relative mt-20 max-w-5xl mx-auto animate-fade-in-up opacity-0 stagger-5">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="relative rounded-2xl border border-[oklch(1_0_0/0.12)] overflow-hidden glass-strong shadow-2xl">
              {/* Mock app header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[oklch(1_0_0/0.08)] bg-[oklch(0.14_0.03_330/0.9)]">
                <div className="w-3 h-3 rounded-full bg-[oklch(0.72_0.20_350)]" />
                <div className="w-3 h-3 rounded-full bg-[oklch(0.78_0.16_340)]" />
                <div className="w-3 h-3 rounded-full bg-[oklch(0.75_0.15_300)]" />
                <div className="ml-4 flex-1 text-center">
                  <span className="text-xs text-muted-foreground">vault.fishvault.app</span>
                </div>
              </div>
              
              {/* Mock vault content */}
              <div className="p-6 bg-gradient-to-b from-[oklch(0.16_0.035_330)] to-[oklch(0.14_0.03_330)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <VaultItemPreview 
                    icon="🌸" 
                    title="GitHub" 
                    username="jane.doe@email.com"
                    category="Development"
                  />
                  <VaultItemPreview 
                    icon="💌" 
                    title="Gmail" 
                    username="jane.doe@gmail.com"
                    category="Email"
                  />
                  <VaultItemPreview 
                    icon="💳" 
                    title="Stripe Dashboard" 
                    username="jane@company.io"
                    category="Finance"
                  />
                  <VaultItemPreview 
                    icon="☁️" 
                    title="AWS Console" 
                    username="admin@company.io"
                    category="Cloud"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-quicksand)] text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Security without{" "}
              <span className="text-gradient-pink">compromise</span> ✨
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every feature is designed with your privacy at its core. 
              We&apos;ve built FishVault so that even we can&apos;t access your data.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<TwofishIcon />}
              title="Twofish Encryption"
              description="Industry-proven 256-bit symmetric key encryption. The same algorithm trusted by security experts worldwide."
            />
            <FeatureCard 
              icon={<KeyIcon />}
              title="PBKDF2 Key Derivation"
              description="100,000 iterations of PBKDF2-HMAC-SHA256 make brute-force attacks computationally infeasible."
            />
            <FeatureCard 
              icon={<BrowserIcon />}
              title="Client-Side Only"
              description="All encryption and decryption happens in your browser. Your master password never leaves your device."
            />
            <FeatureCard 
              icon={<ClockIcon />}
              title="Auto-Lock"
              description="Automatic session timeout wipes encryption keys from memory after 15 minutes of inactivity."
            />
            <FeatureCard 
              icon={<ClipboardIcon />}
              title="Secure Clipboard"
              description="Copied passwords are automatically cleared from your clipboard after 30 seconds."
            />
            <FeatureCard 
              icon={<WandIcon />}
              title="Password Generator"
              description="Create cryptographically random passwords with customizable length and character sets."
            />
          </div>
        </div>
      </section>

      {/* Security Architecture Section */}
      <section id="security" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(0.75_0.15_300/0.3)] bg-[oklch(0.75_0.15_300/0.10)] mb-6">
                <span className="text-xs font-semibold text-[oklch(0.82_0.12_300)] uppercase tracking-wider">
                  Zero Knowledge
                </span>
              </div>
              
              <h2 className="font-[family-name:var(--font-quicksand)] text-3xl md:text-5xl font-bold tracking-tight mb-6">
                We can&apos;t see your data.{" "}
                <span className="text-[oklch(0.75_0.15_300)]">By design.</span> 💜
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                FishVault&apos;s zero-knowledge architecture means your master password and encryption keys 
                never touch our servers. Even if our database were compromised, attackers would 
                only find meaningless encrypted blobs.
              </p>
              
              <div className="space-y-4">
                <SecurityPoint 
                  title="Master Password"
                  description="Used only in your browser to derive the encryption key"
                  status="local"
                />
                <SecurityPoint 
                  title="Encryption Key"
                  description="256-bit key generated via PBKDF2, stored only in memory"
                  status="local"
                />
                <SecurityPoint 
                  title="Vault Items"
                  description="Encrypted before leaving your device, stored as ciphertext"
                  status="encrypted"
                />
              </div>
            </div>
            
            {/* Architecture Diagram */}
            <div className="relative">
              <div className="glass rounded-2xl p-8 border border-[oklch(1_0_0/0.10)]">
                <div className="space-y-6">
                  {/* Your Device */}
                  <div className="p-4 rounded-xl bg-[oklch(0.75_0.15_300/0.12)] border border-[oklch(0.75_0.15_300/0.25)]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[oklch(0.75_0.15_300/0.25)] flex items-center justify-center">
                        <DeviceIcon className="w-5 h-5 text-[oklch(0.82_0.12_300)]" />
                      </div>
                      <span className="font-semibold text-[oklch(0.82_0.12_300)]">Your Device 💻</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="px-3 py-2 rounded-lg bg-[oklch(0.12_0.03_330)] text-muted-foreground">
                        Master Password
                      </div>
                      <div className="px-3 py-2 rounded-lg bg-[oklch(0.12_0.03_330)] text-muted-foreground">
                        Encryption Key
                      </div>
                      <div className="px-3 py-2 rounded-lg bg-[oklch(0.12_0.03_330)] text-muted-foreground">
                        Decrypted Data
                      </div>
                      <div className="px-3 py-2 rounded-lg bg-[oklch(0.12_0.03_330)] text-muted-foreground">
                        Twofish Engine
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-0.5 h-8 bg-gradient-to-b from-[oklch(0.75_0.15_300/0.5)] to-[oklch(0.72_0.20_350/0.5)]" />
                      <div className="px-3 py-1 rounded-full bg-[oklch(0.22_0.04_330)] border border-[oklch(1_0_0/0.1)] text-xs text-muted-foreground">
                        Encrypted Only 🔒
                      </div>
                      <div className="w-0.5 h-8 bg-gradient-to-b from-[oklch(0.72_0.20_350/0.5)] to-[oklch(0.72_0.20_350/0.3)]" />
                    </div>
                  </div>
                  
                  {/* Server */}
                  <div className="p-4 rounded-xl bg-[oklch(0.72_0.20_350/0.12)] border border-[oklch(0.72_0.20_350/0.25)]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[oklch(0.72_0.20_350/0.25)] flex items-center justify-center">
                        <ServerIcon className="w-5 h-5 text-[oklch(0.82_0.16_350)]" />
                      </div>
                      <span className="font-semibold text-[oklch(0.82_0.16_350)]">Supabase Server ☁️</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="px-3 py-2 rounded-lg bg-[oklch(0.12_0.03_330)] text-muted-foreground">
                        Encrypted Blob
                      </div>
                      <div className="px-3 py-2 rounded-lg bg-[oklch(0.12_0.03_330)] text-muted-foreground">
                        User Auth (JWT)
                      </div>
                      <div className="px-3 py-2 rounded-lg bg-[oklch(0.12_0.03_330)] text-muted-foreground col-span-2">
                        Encryption Salt (for PBKDF2)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden border-[oklch(0.72_0.20_350/0.25)] bg-gradient-to-br from-[oklch(0.20_0.05_340/0.6)] to-[oklch(0.14_0.03_330/0.6)] p-12 text-center">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.20_350/0.12)_0%,transparent_70%)]" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[oklch(0.72_0.20_350)] to-[oklch(0.65_0.22_320)] flex items-center justify-center glow-pink-lg animate-heart-beat">
                <FishIcon className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="font-[family-name:var(--font-quicksand)] text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Ready to secure your digital life? 💖
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                Join thousands who trust FishVault with their most sensitive credentials. 
                Set up takes less than 2 minutes.
              </p>
              
              <a href="/signup">
                <Button size="lg" className="text-base px-10 h-14 glow-pink-lg">
                  <HeartIcon className="w-5 h-5 mr-2" />
                  Create Free Account
                </Button>
              </a>
              
              <p className="mt-6 text-sm text-muted-foreground">
                No credit card required • Free forever for personal use ✨
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[oklch(1_0_0/0.08)] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[oklch(0.72_0.20_350)] to-[oklch(0.65_0.22_320)] flex items-center justify-center">
                <FishIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-[family-name:var(--font-quicksand)] font-bold">FishVault</span>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="hover:text-foreground transition-colors">Discord</a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2025 FishVault. Made with 💖 by <span className="font-semibold text-[oklch(0.82_0.16_350)]">ABEEHA HABIB</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ===== Component Helpers =====

function VaultItemPreview({ 
  icon, 
  title, 
  username, 
  category 
}: { 
  icon: string; 
  title: string; 
  username: string; 
  category: string;
}) {
  return (
    <div className="group flex items-center gap-4 p-4 rounded-xl bg-[oklch(0.18_0.04_330)] border border-[oklch(1_0_0/0.08)] hover:border-[oklch(0.72_0.20_350/0.35)] transition-all duration-300 hover:shadow-lg">
      <div className="w-10 h-10 rounded-lg bg-[oklch(0.24_0.04_330)] flex items-center justify-center text-xl">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium truncate">{title}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[oklch(0.72_0.20_350/0.15)] text-[oklch(0.82_0.16_350)] uppercase tracking-wider font-medium">
            {category}
          </span>
        </div>
        <span className="text-sm text-muted-foreground font-mono truncate block">{username}</span>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-8 h-8 rounded-lg bg-[oklch(0.72_0.20_350/0.15)] flex items-center justify-center text-[oklch(0.82_0.16_350)]">
          <CopyIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) {
  return (
    <Card className="group p-6 bg-[oklch(0.18_0.04_330/0.5)] border-[oklch(1_0_0/0.08)] hover:border-[oklch(0.72_0.20_350/0.35)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="w-12 h-12 rounded-xl bg-[oklch(0.72_0.20_350/0.12)] border border-[oklch(0.72_0.20_350/0.25)] flex items-center justify-center mb-4 group-hover:glow-pink transition-shadow duration-300">
        <div className="text-[oklch(0.82_0.16_350)]">
          {icon}
        </div>
      </div>
      <h3 className="font-[family-name:var(--font-quicksand)] text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  );
}

function SecurityPoint({ 
  title, 
  description, 
  status 
}: { 
  title: string; 
  description: string; 
  status: 'local' | 'encrypted'; 
}) {
  return (
    <div className="flex items-start gap-3">
      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
        status === 'local' 
          ? 'bg-[oklch(0.75_0.15_300/0.2)] text-[oklch(0.82_0.12_300)]' 
          : 'bg-[oklch(0.72_0.20_350/0.2)] text-[oklch(0.82_0.16_350)]'
      }`}>
        {status === 'local' ? <DeviceIcon className="w-3 h-3" /> : <LockIcon className="w-3 h-3" />}
      </div>
      <div>
        <span className="font-medium">{title}</span>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

// ===== Icons =====

function FishIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6-3.56 0-7.56-2.53-8.5-6Z"/>
      <path d="M18 12v.5"/>
      <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/>
      <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5 .23 6.5C6.11 18.03 7 16 7 13.33"/>
      <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3l-1.5 2"/>
      <path d="M16.5 19l1.5 2c-1.17-1.24-2.2-2.88-2.46-4.26"/>
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="6 3 20 12 6 21 6 3"/>
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
  );
}

function TwofishIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2"/>
      <path d="M8 12h8"/>
      <path d="M12 8v8"/>
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/>
      <path d="m21 2-9.6 9.6"/>
      <circle cx="7.5" cy="15.5" r="5.5"/>
    </svg>
  );
}

function BrowserIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="M2 8h20"/>
      <path d="M6 8v10"/>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    </svg>
  );
}

function WandIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 4V2"/>
      <path d="M15 16v-2"/>
      <path d="M8 9h2"/>
      <path d="M20 9h2"/>
      <path d="M17.8 11.8 19 13"/>
      <path d="M15 9h.01"/>
      <path d="M17.8 6.2 19 5"/>
      <path d="m3 21 9-9"/>
      <path d="M12.2 6.2 11 5"/>
    </svg>
  );
}

function DeviceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
      <path d="M12 18h.01"/>
    </svg>
  );
}

function ServerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
      <line x1="6" x2="6.01" y1="6" y2="6"/>
      <line x1="6" x2="6.01" y1="18" y2="18"/>
    </svg>
  );
}
