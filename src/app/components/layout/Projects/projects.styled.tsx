import styled from 'styled-components'

import TitleComponent from '../../TitleComponent'

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
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: rotate(-90deg);
  
  & > *:nth-child(1) > h2{
    transform: translate(-155px);
    background: linear-gradient(to right, #1A1A1A 83.6%, #fff 83.6%);
    /* background: linear-gradient(to left, #1A1A1A 45.5%, #fff 45.5%); */
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  & > *:nth-child(2) > h2{
    transform: translate(200px);
    background: linear-gradient(to right, #1A1A1A 39.9%, #fff 39.9%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`

export const StyledTitleComponent = styled(TitleComponent)`
  color: #1A1A1A;
  font-family: var(--font-clash);
  font-size: 9rem;
  font-weight: regular;
`
