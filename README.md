# Bryan Luke Tan - Personal Website

A personal website and blog built with Next.js, serving as a space for writing, projects, and experimentation.

## Features

- **Dynamic Theme System** - Light/dark mode with customizable accent colors (HSL-based)
- **MDX Blog** - Write posts in MDX with frontmatter, categories, and tags
- **RSS Feed** - Subscribe at `/feed.xml`
- **SEO Optimized** - JSON-LD, canonical URLs, dynamic sitemap, OpenGraph
- **Privacy-Friendly Analytics** - Vercel Analytics + Speed Insights (no cookies)
- **PWA Ready** - Installable with manifest and icons

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Vanilla CSS with CSS Layers
- **State**: Zustand (theme persistence)
- **Blog**: MDX via gray-matter + next-mdx-remote
- **Analytics**: Vercel Analytics + Speed Insights
- **Hosting**: Vercel

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── blog/              # Blog listing and posts
│   │   ├── [slug]/        # Individual post pages
│   │   ├── category/      # Category filter pages
│   │   └── tag/           # Tag filter pages
│   ├── about/             # About page
│   ├── feed.xml/          # RSS feed route
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # Robots.txt
├── components/            # React components
├── config/                # Site configuration
│   └── site.ts            # Centralized site config (url, name, etc.)
├── content/               # Content files
│   ├── blog/              # MDX blog posts
│   └── config.ts          # Valid categories and tags
├── lib/                   # Utilities
│   └── blog.ts            # Blog data functions
├── stores/                # Zustand stores
└── styles/                # CSS files and tokens
```

## Writing Blog Posts

Create a new `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Post Title"
description: "Brief description"
datetime: "2025-01-01T10:00:00"
category: "tech"
tags: ["typescript", "web-dev"]
published: true
---

Your content here...
```

Categories and tags must be defined in `src/content/config.ts`.

## Configuration

Site-wide settings are centralized in `src/config/site.ts`:

```ts
export const siteConfig = {
  url: 'https://www.bryanluketan.com',
  name: 'Bryan Luke Tan',
  description: '...',
  author: 'Bryan Luke Tan',
  email: 'hello@bryanluketan.com',
}
```

## Documentation

- [ROADMAP.md](./ROADMAP.md) - What's built and what's next
- [CLAUDE.md](./CLAUDE.md) - Technical documentation for AI assistants

## License

This project is personal and proprietary. Feel free to reference or adapt patterns for your own projects.

## Connect

- **Website**: [www.bryanluketan.com](https://www.bryanluketan.com)
- **Email**: hello@bryanluketan.com
