import styled from 'styled-components'

type StyledProps = {
  $width: string
  $height: string
}

export const StyledDotsBackground = styled.div<StyledProps>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  -webkit-mask-image: radial-gradient(
    ellipse 55% 48% at 50% 50%,
    black 40%,
    transparent 100%
  );
  mask-image: radial-gradient(
    ellipse 55% 48% at 50% 50%,
    black 40%,
    transparent 100%
  );
`
