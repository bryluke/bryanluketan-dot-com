import type { Metadata } from 'next'
import { siteConfig } from '@/src/config/site'
import styles from './projects.module.css'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I\'ve built and am building.',
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
}

export default function ProjectsPage() {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Projects</h1>
      <p className={styles.description}>
        Coming soon. I'm working on documenting the things I've built and am currently building.
      </p>
    </div>
  )
}
