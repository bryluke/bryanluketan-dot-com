import type { Metadata } from 'next'
import Link from 'next/link'
import { getTopicsWithPostCount } from '@/src/lib/explore'
import { siteConfig } from '@/src/config/site'
import styles from './explore.module.css'

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Topics I\'m exploring through building, writing, and learning in public.',
  alternates: {
    canonical: `${siteConfig.url}/explore`,
  },
}

export default function ExplorePage() {
  const topics = getTopicsWithPostCount()

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Explore</h1>
      <p className={styles.intro}>
        Topics I&apos;m exploring through building, writing, and learning in public. Each one is a
        bucket for posts, demos, and experiments.
      </p>

      <div className={styles.topics}>
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/explore/${topic.slug}`}
            className={styles.topicCard}
          >
            <h2 className={styles.topicName}>{topic.name}</h2>
            <p className={styles.topicDescription}>{topic.description}</p>
            <span className={styles.topicCount}>
              {topic.postCount > 0
                ? `${topic.postCount} post${topic.postCount === 1 ? '' : 's'}`
                : 'Coming soon'}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
