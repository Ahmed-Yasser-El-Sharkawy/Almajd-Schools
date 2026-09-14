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
  "الثامن", "التاسع", "العاشر", "الحادي عشر", "الثاني عشر", "الثالث عشر",
  "الرابع عشر", "الخامس عشر", "السادس عشر", "السابع عشر", "الثامن عشر",
  "التاسع عشر", "العشرون",
]

/**
 * Extra searchable text for a record: the leading "ال" of each word is also
 * indexed without it, so "زلازل" finds "الزلازل". The foundation models carry a
 * topic too, which is what a student actually searches for ("الكسور").
 */
export function buildSearchKey(record) {
  const base = normalizeArabic(`${record.title} ${record.topic ?? ""} ${record.number}`)
  const stripped = base
    .split(" ")
    .map((w) => (w.length > 3 && w.startsWith("ال") ? w.slice(2) : ""))
    .filter(Boolean)
    .join(" ")
  const ordinal = ORDINALS[record.number] ? normalizeArabic(ORDINALS[record.number]) : ""
  return [base, stripped, ordinal].filter(Boolean).join(" ")
}

/**
 * Attach a number to an Arabic counted noun with the right agreement:
 * 1 → "سؤال واحد", 2 → "سؤالان", 3–10 → "3 أسئلة", 11+ → "48 سؤالًا".
 * Hundreds reset the rule ("100 سؤال"), which is why the last two digits decide.
 * @param {number} n
 * @param {{one: string, two: string, few: string, many: string, hundred?: string}} forms
 */
export function countNoun(n, forms) {
  if (n === 1) return forms.one
  if (n === 2) return forms.two
  const tail = n % 100
  if (tail >= 3 && tail <= 10) return `${n} ${forms.few}`
  if (tail === 0 || tail === 1 || tail === 2) return `${n} ${forms.hundred ?? forms.many}`
  return `${n} ${forms.many}`
}

export const QUESTIONS = { one: "سؤال واحد", two: "سؤالان", few: "أسئلة", many: "سؤالًا", hundred: "سؤال" }
export const RELEASES = { one: "إصدار واحد", two: "إصداران", few: "إصدارات", many: "إصدارًا", hundred: "إصدار" }
