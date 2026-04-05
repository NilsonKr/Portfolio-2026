import styled from 'styled-components'

export const StyledContainer = styled.div<{ background: string }>`
  height: 100%;
  background: ${({ background }) => background};
`
