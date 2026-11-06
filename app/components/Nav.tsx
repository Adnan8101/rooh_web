'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './ui'
import { DISCORD, links } from './links'

export default function Nav({ icon }: { icon?: string | null }) {
  const path = usePathname()
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-3 sm:top-5">
      <nav className="glass flex h-14 items-center gap-1 rounded-full p-1.5 pl-4 sm:gap-2">
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
          className="ml-1 rounded-full bg-red px-4 py-2.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/.25)] transition hover:bg-[#ff4766] sm:ml-2"
        >
          Join
        </a>
      </nav>
    </header>
  )
}
