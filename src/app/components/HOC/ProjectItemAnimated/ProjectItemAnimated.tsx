'use client'

import React from 'react'

import { MotionValue, motion, useTransform } from 'motion/react'

import { PersonalProjectData } from '@/app/types/data'

type ProjectAnimationConfig = {
  entranceTrigger: number[]
  entranceX: (number | string)[]
  exitTrigger: number[]
  exitX: (number | string)[]
  exitScaleTrigger: number[]
  exitScale: (number | string)[]
}

type WithAnimationProps = {
  data: PersonalProjectData
  scrollYProgress: MotionValue<number>
  aboutMeScrollYProgress: MotionValue<number>
}

function withProjectItemAnimation<T>(
  WrappedComponent: React.ComponentType<T>,
  { entranceTrigger, entranceX, exitTrigger, exitX, exitScaleTrigger, exitScale }: ProjectAnimationConfig
) {
  const ProjectItemAnimated = ({ scrollYProgress, aboutMeScrollYProgress, ...props }: T & WithAnimationProps) => {

    const xEntry = useTransform(scrollYProgress, entranceTrigger, entranceX)
    const xExit = useTransform(aboutMeScrollYProgress, exitTrigger, exitX)
    const scaleExit = useTransform(aboutMeScrollYProgress, exitScaleTrigger, exitScale)

    // Combine both transforms
    const x = useTransform(() => {
      const entry = xEntry.get();
      const exit = xExit.get();

      // Parse numeric values to add them together
      const entryVal = parseFloat(entry as string);
      const exitVal = parseFloat(exit as string);

      return `${entryVal + exitVal}%`;
    });

    return (
      <motion.div style={{ x, scale: scaleExit, flex: '1' }}>
        <WrappedComponent scrollYProgress={scrollYProgress} {...(props as T)} />
      </motion.div>
    )
  }

  return ProjectItemAnimated
}

export default withProjectItemAnimation
