import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  &::before {
    content: '';
    position: absolute;
    width: 80%;
    height: 150%;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0.85) 25%,
      rgba(255, 255, 255, 0.4) 55%,
      transparent 75%
    );
    filter: blur(24px);
    border-radius: 50%;
    z-index: 0;
    pointer-events: none;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`

