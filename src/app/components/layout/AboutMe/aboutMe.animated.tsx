'use client'

import React, { useState, useEffect, useRef } from 'react'

import { MotionValue, motion, useTransform, useMotionValueEvent, useAnimationControls } from 'motion/react'

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

type SaluteHandAnimationProps = AnimationProps & {
  hovering?: boolean
}

export const SaluteHandAnimated = ({ scrollYProgress, hovering, children }: SaluteHandAnimationProps) => {
  const [triggered, setTriggered] = useState(false)
  const controls = useAnimationControls()
  const cooldown = useRef(false)

  const playAnimation = async () => {
    if (cooldown.current) return
    cooldown.current = true
    await controls.start({ y: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } })
    await controls.start({ rotate: [30, -10, 30, -10, 0], transition: { duration: 0.6, ease: 'easeInOut' } })
    await controls.start({ y: 20, opacity: 0, transition: { delay: 0.5, duration: 0.4, ease: 'easeIn' } })
    cooldown.current = false
  }

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (value >= 0.8 && !triggered) {
      setTriggered(true)
      playAnimation()
    }

    if (value < 0.8 && triggered) {
      setTriggered(false)
      controls.stop()
      controls.set({ y: 20, opacity: 0 })
      cooldown.current = false
    }
  })

  useEffect(() => {
    if (hovering) playAnimation()
  }, [hovering])

  return (
    <MotionSaluteHand
      initial={{ y: 20, opacity: 0 }}
      animate={controls}
    >
      {children}
    </MotionSaluteHand>
  )
}
