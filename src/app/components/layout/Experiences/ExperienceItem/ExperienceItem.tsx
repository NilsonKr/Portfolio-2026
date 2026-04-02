import { StyledContainer, StyledTechStack } from './experienceItem.styled'

import SubtitleComponent from '@/app/components/SubtitleComponent'
import ParagraphComponent from '@/app/components/ParagraphComponent'
import FlexContainer from '@/app/components/FlexContainer'

import { ExperienceData } from '@/app/types/data'

type ComponentProps = {
  data: ExperienceData
  main?: boolean
}

const ExperienceItem: React.FC<ComponentProps> = ({ data, main }) => {
  const { id, company, role, description, beginDate, endDate, stack } = data

  const fromDate = new Date(beginDate as string)
  const toDate = new Date(endDate as string)

  const fromDateDisplay = `${fromDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })}`
  const toDateDisplay = `${toDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })}`

  return (
    <StyledContainer>
      <FlexContainer justify='space-between' align='center' padding='0 30px 0 0'>
        <SubtitleComponent fontSize={main ? '2rem' : '1.8rem'} >
          {company}
        </SubtitleComponent>

        <ParagraphComponent fontSize='0.85rem' fontWeight={800} textShadow='0 2px 3px rgba(0,0,0,0.2)'>
          {`${fromDateDisplay} - ${toDateDisplay}`}
        </ParagraphComponent>
      </FlexContainer>


      <SubtitleComponent fontSize={main ? '1.6rem' : '1.3rem'} fontWeight={600} color='var(--text-color)'>
        {role}
      </SubtitleComponent>

      <StyledTechStack fontSize={main ? '1.18rem' : '1rem'} background={main ? 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(255,94,247,1) 17.8%, rgba(2,245,255,1) 100.2% )' : 'radial-gradient( circle farthest-corner at 32.7% 82.7%, #780076 8.3%, #22093d 79.4% )'}>
        {stack?.map((tech) => <span key={tech}>{tech + ' '}</span>)}
      </StyledTechStack>

      <ParagraphComponent fontSize='0.9rem' fontWeight={500} margin='10px 0 0' textShadow='0 3px 5px rgba(0,0,0,0.15)'>
        {description}
      </ParagraphComponent>
    </StyledContainer>
  )
}

export default ExperienceItem