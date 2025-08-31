'use client';
import Link from 'next/link'
import styles from './Footer.module.css'

const QUICK_NAV_ITEMS = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/about', label: 'About', icon: '👤' },
  { href: '/projects', label: 'Projects', icon: '💼' },
  { href: '/blog', label: 'Blog', icon: '📝' },
  { href: '/contact', label: 'Contact', icon: '💬' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.desktopFooter}>
        <div className={styles.container}>
          <p className={styles.copyright}>
            © 2025 Bryan Luke Tan | Of craft and purpose.
          </p>
          <div className={styles.links}>
            <Link href="/contact" className={styles.link}>
              Contact
            </Link>
            <Link href="/sitemap" className={styles.link}>
              Sitemap
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.mobileFooter}>
        <nav className={styles.quickNav}>
          {QUICK_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.quickNavItem}
            >
              <span className={styles.quickNavIcon}>{item.icon}</span>
              <span className={styles.quickNavLabel}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
