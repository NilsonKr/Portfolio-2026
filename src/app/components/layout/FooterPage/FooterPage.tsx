import { StyledFooterContainer } from './footerPage.styled'

import ParagraphComponent from '../../ParagraphComponent'

import { TypeAboutMe } from '@/app/types/contentful'

type ComponentProps = {
  aboutMe: TypeAboutMe
}

const FooterPage: React.FC<ComponentProps> = ({ aboutMe }) => {
  return (
    <StyledFooterContainer>
      <ParagraphComponent fontSize='.8rem'> Copyright® 2026 <a href={aboutMe?.fields?.github} target='_blank'>Nilson Diaz</a> </ParagraphComponent>
      <ParagraphComponent fontSize='.8rem'> Made with 💛 <a target='_blank' href='https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSGLrbHdTCXldJLTrswcpjQBtQPJJqbWVqglhHRcTsvpPkkLgDshzpHkBcDDDRLzCCRBbKst'>nilson444diaz@gmail.com</a> </ParagraphComponent>
    </StyledFooterContainer>
  )
}

export default FooterPage
