'use client'

import React, { useCallback } from 'react'
import * as THREE from 'three'

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
const PULSE_BOOST = 1 // extra scale added at peak of pulse

// Cursor influence
const CURSOR_RADIUS = 6   // world-space radius around cursor that affects dots
const CURSOR_BOOST = 0.6  // max extra scale when cursor is directly over a dot

// Tilt effect
const MAX_TILT = 0.2   // max rotation in radians (~10°)
const TILT_LERP = 0.04    // lerp speed per frame toward target rotation

// Dot appearance
const BASE_SCALE = 0.1  // minimum rendered scale (always visible baseline)
const CENTER_SCALE = 0.65 // maximum scale at grid center
const FADE_EXPONENT = 1.5   // power curve shaping the size/color falloff

// Project colors
const BG = { r: 253 / 255, g: 236 / 255, b: 192 / 255 }
const DOT = { r: 26 / 255, g: 26 / 255, b: 26 / 255 }

type DotsBackgroundProps = {
  width?: string
  height?: string
}

const DotsBackground: React.FC<DotsBackgroundProps> = ({
  width = '100%',
  height = '500px',
}) => {
  const setup = useCallback(
    ({
      scene,
      camera,
      renderer,
    }: {
      scene: THREE.Scene
      camera: THREE.PerspectiveCamera
      renderer: THREE.WebGLRenderer
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

      type DotData = { x: number; y: number; z: number; nd: number; pulseAllow: number }
      const dots: DotData[] = []

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const x = colX[col]
          const y = rowY[row]

          // Elliptical normalized distance using actual (stretched) extents
          const nx = x / actualHalfW
          const ny = y / actualHalfH
          const nd = Math.sqrt(nx * nx + ny * ny)

          // Dome: center closest to camera, edges recede
          const z = -DOME_DEPTH * Math.min(nd, 1) * Math.min(nd, 1)

          // Distance (in dot count) from the nearest grid edge
          const edgeDist = Math.min(row, ROWS - 1 - row, col, COLS - 1 - col)
          // Smoothly allow pulse only for dots beyond the margin
          const pulseAllow = Math.min(1, edgeDist / PULSE_EDGE_MARGIN)

          dots.push({ x, y, z, nd, pulseAllow })
        }
      }

      const count = dots.length
      const geometry = new THREE.SphereGeometry(0.5, 10, 10)
      const material = new THREE.MeshStandardMaterial({ vertexColors: true })
      const mesh = new THREE.InstancedMesh(geometry, material, count)
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
      mesh.instanceColor = new THREE.InstancedBufferAttribute(
        new Float32Array(count * 3), 3
      )
      const group = new THREE.Group()
      group.add(mesh)
      scene.add(group)

      // Lighting — soft ambient + warm directional for subtle sphere shading
      scene.add(new THREE.AmbientLight(0xffffff, 0.9))
      const dir = new THREE.DirectionalLight(0xfff8e8, 0.55)
      dir.position.set(3, 7, 14)
      scene.add(dir)

      // Mouse tracking
      const cursor = { x: 0, y: 0, active: false }
      const tiltTarget = { x: 0, y: 0 }
      const _unproject = new THREE.Vector3()

      const onMouseMove = (e: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect()
        const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1
        const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1

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

      renderer.domElement.addEventListener('mousemove', onMouseMove)
      renderer.domElement.addEventListener('mouseleave', onMouseLeave)

      const dummy = new THREE.Object3D()
      const clock = new THREE.Clock()
      let animId: number

      const animate = () => {
        animId = requestAnimationFrame(animate)
        const t = clock.getElapsedTime()

        // Wave oscillates between center (0) and the outer animated boundary (~0.85),
        // which is roughly where the last 3 rows/cols begin. Starts at that outer
        // boundary so the pulse is visible immediately on load.
        const MAX_WAVE_POS = 0.85
        const wavePos = MAX_WAVE_POS * (0.5 + 0.5 * Math.cos(BREATH_SPEED * t))

        for (let i = 0; i < count; i++) {
          const { x, y, z, nd, pulseAllow } = dots[i]

          // Fade-in factor: 1 at center, 0 at/beyond ellipse boundary
          const fadeT = Math.max(0, 1 - nd)
          const gradientT = Math.pow(fadeT, FADE_EXPONENT)

          // Dots beyond the ellipse boundary are fully hidden
          if (nd >= 1) {
            dummy.position.set(x, y, z)
            dummy.scale.setScalar(0)
            dummy.updateMatrix()
            mesh.setMatrixAt(i, dummy.matrix)
            mesh.instanceColor!.setXYZ(i, 0, 0, 0)
            continue
          }

          // Base scale and color intensity driven by the gradient
          const baseScale = BASE_SCALE + (CENTER_SCALE - BASE_SCALE) * gradientT
          const baseIntensity = gradientT

          // Pulse wave: how close is this dot to the current wave-front position?
          const waveDist = Math.abs(nd - wavePos)
          const rawPulse = Math.max(0, 1 - waveDist / WAVE_WIDTH)
          const pulse = rawPulse * rawPulse * (3 - 2 * rawPulse) // smoothstep

          // Pulse boost scales up toward center: full at nd=0, minimal at nd=1
          // pulseAllow fades the pulse out for dots within the last 3 rows/cols
          const pulseBoost = PULSE_BOOST * (1 - nd * 1.25) * pulseAllow
          let scale = baseScale + pulse * pulseBoost
          let intensity = Math.min(1, baseIntensity + pulse * 0.18 * pulseAllow)

          // Cursor influence: boost dots near the cursor
          if (cursor.active) {
            const dx = x - cursor.x
            const dy = y - cursor.y
            const cursorDist = Math.sqrt(dx * dx + dy * dy)
            const rawCursor = Math.max(0, 1 - cursorDist / CURSOR_RADIUS)
            const cursorT = rawCursor * rawCursor * (3 - 2 * rawCursor) // smoothstep
            scale += CURSOR_BOOST * cursorT
            intensity = Math.min(1, intensity + cursorT * 0.35)
          }

          dummy.position.set(x, y, z)
          dummy.scale.setScalar(scale)
          dummy.updateMatrix()
          mesh.setMatrixAt(i, dummy.matrix)

          mesh.instanceColor!.setXYZ(
            i,
            BG.r + (DOT.r - BG.r) * intensity,
            BG.g + (DOT.g - BG.g) * intensity,
            BG.b + (DOT.b - BG.b) * intensity
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
        cancelAnimationFrame(animId)
        renderer.domElement.removeEventListener('mousemove', onMouseMove)
        renderer.domElement.removeEventListener('mouseleave', onMouseLeave)
        geometry.dispose()
        material.dispose()
      }
    },
    []
  )

  return (
    <StyledDotsBackground $width={width} $height={height}>
      <ThreeCanvas setup={setup} />
    </StyledDotsBackground>
  )
}

export default DotsBackground
