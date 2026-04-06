import styled from 'styled-components'

import FlexContainer from '../../FlexContainer'
import SubtitleComponent from '../../SubtitleComponent'

export const StyledExperiencesContainer = styled.div`
  width: 100%;
  padding-top: 50px;
  min-height: 1500vh;
`

export const StyledStickyContainer = styled.div`                                
  position: sticky;                                                           
  top: 0;                                                                     
  height: 100vh;                                                              
  overflow: hidden;                                                           
`

export const StyledTopTitle = styled(SubtitleComponent)`
  position: absolute;
  top: -100px;
  right: 0;
  font-size: 7rem;
  font-family: var(--font-clash);
  line-height: 1;
  opacity: 0.1;
`

export const StyledBottomTitle = styled(SubtitleComponent)`
  position: absolute;
  bottom: -60px;
  left: 0;
  font-size: 7rem;
  font-family: var(--font-clash);
  line-height: 1;
  opacity: 0.5;
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
`