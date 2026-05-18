'use client'

import { motion, useTransform, type MotionValue } from 'motion/react'
import { IoMdArrowRoundUp } from 'react-icons/io'

import { StyledContainer, MotionWrapper } from './heroFooter.styled'

type ComponentProps = {
  scrollYprogress: MotionValue<number>
}

const HeroFooter: React.FC<ComponentProps> = ({ scrollYprogress }) => {
  const opacity = useTransform(scrollYprogress, [0, 0.5], [1, 0])

  return (
    <MotionWrapper style={{ opacity }}>
      <StyledContainer justify='center' align='center'>
        <motion.div
          animate={{ y: [0, -14, 0, 0, 0], opacity: [0, 1] }}
          transition={{
            y: {
              duration: 3, repeat: Infinity, ease: 'easeOut',
            },
            opacity: {
              duration: 0.7, delay: 6, ease: 'easeOut',
            }
          }}
        >
          <IoMdArrowRoundUp size={24} color='var(--color-text)' />
        </motion.div>
      </StyledContainer>
    </MotionWrapper>
  )
}

export default HeroFooter
