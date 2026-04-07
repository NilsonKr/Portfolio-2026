'use client'

import React from 'react'

import { MotionValue, motion, useTransform } from 'motion/react'

import { TitleComponentProps } from '../../TitleComponent/TitleComponent'

type TitleAnimationConfig = {
  xTrigger: number[]
  xValues: (number | string)[]
  scaleYTrigger: number[]
  scaleYValues: number[]
  transformOrigin?: string
}

type WithAnimationProps = TitleComponentProps & {
  scrollYProgress: MotionValue<number>
}

function withExperiencesTitleAnimation(
  WrappedComponent: React.ComponentType<TitleComponentProps>,
  { xTrigger, xValues, scaleYTrigger, scaleYValues, transformOrigin }: TitleAnimationConfig
) {
  const MotionComponent = motion.create(WrappedComponent as React.ComponentType)

  const ExperiencesTitleAnimated = ({ scrollYProgress, ...props }: WithAnimationProps) => {
    const x = useTransform(scrollYProgress, xTrigger, xValues)
    const scaleY = useTransform(scrollYProgress, scaleYTrigger, scaleYValues)

    return (
      <MotionComponent style={{ x, scaleY, transformOrigin }} {...(props as TitleComponentProps)} />
    )
  }

  return ExperiencesTitleAnimated
}

export default withExperiencesTitleAnimation
