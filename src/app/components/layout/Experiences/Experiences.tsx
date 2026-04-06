'use client'

import { useRef, useContext } from 'react'

import { useScroll } from 'motion/react'

import { StyledExperiencesContainer, StyledStickyContainer, StyledTopTitle, StyledBottomTitle, StyledExperiencesList } from "./experiences.styled"

import { ContentfulContext } from '../../../context/contentful'

import { ExperienceData } from '@/app/types/data'

import withExperiencesTitleAnimationHOC from '../../HOC/ExperiencesTitleAnimated'
import withExperienceItemAnimationHOC from '../../HOC/ExperienceItemAnimated'

import TitleComponent from "../../TitleComponent"
import ExperienceItem from './ExperienceItem'

const TitleAnimated = withExperiencesTitleAnimationHOC(TitleComponent)
const ExperienceItemAnimatedMain = withExperienceItemAnimationHOC(ExperienceItem, true)
const ExperienceItemAnimatedAlt = withExperienceItemAnimationHOC(ExperienceItem, false)

const Experiences = () => {
  const { experiences } = useContext(ContentfulContext)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['25% end', 'end end'],
  })

  return (
    <StyledExperiencesContainer ref={containerRef}>
      <StyledStickyContainer>
        <StyledTopTitle>PROFESSIONAL</StyledTopTitle>
        <StyledBottomTitle>EXPERIENCE</StyledBottomTitle>

        <StyledExperiencesList>
          {!!experiences.length && experiences.map(exp => {
            const isMain = exp.fields.id == 1
            // const ExperienceItemAnimated = isMain ? ExperienceItemAnimatedMain : ExperienceItemAnimatedAlt

            return <ExperienceItem key={exp.fields.id as number} scrollYProgress={scrollYProgress} main={isMain} data={exp.fields as ExperienceData} />
          })}
        </StyledExperiencesList>
      </StyledStickyContainer>
    </StyledExperiencesContainer>
  )
}

export default Experiences
