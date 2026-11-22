// Transparent, high-resolution logos for the light banner. The schools logo
// is cut from the client's cover artwork ("المجد غلاف.png"), which carries it
// at ~2.4x the size of almajd-schools-logo.png; the centre logo is the
// project JPG with its screenshot edges trimmed.
import schoolsLogo from "../assets/almajd-schools-logo-hd.webp"
import centerLogo from "../assets/almajd-center-logo-hd.webp"
import SearchBar from "./SearchBar.jsx"
import { COLLECTIONS } from "../lib/exams.js"
import { Seam, BottomRibbons, Rosette, DiamondMark, GradCap, BooksStack, PenCup } from "./HeroArt.jsx"
import { MockArt, QuantArt, VerbalArt } from "./SubjectArt.jsx"
import { ArrowIcon, ClockIcon, ExamIcon, LayersIcon, QuestionsIcon } from "./icons.jsx"
import { countNoun, formatDuration, EXAMS, QUESTIONS, SECTIONS } from "../lib/arabic.js"
import { CardRule, Diamond, TitleRule } from "./Ornaments.jsx"

// Card order follows the artwork: quantitative on the right, which is first
// in RTL. Collections are grouped by their `subject`, so a collection added
// to exams.js appears in its card without touching this file.
const SUBJECTS = [
  { key: "quant", title: "القدرات الكمية", Art: QuantArt },
  { key: "verbal", title: "القدرات اللفظية", Art: VerbalArt },
].map((s) => ({ ...s, collections: COLLECTIONS.filter((c) => c.subject === s.key) }))

// Full mock exams are neither verbal nor quantitative but the whole test, so
// they get a banner of their own under the two cards instead of a chip in each.
const MOCKS = COLLECTIONS.filter((c) => c.subject === "mock")

/**
 * The "بنك المجد لنماذج القدرات" banner. The cream half carries the identity
 * (both logos, title, tagline); the navy half is the working part: search,
 * then one card per Qudrat section. A card opens its section; the chips
 * inside it jump straight to one collection and carry its count, which is
 * the job the old stat tiles did.
 */
export default function Hero({ query, onQueryChange, counts, active, onPickCollection, resultCount }) {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-white">
      <div className="relative">
        <CreamBackdrop />

        <div className="relative z-10 pb-16 pt-4 sm:pb-20 lg:pb-[2.6vw] lg:pt-5">
          {/* The logos sit near the page edges as in the artwork, wider than
              the text column below them. */}
          <div className="mx-auto flex max-w-[110rem] items-end justify-between gap-4 px-4 sm:px-[4vw]">
            <img
              src={schoolsLogo}
              alt="شعار مدارس المجد الأهلية"
              width="670"
              height="412"
              className="h-[4.4rem] w-auto sm:h-[clamp(5rem,15vw,15rem)]"
            />
            <img
              src={centerLogo}
              alt="شعار مركز المجد للقدرات والتحصيلي"
              width="591"
              height="355"
              className="h-[4.75rem] w-auto sm:h-[clamp(5.5rem,16.75vw,17rem)]"
            />
          </div>

          <div className="mx-auto mt-5 max-w-7xl px-4 text-center sm:mt-2 sm:px-6 lg:-mt-[1vw]">
            <h1
              id="hero-title"
              className="majd-title font-display text-[clamp(2.9rem,14.5vw,4.25rem)] font-black leading-[1.12] sm:text-[clamp(3.25rem,8.4vw,8.75rem)] sm:leading-[1.2]"
            >
              <span className="block sm:inline">بنك المجد</span>{" "}
              <span className="block sm:inline">لنماذج القدرات</span>
            </h1>

            <TitleRule />

            <p className="mt-1 font-display text-[clamp(1.5rem,6.8vw,2.1rem)] font-extrabold leading-snug text-majd-ink [word-spacing:0.08em] sm:mt-[0.5vw] sm:text-[clamp(2rem,4vw,4.25rem)]">
              مركز المجد للقدرات والتحصيلي
            </p>

            <p className="majd-pill mx-auto mt-3 w-fit max-w-full text-balance rounded-[1.75rem] px-5 py-1.5 font-display text-[clamp(1rem,4.6vw,1.2rem)] font-bold leading-relaxed text-majd-ink [word-spacing:0.06em] sm:mt-[1vw] sm:rounded-full sm:px-[3.6vw] sm:py-[0.5vw] sm:text-[clamp(1.15rem,2.4vw,2.6rem)]">
              نماذج اختبارات القدرات الكمية واللفظية في مكان واحد
            </p>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-majd-navy to-majd-deep">
        <Seam className="pointer-events-none absolute inset-x-0 bottom-[calc(100%-1px)] h-14 w-full sm:h-20 lg:h-[13.75vw]" />
        <NavyBackdrop />

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-9 pt-5 sm:px-6 lg:pb-[2.6vw] lg:pt-6 xl:max-w-[min(78vw,84rem)]">
          <div className="flex justify-center">
            <SearchBar value={query} onChange={onQueryChange} resultCount={resultCount} />
          </div>

          <ul className="mt-5 grid gap-4 md:grid-cols-2 lg:mt-6 lg:gap-[2vw]">
            {SUBJECTS.map((s) => (
              <li key={s.key} className="majd-subject">
                <SubjectCard subject={s} counts={counts} active={active} onPick={onPickCollection} />
              </li>
            ))}
          </ul>

          {MOCKS.map((c) => (
            <div key={c.key} className="majd-mock mt-4 lg:mt-[2vw]">
              <MockCard collection={c} count={counts.get(c.key) ?? 0} selected={c.key === active} onPick={onPickCollection} />
            </div>
          ))}

          <p className="mt-8 flex items-center justify-center gap-3 font-display text-[1.3rem] font-semibold text-majd-paper [word-spacing:0.08em] sm:gap-4 sm:text-[1.45rem] lg:mt-[2.4vw] lg:text-[clamp(1.45rem,2.1vw,2.3rem)]">
            <span aria-hidden="true" className="hidden h-0.5 w-20 rounded-full bg-gradient-to-r from-majd-gold-light to-transparent sm:block lg:w-[9vw]" />
            <Diamond />
            <span>تدرّب بثقة … وانطلق نحو التميز</span>
            <Diamond />
            <span aria-hidden="true" className="hidden h-0.5 w-20 rounded-full bg-gradient-to-l from-majd-gold-light to-transparent sm:block lg:w-[9vw]" />
          </p>
        </div>
      </div>
    </section>
  )
}

function SubjectCard({ subject, counts, active, onPick }) {
  const { key, title, Art, collections } = subject
  const titleId = `subject-${key}-title`
  if (!collections.length) return null

  return (
    <div className="majd-card majd-subject-card relative h-full rounded-[1.4rem] py-4 transition duration-200 hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none lg:py-[1.6vw]">
      <div className="majd-area-label flex min-w-0 flex-col items-center text-center">
        <h2 id={titleId} className="majd-subject-title whitespace-nowrap font-display font-extrabold leading-tight text-majd-ink">
          {/* Stretched over the whole card, so the card itself is the
              target; the chips sit above the overlay and stay clickable. */}
          <button
            type="button"
            onClick={() => onPick(collections[0].key)}
            className="rounded-md after:absolute after:-inset-[3px] after:rounded-[1.4rem] after:content-[''] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:after:ring-4 focus-visible:after:ring-majd-gold-light"
          >
            {title}
          </button>
        </h2>

        <CardRule />
      </div>

      <span aria-hidden="true" className="majd-area-rule h-[72%] w-px bg-gradient-to-b from-transparent via-majd-gold to-transparent" />

      <Art className="majd-area-art majd-subject-art" />

      <ul aria-labelledby={titleId} className="majd-area-chips relative z-10 flex flex-wrap justify-center gap-1.5 sm:gap-2">
        {collections.map((c) => (
          <li key={c.key}>
            <Chip collection={c} count={counts.get(c.key) ?? 0} selected={c.key === active} onPick={onPick} />
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * The comprehensive exams' banner. It shares the subject cards' cream face and
 * gold edge, and like them the whole card is the target. Every figure on it
 * is read from the collection, so it always matches the tab and the cards.
 * Layout lives in index.css (.majd-mock-card): one row when the banner is
 * wide, stacked and centred on a phone.
 */
function MockCard({ collection, count, selected, onPick }) {
  const L = collection.layout
  const titleId = `mock-${collection.key}-title`
  const facts = [
    { Icon: ExamIcon, text: countNoun(count, EXAMS) },
    { Icon: QuestionsIcon, text: `${countNoun(L.questions, QUESTIONS)} لكل اختبار` },
    { Icon: LayersIcon, text: `${countNoun(L.sections, SECTIONS)}: ${L.verbal} لفظي + ${L.quant} كمي` },
    { Icon: ClockIcon, text: formatDuration(L.minutes) },
  ]

  return (
    <section
      aria-labelledby={titleId}
      className="majd-card majd-mock-card relative rounded-[1.4rem] transition duration-200 hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none"
    >
      <MockArt className="majd-area-art majd-mock-art" />

      <span aria-hidden="true" className="majd-area-rule w-px bg-gradient-to-b from-transparent via-majd-gold to-transparent" />

      <div className="majd-area-label">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-majd-gold-pale px-3 py-1 text-xs font-bold text-gold-900 ring-1 ring-inset ring-majd-gold/60 sm:text-sm">
          <Diamond className="size-1.5" />
          محاكاة كاملة لاختبار القدرات
        </p>
        <h2 id={titleId} className="majd-mock-title mt-2 font-display font-extrabold leading-tight text-majd-ink">
          {collection.label}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-navy-600 sm:text-base">
          اللفظي والكمي معًا في اختبار واحد، بتوزيع الاختبار الحقيقي وزمنه.
        </p>
      </div>

      <ul aria-label="تفاصيل الاختبارات الشاملة" className="majd-area-stats flex flex-wrap gap-2">
        {facts.map(({ Icon, text }) => (
          <li
            key={text}
            className="inline-flex items-center gap-1.5 rounded-full border border-majd-gold/50 bg-white/85 px-3 py-1.5 text-[0.8125rem] font-bold text-majd-ink sm:text-sm"
          >
            <Icon className="h-4 w-4 shrink-0 text-majd-gold-dark" />
            <span className="tabular-nums">{text}</span>
          </li>
        ))}
      </ul>

      {/* Stretched over the whole card, like the subject cards' titles. */}
      <button
        type="button"
        onClick={() => onPick(collection.key)}
        aria-current={selected ? "true" : undefined}
        className="majd-area-cta inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-majd-ink px-6 py-3 font-display text-base font-bold text-white shadow-[inset_0_0_0_1px_rgb(235_203_126/0.55),0_10px_22px_-12px_rgb(10_35_82/0.8)] transition-colors hover:bg-majd-navy aria-[current=true]:ring-2 aria-[current=true]:ring-majd-gold-light after:absolute after:-inset-[3px] after:rounded-[1.4rem] after:content-[''] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:after:ring-4 focus-visible:after:ring-majd-gold-light sm:text-lg"
      >
        ابدأ الاختبارات الشاملة
        <ArrowIcon className="h-5 w-5 text-majd-gold-light" />
      </button>
    </section>
  )
}

function Chip({ collection, count, selected, onPick }) {
  return (
    <button
      type="button"
      onClick={() => onPick(collection.key)}
      aria-current={selected ? "true" : undefined}
      className={`majd-chip inline-flex min-h-11 items-center gap-[0.4em] rounded-full border px-[0.75em] font-bold transition-colors duration-200 focus-ring motion-reduce:transition-none ${
        selected
          ? // The transparent outline is invisible normally but is drawn in
            // Windows high-contrast mode, where the navy fill is dropped.
            "border-majd-ink bg-majd-ink text-white outline outline-2 outline-offset-2 outline-transparent"
          : "border-majd-gold/60 bg-white/80 text-majd-ink hover:border-majd-gold hover:bg-white"
      }`}
    >
      <span>{collection.chip}</span>
      <span
        className={`rounded-full px-[0.45em] text-[0.85em] leading-[1.6] tabular-nums ${
          selected ? "bg-white/15 text-majd-gold-light" : "bg-majd-ink/[0.07] text-majd-ink"
        }`}
      >
        {count}
      </span>
    </button>
  )
}

// ---- Backdrops ------------------------------------------------------------

function CreamBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_85%,#FDF2D3_0%,rgb(253_242_211/0.45)_45%,transparent_75%)]" />
      {/* faint arcs sweeping in from the top corners */}
      <svg viewBox="0 0 100 100" className="absolute -left-[26vw] -top-[44vw] w-[62vw] text-majd-gold/20">
        <circle cx="50" cy="50" r="49.6" fill="none" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg viewBox="0 0 100 100" className="absolute -right-[34vw] -top-[50vw] w-[70vw] text-majd-gold/20">
        <circle cx="50" cy="50" r="49.6" fill="none" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </svg>

      <Rosette className="absolute -left-14 top-[42%] w-36 text-majd-gold/25 sm:hidden" />
      <Rosette className="absolute bottom-[4.5vw] left-[7.5vw] hidden w-[9vw] text-majd-gold/40 lg:block" />
      <Rosette className="absolute -right-[4vw] top-[15vw] hidden w-[15vw] text-majd-gold/30 sm:block" />

      <div className="majd-dots absolute left-[1.4vw] top-[20vw] hidden h-[4.6rem] w-[9.4rem] text-majd-gold/45 lg:block" />
      <div className="majd-dots absolute bottom-[4vw] right-[17vw] hidden h-[2.9rem] w-[5.6rem] text-majd-gold/45 lg:block" />

      <GradCap className="absolute bottom-[0.6vw] right-[4vw] hidden w-[14.5vw] lg:block" />
    </div>
  )
}

function NavyBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_12%_0%,rgb(41_84_158/0.35),transparent_70%),radial-gradient(ellipse_45%_60%_at_92%_100%,rgb(41_84_158/0.25),transparent_70%)]" />

      <Rosette className="absolute -left-[3vw] -top-[5.5vw] hidden w-[12vw] text-majd-line/70 md:block" />
      <Rosette className="absolute right-[6.5vw] top-[0.5vw] hidden w-[8vw] text-majd-line/70 lg:block" />
      <DiamondMark className="absolute -top-[3.2vw] right-[1.2vw] hidden w-[4.6vw] text-majd-gold/80 lg:block" />
      <div className="majd-dots absolute left-[13vw] top-[9vw] hidden h-[2.9rem] w-[4.6rem] text-majd-gold/35 xl:block" />

      <BottomRibbons className="absolute inset-x-0 bottom-0 h-12 w-full sm:h-16 lg:h-[9vw]" />
      <BooksStack className="absolute -left-[1.5vw] bottom-[0.6vw] hidden w-[11.5vw] min-[1360px]:block" />
      <PenCup className="absolute -right-[1vw] -bottom-[0.8vw] hidden w-[11vw] min-[1360px]:block" />
    </div>
  )
}
