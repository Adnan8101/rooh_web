import Avatar from '../components/Avatar'
import Finale from '../components/Finale'
import { Pill } from '../components/ui'
import { getVouches } from '../vouches/data'
import { getTeam, TIERS, type Member } from './data'

export const metadata = { title: 'Team · ROOH' }
export const revalidate = 300

const since = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' })

/*
 * Hierarchy: the higher the tier, the more room each person gets.
 *   Owner                -> spotlight: full-bleed banner, huge name
 *   Imposter, Malkin     -> feature cards, 3 across
 *   Co Owner, Manager    -> profile cards, 4 across
 *   Head Mod, Staff Team -> compact rows, many across
 */
const SIZE = ['xl', 'lg', 'lg', 'md', 'md', 'sm', 'sm'] as const
type Size = (typeof SIZE)[number]

const GRID: Record<Size, string> = {
  xl: 'grid gap-4 lg:grid-cols-2 [&>:only-child]:lg:col-span-2',
  lg: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
  md: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4',
  sm: 'grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}

function Banner({ m, className = '' }: { m: Member; className?: string }) {
  return m.banner ? (
    <img src={m.banner} alt="" loading="lazy" className={`size-full object-cover transition-[scale] duration-700 ease-out group-hover:scale-105 ${className}`} />
  ) : (
    <div
      className={`size-full bg-[radial-gradient(circle_at_15%_120%,rgb(255_46_81/.55),transparent_55%),radial-gradient(circle_at_90%_-20%,rgb(139_61_255/.7),transparent_60%)] transition-[scale] duration-700 group-hover:scale-105 ${className}`}
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
        <div className="relative isolate flex min-h-[440px] items-end sm:min-h-[520px]">
          <div className="absolute inset-0 -z-10">
            <Banner m={m} />
            <div className="absolute inset-0 bg-linear-to-t from-night via-night/70 to-night/10" />
          </div>
          <div className="flex w-full flex-col gap-6 p-7 sm:flex-row sm:items-end sm:p-12">
            <span className="w-fit rounded-full bg-red p-1 shadow-[0_0_80px_-12px_var(--color-red)]">
              <Avatar p={m} px={256} className="size-32 ring-4 ring-night sm:size-40" />
            </span>
            <div className="min-w-0">
              <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium">
                <Crown /> {m.tier}
              </span>
              <p className="display mt-4 truncate pb-1 text-5xl sm:text-7xl">{m.name}</p>
              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-haze">
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
      <li className="card reveal flex items-center gap-4 p-4">
        <Avatar p={m} className="size-14" />
        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold">{m.name}</span>
          <span className="block truncate text-sm text-haze">@{m.username}</span>
        </span>
        {vouches > 0 && <span className="rounded-full bg-white/[.06] px-2.5 py-1 text-xs text-haze">{vouches} vouches</span>}
      </li>
    )

  const lg = size === 'lg'
  return (
    <li className="card group reveal-scale">
      <div className={`relative overflow-hidden ${lg ? 'aspect-[16/9]' : 'aspect-[2/1]'}`}>
        <Banner m={m} />
        <div className="absolute inset-0 bg-linear-to-t from-night/80 to-transparent" />
        <span className="glass absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-medium">{m.tier}</span>
      </div>
      <div className={`relative ${lg ? 'px-7 pb-7' : 'px-5 pb-5'}`}>
        <span className={`inline-block rounded-full p-[3px] ${lg ? '-mt-14 bg-white/20' : '-mt-10 bg-white/10'}`}>
          <Avatar p={m} px={256} className={`ring-4 ring-night ${lg ? 'size-28' : 'size-20'}`} />
        </span>
        <p className={`mt-4 truncate font-semibold tracking-tight ${lg ? 'text-2xl' : 'text-lg'}`}>{m.name}</p>
        <p className="truncate text-haze">@{m.username}</p>
        <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 border-t border-white/[.06] pt-4 text-sm text-haze">
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

export default async function Team() {
  const [team, { ranked }] = await Promise.all([getTeam(), getVouches()])
  const counts = new Map(ranked.map((r) => [r.person.id, r.count]))
  const tiers = TIERS.map((tier, rank) => ({ tier, rank, members: team.filter((m) => m.rank === rank) })).filter((t) => t.members.length)

  return (
    <main className="px-4 pt-36 sm:px-8 sm:pt-44">
      <header className="hero-out mx-auto flex max-w-4xl flex-col items-center text-center">
        <Pill>
          Team · {team.length} people · {tiers.length} tiers
        </Pill>
        <h1 className="display text-silver mt-6 pb-2 text-[3.6rem] sm:text-8xl lg:text-[7.5rem]">The people behind the nights.</h1>
        <p className="mt-6 max-w-lg text-lg text-haze sm:text-xl">They host the events, pay out the rewards and keep ROOH what it is. DM any of them on Discord.</p>
      </header>

      <div className="mx-auto mt-24 max-w-7xl space-y-24 sm:space-y-32">
        {tiers.map(({ tier, rank, members }) => {
          const size = SIZE[rank]
          return (
            <section key={tier}>
              <div className="reveal mb-8 flex items-end gap-5 border-b border-white/[.07] pb-5">
                <span className="font-mono text-sm text-red">{String(rank + 1).padStart(2, '0')}</span>
                <h2 className={`display text-silver pb-1 ${size === 'xl' ? 'text-5xl sm:text-7xl' : size === 'sm' ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'}`}>{tier}</h2>
                <span className="ml-auto pb-1.5 text-sm text-haze">
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

      <Finale title="Come say hi." sub="The team is in the server most nights. So are the rest of us." />
    </main>
  )
}
