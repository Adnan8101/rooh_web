import Avatar from '../components/Avatar'
import type { Person, Vouch } from './data'

const fmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' })
export const day = { format: (d: Date) => fmt.format(d).replace(/\bSept\b/, 'Sep') }

/** One vouch, as it was posted: who said it, what they got, who they got it from. */
export default function VouchCard({ v, people, className = '' }: { v: Vouch; people: Map<string, Person>; className?: string }) {
  return (
    <a href={v.url} target="_blank" rel="noreferrer" className={`card group block p-6 ${className}`}>
      <div className="flex items-center gap-3">
        <Avatar p={v.author} className="size-10" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">{v.author.name}</p>
          <p className="text-sm text-haze">
            <time dateTime={v.at.toISOString()}>{day.format(v.at)}</time> · #vouches
          </p>
        </div>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4 text-haze transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" aria-hidden>
          <path d="M5 11l6-6M6 5h5v5" />
        </svg>
      </div>

      <p className="mt-5 text-2xl font-semibold tracking-tight [overflow-wrap:anywhere]">
        {v.item ? (
          <>
            <span className="text-haze">Got </span>
            {v.item}
          </>
        ) : (
          v.text.replace(/<@!?\d+>/g, '@member')
        )}
      </p>
      {v.note && <p className="mt-1 text-haze">{v.note}</p>}

      {v.to.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-haze">
          from
          {v.to.map((id) => {
            const p = people.get(id)
            return (
              <span key={id} className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-white/[.06] py-1 pr-3 pl-1 text-mist">
                {p && <Avatar p={p} className="size-5" />}
                <span className="truncate">{p?.name ?? 'Member'}</span>
              </span>
            )
          })}
        </div>
      )}
    </a>
  )
}
