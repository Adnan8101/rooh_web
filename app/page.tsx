import Link from 'next/link'
import Avatar from './components/Avatar'
import Finale from './components/Finale'
import { DISCORD } from './components/links'
import { Accent, Arrow, Beacon, btn, DiscordIcon, Eclipse, Head, Horizon, Logo, Words } from './components/ui'

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden>
    <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.5c2.1 0 3.6 1.1 5.4 3 1.8-1.9 3.3-3 5.4-3 3.7 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21z" />
  </svg>
)
const SparkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden>
    <path d="M12 2l2.1 6.4L20.5 10l-6.4 2.1L12 18.5l-2.1-6.4L3.5 10l6.4-1.6zM19 15l.9 2.6 2.6.9-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9z" />
  </svg>
)
import { compact, getGuild } from './lib/guild'
import { events, inr } from './events/data'
import { pool, Stage, Status } from './events/ui'
import { getTeam } from './team/data'
import type { Person } from './vouches/data'
import { getVouches } from './vouches/data'
import VouchCard from './vouches/VouchCard'

export const revalidate = 60

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
const ago = (d: Date) => rtf.format(-Math.round((Date.now() - +d) / 864e5), 'day')

/** A ring of members circling the eclipse; each face counter-spins so it stays upright. */
function Orbit({ people, className, seconds, size }: { people: Person[]; className: string; seconds: number; size: string }) {
  const spin = { animationDuration: `${seconds}s` }
  return (
    <div className={`absolute animate-turn rounded-full border border-white/[.06] will-change-transform ${className}`} style={spin}>
      {people.map((p, i) => {
        const a = (i / people.length) * Math.PI * 2
        return (
          <span key={i} className="absolute -translate-1/2" style={{ left: `${(50 + 50 * Math.cos(a)).toFixed(3)}%`, top: `${(50 + 50 * Math.sin(a)).toFixed(3)}%` }}>
            <span className="block animate-turn will-change-transform [animation-direction:reverse]" style={spin}>
              <Avatar p={p} className={`${size} ring-1 ring-white/10`} />
            </span>
          </span>
        )
      })}
    </div>
  )
}

export default async function Home() {
  const [{ vouches, people, authors }, team, guild] = await Promise.all([getVouches(), getTeam(), getGuild()])
  const live = events.find((e) => e.status === 'live') ?? events[0]
  const faces = [...new Map(vouches.map((v) => [v.author.id, v.author])).values()]
  const best = events.reduce((a, b) => (pool(b) > pool(a) ? b : a))
  const bars = best.rewards?.flatMap((g) => g.items.flatMap((i) => Array.from({ length: i.count ?? 1 }, () => i.amount))) ?? []
  const latest = vouches[0]
  const rows = [vouches.slice(0, 16), vouches.slice(16, 32)].filter((r) => r.length > 0)

  return (
    <main>
      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-20 sm:pt-32 sm:pb-24">
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[linear-gradient(rgb(255_255_255/.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask:radial-gradient(ellipse_at_center,#000_10%,transparent_65%)]"
        />
        <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[175vw] -translate-1/2 sm:w-[120vw] lg:w-[1180px]">
          <div className="hero-zoom absolute inset-0">
            <div className="absolute inset-[22%]">
              <Eclipse />
            </div>
            {/* on phones the ring passes behind the copy, so it fades out wherever the text sits */}
            <div className="absolute inset-0 max-sm:[mask:radial-gradient(34%_44%_at_50%_50%,transparent_78%,#000_100%)]">
              <Orbit people={faces.slice(0, 10)} className="inset-[13%] opacity-90" seconds={80} size="size-9 sm:size-11" />
              <Orbit people={faces.slice(10, 28)} className="inset-0 opacity-50 max-sm:hidden" seconds={140} size="size-8 sm:size-10" />
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-t from-night to-transparent" />

        <div className="hero-out flex w-full flex-col items-center">
          <Link
            href={`/events/${live.slug}`}
            className="glass group flex max-w-full items-center gap-3 rounded-full py-1.5 pr-3 pl-4 text-sm transition hover:bg-white/10 active:scale-[.97]"
          >
            {live.status === 'live' && <Beacon />}
            <span className="shrink-0 text-haze">{live.status === 'live' ? 'Live now' : 'Latest'}</span>
            <span className="truncate font-medium">{live.title}</span>
            <Arrow className="size-3.5 shrink-0 text-haze transition group-hover:translate-x-0.5" />
          </Link>
          <h1 className="display text-silver mt-8 pb-3 text-center text-[clamp(3.25rem,17vw,5rem)] leading-[0.88] sm:text-[8.5rem] lg:text-[10.5rem]">
            The server
            <br />
            with a <span className="text-brand pr-[0.04em]">soul.</span>
          </h1>
          <p className="mt-6 max-w-xl text-center text-[17px] leading-relaxed text-pretty text-haze sm:text-xl">
            A highly active Discord community with nonstop chats, voice hangouts and a lively space for Hindi and English speakers.
          </p>
          <div className="mt-9 grid w-full max-w-sm grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:mt-10 sm:flex sm:w-auto sm:max-w-none sm:justify-center">
            <a href={DISCORD} target="_blank" rel="noreferrer" className={`${btn.brand} px-5`}>
              <DiscordIcon /> Join the server
            </a>
            <Link href="/events" className={`${btn.glass} px-5`}>
              Explore events
            </Link>
          </div>
          {guild && (
            <div className="mt-10 flex items-center gap-3 rounded-full text-sm max-sm:glass max-sm:py-2 max-sm:pr-4 max-sm:pl-2 sm:mt-12 sm:gap-4">
              <Logo icon={guild.icon} className="w-8 sm:w-9" />
              <span className="whitespace-nowrap">
                <span className="font-semibold text-white">{compact(guild.members)}</span> <span className="text-haze">members</span>
              </span>
              <span className="h-4 w-px bg-white/15" />
              <span className="flex items-center gap-2 whitespace-nowrap">
                <span className="size-2 rounded-full bg-[#3ba55d] shadow-[0_0_8px_#3ba55d]" />
                <span className="font-semibold text-white">{guild.online.toLocaleString('en-IN')}</span> <span className="text-haze">online</span>
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Statement */}
      <section className="mx-auto max-w-5xl px-5 py-24 sm:py-44">
        <p className="display text-[clamp(2.1rem,9.5vw,2.6rem)] leading-[1.06] sm:text-6xl lg:text-7xl">
          <Words text="Rooh" className="text-brand" />
          <Words text="means soul. Most servers are a list of channels. Ours is the people in it - the ones who show up for game night, hold their breath when the wheel slows, and vouch for each other out loud." />
        </p>
      </section>

      <Horizon />

      {/* Bento */}
      <section className="mx-auto max-w-7xl px-3 sm:px-8">
        <Head
          badge={<SparkIcon />}
          title={
            <>
              One server. <Accent>Every</Accent> night.
            </>
          }
          sub="What’s happening right now, pulled straight from the server."
        />

        <div className="mt-12 grid gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6">
          <Link href={`/events/${live.slug}`} className="card group reveal-scale flex min-h-[560px] flex-col sm:col-span-2 sm:min-h-[620px] lg:col-span-4 lg:row-span-2">
            <div className="p-6 sm:p-10">
              <Status e={live} />
              <h3 className="display mt-5 text-[2.75rem] sm:mt-6 sm:text-6xl">{live.title}</h3>
              <p className="mt-3 max-w-md text-haze sm:mt-4 sm:text-lg">{live.tagline}</p>
            </div>
            <Stage e={live} className="min-h-[300px] flex-1 pb-20 sm:min-h-[340px] sm:pb-0" />
            {live.prizes && (
              <ul className="absolute inset-x-3 bottom-3 grid grid-cols-3 gap-2 sm:inset-x-6 sm:bottom-6">
                {live.prizes.map((p) => (
                  <li key={p.label} className="glass rounded-2xl p-3 sm:p-4">
                    <span className="block text-xl font-semibold tracking-tight min-[400px]:text-2xl sm:text-3xl">{p.value}</span>
                    <span className="block truncate text-xs text-haze sm:text-sm">{p.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </Link>

          <Link href="/vouches" className="card group reveal flex flex-col justify-between gap-8 p-6 sm:gap-10 sm:p-8 lg:col-span-2">
            <div>
              <p className="text-haze">Public vouches</p>
              <p className="display mt-2 pb-1 text-7xl sm:text-8xl">{vouches.length}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex -space-x-3">
                {faces.slice(0, 5).map((p) => (
                  <Avatar key={p.id} p={p} className="size-10 ring-2 ring-night" />
                ))}
                <span className="grid size-10 place-items-center rounded-full bg-white/10 text-xs font-medium ring-2 ring-night">+{Math.max(authors - 5, 0)}</span>
              </div>
              <Arrow className="text-haze transition group-hover:translate-x-1 group-hover:text-white" />
            </div>
          </Link>

          <Link href={`/events/${best.slug}`} className="card group reveal flex flex-col justify-between gap-8 p-6 sm:p-8 lg:col-span-2">
            <div>
              <p className="text-haze">Paid out in one night</p>
              <p className="display mt-2 text-[3.25rem] sm:text-6xl">{inr(pool(best))}</p>
            </div>
            <div className="flex h-24 items-end gap-2">
              {bars.map((n, i) => (
                <span
                  key={i}
                  className="flex-1 origin-bottom rounded-t-lg bg-white/10 transition first:bg-red group-hover:bg-white/15 group-hover:first:bg-red duration-500 ease-out group-hover:scale-y-110"
                  style={{ height: `${(n / Math.max(...bars)) * 100}%`, transitionDelay: `${i * 40}ms` }}
                />
              ))}
            </div>
          </Link>

          {latest && (
            <a href={latest.url} target="_blank" rel="noreferrer" className="card group reveal flex flex-col justify-between gap-6 p-6 sm:gap-8 sm:p-8 lg:col-span-3">
              <p className="flex items-center gap-2.5 text-haze">
                <Beacon /> Latest vouch · {ago(latest.at)}
              </p>
              <div className="flex gap-4 sm:mt-8">
                <Avatar p={latest.author} className="size-12" />
                <div className="min-w-0">
                  <p className="font-medium">
                    {latest.author.name} <span className="ml-1 text-sm text-haze">in #vouches</span>
                  </p>
                  <p className="mt-1 text-lg [overflow-wrap:anywhere] sm:text-xl">
                    {latest.text.split(/(<@!?\d+>)/).map((part, i) => {
                      const id = part.match(/^<@!?(\d+)>$/)?.[1]
                      return id ? (
                        <span key={i} className="rounded-md bg-violet/25 px-1.5 text-iris">
                          @{people.get(id)?.name ?? 'member'}
                        </span>
                      ) : (
                        part
                      )
                    })}
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-sm text-haze transition group-hover:text-white">
                Open the message on Discord <Arrow className="size-3.5 -rotate-45" />
              </span>
            </a>
          )}

          <Link href="/team" className="card group reveal flex flex-col justify-between gap-6 p-6 sm:gap-8 sm:p-8 lg:col-span-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-haze">Run by</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">{team.length} people you can DM</p>
              </div>
              <Arrow className="mt-1 text-haze transition group-hover:translate-x-1 group-hover:text-white" />
            </div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-5">
              {team.slice(0, 4).map((m) => (
                <li key={m.id} className="flex min-w-0 items-center gap-3">
                  <Avatar p={m} className="size-10 shrink-0 sm:size-11" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{m.name}</span>
                    <span className="block truncate text-xs text-haze">{m.tier}</span>
                  </span>
                </li>
              ))}
            </ul>
            {team.length > 4 && <p className="-mt-3 text-sm text-haze">+ {team.length - 4} more on the team</p>}
          </Link>
        </div>
      </section>

      <Horizon />

      {/* Vouch wall */}
      <section>
        <div className="px-4">
          <Head
            badge={<HeartIcon />}
            title={
              <>
                <Accent>Trusted</Accent> by {authors} members
              </>
            }
            sub="Don’t take our word for it - take theirs. Every vouch links to the original message."
          />
        </div>
        <div className="fade-x mt-12 space-y-3 overflow-hidden sm:mt-16 sm:space-y-4">
          {rows.map((row, r) => (
            // outer layer slides with scroll, inner layer runs the endless marquee
            <div key={r} className={r ? 'slide-r' : 'slide-l'}>
              <div className={`flex w-max animate-marquee items-start will-change-transform hover:[animation-play-state:paused] ${r ? '[animation-direction:reverse]' : ''}`}>
                {[...row, ...row].map((v, i) => (
                  <div key={i} inert={i >= row.length} className="w-[280px] shrink-0 pr-3 sm:w-[320px] sm:pr-4">
                    <VouchCard v={v} people={people} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center sm:mt-12">
          <Link href="/vouches" className={btn.glass}>
            See all {vouches.length} vouches <Arrow />
          </Link>
        </div>
      </section>

      <div className="px-3 sm:px-8">
        <Finale title="Your seat at the next night is open." sub={`Join ${guild ? guild.members.toLocaleString('en-IN') : `${authors}+`} members on the ROOH Discord.`} />
      </div>
    </main>
  )
}
