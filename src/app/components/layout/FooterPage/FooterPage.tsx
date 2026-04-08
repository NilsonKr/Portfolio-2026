'use client'
import { useContext } from 'react'

import { StyledFooterContainer } from './footerPage.styled'

import { ContentfulContext } from '@/app/context/contentful'

import ParagraphComponent from '../../ParagraphComponent'

const FooterPage = () => {
  const { aboutMe } = useContext(ContentfulContext)

  return (
    <StyledFooterContainer>
      <ParagraphComponent fontSize='.8rem'> Copyright® 2026 <a href={aboutMe?.fields?.github} target='_blank'>Nilson Diaz</a> </ParagraphComponent>
      <ParagraphComponent fontSize='.8rem'> Made with 💛 <a target='_blank' href='https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSGLrbHdTCXldJLTrswcpjQBtQPJJqbWVqglhHRcTsvpPkkLgDshzpHkBcDDDRLzCCRBbKst'>nilson444diaz@gmail.com</a> </ParagraphComponent>
    </StyledFooterContainer>
  )
}

export default FooterPage
