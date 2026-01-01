import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/src/lib/blog'
import { siteConfig } from '@/src/config/site'
import styles from './blog.module.css'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on building, learning, and everything in between.',
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
}

function formatDatetime(datetimeString: string): string {
  const date = new Date(datetimeString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Blog</h1>

      {posts.length === 0 ? (
        <p className={styles.empty}>No posts yet. Check back soon.</p>
      ) : (
        <div className={styles.posts}>
          {posts.map((post) => (
            <article key={post.slug} className={styles.post}>
              <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postDescription}>{post.description}</p>
              </Link>
              <div className={styles.postMeta}>
                <time className={styles.postDate}>{formatDatetime(post.datetime)}</time>
                <Link href={`/blog/category/${post.category}`} className={styles.postCategoryLink}>
                  {post.category}
                </Link>
                <span className={styles.postReadingTime}>{post.readingTime} min read</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
