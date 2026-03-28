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
}

export const StyledSubtitle = styled.p<StyledProps>`
  font-family: 'Satoshi', sans-serif;
  font-size: ${({ $fontSize }) => $fontSize ?? '2.5rem'};
  font-weight: ${({ $fontWeight }) => $fontWeight ?? 600};
  color: ${({ $color }) => $color ?? 'var(--color-title)'};
  margin: ${({ $margin }) => $margin ?? '0'};
  line-height: ${({ $lineHeight }) => $lineHeight ?? '1.5'};
  letter-spacing: ${({ $letterSpacing }) => $letterSpacing ?? 'normal'};
  z-index: ${({ $zIndex }) => $zIndex ?? 1};
  text-shadow: ${({ $textShadow }) => $textShadow ?? 'unset'};
`
