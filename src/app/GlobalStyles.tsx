import { createGlobalStyle } from 'styled-components'
import { colors, fonts } from '@/app/utils/theme'

const GlobalStyles = createGlobalStyle`
  :root {
    /* Colors */
    --color-primary: ${colors.primary};
    --color-background: ${colors.background};
    --color-title: ${colors.title};
    --color-text: ${colors.text};
    --color-auxiliar: ${colors.auxiliar};
    --color-auxiliar-light: ${colors.auxiliarLight};
    --color-secondary: ${colors.secondary};

    /* Fonts */
    --font-general-sans: ${fonts.generalSans};
    --font-satoshi: ${fonts.satoshi};
    --font-nippo: ${fonts.nippo};
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
    height: 100vh;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: #fff;
    color: var(--color-text);
    font-family: var(--font-general-sans);
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

export default GlobalStyles
