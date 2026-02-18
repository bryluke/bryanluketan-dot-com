import { MetadataRoute } from 'next'
import { getAllPosts } from '@/src/lib/explore'
import { TOPICS } from '@/src/content/config'
import { siteConfig } from '@/src/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/explore`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  const topicPages: MetadataRoute.Sitemap = TOPICS.map((topic) => ({
    url: `${siteConfig.url}/explore/${topic.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/explore/${post.topic}/${post.slug}`,
    lastModified: new Date(post.datetime),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...topicPages, ...postPages]
}
