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

const fallbackAvatar = (id: string) => {
  try {
    return `https://cdn.discordapp.com/embed/avatars/${Number((BigInt(id) >> BigInt(22)) % BigInt(6))}.png`
  } catch {
    return 'https://cdn.discordapp.com/embed/avatars/0.png'
  }
}

function parse(raw: string) {
  const text = tidy(raw)
  const m = text.match(DEAL)
  if (!m) return { text }
  const item = m[1].replace(/(\d+)\s*inr\b/i, '₹$1').replace(/^\w/, (c) => c.toUpperCase())
  const note = m[2].replace(/^[\s/&,()-]+|[\s()]+$/g, '') || undefined
  return { text, item, note }
}

const userCache = new Map<string, Person>()

async function discordUser(id: string): Promise<Person | null> {
  const cached = userCache.get(id)
  if (cached) return cached
  if (!process.env.DISCORD_TOKEN) return null
  const r = await fetch(`https://discord.com/api/v10/users/${id}`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
    signal: AbortSignal.timeout(3500),
    next: { revalidate: 86400 },
  }).catch(() => null)
  if (!r?.ok) return null
  const u = await r.json()
  const person = {
    id,
    name: nameOf(u.global_name, u.username),
    avatar: u.avatar ? `https://cdn.discordapp.com/avatars/${id}/${u.avatar}.webp?size=128` : fallbackAvatar(id),
  }
  userCache.set(id, person)
  return person
}

/** Fast mention tally for the Team page without resolving every vouch card or calling Discord's API. */
export async function getVouchCounts(): Promise<Map<string, number>> {
  const d = await db()
  const docs = await d
    .collection<any>('vouches')
    .find({ 'author.bot': { $ne: true } }, { projection: { content: 1 } })
    .toArray()
  const counts = new Map<string, number>()
  for (const v of docs) {
    const seen = new Set<string>()
    for (const m of String(v.content ?? '').matchAll(MENTION)) {
      const id = m[1]
      if (!seen.has(id)) {
        seen.add(id)
        counts.set(id, (counts.get(id) ?? 0) + 1)
      }
    }
  }
  return counts
}

export async function getVouches() {
  const d = await db()
  const docs = await d.collection<any>('vouches').find({ 'author.bot': { $ne: true } }).sort({ createdAt: -1 }).toArray()

  const counts = new Map<string, number>()
  const people = new Map<string, Person>()

  const vouches: Vouch[] = docs.map((v) => {
    const authorId = String(v.author?.id ?? '')
    const author: Person = {
      id: authorId,
      name: nameOf(v.author?.displayName, v.author?.globalName, v.author?.username),
      avatar: v.author?.avatar || fallbackAvatar(authorId),
    }
    if (authorId && !people.has(authorId)) people.set(authorId, author)

    const to = [...new Set([...String(v.content ?? '').matchAll(MENTION)].map((m) => m[1]))]
    for (const id of to) counts.set(id, (counts.get(id) ?? 0) + 1)

    return {
      id: String(v._id),
      url: v.url,
      at: v.createdAt instanceof Date ? v.createdAt : new Date(v.createdAt ?? Date.now()),
      author,
      to,
      ...parse(String(v.content ?? '')),
    }
  })

  const ids = [...counts.keys()]
  if (ids.length) {
    const known = await d
      .collection<any>('users')
      .find({ _id: { $in: ids } }, { projection: { displayName: 1, globalName: 1, username: 1, avatar: 1 } })
      .toArray()
    for (const u of known) {
      const id = String(u._id)
      people.set(id, { id, name: nameOf(u.displayName, u.globalName, u.username), avatar: u.avatar || fallbackAvatar(id) })
    }
  }

  const missing = ids.filter((id) => !people.has(id))
  const it = missing[Symbol.iterator]()
  await Promise.all(
    Array.from({ length: Math.min(5, missing.length) }, async () => {
      for (const id of it) {
        const p = await discordUser(id)
        if (p) people.set(id, p)
      }
    }),
  )

  const ranked = ids
    .map((id) => ({ person: people.get(id) ?? { id, name: 'Unknown member', avatar: fallbackAvatar(id) }, count: counts.get(id) ?? 0 }))
    .sort((a, b) => b.count - a.count)

  return { vouches, people, ranked, authors: new Set(vouches.map((v) => v.author.id)).size }
}
