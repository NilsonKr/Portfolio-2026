import { MotionValue } from 'motion/react'

import { StyledContainer } from './projectItem.styled'

import { withProjectDescriptionAnimation } from '../ProjectDescriptionItem/projectDescriptionItem.animated'
import ProjectDescriptionItem from '../ProjectDescriptionItem'

import { PersonalProjectData } from '@/app/types/data'

type ComponentProps = {
  data: PersonalProjectData
  reverse?: boolean
  scrollYProgress?: MotionValue<number>
  aboutMeScrollYProgress?: MotionValue<number>
}

const animatedDescriptionParams = {
  1: {
    entranceTrigger: [0.5, 0.55],
    entranceX: ['30%', '0%'],
    exitTrigger: [0.85, 0.88],
    exitX: ['0%', '80%'],
  },
  2: {
    entranceTrigger: [0.6, 0.65],
    entranceX: ['-30%', '0%'],
    exitTrigger: [0.9, 0.93],
    exitX: ['0%', '-80%'],
  },
  3: {
    entranceTrigger: [0.7, 0.75],
    entranceX: ['30%', '0%'],
    exitTrigger: [0.95, 0.98],
    exitX: ['0%', '80%'],
  },
}

const animatedDescriptionItems = {
  1: withProjectDescriptionAnimation(ProjectDescriptionItem, animatedDescriptionParams[1]),
  2: withProjectDescriptionAnimation(ProjectDescriptionItem, animatedDescriptionParams[2]),
  3: withProjectDescriptionAnimation(ProjectDescriptionItem, animatedDescriptionParams[3]),
}

const ProjectItem: React.FC<ComponentProps> = ({ data, reverse, scrollYProgress }) => {
  const { id, color } = data
  const AnimatedDescription = animatedDescriptionItems[id as keyof typeof animatedDescriptionItems]

  return (
    <StyledContainer background={color as string}>
      {scrollYProgress && (
        <AnimatedDescription data={data} reverse={reverse} scrollYProgress={scrollYProgress} />
      )}
    </StyledContainer>
  )
}

export default ProjectItem
