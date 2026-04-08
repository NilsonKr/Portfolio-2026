'use client'

import React from 'react'

import { MotionValue, motion, useTransform } from 'motion/react'

type AnimationProps = {
  scrollYProgress: MotionValue<number>
  children: React.ReactNode
}
