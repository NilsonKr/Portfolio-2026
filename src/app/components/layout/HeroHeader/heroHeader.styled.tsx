import styled, { keyframes } from "styled-components";

const entrance = keyframes`
  100% { transform: translateY(0px); opacity:1; }
`
import FlexContainer from "../../FlexContainer";

export const StyledIconsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  transform: translateY(30px);
  opacity:0;
  animation: ${entrance} .8s ease-out;
  animation-delay: 5s;
  animation-fill-mode: forwards;
`

export const StyledContainer = styled(FlexContainer)`
  position: absolute;
  top: 0;
  padding: 20px;
  width: 100%;
  z-index: 1;
`