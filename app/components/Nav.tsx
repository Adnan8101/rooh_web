'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Logo } from './ui'
import { DISCORD, links } from './links'

/** Floating glass pill. Slides away while you read down the page, returns the moment you scroll back up. */
export default function Nav({ icon }: { icon?: string | null }) {
  const path = usePathname()
  const [state, setState] = useState({ hidden: false, solid: false })

  useEffect(() => {
    let last = scrollY
    let frame = 0
    const read = () => {
      frame = 0
      const y = scrollY
      const d = y - last
      // small jitters (and iOS rubber-banding) should not flip the nav
      if (Math.abs(d) < 6 && y > 0) return
      setState({ hidden: d > 0 && y > 160, solid: y > 24 })
      last = y
    }
    const on = () => (frame ||= requestAnimationFrame(read))
    addEventListener('scroll', on, { passive: true })
    return () => {
      removeEventListener('scroll', on)
      cancelAnimationFrame(frame)
    }
  }, [])

  // a route change always brings the nav back
  useEffect(() => setState((s) => ({ ...s, hidden: false })), [path])

  return (
    <header
      className={`fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-50 flex justify-center px-3 transition-transform duration-500 ease-out will-change-transform sm:top-5 ${
        state.hidden ? '-translate-y-[calc(100%+1.5rem)]' : ''
      }`}
    >
      <nav
        className={`glass flex h-14 items-center gap-0.5 rounded-full p-1.5 pl-4 transition-[background-color] duration-500 [--glass-blur:24px] sm:gap-2 ${
          state.solid ? '[--glass-tint:rgb(14_6_23/.82)]' : ''
        }`}
      >
        <Link href="/" aria-label="ROOH home" className="-ml-2.5 mr-1 flex items-center gap-2.5 sm:mr-3">
          <Logo icon={icon} className="w-10" />
          <span className="hidden text-[15px] font-semibold tracking-[-0.02em] sm:block">ROOH</span>
        </Link>
        {links.map((l) => {
          const active = path.startsWith(l.href)
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? 'page' : undefined}
              className={`rounded-full px-3 py-2 text-sm transition duration-300 sm:px-4 ${
                active ? 'bg-white/10 text-white shadow-[inset_0_1px_0_rgb(255_255_255/.1)]' : 'text-haze hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          )
        })}
        <a
          href={DISCORD}
          target="_blank"
          rel="noreferrer"
          className="ml-1 rounded-full bg-red px-4 py-2.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/.25)] transition hover:bg-[#ff4766] active:scale-95 sm:ml-2"
        >
          Join
        </a>
      </nav>
    </header>
  )
}
