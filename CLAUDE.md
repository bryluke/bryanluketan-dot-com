# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # Start development server with Turbopack (http://localhost:3000)
pnpm build    # Build for production (Turbopack disabled due to stability issues)
pnpm start    # Start production server
```

No test or lint commands are currently configured.

## Architecture

This is a Next.js 15 (stable) personal website using the App Router, vanilla CSS with CSS layers, and Zustand for state management.

### Theme System

The site features an HSL-based dynamic theme system inspired by Arc Browser:

- **Theme Store** (`src/stores/theme.ts`): Zustand store with persistence to localStorage (`theme-store` key). Manages `mode` (light/dark) and `accentColor` (hex). On state change, applies `data-theme` attribute and CSS custom properties to `document.documentElement`.

- **Color Utilities** (`src/utils/colorUtils.ts`): Provides `hexToHsl`, `hslToHex`, `adjustColorForTheme`, and `generateColorVariants`. Colors are adjusted for contrast—light mode reduces lightness and increases saturation, dark mode does the opposite.

- **CSS Custom Properties**: Four accent variants are dynamically set:
  - `--color-accent-user` (theme-adjusted main color)
  - `--color-accent-light`, `--color-accent-dark`, `--color-accent-subtle`

- **FOUC Prevention** (`src/app/layout.tsx`): A blocking script in `<head>` reads localStorage and applies theme/colors before paint. This duplicates the color logic from `colorUtils.ts`—if formulas change there, update the script too.

### Styling

- **CSS Layers**: Uses `@layer reset, base` in `globals.css` for cascade organization
- **Design Tokens** (`src/styles/tokens.css`): Defines spacing, typography (fluid `clamp()` sizing), colors, and breakpoints
- **Component Styles**: CSS Modules (`*.module.css`) co-located with components
- **Fonts**: Fira Code and Inconsolata loaded via `next/font/google` in `src/styles/fonts.ts`

### Component Structure

Components use barrel exports (`index.ts`). Key components:
- `Header/Footer`: Fixed layout with responsive design, active nav highlighting
- `MobileMenu`: Slide-out drawer for mobile navigation
- `ThemeToggle`: Light/dark mode switch
- `ColorPicker/ColorPickerDropdown`: Accent color selection

Navigation uses `usePathname()` to detect active page. Active items render as `<span>` (not clickable) instead of `<Link>`.

### Blog System

MDX-based blog using `gray-matter` (frontmatter parsing) + `next-mdx-remote` (rendering).

- **Posts location**: `src/content/blog/*.mdx`
- **Blog lib** (`src/lib/blog.ts`): `getAllPosts()`, `getPostBySlug()`, `getPostsByCategory()`, `getPostsByTag()`, `getAdjacentPosts()`, `calculateReadingTime()`
- **Frontmatter**: title, description, datetime (ISO format), category, tags, published, slug (optional, defaults to filename)
- **Unpublished posts**: Set `published: false` to hide from listing
- **Strict validation**: Categories and tags must be defined in `src/content/config.ts`. Build fails on unknown values.
- **Filter pages**: `/blog/category/[category]` and `/blog/tag/[tag]` for browsing by taxonomy
- **Reading time**: Calculated at 200 words per minute, displayed on listings and posts
- **Post navigation**: Previous/next links at bottom of each post (chronological order)

### RSS Feed

The site provides an RSS feed at `/feed.xml` for subscribers.

- **Route handler**: `src/app/feed.xml/route.ts` generates XML dynamically
- **Autodiscovery**: `<link rel="alternate" type="application/rss+xml">` in site metadata
- **Content**: Includes title, description, link, publication date, and category for each post
- **Caching**: 1-hour cache (`Cache-Control: public, max-age=3600`)

### SEO & Analytics

- **Site config**: Centralized in `src/config/site.ts` (url, name, description, author, email)
- **JSON-LD**: Blog posts include `BlogPosting` structured data for rich search results
- **Canonical URLs**: All pages have canonical URLs pointing to `www.` subdomain
- **OpenGraph**: Posts have article-specific OG metadata (type, publishedTime, authors)
- **Sitemap**: Dynamic sitemap at `/sitemap.xml` includes all posts, categories, and tags
- **Analytics**: Vercel Analytics + Speed Insights (privacy-friendly, no cookies)

### Path Aliases

Use `@/src/` for imports (e.g., `import { useThemeStore } from '@/src/stores/theme'`).

## Coding Rules

1. **No unnecessary comments.** Code should be self-explanatory. Only use comments for `TODO:` or other functional markers.

2. **No `any` typing.** Always use proper TypeScript types.

3. **Flag repeated code inline.** When noticing repeated patterns, mention it immediately so we can decide whether to refactor at that moment.

4. **Check existing patterns first.** Before writing new code, look for existing patterns and components to reuse or extend.

5. **Prefer vanilla code.** Write custom utilities over installing packages unless there's a clear need for a dependency.
