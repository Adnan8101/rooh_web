import type { ReactNode } from 'react'
import { DISCORD } from './links'
import { btn, DiscordIcon, Eclipse } from './ui'

/** Closing call to action: the eclipse rises behind it like a horizon. */
export default function Finale({ title, sub }: { title: ReactNode; sub: string }) {
  return (
    <section className="card reveal mx-auto mt-24 max-w-7xl px-5 pt-20 pb-36 text-center sm:mt-32 sm:px-6 sm:pt-32 sm:pb-52">
      <div aria-hidden className="absolute top-[64%] left-1/2 -z-10 w-[190%] -translate-x-1/2 sm:top-[62%] sm:w-[1100px] sm:max-w-[220%]">
        {/* the horizon climbs as the section scrolls in */}
        <div className="rise">
          <Eclipse />
        </div>
      </div>
      <h2 className="display text-silver mx-auto max-w-3xl pb-1 text-[2.6rem] sm:text-7xl">{title}</h2>
      <p className="mx-auto mt-5 max-w-md text-balance text-haze sm:text-lg">{sub}</p>
      <a href={DISCORD} target="_blank" rel="noreferrer" className={`${btn.brand} mt-9 sm:mt-10`}>
        <DiscordIcon /> Join the server
      </a>
    </section>
  )
}
