'use client'

import React, { RefObject } from 'react'

import { motion, useScroll, useTransform } from 'motion/react'

import { TitleComponentProps } from '../../TitleComponent/TitleComponent'

type WithAnimationProps = TitleComponentProps & {
  containerRef: RefObject<HTMLDivElement | null>
}

function withExperiencesTitleAnimation(WrappedComponent: React.ComponentType<TitleComponentProps>) {
  const ExperiencesTitleAnimated = ({ containerRef, ...props }: WithAnimationProps) => {
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ['start 80%', 'end end'],
    })

    const y = useTransform(scrollYProgress, [0.1, 0.25], [200, 0])
    const opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1])
    const rotateX = useTransform(scrollYProgress, [0.1, 0.25], [-60, 0])

    return (
      <motion.div style={{ opacity, y, rotateX }}>
        <WrappedComponent {...props} />
      </motion.div>
    )
  }

  return ExperiencesTitleAnimated
}

export default withExperiencesTitleAnimation
