import { useEffect, useState } from 'react'

type Options = {
  idleTimeout?: number
  fallbackDelay?: number
}

const useDeferredMount = ({ idleTimeout = 2000, fallbackDelay = 200 }: Options = {}) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const schedule = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => setReady(true), { timeout: idleTimeout })
      } else {
        timeoutId = setTimeout(() => setReady(true), fallbackDelay)
      }
    }

    if (document.readyState === 'complete') {
      schedule()
    } else {
      window.addEventListener('load', schedule, { once: true })
    }

    return () => {
      window.removeEventListener('load', schedule)
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId)
    }
  }, [idleTimeout, fallbackDelay])

  return ready
}

export default useDeferredMount
