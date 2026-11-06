import { db } from '../lib/db'

// Website tiers, highest first. Must match TIERS in bot/src/index.ts.
export const TIERS = ['Owner', 'Imposter', 'Malkin', 'Co Owner', 'Manager', 'Head Mod', 'Staff Team'] as const
export type Tier = (typeof TIERS)[number]

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

/**
 * Everyone on the team, placed once in the highest tier they qualify for:
 * their own tier (bot !adduser) or the tier of any linked Discord role they hold (bot !addrole).
 */
export async function getTeam(): Promise<Member[]> {
  const d = await db()
  const [docs, links] = await Promise.all([
    d.collection<any>('users').find({ bot: { $ne: true } }).toArray(),
    d.collection<any>('roles').find().toArray(),
  ])
  const roleTier = new Map<string, string>(links.map((r) => [r._id, r.tier]))

  return docs
    .flatMap((u) => {
      const ranks = [u.manualTier, ...(u.roles ?? []).map((r: { id: string }) => roleTier.get(r.id))]
        .map((t) => TIERS.indexOf(t))
        .filter((i) => i >= 0)
      if (!ranks.length || !u.username) return []
      const rank = Math.min(...ranks)
      return [
        {
          id: u._id,
          name: (u.displayName ?? u.globalName ?? u.username).trim(),
          username: u.username,
          avatar: u.avatar,
          banner: u.banner ?? null,
          tier: TIERS[rank],
          rank,
          joinedAt: u.joinedAt ?? null,
        },
      ]
    })
    .sort((a, b) => a.rank - b.rank || +(a.joinedAt ?? 0) - +(b.joinedAt ?? 0))
}
