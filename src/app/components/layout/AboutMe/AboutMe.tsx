'use client'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { RefObject, useState } from 'react'
import type { MotionValue } from 'motion/react'
import Image from 'next/image'

import { StyledAboutMeContainer, StyledStickyContainer, StyledLayout } from './aboutMe.styled'
import { PictureAnimated, DescriptionAnimated, LinksAnimated, SaluteHandAnimated } from './aboutMe.animated'

import FlexContainer from '../../FlexContainer'
import SubtitleComponent from '../../SubtitleComponent'
import ParagraphComponent from '../../ParagraphComponent'
import GlassContainer from "../../GlassContainer"
import DownloadCVButton from './DownloadCVButton'

import { TypeAboutMe } from '@/app/types/contentful'


type ComponentProps = {
  aboutMe: TypeAboutMe
  containerRef: RefObject<HTMLDivElement | null>
  scrollYProgress: MotionValue<number>
}

const AboutMe: React.FC<ComponentProps> = ({ aboutMe, containerRef, scrollYProgress }) => {

  const [pictureHovered, setPictureHovered] = useState(false)

  const descriptionParagraphs = (aboutMe?.fields.description as string)?.split('/n')
  const showcaseUrl = aboutMe?.fields?.picture?.fields.file?.url
  const cvUrl = aboutMe?.fields?.cv?.fields.file?.url
  const cvFileName = aboutMe?.fields?.cv?.fields.file?.fileName

  return (
    <StyledAboutMeContainer ref={containerRef}>
      <StyledStickyContainer>
        <StyledLayout>
          {showcaseUrl &&
            <PictureAnimated scrollYProgress={scrollYProgress}>
              <Image
                src={`https:${showcaseUrl}`}
                alt={'Nilson Diaz'}
                width={360}
                height={330}
                style={{ borderRadius: '8px', cursor: 'pointer', width: 'clamp(260px, 20vw, 400px)', height: 'auto' }}
                onMouseEnter={() => setPictureHovered(true)}
                onMouseLeave={() => setPictureHovered(false)}
                loading='lazy'
              />
            </PictureAnimated>
          }

          <DescriptionAnimated scrollYProgress={scrollYProgress}>
            <div style={{ position: 'relative', width: 'fit-content' }}>
              <SaluteHandAnimated scrollYProgress={scrollYProgress} hovering={pictureHovered}>
                👋
              </SaluteHandAnimated>
              <SubtitleComponent fontSize='clamp(2.5rem, 2.5vw, 4rem)' maxWidth='fit-content' lineHeight='1' fontFamily='var(--font-general-sans)'>A little about me</SubtitleComponent>
            </div>
            {descriptionParagraphs && descriptionParagraphs.map((description, idx) => (
              <ParagraphComponent key={idx} margin='12px 0 0' fontSize='clamp(0.9rem, 1.1vw, 1.6rem)'>{description}</ParagraphComponent>
            ))}
          </DescriptionAnimated>

          <LinksAnimated scrollYProgress={scrollYProgress}>
            {cvUrl && <DownloadCVButton cvUrl={cvUrl} fileName={cvFileName} />}

            <FlexContainer gap='18px' margin='30px 0 0' justify='center'>
              <GlassContainer floatingAnimation floatingShadow borderRadius='50%' cursor='pointer' href={aboutMe?.fields.github as string}>
                <FaGithub size={30} />
              </GlassContainer>
              <GlassContainer floatingAnimation floatingShadow borderRadius='50%' cursor='pointer' href={aboutMe?.fields.linkedIn as string} style={{ transform: 'translateY(10px)' }}>
                <FaLinkedin size={30} />
              </GlassContainer>
              <GlassContainer floatingAnimation floatingShadow borderRadius='50%' cursor='pointer' href={aboutMe?.fields.getonboard as string}>
                <Image src='/getonbrd.svg' alt='Get on Board' width={30} height={30} style={{ filter: 'grayscale(100%)' }} />
              </GlassContainer>
            </FlexContainer>
          </LinksAnimated>
        </StyledLayout>
      </StyledStickyContainer>
    </StyledAboutMeContainer>
  )
}

export default AboutMe
