import type { ReactNode } from 'react'
import { DISCORD } from './links'
import { btn, DiscordIcon, Eclipse } from './ui'

/** Closing call to action: the eclipse rises behind it like a horizon. */
export default function Finale({ title, sub }: { title: ReactNode; sub: string }) {
  return (
    <section className="card reveal mx-auto mt-32 max-w-7xl px-6 pt-24 pb-40 text-center sm:pt-32 sm:pb-52">
      <div aria-hidden className="absolute top-[62%] left-1/2 -z-10 w-[1100px] max-w-[220%] -translate-x-1/2">
        {/* the horizon climbs as the section scrolls in */}
        <div className="rise">
          <Eclipse />
        </div>
      </div>
      <h2 className="display text-silver mx-auto max-w-3xl pb-1 text-5xl sm:text-7xl">{title}</h2>
      <p className="mx-auto mt-5 max-w-md text-lg text-balance text-haze">{sub}</p>
      <a href={DISCORD} target="_blank" rel="noreferrer" className={`${btn.brand} mt-10`}>
        <DiscordIcon /> Join the server
      </a>
    </section>
  )
}
