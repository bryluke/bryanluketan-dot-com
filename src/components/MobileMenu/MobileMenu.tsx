'use client';
import { useEffect } from 'react'
import Link from 'next/link'
import styles from './MobileMenu.module.css'

interface NavItem {
  href: string
  label: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: NavItem[]
}

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <div 
          className={styles.backdrop} 
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Navigation</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className={styles.nav}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Main</h3>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.navLink}
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>More</h3>
            <Link href="/contact" className={styles.navLink} onClick={onClose}>
              Contact
            </Link>
            <Link href="/sitemap" className={styles.navLink} onClick={onClose}>
              Sitemap
            </Link>
          </div>
        </nav>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            © 2025 Bryan Luke Tan
          </p>
        </div>
      </div>
    </>
  )
}
