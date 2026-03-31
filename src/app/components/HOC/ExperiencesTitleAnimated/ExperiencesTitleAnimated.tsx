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
      offset: ['25% end', 'end end'],
    })

    const y = useTransform(scrollYProgress, [0, 0.4], [300, 0])
    const scale = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
    const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
    const rotateX = useTransform(scrollYProgress, [0.2, 0.4], [-60, 0])

    return (
      <motion.div style={{ scale, opacity, y, rotateX }}>
        <WrappedComponent {...props} />
      </motion.div>
    )
  }

  return ExperiencesTitleAnimated
}

export default withExperiencesTitleAnimation
