'use client'

import React from 'react'

import { MotionValue, motion, useTransform } from 'motion/react'

import { TitleComponentProps } from '../../TitleComponent/TitleComponent'
import { PersonalProjectData } from '@/app/types/data'

// ─── ProjectItemAnimated ──────────────────────────────────────────────────────

type ProjectAnimationConfig = {
  entranceTrigger: number[]
  entranceX: (number | string)[]
  exitTrigger: number[]
  exitX: (number | string)[]
  exitScaleTrigger: number[]
  exitScale: (number | string)[]
}

type WithProjectItemAnimationProps = {
  data: PersonalProjectData
  scrollYProgress: MotionValue<number>
  aboutMeScrollYProgress: MotionValue<number>
}

export function withProjectItemAnimation<T>(
  WrappedComponent: React.ComponentType<T>,
  { entranceTrigger, entranceX, exitTrigger, exitX, exitScaleTrigger, exitScale }: ProjectAnimationConfig
) {
  const ProjectItemAnimated = ({ scrollYProgress, aboutMeScrollYProgress, ...props }: T & WithProjectItemAnimationProps) => {
    const xEntry = useTransform(scrollYProgress, entranceTrigger, entranceX)
    const xExit = useTransform(aboutMeScrollYProgress, exitTrigger, exitX)
    const scaleExit = useTransform(aboutMeScrollYProgress, exitScaleTrigger, exitScale)

    const x = useTransform(() => {
      const entryVal = parseFloat(xEntry.get() as string)
      const exitVal = parseFloat(xExit.get() as string)
      return `${entryVal + exitVal}%`
    })

    return (
      <motion.div style={{ x, scale: scaleExit, flex: '1' }}>
        <WrappedComponent scrollYProgress={scrollYProgress} {...(props as T)} />
      </motion.div>
    )
  }

  return ProjectItemAnimated
}

// ─── ProjectsTitleAnimated ────────────────────────────────────────────────────

type TitleAnimationConfig = {
  entranceTrigger: number[]
  entranceX: (number | string)[]
  exitTrigger: number[]
  exitX: (number | string)[]
}

type WithProjectsTitleAnimationProps = TitleComponentProps & {
  scrollYProgress: MotionValue<number>
  aboutMeScrollYProgress: MotionValue<number>
}

export function withProjectsTitleAnimation(
  WrappedComponent: React.ComponentType<TitleComponentProps>,
  { entranceTrigger, entranceX, exitTrigger, exitX }: TitleAnimationConfig
) {
  const ProjectsTitleAnimated = ({ scrollYProgress, aboutMeScrollYProgress, ...props }: WithProjectsTitleAnimationProps) => {
    const xEntry = useTransform(scrollYProgress, entranceTrigger, entranceX)
    const xExit = useTransform(aboutMeScrollYProgress, exitTrigger, exitX)

    const x = useTransform(() => {
      const entryVal = parseFloat(xEntry.get() as string)
      const exitVal = parseFloat(xExit.get() as string)
      return `${entryVal + exitVal}%`
    })


    return (
      <motion.div style={{ x }}>
        <WrappedComponent {...props} />
      </motion.div>
    )
  }

  return ProjectsTitleAnimated
}
