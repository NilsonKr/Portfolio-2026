export const colors = {
  background: '#FDECC0',
  title: '#1A1A1A',
  text: '#5C5C5C',
  auxiliar: '#FF6B6B',
  auxiliarLight: '#FFA69E',
  secondary: '#B7E8D6',
} as const

export const fonts = {
  generalSans: "'General Sans', sans-serif",
  satoshi: "'Satoshi', sans-serif",
  zina: "'Zina', serif",
  array: "'Array', sans-serif",
} as const

export type Colors = typeof colors
export type Fonts = typeof fonts
