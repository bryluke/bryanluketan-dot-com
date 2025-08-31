import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { adjustColorForTheme, generateColorVariants } from '@/src/utils/colorUtils'

export type ThemeMode = 'light' | 'dark'

interface ThemeStore {
  mode: ThemeMode
  accentColor: string
  setMode: (mode: ThemeMode) => void
  setAccentColor: (color: string) => void
  toggleMode: () => void
}

const applyThemeColors = (mode: ThemeMode, accentColor: string) => {
  const isDark = mode === 'dark'
  const variants = generateColorVariants(accentColor, isDark)
  
  // Apply theme attribute
  document.documentElement.setAttribute('data-theme', mode)
  
  // Apply color variants as CSS custom properties
  document.documentElement.style.setProperty('--color-accent-user', variants.base)
  document.documentElement.style.setProperty('--color-accent-light', variants.light)
  document.documentElement.style.setProperty('--color-accent-dark', variants.dark)
  document.documentElement.style.setProperty('--color-accent-subtle', variants.subtle)
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      mode: 'light',
      accentColor: '#0070f3', // Default blue accent
      setMode: (mode) => {
        set({ mode })
        applyThemeColors(mode, get().accentColor)
      },
      setAccentColor: (color) => {
        set({ accentColor: color })
        applyThemeColors(get().mode, color)
      },
      toggleMode: () => {
        const currentMode = get().mode
        const newMode = currentMode === 'light' ? 'dark' : 'light'
        get().setMode(newMode)
      },
    }),
    {
      name: 'theme-store', // localStorage key
      onRehydrateStorage: () => (state) => {
        // Apply theme on page load
        if (state) {
          applyThemeColors(state.mode, state.accentColor)
        }
      },
    }
  )
)
