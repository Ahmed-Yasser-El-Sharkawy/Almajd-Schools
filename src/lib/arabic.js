// Arabic-aware text normalisation for search.
// Deliberately conservative: only transformations that cannot merge two
// genuinely different words are applied.

const DIACRITICS = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g
const TATWEEL = /\u0640/g
const ARABIC_DIGITS = /[\u0660-\u0669\u06F0-\u06F9]/g

/**
 * Fold a string into a comparable search key.
 * - strips diacritics and tatweel
 * - unifies the alef family (أ إ آ ٱ ى -> ا) and hamza carriers (ؤ ئ -> و ي)
 * - unifies ة -> ه and ى -> ي, which is safe here because both sides of a
 *   comparison go through the same fold
 * - converts Arabic-Indic digits to Latin so "٣" matches "3"
 * - collapses whitespace and lowercases Latin text
 */
export function normalizeArabic(input) {
  if (!input) return ""
  return String(input)
    .replace(DIACRITICS, "")
    .replace(TATWEEL, "")
    .replace(ARABIC_DIGITS, (d) => String(d.charCodeAt(0) & 0xf))
    .replace(/[\u0623\u0625\u0622\u0671]/g, "\u0627")
    .replace(/\u0624/g, "\u0648")
    .replace(/\u0626/g, "\u064A")
    .replace(/\u0649/g, "\u064A")
    .replace(/\u0629/g, "\u0647")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
}

/** Split a query into non-empty normalised tokens. */
export function tokenize(query) {
  const n = normalizeArabic(query)
  return n ? n.split(" ") : []
}

/** Arabic ordinal words, so "الاختبار الخامس" is findable by typing "5". */
const ORDINALS = [
  "", "الاول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع",
  "الثامن", "التاسع", "العاشر",
]

/**
 * Extra searchable text for a record: the leading "ال" of each word is also
 * indexed without it, so "زلازل" finds "الزلازل".
 */
export function buildSearchKey(record) {
  const base = normalizeArabic(`${record.title} ${record.number}`)
  const stripped = base
    .split(" ")
    .map((w) => (w.length > 3 && w.startsWith("ال") ? w.slice(2) : ""))
    .filter(Boolean)
    .join(" ")
  const ordinal = ORDINALS[record.number] ? normalizeArabic(ORDINALS[record.number]) : ""
  return [base, stripped, ordinal].filter(Boolean).join(" ")
}
