import styled, { keyframes } from 'styled-components'

import TagComponent from './components/TagComponent'

export const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  padding: 4rem;
  height: 100vh ;
 justify-content: center;
 align-items: center;
`

export const GeneralSansText = styled.p`
  font-family: var(--font-general-sans);
  font-size: 2rem;
  color: var(--color-title);
`

export const SatoshiText = styled.p`
  font-family: var(--font-satoshi);
  font-size: 2rem;
  color: var(--color-text);
`

export const ZinaText = styled.p`
  font-family: var(--font-zina);
  font-size: 2rem;
  color: var(--color-auxiliar);
`

export const ArrayText = styled.p`
  font-family: var(--font-array);
  font-size: 2rem;
  color: var(--color-secondary);
`

export const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  background-image: url('/background.svg');
  mask-image: linear-gradient(180deg,rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 1) 40%);
  -webkit-mask-image: linear-gradient(180deg,rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 1) 40%);

 &::after{
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  backdrop-filter: blur(10px);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%);
 }
`
export const StyledNoiseBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('/noiseBackground.svg');
  background-repeat: repeat;
  z-index: -3;
`

export const HeroBackgroundContainer = styled.div`
  position: relative;
  min-width: 100%;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const HeroTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
  box-shadow: 0px 20px 10px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
  mask-image: linear-gradient(
    to bottom,
    transparent 0%, black 10%, black 90%, transparent 100%
  ),
  linear-gradient(
    to right,
    transparent 0%, black 5%, black 95%, transparent 100%
  );
  mask-composite: intersect;
  -webkit-mask-composite: destination-in;
`

const colorCycle = keyframes`
  0%   { color: #000; }
  25%  { color: #cd2486; }
  50%  { color: #268eae; }
  75%  { color: #35b091; }
  100%   { color: #851ea4; }
`

export const TagHeroComponent = styled(TagComponent)`
  animation: ${colorCycle} 60s ease-out infinite;
`