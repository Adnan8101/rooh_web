'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

/** Inertia scrolling for wheel and trackpad. Touch keeps the phone's native momentum. */
export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.085, wheelMultiplier: 0.9 })
    return () => lenis.destroy()
  }, [])
  return null
}
