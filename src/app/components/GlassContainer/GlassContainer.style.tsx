import styled, { css } from 'styled-components'
import { GlassContainerProps } from './GlassContainer'

type StyledProps = Omit<GlassContainerProps, 'children'>

export const StyledGlassContainer = styled.div<StyledProps>`
  /* Dimensions */
  width: ${({ width }) => (width ?? 'auto')};
  height: ${({ height }) => (height ?? 'auto')};
  min-width: ${({ minWidth }) => (minWidth ?? 'unset')};
  min-height: ${({ minHeight }) => (minHeight ?? 'unset')};
  max-width: ${({ maxWidth }) => (maxWidth ?? 'unset')};
  max-height: ${({ maxHeight }) => (maxHeight ?? 'unset')};

  /* Spacing */
  padding: ${({ padding }) => (padding ?? '1.5rem')};
  margin: ${({ margin }) => (margin ?? '0')};

  /* Border */
  border-radius: ${({ borderRadius }) => (borderRadius ?? '1.25rem')};

  /* Liquid glass base */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.18) 0%,
    rgba(255, 255, 255, 0.06) 50%,
    rgba(255, 255, 255, 0.12) 100%
  );

  /* Frosted glass blur */
  backdrop-filter: blur(${({ blur }) => (blur ?? '16px')}) saturate(180%);
  -webkit-backdrop-filter: blur(${({ blur }) => (blur ?? '16px')}) saturate(180%);

  /* Glass border highlight */
  border: 1px solid rgba(255, 255, 255, 0.35);

  /* Liquid depth shadow */
  box-shadow:
    /* Outer shadow — depth */
    ${({ shadowSize }) => {
      const s = shadowSize ?? 1
      return css`
        0 ${8 * s}px ${32 * s}px rgba(0, 0, 0, ${0.12 * s}),
        /* Inner highlight — top-left glass shine */
        inset 0 1px 1px rgba(255, 255, 255, 0.55),
        /* Inner shadow — bottom-right depth */
        inset 0 -1px 1px rgba(0, 0, 0, 0.08)
      `
    }};

  /* Liquid surface highlight overlay */
  position: relative;
  overflow: hidden;

  /* Specular highlight layer */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.28) 0%,
      transparent 45%,
      rgba(255, 255, 255, 0.06) 100%
    );
    pointer-events: none;
  }

  /* Edge refraction shimmer */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      ellipse at 20% 15%,
      rgba(255, 255, 255, 0.22) 0%,
      transparent 60%
    );
    pointer-events: none;
  }
`
