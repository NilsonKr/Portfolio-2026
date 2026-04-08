import localFont from 'next/font/local'

export const generalSans = localFont({
  src: './fonts/generalSans/GeneralSans-Variable.woff2',
  variable: '--font-general-sans',
  display: 'swap',
  weight: '400 700',
})

export const satoshi = localFont({
  src: './fonts/satoshi/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  display: 'swap',
  weight: '400 700',
})

export const clashDisplay = localFont({
  src: './fonts/clashDisplay/ClashDisplay-Variable.woff2',
  variable: '--font-clash',
  display: 'swap',
  weight: '400 700',
})

export const array = localFont({
  src: './fonts/array/Array-Regular.woff2',
  variable: '--font-array',
  display: 'swap',
  weight: '400',
})
