import { createGlobalStyle } from 'styled-components'
import { colors, fonts } from '@/app/utils/theme'

const GlobalStyles = createGlobalStyle`
  :root {
    /* Colors */
    --color-background: ${colors.background};
    --color-title: ${colors.title};
    --color-text: ${colors.text};
    --color-auxiliar: ${colors.auxiliar};
    --color-auxiliar-light: ${colors.auxiliarLight};
    --color-secondary: ${colors.secondary};

    /* Fonts */
    --font-general-sans: ${fonts.generalSans};
    --font-satoshi: ${fonts.satoshi};
    --font-zina: ${fonts.zina};
    --font-array: ${fonts.array};
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: var(--color-background);
    color: var(--color-text);
    font-family: var(--font-general-sans);
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

export default GlobalStyles
