export const colors = {
  primary: '#FDECC0',
  title: '#1A1A1A',
  text: '#5C5C5C',
  auxiliar: '#FF6B6B',
  auxiliarLight: '#FFA69E',
  secondary: '#B7E8D6',
  background:
    'linear-gradient(180deg,rgba(255, 255, 255, 1) 0%, rgba(253, 236, 192, 1) 50%)',
} as const

export const fonts = {
  generalSans: 'var(--font-general-sans), sans-serif',
  satoshi: 'var(--font-satoshi), sans-serif',
  clash: 'var(--font-clash), serif',
  array: 'var(--font-array), sans-serif',
} as const

export const breakpoints = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  desktopXl: 1920,
} as const

export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile}px)`,
  tablet: `@media (max-width: ${breakpoints.tablet}px)`,
  laptop: `@media (max-width: ${breakpoints.laptop}px)`,
  desktop: `@media (max-width: ${breakpoints.desktop}px)`,
  desktopXl: `@media (min-width: ${breakpoints.desktopXl}px)`,
} as const

export type Colors = typeof colors
export type Fonts = typeof fonts
export type Breakpoints = typeof breakpoints
