# Blog System

MDX-based blog with strict category and tag validation.

## Writing a Post

Create a new `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Post Title"
description: "Short description for listings and SEO"
date: "2025-01-01"
category: "tech"
tags: ["exploration", "typescript"]
published: true
---

Your content here...
```

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title |
| `description` | Yes | Short description for listings and SEO |
| `date` | Yes | Publication date (YYYY-MM-DD) |
| `category` | Yes | Single category from allowed list |
| `tags` | Yes | Array of tags from allowed list |
| `published` | No | Set to `false` to hide post (defaults to `true`) |
| `slug` | No | Custom URL slug (defaults to filename) |

## Categories and Tags

Defined in `src/content/config.ts`. Build fails if you use an undefined value.

**To add a new category or tag:**
1. Open `src/content/config.ts`
2. Add the value to `CATEGORIES` or `TAGS` array
3. Use it in your post

This is intentional — forces you to be deliberate about taxonomy.

## File Structure

```
src/
  content/
    blog/
      my-post.mdx          # → /blog/my-post
      another-post.mdx     # → /blog/another-post
    config.ts              # Category and tag definitions
  lib/
    blog.ts                # Post parsing functions
  app/
    blog/
      page.tsx             # Listing page
      [slug]/
        page.tsx           # Individual post page
```

## Available Functions

From `src/lib/blog.ts`:

```typescript
getAllPosts()              // All published posts, sorted by date
getPostBySlug(slug)        // Single post by slug
getPostsByCategory(cat)    // Posts filtered by category
getPostsByTag(tag)         // Posts filtered by tag
getAllCategories()         // List of categories in use
getAllTags()               // List of tags in use
```

## MDX Features

Posts support full MDX — standard markdown plus JSX components. Currently available:

- Headings, paragraphs, lists
- Links, images
- Code blocks (inline and fenced)
- Blockquotes
- Horizontal rules

Custom components can be added later via `MDXComponents`.
