import styled from 'styled-components'
import { motion } from 'motion/react'

import { media } from '@/app/utils/theme'

export const StyledDotsBackground = styled(motion.div).attrs({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.7, ease: 'linear', delay: 2.5 },
})`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  min-height: 100%;
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
  border-radius:50% ;
  overflow: hidden;
  opacity: 0.7;

  ${media.mobile} {
    display: none;
  }
`
