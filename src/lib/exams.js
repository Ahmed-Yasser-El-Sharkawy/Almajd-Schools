// Data normalisation layer. Raw JSON is read here and nowhere else, so React
// components only ever see the shape defined below.
import verbalRaw from "../data/verbal-exams.json"
import generalRaw from "../data/general-exams.json"
import quantFoundationRaw from "../data/quant-foundation-exams.json"
import quantRaw from "../data/quant-exams.json"
import { buildSearchKey } from "./arabic.js"

/**
 * @typedef {Object} Exam
 * @property {string} id           stable key, e.g. "v-42"
 * @property {"verbal"|"quant-foundation"|"quant"|"general"} collection
 * @property {number} number       1-based order inside its collection
 * @property {string} title        display title
 * @property {string} [topic]      the skill a foundation model drills
 * @property {string} url          canonical form URL (never rewritten)
 * @property {string|null} shortUrl
 * @property {string} searchKey    pre-folded text used by the search
 */

const VALID_URL = /^https:\/\/(forms\.gle\/[A-Za-z0-9]+|docs\.google\.com\/forms\/d\/e\/[A-Za-z0-9_-]+\/viewform(\?[^\s]*)?)$/

/** A record is usable only if it has a title and a well-formed Google Forms URL. */
export const isUsable = (exam) => Boolean(exam.title) && VALID_URL.test(exam.url)

function prepare(raw) {
  return raw.items.map((item) => ({ ...item, searchKey: buildSearchKey(item) }))
}

const verbal = prepare(verbalRaw)
const general = prepare(generalRaw)
const quantFoundation = prepare(quantFoundationRaw)
const quant = prepare(quantRaw)

export const COLLECTIONS = [
  {
    key: "verbal",
    label: "تجميعات اللفظي",
    short: "اللفظي",
    tagline: "استيعاب المقروء والتناظر اللفظي",
    description: "تجميعات القدرات اللفظية، كل تجميعة تحتوي على 13 سؤالًا.",
    items: verbal,
    questionsPerForm: verbalRaw.questionsPerForm ?? null,
    requiresPassword: false,
  },
  {
    key: "quant-foundation",
    label: "تأسيس الكمي",
    short: "تأسيس كمي",
    tagline: "20 نموذجًا، كل نموذج لمهارة واحدة",
    description:
      "نماذج تأسيس القدرات الكمي: كل نموذج يعالج مهارة واحدة بالترتيب، من الأعداد وخصائصها حتى الهندسة والدائرة.",
    items: quantFoundation,
    questionsPerForm: null,
    requiresPassword: Boolean(quantFoundationRaw.requiresPassword),
  },
  {
    key: "quant",
    label: "نماذج الكمي",
    short: "الكمي",
    tagline: "نماذج متكاملة تحاكي الاختبار",
    description:
      "نماذج القدرات الكمي الشاملة، تجمع مهارات التأسيس كلها في اختبار متكامل يحاكي شكل اختبار القدرات.",
    items: quant,
    questionsPerForm: null,
    requiresPassword: Boolean(quantRaw.requiresPassword),
  },
  {
    key: "general",
    label: "الاختبارات العامة",
    short: "العامة",
    tagline: "الاختبارات المرقّمة السابقة",
    description: "الاختبارات المرقّمة السابقة، من الاختبار الأول حتى المائة.",
    items: general,
    questionsPerForm: null,
    requiresPassword: false,
  },
]

export const COLLECTION_KEYS = COLLECTIONS.map((c) => c.key)

export const getCollection = (key) =>
  COLLECTIONS.find((c) => c.key === key) ?? COLLECTIONS[0]

export const ALL_EXAMS = [...verbal, ...quantFoundation, ...quant, ...general]

/**
 * Count usable records per collection. The tabs and the hero must quote the
 * same figure the results grid actually renders, so both read this rather than
 * the raw `items.length`, which still counts records dropped by `isUsable`.
 * @returns {Map<string, number>}
 */
export function countByCollection(items) {
  const counts = new Map(COLLECTIONS.map((c) => [c.key, 0]))
  for (const x of items) counts.set(x.collection, (counts.get(x.collection) ?? 0) + 1)
  return counts
}

/** Buckets of 50 by exam number, used as the "نطاق الأرقام" filter. */
export function buildRanges(items, size = 50) {
  if (!items.length) return []
  const max = Math.max(...items.map((x) => x.number))
  const ranges = []
  for (let start = 1; start <= max; start += size) {
    const end = Math.min(start + size - 1, max)
    const count = items.filter((x) => x.number >= start && x.number <= end).length
    if (count > 0) ranges.push({ key: `${start}-${end}`, start, end, count })
  }
  // A lone bucket spans the whole collection, so offering it as a filter would
  // be a control that can never change the result. Hide it instead.
  return ranges.length > 1 ? ranges : []
}

export const SORTS = [
  { key: "number-asc", label: "الأقدم أولًا (1 ← الأخير)" },
  { key: "number-desc", label: "الأحدث أولًا (الأخير ← 1)" },
  { key: "title-asc", label: "أبجديًا حسب العنوان" },
]

const collator = new Intl.Collator("ar", { numeric: true, sensitivity: "base" })

/**
 * Apply query + filters to one collection.
 * @returns {Exam[]}
 */
export function selectExams(items, { tokens, range, fav, status, favorites, opened, sort }) {
  let out = items

  if (fav) out = out.filter((x) => favorites.has(x.id))
  if (status === "opened") out = out.filter((x) => opened.has(x.id))
  else if (status === "unopened") out = out.filter((x) => !opened.has(x.id))

  if (range) {
    const [start, end] = range.split("-").map(Number)
    out = out.filter((x) => x.number >= start && x.number <= end)
  }

  if (tokens.length) {
    out = out.filter((x) => tokens.every((t) => x.searchKey.includes(t)))
  }

  const sorted = [...out]
  if (sort === "number-desc") sorted.sort((a, b) => b.number - a.number)
  else if (sort === "title-asc") sorted.sort((a, b) => collator.compare(a.title, b.title))
  else sorted.sort((a, b) => a.number - b.number)

  return sorted
}
