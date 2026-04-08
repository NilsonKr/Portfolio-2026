import styled from 'styled-components'

import { media } from '@/app/utils/theme'

export const StyledSaluteHand = styled.span`
  position: absolute;
  top: -16px;
  right: 2px;
  font-size: 1.5rem;
  display: inline-block;
  transform-origin: bottom center;
  z-index: -1;
`

export const StyledAboutMeContainer = styled.div`
  width: 100%;
  min-height: 200vh;

  ${media.tablet} {
    min-height: auto;
  }
`

export const StyledStickyContainer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;

  ${media.tablet} {
    position: relative;
    height: auto;
    overflow: visible;
    padding: 60px 20px;
  }
`

export const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  align-items: center;
  height: 100%;
  max-width: 900px;
  margin: 0 auto;

  & > *:nth-child(1) {
    grid-column: 1;
    grid-row: 1;
    justify-self: center;
    align-self: end;
  }

  & > *:nth-child(2) {
    grid-column: 2;
    grid-row: 1 / span 2;
  }

  & > *:nth-child(3) {
    grid-column: 1;
    grid-row: 2;
    justify-self:  center;
    align-self: start;
  }

  ${media.tablet} {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    max-width: 100%;
    padding-bottom: 60px;

    & > * {
      transform: none !important;
      opacity: 1 !important;
      border-radius: 0 !important;
      scale: 1 !important;
      width: auto;
      max-width: 100%;
    }

    & > *:nth-child(1) { 
      order: 1; 
      align-self: center;
    }
    & > *:nth-child(2) { order: 2; }
    & > *:nth-child(3) { 
      order: 3; 
      align-self: center;
    }
  }
`
