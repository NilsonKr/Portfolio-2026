import { StyledGlassContainer } from './GlassContainer.style'

export type GlassContainerProps = {
  children?: React.ReactNode
  width?: string
  height?: string
  minWidth?: string
  minHeight?: string
  maxWidth?: string
  maxHeight?: string
  padding?: string
  margin?: string
  borderRadius?: string
  blur?: string
  shadowSize?: number
  className?: string
  id?: string
  as?: React.ElementType
  cursor?: string
  onClick?: () => void
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
  cursor,
  onClick,
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
      $borderRadius={borderRadius}
      blur={blur}
      shadowSize={shadowSize}
      className={className}
      id={id}
      as={as}
      $cursor={cursor}
      onClick={onClick}
    >
      {children}
    </StyledGlassContainer>
  )
}

export default GlassContainer