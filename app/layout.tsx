import Link from 'next/link'
import type { ReactNode } from 'react'

export const metadata = { title: 'Rooh' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link> | <Link href="/vouches">Vouches</Link> |{' '}
          <Link href="/team">Team</Link> | <Link href="/events">Events</Link>
        </nav>
        <hr />
        {children}
      </body>
    </html>
  )
}
