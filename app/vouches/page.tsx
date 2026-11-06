import Link from 'next/link'
import Avatar from '../components/Avatar'
import Finale from '../components/Finale'
import { Arrow, btn, Head, Pill } from '../components/ui'
import { getVouches } from './data'
import VouchCard, { day } from './VouchCard'

export const metadata = { title: 'Vouches · ROOH' }

const FIRST = 12
const grid = 'mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3'

export default async function Vouches({ searchParams }: { searchParams: Promise<{ for?: string }> }) {
  const { for: who } = await searchParams
  const { vouches, people, ranked, authors } = await getVouches()
  const focus = who ? people.get(who) : undefined
  const list = focus ? vouches.filter((v) => v.to.includes(focus.id)) : vouches
  const top = ranked[0]?.count ?? 1
  const faces = [...new Map(vouches.map((v) => [v.author.id, v.author])).values()]
  const href = (id: string) => (focus?.id === id ? '/vouches#ledger' : `/vouches?for=${id}#ledger`)

  return (
    <main className="px-3 sm:px-8">
      {/* Hero: every member who has vouched, ringed around the headline */}
      <section className="relative isolate -mx-3 overflow-hidden px-4 pt-32 pb-20 sm:-mx-8 sm:pt-48 sm:pb-36">
        <div
          aria-hidden
          className="hero-zoom absolute inset-0 -z-10 grid grid-cols-8 content-center gap-3 opacity-70 [mask:radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_30%,#000_62%,transparent_95%)] sm:grid-cols-12 sm:gap-4 lg:grid-cols-[repeat(16,minmax(0,1fr))]"
        >
          {[...faces, ...faces, ...faces].slice(0, 144).map((p, i) => (
            <Avatar key={i} p={p} px={64} className="aspect-square w-full" />
          ))}
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_48%_at_50%_50%,var(--color-night)_45%,transparent)]" />

        <div className="hero-out mx-auto flex max-w-4xl flex-col items-center text-center">
          <Pill live>Trust ledger · latest {vouches[0] ? day.format(vouches[0].at) : '-'}</Pill>
          <h1 className="display text-silver mt-6 pb-2 text-[clamp(2.9rem,14vw,3.6rem)] sm:text-8xl lg:text-[7.5rem]">Trust, earned in public.</h1>
          <p className="mt-5 max-w-lg text-[17px] text-pretty text-haze sm:mt-6 sm:text-xl">
            Every deal on ROOH is confirmed by the member who received it, out loud in #vouches. Here is every one.
          </p>
          <dl className="glass mt-10 grid w-full max-w-md grid-cols-3 divide-x divide-white/[.08] rounded-3xl py-4 sm:mt-12 sm:w-auto sm:max-w-none sm:py-5">
            {[
              [vouches.length, 'Vouches'],
              [authors, 'Members'],
              [ranked.length, 'Sellers'],
            ].map(([n, k]) => (
              <div key={k} className="px-2 sm:px-10">
                <dd className="text-3xl font-semibold tracking-tight sm:text-5xl">{n}</dd>
                <dt className="mt-1 text-sm text-haze">{k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="mx-auto max-w-7xl">
        <Head pill="Leaderboard" title="Most vouched." sub="The members people trust with their money. Pick one to see only their vouches." />

        <ol className="mt-12 grid grid-cols-3 items-end gap-2 sm:mt-16 sm:gap-4">
          {ranked.slice(0, 3).map(({ person: p, count }, i) => (
            <li key={p.id} className={`reveal-scale ${i === 0 ? "max-sm:order-2" : i === 1 ? "max-sm:order-1" : "max-sm:order-3"}`}>
              <Link
                href={href(p.id)}
                scroll={false}
                className={`card flex flex-col items-center px-2 pt-5 pb-4 text-center sm:p-10 ${i === 0 ? "max-sm:pt-8" : ""} ${focus?.id === p.id ? 'outline-2 -outline-offset-2 outline-red' : ''}`}
              >
                <span className="font-mono text-[10px] tracking-[.2em] text-haze uppercase sm:text-xs">No. {i + 1}</span>
                <span className={`mt-3 rounded-full p-[3px] sm:mt-6 ${i === 0 ? 'bg-red' : 'bg-white/10'}`}>
                  <Avatar p={p} px={256} className="size-14 ring-4 ring-night sm:size-24" />
                </span>
                <span className="mt-3 max-w-full truncate text-sm font-semibold sm:mt-5 sm:text-xl">{p.name}</span>
                <span className="display mt-3 text-4xl sm:mt-6 sm:text-7xl">{count}</span>
                <span className="mt-1 text-xs text-haze sm:text-base">vouches</span>
                <span className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/[.06] sm:mt-6">
                  <span className="block h-full rounded-full bg-red" style={{ width: `${(count / top) * 100}%` }} />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        {ranked.length > 3 && (
          <ol start={4} className="card reveal-scale mt-2 divide-y divide-white/[.06] px-1.5 sm:mt-4 sm:px-4">
            {ranked.slice(3).map(({ person: p, count }, i) => (
              <li key={p.id}>
                <Link
                  href={href(p.id)}
                  scroll={false}
                  className={`grid grid-cols-[24px_36px_1fr_auto] items-center gap-3 rounded-2xl px-3 py-3 sm:gap-4 sm:py-4 transition hover:bg-white/[.04] sm:grid-cols-[40px_40px_minmax(0,240px)_1fr_auto] ${focus?.id === p.id ? 'bg-white/[.06]' : ''}`}
                >
                  <span className="font-mono text-sm text-haze">{String(i + 4).padStart(2, '0')}</span>
                  <Avatar p={p} className="size-9 sm:size-10" />
                  <span className="truncate font-medium">{p.name}</span>
                  <span className="hidden h-1 overflow-hidden rounded-full bg-white/[.06] sm:block">
                    <span className="block h-full rounded-full bg-red/80" style={{ width: `${(count / top) * 100}%` }} />
                  </span>
                  <span className="text-xl font-semibold tabular-nums">{count}</span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* Ledger */}
      <section id="ledger" className="mx-auto mt-24 max-w-7xl scroll-mt-24 sm:mt-36 sm:scroll-mt-28">
        <div className="reveal flex flex-wrap items-end justify-between gap-4 px-2 sm:px-1">
          <h2 className="display text-silver pb-1 text-4xl sm:text-6xl">{focus ? `Vouches for ${focus.name}` : 'Every vouch'}</h2>
          {focus ? (
            <Link href="/vouches#ledger" scroll={false} className="glass rounded-full px-4 py-2 text-sm transition hover:bg-white/10">
              Showing {list.length} · Clear ✕
            </Link>
          ) : (
            <p className="pb-1 text-haze">{list.length} entries, newest first</p>
          )}
        </div>
        <div className={grid}>
          {list.slice(0, FIRST).map((v) => (
            <VouchCard key={v.id} v={v} people={people} className="reveal" />
          ))}
        </div>
        {/* the rest waits behind a native disclosure: no script, and the page stays short on a phone */}
        {list.length > FIRST && (
          <details className="group">
            <summary className="mt-8 flex cursor-pointer list-none justify-center group-open:hidden [&::-webkit-details-marker]:hidden">
              <span className={btn.glass}>
                Show all {list.length} vouches <Arrow className="rotate-90" />
              </span>
            </summary>
            <div className={grid}>
              {list.slice(FIRST).map((v) => (
                <VouchCard key={v.id} v={v} people={people} className="reveal" />
              ))}
            </div>
          </details>
        )}
        {!list.length && <p className="py-10 text-center text-haze">No vouches yet.</p>}
      </section>

      <Finale title="Trade where trust is public." sub="Buy, sell and vouch in the open. Join the server to start." />
    </main>
  )
}
