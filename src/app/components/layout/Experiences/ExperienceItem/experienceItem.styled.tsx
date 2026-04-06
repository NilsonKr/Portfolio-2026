import styled from 'styled-components'

type StyledContainerProps = {
  altSide?: boolean
}


export const StyledContainer = styled.div<StyledContainerProps>`
  ${({ altSide }) => altSide ? `right: 0;` : `left: 0;`}
  max-width: 550px;


`

export const StyledTechStack = styled.p<{ background: string }>`
  margin-top: 10px;
  font-family: var(--font-array);
  word-spacing: 0.6em;
  white-space: normal;
  word-break: break-word;
  background: ${({ background }) => background};
  background-clip: text;
  filter:
    drop-shadow(0 0 4px rgba(214, 137, 248, 0.3))
    drop-shadow(0 0 12px rgba(214, 137, 248, 0.3))
    drop-shadow(0 0 24px rgba(246, 228, 193, 0.3))
    drop-shadow(0 0 48px rgba(246, 228, 193, 0.3));

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`