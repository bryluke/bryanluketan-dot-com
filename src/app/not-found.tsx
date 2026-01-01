import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.root}>
      <div className={styles.code}>404</div>
      <div className={styles.message}>
        This page doesn't exist.
      </div>
      <Link href="/" className={styles.link}>
        Go home
      </Link>
    </div>
  )
}
