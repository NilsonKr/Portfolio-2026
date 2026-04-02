import styled from 'styled-components'

import FlexContainer from '@/app/components/FlexContainer'

type StyledContainerProps = {
  altSide?: boolean
}


export const StyledContainer = styled.div<StyledContainerProps>`
  ${({ altSide }) => altSide ? `right: 0;` : `left: 0;`}
  max-width: 550px;


`

export const StyledTechStack = styled(FlexContainer) <{ background: string }>`
  margin-top: 10px;
  gap: 10px;
  font-family: var(--font-array);
  background: ${({ background }) => background};
  /* background-image: radial-gradient( circle farthest-corner at -4.1% 49.8%,  rgba(247,127,127,1) 0%, rgba(255,175,90,1) 20.8%, #85c76c 43.8%, #599acb 65.2%, rgba(147,145,255,1) 84.3%, rgba(255,147,248,1) 100.2% ); */
  background-clip: text;
  filter:
    drop-shadow(0 0 4px rgba(214, 137, 248, 0.3))
    drop-shadow(0 0 12px rgba(214, 137, 248, 0.3))
    drop-shadow(0 0 24px rgba(246, 228, 193, 0.3))
    drop-shadow(0 0 48px rgba(246, 228, 193, 0.3));

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`