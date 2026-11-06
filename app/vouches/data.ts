import { db } from '../lib/db'

export type Person = { id: string; name: string; avatar: string }
export type Vouch = {
  id: string
  url: string
  at: Date
  author: Person
  to: string[]
  item?: string
  note?: string
  text: string
}

const MENTION = /<@!?(\d+)>/g
const DEAL = /^(?:\+?rep\s+)?(?:legit\s+)?(?:got|bought|purchased?)\s+(.+?)\s+from\s+(?:<@!?\d+>[\s/&,]*)+(.*)$/i

const tidy = (s: string) =>
  s
    .replace(/<a?:\w+:\d+>/g, '') // custom emoji
    .replace(/\*\*|__|^#+\s*/gm, '')
    .replace(/\s+/g, ' ')
    .trim()

const nameOf = (...n: (string | null | undefined)[]) =>
  n.map((s) => s?.replace(/^[!.\s]+/, '').trim()).find(Boolean) ?? 'Member'

const fallbackAvatar = (id: string) => `https://cdn.discordapp.com/embed/avatars/${Number((BigInt(id) >> BigInt(22)) % BigInt(6))}.png`

function parse(raw: string) {
  const text = tidy(raw)
  const m = text.match(DEAL)
  if (!m) return { text }
  const item = m[1].replace(/(\d+)\s*inr\b/i, '₹$1').replace(/^\w/, (c) => c.toUpperCase())
  const note = m[2].replace(/^[\s/&,()-]+|[\s()]+$/g, '') || undefined
  return { text, item, note }
}

async function discordUser(id: string): Promise<Person | null> {
  const r = await fetch(`https://discord.com/api/v10/users/${id}`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
    next: { revalidate: 86400 },
  }).catch(() => null)
  if (!r?.ok) return null
  const u = await r.json()
  return {
    id,
    name: nameOf(u.global_name, u.username),
    avatar: u.avatar ? `https://cdn.discordapp.com/avatars/${id}/${u.avatar}.webp?size=128` : fallbackAvatar(id),
  }
}

export async function getVouches() {
  const d = await db()
  const docs = await d.collection<any>('vouches').find({ 'author.bot': { $ne: true } }).sort({ createdAt: -1 }).toArray()

  const vouches: Vouch[] = docs.map((v) => ({
    id: String(v._id),
    url: v.url,
    at: v.createdAt,
    author: {
      id: v.author.id,
      name: nameOf(v.author.displayName, v.author.globalName, v.author.username),
      avatar: v.author.avatar ?? fallbackAvatar(v.author.id),
    },
    to: [...new Set([...String(v.content).matchAll(MENTION)].map((m) => m[1]))],
    ...parse(v.content),
  }))

  const ids = [...new Set(vouches.flatMap((v) => v.to))]
  const known = await d.collection<any>('users').find({ _id: { $in: ids } }).toArray()
  const people = new Map<string, Person>(
    known.map((u) => [u._id, { id: u._id, name: nameOf(u.displayName, u.globalName, u.username), avatar: u.avatar }]),
  )
  await Promise.all(
    ids.filter((id) => !people.has(id)).map(async (id) => {
      const p = await discordUser(id)
      if (p) people.set(id, p)
    }),
  )

  const ranked = ids
    .map((id) => ({ person: people.get(id) ?? { id, name: 'Unknown member', avatar: fallbackAvatar(id) }, count: vouches.filter((v) => v.to.includes(id)).length }))
    .sort((a, b) => b.count - a.count)

  return { vouches, people, ranked, authors: new Set(vouches.map((v) => v.author.id)).size }
}
