import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/next"
import StyledComponentsRegistry from '@/app/layouts/StyledComponentsRegistry'

import GlobalStyles from '@/app/GlobalStyles'
import { generalSans, satoshi, clashDisplay, array } from '@/app/fonts'

import ContentfulProvider from '@/app/context/contentful'

import './globals.css'

export const metadata: Metadata = {
  title: 'Nilson Diaz',
  description: 'Nilson Diaz personal portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${generalSans.variable} ${satoshi.variable} ${clashDisplay.variable} ${array.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.ctfassets.net" />
        <link rel="preconnect" href="https://cdn.contentful.com" />
      </head>

      <body>
        <StyledComponentsRegistry>
          <ContentfulProvider>
            <SpeedInsights />
            <Analytics />
            <GlobalStyles />
            {children}
          </ContentfulProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
