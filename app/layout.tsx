import type { ReactNode } from 'react'
import Footer from './components/Footer'
import Nav from './components/Nav'
import SmoothScroll from './components/SmoothScroll'
import Spotlight from './components/Spotlight'
import { geist, geistMono } from './fonts'
import { getGuild } from './lib/guild'
import './globals.css'

const DESCRIPTION =
  'Rooh - A highly active Discord community with nonstop chats, voice hangouts & a lively space for Hindi and English speakers. Discover one of the best Indian Discord servers for socializing, Indian chat servers, Indian online communities, and active hangout Discord servers.'

export const viewport = { themeColor: '#07020d', colorScheme: 'dark', viewportFit: 'cover' }

export async function generateMetadata() {
  const g = await getGuild()
  return {
    title: 'ROOH - the server with a soul',
    description: DESCRIPTION,
    keywords: ['Indian Discord server', 'Indian chat server', 'Hindi Discord', 'Indian online community', 'active hangout Discord server', 'ROOH'],
    openGraph: { title: 'ROOH - the server with a soul', description: DESCRIPTION, images: g?.icon ? [g.icon] : undefined },
    icons: g?.icon ? { icon: g.icon, apple: g.icon } : undefined,
  }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const g = await getGuild()
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <SmoothScroll />
        <div aria-hidden className="progress fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-red" />
        <Spotlight />
        <Nav icon={g?.icon} />
        <div className="flex-1">{children}</div>
        <Footer icon={g?.icon} />
      </body>
    </html>
  )
}
