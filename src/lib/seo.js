// Everything a search engine or an AI assistant reads about the site lives
// here: page titles, descriptions and the FAQ. The app shows it, and
// scripts/prerender.mjs writes the same text into the static HTML, so the two
// can never disagree. Figures are computed from the data, never typed in.
import { COLLECTIONS } from "./exams.js"
import { countNoun, QUESTIONS } from "./arabic.js"

export const SITE_URL = "https://Ahmed-Yasser-El-Sharkawy.github.io/Almajd-Schools/"
export const SITE_NAME = "بنك المجد لنماذج القدرات"
export const ORG_NAME = "مركز المجد للقدرات والتحصيلي — مدارس المجد الأهلية"

const EXAMS = { one: "اختبار واحد", two: "اختباران", few: "اختبارات", many: "اختبارًا", hundred: "اختبار" }

const byKey = Object.fromEntries(COLLECTIONS.map((c) => [c.key, c]))
const size = (key) => byKey[key].items.length
const TOTAL = COLLECTIONS.reduce((n, c) => n + c.items.length, 0)

/** "9 و11" when a collection's per-form counts vary, "13" when they do not. */
function questionSpan(key) {
  const counts = byKey[key].items.map((x) => x.questions).filter(Number.isInteger)
  const min = Math.min(...counts)
  const max = Math.max(...counts)
  return min === max ? countNoun(min, QUESTIONS) : `بين ${min} و${countNoun(max, QUESTIONS)}`
}

// What each collection page is called in a search result. `noun` counts its
// items ("301 قسم", "48 نموذجًا"); `subject` follows the count in the title
// where the heading does not already say it; `about` is the one sentence a
// student would search for, added after the collection's own description.
const PAGES = {
  verbal: {
    heading: "أقسام اللفظي الحديثة",
    noun: { one: "قسم واحد", two: "قسمان", few: "أقسام", many: "قسمًا", hundred: "قسم" },
    subject: "قدرات لفظي",
    about: "تجميعات القدرات اللفظي الحديثة لاختبار القدرات العامة (قياس): استيعاب المقروء والتناظر اللفظي وإكمال الجمل والخطأ السياقي.",
  },
  "quant-sections": {
    heading: "أقسام الكمي الحديثة",
    noun: { one: "قسم واحد", two: "قسمان", few: "أقسام", many: "قسمًا", hundred: "قسم" },
    subject: "قدرات كمي",
    about: "تجميعات القدرات الكمي الحديثة لاختبار القدرات العامة (قياس)، مرتّبة بأسماء المسائل كما يتداولها الطلاب.",
  },
  "quant-foundation": {
    heading: "تأسيس القدرات الكمي",
    noun: { one: "نموذج واحد", two: "نموذجان", few: "نماذج", many: "نموذجًا", hundred: "نموذج" },
    subject: "",
    about: "تأسيس القدرات الكمي من الصفر لاختبار القدرات العامة (قياس): الحساب والجبر والهندسة، مهارة واحدة في كل نموذج.",
  },
  "quant-releases": {
    heading: "بنوك أسئلة القدرات الكمي",
    noun: { one: "نموذج واحد", two: "نموذجان", few: "نماذج", many: "نموذجًا", hundred: "نموذج" },
    subject: "",
    about: "بنوك أسئلة القدرات الكمي والنماذج الأكثر تكرارًا في اختبار القدرات العامة (قياس).",
  },
  general: {
    heading: "اختبارات لفظي محاكاة",
    noun: EXAMS,
    subject: "قدرات لفظي",
    about: "اختبارات قدرات لفظي تجريبية تحاكي اختبار القدرات العامة (قياس).",
  },
}

export const collectionUrl = (key) => `${SITE_URL}${key}/`

/**
 * Title, description and canonical URL for one page.
 * @param {string|null} key  a collection key, or null for the home page
 */
export function pageMeta(key) {
  const page = key ? PAGES[key] : null
  if (!page) {
    return {
      url: SITE_URL,
      title: `${SITE_NAME} | تجميعات قدرات لفظي وكمي`,
      heading: SITE_NAME,
      description: `${SITE_NAME} من مركز المجد بمدارس المجد الأهلية: ${countNoun(TOTAL, EXAMS)} إلكترونيًا للتدرب على اختبار القدرات العامة (قياس) — أقسام اللفظي والكمي الحديثة، تأسيس الكمي، بنوك الأسئلة واختبارات المحاكاة.`,
    }
  }
  const c = byKey[key]
  return {
    url: collectionUrl(key),
    title: `${page.heading} – ${[countNoun(c.items.length, page.noun), page.subject].filter(Boolean).join(" ")} | بنك المجد`,
    heading: page.heading,
    description: `${c.description} ${page.about}`,
  }
}

/** One line per collection: "301 قسم من أقسام اللفظي الحديثة". */
const inventory = () =>
  [
    `${countNoun(size("verbal"), PAGES.verbal.noun)} من أقسام اللفظي الحديثة`,
    `${countNoun(size("general"), EXAMS)} لفظي محاكاة`,
    `${countNoun(size("quant-sections"), PAGES["quant-sections"].noun)} من أقسام الكمي الحديثة`,
    `${countNoun(size("quant-foundation"), PAGES["quant-foundation"].noun)} لتأسيس الكمي`,
    `${countNoun(size("quant-releases"), PAGES["quant-releases"].noun)} في بنوك أسئلة الكمي`,
  ].join("، و")

// Shown on the page and published as FAQPage structured data. Every answer
// states only what the site itself can back up.
export const FAQ = [
  {
    q: `ما هو ${SITE_NAME}؟`,
    a: `منصة من مركز المجد للقدرات والتحصيلي في مدارس المجد الأهلية، تجمع ${countNoun(TOTAL, EXAMS)} إلكترونيًا للتدرب على اختبار القدرات العامة بقسميه اللفظي والكمي. كل اختبار نموذج Google يُفتح مباشرة من المتصفح.`,
  },
  {
    q: "ما الاختبارات المتوفرة في الموقع؟",
    a: `${inventory()}.`,
  },
  // Only published while the verbal collection carries a shortlist.
  ...(byKey.verbal.priority
    ? [
        {
          q: `ما هي أقسام اللفظي ${byKey.verbal.priority.label}؟`,
          a: `${countNoun(byKey.verbal.priority.count, PAGES.verbal.noun)} من أقسام اللفظي الحديثة مُعلَّمة في الموقع بشارة «${byKey.verbal.priority.label}»، وهي الأقسام التي تكرّر ورودها في اختبار القدرات بحسب قائمة المركز. مفتاح «${byKey.verbal.priority.label} فقط» أعلى قائمة أقسام اللفظي يعرضها وحدها، ويعمل مع البحث وبقية الفلاتر.`,
        },
      ]
    : []),
  {
    q: "ما الفرق بين القسم اللفظي والقسم الكمي في اختبار القدرات؟",
    a: "اختبار القدرات العامة يقدّمه المركز الوطني للقياس (قياس) في المملكة العربية السعودية. القسم اللفظي يقيس استيعاب المقروء وإكمال الجمل والتناظر اللفظي والخطأ السياقي، والقسم الكمي يقيس مهارات الحساب والهندسة والجبر والإحصاء.",
  },
  {
    q: "كم عدد الأسئلة في كل اختبار؟",
    a: `كل قسم من أقسام اللفظي الحديثة فيه ${countNoun(byKey.verbal.questionsPerForm, QUESTIONS)}، وأقسام الكمي الحديثة ${questionSpan("quant-sections")}، ونماذج بنوك أسئلة الكمي ${questionSpan("quant-releases")}.`,
  },
  {
    q: "هل تحتاج الاختبارات إلى تسجيل دخول أو كلمة مرور؟",
    a: "الموقع نفسه لا يحتاج إلى تسجيل دخول. بعض الاختبارات محمية بكلمة مرور تُطلب في الصفحة الأولى من النموذج مع الاسم والفصل والمجمع، ويسلّمها المعلّم داخل الفصل.",
  },
  {
    q: "كيف أجد اختبارًا معيّنًا؟",
    a: "اكتب أي كلمة من عنوان الاختبار أو رقمه في خانة البحث، أو استخدم فلاتر نطاق الأرقام والحالة والترتيب. يمكنك حفظ الاختبارات في المفضلة، ويحتفظ الموقع بآخر الاختبارات التي فتحتها على جهازك.",
  },
  {
    q: "هل يعمل الموقع على الجوال؟",
    a: "نعم، الموقع والاختبارات يعملان من متصفح الجوال أو الحاسب دون تثبيت أي تطبيق.",
  },
]
