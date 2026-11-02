// Transparent, high-resolution logos for the light banner. The schools logo
// is cut from the client's cover artwork ("المجد غلاف.png"), which carries it
// at ~2.4x the size of almajd-schools-logo.png; the centre logo is the
// project JPG with its screenshot edges trimmed.
import schoolsLogo from "../assets/almajd-schools-logo-hd.webp"
import centerLogo from "../assets/almajd-center-logo-hd.webp"
import SearchBar from "./SearchBar.jsx"
import { COLLECTIONS } from "../lib/exams.js"
import { Seam, BottomRibbons, Rosette, DiamondMark, GradCap, BooksStack, PenCup } from "./HeroArt.jsx"
import { QuantArt, VerbalArt } from "./SubjectArt.jsx"
import { CardRule, Diamond, TitleRule } from "./Ornaments.jsx"

// Card order follows the artwork: quantitative on the right, which is first
// in RTL. Collections are grouped by their `subject`, so a collection added
// to exams.js appears in its card without touching this file.
const SUBJECTS = [
  { key: "quant", title: "القدرات الكمية", Art: QuantArt },
  { key: "verbal", title: "القدرات اللفظية", Art: VerbalArt },
].map((s) => ({ ...s, collections: COLLECTIONS.filter((c) => c.subject === s.key) }))

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
