import React from 'react'

import { StyledTag } from './TagComponent.style'

export type TagComponentProps = {
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

const TagComponent: React.FC<TagComponentProps> = ({
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
    <StyledTag
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
    </StyledTag>
  )
}

export default TagComponent
