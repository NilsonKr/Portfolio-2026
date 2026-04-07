'use client'

import React from 'react'

import { MotionValue, motion, useTransform } from 'motion/react'

import { StyledSaluteHand } from './aboutMe.styled'

type AnimationProps = {
  scrollYProgress: MotionValue<number>
  children: React.ReactNode
}

// ─── PictureImage Animated ────────────────────────────────────────────────────

export const PictureAnimated = ({ scrollYProgress, children }: AnimationProps) => {
  const x = useTransform(scrollYProgress, [0.35, 0.45], ['120%', '0%'])
  const borderRadius = useTransform(scrollYProgress, [0.35, 0.45], ['100%', '0%'])
  const scale = useTransform(scrollYProgress, [0.25, 0.35], [2, 1])


  return (
    <motion.div style={{ x, borderRadius, scale, overflow: 'hidden' }}>
      {children}
    </motion.div>
  )
}

// ─── Description Animated ─────────────────────────────────────────────────────

export const DescriptionAnimated = ({ scrollYProgress, children }: AnimationProps) => {
  const x = useTransform(scrollYProgress, [0.45, 0.6], ['-10%', '0%'])
  const opacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1])

  return (
    <motion.div style={{ x, opacity, width: '100%' }}>
      {children}
    </motion.div>
  )
}

// ─── Links Animated ───────────────────────────────────────────────────────────

export const LinksAnimated = ({ scrollYProgress, children }: AnimationProps) => {
  const y = useTransform(scrollYProgress, [0.6, 0.7], ['30px', '0px'])
  const opacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1])

  return (
    <motion.div style={{ y, opacity }}>
      {children}
    </motion.div>
  )
}

// ─── SaluteHand Animated ──────────────────────────────────────────────────────

const MotionSaluteHand = motion.create(StyledSaluteHand)

export const SaluteHandAnimated = ({ scrollYProgress, children }: AnimationProps) => {
  const opacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1])

  return (
    <MotionSaluteHand
      style={{ opacity }}
      animate={{ rotate: [-40, 20, -10, 20, 0] }}
      transition={{ duration: 1.2, delay: 1, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
    >
      {children}
    </MotionSaluteHand>
  )
}
