'use client'
import { RefObject } from 'react'

import { StyledAboutMeContainer, StyledStickyContainer } from './aboutMe.styled'

import FlexContainer from '../../FlexContainer'
import TitleComponent from '../../TitleComponent'

type ComponentProps = {
  containerRef: RefObject<null>
}

const AboutMe: React.FC<ComponentProps> = ({ containerRef }) => {


  return (
    <StyledAboutMeContainer ref={containerRef}>
      <StyledStickyContainer>
        <FlexContainer justify='center' align='center' height='100%'>
          <TitleComponent margin='0 auto'>HI!, I'M NILSON DIAZ</TitleComponent>
        </FlexContainer>
      </StyledStickyContainer>
    </StyledAboutMeContainer>
  )
}

export default AboutMe
