// Data normalisation layer. Raw JSON is read here and nowhere else, so React
// components only ever see the shape defined below.
import verbalRaw from "../data/verbal-exams.json"
import generalRaw from "../data/general-exams.json"
import quantFoundationRaw from "../data/quant-foundation-exams.json"
import quantReleasesRaw from "../data/quant-releases-exams.json"
import quantSectionsRaw from "../data/quant-sections-exams.json"
import comprehensiveRaw from "../data/comprehensive-exams.json"
import verbalPriorityRaw from "../data/verbal-priority.json"
import { buildSearchKey, countNoun, formatDuration, QUESTIONS, MODELS, SECTIONS, EXAMS } from "./arabic.js"

/**
 * @typedef {Object} Exam
 * @property {string} id           stable key, e.g. "v-42"
 * @property {"verbal"|"quant-sections"|"quant-foundation"|"quant-releases"|"general"|"comprehensive"} collection
 * @property {number} number       1-based order inside its collection
 * @property {string} title        display title
 * @property {string} [topic]      the skill a foundation model drills
 * @property {number} [questions]  question count, when it varies per form
 * @property {number} [minutes]    time allowed, for a full mock exam
 * @property {boolean} [priority]  on the "الأكثر تكرارًا" shortlist of its collection
 * @property {string} url          canonical form URL (never rewritten)
 * @property {string|null} shortUrl
 * @property {string} searchKey    pre-folded text used by the search
 */

const VALID_URL = /^https:\/\/(forms\.gle\/[A-Za-z0-9]+|docs\.google\.com\/forms\/d\/e\/[A-Za-z0-9_-]+\/viewform(\?[^\s]*)?)$/

/** A record is usable only if it has a title and a well-formed Google Forms URL. */
export const isUsable = (exam) => Boolean(exam.title) && VALID_URL.test(exam.url)

// The shortlist of sections that recur most in the real exam is the trainer's
// editorial judgement, revised on its own schedule, so it lives in its own
// hand-edited file (verbal-priority.json) rather than in verbal-exams.json,
// which build-data regenerates wholesale. A number on the list with no
// published form behind it is simply never matched; validate-data reports it.
function prepare(raw, shortlist) {
  const listed = new Set(shortlist?.sections ?? [])
  return raw.items.map((item) => ({
    ...item,
    ...(listed.has(item.number) ? { priority: true } : {}),
    searchKey: buildSearchKey(item),
  }))
}

/** What a collection says about its shortlist, or null when it has none. */
function shortlistMeta(items, shortlist) {
  const count = items.filter((x) => x.priority).length
  if (!count) return null
  return { label: shortlist.label || "الأكثر تكرارًا", updated: shortlist.updated ?? null, count }
}

const verbal = prepare(verbalRaw, verbalPriorityRaw)
const verbalPriority = shortlistMeta(verbal, verbalPriorityRaw)
const general = prepare(generalRaw)
const quantFoundation = prepare(quantFoundationRaw)
const quantReleases = prepare(quantReleasesRaw)
const quantSections = prepare(quantSectionsRaw)
const comprehensive = prepare(comprehensiveRaw)
// The shape every comprehensive exam follows, as declared by its data file.
const comprehensiveLayout = {
  ...comprehensiveRaw.layout,
  questions: comprehensiveRaw.layout.sections * (comprehensiveRaw.layout.verbal + comprehensiveRaw.layout.quant),
}

// `subject` is the Qudrat section a collection trains for; the hero groups
// its two cards by it. A full mock exam is neither: its `subject` is "mock",
// and the hero gives it a banner of its own under the two cards. `chip` is the name inside that card, where the
// subject is already printed above it, so "تأسيس الكمي" shortens to "التأسيس".
export const COLLECTIONS = [
  {
    key: "verbal",
    subject: "verbal",
    chip: "الأقسام الحديثة",
    label: "أقسام اللفظي الحديثة",
    // Two collections are verbal now, so "اللفظي" alone no longer identifies a
    // card. Every short follows the same {type} {subject} shape.
    short: "أقسام لفظي",
    tagline: "استيعاب المقروء والتناظر اللفظي",
    // The shortlist figure is counted from the data, so the sentence, the
    // switch above the grid and the badges on the cards always agree.
    description: `أقسام القدرات اللفظية الحديثة: ${countNoun(verbal.length, SECTIONS)} تضم ${countNoun(
      verbalRaw.totalQuestions,
      QUESTIONS,
    )}، أغلبها ${countNoun(verbalRaw.questionsPerForm, QUESTIONS)} في القسم${
      verbalPriority ? `، منها ${countNoun(verbalPriority.count, SECTIONS)} هي ${verbalPriority.label} في الاختبار` : ""
    }.`,
    items: verbal,
    priority: verbalPriority,
    questionsPerForm: verbalRaw.questionsPerForm ?? null,
    requiresPassword: false,
  },
  {
    key: "quant-sections",
    subject: "quant",
    chip: "الأقسام الحديثة",
    label: "أقسام الكمي الحديثة",
    short: "أقسام كمي",
    tagline: "أقسام قصيرة، كل قسم حول فكرة واحدة",
    description: `أقسام القدرات الكمي الحديثة: ${countNoun(quantSections.length, SECTIONS)} تضم ${countNoun(
      quantSectionsRaw.totalQuestions,
      QUESTIONS,
    )}، كل قسم يحمل اسم المسألة التي يدور حولها.`,
    items: quantSections,
    questionsPerForm: null,
    requiresPassword: Boolean(quantSectionsRaw.requiresPassword),
  },
  {
    key: "quant-foundation",
    subject: "quant",
    chip: "التأسيس",
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
    key: "quant-releases",
    subject: "quant",
    chip: "بنوك أسئلة الكمي",
    label: "بنوك أسئلة الكمي",
    short: "بنوك أسئلة كمي",
    tagline: "النماذج الأكثر تكرارًا في الاختبار",
    // Figures come from the data so the sentence cannot drift from the cards.
    description: `بنوك أسئلة القدرات الكمي، النماذج الأكثر تكرارًا في الاختبار: ${countNoun(quantReleases.length, MODELS)} تضم ${countNoun(
      quantReleasesRaw.totalQuestions,
      QUESTIONS,
    )}، كل سؤال صورة يليها اختيار من أ / ب / ج / د.`,
    items: quantReleases,
    questionsPerForm: null,
    requiresPassword: Boolean(quantReleasesRaw.requiresPassword),
  },
  {
    // The key stays "general": it is what ?tab=general in already-shared links
    // and the sitemap point at. Only the wording changed.
    key: "general",
    subject: "verbal",
    chip: "اختبارات المحاكاة",
    label: "اختبارات لفظي محاكاة",
    short: "محاكاة لفظي",
    tagline: "محاكاة لشكل اختبار اللفظي",
    description: "اختبارات لفظي تحاكي شكل اختبار القدرات، مرقّمة من الاختبار الأول حتى المائة.",
    items: general,
    questionsPerForm: null,
    requiresPassword: false,
  },
  {
    // The whole test in one sitting: five sections, each a verbal section
    // followed by a quantitative one, under the real test's time limit.
    key: "comprehensive",
    subject: "mock",
    chip: "الاختبارات الشاملة",
    label: "الاختبارات الشاملة",
    short: "شامل لفظي وكمي",
    tagline: "الاختبار كاملًا: لفظي وكمي معًا",
    // Every figure is read from the data, so the sentence cannot drift.
    description: `اختبارات شاملة تحاكي اختبار القدرات العامة كاملًا: ${countNoun(comprehensive.length, EXAMS)}، كل اختبار ${countNoun(
      comprehensiveLayout.questions,
      QUESTIONS,
    )} في ${countNoun(comprehensiveLayout.sections, SECTIONS)}، وفي كل قسم ${countNoun(comprehensiveLayout.verbal, QUESTIONS)} لفظيًا و${countNoun(
      comprehensiveLayout.quant,
      QUESTIONS,
    )} كميًا، وزمن الاختبار ${formatDuration(comprehensiveLayout.minutes)}.`,
    items: comprehensive,
    layout: comprehensiveLayout,
    questionsPerForm: null,
    requiresPassword: Boolean(comprehensiveRaw.requiresPassword),
  },
]

export const COLLECTION_KEYS = COLLECTIONS.map((c) => c.key)

export const getCollection = (key) =>
  COLLECTIONS.find((c) => c.key === key) ?? COLLECTIONS[0]

export const ALL_EXAMS = [...verbal, ...quantSections, ...quantFoundation, ...quantReleases, ...general, ...comprehensive]

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
export function selectExams(items, { tokens, range, fav, priority, status, favorites, opened, sort }) {
  let out = items

  if (priority) out = out.filter((x) => x.priority)
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
