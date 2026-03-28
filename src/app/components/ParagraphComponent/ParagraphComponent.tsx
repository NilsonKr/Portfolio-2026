import React from 'react'

import { StyledParagraph } from './ParagraphComponent.style'

export type ParagraphComponentProps = {
  children: React.ReactNode
  fontSize?: string
  fontWeight?: number | string
  color?: string
  lineHeight?: string
  letterSpacing?: string
  margin?: string
  textShadow?: string
  gradient?: string
  maxWidth?: string
  textAlign?: string
  className?: string
  zIndex?: number
  id?: string
  as?: React.ElementType
}

const ParagraphComponent: React.FC<ParagraphComponentProps> = ({
  fontSize,
  fontWeight,
  color,
  lineHeight,
  letterSpacing,
  margin,
  textShadow,
  gradient,
  maxWidth,
  textAlign,
  zIndex,
  className,
  id,
  as,
  children
}) => {
  return (
    <StyledParagraph
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $color={color}
      $lineHeight={lineHeight}
      $letterSpacing={letterSpacing}
      $margin={margin}
      $textShadow={textShadow}
      $gradient={gradient}
      $maxWidth={maxWidth}
      $textAlign={textAlign}
      $zIndex={zIndex}
      className={className}
      id={id}
      as={as}
    >
      {children}
    </StyledParagraph>
  )
}

export default ParagraphComponent
