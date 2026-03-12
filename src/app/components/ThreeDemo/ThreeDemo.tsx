'use client'

import React, { useCallback } from 'react'
import * as THREE from 'three'

import ThreeCanvas from '@/app/components/ThreeCanvas'

import { StyledThreeDemo } from './ThreeDemo.style'

// Disc layout
const MAX_RINGS      = 12
const BASE_GAP       = 2.8   // spacing for the first rings
const PLATEAU_RINGS  = 3     // how many rings keep the flat spacing
const GROWTH_FACTOR  = 1.38  // gap multiplier applied after plateau (per ring)
const ARC_SPACING    = 2.0   // dot spacing along each ring circumference
const DOME_DEPTH     = 18
const RADIAL_JITTER  = 0.18  // random radial offset as fraction of ring gap
const Z_JITTER       = 10    // max z scatter at outer edge (scales with nd)

// Breath speed — full inhale+exhale cycle in seconds: 2π / BREATH_SPEED
const BREATH_SPEED = 0.45  // ~14s per cycle

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

      // Build ring radii: flat gap for first PLATEAU_RINGS, then exponential growth
      const ringRadii: number[] = []
      let cumRadius = 0
      for (let i = 1; i <= MAX_RINGS; i++) {
        const growthSteps = Math.max(0, i - PLATEAU_RINGS)
        cumRadius += BASE_GAP * Math.pow(GROWTH_FACTOR, growthSteps)
        ringRadii.push(cumRadius)
      }
      const maxRadius = ringRadii[MAX_RINGS - 1]

      type DotData = { x: number; y: number; z: number; nd: number }
      const dots: DotData[] = []

      dots.push({ x: 0, y: 0, z: 0, nd: 0 })

      for (let i = 0; i < MAX_RINGS; i++) {
        const r    = ringRadii[i]
        const nd   = r / maxRadius
        const zBase = -DOME_DEPTH * nd * nd
        const gap  = i === 0 ? BASE_GAP : ringRadii[i] - ringRadii[i - 1]
        const n    = Math.max(3, Math.round((2 * Math.PI * r) / ARC_SPACING))
        for (let j = 0; j < n; j++) {
          // Random angle and radial jitter — breaks the perfect ring
          const angleBase  = (2 * Math.PI * j) / n
          const angleJitter = (Math.random() - 0.5) * (2 * Math.PI / n) * 0.35
          const angle      = angleBase + angleJitter
          const rJitter    = (Math.random() - 0.5) * gap * RADIAL_JITTER
          const rDot       = Math.max(0, r + rJitter)
          const ndDot      = rDot / maxRadius
          // Random z offset layered on dome — creates distinct depth planes
          const zDot       = zBase + (Math.random() - 0.5) * Z_JITTER * ndDot
          dots.push({ x: Math.cos(angle) * rDot, y: Math.sin(angle) * rDot, z: zDot, nd: ndDot })
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

        // Cosine breath: 0 → maxRadius → 0 with natural ease-in/out at both ends
        const waveR = maxRadius * (0.5 - 0.5 * Math.cos(BREATH_SPEED * t))

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

        const targetX = isHovered ? mouse.x * 8.0 : 0
        const targetY = isHovered ? mouse.y * 6.0 : 0
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
