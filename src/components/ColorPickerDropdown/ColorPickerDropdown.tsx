'use client';
import { useState, useRef, useEffect } from 'react'
import { useThemeStore } from '@/src/stores/theme'
import { adjustColorForTheme } from '@/src/utils/colorUtils'
import styles from './ColorPickerDropdown.module.css'

const PRESET_COLORS = [
  '#0070f3',
  '#7928ca',
  '#e74c3c',
  '#2ecc71',
  '#f39c12',
  '#e91e63',
  '#00bcd4',
  '#9c27b0',
]

export default function ColorPickerDropdown() {
  const { accentColor, setAccentColor, mode } = useThemeStore()
  const [isOpen, setIsOpen] = useState(false)
  const [customColor, setCustomColor] = useState(accentColor)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Update custom color when accent color changes externally
  useEffect(() => {
    setCustomColor(accentColor)
  }, [accentColor])

  const handlePresetClick = (color: string) => {
    setAccentColor(color)
    setCustomColor(color)
    setIsOpen(false)
  }

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setCustomColor(color)
    setAccentColor(color)
  }

  const currentColorAdjusted = adjustColorForTheme(accentColor, mode === 'dark')

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open color picker"
        aria-expanded={isOpen}
        style={{ borderColor: currentColorAdjusted }}
      >
        <div 
          className={styles.colorPreview}
          style={{ backgroundColor: currentColorAdjusted }}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.presets}>
            {PRESET_COLORS.map((color) => {
              const adjustedColor = adjustColorForTheme(color, mode === 'dark')
              return (
                <button
                  key={color}
                  className={`${styles.preset} ${color === accentColor ? styles.active : ''}`}
                  style={{ backgroundColor: adjustedColor }}
                  onClick={() => handlePresetClick(color)}
                  aria-label={`Select ${color} as accent color`}
                />
              )
            })}
          </div>

          <div className={styles.custom}>
            <input
              type="color"
              value={customColor}
              onChange={handleCustomColorChange}
              className={styles.customInput}
              aria-label="Custom color picker"
            />
            <span className={styles.colorValue}>{customColor}</span>
          </div>
        </div>
      )}
    </div>
  )
}
