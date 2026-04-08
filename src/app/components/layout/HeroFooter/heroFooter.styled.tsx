import styled from "styled-components";
import { motion } from "motion/react";

import FlexContainer from "../../FlexContainer";

export const StyledContainer = styled(FlexContainer)`
  width: 100%;
`

export const MotionWrapper = styled(motion.div)`
  position: absolute;
  bottom: 20px;
  width: 100%;
`
