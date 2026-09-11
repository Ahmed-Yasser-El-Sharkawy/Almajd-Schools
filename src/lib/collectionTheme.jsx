// Per-collection visual identity: one glyph and one accent each, so the four
// groups stay distinguishable without turning the page into a colour chart.
// The accent is deliberately secondary - it tints the tab glyph and the card
// badge only. The selected tab stays brand navy in every collection, so moving
// between them never repaints the page's main control.
// Tailwind's JIT only sees literal strings, so every class is written out in
// full here rather than composed from a colour name at runtime.
import { TextIcon, BlocksIcon, SigmaIcon, GridIcon } from "../components/icons.jsx"

const THEMES = {
  verbal: {
    Icon: TextIcon,
    tabIcon: "text-navy-500",
    badge: "bg-navy-50 text-navy-700",
  },
  "quant-foundation": {
    Icon: BlocksIcon,
    tabIcon: "text-teal-600",
    badge: "bg-teal-50 text-teal-800",
  },
  quant: {
    Icon: SigmaIcon,
    tabIcon: "text-violet-600",
    badge: "bg-violet-50 text-violet-800",
  },
  general: {
    Icon: GridIcon,
    tabIcon: "text-slate-500",
    badge: "bg-slate-100 text-slate-700",
  },
}

export const getTheme = (key) => THEMES[key] ?? THEMES.verbal
