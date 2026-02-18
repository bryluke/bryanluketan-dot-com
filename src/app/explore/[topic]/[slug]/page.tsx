import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostByTopicAndSlug, getAdjacentPosts, type Post } from '@/src/lib/explore'
import { getTopicBySlug } from '@/src/content/config'
import { siteConfig } from '@/src/config/site'
import styles from './post.module.css'

interface PageProps {
  params: Promise<{ topic: string; slug: string }>
}

function generateJsonLd(post: Post) {
  const topic = getTopicBySlug(post.topic)
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: siteConfig.author,
      url: siteConfig.url,
    },
    datePublished: post.datetime,
    dateModified: post.datetime,
    url: `${siteConfig.url}/explore/${post.topic}/${post.slug}`,
    keywords: post.tags.join(', '),
    articleSection: topic?.name || post.topic,
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ topic: post.topic, slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic: topicSlug, slug } = await params
  const post = getPostByTopicAndSlug(topicSlug, slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const url = `${siteConfig.url}/explore/${topicSlug}/${slug}`

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.datetime,
      authors: [siteConfig.author],
      url,
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

export default async function PostPage({ params }: PageProps) {
  const { topic: topicSlug, slug } = await params
  const post = getPostByTopicAndSlug(topicSlug, slug)

  if (!post || !post.published) {
    notFound()
  }

  const topic = getTopicBySlug(topicSlug)
  const { previous, next } = getAdjacentPosts(topicSlug, slug)
  const jsonLd = generateJsonLd(post)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className={styles.root}>
        <header className={styles.header}>
          <Link href={`/explore/${topicSlug}`} className={styles.backLink}>
            &larr; Back to {topic?.name || topicSlug}
          </Link>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <time className={styles.date}>{formatDatetime(post.datetime)}</time>
            <span className={styles.topic}>{topic?.name || topicSlug}</span>
            <span className={styles.readingTime}>{post.readingTime} min read</span>
          </div>
          {post.tags.length > 0 && (
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className={styles.content}>
          <MDXRemote source={post.content} />
        </div>

        {(previous || next) && (
          <nav className={styles.navigation}>
            {previous && (
              <Link
                href={`/explore/${topicSlug}/${previous.slug}`}
                className={`${styles.navLink} ${styles.navLinkPrev}`}
              >
                <span className={styles.navLabel}>&larr; Previous</span>
                <span className={styles.navTitle}>{previous.title}</span>
              </Link>
            )}
            {next && (
              <Link
                href={`/explore/${topicSlug}/${next.slug}`}
                className={`${styles.navLink} ${styles.navLinkNext}`}
              >
                <span className={styles.navLabel}>Next &rarr;</span>
                <span className={styles.navTitle}>{next.title}</span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </>
  )
}
