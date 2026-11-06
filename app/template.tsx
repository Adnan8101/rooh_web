import type { ReactNode } from 'react'

// Re-mounts on every navigation, so each page arrives with the same soft rise.
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-enter">{children}</div>
}
