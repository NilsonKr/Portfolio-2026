import styled from 'styled-components'

export const StyledFooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100%;

  & a:hover {
    text-decoration: underline;
  }
`
