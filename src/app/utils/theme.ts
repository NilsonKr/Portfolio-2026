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
  generalSans: "'General Sans', sans-serif",
  satoshi: "'Satoshi', sans-serif",
  nippo: "'Nippo', serif",
  array: "'Array', sans-serif",
} as const

export type Colors = typeof colors
export type Fonts = typeof fonts
