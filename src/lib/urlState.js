// Search + filter state is mirrored into the URL so a student can share
// exactly what they are looking at. Each collection has its own path
// (/quant-sections/), which scripts/prerender.mjs backs with a real HTML
// file, so GitHub Pages serves every one of them without a rewrite rule and
// a search engine can index each as its own page. Everything else stays in
// the query string. history.replaceState keeps the back button out of it.
import { COLLECTION_KEYS, getCollection } from "./exams.js"

const BASE = import.meta.env.BASE_URL

const DEFAULTS = {
  tab: "verbal",
  q: "",
  range: "",
  fav: false,
  // "الأكثر تكرارًا فقط": ?top=1. Only meaningful in a collection that has a
  // shortlist; everywhere else it is dropped on read.
  priority: false,
  status: "all",
  sort: "number-asc",
}

/** The collection named by the current path, or null on the home page. */
export function tabFromPath() {
  if (typeof window === "undefined") return null
  const { pathname } = window.location
  if (!pathname.startsWith(BASE)) return null
  const slug = pathname.slice(BASE.length).replace(/index\.html$/, "").replace(/\/+$/, "")
  return COLLECTION_KEYS.includes(slug) ? slug : null
}

export function readState() {
  if (typeof window === "undefined") return { ...DEFAULTS }
  const p = new URLSearchParams(window.location.search)
  // ?tab= is how links were shared before collections had paths; it still
  // wins so those links keep opening the collection they were copied from.
  const tab = p.get("tab")
  const status = p.get("status")
  const sort = p.get("sort")
  const activeTab = COLLECTION_KEYS.includes(tab) ? tab : (tabFromPath() ?? DEFAULTS.tab)
  return {
    tab: activeTab,
    q: p.get("q") ?? DEFAULTS.q,
    range: /^\d+-\d+$/.test(p.get("range") ?? "") ? p.get("range") : DEFAULTS.range,
    fav: p.get("fav") === "1",
    priority: p.get("top") === "1" && Boolean(getCollection(activeTab).priority),
    status: ["all", "opened", "unopened"].includes(status) ? status : DEFAULTS.status,
    sort: ["number-asc", "number-desc", "title-asc"].includes(sort) ? sort : DEFAULTS.sort,
  }
}

/**
 * True while the home page is showing its default collection: the one case
 * where the URL stays at the site root instead of moving to a collection path.
 */
export const isHome = (tab) => tab === DEFAULTS.tab && tabFromPath() === null

export function writeState(state) {
  if (typeof window === "undefined") return
  const p = new URLSearchParams()
  if (state.q.trim()) p.set("q", state.q.trim())
  if (state.range) p.set("range", state.range)
  if (state.fav) p.set("fav", "1")
  if (state.priority) p.set("top", "1")
  if (state.status !== DEFAULTS.status) p.set("status", state.status)
  if (state.sort !== DEFAULTS.sort) p.set("sort", state.sort)
  const qs = p.toString()
  const path = isHome(state.tab) ? BASE : `${BASE}${state.tab}/`
  const next = path + (qs ? `?${qs}` : "") + window.location.hash
  window.history.replaceState(null, "", next)
}

export const DEFAULT_STATE = DEFAULTS
