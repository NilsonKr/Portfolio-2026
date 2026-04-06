import styled from 'styled-components'

type StyledHighlightProps = {
  $color: string
}

export const StyledHighlight = styled.span<StyledHighlightProps>`
  color: ${({ $color }) => $color};
`
