import React from 'react'

import { StyledFlex } from './FlexContainer.style'

export type FlexContainerProps = {
  children?: React.ReactNode
  direction?: string
  justify?: string
  align?: string
  gap?: string
  wrap?: string
  width?: string
  height?: string
  maxWidth?: string
  maxHeight?: string
  minWidth?: string
  minHeight?: string
  padding?: string
  margin?: string
  background?: string
  textAlign?: string
  flex?: string
  position?: string
  zIndex?: number
  fontSize?: string
  overflow?: string
  className?: string
  id?: string
  as?: React.ElementType
}

const FlexContainer: React.FC<FlexContainerProps> = ({
  children,
  direction,
  justify,
  align,
  gap,
  wrap,
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  padding,
  margin,
  background,
  textAlign,
  flex,
  fontSize,
  position,
  zIndex,
  overflow,
  className,
  id,
  as
}) => {
  return (
    <StyledFlex
      $direction={direction}
      $justify={justify}
      $align={align}
      $gap={gap}
      $wrap={wrap}
      $width={width}
      $height={height}
      $maxWidth={maxWidth}
      $maxHeight={maxHeight}
      $minWidth={minWidth}
      $minHeight={minHeight}
      $padding={padding}
      $margin={margin}
      $background={background}
      $textAlign={textAlign}
      $flex={flex}
      $fontSize={fontSize}
      $position={position}
      $zIndex={zIndex}
      $overflow={overflow}
      className={className}
      id={id}
      as={as}
    >
      {children}
    </StyledFlex>
  )
}

export default FlexContainer
