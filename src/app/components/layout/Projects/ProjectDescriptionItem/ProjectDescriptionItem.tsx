import { FaGithub } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

import { StyledContainer, StyledShowcaseImage, StyledLinks } from './projectDescriptionItem.styled'

import ParagraphComponent from '@/app/components/ParagraphComponent'
import FlexContainer from '@/app/components/FlexContainer'
import HighlightTitleComponent from '../HighlightTitleComponent'

import { PersonalProjectData } from '@/app/types/data'

export type ComponentProps = {
  data: PersonalProjectData
  reverse?: boolean
}

const projectsStyles = {
  1: {
    hihglight: 'D',
    highlightColor: '#e804d4',
    stackGradient: 'radial-gradient( circle farthest-corner at 10% 20%, rgba(255,94,247,1) 17.8%, rgba(2,245,255,1) 100.2% )',
    stackShadow: `drop-shadow(0 0 4px rgba(214, 137, 248, 0.3))
    drop-shadow(0 0 12px rgba(214, 137, 248, 0.3))
    drop-shadow(0 0 24px rgba(246, 228, 193, 0.3))
    drop-shadow(0 0 48px rgba(246, 228, 193, 0.3));`,
    textColor: '#ececec',
  },
  2: {
    hihglight: 'Down',
    highlightColor: '#6900b0',
    stackGradient: 'radial-gradient(circle farthest-corner at 10% 20%, rgb(94 255 222) 17.8%, rgb(255 244 2) 100.2%)',
    stackShadow: `drop-shadow(0 0 4px rgba(94, 255, 222, 0.3))
    drop-shadow(0 0 12px rgba(94, 255, 222, 0.3))
    drop-shadow(0 0 24px rgba(255, 244, 2, 0.3))
    drop-shadow(0 0 48px rgba(255, 244, 2, 0.3))`,
    textColor: '#ececec',
  },
  3: {
    hihglight: 'Crazy',
    highlightColor: '#2ea509',
    stackGradient: 'radial-gradient(circle farthest-corner at 10% 20%, rgb(130 94 255) 17.8%, rgb(255 7 2) 100.2%)',
    stackShadow: `drop-shadow(0 0 4px rgba(130, 94, 255, 0.3))
    drop-shadow(0 0 12px rgba(130, 94, 255, 0.3))
    drop-shadow(0 0 24px rgba(255, 7, 2, 0.3))
    drop-shadow(0 0 48px rgba(255, 7, 2, 0.3))`,
    textColor: '#212121',
  }
}

const ProjectDescriptionItem: React.FC<ComponentProps> = ({ data, reverse }) => {
  const { id, name, description, showcase, links } = data
  const showcaseUrl = showcase?.[0]?.fields?.file?.url
  const style = projectsStyles[id as keyof typeof projectsStyles]

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
        <FlexContainer gap='20px' align='center'>
          <HighlightTitleComponent
            fontSize='2rem'
            color={style?.textColor}
            title={name ?? ''}
            highlightString={style?.hihglight ?? ''}
            highlightColor={style?.highlightColor ?? 'inherit'}
          />
          <StyledLinks background={style.stackGradient} filter={style.stackShadow}>
            <FaGithub size={26} color={style.textColor} />
            <a href={(links as string[])[1]} style={{ color: style.textColor, marginRight: 10 }} target='_blank'>
              See the code
            </a>
            <TbWorld size={26} color={style.textColor} target='_blank' />
            <a href={(links as string[])[0]} style={{ color: style.textColor }} target='_blank'>
              Visit website
            </a>
          </StyledLinks>
        </FlexContainer>

        <ParagraphComponent color={style?.textColor} fontSize='0.9rem' fontWeight={500} margin='10px 0 0' textShadow='0 3px 5px rgba(0,0,0,0.15)'>
          {description}
        </ParagraphComponent>

      </StyledContainer>
    </FlexContainer>
  )
}

export default ProjectDescriptionItem
