import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostsByTopic } from '@/src/lib/explore'
import { TOPICS, getTopicBySlug } from '@/src/content/config'
import { siteConfig } from '@/src/config/site'
import styles from './topic.module.css'

interface PageProps {
  params: Promise<{ topic: string }>
}

export async function generateStaticParams() {
  return TOPICS.map((topic) => ({ topic: topic.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic: topicSlug } = await params
  const topic = getTopicBySlug(topicSlug)

  if (!topic) {
    return { title: 'Topic Not Found' }
  }

  return {
    title: topic.name,
    description: topic.description,
    alternates: {
      canonical: `${siteConfig.url}/explore/${topicSlug}`,
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

export default async function TopicPage({ params }: PageProps) {
  const { topic: topicSlug } = await params
  const topic = getTopicBySlug(topicSlug)

  if (!topic) {
    notFound()
  }

  const posts = getPostsByTopic(topicSlug)

  return (
    <div className={styles.root}>
      <Link href="/explore" className={styles.backLink}>
        &larr; Back to explore
      </Link>
      <h1 className={styles.title}>{topic.name}</h1>
      <p className={styles.description}>{topic.description}</p>

      {posts.length === 0 ? (
        <p className={styles.empty}>No posts in this topic yet.</p>
      ) : (
        <div className={styles.posts}>
          {posts.map((post) => (
            <article key={post.slug} className={styles.post}>
              <Link href={`/explore/${topicSlug}/${post.slug}`} className={styles.postLink}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postDescription}>{post.description}</p>
              </Link>
              <div className={styles.postMeta}>
                <time className={styles.postDate}>{formatDatetime(post.datetime)}</time>
                <span className={styles.postReadingTime}>{post.readingTime} min read</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
