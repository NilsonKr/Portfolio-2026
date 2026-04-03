import styled from 'styled-components'

import FlexContainer from '../../FlexContainer'

export const StyledExperiencesContainer = styled.div`
  width: 100%;
  padding-top: 50px;
  min-height: 300vh;
`

export const StyledStickyContainer = styled.div`                                
  position: sticky;                                                           
  top: 0;                                                                     
  height: 100vh;                                                              
  overflow: hidden;                                                           
`

export const StyledTitleWrapper = styled.div`
  perspective: 1200px;
  display: flex;
  justify-content: center;
`

export const StyledExperiencesList = styled.div`
  perspective: 1200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  row-gap: 40px;

  & > *:first-child {
    grid-column: 1 / -1;
  }
`