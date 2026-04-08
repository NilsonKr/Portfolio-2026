import styled from 'styled-components'

import { media } from '@/app/utils/theme'

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

  ${media.tablet} {
    flex-direction: column;
    gap: 8px;
    padding: 0 20px;
    margin-bottom: 12px;
    text-align: center;
  }
`
