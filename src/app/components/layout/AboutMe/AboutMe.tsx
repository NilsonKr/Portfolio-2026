'use client'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useContext, RefObject } from 'react'
import Image from 'next/image'

import { StyledAboutMeContainer, StyledStickyContainer } from './aboutMe.styled'

import { ContentfulContext } from '../../../context/contentful'

import FlexContainer from '../../FlexContainer'
import SubtitleComponent from '../../SubtitleComponent'
import ParagraphComponent from '../../ParagraphComponent'
import GlassContainer from "../../GlassContainer"
import DownloadCVButton from './DownloadCVButton'

type ComponentProps = {
  containerRef: RefObject<null>
}

const AboutMe: React.FC<ComponentProps> = ({ containerRef }) => {
  const { aboutMe } = useContext(ContentfulContext)

  const descriptionParagraphs = (aboutMe?.fields.description as string)?.split('/n')
  const showcaseUrl = aboutMe?.fields?.picture?.fields.file?.url
  const cvUrl = aboutMe?.fields?.cv?.fields.file?.url
  const cvFileName = aboutMe?.fields?.cv?.fields.file?.fileName

  return (
    <StyledAboutMeContainer ref={containerRef}>
      <StyledStickyContainer>
        <FlexContainer justify='center' align='center' height='100%' width='100%'>
          <FlexContainer height='100%' maxWidth='900px' gap='60px' >
            <FlexContainer direction='column' gap='10px' width='40%' justify='center' align='center'>

              {showcaseUrl && <Image
                src={`https:${showcaseUrl}`}
                alt={'Nilson Diaz'}
                width={260}
                height={240}
                priority
                style={{ borderRadius: '8px' }}
              />}

              {cvUrl && <DownloadCVButton cvUrl={cvUrl} fileName={cvFileName} />}

              <FlexContainer gap='18px' margin='20px 0 0'>
                <GlassContainer floatingShadow borderRadius='50%' cursor='pointer' onClick={() => window.open(aboutMe?.fields.github, '_blank')}>
                  <FaGithub size={24} />
                </GlassContainer>
                <GlassContainer floatingShadow borderRadius='50%' cursor='pointer' onClick={() => window.open(aboutMe?.fields.linkedIn, '_blank')} style={{ transform: 'translateY(10px)' }}>
                  <FaLinkedin size={24} />
                </GlassContainer>
                <GlassContainer floatingShadow borderRadius='50%' cursor='pointer' onClick={() => window.open(aboutMe?.fields.getonboard, '_blank')}>
                  <Image src='/getonbrd.svg' alt='Get on Board' width={24} height={24} style={{ filter: 'grayscale(100%)' }} />
                </GlassContainer>
              </FlexContainer>

            </FlexContainer>
            <FlexContainer justify='center' direction='column' height='100%' maxWidth='60%'>
              <SubtitleComponent lineHeight='1' fontFamily='var(--font-general-sans)'>A little about me</SubtitleComponent>
              {descriptionParagraphs && descriptionParagraphs.map((description, idx) => (
                <ParagraphComponent key={idx} margin='12px 0 0' fontSize='0.9rem'>{description}</ParagraphComponent>
              ))}
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </StyledStickyContainer>
    </StyledAboutMeContainer>
  )
}

export default AboutMe
