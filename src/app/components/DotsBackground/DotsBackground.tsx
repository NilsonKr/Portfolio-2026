'use client'

import React, { useCallback } from 'react'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  IcosahedronGeometry,
  MeshBasicMaterial,
  InstancedMesh,
  InstancedBufferAttribute,
  DynamicDrawUsage,
  Group,
  Vector3,
  Object3D,
} from 'three'

import ThreeCanvas from '@/app/components/ThreeCanvas'

import { StyledDotsBackground } from './DotsBackground.style'

// Grid layout
const COLS = 42
const ROWS = 24
const SPACING = 1.8   // world-space units between dot centers (at center)
const SPREAD = 1   // spacing multiplier growth toward edges (cubic curve)

// Dome depth — center dots are at z=0, edge dots pushed back by this much
const DOME_DEPTH = 40.0

// Breath animation
const BREATH_SPEED = 0.9  // radians/s → full cycle ≈ 7 s
const WAVE_WIDTH = 0.13  // transition band width in normalized-distance units
const PULSE_BOOST = 0.5 // extra scale added at peak of pulse

// Cursor influence
const CURSOR_RADIUS = 6   // world-space radius around cursor that affects dots
const CURSOR_BOOST = 0.6  // max extra scale when cursor is directly over a dot

// Tilt effect
const MAX_TILT = 0.2   // max rotation in radians (~10°)
const TILT_LERP = 0.04    // lerp speed per frame toward target rotation

// Dot appearance
const BASE_SCALE = 0.07  // minimum rendered scale (always visible baseline)
const CENTER_SCALE = 0.35 // maximum scale at grid center
const FADE_EXPONENT = 1.2   // power curve shaping the size/color falloff

// Project colors
const BG = { r: 253 / 255, g: 236 / 255, b: 192 / 255 }
const DOT = { r: 0 / 255, g: 0 / 255, b: 0 / 255 }

type DotsBackgroundProps = {
}

const DotsBackground: React.FC<DotsBackgroundProps> = ({ }) => {
  const setup = useCallback(
    ({
      scene,
      camera,
      renderer,
    }: {
      scene: Scene
      camera: PerspectiveCamera
      renderer: WebGLRenderer
    }) => {
      camera.fov = 50
      camera.position.z = 42
      camera.updateProjectionMatrix()
      renderer.setClearColor(0x000000, 0)

      // Nominal half-extents based on uniform spacing
      const halfW = ((COLS - 1) * SPACING) / 2
      const halfH = ((ROWS - 1) * SPACING) / 2

      // Actual half-extents after cubic spread (edges stretch out by SPREAD factor)
      const actualHalfW = halfW * (1 + SPREAD)
      const actualHalfH = halfH * (1 + SPREAD)

      // Precompute non-uniform positions: center spacing stays at SPACING,
      // spacing increases linearly from center outward via u*(1 + SPREAD*|u|)
      // |u| makes spreading kick in right from the center rather than only at edges
      const colX = Array.from({ length: COLS }, (_, col) => {
        const u = (col / (COLS - 1)) * 2 - 1  // -1 to 1
        return halfW * u * (1 + SPREAD * Math.abs(u))
      })
      const rowY = Array.from({ length: ROWS }, (_, row) => {
        const v = (row / (ROWS - 1)) * 2 - 1  // -1 to 1
        return halfH * v * (1 + SPREAD * Math.abs(v))
      })

      // How many rows/cols from the edge before pulse is fully allowed
      const PULSE_EDGE_MARGIN = 3

      // Precomputed color deltas (DOT - BG) so we can lerp without recomputing
      const DR = DOT.r - BG.r
      const DG = DOT.g - BG.g
      const DB = DOT.b - BG.b

      type DotData = {
        i: number
        x: number
        y: number
        z: number
        nd: number
        pulseAllow: number
        pulseBoostFactor: number  // PULSE_BOOST * (1 - nd*1.25) * pulseAllow
        baseScale: number
        baseIntensity: number
        baseR: number             // BG.r + DR * baseIntensity
        baseG: number
        baseB: number
      }
      const visibleDots: DotData[] = []
      const totalCount = ROWS * COLS

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const i = row * COLS + col
          const x = colX[col]
          const y = rowY[row]

          // Elliptical normalized distance using actual (stretched) extents
          const nx = x / actualHalfW
          const ny = y / actualHalfH
          const nd = Math.sqrt(nx * nx + ny * ny)

          // Dome: center closest to camera, edges recede
          const z = -DOME_DEPTH * Math.min(nd, 1) * Math.min(nd, 1)

          // Hidden dots are written once below; skip them here
          if (nd >= 1) continue

          // Distance (in dot count) from the nearest grid edge
          const edgeDist = Math.min(row, ROWS - 1 - row, col, COLS - 1 - col)
          // Smoothly allow pulse only for dots beyond the margin
          const pulseAllow = Math.min(1, edgeDist / PULSE_EDGE_MARGIN)

          // Static-per-dot values (depend only on nd / pulseAllow)
          const fadeT = Math.max(0, 1 - nd)
          const gradientT = Math.pow(fadeT, FADE_EXPONENT)
          const baseScale = BASE_SCALE + (CENTER_SCALE - BASE_SCALE) * gradientT
          const baseIntensity = gradientT
          const pulseBoostFactor = PULSE_BOOST * (1 - nd * 1.25) * pulseAllow

          visibleDots.push({
            i, x, y, z, nd, pulseAllow,
            pulseBoostFactor,
            baseScale,
            baseIntensity,
            baseR: BG.r + DR * baseIntensity,
            baseG: BG.g + DG * baseIntensity,
            baseB: BG.b + DB * baseIntensity,
          })
        }
      }

      const count = totalCount
      const visibleCount = visibleDots.length
      const geometry = new IcosahedronGeometry(0.5, 0)
      const material = new MeshBasicMaterial()
      const mesh = new InstancedMesh(geometry, material, count)
      mesh.instanceMatrix.setUsage(DynamicDrawUsage)
      mesh.instanceColor = new InstancedBufferAttribute(
        new Float32Array(count * 3), 3
      )
      const group = new Group()
      group.add(mesh)
      scene.add(group)

      // Mouse tracking
      const cursor = { x: 0, y: 0, active: false }
      const tiltTarget = { x: 0, y: 0 }
      const _unproject = new Vector3()

      const onMouseMove = (e: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect()
        const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1
        const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1

        // Ignore events outside the canvas bounds
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
          onMouseLeave()
          return
        }

        // Unproject NDC onto the z=0 plane for dot-boost effect
        _unproject.set(ndcX, ndcY, 0.5).unproject(camera)
        const dir = _unproject.sub(camera.position).normalize()
        const dist = -camera.position.z / dir.z
        cursor.x = camera.position.x + dir.x * dist
        cursor.y = camera.position.y + dir.y * dist
        cursor.active = true

        // Tilt target from normalized cursor position
        tiltTarget.y = ndcX * MAX_TILT
        tiltTarget.x = -ndcY * MAX_TILT
      }

      const onMouseLeave = () => {
        cursor.active = false
        tiltTarget.x = 0
        tiltTarget.y = 0
      }

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseleave', onMouseLeave)

      const dummy = new Object3D()
      let isVisible = true
      const visibilityObserver = new IntersectionObserver(
        (entries) => {
          const wasVisible = isVisible
          isVisible = entries[0].isIntersecting
          if (!wasVisible && isVisible) {
            // Resume — restart the loop
            animate()
          }
        },
        { threshold: 0 }
      )
      visibilityObserver.observe(renderer.domElement)

      // Hidden dots (outside the ellipse) never change — write them once.
      // Build a Set of visible indices to identify which slots stay hidden.
      const visibleSet = new Set<number>()
      for (let v = 0; v < visibleCount; v++) visibleSet.add(visibleDots[v].i)
      dummy.position.set(0, 0, 0)
      dummy.scale.setScalar(0)
      dummy.updateMatrix()
      for (let i = 0; i < count; i++) {
        if (visibleSet.has(i)) continue
        mesh.setMatrixAt(i, dummy.matrix)
        mesh.instanceColor!.setXYZ(i, 0, 0, 0)
      }

      const CURSOR_RADIUS_SQ = CURSOR_RADIUS * CURSOR_RADIUS
      const startTime = performance.now()
      let animId: number

      const animate = () => {
        if (!isVisible) {
          animId = 0
          return
        }
        animId = requestAnimationFrame(animate)
        const t = (performance.now() - startTime) / 1000

        // Wave oscillates between center (0) and the outer animated boundary (~0.85),
        // which is roughly where the last 3 rows/cols begin. Starts at that outer
        // boundary so the pulse is visible immediately on load.
        const MAX_WAVE_POS = 0.85
        const wavePos = MAX_WAVE_POS * (0.5 + 0.5 * Math.cos(BREATH_SPEED * t))

        for (let v = 0; v < visibleCount; v++) {
          const d = visibleDots[v]
          const { i, x, y, z, nd, pulseAllow, pulseBoostFactor, baseScale, baseIntensity, baseR, baseG, baseB } = d

          // Pulse wave: how close is this dot to the current wave-front position?
          const waveDist = Math.abs(nd - wavePos)
          const rawPulse = Math.max(0, 1 - waveDist / WAVE_WIDTH)
          const pulse = rawPulse * rawPulse * (3 - 2 * rawPulse) // smoothstep

          let scale = baseScale + pulse * pulseBoostFactor
          let intensity = Math.min(1, baseIntensity + pulse * 0.18 * pulseAllow)

          // Cursor influence: boost dots near the cursor (squared-distance early exit)
          if (cursor.active) {
            const dx = x - cursor.x
            const dy = y - cursor.y
            const distSq = dx * dx + dy * dy
            if (distSq < CURSOR_RADIUS_SQ) {
              const cursorDist = Math.sqrt(distSq)
              const rawCursor = 1 - cursorDist / CURSOR_RADIUS
              const cursorT = rawCursor * rawCursor * (3 - 2 * rawCursor) // smoothstep
              scale += CURSOR_BOOST * cursorT
              intensity = Math.min(1, intensity + cursorT * 0.35)
            }
          }

          dummy.position.set(x, y, z)
          dummy.scale.setScalar(scale)
          dummy.updateMatrix()
          mesh.setMatrixAt(i, dummy.matrix)

          // Apply only the delta from base color so we skip recomputing the lerp
          const dIntensity = intensity - baseIntensity
          mesh.instanceColor!.setXYZ(
            i,
            baseR + DR * dIntensity,
            baseG + DG * dIntensity,
            baseB + DB * dIntensity
          )
        }

        mesh.instanceMatrix.needsUpdate = true
        mesh.instanceColor!.needsUpdate = true

        // Smoothly tilt the whole grid toward the cursor
        group.rotation.x += (tiltTarget.x - group.rotation.x) * TILT_LERP
        group.rotation.y += (tiltTarget.y - group.rotation.y) * TILT_LERP

        renderer.render(scene, camera)
      }

      animate()

      return () => {
        visibilityObserver.disconnect()
        cancelAnimationFrame(animId)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseleave', onMouseLeave)
        geometry.dispose()
        material.dispose()
      }
    },
    []
  )

  return (
    <StyledDotsBackground>
      <ThreeCanvas setup={setup} />
    </StyledDotsBackground>
  )
}

export default DotsBackground
