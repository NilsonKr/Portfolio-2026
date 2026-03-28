'use client'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import { Wrapper, HeroTextContainer, StyledBackground, StyledNoiseBackground, HeroBackgroundContainer, TagHeroComponent } from './page.style'

import NavbarHero from './components/layout/HeroHeader'
import HeroFooter from './components/layout/HeroFooter'
import TitleComponent from './components/TitleComponent'
import SubtitleComponent from './components/SubtitleComponent'
import ParagraphComponent from './components/ParagraphComponent'
import GlowBackground from './components/GlowBackground'


import DotsBackground from './components/DotsBackground'

export default function Home() {
  return (<>
    <NavbarHero />

    <Wrapper>
      <StyledNoiseBackground />
      <StyledBackground />
      <DotsBackground />

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
            <TagHeroComponent

              fontSize='1.1rem'
              fontWeight={800}
              maxWidth='70%'
              textAlign='center'
              textShadow='0px 5px 8px rgba(0, 0, 0, 0.15)'
            >
              TypeScript - React.js - Figma - Next.js - Node.js - Web3 Python - SQL - Claude Code
            </TagHeroComponent>
          </GlowBackground>
        </HeroTextContainer>
      </HeroBackgroundContainer>
      {/* <GeneralSansText>General Sans — The quick brown fox jumps over the lazy dog</GeneralSansText> */}
      {/* <SatoshiText>Satoshi — The quick brown fox jumps over the lazy dog</SatoshiText> */}
      {/* <ZinaText>Zina — The quick brown fox jumps over the lazy dog</ZinaText> */}
      {/* <ArrayText>Array — The quick brown fox jumps over the lazy dog</ArrayText> */}
      {/* <GlassContainer width='300px' height='100px' padding='1rem' margin='1rem'></GlassContainer> */}
    </Wrapper>
    <HeroFooter />
  </>
  )
}
