'use client'

import { useRef, useContext } from 'react'
import { useScroll, useInView, MotionValue } from 'motion/react'

import { StyledProjectsContainer, StyledStickyContainer, StyledTitleContainer, StyledTitleComponent } from './projects.styled'

import { ContentfulContext } from '../../../context/contentful'

import { withProjectItemAnimation, withProjectsTitleAnimation } from './projects.animated'

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
  1: withProjectItemAnimation(ProjectItem, animatedProjectParams[1]),
  2: withProjectItemAnimation(ProjectItem, animatedProjectParams[2]),
  3: withProjectItemAnimation(ProjectItem, animatedProjectParams[3]),
}


const animatedTitleParams = {
  'first': {
    entranceTrigger: [0.35, 0.55],
    entranceX: ['120%', '0%'],
    exitTrigger: [0, 0.3],
    exitX: ['0%', '120%'],
  },
  'second': {
    entranceTrigger: [0.45, 0.65],
    entranceX: ['-120%', '0%'],
    exitTrigger: [0.05, 0.3],
    exitX: ['0%', '-120%'],
  }
}

const FirstTitleAnimated = withProjectsTitleAnimation(StyledTitleComponent, animatedTitleParams['first'])
const SecondTitleAnimated = withProjectsTitleAnimation(StyledTitleComponent, animatedTitleParams['second'])


type ComponentProps = {
  aboutMeScrollYProgress: MotionValue<number>
  $inView: boolean
}

const Projects: React.FC<ComponentProps> = ({ aboutMeScrollYProgress, $inView }) => {
  const { personalProjects } = useContext(ContentfulContext)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['10% end', 'end end'],
  })

  return (
    <StyledProjectsContainer ref={containerRef}>
      <StyledStickyContainer $inView={$inView}>
        <div style={{ position: 'relative', zIndex: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {!!personalProjects.length && personalProjects.map(project => {
            const AnimatedProjectItem = animatedProjectItems[project.fields.id as keyof typeof animatedProjectItems]

            return <AnimatedProjectItem key={project.fields.id as number} data={project.fields as PersonalProjectData} reverse={project.fields.id === 2} scrollYProgress={scrollYProgress} aboutMeScrollYProgress={aboutMeScrollYProgress} />
          })}
        </div>

        <StyledTitleContainer>
          <FirstTitleAnimated aboutMeScrollYProgress={aboutMeScrollYProgress} scrollYProgress={scrollYProgress}>PERSONAL</FirstTitleAnimated>
          <SecondTitleAnimated aboutMeScrollYProgress={aboutMeScrollYProgress} scrollYProgress={scrollYProgress}>PROJECTS</SecondTitleAnimated>
        </StyledTitleContainer>
      </StyledStickyContainer>
    </StyledProjectsContainer>
  )
}

export default Projects
