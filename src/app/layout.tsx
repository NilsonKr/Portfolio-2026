import type { Metadata } from 'next'
import StyledComponentsRegistry from '@/app/layouts/StyledComponentsRegistry'
import ContentfulProvider from '@/app/context/contentful'
import GlobalStyles from '@/app/GlobalStyles'
import { generalSans, satoshi, clashDisplay, array } from '@/app/fonts'
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
            <GlobalStyles />
            {children}
          </ContentfulProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
