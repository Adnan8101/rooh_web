import { db } from './db'

let cachedGuildId: string | undefined = process.env.GUILD_ID

async function resolveGuildId(): Promise<string | undefined> {
  if (cachedGuildId) return cachedGuildId
  try {
    const d = await db()
    const doc = await d.collection<any>('config').findOne({ _id: 'guild' })
    if (doc?.id) cachedGuildId = String(doc.id)
  } catch {}
  return cachedGuildId
}

/** The ROOH server itself, read with the bot token: icon, banner and live member counts. Cached for 10 minutes. */
export async function getGuild() {
  const token = process.env.DISCORD_TOKEN
  const guildId = await resolveGuildId()
  if (!token || !guildId) return null
  const r = await fetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, {
    headers: { Authorization: `Bot ${token}` },
    signal: AbortSignal.timeout(3500),
    next: { revalidate: 600 },
  }).catch(() => null)
  if (!r?.ok) return null
  const g = await r.json()
  const cdn = (kind: string, hash: string | null, size: number) =>
    hash ? `https://cdn.discordapp.com/${kind}/${g.id}/${hash}.${hash.startsWith('a_') ? 'gif' : 'png'}?size=${size}` : null
  return {
    icon: cdn('icons', g.icon, 128),
    members: g.approximate_member_count as number,
    online: g.approximate_presence_count as number,
  }
}

export const compact = (n: number) => new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(n)
