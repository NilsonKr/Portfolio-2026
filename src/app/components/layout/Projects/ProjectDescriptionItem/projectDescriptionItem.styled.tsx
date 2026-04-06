import Image from 'next/image'
import styled from 'styled-components'

export const StyledContainer = styled.div`
  max-width: 500px;
`

export const StyledShowcaseImage = styled(Image)`
  border-radius: 12px;
`

export const StyledLinks = styled.div<{ background: string; filter: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  filter: ${({ filter }) => filter};

  & > a {
    text-decoration: none;
    font-family: var(--font-satoshi);
    font-size: 0.9rem;
  }

  & > a:hover {
    background: ${({ background }) => background};
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`
