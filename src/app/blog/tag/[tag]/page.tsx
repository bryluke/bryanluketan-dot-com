import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostsByTag, getAllTags } from '@/src/lib/blog'
import { isValidTag, type Tag } from '@/src/content/config'
import { siteConfig } from '@/src/config/site'
import styles from '../../blog.module.css'

interface PageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params

  if (!isValidTag(tag)) {
    return { title: 'Tag Not Found' }
  }

  return {
    title: `#${tag} posts`,
    description: `Blog posts tagged with ${tag}.`,
    alternates: {
      canonical: `${siteConfig.url}/blog/tag/${tag}`,
    },
  }
}

function formatDatetime(datetimeString: string): string {
  const date = new Date(datetimeString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params

  if (!isValidTag(tag)) {
    notFound()
  }

  const posts = getPostsByTag(tag as Tag)

  return (
    <div className={styles.root}>
      <Link href="/blog" className={styles.backLink}>
        &larr; All posts
      </Link>
      <h1 className={styles.title}>#{tag}</h1>

      {posts.length === 0 ? (
        <p className={styles.empty}>No posts with this tag yet.</p>
      ) : (
        <div className={styles.posts}>
          {posts.map((post) => (
            <article key={post.slug} className={styles.post}>
              <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postDescription}>{post.description}</p>
                <div className={styles.postMeta}>
                  <time className={styles.postDate}>{formatDatetime(post.datetime)}</time>
                  <span className={styles.postCategory}>{post.category}</span>
                  <span className={styles.postReadingTime}>{post.readingTime} min read</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
