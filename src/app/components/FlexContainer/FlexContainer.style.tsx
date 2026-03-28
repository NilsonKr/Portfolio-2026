import styled from 'styled-components'

type StyledProps = {
  $direction?: string
  $justify?: string
  $align?: string
  $gap?: string
  $wrap?: string
  $width?: string
  $height?: string
  $maxWidth?: string
  $maxHeight?: string
  $minWidth?: string
  $minHeight?: string
  $padding?: string
  $margin?: string
  $background?: string
  $textAlign?: string
  $flex?: string
  $position?: string
  $zIndex?: number
  $overflow?: string
}

export const StyledFlex = styled.div<StyledProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction ?? 'row'};
  justify-content: ${({ $justify }) => $justify ?? 'flex-start'};
  align-items: ${({ $align }) => $align ?? 'stretch'};
  gap: ${({ $gap }) => $gap ?? '0'};
  flex-wrap: ${({ $wrap }) => $wrap ?? 'nowrap'};
  width: ${({ $width }) => $width ?? 'auto'};
  height: ${({ $height }) => $height ?? 'auto'};
  max-width: ${({ $maxWidth }) => $maxWidth ?? 'unset'};
  max-height: ${({ $maxHeight }) => $maxHeight ?? 'unset'};
  min-width: ${({ $minWidth }) => $minWidth ?? 'unset'};
  min-height: ${({ $minHeight }) => $minHeight ?? 'unset'};
  padding: ${({ $padding }) => $padding ?? '0'};
  margin: ${({ $margin }) => $margin ?? '0'};
  background: ${({ $background }) => $background ?? 'transparent'};
  text-align: ${({ $textAlign }) => $textAlign ?? 'unset'};
  flex: ${({ $flex }) => $flex ?? 'unset'};
  position: ${({ $position }) => $position ?? 'static'};
  z-index: ${({ $zIndex }) => $zIndex ?? 'auto'};
  overflow: ${({ $overflow }) => $overflow ?? 'visible'};
`
