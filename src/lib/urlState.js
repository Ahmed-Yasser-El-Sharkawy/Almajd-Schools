// Search + filter state is mirrored into the query string so a student can
// share exactly what they are looking at. Uses history.replaceState, which is
// safe on GitHub Pages because the path itself never changes.

const DEFAULTS = {
  tab: "verbal",
  q: "",
  range: "",
  fav: false,
  status: "all",
  sort: "number-asc",
}

export function readState() {
  if (typeof window === "undefined") return { ...DEFAULTS }
  const p = new URLSearchParams(window.location.search)
  const tab = p.get("tab")
  const status = p.get("status")
  const sort = p.get("sort")
  return {
    tab: tab === "general" || tab === "verbal" ? tab : DEFAULTS.tab,
    q: p.get("q") ?? DEFAULTS.q,
    range: /^\d+-\d+$/.test(p.get("range") ?? "") ? p.get("range") : DEFAULTS.range,
    fav: p.get("fav") === "1",
    status: ["all", "opened", "unopened"].includes(status) ? status : DEFAULTS.status,
    sort: ["number-asc", "number-desc", "title-asc"].includes(sort) ? sort : DEFAULTS.sort,
  }
}

export function writeState(state) {
  if (typeof window === "undefined") return
  const p = new URLSearchParams()
  if (state.tab !== DEFAULTS.tab) p.set("tab", state.tab)
  if (state.q.trim()) p.set("q", state.q.trim())
  if (state.range) p.set("range", state.range)
  if (state.fav) p.set("fav", "1")
  if (state.status !== DEFAULTS.status) p.set("status", state.status)
  if (state.sort !== DEFAULTS.sort) p.set("sort", state.sort)
  const qs = p.toString()
  const next = window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash
  window.history.replaceState(null, "", next)
}

export const DEFAULT_STATE = DEFAULTS
