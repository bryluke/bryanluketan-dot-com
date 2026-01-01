'use client';
import { useState } from 'react'
import Link from 'next/link'
import ThemeToggle from '@/src/components/ThemeToggle'
import ColorPickerDropdown from '@/src/components/ColorPickerDropdown'
import MobileMenu from '@/src/components/MobileMenu'
import styles from './Header.module.css'

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/arcade', label: 'Arcade' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>bryan</span>
          <span className={styles.logoAccent}>.</span>
          <span className={styles.logoText}>luke</span>
          <span className={styles.logoAccent}>.</span>
          <span className={styles.logoText}>tan</span>
        </Link>

        <nav className={styles.desktopNav}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.controls}>
          <ColorPickerDropdown />
          <ThemeToggle />
          
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={NAV_ITEMS}
      />
    </header>
  )
}
