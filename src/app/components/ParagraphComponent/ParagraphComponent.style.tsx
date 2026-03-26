import styled from 'styled-components'

type StyledProps = {
  $fontSize?: string
  $fontWeight?: number | string
  $color?: string
  $lineHeight?: string
  $letterSpacing?: string
  $margin?: string
  $zIndex?: number
  $textShadow?: string
  $gradient?: string
}

export const StyledParagraph = styled.p<StyledProps>`
  font-family: 'Satoshi', sans-serif;
  font-size: ${({ $fontSize }) => $fontSize ?? '1rem'};
  font-weight: ${({ $fontWeight }) => $fontWeight ?? 500};
  color: ${({ $color }) => $color ?? 'var(--color-text)'};
  margin: ${({ $margin }) => $margin ?? '0'};
  line-height: ${({ $lineHeight }) => $lineHeight ?? '1.6'};
  letter-spacing: ${({ $letterSpacing }) => $letterSpacing ?? 'normal'};
  z-index: ${({ $zIndex }) => $zIndex ?? 1};
  text-shadow: ${({ $textShadow }) => $textShadow ?? 'unset'};
  ${({ $gradient }) => $gradient && `
    background: ${$gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `}
`
