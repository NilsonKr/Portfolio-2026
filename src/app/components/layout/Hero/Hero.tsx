import { HeroBackgroundContainer, HeroTextContainer, StyledTitle, StyledTitlePerspective, StyledRole, StyledExperience, StyledDescription } from './hero.style'

import TitleComponent from '../../TitleComponent'
import SubtitleComponent from '../../SubtitleComponent'
import ParagraphComponent from '../../ParagraphComponent'
import GlowBackground from '../../GlowBackground'
import TagComponent from '../../TagComponent'

type ComponentProps = {
  containerRef: React.RefObject<null>
}
const Hero: React.FC<ComponentProps> = ({ containerRef }) => {
  return (
    <HeroBackgroundContainer ref={containerRef}>
      <HeroTextContainer>
        <StyledTitlePerspective>
          <StyledTitle>
            <TitleComponent fontWeight={700} fontSize='clamp(2.2rem, 7vw, 4.5rem)' zIndex={100} textShadow='0px 10px 20px rgba(0, 0, 0, 0.6)' gradient='radial-gradient( circle farthest-corner at 32.7% 82.7%, rgba(173,0,171,1) 8.3%, #340f5c 79.4% )'>
              Hi! I'm Nilson Diaz
            </TitleComponent>
          </StyledTitle>
        </StyledTitlePerspective>
        <StyledRole>
          <SubtitleComponent fontSize='clamp(1.3rem, 3.5vw, 2.5rem)' color='#404040' textShadow='0px 5px 10px rgba(0, 0, 0, 0.2)'>
            Frontend / Full-stack engineer
          </SubtitleComponent>
        </StyledRole>
        <StyledExperience>
          <ParagraphComponent fontSize='clamp(1.05rem, 2.4vw, 1.5rem)' color='#000' fontWeight='800' margin='30px 0 0'>
            5 years of <span style={{
              background: 'radial-gradient( circle farthest-corner at 32.7% 82.7%,  rgba(173,0,171,1) 8.3%, rgba(15,51,92,1) 79.4% )',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              professional experience
            </span>
          </ParagraphComponent>
        </StyledExperience>
        <StyledDescription>
          <ParagraphComponent>
            Building scalable, high-performance, world-class UI/UX products
          </ParagraphComponent>
          <ParagraphComponent>
            experienced on Fintech & B2B
          </ParagraphComponent>
          <GlowBackground >
            <TagComponent
              color='#000'
              fontSize='clamp(0.9rem, 1.5vw, 1.1rem)'
              fontWeight={600}
              maxWidth='min(65%, 65ch)'
              textAlign='center'
              textShadow='0px 5px 8px rgba(0, 0, 0, 0.15)'
            >
              JavaScript - TypeScript - React.js - Figma - Next.js - Node.js  Web3 - Python - SQL - Claude Code
            </TagComponent>
          </GlowBackground>
        </StyledDescription>

      </HeroTextContainer>
    </HeroBackgroundContainer>
  )
}

export default Hero
