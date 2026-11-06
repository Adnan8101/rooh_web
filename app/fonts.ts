import { Inter } from 'next/font/google'

/**
 * Apple's own type. SF Pro can't be licensed for the web, so Apple devices use the real thing
 * from the system (see --font-sans in globals.css) and everyone else gets Inter, its closest open match.
 */
export const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
