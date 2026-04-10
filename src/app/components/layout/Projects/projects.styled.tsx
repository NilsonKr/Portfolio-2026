import styled from 'styled-components'

import TitleComponent from '../../TitleComponent'

import { media } from '@/app/utils/theme'

export const StyledProjectsContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 50px;
  min-height: 900vh;
`

export const StyledStickyContainer = styled.div<{ $inView: boolean }>`
  position: ${({ $inView }) => $inView ? 'fixed' : 'absolute'};
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 20;
`

export const StyledTitleContainer = styled.div`
  width: 320px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: rotate(-90deg);

  & > *:nth-child(1) > h2{
    transform: translate(calc(8vh - 13.3rem));
    background: linear-gradient(to right, #1A1A1A 83.6%, #fff 83.6%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  & > *:nth-child(2) > h2{
    transform: translate(calc(19.25vh + 4rem));
    background: linear-gradient(to right, #1A1A1A 39.9%, #fff 39.9%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  ${media.desktopXl} {
    width: 400px;

    & > *:nth-child(1) > h2{
      transform: translate(calc(10vh - 16.3rem));
    }

    & > *:nth-child(2) > h2{
      transform: translate(calc(19vh + 4.9rem));
    }
  }

  ${media.tablet} {
    display: none;
  }
`

export const StyledTitleComponent = styled(TitleComponent)`
  color: #1A1A1A;
  font-family: var(--font-clash);
  font-size: 9rem;
  font-weight: regular;

  ${media.desktopXl} {
    font-size: 11rem;
  }
`
