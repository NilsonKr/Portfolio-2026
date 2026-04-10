import styled from 'styled-components'

export const StyledContainer = styled.div<{ $background: string }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  padding-right: 12px;
  background: ${({ $background }) => $background};
`
