// Per-collection visual identity: one glyph each, so the groups stay
// distinguishable at a glance. Colour no longer varies per collection: the
// site follows the banner identity (navy and gold), so every tab glyph is
// gold and every card badge is cream on navy text. The selected tab stays
// brand navy in every collection, so moving between them never repaints the
// page's main control.
// Tailwind's JIT only sees literal strings, so every class is written out in
// full here rather than composed at runtime.
import { TextIcon, ChartIcon, BlocksIcon, LayersIcon, GridIcon } from "../components/icons.jsx"

const TAB_ICON = "text-majd-gold-dark"
const BADGE = "bg-majd-cream/70 text-majd-ink ring-1 ring-inset ring-majd-gold/30"

const THEMES = {
  verbal: { Icon: TextIcon, tabIcon: TAB_ICON, badge: BADGE },
  "quant-sections": { Icon: ChartIcon, tabIcon: TAB_ICON, badge: BADGE },
  "quant-foundation": { Icon: BlocksIcon, tabIcon: TAB_ICON, badge: BADGE },
  "quant-releases": { Icon: LayersIcon, tabIcon: TAB_ICON, badge: BADGE },
  general: { Icon: GridIcon, tabIcon: TAB_ICON, badge: BADGE },
}

export const getTheme = (key) => THEMES[key] ?? THEMES.verbal
