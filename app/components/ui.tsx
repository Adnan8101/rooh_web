import type { ReactNode } from 'react'

const base =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium tracking-tight transition duration-300 ease-out active:scale-[.97]'

export const btn = {
  brand: `${base} bg-red text-white shadow-[inset_0_1px_0_rgb(255_255_255/.25)] hover:bg-[#ff4766]`,
  glass: `${base} glass text-mist hover:bg-white/10`,
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={`size-4 ${className}`} aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

export function DiscordIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.6 5.3A17 17 0 0 0 15.4 4l-.5 1.1a15.7 15.7 0 0 0-5.8 0L8.6 4a17 17 0 0 0-4.2 1.3C1.7 9.3 1 13.2 1.3 17a17.2 17.2 0 0 0 5.2 2.6l1.1-1.8a11 11 0 0 1-1.7-.8l.4-.3a12.3 12.3 0 0 0 10.6 0l.4.3c-.5.3-1.1.6-1.7.8l1.1 1.8a17.1 17.1 0 0 0 5.2-2.6c.4-4.4-.7-8.3-2.3-11.7ZM8.5 14.7c-1 0-1.9-1-1.9-2.1s.8-2.1 1.9-2.1 1.9.9 1.9 2.1-.8 2.1-1.9 2.1Zm7 0c-1 0-1.9-1-1.9-2.1s.8-2.1 1.9-2.1 1.9.9 1.9 2.1-.8 2.1-1.9 2.1Z" />
    </svg>
  )
}

export function InstagramIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** Text split into words that light up one by one as they scroll through the screen. */
export function Words({ text, className = '' }: { text: string; className?: string }) {
  return text.split(' ').map((w, i) => (
    <span key={i}>
      <span className={`word inline-block ${className}`}>{w}</span>{' '}
    </span>
  ))
}

/** Red dot with a sonar ring: something is happening right now. */
export function Beacon() {
  return (
    <span className="relative flex size-2">
      <span className="absolute inset-0 animate-beacon rounded-full bg-red" />
      <span className="relative size-2 rounded-full bg-red" />
    </span>
  )
}

export function Pill({ children, live, className = '' }: { children: ReactNode; live?: boolean; className?: string }) {
  return (
    <span className={`glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[13px] font-medium text-mist/80 ${className}`}>
      {live && <Beacon />}
      {children}
    </span>
  )
}

/** Round glass badge holding an icon, with an arc of brand light turning around its edge. */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="relative grid size-16 place-items-center rounded-full">
      <span className="bg-ring absolute inset-0 animate-turn rounded-full opacity-80 will-change-transform [mask:radial-gradient(farthest-side,transparent_calc(100%-1.5px),#000_calc(100%-1px))]" />
      <span className="glass grid size-[calc(100%-6px)] place-items-center rounded-full text-red">{children}</span>
    </span>
  )
}

/** One word in a headline, in red, with a hand-drawn stroke under it. */
export function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block text-red">
      {children}
      <svg viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-[0.08em] left-0 h-[0.12em] w-full" aria-hidden>
        <path d="M2 9C50 3 150 2 198 7" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </span>
  )
}

/**
 * The edge of a planet: a wide glowing arc that separates sections.
 * Static paint only (gradients + one shadow), so it costs nothing while scrolling.
 */
export function Horizon() {
  return (
    <div aria-hidden className="pointer-events-none relative h-48 overflow-hidden [mask:linear-gradient(#000_45%,transparent)] sm:h-64">
      <div className="absolute top-20 left-1/2 aspect-square w-[340vw] -translate-x-1/2 rounded-full border-t-2 border-red/80 bg-[radial-gradient(ellipse_30%_10%_at_50%_0,rgb(139_61_255/.35),transparent)] shadow-[0_-10px_50px_-6px_rgb(255_46_81/.55),inset_0_24px_60px_-28px_rgb(255_46_81/.6)] [mask:linear-gradient(90deg,transparent_30%,#000_45%,#000_55%,transparent_70%)] sm:w-[260vw]" />
    </div>
  )
}

/** Centred section opener: pill (or icon badge), headline, one line of context. */
export function Head({ pill, badge, title, sub, children }: { pill?: string; badge?: ReactNode; title: ReactNode; sub?: ReactNode; children?: ReactNode }) {
  return (
    <div className="reveal mx-auto flex max-w-3xl flex-col items-center text-center">
      {badge ? <Badge>{badge}</Badge> : pill && <Pill>{pill}</Pill>}
      <h2 className="display text-silver mt-6 pb-1 text-[2.75rem] sm:text-6xl lg:text-7xl">{title}</h2>
      {sub && <p className="mt-5 max-w-xl text-lg text-balance text-haze sm:text-xl">{sub}</p>}
      {children}
    </div>
  )
}

/** The server's own Discord icon inside the turning brand ring; the plain eclipse if there is no icon. */
export function Logo({ icon, className = 'w-7' }: { icon?: string | null; className?: string }) {
  if (!icon) return <Eclipse glow={false} className={className} />
  return (
    <span className={`relative grid aspect-square shrink-0 place-items-center ${className}`}>
      <span className="bg-ring absolute inset-0 animate-turn rounded-full will-change-transform" />
      <img src={icon} alt="" className="relative size-[calc(100%-3px)] rounded-full bg-night object-cover" />
    </span>
  )
}

/**
 * The ROOH mark: a dark disc with violet→red light sweeping around its rim.
 * Size it with a width class; it is always square.
 */
export function Eclipse({ className = '', glow = true }: { className?: string; glow?: boolean }) {
  return (
    <div aria-hidden className={`pointer-events-none relative aspect-square ${className}`}>
      {/* Soft light from plain radial gradients (no blur filter), turning in step with the rim.
          Only transform animates, so the GPU just rotates a cached layer. */}
      {glow && (
        <div className="absolute -inset-[30%] animate-turn bg-[radial-gradient(circle_at_80%_35%,rgb(255_46_81/.3),transparent_32%),radial-gradient(circle_at_22%_28%,rgb(139_61_255/.42),transparent_36%)] will-change-transform" />
      )}
      <div className="bg-ring absolute inset-0 animate-turn rounded-full will-change-transform" />
      <div className="absolute inset-[2px] rounded-full bg-night shadow-[inset_0_0_120px_rgb(139_61_255/.22)]" />
    </div>
  )
}
