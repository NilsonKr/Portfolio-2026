'use client'

import React from 'react'

import { MotionValue, motion, useTransform } from 'motion/react'

import { ExperienceData } from '@/app/types/data'

type ExperienceAnimationConfig = {
  yTrigger: number[]
  yValues: number[]
  opacityTrigger: number[]
  opacityValues: number[]
  rotateYTrigger?: number[]
  rotateYValues?: number[]
}

type WithAnimationProps = {
  data: ExperienceData
  main?: boolean
  scrollYProgress: MotionValue<number>
}

function withExperienceItemAnimation<T extends { data: ExperienceData; main?: boolean }>(
  WrappedComponent: React.ComponentType<T & { scrollYProgress: MotionValue<number> }>,
  { yTrigger, yValues, opacityTrigger, opacityValues, }: ExperienceAnimationConfig
) {
  const ExperienceItemAnimated = ({ scrollYProgress, ...props }: T & WithAnimationProps) => {
    const y = useTransform(scrollYProgress, yTrigger, yValues)
    const opacity = useTransform(scrollYProgress, opacityTrigger, opacityValues)

    return (
      <motion.div style={{ y, opacity }}>
        <WrappedComponent scrollYProgress={scrollYProgress} {...(props as T)} />
      </motion.div>
    )
  }

  return ExperienceItemAnimated
}

export default withExperienceItemAnimation
