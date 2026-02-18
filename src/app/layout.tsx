import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

import "@/src/styles/globals.css";
import { inconsolata, firaCode } from "@/src/styles/fonts";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: ["Bryan Luke Tan", "developer", "software engineering", "portfolio", "explore", "learning", "career switching", "web development"],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
};

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme-store');
    if (!stored) return;
    var parsed = JSON.parse(stored);
    var state = parsed.state;
    if (!state) return;

    document.documentElement.setAttribute('data-theme', state.mode || 'light');

    var hex = state.accentColor;
    if (!hex) return;

    function hexToHsl(hex) {
      var r = parseInt(hex.slice(1, 3), 16) / 255;
      var g = parseInt(hex.slice(3, 5), 16) / 255;
      var b = parseInt(hex.slice(5, 7), 16) / 255;
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h = 0, s = 0, l = (max + min) / 2;
      if (max !== min) {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h /= 6;
      }
      return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    }

    function hslToHex(hsl) {
      var h = hsl.h / 360, s = hsl.s / 100, l = hsl.l / 100;
      var hue2rgb = function(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      var r = hue2rgb(p, q, h + 1/3);
      var g = hue2rgb(p, q, h);
      var b = hue2rgb(p, q, h - 1/3);
      var toHex = function(c) {
        var hex = Math.round(c * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return '#' + toHex(r) + toHex(g) + toHex(b);
    }

    var hsl = hexToHsl(hex);
    var isDark = state.mode === 'dark';
    var adjusted = isDark
      ? hslToHex({ h: hsl.h, s: Math.max(hsl.s - 10, 30), l: Math.max(hsl.l + 20, 60) })
      : hslToHex({ h: hsl.h, s: Math.min(hsl.s + 10, 80), l: Math.min(hsl.l - 10, 50) });
    var light = hslToHex({ h: hsl.h, s: hsl.s, l: Math.min(hsl.l + 30, 90) });
    var dark = hslToHex({ h: hsl.h, s: hsl.s, l: Math.max(hsl.l - 30, 10) });
    var subtle = hslToHex({ h: hsl.h, s: Math.max(hsl.s - 40, 10), l: isDark ? 20 : 95 });

    var root = document.documentElement.style;
    root.setProperty('--color-accent-user', adjusted);
    root.setProperty('--color-accent-light', light);
    root.setProperty('--color-accent-dark', dark);
    root.setProperty('--color-accent-subtle', subtle);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={[inconsolata.variable, firaCode.variable].join(" ")}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`antialiased`}
      >
        <Header />
        <main style={{ 
          paddingTop: 'var(--header-height)', 
          paddingBottom: 'var(--footer-height)',
          minHeight: '100vh'
        }}>
          {children}
        </main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
