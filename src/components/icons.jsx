// Inline icons keep the bundle free of an icon dependency.
// All are decorative: every caller supplies its own accessible label.
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, focusable: "false" }

export const SearchIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></svg>
)
export const CloseIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
)
export const StarIcon = ({ filled, ...p }) => (
  <svg viewBox="0 0 24 24" {...base} fill={filled ? "currentColor" : "none"} {...p}>
    <path d="m12 3.6 2.6 5.3 5.8.85-4.2 4.1 1 5.75L12 16.9l-5.2 2.7 1-5.75-4.2-4.1 5.8-.85z" />
  </svg>
)
export const CopyIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><rect x="9" y="9" width="11" height="11" rx="2.5" /><path d="M15 5.5A2.5 2.5 0 0 0 12.5 3h-6A3.5 3.5 0 0 0 3 6.5v6A2.5 2.5 0 0 0 5.5 15" /></svg>
)
export const CheckIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
)
// Points right-to-left, matching the reading direction of the page.
export const ArrowIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
)
export const FilterIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M4 6h16M7 12h10M10 18h4" /></svg>
)
export const ShareIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M12 15V3M8 7l4-4 4 4" /></svg>
)
export const ClockIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 2" /></svg>
)
export const MenuIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
)
