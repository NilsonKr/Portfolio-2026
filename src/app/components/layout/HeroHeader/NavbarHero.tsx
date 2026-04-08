import { useContext } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiLocationMarker } from "react-icons/hi";

import { StyledContainer, StyledIconsContainer } from './heroHeader.styled'

import { ContentfulContext } from '@/app/context/contentfulClient';

import ParagraphComponent from '../../ParagraphComponent'
import GlassContainer from "../../GlassContainer"

const NavbarHero = () => {
  const { aboutMe } = useContext(ContentfulContext)

  return (
    <StyledContainer justify='center' align='center' direction='column' gap='5px'>
      <ParagraphComponent>
        <HiLocationMarker /> Bogota D.C, Colombia
      </ParagraphComponent>
      <StyledIconsContainer>
        <GlassContainer borderRadius='50%' cursor='pointer' onClick={() => window.open(aboutMe?.fields?.github, '_blank')}>
          <FaGithub size={24} />
        </GlassContainer>
        <GlassContainer borderRadius='50%' cursor='pointer' onClick={() => window.open(aboutMe?.fields?.linkedIn, '_blank')}>
          <FaLinkedin size={24} />
        </GlassContainer>
      </StyledIconsContainer>
    </StyledContainer>
  )
}

export default NavbarHero