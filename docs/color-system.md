# Color System Documentation

## Overview

The inspiration for this system is Arc Browser's profile colouring. I wanted to replicate the effect using HSL (Hue, Saturation, Lightness) values that automatically adapts colors for optimal contrast in both light and dark themes. 

For simplicity, most of the site is in white and black and will be accented intentionally where it counts. The accents, then, would compliment with either the light or dark mode through use of a simple formula that you and find below.

There is still room for this system to grow such as creating gradients and automatically picking complimenting colors, but maybe later down the road...

## Architecture

### 1. Core Components

- **Theme Store** (`src/stores/theme.ts`) - Zustand store managing theme state
- **Color Utilities** (`src/utils/colorUtils.ts`) - HSL conversion and color manipulation
- **Theme Toggle** (`src/components/ThemeToggle/`) - Light/dark mode switcher
- **Color Picker** (`src/components/ColorPicker/`) - Accent color selection
- **CSS Tokens** (`src/styles/tokens.css`) - Dynamic CSS custom properties

### 2. How It Works

#### Step 1: HSL Foundation
The system uses HSL color format because it allows programmatic manipulation:
- **Hue (H)**: The color itself (0-360°)
- **Saturation (S)**: Color intensity (0-100%)  
- **Lightness (L)**: How light/dark the color is (0-100%)

#### Step 2: Theme-Aware Color Adjustment
When a user selects an accent color, the system:
1. Converts the color to HSL format
2. Applies theme-specific adjustments:
   - **Light mode**: Reduces lightness, increases saturation for contrast
   - **Dark mode**: Increases lightness, reduces saturation for visibility
3. Generates color variants (light, dark, subtle)

#### Step 3: Dynamic CSS Variables
The adjusted colors are applied as CSS custom properties:
```css
--color-accent-user: #adjusted-main-color
--color-accent-light: #lighter-variant
--color-accent-dark: #darker-variant  
--color-accent-subtle: #subtle-background-variant
```

### 3. Color Adjustment Formulas

From `src/utils/colorUtils.ts`:

```typescript
export function adjustColorForTheme(color: string, isDark: boolean): string {
  const hsl = hexToHsl(color)

  if (isDark) {
    return hslToHex({
      h: hsl.h,
      s: Math.max(hsl.s - 10, 30),  // Minimum 30% saturation
      l: Math.max(hsl.l + 20, 60)   // Minimum 60% lightness for visibility
    })
  } else {
    return hslToHex({
      h: hsl.h,
      s: Math.min(hsl.s + 10, 80),  // Cap at 80% saturation
      l: Math.min(hsl.l - 10, 50)   // Cap at 50% lightness for contrast
    })
  }
}
```

### 4. State Management

#### Zustand Store Structure
```typescript
interface ThemeStore {
  mode: 'light' | 'dark'
  accentColor: string (hex format)
  setMode: (mode) => void
  setAccentColor: (color) => void  
  toggleMode: () => void
}
```

#### Persistence
- Settings saved to localStorage as 'theme-store'
- Automatically restored on page load
- Theme applied to document on hydration

#### FOUC Prevention
To prevent flash of unstyled content on navigation, a blocking script in `src/app/layout.tsx` runs before paint:
1. Reads theme state from localStorage
2. Applies `data-theme` attribute
3. Calculates and sets all color CSS custom properties

This script duplicates the color formulas from `colorUtils.ts`. If the formulas change, update both locations.

### 5. Component Integration

#### Using Dynamic Colors in CSS
```css
.component {
  color: var(--color-accent-user);           /* Main accent */
  background: var(--color-accent-subtle);    /* Subtle background */
  border: 1px solid var(--color-accent-light); /* Light accent border */
}

.component:hover {
  background: var(--color-accent-dark);      /* Darker on hover */
}
```

#### React Component Usage
```tsx
import { useThemeStore } from '@/src/stores/theme'

function MyComponent() {
  const { mode, accentColor, toggleMode } = useThemeStore()
  
  return (
    <div style={{ color: 'var(--color-accent-user)' }}>
      Current theme: {mode}
    </div>
  )
}
```

## Implementation Guide

### Adding New Color-Aware Components

1. **Import the theme store**:
   ```tsx
   import { useThemeStore } from '@/src/stores/theme'
   ```

2. **Use CSS custom properties in your styles**:
   ```css
   .myComponent {
     color: var(--color-accent-user);
     background: var(--color-accent-subtle);
   }
   ```

3. **Access theme data if needed**:
   ```tsx
   const { mode, accentColor } = useThemeStore()
   ```

### Extending Color Variants

To add new color variants, modify `generateColorVariants()` in `colorUtils.ts`:

```typescript
export function generateColorVariants(baseColor: string, isDark: boolean) {
  const hsl = hexToHsl(baseColor)
  
  return {
    // ... existing variants
    muted: hslToHex({ ...hsl, s: hsl.s * 0.3, l: isDark ? 30 : 70 }),
    vibrant: hslToHex({ ...hsl, s: 100, l: isDark ? 70 : 40 })
  }
}
```

Then apply them in the theme store:
```typescript
document.documentElement.style.setProperty('--color-accent-muted', variants.muted)
document.documentElement.style.setProperty('--color-accent-vibrant', variants.vibrant)
```

## Best Practices

### 1. Color Contrast
- Always test colors in both light and dark modes
- Use the subtle variants for large background areas
- Use the main accent for important interactive elements

### 2. Performance
- Color calculations happen only when colors change
- CSS custom properties update instantly
- No re-renders of components when theme changes

### 3. Accessibility
- The system ensures minimum contrast ratios
- Colors are capped to maintain readability
- Theme preference respects system settings on first visit

## Troubleshooting

### Colors Not Updating
1. Check if the component is wrapped in the theme provider
2. Ensure you're using CSS custom properties, not hardcoded colors
3. Verify the theme store is properly initialized

### Poor Contrast
1. Check the color adjustment formulas in `colorUtils.ts`
2. Adjust the minimum/maximum lightness values
3. Test with actual users in different lighting conditions

