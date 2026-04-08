import { useContext } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiLocationMarker } from "react-icons/hi";

import { StyledContainer } from './heroHeader.styled'

import { ContentfulContext } from '@/app/context/contentful';

import ParagraphComponent from '../../ParagraphComponent'
import GlassContainer from "../../GlassContainer"
import FlexContainer from '../../FlexContainer'

const NavbarHero = () => {
  const { aboutMe } = useContext(ContentfulContext)

  return (
    <StyledContainer justify='center' align='center' direction='column' gap='5px'>
      <ParagraphComponent>
        <HiLocationMarker /> Bogota D.C, Colombia
      </ParagraphComponent>
      <FlexContainer justify='center' align='center' gap='12px' >
        <GlassContainer borderRadius='50%' cursor='pointer' onClick={() => window.open(aboutMe?.fields?.github, '_blank')}>
          <FaGithub size={24} />
        </GlassContainer>
        <GlassContainer borderRadius='50%' cursor='pointer' onClick={() => window.open(aboutMe?.fields?.linkedIn, '_blank')}>
          <FaLinkedin size={24} />
        </GlassContainer>
      </FlexContainer>
    </StyledContainer>
  )
}

export default NavbarHero