import Link from 'next/link'
import Avatar from '../components/Avatar'
import Finale from '../components/Finale'
import { Arrow, btn, Pill } from '../components/ui'
import { getVouchCounts } from '../vouches/data'
import { getTeam, TIERS, type Member, type Tier } from './data'

export const metadata = { title: 'Team · ROOH' }
export const revalidate = 300

const since = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' })

/*
 * Hierarchy: the higher the tier, the more room each person gets.
 *   Owner                          -> spotlight: full-bleed banner, huge name
 *   Imposter, Malkin               -> feature cards, 3 across
 *   Co Owner, Developer, Manager   -> profile cards, 4 across (Developer gets its own badge & glow)
 *   Head Mod, Staff Team           -> compact rows, many across
 */
type Size = 'xl' | 'lg' | 'md' | 'sm'

const SIZE_BY_TIER: Record<Tier, Size> = {
  Owner: 'xl',
  Imposter: 'lg',
  Malkin: 'lg',
  'Co Owner': 'md',
  Developer: 'lg',
  Manager: 'md',
  'Head Mod': 'sm',
  'Staff Team': 'sm',
}

const GRID: Record<Size, string> = {
  xl: 'grid gap-4 lg:grid-cols-2 [&>:only-child]:lg:col-span-2',
  lg: 'grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3',
  md: 'grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4',
  sm: 'grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4',
}

function Banner({ m, className = '' }: { m: Member; className?: string }) {
  const isDev = m.tier === 'Developer'
  return m.banner ? (
    <img src={m.banner} alt="" loading="lazy" className={`size-full object-cover transition-[scale] duration-700 ease-out group-hover:scale-105 ${className}`} />
  ) : (
    <div
      className={`size-full ${
        isDev
          ? 'bg-[radial-gradient(circle_at_20%_110%,rgb(139_61_255/.75),transparent_55%),radial-gradient(circle_at_85%_-15%,rgb(255_46_81/.6),transparent_60%)]'
          : 'bg-[radial-gradient(circle_at_15%_120%,rgb(255_46_81/.55),transparent_55%),radial-gradient(circle_at_90%_-20%,rgb(139_61_255/.7),transparent_60%)]'
      } transition-[scale] duration-700 group-hover:scale-105 ${className}`}
    />
  )
}

function Facts({ m, vouches }: { m: Member; vouches: number }) {
  return (
    <>
      {m.joinedAt && <span>Here since {since.format(m.joinedAt)}</span>}
      {vouches > 0 && <span>{vouches} vouches</span>}
    </>
  )
}

function Card({ m, size, vouches }: { m: Member; size: Size; vouches: number }) {
  if (size === 'xl')
    return (
      <li className="card group reveal-scale">
        <div className="relative isolate flex min-h-[400px] items-end sm:min-h-[520px]">
          <div className="absolute inset-0 -z-10">
            <Banner m={m} />
            <div className="absolute inset-0 bg-linear-to-t from-night via-night/70 to-night/10" />
          </div>
          <div className="flex w-full min-w-0 flex-col gap-5 p-6 sm:flex-row sm:items-end sm:gap-6 sm:p-12">
            <span className="w-fit rounded-full bg-red p-1 shadow-[0_0_80px_-12px_var(--color-red)]">
              <Avatar p={m} px={256} className="size-24 ring-4 ring-night sm:size-40" />
            </span>
            <div className="min-w-0">
              <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium">
                <Crown /> {m.tier}
              </span>
              <p className="display mt-4 pb-1 text-[2.6rem] [overflow-wrap:anywhere] sm:truncate sm:text-7xl">{m.name}</p>
              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-haze sm:text-base">
                <span>@{m.username}</span>
                <Facts m={m} vouches={vouches} />
              </p>
            </div>
          </div>
        </div>
      </li>
    )

  if (size === 'sm')
    return (
      <li className="card reveal flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
        <Avatar p={m} className="size-12 sm:size-14" />
        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold">{m.name}</span>
          <span className="block truncate text-sm text-haze">@{m.username}</span>
        </span>
        {vouches > 0 && <span className="rounded-full bg-white/[.06] px-2.5 py-1 text-xs text-haze">{vouches} vouches</span>}
      </li>
    )

  const lg = size === 'lg'
  const isDev = m.tier === 'Developer'
  return (
    <li className="card group reveal-scale">
      <div className={`relative overflow-hidden ${lg ? 'aspect-[5/3] sm:aspect-[16/9]' : 'aspect-[2/1]'}`}>
        <Banner m={m} />
        <div className="absolute inset-0 bg-linear-to-t from-night/80 to-transparent" />
        <span className="glass absolute top-2 right-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium sm:top-3 sm:right-3 sm:px-3 sm:py-1 sm:text-xs">
          {isDev && <Code />}
          {m.tier}
        </span>
      </div>
      <div className={`relative px-3.5 pb-4 ${lg ? 'sm:px-7 sm:pb-7' : 'sm:px-5 sm:pb-5'}`}>
        <span
          className={`inline-block rounded-full p-[3px] ${
            isDev
              ? '-mt-10 bg-violet shadow-[0_0_40px_-8px_var(--color-violet)] sm:-mt-14'
              : lg
                ? '-mt-10 bg-white/20 sm:-mt-14'
                : '-mt-8 bg-white/10 sm:-mt-10'
          }`}
        >
          <Avatar p={m} px={256} className={`ring-4 ring-night ${lg ? 'size-20 sm:size-28' : 'size-16 sm:size-20'}`} />
        </span>
        <p className={`mt-3 truncate font-semibold tracking-tight sm:mt-4 ${lg ? 'text-lg sm:text-2xl' : 'sm:text-lg'}`}>{m.name}</p>
        <p className="truncate text-sm text-haze sm:text-base">@{m.username}</p>
        <p className="mt-3 flex flex-col gap-x-4 gap-y-0.5 border-t border-white/[.06] pt-3 text-xs text-haze sm:mt-5 sm:flex-row sm:flex-wrap sm:pt-4 sm:text-sm">
          <Facts m={m} vouches={vouches} />
        </p>
      </div>
    </li>
  )
}

function Crown() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="size-4 text-red" aria-hidden>
      <path d="M2 5l3 3 3-5 3 5 3-3-1.2 7.5H3.2z" />
    </svg>
  )
}

function Code() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-iris" aria-hidden>
      <path d="M5.2 4.5 1.8 8l3.4 3.5M10.8 4.5 14.2 8l-3.4 3.5M9.2 2.8 6.8 13.2" />
    </svg>
  )
}

export default async function Team() {
  const [team, counts] = await Promise.all([getTeam(), getVouchCounts()])
  const tiers = TIERS.map((tier, rank) => ({ tier, rank, members: team.filter((m) => m.rank === rank) })).filter((t) => t.members.length)

  return (
    <main className="px-3 pt-32 sm:px-8 sm:pt-44">
      <header className="hero-out mx-auto flex max-w-4xl flex-col items-center text-center">
        <Pill>
          Team · {team.length} people · {tiers.length} tiers
        </Pill>
        <h1 className="display text-silver mt-6 pb-2 text-[clamp(2.9rem,14vw,3.6rem)] sm:text-8xl lg:text-[7.5rem]">The people behind the nights.</h1>
        <p className="mt-5 max-w-lg px-2 text-[17px] text-pretty text-haze sm:mt-6 sm:text-xl">They host the events, pay out the rewards and keep ROOH what it is. DM any of them on Discord.</p>
        <Link href="/team/apply" className={`${btn.glass} mt-8`}>
          Become a Team Member <Arrow />
        </Link>
      </header>

      <div className="mx-auto mt-16 max-w-7xl space-y-16 sm:mt-24 sm:space-y-32">
        {tiers.map(({ tier, rank, members }) => {
          const size = SIZE_BY_TIER[tier]
          return (
            <section key={tier}>
              <div className="reveal mb-5 flex items-baseline gap-3 border-b border-white/[.07] px-1 pb-4 sm:mb-8 sm:gap-5 sm:pb-5">
                <span className="font-mono text-sm text-red">{String(rank + 1).padStart(2, '0')}</span>
                <h2 className={`display text-silver pb-1 ${size === 'xl' ? 'text-[2.6rem] sm:text-7xl' : size === 'sm' ? 'text-3xl sm:text-4xl' : 'text-[2.1rem] sm:text-5xl'}`}>{tier}</h2>
                <span className="ml-auto shrink-0 text-sm text-haze">
                  {members.length} {members.length === 1 ? 'person' : 'people'}
                </span>
              </div>
              <ul className={GRID[size]}>
                {members.map((m) => (
                  <Card key={m.id} m={m} size={size} vouches={counts.get(m.id) ?? 0} />
                ))}
              </ul>
            </section>
          )
        })}
        {!tiers.length && <p className="text-center text-haze">No one is on the team yet. Add people with the bot’s !adduser or !addrole.</p>}
      </div>

      <Link
        href="/team/apply"
        className="card group reveal mx-auto mt-20 flex max-w-7xl flex-col justify-between gap-6 p-6 sm:mt-28 sm:flex-row sm:items-center sm:p-10"
      >
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgb(139_61_255/.22),transparent_55%),radial-gradient(circle_at_100%_100%,rgb(255_46_81/.18),transparent_55%)]" />
        <div>
          <Pill live>Join Our Team!</Pill>
          <h2 className="display text-silver mt-4 pb-1 text-3xl sm:text-5xl">Interested in becoming part of our team?</h2>
          <p className="mt-2 max-w-xl text-[15px] text-haze sm:text-lg">
            We offer plenty of perks and benefits to our team members. Join our Discord server and create a ticket to apply.
          </p>
        </div>
        <span className={`${btn.brand} shrink-0 self-start sm:self-center`}>
          Become a Team Member <Arrow className="transition group-hover:translate-x-1" />
        </span>
      </Link>

      <Finale title="Come say hi." sub="The team is in the server most nights. So are the rest of us." />
    </main>
  )
}
