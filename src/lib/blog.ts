import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {
  type Category,
  type Tag,
  CATEGORIES,
  TAGS,
  isValidCategory,
  isValidTag,
} from '@/src/content/config'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

export interface BlogPostMeta {
  title: string
  description: string
  date: string
  category: Category
  tags: Tag[]
  published: boolean
  slug: string
}

export interface BlogPost extends BlogPostMeta {
  content: string
}

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/, '')
}

function validateCategory(category: string, filename: string): Category {
  if (!isValidCategory(category)) {
    throw new Error(
      `Invalid category "${category}" in ${filename}. ` +
      `Allowed categories: ${CATEGORIES.join(', ')}`
    )
  }
  return category
}

function validateTags(tags: string[], filename: string): Tag[] {
  const invalidTags = tags.filter((tag) => !isValidTag(tag))
  if (invalidTags.length > 0) {
    throw new Error(
      `Invalid tags [${invalidTags.join(', ')}] in ${filename}. ` +
      `Allowed tags: ${TAGS.join(', ')}`
    )
  }
  return tags as Tag[]
}

export function getAllPosts(includeUnpublished = false): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => /\.mdx?$/.test(file))

  const posts = files
    .map((filename) => {
      const filePath = path.join(BLOG_DIR, filename)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(fileContent)

      const slug = data.slug || getSlugFromFilename(filename)
      const rawCategory = data.category || ''
      const rawTags = data.tags || []

      return {
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || '',
        category: validateCategory(rawCategory, filename),
        tags: validateTags(rawTags, filename),
        published: data.published !== false,
        slug,
      } as BlogPostMeta
    })
    .filter((post) => includeUnpublished || post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) {
    return null
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => /\.mdx?$/.test(file))

  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    const postSlug = data.slug || getSlugFromFilename(filename)

    if (postSlug === slug) {
      const rawCategory = data.category || ''
      const rawTags = data.tags || []

      return {
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || '',
        category: validateCategory(rawCategory, filename),
        tags: validateTags(rawTags, filename),
        published: data.published !== false,
        slug: postSlug,
        content,
      }
    }
  }

  return null
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set(posts.map((post) => post.category))
  return Array.from(categories).sort()
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set(posts.flatMap((post) => post.tags))
  return Array.from(tags).sort()
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.category === category)
}

export function getPostsByTag(tag: Tag): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag))
}
