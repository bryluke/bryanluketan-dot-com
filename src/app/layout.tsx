import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"

import "@/src/styles/globals.css";
import { inconsolata, firaCode } from "@/src/styles/fonts";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";



export const metadata: Metadata = {
  title: {
    default: "Bryan Luke Tan",
    template: "%s | Bryan Luke Tan"
  },
  description: "Developing products of craft and purpose; building meaning with each block.",
  keywords: ["Bryan Luke Tan", "developer", "software engineering", "portfolio", "blog", "career switching", "web development"],
  authors: [{ name: "Bryan Luke Tan" }],
  creator: "Bryan Luke Tan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bryanluketan.com",
    title: "Bryan Luke Tan",
    description: "Developing products of craft and purpose; building meaning with each block.",
    siteName: "Bryan Luke Tan",
  },
  twitter: {
    card: "summary",
    title: "Bryan Luke Tan",
    description: "Developing products of craft and purpose; building meaning with each block.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en"
      className={[inconsolata.variable, firaCode.variable].join(" ")}
    >
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
      </body>
    </html>
  );
}
