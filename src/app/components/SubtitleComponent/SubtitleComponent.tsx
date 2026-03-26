import React from 'react'

import { StyledSubtitle } from './SubtitleComponent.style'

export type SubtitleComponentProps = {
  children: React.ReactNode
  fontSize?: string
  fontWeight?: number | string
  color?: string
  lineHeight?: string
  letterSpacing?: string
  margin?: string
  textShadow?: string
  className?: string
  zIndex?: number
  id?: string
  as?: React.ElementType
}

const SubtitleComponent: React.FC<SubtitleComponentProps> = ({
  fontSize,
  fontWeight,
  color,
  lineHeight,
  letterSpacing,
  margin,
  zIndex,
  textShadow,
  className,
  id,
  as,
  children
}) => {
  return (
    <StyledSubtitle
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $color={color}
      $lineHeight={lineHeight}
      $letterSpacing={letterSpacing}
      $zIndex={zIndex}
      $margin={margin}
      $textShadow={textShadow}
      className={className}
      id={id}
      as={as}
    >
      {children}
    </StyledSubtitle>
  )
}

export default SubtitleComponent
