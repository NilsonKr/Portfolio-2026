import type { Metadata } from 'next'
import StyledComponentsRegistry from '@/app/layouts/StyledComponentsRegistry'
import ContentfulProvider from '@/app/context/contentful'
import GlobalStyles from '@/app/GlobalStyles'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=satoshi@400,500,700&f[]=zina@400&f[]=array@400&display=swap"
        />
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
