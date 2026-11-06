// Hand-built SVG objects for events, lit in the brand's violet and red.

const ring = (n: number, r: number, cx: number, cy: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2
    return [+(cx + r * Math.cos(a)).toFixed(2), +(cy + r * Math.sin(a)).toFixed(2)] as const
  })

export function SpinArt({ className = '' }: { className?: string }) {
  const n = 8
  const pts = ring(n, 142, 200, 190)
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden>
      <defs>
        <linearGradient id="sp-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".5" stopColor="#d9c4ff" />
          <stop offset="1" stopColor="#5b1fb8" />
        </linearGradient>
        <linearGradient id="sp-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b17cff" />
          <stop offset="1" stopColor="#5d17c9" />
        </linearGradient>
        <linearGradient id="sp-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff6a83" />
          <stop offset="1" stopColor="#c3102f" />
        </linearGradient>
        <radialGradient id="sp-depth">
          <stop offset=".55" stopColor="#12031f" stopOpacity="0" />
          <stop offset="1" stopColor="#12031f" stopOpacity=".55" />
        </radialGradient>
        <radialGradient id="sp-hub" cx=".35" cy=".3">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".6" stopColor="#d9c4ff" />
          <stop offset="1" stopColor="#6d28d9" />
        </radialGradient>
        <linearGradient id="sp-stand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2a0b52" />
          <stop offset=".45" stopColor="#9a6bff" />
          <stop offset="1" stopColor="#24073f" />
        </linearGradient>
        <radialGradient id="sp-shadow">
          <stop offset="0" stopColor="#000" stopOpacity=".7" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="200" cy="374" rx="140" ry="22" fill="url(#sp-shadow)" />
      <path d="M170 296h60l32 72q-62 14-124 0z" fill="url(#sp-stand)" />

      <g className="origin-center transition-transform duration-[1.8s] ease-out [transform-box:fill-box] group-hover:rotate-[157.5deg]">
        <circle cx="200" cy="190" r="160" fill="url(#sp-rim)" />
        <circle cx="200" cy="190" r="147" fill="#1a0530" />
        {pts.map(([x0, y0], i) => {
          const [x1, y1] = pts[(i + 1) % n]
          return <path key={i} d={`M200 190L${x0} ${y0}A142 142 0 0 1 ${x1} ${y1}z`} fill={`url(#sp-${i % 2 ? 'b' : 'a'})`} />
        })}
        <circle cx="200" cy="190" r="142" fill="url(#sp-depth)" />
        {ring(16, 152, 200, 190).map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4.2" fill="#fff" stroke="#5b1fb8" strokeOpacity=".5" />
        ))}
        <circle cx="200" cy="190" r="32" fill="url(#sp-hub)" />
        <circle cx="200" cy="190" r="11" fill="#fff" opacity=".9" />
      </g>

      <path d="M86 128a136 136 0 0 1 108-72" stroke="#fff" strokeOpacity=".6" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M200 10c22 0 30 22 15 40l-15 20-15-20c-15-18-7-40 15-40z" fill="url(#sp-rim)" />
      <circle cx="200" cy="31" r="6" fill="#ff2e51" />
    </svg>
  )
}

export function CakeArt({ className = '' }: { className?: string }) {
  // drips along the front edge of an elliptical tier top
  const drips = (cx: number, cy: number, rx: number, ry: number, lens: number[]) =>
    lens.map((len, i) => {
      const x = cx - rx + ((i + 0.5) / lens.length) * rx * 2
      const y = cy + ry * Math.sqrt(Math.max(0, 1 - ((x - cx) / rx) ** 2))
      return <rect key={i} x={x - 7} y={y - 6} width="14" height={len} rx="7" fill="url(#ck-drip)" />
    })
  const candles = [168, 200, 232]

  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden>
      <defs>
        <linearGradient id="ck-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2a0b52" />
          <stop offset=".42" stopColor="#8b4dff" />
          <stop offset=".72" stopColor="#6424d6" />
          <stop offset="1" stopColor="#24073f" />
        </linearGradient>
        <radialGradient id="ck-top" cx=".45" cy=".35">
          <stop offset="0" stopColor="#ff8aa0" />
          <stop offset="1" stopColor="#e0193d" />
        </radialGradient>
        <linearGradient id="ck-drip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff4d6a" />
          <stop offset="1" stopColor="#c3102f" />
        </linearGradient>
        <linearGradient id="ck-plate" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5b1fb8" />
          <stop offset=".5" stopColor="#efe6ff" />
          <stop offset="1" stopColor="#4a1596" />
        </linearGradient>
        <radialGradient id="ck-flame" cx=".5" cy=".7" r=".6">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".5" stopColor="#ff8aa0" />
          <stop offset="1" stopColor="#ff2e51" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ck-glow">
          <stop offset="0" stopColor="#ff2e51" stopOpacity=".55" />
          <stop offset="1" stopColor="#ff2e51" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ck-b1" cx=".35" cy=".3">
          <stop offset="0" stopColor="#d9c4ff" />
          <stop offset="1" stopColor="#6d28d9" />
        </radialGradient>
        <radialGradient id="ck-b2" cx=".35" cy=".3">
          <stop offset="0" stopColor="#ff8aa0" />
          <stop offset="1" stopColor="#c3102f" />
        </radialGradient>
        <pattern id="ck-stripe" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="10" height="10" fill="#fff" />
          <rect width="4" height="10" fill="#ff2e51" />
        </pattern>
        <radialGradient id="ck-shadow">
          <stop offset="0" stopColor="#000" stopOpacity=".7" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* balloons, tied behind the cake */}
      <g className="animate-float">
        <path d="M318 120q-14 60 6 120M362 152q10 50-26 92" stroke="#fff" strokeOpacity=".5" strokeWidth="1.5" fill="none" />
        <ellipse cx="318" cy="78" rx="34" ry="41" fill="url(#ck-b1)" />
        <path d="M313 118h10l-5 7z" fill="#6d28d9" />
        <ellipse cx="306" cy="62" rx="8" ry="13" fill="#fff" opacity=".7" transform="rotate(-25 306 62)" />
        <ellipse cx="362" cy="122" rx="26" ry="31" fill="url(#ck-b2)" />
        <path d="M358 152h8l-4 6z" fill="#c3102f" />
        <ellipse cx="353" cy="110" rx="6" ry="10" fill="#fff" opacity=".5" transform="rotate(-25 353 110)" />
      </g>

      <ellipse cx="200" cy="366" rx="172" ry="24" fill="url(#ck-shadow)" />
      <ellipse cx="200" cy="342" rx="152" ry="26" fill="url(#ck-plate)" />
      <ellipse cx="200" cy="336" rx="140" ry="19" fill="#1a0530" />

      {/* bottom tier */}
      <path d="M80 232v88a120 22 0 0 0 240 0v-88z" fill="url(#ck-side)" />
      {Array.from({ length: 9 }, (_, i) => {
        const x = 96 + i * 26
        return <circle key={i} cx={x} cy={292 + 16 * Math.sqrt(1 - ((x - 200) / 120) ** 2)} r="4" fill="#ff8aa0" />
      })}
      <ellipse cx="200" cy="232" rx="120" ry="22" fill="url(#ck-top)" />
      {drips(200, 232, 120, 22, [22, 34, 18, 40, 26, 30, 16, 36])}

      {/* top tier */}
      <path d="M125 166v64a75 14 0 0 0 150 0v-64z" fill="url(#ck-side)" />
      <ellipse cx="200" cy="166" rx="75" ry="14" fill="url(#ck-top)" />
      {drips(200, 166, 75, 14, [18, 28, 14, 24, 20])}

      {candles.map((x) => (
        <g key={x}>
          <circle cx={x} cy="92" r="24" fill="url(#ck-glow)" />
          <rect x={x - 5} y="112" width="10" height="56" rx="3" fill="url(#ck-stripe)" />
          <path d={`M${x} 106v6`} stroke="#fff" strokeWidth="2" />
          <path
            d={`M${x} 76c9 14 8 26 0 30c-8-4-9-16 0-30z`}
            fill="url(#ck-flame)"
            className="origin-bottom animate-flicker [transform-box:fill-box]"
            style={{ animationDelay: `${(x % 7) * 0.13}s` }}
          />
        </g>
      ))}
    </svg>
  )
}
