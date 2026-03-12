'use client'

import React, { useCallback } from 'react'
import * as THREE from 'three'

import ThreeCanvas from '@/app/components/ThreeCanvas'

import { StyledDotsBackground } from './DotsBackground.style'

// Grid layout
const COLS = 42
const ROWS = 24
const SPACING = 2   // world-space units between dot centers

// Dome depth — center dots are at z=0, edge dots pushed back by this much
const DOME_DEPTH = 20.0

// Breath animation
const BREATH_SPEED = 0.38  // radians/s → full cycle ≈ 16.5 s
const WAVE_WIDTH = 0.13  // transition band width in normalized-distance units
const PULSE_BOOST = 0.80  // extra scale added at peak of pulse

// Dot appearance
const BASE_SCALE = 0.1  // minimum rendered scale (always visible baseline)
const CENTER_SCALE = 0.6 // maximum scale at grid center
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

      // Grid extents (centered at origin)
      const halfW = ((COLS - 1) * SPACING) / 2
      const halfH = ((ROWS - 1) * SPACING) / 2

      type DotData = { x: number; y: number; z: number; nd: number }
      const dots: DotData[] = []

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const x = col * SPACING - halfW
          const y = row * SPACING - halfH

          // Elliptical normalized distance: 0 = center, 1 = grid border midpoints,
          // >1 = corners (they fade out completely, producing the oval silhouette)
          const nx = x / halfW
          const ny = y / halfH
          const nd = Math.sqrt(nx * nx + ny * ny)

          // Dome: center closest to camera, edges recede
          const z = -DOME_DEPTH * Math.min(nd, 1) * Math.min(nd, 1)

          dots.push({ x, y, z, nd })
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
      scene.add(mesh)

      // Lighting — soft ambient + warm directional for subtle sphere shading
      scene.add(new THREE.AmbientLight(0xffffff, 0.9))
      const dir = new THREE.DirectionalLight(0xfff8e8, 0.55)
      dir.position.set(3, 7, 14)
      scene.add(dir)

      const dummy = new THREE.Object3D()
      const clock = new THREE.Clock()
      let animId: number

      const animate = () => {
        animId = requestAnimationFrame(animate)
        const t = clock.getElapsedTime()

        // Wave position in normalized-distance space:
        // cosine → 1 (outer edge) → 0 (center) → 1 (outer edge)  per cycle
        const wavePos = 0.5 + 0.5 * Math.cos(BREATH_SPEED * t)

        for (let i = 0; i < count; i++) {
          const { x, y, z, nd } = dots[i]

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
          const pulseBoost = PULSE_BOOST * (1 - nd * 1.25)
          const scale = baseScale + pulse * pulseBoost
          const intensity = Math.min(1, baseIntensity + pulse * 0.18)

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

        renderer.render(scene, camera)
      }

      animate()

      return () => {
        cancelAnimationFrame(animId)
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
