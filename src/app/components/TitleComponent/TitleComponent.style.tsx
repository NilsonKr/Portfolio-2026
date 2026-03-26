import styled from 'styled-components'

type StyledProps = {
  $fontSize?: string
  $fontWeight?: number | string
  $fontFamily?: string
  $color?: string
  $lineHeight?: string
  $letterSpacing?: string
  $margin?: string
  $textShadow?: string
  $zIndex?: number
  $gradient?: string
}

export const StyledTitle = styled.h2<StyledProps>`
  font-family: ${({ $fontFamily }) => $fontFamily ?? 'GeneralSans, sans-serif'};
  font-size: ${({ $fontSize }) => $fontSize ?? '4rem'};
  font-weight: ${({ $fontWeight }) => $fontWeight ?? 800};
  color: ${({ $color }) => $color ?? 'var(--color-title)'};
  margin: ${({ $margin }) => $margin ?? '0'};
  line-height: ${({ $lineHeight }) => $lineHeight ?? '1.1'};
  letter-spacing: ${({ $letterSpacing }) => $letterSpacing ?? 'normal'};
  text-shadow: ${({ $textShadow }) => $textShadow ?? 'unset'};
  z-index: ${({ $zIndex }) => $zIndex ?? 1};
  ${({ $gradient }) => $gradient && `
    background: ${$gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `}
`
