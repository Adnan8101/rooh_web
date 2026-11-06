import Link from 'next/link'
import Finale from '../../components/Finale'
import { DISCORD } from '../../components/links'
import { Arrow, btn, DiscordIcon, Logo, Pill } from '../../components/ui'
import { getGuild } from '../../lib/guild'

export const metadata = {
  title: 'Staff Application · ROOH',
  description: 'Interested in becoming part of our team? Join our Discord server and create a ticket.',
}
export const revalidate = 600

const steps = [
  {
    title: 'Join our Discord server',
    text: 'Tap “Join the ROOH Discord” and accept the invite to enter the community.',
  },
  {
    title: 'Find the ticket channel',
    text: 'Head to the ticket channel near the top of the server channel list.',
  },
  {
    title: 'Create a ticket',
    text: 'Open a private ticket and let us know you are applying to become a team member.',
  },
  {
    title: 'Speak with management',
    text: 'Our management team will assist you further and answer any questions about available perks and benefits.',
  },
]

const highlights = [
  [
    'Direct ticket process',
    'No external forms or waiting on emails. Everything happens inside a private ticket with our management team.',
  ],
  [
    'Team perks & benefits',
    'We offer plenty of perks and benefits to our team members. Explore them in the server or ask management directly in your ticket.',
  ],
  [
    'Grow with ROOH',
    'Help host game nights, moderate active chats, build bots and tools, and keep the community thriving.',
  ],
]

export default async function StaffApplication() {
  const guild = await getGuild()

  return (
    <main className="px-3 pt-28 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-6xl">
        <Link href="/team" className="-my-2 inline-flex items-center gap-2 py-2 text-sm text-haze transition hover:text-white">
          <Arrow className="rotate-180" /> Back to Team
        </Link>
      </div>

      <header className="hero-out mx-auto mt-6 flex max-w-3xl flex-col items-center text-center sm:mt-8">
        <Pill live>Staff Application · open on Discord</Pill>
        <h1 className="display text-silver mt-6 pb-2 text-[clamp(2.9rem,14vw,3.6rem)] sm:text-8xl lg:text-[7rem]">Join Our Team!</h1>
        <p className="mt-5 max-w-xl px-2 text-[17px] leading-relaxed text-pretty text-haze sm:mt-6 sm:text-xl">
          Interested in becoming part of our team? Join our Discord server and create a ticket. Our management team will assist you further.
        </p>
      </header>

      <section className="card reveal-scale mx-auto mt-14 grid max-w-6xl sm:mt-20 lg:grid-cols-[1.05fr_1fr]">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgb(139_61_255/.28),transparent_55%),radial-gradient(circle_at_100%_100%,rgb(255_46_81/.2),transparent_55%)]" />
        <div className="flex flex-col justify-between gap-10 p-6 sm:p-12">
          <div>
            <Logo icon={guild?.icon} className="w-16 sm:w-20" />
            <h2 className="display mt-8 text-[2.4rem] sm:text-5xl">Become a Team Member.</h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-haze sm:text-lg">
              We offer plenty of perks and benefits to our team members. Join our Discord server to explore them. You can also ask management about available perks and benefits
              directly through your ticket.
            </p>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <a href={DISCORD} target="_blank" rel="noreferrer" className={`${btn.brand} w-full sm:w-auto`}>
                <DiscordIcon /> Join the ROOH Discord
              </a>
              <Link href="/team" className={`${btn.glass} w-full sm:w-auto`}>
                Meet the current team
              </Link>
            </div>
            {guild && (
              <p className="mt-4 flex items-center justify-center gap-2 text-sm text-haze sm:justify-start">
                <span className="size-2 rounded-full bg-[#3ba55d] shadow-[0_0_8px_#3ba55d]" />
                {guild.online.toLocaleString('en-IN')} members online right now
              </p>
            )}
          </div>
        </div>

        <ol className="border-t border-white/[.07] p-3 sm:p-6 lg:border-t-0 lg:border-l">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-2xl p-4 sm:gap-5 sm:p-5">
              <span className="relative flex flex-col items-center">
                <span className={`grid size-9 shrink-0 place-items-center rounded-full font-mono text-sm ${i === 2 ? 'bg-red text-white' : 'glass text-mist'}`}>{i + 1}</span>
                {i < steps.length - 1 && <span className="absolute top-11 -bottom-7 w-px bg-white/10 sm:-bottom-8" />}
              </span>
              <span className="pt-1.5">
                <span className="block font-semibold text-white sm:text-lg">{s.title}</span>
                <span className="mt-1 block text-[15px] text-haze sm:text-base">{s.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-24 max-w-6xl sm:mt-32">
        <div className="reveal px-2 sm:px-1">
          <h2 className="display text-silver pb-1 text-4xl sm:text-6xl">Perks, benefits & how it works</h2>
          <p className="mt-3 text-haze sm:text-lg">Everything you need to know before opening your application ticket.</p>
        </div>
        <ul className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
          {highlights.map(([title, text]) => (
            <li key={title} className="card reveal p-6 sm:p-7">
              <p className="font-semibold text-white sm:text-lg">{title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-haze sm:text-base">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <Finale title="Ready to join our team?" sub="Hop into the ROOH Discord, open a ticket, and our management team will take it from there." />
    </main>
  )
}
