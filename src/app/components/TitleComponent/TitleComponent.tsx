import React from 'react'

import { StyledTitle } from './TitleComponent.style'

export type TitleComponentProps = {
  children: React.ReactNode
  fontSize?: string
  fontWeight?: number | string
  fontFamily?: string
  color?: string
  lineHeight?: string
  letterSpacing?: string
  margin?: string
  className?: string
  textShadow?: string
  gradient?: string
  zIndex?: number
  id?: string
  as?: React.ElementType
}

const TitleComponent: React.FC<TitleComponentProps> = ({
  fontSize,
  fontWeight,
  fontFamily,
  color,
  lineHeight,
  letterSpacing,
  margin,
  textShadow,
  gradient,
  zIndex,
  className,
  id,
  as,
  children
}) => {
  return (
    <StyledTitle
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $fontFamily={fontFamily}
      $color={color}
      $lineHeight={lineHeight}
      $letterSpacing={letterSpacing}
      $zIndex={zIndex}
      $textShadow={textShadow}
      $gradient={gradient}
      $margin={margin}
      className={className}
      id={id}
      as={as}
    >
      {children}
    </StyledTitle>
  )
}

export default TitleComponent
