import Link from 'next/link'
import { DISCORD, INSTAGRAM } from '../components/links'
import { Arrow, btn, DiscordIcon, InstagramIcon, Logo, Pill } from '../components/ui'
import { getGuild } from '../lib/guild'

export const metadata = {
  title: 'Contact · ROOH',
  description: 'Reach the ROOH team: join the Discord server and open a ticket.',
}
export const revalidate = 600

const steps = [
  { title: 'Join the server', text: 'Tap “Join the ROOH Discord” and accept the invite.' },
  { title: 'Find the ticket channel', text: 'Look for the ticket channel near the top of the channel list.' },
  { title: 'Create a ticket', text: 'Press the button there. A private channel opens that only you and the team can see.' },
  { title: 'Tell us what you need', text: 'Explain it in a message. A team member will reply right there.' },
]

const topics = [
  ['Report a member', 'Scams, harassment or rule breaks, with screenshots if you have them.'],
  ['Trade problems', 'Something went wrong in a deal, or you think a vouch is fake.'],
  ['Privacy requests', 'Remove or correct your profile or a vouch on this website.'],
  ['Events and rewards', 'Questions about an event, or claiming a prize you won.'],
  ['Appeals', 'Think a moderation decision was wrong? A different team member will review it.'],
  ['Partnerships', 'Collabs, server partnerships and anything else.'],
]

export default async function Contact() {
  const guild = await getGuild()

  return (
    <main className="px-3 pt-32 sm:px-8 sm:pt-44">
      <header className="hero-out mx-auto flex max-w-3xl flex-col items-center text-center">
        <Pill live>Contact · we answer on Discord</Pill>
        <h1 className="display text-silver mt-6 pb-2 text-[clamp(2.9rem,14vw,3.6rem)] sm:text-8xl lg:text-[7rem]">Talk to the team.</h1>
        <p className="mt-5 max-w-lg px-2 text-[17px] text-pretty text-haze sm:mt-6 sm:text-xl">
          No forms and no email inbox. Every question, report and request goes through a private ticket on our Discord, where the whole team can see it.
        </p>
      </header>

      <section className="card reveal-scale mx-auto mt-14 grid max-w-6xl sm:mt-20 lg:grid-cols-[1fr_1.1fr]">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgb(139_61_255/.28),transparent_55%),radial-gradient(circle_at_100%_100%,rgb(255_46_81/.2),transparent_55%)]" />
        <div className="flex flex-col justify-between gap-10 p-6 sm:p-12">
          <div>
            <Logo icon={guild?.icon} className="w-16 sm:w-20" />
            <h2 className="display mt-8 text-[2.4rem] sm:text-6xl">Open a ticket.</h2>
            <p className="mt-4 max-w-sm text-haze sm:text-lg">The fastest way to reach us, and the only one. Private, logged, and seen by the whole team.</p>
          </div>
          <div>
            <a href={DISCORD} target="_blank" rel="noreferrer" className={`${btn.brand} w-full sm:w-auto`}>
              <DiscordIcon /> Join the ROOH Discord
            </a>
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
          <h2 className="display text-silver pb-1 text-4xl sm:text-6xl">What tickets are for</h2>
          <p className="mt-3 text-haze sm:text-lg">Anything at all. These are the most common.</p>
        </div>
        <ul className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {topics.map(([title, text]) => (
            <li key={title} className="card reveal p-6 sm:p-7">
              <p className="font-semibold text-white sm:text-lg">{title}</p>
              <p className="mt-2 text-[15px] text-haze sm:text-base">{text}</p>
            </li>
          ))}
        </ul>
        <p className="reveal mt-6 px-2 text-sm text-haze sm:px-1">
          Privacy or data questions? See what we show and why in our{' '}
          <Link href="/privacy" className="text-mist underline decoration-red/60 underline-offset-[3px] hover:decoration-red">
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="card group reveal mx-auto mt-24 flex max-w-6xl items-center gap-5 p-6 sm:mt-32 sm:gap-8 sm:p-10">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--color-violet),var(--color-red))] text-white shadow-[0_10px_40px_-10px_var(--color-red)] sm:size-20 sm:rounded-3xl">
          <InstagramIcon className="size-7 sm:size-9" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm text-haze">Follow along on Instagram</span>
          <span className="mt-0.5 block truncate text-2xl font-semibold tracking-tight text-white sm:text-4xl">@rooh_discord</span>
          <span className="mt-1 hidden text-haze sm:block">Event drops, winners and moments from the server. For help, use a ticket.</span>
        </span>
        <Arrow className="size-5 shrink-0 -rotate-45 text-haze transition group-hover:text-white sm:size-6" />
      </a>
    </main>
  )
}
