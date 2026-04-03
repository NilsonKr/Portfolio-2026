import { MotionValue } from 'motion/react'

import { StyledContainer } from './projectItem.styled'

import { PersonalProjectData } from '@/app/types/data'

type ComponentProps = {
  data: PersonalProjectData
  scrollYProgress?: MotionValue<number>
}

const ProjectItem: React.FC<ComponentProps> = ({ data, scrollYProgress }) => {
  const { name, description, stack, links } = data

  return (
    <StyledContainer>
    </StyledContainer>
  )
}

export default ProjectItem
