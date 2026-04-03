'use client'

import { MotionValue, motion, useTransform } from 'motion/react'

import { StyledTechStack } from './experienceItem.styled'
import ParagraphComponent from '@/app/components/ParagraphComponent'
import { ParagraphComponentProps } from '@/app/components/ParagraphComponent/ParagraphComponent'

type StyledAnimatedTechStackProps = React.ComponentProps<typeof StyledTechStack> & {
  scrollYProgress: MotionValue<number>
}

export const StyledAnimatedTechStack = ({ scrollYProgress, ...props }: StyledAnimatedTechStackProps) => {
  const opacity = useTransform(scrollYProgress, [0.35, 0.50], [0, 1])

  return (
    <motion.div style={{ opacity }}>
      <StyledTechStack {...props} />
    </motion.div>
  )
}


type AnimatedDateRangeProps = ParagraphComponentProps & {
  scrollYProgress: MotionValue<number>
  main: boolean
}

export const AnimatedDateRange = ({ scrollYProgress, main, ...props }: AnimatedDateRangeProps) => {
  const opacity = useTransform(scrollYProgress, main ? [0.4, 0.50] : [0.8, 0.9], [0, 1])
  const x = useTransform(scrollYProgress, main ? [0.4, 0.50] : [0.8, 0.9], [-30, 0])

  return (
    <motion.div style={{ opacity, x }}>
      <ParagraphComponent {...props} />
    </motion.div>
  )
}
