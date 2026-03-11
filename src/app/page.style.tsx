import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 4rem;
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