import React from 'react'

import { StyledGlassContainer } from './GlassContainer.style'

export type GlassContainerProps = {
  children?: React.ReactNode

  /* Dimensions */
  width?: string
  height?: string
  minWidth?: string
  minHeight?: string
  maxWidth?: string
  maxHeight?: string

  /* Spacing */
  padding?: string
  margin?: string

  /* Shape */
  borderRadius?: string

  /* Glass effects */
  blur?: string      // e.g. '16px' — backdrop blur intensity
  shadowSize?: number // multiplier 0–2, default 1

  /* HTML */
  className?: string
  id?: string
  as?: React.ElementType
}

const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  padding,
  margin,
  borderRadius,
  blur,
  shadowSize,
  className,
  id,
  as,
}) => {
  return (
    <StyledGlassContainer
      width={width}
      height={height}
      minWidth={minWidth}
      minHeight={minHeight}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      padding={padding}
      margin={margin}
      borderRadius={borderRadius}
      blur={blur}
      shadowSize={shadowSize}
      className={className}
      id={id}
      as={as}
    >
      {children}
    </StyledGlassContainer>
  )
}

export default GlassContainer
