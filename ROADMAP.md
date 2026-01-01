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

### Blog System
- MDX-based blog with gray-matter + next-mdx-remote
- Post listing with date, category, and description
- Individual post pages with full MDX rendering
- Frontmatter: title, description, datetime (ISO format for sub-day precision), category, tags, published, slug (optional)
- Posts stored in `src/content/blog/`
- Strict category/tag validation via `src/content/config.ts` (build fails on invalid values)
- Filter pages by category (`/blog/category/[category]`) and tag (`/blog/tag/[tag]`)
- Reading time estimate based on word count (200 wpm)
- Previous/next post navigation on individual posts
- RSS feed at `/feed.xml` with autodiscovery

### SEO & PWA
- Metadata, robots.txt, sitemap.xml
- Dynamic sitemap including all blog posts, categories, and tags
- JSON-LD structured data for blog posts (BlogPosting schema)
- Canonical URLs and OpenGraph metadata for posts
- PWA manifest and icons
- Vercel Speed Insights + Analytics (privacy-friendly, no cookies)

---

## What's Next

### Core Pages
- Projects page with portfolio showcase

### Content
- MDX for project descriptions

### Navigation
- Page transition animations
- Breadcrumb navigation

### Blog Enhancements
- Sort options (chronological / reverse)
- Featured posts on landing page (layout update)
- Devlog series for site development
- Table of contents for long posts
- Draft preview mode (view unpublished posts locally)
- Related posts (suggest by shared tags)
- Series/collections (group related posts, e.g., project devlogs)
- Newsletter signup

### Zettelkasten Features
- Wiki-style links (`[[slug]]`) between posts
- Backlink indexing and display
- Link graph visualization

### Enhancements
- Image galleries with lightbox
- Code syntax highlighting for blog
- Code block copy button
- Search functionality
- Pagination for blog listing
- Open Graph images (auto-generated or custom per-post)

### SEO & Growth (Organic)
- Meta description optimization per page
- Heading hierarchy audit
- Internal linking strategy
- Submit to Google Search Console
- Performance audit (Core Web Vitals)

### Analytics
- Goal tracking (email clicks, time on page)
- Monthly review habit (what's working, what's not)
