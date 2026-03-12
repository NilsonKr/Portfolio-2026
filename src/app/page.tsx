'use client'

import { StyledBackground, StyledNoiseBackground, HeroBackgroundContainer } from './page.style'

import { Wrapper, GeneralSansText, SatoshiText, ZinaText, ArrayText } from './page.style'

import ThreeDemo from './components/ThreeDemo'

export default function Home() {
  return (
    <Wrapper>
      <StyledNoiseBackground />
      <StyledBackground />
      <HeroBackgroundContainer>
        <ThreeDemo />
      </HeroBackgroundContainer>
      {/* <GeneralSansText>General Sans — The quick brown fox jumps over the lazy dog</GeneralSansText> */}
      {/* <SatoshiText>Satoshi — The quick brown fox jumps over the lazy dog</SatoshiText> */}
      {/* <ZinaText>Zina — The quick brown fox jumps over the lazy dog</ZinaText> */}
      {/* <ArrayText>Array — The quick brown fox jumps over the lazy dog</ArrayText> */}
      {/* <GlassContainer width='300px' height='100px' padding='1rem' margin='1rem'></GlassContainer> */}
    </Wrapper>
  )
}
