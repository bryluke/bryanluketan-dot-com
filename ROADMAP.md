# Roadmap

## What's Built

### Foundation
- Next.js 16 with App Router and Turbopack
- Vanilla CSS architecture with CSS layers (reset, base)
- Design tokens system (`src/styles/tokens.css`) with fluid typography using `clamp()`
- Custom fonts: Fira Code, Inconsolata via `next/font`

### Theme System
- Light/dark mode toggle with `data-theme` attribute
- User-customizable accent colors with HSL-based contrast adjustment
- Zustand store with localStorage persistence
- Four color variants: base, light, dark, subtle
- FOUC prevention via blocking script in `<head>`

### Layout & Components
- Fixed header with logo, navigation links, theme controls
- Footer with desktop/mobile layouts and contact email
- Mobile slide-out menu
- Color picker dropdown
- Active page highlighting in navigation (renders as non-clickable span)
- Custom 404 page
- About page

### SEO & PWA
- Metadata, robots.txt, sitemap.xml
- PWA manifest and icons
- Vercel Speed Insights

---

## What's Next

### Core Pages
- Projects page with portfolio showcase
- Blog page with article listing

### Content
- MDX setup for blog posts and project descriptions
- Content collection system

### Navigation
- Page transition animations
- Breadcrumb navigation

### Enhancements
- Image galleries with lightbox
- Code syntax highlighting for blog
- Search functionality
