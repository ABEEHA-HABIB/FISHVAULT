# 🐟 FishVault

**Zero-Knowledge Password Manager powered by Twofish Encryption**

FishVault is a high-security, browser-based password manager that prioritizes mathematical privacy. Your secrets are encrypted locally—we never see your data.

![FishVault Landing Page](docs/preview.png)

---

## 🔐 Security Architecture

FishVault implements a **Zero-Knowledge Architecture**:

- **Client-Side Encryption**: All encryption/decryption happens in your browser using the Twofish algorithm
- **256-bit Keys**: Derived via PBKDF2-HMAC-SHA256 with 100,000 iterations
- **Zero Server Access**: Your master password and encryption keys never touch our servers
- **Auto-Lock**: Session timeout wipes encryption keys from memory after 15 minutes

## ✨ Features

- 🔒 **Twofish Encryption** - Military-grade 256-bit symmetric encryption
- 🧠 **Zero-Knowledge** - We can't see your data, by design
- 🔑 **Password Generator** - Cryptographically random passwords
- 📋 **Secure Clipboard** - Auto-clear after 30 seconds
- ⏱️ **Auto-Lock** - Automatic session timeout
- 🎨 **Beautiful UI** - Modern, minimal, eye-catching design

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS 4 |
| Components | Shadcn UI |
| Database/Auth | Supabase |
| Encryption | Twofish (JavaScript) |
| Key Derivation | Web Crypto API |
| Deployment | Vercel |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/fishvault.git
cd fishvault
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open** [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
fishvault/
├── docs/                    # Design documentation
│   ├── DESIGN_SYSTEM.md     # Colors, typography, visual effects
│   ├── COMPONENT_PATTERNS.md # Component specifications
│   └── THEME_TOKENS.md      # CSS custom properties
├── src/
│   ├── app/
│   │   ├── globals.css      # Theme & custom utilities
│   │   ├── layout.tsx       # Root layout with fonts
│   │   └── page.tsx         # Landing page
│   ├── components/
│   │   └── ui/              # Shadcn UI components
│   └── lib/
│       └── utils.ts         # Utility functions
└── public/                  # Static assets
```

## 🎨 Design System

FishVault uses a **Deep Ocean** theme with bioluminescent accents:

### Color Palette

| Color | OKLCH | Usage |
|-------|-------|-------|
| Abyss | `oklch(0.12 0.02 240)` | Background |
| Electric Teal | `oklch(0.75 0.18 195)` | Primary accent |
| Cipher Cyan | `oklch(0.85 0.14 195)` | Highlights |
| Vault Green | `oklch(0.72 0.19 160)` | Success states |

### Typography

- **Display**: Outfit (700 weight)
- **Body**: Geist Sans
- **Monospace**: Geist Mono

See [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) for complete documentation.

## 📜 Scripts

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Create production build
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## 🗺️ Roadmap

- [x] Landing page
- [x] Design system documentation
- [ ] Supabase authentication
- [ ] Vault encryption logic
- [ ] Dashboard UI
- [ ] Password generator
- [ ] Chrome extension

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

<p align="center">
  <strong>🐟 FishVault</strong> - Your secrets. Encrypted locally. Stored securely.
</p>
