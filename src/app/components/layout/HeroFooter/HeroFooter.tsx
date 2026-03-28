import { motion } from 'framer-motion'
import { IoMdArrowRoundUp } from 'react-icons/io'

import { StyledContainer } from './heroFooter.styled'

const HeroFooter = () => {
  return (
    <StyledContainer justify='center' align='center'>
      <motion.div
        animate={{ y: [0, -14, 0, 0, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
      >
        <IoMdArrowRoundUp size={24} color='var(--color-text)' />
      </motion.div>
    </StyledContainer>
  )
}

export default HeroFooter
