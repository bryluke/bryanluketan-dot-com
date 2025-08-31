'use client';
import { useState, useEffect } from 'react'
import { useThemeStore } from '@/src/stores/theme'
import { adjustColorForTheme } from '@/src/utils/colorUtils'
import styles from './ColorPicker.module.css'

// HSL-based preset colors for better theme adaptation
const PRESET_COLORS = [
  '#0070f3', // Blue
  '#7928ca', // Purple  
  '#e74c3c', // Red
  '#2ecc71', // Green
  '#f39c12', // Orange
  '#e91e63', // Pink
  '#00bcd4', // Cyan
  '#9c27b0', // Violet
]

export default function ColorPicker() {
  const { accentColor, setAccentColor, mode } = useThemeStore()
  const [customColor, setCustomColor] = useState(accentColor)

  useEffect(() => {
    setCustomColor(accentColor)
  }, [accentColor])

  const handlePresetClick = (color: string) => {
    setAccentColor(color)
    setCustomColor(color)
  }

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setCustomColor(color)
    setAccentColor(color)
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Accent Color</h3>
      
      <div className={styles.presets}>
        {PRESET_COLORS.map((color) => {
          // Show theme-adjusted preview
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
        <label htmlFor="custom-color" className={styles.customLabel}>
          Custom Color:
        </label>
        <input
          id="custom-color"
          type="color"
          value={customColor}
          onChange={handleCustomColorChange}
          className={styles.customInput}
        />
        <span className={styles.colorValue}>{customColor}</span>
      </div>
    </div>
  )
}
