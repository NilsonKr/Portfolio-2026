import styled from 'styled-components'

type StyledProps = {
  main?: boolean
}


export const StyledContainer = styled.div<StyledProps>`
  position: relative;
  max-width: 350px;
`

export const StyledYear = styled.span<StyledProps>`
  font-size: 2rem;
  font-weight: 700;
  font-family: var(--font-general-sans);
  margin-left: 5px;
`

export const StyledDateRangeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  width: 100%;
  margin-bottom: 30px;
`

export const StyledOrbBackground = styled.div<{ background: string }>`
  position: absolute;
  top: 120px;
  left: 50px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background-image: ${({ background }) => background};
  filter: blur(48px);
  opacity: 0.3;
  z-index: -1;
`