import { Container } from './glowComponent.styled'

const WhiteGlow: React.FC<any> = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default WhiteGlow