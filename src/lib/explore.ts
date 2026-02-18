import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {
  type TopicSlug,
  type Tag,
  TOPICS,
  TAGS,
  isValidTopic,
  isValidTag,
} from '@/src/content/config'

const EXPLORE_DIR = path.join(process.cwd(), 'src/content/explore')

export interface PostMeta {
  title: string
  description: string
  datetime: string
  topic: TopicSlug
  tags: Tag[]
  published: boolean
  slug: string
  readingTime: number
}

export interface Post extends PostMeta {
  content: string
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/, '')
}

function validateTopic(topic: string, filename: string): TopicSlug {
  if (!isValidTopic(topic)) {
    throw new Error(
      `Invalid topic "${topic}" in ${filename}. ` +
      `Allowed topics: ${TOPICS.map((t) => t.slug).join(', ')}`
    )
  }
  return topic
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

export function getAllPosts(includeUnpublished = false): PostMeta[] {
  if (!fs.existsSync(EXPLORE_DIR)) {
    return []
  }

  const topicDirs = fs.readdirSync(EXPLORE_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())

  const posts: PostMeta[] = []

  for (const topicDir of topicDirs) {
    const topicSlug = topicDir.name
    if (!isValidTopic(topicSlug)) continue

    const topicPath = path.join(EXPLORE_DIR, topicSlug)
    const files = fs.readdirSync(topicPath).filter((file) => /\.mdx?$/.test(file))

    for (const filename of files) {
      const filePath = path.join(topicPath, filename)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)

      const slug = data.slug || getSlugFromFilename(filename)
      const rawTags = data.tags || []

      const post: PostMeta = {
        title: data.title || 'Untitled',
        description: data.description || '',
        datetime: data.datetime || '',
        topic: validateTopic(topicSlug, filename),
        tags: validateTags(rawTags, filename),
        published: data.published !== false,
        slug,
        readingTime: calculateReadingTime(content),
      }

      if (includeUnpublished || post.published) {
        posts.push(post)
      }
    }
  }

  return posts.sort(
    (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
  )
}

export function getPostByTopicAndSlug(topicSlug: string, slug: string): Post | null {
  const topicPath = path.join(EXPLORE_DIR, topicSlug)

  if (!fs.existsSync(topicPath)) {
    return null
  }

  const files = fs.readdirSync(topicPath).filter((file) => /\.mdx?$/.test(file))

  for (const filename of files) {
    const filePath = path.join(topicPath, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    const postSlug = data.slug || getSlugFromFilename(filename)

    if (postSlug === slug) {
      const rawTags = data.tags || []

      return {
        title: data.title || 'Untitled',
        description: data.description || '',
        datetime: data.datetime || '',
        topic: validateTopic(topicSlug, filename),
        tags: validateTags(rawTags, filename),
        published: data.published !== false,
        slug: postSlug,
        readingTime: calculateReadingTime(content),
        content,
      }
    }
  }

  return null
}

export function getPostsByTopic(topicSlug: string): PostMeta[] {
  return getAllPosts().filter((post) => post.topic === topicSlug)
}

export interface AdjacentPosts {
  previous: PostMeta | null
  next: PostMeta | null
}

export function getAdjacentPosts(topicSlug: string, slug: string): AdjacentPosts {
  const posts = getPostsByTopic(topicSlug)
  const currentIndex = posts.findIndex((post) => post.slug === slug)

  if (currentIndex === -1) {
    return { previous: null, next: null }
  }

  return {
    previous: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  }
}

export function getTopicsWithPostCount(): Array<{ slug: string; name: string; description: string; postCount: number }> {
  const allPosts = getAllPosts()

  return TOPICS.map((topic) => ({
    slug: topic.slug,
    name: topic.name,
    description: topic.description,
    postCount: allPosts.filter((post) => post.topic === topic.slug).length,
  }))
}
