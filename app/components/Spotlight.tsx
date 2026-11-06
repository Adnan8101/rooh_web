'use client'

import { useEffect } from 'react'

/** One listener for the whole site: tells the card under the pointer where the light is, at most once a frame. */
export default function Spotlight() {
  useEffect(() => {
    let frame = 0
    let last: PointerEvent | null = null
    const paint = () => {
      frame = 0
      const el = (last?.target as Element | null)?.closest?.<HTMLElement>('.card')
      if (!el || !last) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${last.clientX - r.left}px`)
      el.style.setProperty('--my', `${last.clientY - r.top}px`)
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      last = e
      frame ||= requestAnimationFrame(paint)
    }
    addEventListener('pointermove', move, { passive: true })
    return () => {
      removeEventListener('pointermove', move)
      cancelAnimationFrame(frame)
    }
  }, [])
  return null
}
