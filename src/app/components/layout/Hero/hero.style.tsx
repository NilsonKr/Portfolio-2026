import styled from 'styled-components'
import { motion } from 'motion/react'

import { media } from '@/app/utils/theme'

export const HeroBackgroundContainer = styled.div`
  position: relative;
  min-width: 100%;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.tablet} {
    min-height: 100svh;
  }
`
export const HeroTextContainer = styled(motion.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: 'easeOut', delay: 0 },
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
  max-width: 100%;
  text-align: center;

  box-shadow: 0px 20px 10px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
  mask-image: linear-gradient(
    to bottom,
    transparent 0%, black 10%, black 90%, transparent 100%
  ),
  linear-gradient(
    to right,
    transparent 0%, black 5%, black 95%, transparent 100%
  );
  mask-composite: intersect;
  -webkit-mask-composite: destination-in;

  ${media.tablet} {
    padding: 16px 18px;
  }

  ${media.mobile} {
    padding: 12px 14px;
    backdrop-filter: blur(0px);
  }
  
`

export const StyledTitle = styled(motion.div).attrs(() => ({
  initial: { translateX: 80, opacity: 0 },
  animate: { translateX: 0, opacity: 1 },
  transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 2 },
}))`
`

export const StyledRole = styled(motion.div).attrs(() => ({
  initial: { x: -60, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut', delay: 3 },
}))`

`

export const StyledExperience = styled(motion.div).attrs(() => ({
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut', delay: 4.5 },
}))`

`

export const StyledDescription = styled(motion.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: 'easeOut', delay: 4.8 },
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;

  & > p {
    color: #404040;
    text-shadow: 0px 5px 8px rgba(0, 0, 0, 0.21);
  }

  ${media.desktopXl} {
    margin-top: 40px;

    & > p {
      font-size: 1.35rem;
    }
  }

  ${media.tablet} {
    margin-top: 22px;
  }
`
