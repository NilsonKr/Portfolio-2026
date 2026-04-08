'use client'
import React from 'react'
import { MotionValue, motion, useTransform } from 'motion/react'

import { StyledOrbBackground } from './experienceItem.styled'

type OrbAnimatedProps = {
  scrollYProgress: MotionValue<number>
  background: string
}

export const withOrbBackgroundAnimation = (triggers: number[]) => {
  const AnimatedOrbBackground: React.FC<OrbAnimatedProps> = ({ scrollYProgress, background }) => {
    const opacity = useTransform(scrollYProgress, triggers, [0, 1])

    return (
      <motion.div style={{ opacity }}>
        <StyledOrbBackground $background={background} />
      </motion.div>
    )
  }

  return AnimatedOrbBackground
}

