import type { Metadata } from 'next'
import { siteConfig } from '@/src/config/site'
import styles from './arcade.module.css'

export const metadata: Metadata = {
  title: 'Arcade',
  description: 'Games and interactive experiments.',
  alternates: {
    canonical: `${siteConfig.url}/arcade`,
  },
}

export default function ArcadePage() {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Arcade</h1>
      <p className={styles.description}>
        Coming soon. A place for games and interactive experiments I'm tinkering with.
      </p>
    </div>
  )
}
