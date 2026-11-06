import Link from 'next/link'
import Finale from '../components/Finale'
import { Arrow, btn, Pill } from '../components/ui'
import { events, inr } from './data'
import { pool, Stage, Status, when } from './ui'

export const metadata = { title: 'Events · ROOH' }

export default function Events() {
  const live = events.filter((e) => e.status !== 'ended')
  const past = events.filter((e) => e.status === 'ended')

  return (
    <main className="px-4 pt-36 sm:px-8 sm:pt-44">
      <header className="hero-out mx-auto flex max-w-4xl flex-col items-center text-center">
        <Pill>Events · {events.length} nights so far</Pill>
        <h1 className="display text-silver mt-6 pb-2 text-[3.4rem] sm:text-8xl lg:text-[7.5rem]">Nights you’ll talk about tomorrow.</h1>
        <p className="mt-6 max-w-lg text-lg text-haze sm:text-xl">Spins, birthday nights and clan battles on the ROOH server - with real cash on the line.</p>
      </header>

      <div className="mx-auto mt-20 max-w-7xl space-y-5">
        {live.map((e) => (
          <Link key={e.slug} href={`/events/${e.slug}`} className="card group reveal-scale grid lg:grid-cols-2">
            <Stage e={e} className="aspect-square lg:aspect-auto lg:min-h-[600px]" />
            <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
              <Status e={e} />
              <h2 className="display mt-6 text-5xl sm:text-7xl">{e.title}</h2>
              <p className="mt-5 max-w-md text-lg text-haze sm:text-xl">{e.tagline}</p>
              {e.prizes && (
                <ul className="mt-10 grid grid-cols-3 gap-2.5 sm:gap-3">
                  {e.prizes.map((p) => (
                    <li key={p.label} className="glass rounded-2xl p-4 sm:p-5">
                      <span className="block text-3xl font-semibold tracking-tight sm:text-4xl">{p.value}</span>
                      <span className="mt-1 block text-sm text-haze">{p.label}</span>
                    </li>
                  ))}
                </ul>
              )}
              <span className={`${btn.brand} mt-10 self-start`}>
                See the event <Arrow className="transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {past.length > 0 && (
        <section className="mx-auto mt-32 max-w-7xl">
          <div className="reveal flex items-end justify-between gap-6 px-1">
            <h2 className="display text-silver text-4xl sm:text-6xl">The archive</h2>
            <p className="pb-1 text-haze">{past.length} past {past.length === 1 ? 'night' : 'nights'}</p>
          </div>
          <div className="mt-10 space-y-5">
            {past.map((e) => (
              <Link key={e.slug} href={`/events/${e.slug}`} className="card group reveal-scale grid sm:grid-cols-[minmax(0,360px)_1fr]">
                <Stage e={e} className="aspect-[4/3] sm:aspect-auto sm:min-h-[300px]" />
                <div className="flex flex-col justify-between gap-8 p-7 sm:p-10">
                  <div>
                    <p className="font-mono text-xs tracking-widest text-haze uppercase">{when(e)}</p>
                    <h3 className="display mt-4 text-4xl sm:text-5xl">{e.title}</h3>
                    <p className="mt-4 max-w-lg text-lg text-haze">{e.tagline}</p>
                  </div>
                  <div className="flex flex-wrap items-end justify-between gap-6">
                    <dl className="flex gap-10">
                      {e.host && (
                        <div>
                          <dt className="text-sm text-haze">Hosted by</dt>
                          <dd className="mt-1 text-xl font-medium">{e.host}</dd>
                        </div>
                      )}
                      {pool(e) > 0 && (
                        <div>
                          <dt className="text-sm text-haze">Cash pool</dt>
                          <dd className="mt-1 text-xl font-medium">{inr(pool(e))}</dd>
                        </div>
                      )}
                    </dl>
                    <span className="flex items-center gap-2 font-medium text-mist/80 transition group-hover:text-white">
                      Read the recap <Arrow className="transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Finale title="The next night is coming." sub="Dates drop on Discord first. Be in the server when they do." />
    </main>
  )
}
