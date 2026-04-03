'use client'

import { useRef, useContext, JSX } from 'react'

import { StyledExperiencesContainer, StyledStickyContainer, StyledTitleWrapper, StyledExperiencesList } from "./experiences.styled"

import { ContentfulContext } from '../../../context/contentful'

import { ExperienceData } from '@/app/types/data'

import withExperiencesTitleAnimationHOC from '../../HOC/ExperiencesTitleAnimated'
import withExperienceItemAnimationHOC from '../../HOC/ExperienceItemAnimated'

import TitleComponent from "../../TitleComponent"
import ExperienceItem from './ExperienceItem'
import FlexContainer from '../../FlexContainer'

const TitleAnimated = withExperiencesTitleAnimationHOC(TitleComponent)


const Experiences = () => {
  const { experiences } = useContext(ContentfulContext)
  const containerRef = useRef<HTMLDivElement>(null)

  const getExperienceItemAnimated = (isMain: boolean) => {
    const ExperienceItemAnimated = withExperienceItemAnimationHOC(ExperienceItem, isMain)


    return ExperienceItemAnimated
  }

  return (
    <StyledExperiencesContainer ref={containerRef}>
      <StyledStickyContainer>
        <StyledTitleWrapper>
          <TitleAnimated containerRef={containerRef} margin='15px 0 0' fontSize='2.9rem' textShadow='0px 8px 14px rgba(0, 0, 0, 0.3)' gradient='radial-gradient( circle farthest-corner at 32.7% 82.7%, rgba(173,0,171,1) 8.3%, #340f5c 79.4% )'>
            Professional Experience
          </TitleAnimated>
        </StyledTitleWrapper>
        <StyledExperiencesList >
          {!!experiences.length && experiences.map(exp => {
            const isMain = exp.fields.id == 1
            const ExperienceItemAnimated = getExperienceItemAnimated(isMain)

            return <ExperienceItemAnimated key={exp.fields.id as number} containerRef={containerRef} main={isMain} data={exp.fields as ExperienceData} />
          })}
        </StyledExperiencesList>
      </StyledStickyContainer>
    </StyledExperiencesContainer>
  )
}

export default Experiences