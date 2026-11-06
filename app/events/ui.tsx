import { Beacon } from '../components/ui'
import { CakeArt, SpinArt } from './art'
import { formatDate, type RoohEvent } from './data'

/** The event's object, standing in a pool of brand light. */
export function Stage({ e, className = '' }: { e: RoohEvent; className?: string }) {
  const Art = e.art === 'spin' ? SpinArt : CakeArt
  return (
    <div className={`relative isolate grid place-items-center overflow-hidden ${className}`}>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(closest-side_at_50%_50%,rgb(139_61_255/.4),rgb(255_46_81/.12)_55%,transparent)]" />
      <Art className="parallax h-[78%] w-auto transition-[scale] duration-700 ease-out will-change-transform group-hover:scale-[1.04]" />
    </div>
  )
}

const LABEL = { live: 'Live now', upcoming: 'Upcoming', ended: 'Ended' }

export function Status({ e }: { e: RoohEvent }) {
  return (
    <span className="glass inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium">
      {e.status === 'live' ? <Beacon /> : <span className="size-2 rounded-full bg-haze/50" />}
      {LABEL[e.status]}
    </span>
  )
}

export const when = (e: RoohEvent) =>
  e.date ? formatDate(e.date, { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }) : 'Running now'

export const pool = (e: RoohEvent) => e.rewards?.flatMap((g) => g.items).reduce((n, i) => n + i.amount * (i.count ?? 1), 0) ?? 0
