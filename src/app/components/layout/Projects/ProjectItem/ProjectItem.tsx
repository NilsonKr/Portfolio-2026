import { MotionValue } from 'motion/react'

import { StyledContainer } from './projectItem.styled'

import ProjectDescriptionItem from '../ProjectDescriptionItem'

import { PersonalProjectData } from '@/app/types/data'

type ComponentProps = {
  data: PersonalProjectData
  reverse?: boolean
  scrollYProgress?: MotionValue<number>
  aboutMeScrollYProgress?: MotionValue<number>
}

const ProjectItem: React.FC<ComponentProps> = ({ data, reverse, scrollYProgress, aboutMeScrollYProgress }) => {
  const { color } = data

  return (
    <StyledContainer background={color as string}>
      <ProjectDescriptionItem data={data} reverse={reverse} />
    </StyledContainer>
  )
}

export default ProjectItem
