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
  $maxWidth?: string
  $textAlign?: string
}

export const StyledTag = styled.span<StyledProps>`
  font-family: var(--font-array);
  font-size: ${({ $fontSize }) => $fontSize ?? '1rem'};
  font-weight: ${({ $fontWeight }) => $fontWeight ?? 400};
  color: ${({ $color }) => $color ?? 'var(--color-text)'};
  margin: ${({ $margin }) => $margin ?? '0'};
  line-height: ${({ $lineHeight }) => $lineHeight ?? '1.6'};
  letter-spacing: ${({ $letterSpacing }) => $letterSpacing ?? 'normal'};
  z-index: ${({ $zIndex }) => $zIndex ?? 1};
  text-shadow: ${({ $textShadow }) => $textShadow ?? 'unset'};
  max-width: ${({ $maxWidth }) => $maxWidth ?? 'unset'};
  text-align: ${({ $textAlign }) => $textAlign ?? 'unset'};
  ${({ $gradient }) => $gradient && `
    background: ${$gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `}
`
