import type { Metadata } from 'next'
import StyledComponentsRegistry from '@/app/layouts/StyledComponentsRegistry'
import ContentfulProvider from '@/app/context/contentful'
import GlobalStyles from '@/app/GlobalStyles'
import { generalSans, satoshi, clashDisplay, array } from '@/app/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/contentful`)
  const data = await res.json()

  return (
    <html lang="en" className={`${generalSans.variable} ${satoshi.variable} ${clashDisplay.variable} ${array.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <ContentfulProvider data={data}>
            <GlobalStyles />
            {children}
          </ContentfulProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
