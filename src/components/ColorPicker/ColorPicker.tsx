'use client';
import { useState, useEffect } from 'react'
import { useThemeStore } from '@/src/stores/theme'
import { adjustColorForTheme } from '@/src/utils/colorUtils'
import styles from './ColorPicker.module.css'

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
