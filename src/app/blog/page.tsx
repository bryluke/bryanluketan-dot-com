import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/src/lib/blog'
import styles from './blog.module.css'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on building, learning, and everything in between.',
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
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
                <div className={styles.postMeta}>
                  <time className={styles.postDate}>{formatDate(post.date)}</time>
                  <span className={styles.postCategory}>{post.category}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
