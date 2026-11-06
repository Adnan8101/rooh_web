import Link from 'next/link'
import { DISCORD, links } from './links'
import { DiscordIcon, Eclipse, Logo } from './ui'

export default function Footer({ icon }: { icon?: string | null }) {
  return (
    <footer className="relative mt-40 overflow-hidden border-t border-white/[.06]">
      <div aria-hidden className="absolute -bottom-[560px] left-1/2 w-[900px] max-w-[180vw] -translate-x-1/2 opacity-70">
        <Eclipse />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pt-16 sm:grid-cols-[1.5fr_1fr_1fr] sm:px-8">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Logo icon={icon} className="w-11" />
            <span className="text-lg font-semibold tracking-[-0.02em]">ROOH</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-haze">
            A highly active Discord community with nonstop chats, voice hangouts and a lively space for Hindi and English speakers. One of the best Indian Discord servers for
            socializing and hanging out.
          </p>
        </div>
        <nav className="flex flex-col gap-3 text-sm">
          <p className="font-mono text-xs uppercase tracking-widest text-haze/60">Explore</p>
          {[{ href: '/', label: 'Home' }, ...links].map((l) => (
            <Link key={l.href} href={l.href} className="w-fit text-mist/80 transition hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-3 text-sm">
          <p className="font-mono text-xs uppercase tracking-widest text-haze/60">Community</p>
          <a href={DISCORD} target="_blank" rel="noreferrer" className="flex w-fit items-center gap-2 text-mist/80 transition hover:text-white">
            <DiscordIcon className="size-4" /> discord.gg/rooh
          </a>
        </div>
      </div>

      <p
        aria-hidden
        className="display rise pointer-events-none relative mt-16 select-none bg-linear-to-b from-white/[.16] to-transparent bg-clip-text text-center text-[34vw] leading-[0.75] text-transparent xl:text-[440px]"
      >
        ROOH
      </p>
      <p className="relative mx-auto flex max-w-7xl justify-between border-t border-white/[.06] px-5 py-6 text-xs text-haze/70 sm:px-8">
        <span>© {new Date().getFullYear()} ROOH</span>
        <span>Made for the ROOH Discord</span>
      </p>
    </footer>
  )
}
