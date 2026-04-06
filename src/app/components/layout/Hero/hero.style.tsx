import styled from 'styled-components'

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
