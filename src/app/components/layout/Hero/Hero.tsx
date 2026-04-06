import { HeroBackgroundContainer, HeroTextContainer } from './hero.style'

import TitleComponent from '../../TitleComponent'
import SubtitleComponent from '../../SubtitleComponent'
import ParagraphComponent from '../../ParagraphComponent'
import GlowBackground from '../../GlowBackground'
import TagComponent from '../../TagComponent'

const Hero: React.FC = () => {
  return (
    <HeroBackgroundContainer>
      <HeroTextContainer>
        <TitleComponent fontSize='4.5rem' zIndex={100} textShadow='0px 10px 20px rgba(0, 0, 0, 0.6)' gradient='radial-gradient( circle farthest-corner at 32.7% 82.7%, rgba(173,0,171,1) 8.3%, #340f5c 79.4% )'>
          Hi! I'm Nilson Diaz
        </TitleComponent>
        <SubtitleComponent color='#404040' textShadow='0px 5px 10px rgba(0, 0, 0, 0.2)'>
          Frontend / Full-stack engineer
        </SubtitleComponent>
        <ParagraphComponent fontSize='1.5rem' color='#000' fontWeight='800' margin='30px 0 0'>
          5 years of <span style={{
            background: 'radial-gradient( circle farthest-corner at 32.7% 82.7%,  rgba(173,0,171,1) 8.3%, rgba(15,51,92,1) 79.4% )',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            professional experience
          </span>
        </ParagraphComponent>
        <ParagraphComponent color='#404040' fontSize='1.1rem' margin='30px 0 0' textShadow='0px 5px 8px rgba(0, 0, 0, 0.21)'>
          Building scalable, high-performance, world-class UI/UX products
        </ParagraphComponent>
        <GlowBackground >
          <TagComponent
            color='#000'
            fontSize='1.1rem'
            fontWeight={600}
            maxWidth='65%'
            textAlign='center'
            textShadow='0px 5px 8px rgba(0, 0, 0, 0.15)'
          >
            JavaScript - TypeScript - React.js - Figma - Next.js - Node.js  Web3 - Python - SQL - Claude Code
          </TagComponent>
        </GlowBackground>
      </HeroTextContainer>
    </HeroBackgroundContainer>
  )
}

export default Hero
