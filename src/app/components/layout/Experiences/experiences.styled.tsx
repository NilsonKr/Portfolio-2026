import styled from 'styled-components'

import FlexContainer from '../../FlexContainer'
import SubtitleComponent from '../../SubtitleComponent'

import { media } from '@/app/utils/theme'

export const StyledExperiencesContainer = styled.div`
  width: 100%;
  padding-top: 50px;
  min-height: 1500vh;

  ${media.tablet} {
    min-height: auto;
    padding-top: 30px;
    overflow-x: clip;
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
    overflow: hidden;
    padding: 20px 18px 60px;
  }
`

export const StyledTopTitle = styled(SubtitleComponent)`
  position: absolute;
  top: -100px;
  right: 0;
  font-size: 7rem;
  font-family: var(--font-clash);
  line-height: 1;
  opacity: 0.1;

  ${media.desktopXl} {
    font-size: 12rem;
    top: -130px;
  }

  ${media.laptop} {
    font-size: 5rem;
    top: -60px;
  }

  ${media.tablet} {
    font-size: clamp(2rem, 11vw, 3.2rem);
    top: -10px;
    right: 10px;
    white-space: nowrap;
  }
`

export const StyledBottomTitle = styled(SubtitleComponent)`
  position: absolute;
  bottom: -60px;
  left: 0;
  font-size: 7rem;
  font-family: var(--font-clash);
  line-height: 1;
  opacity: 0.5;

  ${media.desktopXl} {
    font-size: 12rem;
    bottom: -80px;
  }

  ${media.laptop} {
    font-size: 5rem;
    bottom: -40px;
  }

  ${media.tablet} {
    font-size: clamp(2rem, 11vw, 3.2rem);
    bottom: 10px;
    left: 10px;
    opacity: 0.35;
    white-space: nowrap;
  }
`

export const StyledExperiencesList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  padding: 20px 0;

  & > *:nth-child(2) {
    transform: translateY(160px);
  }

    & > *:nth-child(3) {
    transform: translateY(280px);
  }

  ${media.tablet} {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;
    padding: 60px 0 20px;

    & > * {
      transform: none !important;
      opacity: 1 !important;
      width: 100%;
    }
  }
`