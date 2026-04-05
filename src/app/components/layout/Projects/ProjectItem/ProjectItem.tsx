import { MotionValue } from 'motion/react'

import { StyledContainer } from './projectItem.styled'

import { PersonalProjectData } from '@/app/types/data'

type ComponentProps = {
  data: PersonalProjectData
  scrollYProgress?: MotionValue<number>
  aboutMeScrollYProgress?: MotionValue<number>
}

const ProjectItem: React.FC<ComponentProps> = ({ data, scrollYProgress, aboutMeScrollYProgress }) => {
  const { name, description, stack, links, color } = data

  return (
    <StyledContainer background={color as string}>
    </StyledContainer>
  )
}

export default ProjectItem
