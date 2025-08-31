'use client';
import { useThemeStore } from '@/src/stores/theme'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeStore()

  return (
    <button
      className={styles.toggle}
      onClick={toggleMode}
      aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className={styles.icon}>
        {mode === 'light' ? '🌙' : '☀️'}
      </span>
      <span className={styles.label}>
        {mode === 'light' ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}
