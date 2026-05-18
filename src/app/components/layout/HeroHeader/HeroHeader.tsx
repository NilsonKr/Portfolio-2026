'use client'

import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiLocationMarker } from "react-icons/hi";

import { StyledContainer, StyledIconsContainer } from './heroHeader.styled'

import ParagraphComponent from '../../ParagraphComponent'
import GlassContainer from "../../GlassContainer"

import { TypeAboutMe } from '@/app/types/contentful';

type ComponentProps = {
  aboutMe: TypeAboutMe
}

const HeroHeader: React.FC<ComponentProps> = ({ aboutMe }) => {
  return (
    <StyledContainer justify='center' align='center' direction='column' gap='5px'>
      <ParagraphComponent>
        <HiLocationMarker /> Bogota D.C, Colombia
      </ParagraphComponent>
      <StyledIconsContainer>
        <GlassContainer borderRadius='50%' cursor='pointer' href={aboutMe?.fields?.github as string}>
          <FaGithub size={24} />
        </GlassContainer>
        <GlassContainer borderRadius='50%' cursor='pointer' href={aboutMe?.fields?.linkedIn as string}>
          <FaLinkedin size={24} />
        </GlassContainer>
      </StyledIconsContainer>
    </StyledContainer>
  )
}

export default HeroHeader