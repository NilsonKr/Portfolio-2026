'use client'

import React, { useCallback } from 'react'
import * as THREE from 'three'

import ThreeCanvas from '@/app/components/ThreeCanvas'

import { StyledThreeDemo } from './ThreeDemo.style'

// Disc layout
const MAX_RINGS = 12
const RING_SPACING = 2
const DOME_DEPTH = 15

// Cycle timing (seconds)
const FILL_DURATION = 3.5  // scale up center → edge
const HOLD_DURATION = 1.0  // all dots at peak, pause
const UNFILL_DURATION = 3.5  // scale down edge → center
const CYCLE = FILL_DURATION + HOLD_DURATION + UNFILL_DURATION

// Dot scales
const BASE_SCALE = 0.12 // minimum size (always visible)
const CENTER_PEAK = 1 // peak scale at center ring
const EDGE_PEAK = 0.18  // peak scale at outer ring
const TRANSITION_WIDTH = 1.8 // softness of the wave front

// Colors
const BG = { r: 253 / 255, g: 236 / 255, b: 192 / 255 }
const DOT = { r: 26 / 255, g: 26 / 255, b: 26 / 255 }

const ThreeDemo: React.FC = () => {
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
      camera.fov = 60
      camera.position.z = 36
      camera.updateProjectionMatrix()
      renderer.setClearColor(0x000000, 0)

      // Concentric rings — ring i has 6*i dots
      type DotData = { x: number; y: number; z: number; nd: number }
      const dots: DotData[] = []
      const maxRadius = MAX_RINGS * RING_SPACING

      dots.push({ x: 0, y: 0, z: 0, nd: 0 })

      for (let i = 1; i <= MAX_RINGS; i++) {
        const r = i * RING_SPACING
        const nd = r / maxRadius
        const n = 6 * i
        const z = -DOME_DEPTH * nd * nd
        for (let j = 0; j < n; j++) {
          const angle = (2 * Math.PI * j) / n
          dots.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r, z, nd })
        }
      }

      const count = dots.length
      const geometry = new THREE.SphereGeometry(0.5, 12, 12)
      const material = new THREE.MeshStandardMaterial({ vertexColors: true })
      const instancedMesh = new THREE.InstancedMesh(geometry, material, count)
      instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
      instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(
        new Float32Array(count * 3), 3
      )
      scene.add(instancedMesh)

      scene.add(new THREE.AmbientLight(0xffffff, 0.9))
      const dir = new THREE.DirectionalLight(0xfff3d9, 0.7)
      dir.position.set(4, 8, 12)
      scene.add(dir)

      const dummy = new THREE.Object3D()
      const clock = new THREE.Clock()

      // Mouse — canvas only
      const canvas = renderer.domElement
      const mouse = { x: 0, y: 0 }
      const camTarget = { x: 0, y: 0 }
      let isHovered = false

      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      }
      const handleMouseEnter = () => { isHovered = true }
      const handleMouseLeave = () => { isHovered = false }

      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseenter', handleMouseEnter)
      canvas.addEventListener('mouseleave', handleMouseLeave)

      let animId: number

      const animate = () => {
        animId = requestAnimationFrame(animate)
        const t = clock.getElapsedTime()

        const tMod = t % CYCLE
        let waveR: number
        if (tMod < FILL_DURATION) {
          waveR = (tMod / FILL_DURATION) * maxRadius
        } else if (tMod < FILL_DURATION + HOLD_DURATION) {
          waveR = maxRadius
        } else {
          waveR = maxRadius * (1 - (tMod - FILL_DURATION - HOLD_DURATION) / UNFILL_DURATION)
        }

        for (let i = 0; i < count; i++) {
          const { x, y, z, nd } = dots[i]

          // How far along the reveal this dot is (0 = base size, 1 = peak size)
          // smoothstep on waveR works for both fill and unfill directions
          const r = nd * maxRadius
          const progress = Math.max(0, Math.min(1, (waveR - r) / TRANSITION_WIDTH))
          const eased = progress * progress * (3 - 2 * progress)

          const peakScale = CENTER_PEAK + (EDGE_PEAK - CENTER_PEAK) * nd
          const scale = BASE_SCALE + (peakScale - BASE_SCALE) * eased

          dummy.position.set(x, y, z)
          dummy.scale.setScalar(scale)
          dummy.updateMatrix()
          instancedMesh.setMatrixAt(i, dummy.matrix)

          const v = eased * (0.85 + 0.15 * (1 - nd))
          instancedMesh.instanceColor!.setXYZ(
            i,
            BG.r + (DOT.r - BG.r) * v,
            BG.g + (DOT.g - BG.g) * v,
            BG.b + (DOT.b - BG.b) * v
          )
        }

        instancedMesh.instanceMatrix.needsUpdate = true
        instancedMesh.instanceColor!.needsUpdate = true

        const targetX = isHovered ? mouse.x * 4.5 : 0
        const targetY = isHovered ? mouse.y * 3.0 : 0
        camTarget.x += (targetX - camTarget.x) * 0.06
        camTarget.y += (targetY - camTarget.y) * 0.06
        camera.position.x = camTarget.x
        camera.position.y = -camTarget.y
        camera.lookAt(scene.position)

        renderer.render(scene, camera)
      }

      animate()

      return () => {
        cancelAnimationFrame(animId)
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseenter', handleMouseEnter)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
        geometry.dispose()
        material.dispose()
      }
    },
    []
  )

  return (
    <StyledThreeDemo>
      <ThreeCanvas setup={setup} />
    </StyledThreeDemo>
  )
}

export default ThreeDemo
