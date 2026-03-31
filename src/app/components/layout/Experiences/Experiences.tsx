'use client'

import { useRef } from 'react'

import { StyledExperiencesContainer, StyledStickyContainer, StyledTitleWrapper } from "./experiences.styled"

import withExperiencesTitleAnimationHOC from '../../HOC/ExperiencesTitleAnimated'

import TitleComponent from "../../TitleComponent"

const TitleAnimated = withExperiencesTitleAnimationHOC(TitleComponent)

const Experiences = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <StyledExperiencesContainer ref={containerRef}>
      <StyledStickyContainer>
        <StyledTitleWrapper>
          <TitleAnimated containerRef={containerRef} margin='20px 0 0' fontSize='3rem' textShadow='0px 10px 20px rgba(0, 0, 0, 0.4)' gradient='radial-gradient( circle farthest-corner at 32.7% 82.7%, rgba(173,0,171,1) 8.3%, #340f5c 79.4% )'>
            Professional Experiences
          </TitleAnimated>
        </StyledTitleWrapper>
      </StyledStickyContainer>
    </StyledExperiencesContainer>
  )
}

export default Experiences