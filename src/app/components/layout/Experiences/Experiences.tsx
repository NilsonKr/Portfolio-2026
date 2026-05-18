'use client'

import type { MotionValue } from 'motion/react'

import { StyledExperiencesContainer, StyledStickyContainer, StyledTopTitle, StyledBottomTitle, StyledExperiencesList } from "./experiences.styled"

import { ExperienceData } from '@/app/types/data'

import withExperiencesTitleAnimationHOC from '../../HOC/ExperiencesTitleAnimated'
import withExperienceItemAnimationHOC from '../../HOC/ExperienceItemAnimated'

import ExperienceItem from './ExperienceItem'

import { TypeExperiences } from '@/app/types/contentful'

const TopTitleAnimated = withExperiencesTitleAnimationHOC(StyledTopTitle, {
  xTrigger: [0.35, 0.45],
  xValues: ['150%', '0%'],
  scaleYTrigger: [0.8, 0.9],
  scaleYValues: [2.5, 0],
  transformOrigin: 'top',
})

const BottomTitleAnimated = withExperiencesTitleAnimationHOC(StyledBottomTitle, {
  xTrigger: [0.5, 0.65],
  xValues: ['-150%', '0%'],
  scaleYTrigger: [0.9, 1],
  scaleYValues: [1.5, 0],
  transformOrigin: 'bottom',
})

const animatedExperiences = {
  1: withExperienceItemAnimationHOC(ExperienceItem, {
    yTrigger: [0, 0.1],
    yValues: [-120, 0],
    opacityTrigger: [0, 0.1],
    opacityValues: [0, 1],
  }),
  2: withExperienceItemAnimationHOC(ExperienceItem, {
    yTrigger: [0.1, 0.2],
    yValues: [280, 160],
    opacityTrigger: [0.1, 0.2],
    opacityValues: [0, 1],
  }),
  3: withExperienceItemAnimationHOC(ExperienceItem, {
    yTrigger: [0.2, 0.3],
    yValues: [160, 280],
    opacityTrigger: [0.2, 0.3],
    opacityValues: [0, 1],
  }),
}

type ComponentProps = {
  experiences: TypeExperiences[]
  containerRef: React.RefObject<HTMLDivElement | null>
  scrollYProgress: MotionValue<number>
}

const Experiences: React.FC<ComponentProps> = ({ experiences, containerRef, scrollYProgress }) => {
  return (
    <StyledExperiencesContainer ref={containerRef}>
      <StyledStickyContainer>
        <TopTitleAnimated scrollYProgress={scrollYProgress}>PROFESSIONAL</TopTitleAnimated>
        <BottomTitleAnimated scrollYProgress={scrollYProgress}>EXPERIENCE</BottomTitleAnimated>

        <StyledExperiencesList>
          {!!experiences.length && experiences.map(exp => {
            const id = exp.fields.id
            const ExperienceItemAnimated = animatedExperiences[id as keyof typeof animatedExperiences]

            return <ExperienceItemAnimated key={exp.fields.id as number} scrollYProgress={scrollYProgress} main={id === 1} data={exp.fields as ExperienceData} />
          })}
        </StyledExperiencesList>
      </StyledStickyContainer>
    </StyledExperiencesContainer>
  )
}

export default Experiences
