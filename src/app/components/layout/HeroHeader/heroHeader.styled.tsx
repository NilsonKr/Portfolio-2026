import styled from "styled-components";
import { motion } from "motion/react";

import FlexContainer from "../../FlexContainer";

export const StyledIconsContainer = styled(motion.div).attrs(() => ({
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut', delay: 5 },
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`

export const StyledContainer = styled(FlexContainer)`
  position: absolute;
  top: 0;
  padding: 20px;
  width: 100%;
  z-index: 1;
`