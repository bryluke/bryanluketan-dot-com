import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostsByCategory, getAllCategories } from '@/src/lib/blog'
import { isValidCategory } from '@/src/content/config'
import styles from '../../blog.module.css'

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({ category }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params

  if (!isValidCategory(category)) {
    return { title: 'Category Not Found' }
  }

  const formattedCategory = category.replace(/-/g, ' ')

  return {
    title: `${formattedCategory} posts`,
    description: `Blog posts in the ${formattedCategory} category.`,
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

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params

  if (!isValidCategory(category)) {
    notFound()
  }

  const posts = getPostsByCategory(category)
  const formattedCategory = category.replace(/-/g, ' ')

  return (
    <div className={styles.root}>
      <Link href="/blog" className={styles.backLink}>
        &larr; All posts
      </Link>
      <h1 className={styles.title}>{formattedCategory}</h1>

      {posts.length === 0 ? (
        <p className={styles.empty}>No posts in this category yet.</p>
      ) : (
        <div className={styles.posts}>
          {posts.map((post) => (
            <article key={post.slug} className={styles.post}>
              <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postDescription}>{post.description}</p>
                <div className={styles.postMeta}>
                  <time className={styles.postDate}>{formatDatetime(post.datetime)}</time>
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
