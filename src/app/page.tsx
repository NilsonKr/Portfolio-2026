'use client'

import { Wrapper, GeneralSansText, SatoshiText, ZinaText, ArrayText } from './page.style'

export default function Home() {
  return (
    <Wrapper>
      <GeneralSansText>General Sans — The quick brown fox jumps over the lazy dog</GeneralSansText>
      <SatoshiText>Satoshi — The quick brown fox jumps over the lazy dog</SatoshiText>
      <ZinaText>Zina — The quick brown fox jumps over the lazy dog</ZinaText>
      <ArrayText>Array — The quick brown fox jumps over the lazy dog</ArrayText>
    </Wrapper>
  )
}
