// Line illustrations for the two subject cards, after the approved artwork:
// calculator, compasses, set square and a bar chart for the quantitative
// section; an open book with loose letters for the verbal one. Decorative.
import { useId } from "react"

const INK = "#0A2352"
const PAPER = "#FFFDF7"
const hidden = { "aria-hidden": true, focusable: "false" }
const useSvgId = () => useId().replace(/:/g, "")

function Glow({ id, cx, cy, r }) {
  return (
    <>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor="#EFCF7E" stopOpacity=".75" />
          <stop offset=".6" stopColor="#F3DC9C" stopOpacity=".45" />
          <stop offset="1" stopColor="#F6E5B4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} />
    </>
  )
}

// Ruler ticks along the set square's long edge, pointing into the triangle.
const A = [124, 140]
const C = [202, 72]
const TICKS = [0.16, 0.28, 0.4, 0.52, 0.64, 0.76]
  .map((t, i) => {
    const x = A[0] + (C[0] - A[0]) * t
    const y = A[1] + (C[1] - A[1]) * t
    const len = i % 2 ? 6 : 10
    // unit normal of A->C, turned toward the right angle
    const nx = 0.657
    const ny = 0.754
    return `M${x.toFixed(1)} ${y.toFixed(1)}l${(nx * len).toFixed(1)} ${(ny * len).toFixed(1)}`
  })
  .join("")

export function QuantArt({ className }) {
  const id = useSvgId()
  return (
    <svg viewBox="0 0 212 152" className={className} {...hidden}>
      <Glow id={`${id}g`} cx={98} cy={58} r={50} />
      <g fill="none" stroke={INK} strokeLinecap="round" strokeLinejoin="round">
        {/* calculator */}
        <rect x="8" y="56" width="58" height="84" rx="9" fill={PAPER} strokeWidth="5" />
        <rect x="18" y="66" width="38" height="15" rx="3" fill={INK} stroke="none" />
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2].map((c) => (
            <rect key={`${r}${c}`} x={18 + c * 14} y={89 + r * 11.5} width="10" height="8" rx="1.8" fill={INK} stroke="none" />
          )),
        )}
        {/* compasses */}
        <path d="M106 6V17" strokeWidth="6" />
        <path d="M100 33 76 138M112 33 136 138" strokeWidth="9" />
        <path d="M100 33 76 138M112 33 136 138" stroke={PAPER} strokeWidth="2.6" />
        <circle cx="106" cy="26" r="9.5" fill={PAPER} strokeWidth="5" />
        <path d="M86 104Q106 96 126 104" strokeWidth="4" />
        <path d="M98 82H114M106 74V90" strokeWidth="4" />
        {/* bar chart */}
        <path d="M150 22V68H196" strokeWidth="3.5" />
        <rect x="158" y="50" width="9" height="18" rx="1.5" fill={INK} stroke="none" />
        <rect x="171" y="39" width="9" height="29" rx="1.5" fill={INK} stroke="none" />
        <rect x="184" y="26" width="9" height="42" rx="1.5" fill={INK} stroke="none" />
        {/* set square */}
        <path d={`M${A[0]} ${A[1]}H${C[0]}V${C[1]}Z`} fill={PAPER} strokeWidth="5" />
        <path d="M156 132H194V98Z" strokeWidth="3.5" />
        <path d={TICKS} strokeWidth="2.5" />
        {/* ground line */}
        <path d="M62 146H206" strokeWidth="4" />
      </g>
    </svg>
  )
}

// Letters drifting up out of the book; one picked out in gold as in the artwork.
const LETTERS = [
  { ch: "ب", x: 34, y: 66, s: 38 },
  { ch: "أ", x: 62, y: 46, s: 38 },
  { ch: "ض", x: 98, y: 30, s: 38 },
  { ch: "ص", x: 154, y: 40, s: 42 },
  { ch: "ر", x: 188, y: 64, s: 34, gold: true },
  { ch: "ف", x: 94, y: 68, s: 32 },
  { ch: "ق", x: 130, y: 66, s: 32 },
]

export function VerbalArt({ className }) {
  const id = useSvgId()
  return (
    <svg viewBox="0 0 212 152" className={className} {...hidden}>
      <Glow id={`${id}g`} cx={160} cy={52} r={30} />
      <g fontFamily='"Beiruti", "IBM Plex Sans Arabic", sans-serif' fontWeight="800" textAnchor="middle">
        {LETTERS.map((l) => (
          <text key={l.ch} x={l.x} y={l.y} fontSize={l.s} fill={l.gold ? "#C99A3F" : INK}>
            {l.ch}
          </text>
        ))}
      </g>
      <g fill="none" stroke={INK} strokeLinecap="round" strokeLinejoin="round">
        {/* pages fanned behind the open spread */}
        <path d="M106 88C90 76 64 72 34 76M106 88C122 76 148 72 178 76" strokeWidth="3" />
        <path d="M106 98C88 86 60 82 28 86M106 98C124 86 152 82 184 86" strokeWidth="3" />
        {/* the open spread */}
        <path d="M106 136C88 124 58 120 22 126V92C58 86 88 92 106 108Z" fill={PAPER} strokeWidth="5" />
        <path d="M106 136C124 124 154 120 190 126V92C154 86 124 92 106 108Z" fill={PAPER} strokeWidth="5" />
        {/* page block underneath */}
        <path d="M106 144C86 132 56 128 14 134V96M106 144C126 132 156 128 198 134V96" strokeWidth="4" />
        <path d="M106 108V136" strokeWidth="4" />
      </g>
    </svg>
  )
}
