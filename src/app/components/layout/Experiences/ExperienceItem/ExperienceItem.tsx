import { MotionValue } from 'motion/react'

import { StyledContainer, StyledYear, StyledDateRangeContainer, StyledOrbBackground } from './experienceItem.styled'
import { StyledAnimatedTechStack, AnimatedDateRange } from './experienceItem.animate'

import SubtitleComponent from '@/app/components/SubtitleComponent'
import ParagraphComponent from '@/app/components/ParagraphComponent'
import FlexContainer from '@/app/components/FlexContainer'

import { ExperienceData } from '@/app/types/data'

type ComponentProps = {
  data: ExperienceData
  main: boolean
  scrollYProgress?: MotionValue<number>
}

const glowBackgrounds = {
  1: `radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(248, 180, 244, 1) 0%,
    rgba(169, 219, 237, 1) 90%
  )`,
  2: `radial-gradient( circle farthest-corner at 10% 20%,  rgba(240,139,139,1) 0%, rgba(243,252,166,1) 90% )`,
  3: `radial-gradient( circle farthest-corner at 3.7% 49.8%,  rgba(143,232,255,0.6) 21.9%, rgba(209,243,251,0.6) 52.9% )`,
}

const ExperienceItem: React.FC<ComponentProps> = ({ data, main, scrollYProgress }) => {
  const { id, company, role, description, beginDate, endDate, stack } = data

  const fromDate = new Date(beginDate as string)
  const toDate = new Date(endDate as string)

  const [fromDateMonth, fromDateYear] = `${fromDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })}`.split(' ')
  const [toDateMonth, toDateDisplay] = `${toDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })}`.split(' ')

  return (
    <StyledContainer>
      <StyledOrbBackground background={glowBackgrounds[id as keyof typeof glowBackgrounds]} />


      <StyledDateRangeContainer>
        <ParagraphComponent lineHeight='1'>
          {toDateMonth} <StyledYear style={{ color: '#000' }}>{toDateDisplay} - </StyledYear>
        </ParagraphComponent>
        <ParagraphComponent lineHeight='1' >
          {fromDateMonth} <StyledYear style={{ fontSize: '1.5rem' }}> {fromDateYear}</StyledYear>
        </ParagraphComponent>
      </StyledDateRangeContainer>

      <SubtitleComponent fontSize='2rem' fontWeight={600} margin='0 0 10px 0' gradient={main ? 'radial-gradient( circle farthest-corner at 32.7% 82.7%, rgba(173,0,171,1) 8.3%, #340f5c 35% )' : ''}>
        {role}
      </SubtitleComponent>

      <SubtitleComponent fontSize='1.6rem' color='var(--text-color)' >
        {company}
      </SubtitleComponent>


      <ParagraphComponent fontSize='0.9rem' maxWidth='90%' margin='10px 0 0' textShadow='0 3px 5px rgba(0,0,0,0.15)'>
        {description}
      </ParagraphComponent>
    </StyledContainer>
  )
}

export default ExperienceItem