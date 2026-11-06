export { DISCORD } from '../components/links'

export type RoohEvent = {
  slug: string
  title: string
  status: 'live' | 'upcoming' | 'ended'
  art: 'spin' | 'cake'
  /** ISO date, YYYY-MM-DD */
  date?: string
  time?: string
  host?: string
  venue: string
  tagline: string
  about: string[]
  questions?: string[]
  prizes?: { value: string; label: string; note: string }[]
  rewards?: { group: string; items: { label: string; amount: number; each?: boolean; count?: number }[] }[]
  poster?: { src: string; width: number; height: number; alt: string }
  signoff: string
}

export const events: RoohEvent[] = [
  {
    slug: 'the-exclusive-spin',
    title: 'The Exclusive Spin',
    status: 'live',
    art: 'spin',
    venue: 'ROOH Discord server',
    tagline: 'Not just another spin. It’s ROOH - where luck meets luxury.',
    about: ['One wheel. A world of possibilities.', 'Exclusive rewards and one unforgettable event to win them.'],
    questions: ['Will fortune choose you?', 'Will you claim the rewards?', 'Will today be your lucky day?'],
    prizes: [
      { value: '₹500', label: 'Cash reward', note: 'One lucky winner' },
      { value: '3×', label: 'Nitro IDs', note: 'Discord premium' },
      { value: '2×', label: 'Profile decos', note: 'Profile aesthetic' },
    ],
    signoff: 'Your luck. Your moment. Only at ROOH.',
  },
  {
    slug: 'ninnis-birthday-night',
    title: 'Ninni’s Birthday Night',
    status: 'ended',
    art: 'cake',
    date: '2026-09-09',
    time: '9 PM onwards',
    host: 'Rashika',
    venue: 'ROOH Discord server',
    tagline: 'A very special birthday night in honour of Ninni.',
    about: [
      'An evening filled with music, fun games, laughter and unforgettable memories.',
      'Exclusive cash rewards and many more freebies for the clans and players who made the night.',
    ],
    rewards: [
      {
        group: 'Clan rewards',
        items: [
          { label: '1st place', amount: 750 },
          { label: '2nd place', amount: 500 },
          { label: '3rd place', amount: 350 },
          { label: '4th place', amount: 200 },
        ],
      },
      { group: 'Individual rewards', items: [{ label: 'Top 2 players', amount: 100, each: true, count: 2 }] },
    ],
    poster: { src: '/event_1.webp', width: 581, height: 823, alt: 'Poster for Ninni’s Birthday Party - 9 September, 9 PM' },
    signoff: 'See you at the next celebration.',
  },
]

export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

export const formatDate = (iso: string, o: Intl.DateTimeFormatOptions) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { ...o, timeZone: 'UTC' }).replace(/\bSept\b/, 'Sep')
