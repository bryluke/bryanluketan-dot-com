import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"

import "@/src/styles/globals.css";
import { inconsolata, firaCode } from "@/src/styles/fonts";



export const metadata: Metadata = {
  title: "Bryan Luke Tan",
  description: "Developing products of craft and purpose; building meaning with each block.",
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
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
