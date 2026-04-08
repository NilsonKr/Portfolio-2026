import styled from 'styled-components'

import { media } from '@/app/utils/theme'

type StyledProps = {
  main?: boolean
}


export const StyledContainer = styled.div<StyledProps>`
  position: relative;
  max-width: 350px;

  ${media.tablet} {
    max-width: 100%;
    width: 100%;
    padding: 0 4px;
  }
`

export const StyledYear = styled.span<StyledProps>`
  font-size: 2rem;
  font-weight: 700;
  font-family: var(--font-general-sans);
  margin-left: 5px;

  ${media.tablet} {
    font-size: 1.6rem;
  }
`

export const StyledDateRangeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  width: 100%;
  margin-bottom: 30px;

  ${media.tablet} {
    margin-bottom: 18px;
  }
`

export const StyledOrbBackground = styled.div<{ background: string }>`
  position: absolute;
  top: 120px;
  left: 50px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background-image: ${({ background }) => background};
  filter: blur(48px);
  opacity: 0.3;
  z-index: -1;

  ${media.tablet} {
    top: 60px;
    left: 50%;
    width: 240px;
    height: 240px;
    transform: translateX(-50%) !important;
    opacity: 0.35 !important;
  }
`