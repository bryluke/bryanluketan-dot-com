import { MetadataRoute } from 'next'
import { siteConfig } from '@/src/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
