'use client'

import { useRef, useContext } from 'react'

import { StyledExperiencesContainer, StyledStickyContainer, StyledTitleWrapper, StyledExperiencesList } from "./experiences.styled"

import { ContentfulContext } from '../../../context/contentful'

import { ExperienceData } from '@/app/types/data'

import withExperiencesTitleAnimationHOC from '../../HOC/ExperiencesTitleAnimated'

import TitleComponent from "../../TitleComponent"
import ExperienceItem from './ExperienceItem'
import FlexContainer from '../../FlexContainer'

const TitleAnimated = withExperiencesTitleAnimationHOC(TitleComponent)

const Experiences = () => {
  const { experiences } = useContext(ContentfulContext)
  const containerRef = useRef<HTMLDivElement>(null)

  console.log(experiences)

  return (
    <StyledExperiencesContainer ref={containerRef}>
      <StyledStickyContainer>
        <StyledTitleWrapper>
          {/* <TitleAnimated containerRef={containerRef} margin='20px 0 0' fontSize='3rem' textShadow='0px 10px 20px rgba(0, 0, 0, 0.4)' gradient='radial-gradient( circle farthest-corner at 32.7% 82.7%, rgba(173,0,171,1) 8.3%, #340f5c 79.4% )'>
            Professional Experiences
          </TitleAnimated> */}
        </StyledTitleWrapper>
        <StyledExperiencesList >
          {!!experiences.length && experiences.map(exp => <ExperienceItem key={exp.fields.id as number} main={exp.fields.id === 1} data={exp.fields as ExperienceData} />)}
        </StyledExperiencesList>
      </StyledStickyContainer>
    </StyledExperiencesContainer>
  )
}

export default Experiences