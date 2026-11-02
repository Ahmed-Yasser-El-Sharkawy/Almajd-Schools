// Decorative artwork for the hero banner, redrawn as SVG from the approved
// design so it stays sharp at every width. Nothing here carries meaning:
// every piece is aria-hidden and ignores the pointer.
import { useId } from "react"

const hidden = { "aria-hidden": true, focusable: "false" }

// useId() returns ":r0:"-style ids; colons are awkward inside url(#...).
const useSvgId = () => useId().replace(/:/g, "")

/**
 * The wave where the cream page meets the navy band: high on the left, low
 * in the middle under the tagline, rising again on the right, with a gold
 * swoosh along each shoulder. Stretched to the box it is given.
 */
export function Seam({ className }) {
  const id = useSvgId()
  return (
    <svg viewBox="0 0 1600 220" preserveAspectRatio="none" className={className} {...hidden}>
      <defs>
        <linearGradient id={`${id}n`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0F3365" />
          <stop offset="1" stopColor="#0C2D5A" />
        </linearGradient>
        <linearGradient id={`${id}l`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B5883B" />
          <stop offset=".22" stopColor="#E6C06A" />
          <stop offset=".42" stopColor="#F7E3A4" />
          <stop offset=".7" stopColor="#D3A547" />
          <stop offset="1" stopColor="#D3A547" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#B5883B" />
          <stop offset=".25" stopColor="#E9C774" />
          <stop offset=".5" stopColor="#F5DE9C" />
          <stop offset=".8" stopColor="#D3A547" />
          <stop offset="1" stopColor="#D3A547" stopOpacity=".15" />
        </linearGradient>
      </defs>
      {/* pale ribbon riding above the left swoosh */}
      <path d="M0 0C300 -6 420 196 790 212L800 214C380 204 290 4 0 12Z" fill="#F3E2B4" opacity=".55" />
      <path d="M0 32C260 30 360 214 820 216C1250 218 1460 190 1600 72V220H0Z" fill={`url(#${id}n)`} />
      <path d="M0 12C290 4 380 204 800 214L820 216C360 214 260 30 0 32Z" fill={`url(#${id}l)`} />
      <path d="M1000 214C1300 214 1470 150 1600 50V76C1460 192 1260 220 1000 216Z" fill={`url(#${id}r)`} />
    </svg>
  )
}

/** Gold ribbons sweeping through the bottom corners of the navy band. */
export function BottomRibbons({ className }) {
  const id = useSvgId()
  return (
    <svg viewBox="0 0 1600 160" preserveAspectRatio="none" className={className} {...hidden}>
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B5883B" />
          <stop offset=".45" stopColor="#E7C46F" />
          <stop offset="1" stopColor="#B5883B" />
        </linearGradient>
      </defs>
      <path d="M0 64C170 56 340 112 580 160H530C320 124 160 84 0 88Z" fill={`url(#${id}g)`} />
      <path d="M0 112C120 110 230 136 330 160H312C214 140 112 122 0 124Z" fill="#D3A547" opacity=".55" />
      <path d="M1600 30C1430 52 1270 112 1060 160H1120C1300 122 1450 76 1600 58Z" fill={`url(#${id}g)`} />
      <path d="M1600 100C1500 108 1400 132 1300 160H1322C1416 138 1510 120 1600 116Z" fill="#D3A547" opacity=".5" />
    </svg>
  )
}

// ---- Islamic 8-fold rosette -------------------------------------------

const deg = (d) => (d * Math.PI) / 180
const round = (n) => Math.round(n * 100) / 100
const at = (r, a) => [round(r * Math.cos(deg(a))), round(r * Math.sin(deg(a)))]
const loop = (pts) => `M${pts.map(([x, y]) => `${x} ${y}`).join("L")}Z`
const gcd = (a, b) => (b ? gcd(b, a % b) : a)

/** The {n/k} star polygon, as gcd(n,k) closed loops. */
function starPolygon(n, k, r, rot) {
  const loops = gcd(n, k)
  let d = ""
  for (let s = 0; s < loops; s++) {
    const pts = []
    for (let i = 0; i < n / loops; i++) pts.push(at(r, rot + ((s + i * k) % n) * (360 / n)))
    d += loop(pts)
  }
  return d
}

// Petals: pointed arches radiating from the inner star, interlacing with
// the outer {8/3} star the way the rosettes in the artwork do.
const PETALS = Array.from({ length: 8 }, (_, i) => {
  const a = i * 45 + 22.5
  const [x1, y1] = at(40, a - 19)
  const [cx1, cy1] = at(70, a - 15)
  const [tx, ty] = at(84, a)
  const [cx2, cy2] = at(70, a + 15)
  const [x2, y2] = at(40, a + 19)
  return `M${x1} ${y1}Q${cx1} ${cy1} ${tx} ${ty}Q${cx2} ${cy2} ${x2} ${y2}`
}).join("")

const ROSETTE = [
  starPolygon(8, 3, 96, 0),
  starPolygon(8, 2, 58, 22.5),
  loop(Array.from({ length: 8 }, (_, i) => at(28, i * 45))),
  PETALS,
].join("")

export function Rosette({ className }) {
  return (
    <svg viewBox="-100 -100 200 200" className={className} {...hidden}>
      <path d={ROSETTE} fill="none" stroke="currentColor" strokeWidth="1.25" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  )
}

/** Concentric gold diamonds, the small emblem at the band's right edge. */
export function DiamondMark({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} {...hidden}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke">
        <path d="M50 2 98 50 50 98 2 50Z" />
        <path d="M50 18 82 50 50 82 18 50Z" />
        <path d="M50 33 67 50 50 67 33 50Z" />
      </g>
      <circle cx="50" cy="50" r="4" fill="currentColor" />
    </svg>
  )
}

// ---- Illustrations ----------------------------------------------------

export function GradCap({ className }) {
  const id = useSvgId()
  return (
    <svg viewBox="0 0 240 176" className={className} {...hidden}>
      <defs>
        <linearGradient id={`${id}t`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6F7F9" />
          <stop offset="1" stopColor="#E3E6EB" />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9ECF0" />
          <stop offset="1" stopColor="#DCE0E6" />
        </linearGradient>
      </defs>
      <path d="M62 70V122C62 146 178 146 178 122V70Z" fill={`url(#${id}b)`} />
      <path d="M120 22 236 62 120 104 4 62Z" fill="#D5DAE1" />
      <path d="M120 14 236 54 120 96 4 54Z" fill={`url(#${id}t)`} />
      <circle cx="120" cy="54" r="4.5" fill="#CDD2D9" />
      <path d="M120 54 34 68V126" fill="none" stroke="#CBD0D8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29 124H39L42 156H26Z" fill="#CBD0D8" />
    </svg>
  )
}

/**
 * Navy books lying in a stack, seen from the front corner: spine facing out,
 * cover on top, the page block down the right-hand side.
 */
export function BooksStack({ className }) {
  const id = useSvgId()
  const book = (x, y, w, h, d, rot) => {
    const dy = d * 0.42
    const right = x + w
    return (
      <g transform={rot ? `rotate(${rot} ${x + w / 2} ${y + h / 2})` : undefined}>
        <path d={`M${x} ${y}H${right}L${right + d} ${y - dy}H${x + d}Z`} fill={`url(#${id}t)`} />
        <path d={`M${right} ${y}L${right + d} ${y - dy}V${y + h - dy}L${right} ${y + h}Z`} fill={`url(#${id}p)`} />
        {[0.24, 0.42, 0.6, 0.78].map((f) => (
          <path key={f} d={`M${right} ${y + h * f}L${right + d} ${y + h * f - dy}`} stroke="#C8AD72" strokeWidth="1" />
        ))}
        <path d={`M${right} ${y + 1.5}L${right + d} ${y - dy + 1.5}M${right} ${y + h - 1.5}L${right + d} ${y + h - dy - 1.5}`} stroke="#1A3566" strokeWidth="3" />
        <rect x={x} y={y} width={w} height={h} rx="4" fill={`url(#${id}f)`} />
        <rect x={x} y={y + 3} width={w} height="3" fill="#ffffff" opacity=".12" />
        <rect x={right - 36} y={y} width="4" height={h} fill="#D9B160" />
        <rect x={right - 26} y={y} width="2" height={h} fill="#D9B160" />
      </g>
    )
  }
  return (
    <svg viewBox="0 0 220 232" className={className} {...hidden}>
      <defs>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24478A" />
          <stop offset=".6" stopColor="#1A386F" />
          <stop offset="1" stopColor="#122A59" />
        </linearGradient>
        <linearGradient id={`${id}t`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2C4F90" />
          <stop offset="1" stopColor="#3A60A6" />
        </linearGradient>
        <linearGradient id={`${id}p`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FCF2D2" />
          <stop offset="1" stopColor="#E6CF95" />
        </linearGradient>
      </defs>
      <ellipse cx="90" cy="224" rx="130" ry="7" fill="#020A1E" opacity=".3" />
      {book(-50, 172, 212, 48, 28)}
      {book(-40, 122, 190, 44, 26)}
      {book(-56, 82, 160, 38, 24, -5)}
    </svg>
  )
}

/** A navy pen cup with gold rims, pens and two tall books behind it. */
export function PenCup({ className }) {
  const id = useSvgId()
  const tallBook = (x, y, w) => (
    <g>
      <rect x={x} y={y} width={w} height={320 - y} rx="5" fill={`url(#${id}v)`} />
      <rect x={x} y={y + 26} width={w} height="9" fill="#D9B160" />
      <rect x={x} y={y + 42} width={w} height="3" fill="#D9B160" />
      <rect x={x} y="270" width={w} height="3" fill="#D9B160" />
      <rect x={x} y="280" width={w} height="9" fill="#D9B160" />
      <rect x={x + 5} y={y} width="6" height={320 - y} fill="#ffffff" opacity=".08" />
    </g>
  )
  const pen = (x1, y1, x2, y2, color, w, tip) => (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeLinecap="round" />
      {tip && <line x1={x2} y1={y2} x2={x2 + (x2 - x1) * 0.12} y2={y2 + (y2 - y1) * 0.12} stroke={tip} strokeWidth={w * 0.55} strokeLinecap="round" />}
    </g>
  )
  return (
    <svg viewBox="0 0 260 320" className={className} {...hidden}>
      <defs>
        <linearGradient id={`${id}v`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1A386F" />
          <stop offset=".5" stopColor="#24478A" />
          <stop offset="1" stopColor="#142C5C" />
        </linearGradient>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B5883B" />
          <stop offset=".5" stopColor="#F0D38A" />
          <stop offset="1" stopColor="#B5883B" />
        </linearGradient>
      </defs>
      {tallBook(160, 22, 54)}
      {tallBook(216, 44, 54)}
      <ellipse cx="88" cy="168" rx="56" ry="12" fill="#071A3C" />
      {pen(64, 176, 40, 58, `url(#${id}g)`, 12, "#7A5A22")}
      {pen(82, 176, 78, 40, "#1E3C74", 10, "#D9B160")}
      {pen(98, 176, 118, 62, `url(#${id}g)`, 10, "#7A5A22")}
      {pen(110, 176, 140, 80, "#24478A", 9, "#E6C474")}
      <path d="M32 168A56 12 0 0 0 144 168V300A56 12 0 0 1 32 300Z" fill={`url(#${id}v)`} />
      <path d="M32 168A56 12 0 0 0 144 168" fill="none" stroke={`url(#${id}g)`} strokeWidth="6" />
      <path d="M32 188A56 12 0 0 0 144 188" fill="none" stroke="#D9B160" strokeWidth="3" />
      <path d="M32 288A56 12 0 0 0 144 288" fill="none" stroke="#D9B160" strokeWidth="3" />
      <rect x="48" y="180" width="8" height="112" rx="4" fill="#ffffff" opacity=".1" />
    </svg>
  )
}
