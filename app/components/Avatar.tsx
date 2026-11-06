'use client'

import { useState } from 'react'

/** Round member photo; falls back to an initial if Discord's CDN fails. `px` picks the CDN size so small faces stay light. */
export default function Avatar({ p, className = 'size-8', px = 128 }: { p: { name: string; avatar: string }; className?: string; px?: 64 | 128 | 256 }) {
  const [broken, setBroken] = useState(false)
  const src = p.avatar.includes('size=') ? p.avatar.replace(/size=\d+/, `size=${px}`) : `${p.avatar}${p.avatar.includes('?') ? '&' : '?'}size=${px}`
  return (
    <span className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-violet/40 text-xs font-semibold text-white ${className}`}>
      {broken ? (
        [...p.name][0]?.toUpperCase()
      ) : (
        <img src={src} alt="" loading="lazy" decoding="async" width={px} height={px} onError={() => setBroken(true)} className="size-full object-cover" />
      )}
    </span>
  )
}
