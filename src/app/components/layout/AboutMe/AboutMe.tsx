'use client'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useContext, RefObject } from 'react'
import { MotionValue } from 'motion/react'
import Image from 'next/image'

import { StyledAboutMeContainer, StyledStickyContainer, StyledSaluteHand } from './aboutMe.styled'
import { PictureAnimated, DescriptionAnimated, LinksAnimated, SaluteHandAnimated } from './aboutMe.animated'

import { ContentfulContext } from '../../../context/contentful'

import FlexContainer from '../../FlexContainer'
import SubtitleComponent from '../../SubtitleComponent'
import ParagraphComponent from '../../ParagraphComponent'
import GlassContainer from "../../GlassContainer"
import DownloadCVButton from './DownloadCVButton'


type ComponentProps = {
  containerRef: RefObject<null>
  scrollYProgress: MotionValue<number>
}

const AboutMe: React.FC<ComponentProps> = ({ containerRef, scrollYProgress }) => {
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

              {showcaseUrl &&
                <PictureAnimated scrollYProgress={scrollYProgress}>
                  <Image
                    src={`https:${showcaseUrl}`}
                    alt={'Nilson Diaz'}
                    width={260}
                    height={240}
                    priority
                    style={{ borderRadius: '8px' }}
                  />
                </PictureAnimated>
              }

              <LinksAnimated scrollYProgress={scrollYProgress}>
                {cvUrl && <DownloadCVButton cvUrl={cvUrl} fileName={cvFileName} />}

                <FlexContainer gap='18px' margin='20px 0 0' justify='center'>
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
              </LinksAnimated>

            </FlexContainer>
            <FlexContainer justify='center' direction='column' height='100%' maxWidth='60%'>
              <DescriptionAnimated scrollYProgress={scrollYProgress}>
                <div style={{ position: 'relative', width: 'fit-content' }}>
                  <SaluteHandAnimated scrollYProgress={scrollYProgress}>
                    👋
                  </SaluteHandAnimated>
                  <SubtitleComponent maxWidth='fit-content' lineHeight='1' fontFamily='var(--font-general-sans)'>A little about me</SubtitleComponent>
                </div>
                {descriptionParagraphs && descriptionParagraphs.map((description, idx) => (
                  <ParagraphComponent key={idx} margin='12px 0 0' fontSize='0.9rem'>{description}</ParagraphComponent>
                ))}
              </DescriptionAnimated>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </StyledStickyContainer>
    </StyledAboutMeContainer>
  )
}

export default AboutMe
