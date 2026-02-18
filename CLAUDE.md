# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Site Vision

**A public workshop for a web tech lead learning out loud.**

Bryan is a full-stack developer (~4 years) at a startup in Singapore, recently moved into a Web Tech Lead role. Imposter syndrome is loud. The response: get good in public instead of faking it.

This site is where that happens. It's a sandbox for building, a journal for documenting learnings, and a place to share work and get feedback. It's also an exercise in marketing and growth (SEO, web analytics) as topics worth exploring in their own right.

### Guiding Principles

1. **Ship complete.** Define "done" before starting. No "I'll add that later." Scope tight, polish what's there.
2. **V2 is a new product.** If expanding something, build it fresh. The original stays finished.
3. **Build in public.** Document learnings. Show the work, not just the results.
4. **Learn by doing.** Each topic is explored through actual projects, not just writing about concepts.

### Current Focus

Building out the `/explore` section, starting with Web Analytics as the first topic. See `ROADMAP.md` for the full exploration plan.

### Project Boundaries

- **Interactive demos**: Built as React components, inline on their topic pages
- **No passwords**: Use display names and device tokens for leaderboards/scores
- **OAuth only**: If real authentication is needed, use OAuth providers
- **Separate apps**: If real user data or money is involved, spin up a separate app with proper infrastructure

## Commands

```bash
pnpm dev      # Start development server with Turbopack (http://localhost:3000)
pnpm build    # Build for production (Turbopack disabled due to stability issues)
pnpm start    # Start production server
```

No test or lint commands are currently configured.

> **Note**: `pnpm build` often fails locally due to webpack/cache issues. Don't worry about it. The project deploys fine to Vercel.

## Architecture

This is a Next.js 15 (stable) personal website using the App Router, vanilla CSS with CSS layers, and Zustand for state management.

### Pages

- **Home** (`/`): Introduction and personal context
- **About** (`/about`): Bio, background, and the longer story
- **Explore** (`/explore`): Overview of all topics being explored
- **Topic** (`/explore/[topic]`): Landing page for a topic with description + list of posts
- **Post** (`/explore/[topic]/[slug]`): Individual post with demos, code, and writeup

### Theme System

The site features an HSL-based dynamic theme system inspired by Arc Browser:

- **Theme Store** (`src/stores/theme.ts`): Zustand store with persistence to localStorage (`theme-store` key). Manages `mode` (light/dark) and `accentColor` (hex). On state change, applies `data-theme` attribute and CSS custom properties to `document.documentElement`.

- **Color Utilities** (`src/utils/colorUtils.ts`): Provides `hexToHsl`, `hslToHex`, `adjustColorForTheme`, and `generateColorVariants`. Colors are adjusted for contrast — light mode reduces lightness and increases saturation, dark mode does the opposite.

- **CSS Custom Properties**: Four accent variants are dynamically set:
  - `--color-accent-user` (theme-adjusted main color)
  - `--color-accent-light`, `--color-accent-dark`, `--color-accent-subtle`

- **FOUC Prevention** (`src/app/layout.tsx`): A blocking script in `<head>` reads localStorage and applies theme/colors before paint. This duplicates the color logic from `colorUtils.ts` — if formulas change there, update the script too.

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

### Content System

MDX-based content using `gray-matter` (frontmatter parsing) + `next-mdx-remote` (rendering).

- **Content location**: `src/content/explore/[topic-slug]/*.mdx` (topic derived from directory name)
- **Content lib**: `src/lib/explore.ts` (`getAllPosts`, `getPostByTopicAndSlug`, `getPostsByTopic`, `getAdjacentPosts`, `getTopicsWithPostCount`)
- **Topic config**: `src/content/config.ts` defines `TOPICS` array with slug, name, description. Exports `TopicSlug` type, `isValidTopic`, `getTopicBySlug`
- **Frontmatter**: title, description, datetime (ISO format), tags, published, slug (optional, defaults to filename). Topic is inferred from directory
- **Unpublished posts**: Set `published: false` to hide from listing
- **Reading time**: Calculated at 200 words per minute

### RSS Feed

The site provides an RSS feed at `/feed.xml` for subscribers.

- **Route handler**: `src/app/feed.xml/route.ts` generates XML dynamically
- **Autodiscovery**: `<link rel="alternate" type="application/rss+xml">` in site metadata
- **Caching**: 1-hour cache (`Cache-Control: public, max-age=3600`)

### SEO & Analytics

- **Site config**: Centralized in `src/config/site.ts` (url, name, description, author, email)
- **JSON-LD**: Posts should use `TechArticle` or `LearningResource` structured data
- **Canonical URLs**: All pages have canonical URLs pointing to `www.` subdomain
- **OpenGraph**: Posts have article-specific OG metadata (type, publishedTime, authors)
- **Sitemap**: Dynamic sitemap at `/sitemap.xml` includes all pages, topics, and posts
- **Analytics**: Vercel Analytics + Speed Insights (privacy-friendly, no cookies)

### Path Aliases

Use `@/src/` for imports (e.g., `import { useThemeStore } from '@/src/stores/theme'`).

## Writing Style

When drafting or editing content, match these patterns:

### Voice & Tone

- **First person, conversational.** Write like talking to a friend, not presenting to an audience
- **Honest about struggles.** Vulnerability is a feature, not a bug. Acknowledge fears, doubts, and gaps directly
- **Reflective, not performative.** Process thoughts out loud rather than presenting polished conclusions
- **Avoids corporate language.** No buzzwords, no "leverage," no "synergy." Plain words

### Structure

- **Short declarative sentences for emphasis.** "That's the commitment." "This site is where that happens."
- **"Not X, but Y" for contrast.** "Not a polished portfolio for appearances, but real, finished things."
- **Section headers are short phrases.** "The Fear", "Root Problem", "The Way Out"
- **Horizontal rule (---) before closing.** Signals the wrap-up
- **Closing line echoes the title/theme.** Brings it full circle

### Punctuation & Rhythm

- **Ellipsis (...)** for trailing thoughts or pauses
- **Avoid em dashes (—)**. They've become an AI-writing tell. Use these instead:
  - Commas or parentheses for asides
  - Period + new sentence for pivots
  - Colons for introducing explanations
- **Bold for key phrases.** Use sparingly to highlight the core point of a paragraph
- **Short paragraphs.** One idea per paragraph. Let it breathe

### Endings

- Often invites reader engagement or accountability
- Punchy, not preachy
- Sometimes asks for feedback or connection without being needy

## Coding Rules

1. **No unnecessary comments.** Code should be self-explanatory. Only use comments for `TODO:` or other functional markers.

2. **No `any` typing.** Always use proper TypeScript types.

3. **Flag repeated code inline.** When noticing repeated patterns, mention it immediately so we can decide whether to refactor at that moment.

4. **Check existing patterns first.** Before writing new code, look for existing patterns and components to reuse or extend.

5. **Prefer vanilla code.** Write custom utilities over installing packages unless there's a clear need for a dependency.
