'use client'

import React, { RefObject } from 'react'

import { MotionValue, motion, useScroll, useTransform } from 'motion/react'

import { ExperienceData } from '@/app/types/data'

type WithAnimationProps = {
  data: ExperienceData
  main?: boolean
  containerRef: RefObject<HTMLDivElement | null>
}

function withExperienceItemAnimation<T extends { data: ExperienceData; main?: boolean }>(
  WrappedComponent: React.ComponentType<T & { scrollYProgress: MotionValue<number> }>,
  isMain: boolean
) {
  const ExperienceItemAnimated = ({ containerRef, ...props }: T & WithAnimationProps) => {
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ['25% end', 'end end'],
    })

    const mainTriggers = {
      y: [[0.15, 0.35], [130, 40]],
      rotateY: [[0.15, 0.35], [-45, 0]],
      opacity: [[0.15, 0.35], [0, 1]],
    }

    const altTriggers = {
      y: [[0.55, 0.75], [130, 60]],
      rotateY: [[0, 0], [0, 0]],
      opacity: [[0.55, 0.75], [0, 1]],
    }

    const triggers = isMain ? mainTriggers : altTriggers

    const y = useTransform(scrollYProgress, [...triggers.y[0]], [...triggers.y[1]])
    const rotateY = useTransform(scrollYProgress, [...triggers.rotateY[0]], [...triggers.rotateY[1]])
    const opacity = useTransform(scrollYProgress, [...triggers.opacity[0]], [...triggers.opacity[1]])

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
