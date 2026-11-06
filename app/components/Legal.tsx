import Link from 'next/link'
import type { ReactNode } from 'react'
import { Arrow, Pill } from './ui'

export type Section = { id: string; title: string; body: ReactNode }

/** Long-form legal page: hero, table of contents (sticky on desktop, chips on phones), numbered sections. */
export default function Legal({ label, title, intro, updated, sections }: { label: string; title: string; intro: ReactNode; updated: string; sections: Section[] }) {
  return (
    <main className="px-4 pt-32 sm:px-8 sm:pt-44">
      <header className="hero-out mx-auto flex max-w-3xl flex-col items-center text-center">
        <Pill>
          {label} · Updated {updated}
        </Pill>
        <h1 className="display text-silver mt-6 pb-2 text-[clamp(2.9rem,14vw,3.6rem)] sm:text-8xl">{title}</h1>
        <div className="mt-5 max-w-xl text-[17px] text-pretty text-haze sm:mt-6 sm:text-xl">{intro}</div>
      </header>

      <nav aria-label="On this page" className="no-scrollbar fade-x -mx-4 mt-12 flex gap-2 overflow-x-auto px-6 lg:hidden">
        {sections.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} className="glass shrink-0 rounded-full px-4 py-2 text-sm text-mist/80 active:scale-95">
            <span className="mr-1.5 font-mono text-xs text-red">{String(i + 1).padStart(2, '0')}</span>
            {s.title}
          </a>
        ))}
      </nav>

      <div className="mx-auto mt-10 grid max-w-6xl gap-16 sm:mt-20 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-32 flex flex-col gap-1 border-l border-white/[.07] text-sm">
            {sections.map((s, i) => (
              <a key={s.id} href={`#${s.id}`} className="-ml-px border-l border-transparent py-1.5 pl-4 text-haze transition hover:border-red hover:text-white">
                <span className="mr-2 font-mono text-xs text-haze/50">{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="max-w-2xl min-w-0">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="legal reveal scroll-mt-28 border-t border-white/[.07] py-10 first:border-t-0 first:pt-0 sm:py-12">
              <h2 className="flex items-baseline gap-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                <span className="font-mono text-sm font-normal text-red">{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </h2>
              <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-haze sm:text-[17px]">{s.body}</div>
            </section>
          ))}

          <Link href="/contact" className="card group mt-6 flex items-center justify-between gap-6 p-6 sm:p-8">
            <span>
              <span className="block text-lg font-semibold text-white">Questions about this page?</span>
              <span className="mt-1 block text-haze">Open a ticket on our Discord. Here’s how.</span>
            </span>
            <Arrow className="size-5 shrink-0 text-haze transition group-hover:translate-x-1 group-hover:text-white" />
          </Link>
        </article>
      </div>
    </main>
  )
}
