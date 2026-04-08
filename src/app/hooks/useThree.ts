import { useEffect, useRef } from 'react'
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'

type SetupFn = (ctx: {
  scene: Scene
  camera: PerspectiveCamera
  renderer: WebGLRenderer
}) => (() => void) | void

const useThree = (setup: SetupFn) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    const camera = new PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    )

    const scene = new Scene()

    const cleanup = setup({ scene, camera, renderer })

    const handleResize = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cleanup?.()
      renderer.dispose()
    }
  }, [setup])

  return canvasRef
}

export default useThree
