import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiLocationMarker } from "react-icons/hi";

import { StyledContainer } from './heroHeader.styled'

import ParagraphComponent from '../../ParagraphComponent'
import GlassContainer from "../../GlassContainer"
import FlexContainer from '../../FlexContainer'

const NavbarHero = () => {
  return (
    <StyledContainer justify='center' align='center' direction='column' gap='5px'>
      <ParagraphComponent>
        <HiLocationMarker /> Bogota D.C, Colombia
      </ParagraphComponent>
      <FlexContainer justify='center' align='center' gap='12px' >
        <GlassContainer borderRadius='50%' cursor='pointer' onClick={() => window.open('https://github.com/NilsonKr', '_blank')}>
          <FaGithub size={24} />
        </GlassContainer>
        <GlassContainer borderRadius='50%' cursor='pointer' onClick={() => window.open('https://linkedin.com/in/nilson-d', '_blank')}>
          <FaLinkedin size={24} />
        </GlassContainer>
      </FlexContainer>
    </StyledContainer>
  )
}

export default NavbarHero