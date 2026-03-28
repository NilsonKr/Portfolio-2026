import styled from "styled-components";

import FlexContainer from "../../FlexContainer";

export const StyledContainer = styled(FlexContainer)`
  position: absolute;
  bottom: 20px;
  width: 100%;
  cursor: pointer;
  transition: opacity 0.4s ease;

  &:hover {
    opacity: 0;
  }
`
