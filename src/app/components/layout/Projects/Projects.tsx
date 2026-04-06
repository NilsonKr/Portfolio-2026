'use client'

import { useRef, useContext } from 'react'
import { useScroll, MotionValue } from 'motion/react'

import { StyledProjectsContainer, StyledStickyContainer, StyledTitleContainer, StyledTitleComponent } from './projects.styled'

import { ContentfulContext } from '../../../context/contentful'

import withProjectItemAnimationHOC from '../../HOC/ProjectItemAnimated'

import ProjectItem from './ProjectItem'

import { PersonalProjectData } from '@/app/types/data'

const animatedProjectParams = {
  1: {
    entranceTrigger: [0, 0.4],
    entranceX: ['100%', '0%'],
    exitTrigger: [0.15, 0.7],
    exitX: ['0%', '-100%'],
    exitScaleTrigger: [0.1, 0.3],
    exitScale: [1, 0.8]
  },
  2: {
    entranceTrigger: [0.05, 0.4],
    entranceX: ['-100%', '0%'],
    exitTrigger: [0.1, 0.7],
    exitX: ['0%', '100%'],
    exitScaleTrigger: [0.1, 0.3],
    exitScale: [1, 0.8]
  },
  3: {
    entranceTrigger: [0.1, 0.4],
    entranceX: ['100%', '0%'],
    exitTrigger: [0.05, 0.7],
    exitX: ['0%', '-100%'],
    exitScaleTrigger: [0.1, 0.3],
    exitScale: [1, 0.8]
  }
}

const animatedProjectItems = {
  1: withProjectItemAnimationHOC(ProjectItem, animatedProjectParams[1]),
  2: withProjectItemAnimationHOC(ProjectItem, animatedProjectParams[2]),
  3: withProjectItemAnimationHOC(ProjectItem, animatedProjectParams[3]),

}

type ComponentProps = {
  aboutMeScrollYProgress: MotionValue<number>
}

const Projects: React.FC<ComponentProps> = ({ aboutMeScrollYProgress }) => {
  const { personalProjects } = useContext(ContentfulContext)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['25% end', 'end end'],
  })

  return (
    <StyledProjectsContainer ref={containerRef}>
      <StyledStickyContainer>
        <div style={{ position: 'relative', zIndex: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {!!personalProjects.length && personalProjects.map(project => {
            const AnimatedProjectItem = animatedProjectItems[project.fields.id as keyof typeof animatedProjectItems]

            return <AnimatedProjectItem key={project.fields.id as number} data={project.fields as PersonalProjectData} scrollYProgress={scrollYProgress} aboutMeScrollYProgress={aboutMeScrollYProgress} />
          })}
        </div>

        <StyledTitleContainer>
          <StyledTitleComponent>PERSONAL</StyledTitleComponent>
          <StyledTitleComponent>PROJECTS</StyledTitleComponent>
        </StyledTitleContainer>
      </StyledStickyContainer>
    </StyledProjectsContainer>
  )
}

export default Projects
