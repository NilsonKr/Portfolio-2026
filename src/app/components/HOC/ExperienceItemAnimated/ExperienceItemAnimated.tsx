'use client'

import React from 'react'

import { MotionValue, motion, useTransform } from 'motion/react'

import { ExperienceData } from '@/app/types/data'

type WithAnimationProps = {
  data: ExperienceData
  main?: boolean
  scrollYProgress: MotionValue<number>
}

const mainTriggers = {
  y: [0.15, 0.35] as const,
  yValues: [130, 40] as const,
  rotateY: [0.15, 0.35] as const,
  rotateYValues: [-45, 0] as const,
  opacity: [0.15, 0.35] as const,
  opacityValues: [0, 1] as const,
}

const altTriggers = {
  y: [0.55, 0.75] as const,
  yValues: [130, 60] as const,
  opacity: [0.55, 0.75] as const,
  opacityValues: [0, 1] as const,
  rotateY: [0, 0] as const,
  rotateYValues: [0, 0] as const,
}

function withExperienceItemAnimation<T extends { data: ExperienceData; main?: boolean }>(
  WrappedComponent: React.ComponentType<T & { scrollYProgress: MotionValue<number> }>,
  isMain: boolean
) {
  const ExperienceItemAnimated = ({ scrollYProgress, ...props }: T & WithAnimationProps) => {
    const triggers = isMain ? mainTriggers : altTriggers

    const y = useTransform(scrollYProgress, [...triggers.y], [...triggers.yValues])
    const opacity = useTransform(scrollYProgress, [...triggers.opacity], [...triggers.opacityValues])
    const rotateY = useTransform(scrollYProgress, [...triggers.rotateY], [...triggers.rotateYValues])

    const animatedStyles = isMain ? { y, rotateY, opacity } : { y, opacity }

    return (
      <motion.div style={{
        transformOrigin: "left center",
        ...animatedStyles
      }}>
        <WrappedComponent scrollYProgress={scrollYProgress} {...(props as T)} />
      </motion.div>
    )
  }

  return ExperienceItemAnimated
}

export default withExperienceItemAnimation
