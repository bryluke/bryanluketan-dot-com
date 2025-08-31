# Bryan Luke Tan - Digital Garden

A personal "digital garden" built with Next.js, serving as a space for my profile and blog first.

I am hoping this will grow into my portfolio, freelance services, projects, and coding sandbox.

This site is designed to be minimal yet powerful, with room for experimentation and growth.

## ✨ Features

- **🎨 Dynamic Theme System** - Light/dark mode with customizable accent colors
- **🎯 HSL-based Color Management** - Automatic contrast adjustment for accessibility
- **📱 Progressive Web App** - Installable with proper manifest and icons
- **🚀 Performance Optimized** - Built on Next.js 15 with Turbopack
- **♿ Accessibility First** - Semantic HTML, proper ARIA labels, keyboard navigation
- **🔍 SEO Ready** - Comprehensive metadata, sitemap, robots.txt

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Vanilla CSS with CSS Layers (reset, base)
- **State Management**: Zustand for theme management
- **Fonts**: Fira Code & Inconsolata via next/font/google
- **Analytics**: Vercel Speed Insights
- **Package Manager**: pnpm

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/bryluke/bryanluketan-dot-com.git
cd bryanluketan-dot-com

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 📁 Project Structure

```
├── docs/                    # Documentation
├── public/                  # Static assets
│   └── assets/             # Images, icons, textures
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── layout.tsx      # Root layout with metadata
│   │   ├── page.tsx        # Home page
│   │   ├── manifest.ts     # PWA manifest
│   │   ├── robots.ts       # SEO robots.txt
│   │   └── sitemap.ts      # SEO sitemap
│   ├── components/         # Reusable React components
│   │   ├── ThemeToggle/    # Light/dark mode toggle
│   │   └── ColorPicker/    # Accent color selection
│   ├── stores/             # Zustand state management
│   │   └── theme.ts        # Theme and color state
│   ├── styles/             # CSS files
│   │   ├── tokens.css      # Design system tokens
│   │   ├── globals.css     # Global styles with CSS layers
│   │   └── fonts.ts        # Font configurations
│   └── utils/              # Utility functions
│       └── colorUtils.ts   # HSL color manipulation
└── ROADMAP.md              # Development roadmap
```

## 🎨 Design System

This project features a sophisticated design system built on CSS custom properties and HSL color manipulation:

- **CSS Tokens**: Centralized design variables in `src/styles/tokens.css`
- **CSS Layers**: Organized styling with reset, base, and component layers
- **Dynamic Colors**: Theme-aware accent colors with automatic contrast adjustment
- **Typography**: Custom font loading with fallbacks

For detailed information about the color system, see [docs/color-system.md](./docs/color-system.md).

## 📚 Documentation

- [Color System Guide](./docs/color-system.md) - Comprehensive guide to the HSL-based theme system
- [Development Roadmap](./ROADMAP.md) - Project milestones and future plans

## 🚦 Development Status

**Current Phase**: Foundation Complete ✅
- [x] Basic site structure and styling
- [x] Dynamic theme system with color picker
- [x] SEO optimization and PWA setup
- [x] Performance monitoring

**Next Phase**: Core Pages & Navigation
- [ ] Main navigation component
- [ ] About, Projects, Blog, Services pages
- [ ] Content management system

See [ROADMAP.md](./ROADMAP.md) for complete development timeline.

## 🤝 Contributing

This is a personal project, but I welcome feedback and suggestions! Feel free to:

- Open issues for bugs or feature requests
- Share ideas for design improvements
- Suggest optimizations or best practices

## 📄 License

This project is private and proprietary. All rights reserved.

However, if you feel like you want to use anything that I've created, I'm happy for you to just copy and paste it. Most of these were built through leveraging a lot of documentation and AI to teach me how to progress anyway (and I also don't know how to better share stuff I build at this point in time).

## 🔗 Connect

- **Website**: [bryanluketan.com](https://bryanluketan.com)
- **Email**: [Hit me up!](hello@bryanluketan.com)

---

*Built with intentionality to grow as a web developer in this new age with the advent of AI. Hence, the code is not my own, yet not lazily implemented.*