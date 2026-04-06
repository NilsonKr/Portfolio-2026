import { StyledContainer, StyledShowcaseImage, StyledTechStack } from './projectDescriptionItem.styled'

import SubtitleComponent from '@/app/components/SubtitleComponent'
import ParagraphComponent from '@/app/components/ParagraphComponent'
import FlexContainer from '@/app/components/FlexContainer'

import { PersonalProjectData } from '@/app/types/data'

type ComponentProps = {
  data: PersonalProjectData
  reverse?: boolean
}

const ProjectDescriptionItem: React.FC<ComponentProps> = ({ data, reverse }) => {
  const { name, description, showcase, stack } = data
  const showcaseUrl = showcase?.[0]?.fields?.file?.url

  return (
    <FlexContainer gap='40px' align='center' direction={reverse ? 'row-reverse' : 'row'}>
      {showcaseUrl && (
        <StyledShowcaseImage
          src={`https:${showcaseUrl}`}
          alt={showcase![0]?.fields?.title ?? name ?? ''}
          width={300}
          height={200}
          priority
        />
      )}
      <StyledContainer>
        <SubtitleComponent fontSize='2rem'>
          {name}
        </SubtitleComponent>

        <ParagraphComponent fontSize='0.9rem' fontWeight={500} margin='10px 0 0' textShadow='0 3px 5px rgba(0,0,0,0.15)'>
          {description}
        </ParagraphComponent>

        <StyledTechStack background='radial-gradient( circle farthest-corner at 10% 20%, rgba(255,94,247,1) 17.8%, rgba(2,245,255,1) 100.2% )'>
          {stack?.join(' ')}
        </StyledTechStack>
      </StyledContainer>
    </FlexContainer>
  )
}

export default ProjectDescriptionItem
