import styled from "styled-components";

import FlexContainer from "../../FlexContainer";

export const StyledContainer = styled(FlexContainer)`
  position: absolute;
  bottom: 20px;
  width: 100%;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0;
  }
`
