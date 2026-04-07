import styled from 'styled-components'

type StyledProps = {
  $fontSize?: string
  $fontWeight?: number | string
  $color?: string
  $lineHeight?: string
  $letterSpacing?: string
  $margin?: string
  $maxWidth?: string
  $zIndex?: number
  $textShadow?: string
  $gradient?: string
  $fontFamily?: string
}

export const StyledSubtitle = styled.h2<StyledProps>`
  font-family: ${({ $fontFamily }) => $fontFamily ?? 'var(--font-satoshi)'};
  font-size: ${({ $fontSize }) => $fontSize ?? '2.5rem'};
  font-weight: ${({ $fontWeight }) => $fontWeight ?? 600};
  color: ${({ $color }) => $color ?? 'var(--color-title)'};
  margin: ${({ $margin }) => $margin ?? '0'};
  line-height: ${({ $lineHeight }) => $lineHeight ?? '1.5'};
  letter-spacing: ${({ $letterSpacing }) => $letterSpacing ?? 'normal'};
  max-width: ${({ $maxWidth }) => $maxWidth ?? 'unset'};
  z-index: ${({ $zIndex }) => $zIndex ?? 1};
  text-shadow: ${({ $textShadow }) => $textShadow ?? 'unset'};
  ${({ $gradient }) => $gradient && `
    background: ${$gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `}
`
