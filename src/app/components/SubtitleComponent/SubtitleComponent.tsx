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
  gradient?: string
  style?: React.CSSProperties
  className?: string
  zIndex?: number
  id?: string
  as?: React.ElementType
}

const SubtitleComponent = React.forwardRef<HTMLHeadingElement, SubtitleComponentProps>(({
  fontSize,
  fontWeight,
  color,
  lineHeight,
  letterSpacing,
  margin,
  zIndex,
  textShadow,
  gradient,
  style,
  className,
  id,
  as,
  children
}, ref) => {
  return (
    <StyledSubtitle
      ref={ref}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $color={color}
      $lineHeight={lineHeight}
      $letterSpacing={letterSpacing}
      $zIndex={zIndex}
      $margin={margin}
      $textShadow={textShadow}
      $gradient={gradient}
      style={style}
      className={className}
      id={id}
      as={as}
    >
      {children}
    </StyledSubtitle>
  )
})

SubtitleComponent.displayName = 'SubtitleComponent'

export default SubtitleComponent
