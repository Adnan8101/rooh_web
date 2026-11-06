import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import Finale from '../../components/Finale'
import { Arrow, btn, DiscordIcon, Words } from '../../components/ui'
import { DISCORD, events, inr } from '../data'
import { pool, Stage, Status, when } from '../ui'

type Props = { params: Promise<{ slug: string }> }

export const generateStaticParams = () => events.map((e) => ({ slug: e.slug }))

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const e = events.find((x) => x.slug === slug)
  return { title: e ? `${e.title} · ROOH` : 'Event · ROOH', description: e?.tagline }
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="reveal mt-28 sm:mt-36">
      <p className="font-mono text-xs tracking-[.2em] text-haze uppercase">{label}</p>
      <div className="mt-8">{children}</div>
    </section>
  )
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params
  const e = events.find((x) => x.slug === slug)
  if (!e) notFound()
  const total = pool(e)
  const facts = [
    ['Date', when(e)],
    ['Time', e.time],
    ['Host', e.host],
    ['Venue', e.venue],
  ].filter((d): d is [string, string] => Boolean(d[1]))

  return (
    <main className="px-4 pt-32 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-7xl">
        <Link href="/events" className="inline-flex items-center gap-2 text-sm text-haze transition hover:text-white">
          <Arrow className="rotate-180" /> All events
        </Link>

        <section className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Status e={e} />
            <h1 className="display text-silver mt-6 pb-2 text-[3.5rem] sm:text-8xl lg:text-7xl xl:text-[5.5rem]">{e.title}</h1>
            <p className="mt-6 max-w-xl text-xl text-haze sm:text-2xl">{e.tagline}</p>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/[.07]">
              {facts.map(([k, v]) => (
                <div key={k} className="bg-night p-5 sm:p-6">
                  <dt className="text-sm text-haze">{k}</dt>
                  <dd className="mt-1 text-lg font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <a href={DISCORD} target="_blank" rel="noreferrer" className={`${btn.brand} mt-8 w-full sm:w-auto`}>
              <DiscordIcon /> {e.status === 'ended' ? 'Be there for the next one' : 'Join the event on Discord'}
            </a>
          </div>
          <div className="card group">
            <Stage e={e} className="aspect-square" />
            {/* liquid glass over the art: the light and colour behind it show through */}
            <div className="glass absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl px-5 py-4 sm:inset-x-6 sm:bottom-6">
              <span className="min-w-0">
                <span className="block text-xs text-haze">{e.date ? 'When' : 'Status'}</span>
                <span className="block truncate font-medium">{when(e)}</span>
              </span>
              <span className="min-w-0 text-right">
                <span className="block text-xs text-haze">Where</span>
                <span className="block truncate font-medium">{e.venue}</span>
              </span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl">
          <Block label="The night">
            <p className="display text-3xl leading-[1.12] sm:text-5xl sm:leading-[1.08]">
              <Words text={e.about.join(' ')} />
            </p>
          </Block>

          {e.prizes && (
            <Block label="Up for grabs">
              <ul className="grid gap-4 sm:grid-cols-3">
                {e.prizes.map((p) => (
                  <li key={p.label} className="card reveal-scale p-8">
                    <span className="display block text-7xl">{p.value}</span>
                    <span className="mt-8 block text-lg font-medium">{p.label}</span>
                    <span className="text-haze">{p.note}</span>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {e.questions && (
            <Block label="Three questions">
              <ol className="space-y-3">
                {e.questions.map((q, i, all) => (
                  <li key={q} className={`display reveal text-4xl sm:text-7xl ${i === all.length - 1 ? 'text-brand pb-2' : 'text-silver'}`}>
                    {q}
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {e.rewards && (
            <Block label="Rewards">
              <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
                <div className="card reveal-scale flex min-h-72 flex-col justify-end p-8">
                  <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_0%,rgb(255_46_81/.3),transparent_55%),radial-gradient(circle_at_0%_100%,rgb(139_61_255/.3),transparent_60%)]" />
                  <p className="text-haze">Total cash pool</p>
                  <p className="display text-brand mt-2 pb-1 text-7xl sm:text-8xl">{inr(total)}</p>
                </div>
                <div className="card reveal-scale grid gap-8 p-8 sm:grid-cols-2">
                  {e.rewards.map((g) => (
                    <div key={g.group}>
                      <h3 className="text-sm text-haze">{g.group}</h3>
                      <ul className="mt-3 divide-y divide-white/[.06]">
                        {g.items.map((it, i) => (
                          <li key={it.label} className="flex items-center gap-3 py-3.5">
                            <span className="grid size-7 place-items-center rounded-full bg-white/[.06] font-mono text-xs text-iris">{i + 1}</span>
                            <span className="flex-1">{it.label}</span>
                            <span className="font-medium tabular-nums">
                              {inr(it.amount)}
                              {it.each && <span className="text-haze"> each</span>}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Block>
          )}

          {e.poster && (
            <Block label="The original poster">
              <div className="card reveal-scale mx-auto w-fit p-3">
                <Image
                  src={e.poster.src}
                  alt={e.poster.alt}
                  width={e.poster.width}
                  height={e.poster.height}
                  sizes="(min-width: 640px) 420px, 90vw"
                  className="w-full max-w-[420px] rounded-[1.1rem]"
                />
              </div>
            </Block>
          )}
        </div>
      </div>

      <Finale title={e.signoff} sub="Every ROOH night is announced on Discord first." />
    </main>
  )
}
