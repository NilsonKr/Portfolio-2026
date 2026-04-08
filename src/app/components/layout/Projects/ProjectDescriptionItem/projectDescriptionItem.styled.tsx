import Image from 'next/image'
import styled from 'styled-components'

import { media } from '@/app/utils/theme'

export const StyledRoot = styled.div<{ $reverse?: boolean }>`
  display: flex;
  align-items: center;
  gap: 40px;
  flex-direction: ${({ $reverse }) => ($reverse ? 'row-reverse' : 'row')};

  ${media.tablet} {
    gap: 16px;
    padding: 0 14px;
  }
`

export const StyledContainer = styled.div`
  max-width: 500px;

  ${media.tablet} {
    max-width: 100%;
  }
`

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  ${media.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`

export const StyledShowcaseImage = styled(Image)`
  border-radius: 12px;

  ${media.tablet} {
    width: 140px;
    height: auto;
  }
`

export const StyledLinks = styled.div<{ $background: string; $filter: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  filter: ${({ $filter }) => $filter};

  & > a {
    text-decoration: none;
    font-family: var(--font-satoshi);
    font-size: clamp(0.7rem, 1.4vw, 0.9rem);
  }

  & > a:hover {
    background: ${({ $background }) => $background};
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  ${media.tablet} {
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 6px;

    & > svg {
      width: 16px;
      height: 16px;
    }
  }
`
