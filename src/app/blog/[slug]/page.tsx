import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug, getAdjacentPosts, type BlogPost } from '@/src/lib/blog'
import { siteConfig } from '@/src/config/site'
import styles from './post.module.css'

interface PageProps {
  params: Promise<{ slug: string }>
}

function generateJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: siteConfig.author,
      url: siteConfig.url,
    },
    datePublished: post.datetime,
    dateModified: post.datetime,
    url: `${siteConfig.url}/blog/${post.slug}`,
    keywords: post.tags.join(', '),
    articleSection: post.category,
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const url = `${siteConfig.url}/blog/${slug}`

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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post || !post.published) {
    notFound()
  }

  const { previous, next } = getAdjacentPosts(slug)
  const jsonLd = generateJsonLd(post)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className={styles.root}>
        <header className={styles.header}>
        <Link href="/blog" className={styles.backLink}>
          &larr; Back to blog
        </Link>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <time className={styles.date}>{formatDatetime(post.datetime)}</time>
          <Link href={`/blog/category/${post.category}`} className={styles.category}>
            {post.category}
          </Link>
          <span className={styles.readingTime}>{post.readingTime} min read</span>
        </div>
        {post.tags.length > 0 && (
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <Link key={tag} href={`/blog/tag/${tag}`} className={styles.tag}>
                {tag}
              </Link>
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
              href={`/blog/${previous.slug}`}
              className={`${styles.navLink} ${styles.navLinkPrev}`}
            >
              <span className={styles.navLabel}>&larr; Previous</span>
              <span className={styles.navTitle}>{previous.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={`/blog/${next.slug}`}
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
