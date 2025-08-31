export type HSL = {
  h: number // hue (0-360)
  s: number // saturation (0-100)
  l: number // lightness (0-100)
}

export function hexToHsl(hex: string): HSL {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

export function hslToHex(hsl: HSL): string {
  const h = hsl.h / 360
  const s = hsl.s / 100
  const l = hsl.l / 100

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q

  const r = hue2rgb(p, q, h + 1/3)
  const g = hue2rgb(p, q, h)
  const b = hue2rgb(p, q, h - 1/3)

  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function adjustColorForTheme(color: string, isDark: boolean): string {
  const hsl = hexToHsl(color)
  
  if (isDark) {
    // For dark mode: increase lightness, slightly reduce saturation
    return hslToHex({
      h: hsl.h,
      s: Math.max(hsl.s - 10, 30), // Ensure minimum saturation
      l: Math.max(hsl.l + 20, 60)   // Ensure minimum lightness
    })
  } else {
    // For light mode: reduce lightness, increase saturation
    return hslToHex({
      h: hsl.h,
      s: Math.min(hsl.s + 10, 80),  // Cap saturation
      l: Math.min(hsl.l - 10, 50)   // Cap lightness for contrast
    })
  }
}

export function generateColorVariants(baseColor: string, isDark: boolean) {
  const hsl = hexToHsl(baseColor)
  const adjusted = adjustColorForTheme(baseColor, isDark)
  
  return {
    base: adjusted,
    light: hslToHex({ ...hsl, l: Math.min(hsl.l + 30, 90) }),
    dark: hslToHex({ ...hsl, l: Math.max(hsl.l - 30, 10) }),
    subtle: hslToHex({ ...hsl, s: Math.max(hsl.s - 40, 10), l: isDark ? 20 : 95 })
  }
}
