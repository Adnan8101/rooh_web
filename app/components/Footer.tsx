import Link from 'next/link'
import { DISCORD, links } from './links'
import { DiscordIcon, Eclipse, Logo } from './ui'

export default function Footer({ icon }: { icon?: string | null }) {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/[.06] sm:mt-40">
      <div aria-hidden className="absolute -bottom-[560px] left-1/2 w-[900px] max-w-[180vw] -translate-x-1/2 opacity-70">
        <Eclipse />
      </div>
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 pt-14 sm:grid-cols-[1.5fr_1fr_1fr] sm:gap-12 sm:px-8 sm:pt-16">
        <div className="col-span-2 sm:col-span-1">
          <Link href="/" className="flex w-fit items-center gap-3">
            <Logo icon={icon} className="w-11" />
            <span className="text-lg font-semibold tracking-[-0.02em]">ROOH</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-haze">
            A highly active Discord community with nonstop chats, voice hangouts and a lively space for Hindi and English speakers. One of the best Indian Discord servers for
            socializing and hanging out.
          </p>
        </div>
        <nav className="flex flex-col gap-1 text-sm sm:gap-3">
          <p className="mb-2 font-mono text-xs tracking-widest text-haze/60 uppercase sm:mb-0">Explore</p>
          {[{ href: '/', label: 'Home' }, ...links].map((l) => (
            <Link key={l.href} href={l.href} className="w-fit py-1.5 text-mist/80 transition hover:text-white sm:py-0">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-1 text-sm sm:gap-3">
          <p className="mb-2 font-mono text-xs tracking-widest text-haze/60 uppercase sm:mb-0">Community</p>
          <a href={DISCORD} target="_blank" rel="noreferrer" className="flex w-fit items-center gap-2 py-1.5 text-mist/80 transition hover:text-white sm:py-0">
            <DiscordIcon className="size-4" /> discord.gg/rooh
          </a>
        </div>
      </div>

      <p
        aria-hidden
        className="display rise pointer-events-none relative mt-12 select-none bg-linear-to-b from-white/[.16] to-transparent bg-clip-text text-center text-[34vw] leading-[0.75] text-transparent sm:mt-16 xl:text-[440px]"
      >
        ROOH
      </p>
      <p className="relative mx-auto flex max-w-7xl justify-between gap-4 border-t border-white/[.06] px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-xs text-haze/70 sm:px-8">
        <span>© {new Date().getFullYear()} ROOH</span>
        <span>Made for the ROOH Discord</span>
      </p>
    </footer>
  )
}
