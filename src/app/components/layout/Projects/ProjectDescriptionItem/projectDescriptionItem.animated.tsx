'use client'

import React from 'react'

import { MotionValue, motion, useTransform } from 'motion/react'

import { PersonalProjectData } from '@/app/types/data'
import { ComponentProps as ProjectDescriptionItemProps } from './ProjectDescriptionItem'

type DescriptionAnimationConfig = {
  entranceTrigger: number[]
  entranceX: (number | string)[]
  exitTrigger: number[]
  exitX: (number | string)[]
}

type WithProjectDescriptionAnimationProps = ProjectDescriptionItemProps & {
  data: PersonalProjectData
  reverse?: boolean
  scrollYProgress: MotionValue<number>
}

export function withProjectDescriptionAnimation(
  WrappedComponent: React.ComponentType<ProjectDescriptionItemProps>,
  { entranceTrigger, entranceX, exitTrigger, exitX }: DescriptionAnimationConfig
) {
  const ProjectDescriptionAnimated = ({ scrollYProgress, ...props }: WithProjectDescriptionAnimationProps) => {
    const xEntry = useTransform(scrollYProgress, entranceTrigger, entranceX)
    const xExit = useTransform(scrollYProgress, exitTrigger, exitX)
    const opacityEntry = useTransform(scrollYProgress, entranceTrigger, [0, 1])
    const opacityExit = useTransform(scrollYProgress, exitTrigger, [1, 0])

    const x = useTransform(() => {
      const entryVal = parseFloat(xEntry.get() as string)
      const exitVal = parseFloat(xExit.get() as string)
      return `${entryVal + exitVal}%`
    })

    const opacity = useTransform(() => Math.min(opacityEntry.get(), opacityExit.get()))

    return (
      <motion.div style={{ x, opacity }}>
        <WrappedComponent {...props} />
      </motion.div>
    )
  }

  return ProjectDescriptionAnimated
}
