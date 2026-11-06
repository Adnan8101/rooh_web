import { db } from '../lib/db'

// Website tiers, highest first. Must match TIERS in bot/src/index.ts.
export const TIERS = ['Owner', 'Imposter', 'Malkin', 'Developer', 'Co Owner', 'Manager', 'Head Mod', 'Staff Team'] as const
export type Tier = (typeof TIERS)[number]

const ALIASES: Record<string, Tier> = {
  dev: 'Developer',
  developer: 'Developer',
  devs: 'Developer',
  maalkin: 'Malkin',
  coowner: 'Co Owner',
  headmod: 'Head Mod',
  mod: 'Head Mod',
  staff: 'Staff Team',
  staffteam: 'Staff Team',
}

const key = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '')
const resolveTier = (s?: string | null): Tier | undefined => {
  if (!s) return undefined
  const k = key(s)
  return TIERS.find((t) => key(t) === k) ?? ALIASES[k]
}

export type Member = {
  id: string
  name: string
  username: string
  avatar: string
  banner: string | null
  tier: Tier
  rank: number
  joinedAt: Date | null
}

const fallbackAvatar = (id: string) => {
  try {
    return `https://cdn.discordapp.com/embed/avatars/${Number((BigInt(id) >> BigInt(22)) % BigInt(6))}.png`
  } catch {
    return 'https://cdn.discordapp.com/embed/avatars/0.png'
  }
}

/**
 * Everyone on the team, placed once in the highest tier they qualify for:
 * their own tier (bot !adduser) or the tier of any linked Discord role they hold (bot !addrole).
 */
export async function getTeam(): Promise<Member[]> {
  const d = await db()
  const [docs, links] = await Promise.all([
    d
      .collection<any>('users')
      .find(
        { bot: { $ne: true } },
        { projection: { username: 1, globalName: 1, displayName: 1, avatar: 1, banner: 1, manualTier: 1, teamRole: 1, roles: 1, joinedAt: 1 } },
      )
      .toArray(),
    d.collection<any>('roles').find({}, { projection: { tier: 1 } }).toArray(),
  ])
  const roleTier = new Map<string, string>(links.map((r) => [String(r._id), r.tier]))

  return docs
    .flatMap((u) => {
      const ranks = [u.manualTier, u.teamRole, ...(u.roles ?? []).map((r: { id: string }) => roleTier.get(r.id))]
        .map((t) => {
          const resolved = resolveTier(t)
          return resolved ? TIERS.indexOf(resolved) : -1
        })
        .filter((i) => i >= 0)
      if (!ranks.length || !u.username) return []
      const rank = Math.min(...ranks)
      return [
        {
          id: String(u._id),
          name: (u.displayName ?? u.globalName ?? u.username).trim(),
          username: u.username,
          avatar: u.avatar || fallbackAvatar(String(u._id)),
          banner: u.banner ?? null,
          tier: TIERS[rank],
          rank,
          joinedAt: u.joinedAt ? new Date(u.joinedAt) : null,
        },
      ]
    })
    .sort((a, b) => a.rank - b.rank || +(a.joinedAt ?? 0) - +(b.joinedAt ?? 0))
}
