'use client'

import React from 'react'

import * as THREE from 'three'

import useThree from '@/app/hooks/useThree'

import { StyledCanvas } from './ThreeCanvas.style'

type ThreeCanvasProps = {
  setup: (ctx: {
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
  }) => (() => void) | void
  className?: string
}

const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ setup, className }) => {
  const canvasRef = useThree(setup)

  return <StyledCanvas ref={canvasRef} className={className} />
}

export default ThreeCanvas
