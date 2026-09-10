// Tiny localStorage helpers. Everything stays on the student's device;
// no account, no network, no tracking.

const FAVORITES_KEY = "almajd:favorites:v1"
const OPENED_KEY = "almajd:opened:v1"
const RECENT_LIMIT = 12

function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* private mode or quota exceeded - the UI still works, it just forgets */
  }
}

export const loadFavorites = () => new Set(readJSON(FAVORITES_KEY, []))
export const saveFavorites = (set) => writeJSON(FAVORITES_KEY, [...set])

/** Opened exams, most recent first. */
export const loadOpened = () => readJSON(OPENED_KEY, [])
export function pushOpened(list, id) {
  const next = [id, ...list.filter((x) => x !== id)].slice(0, RECENT_LIMIT)
  writeJSON(OPENED_KEY, next)
  return next
}
export function clearOpened() {
  writeJSON(OPENED_KEY, [])
  return []
}
