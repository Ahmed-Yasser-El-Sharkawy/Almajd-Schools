import { useCallback, useEffect, useMemo, useState } from "react"
import Header from "./components/Header.jsx"
import Hero from "./components/Hero.jsx"
import CollectionTabs from "./components/CollectionTabs.jsx"
import Filters from "./components/Filters.jsx"
import ExamCard from "./components/ExamCard.jsx"
import EmptyState from "./components/EmptyState.jsx"
import RecentStrip from "./components/RecentStrip.jsx"
import ShareButton from "./components/ShareButton.jsx"
import Footer from "./components/Footer.jsx"
import { ALL_EXAMS, COLLECTIONS, buildRanges, getCollection, isUsable, selectExams } from "./lib/exams.js"
import { tokenize } from "./lib/arabic.js"
import { loadFavorites, saveFavorites, loadOpened, pushOpened, clearOpened } from "./lib/storage.js"
import { readState, writeState, DEFAULT_STATE } from "./lib/urlState.js"

const PAGE_SIZE = 48

// Records that fail validation are dropped from the UI rather than rendered
// as a broken link; the count is surfaced below the results so nothing is
// silently swallowed.
const USABLE = ALL_EXAMS.filter(isUsable)
const UNUSABLE_COUNT = ALL_EXAMS.length - USABLE.length
const BY_ID = new Map(USABLE.map((x) => [x.id, x]))

export default function App() {
  const [state, setState] = useState(readState)
  const [favorites, setFavorites] = useState(loadFavorites)
  const [opened, setOpened] = useState(loadOpened)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [visible, setVisible] = useState(PAGE_SIZE)

  const patch = useCallback((changes) => setState((s) => ({ ...s, ...changes })), [])

  useEffect(() => { writeState(state) }, [state])
  useEffect(() => { setVisible(PAGE_SIZE) }, [state.tab, state.q, state.range, state.fav, state.status, state.sort])

  const collection = getCollection(state.tab)
  const openedSet = useMemo(() => new Set(opened), [opened])
  const tokens = useMemo(() => tokenize(state.q), [state.q])

  const pool = useMemo(
    () => USABLE.filter((x) => x.collection === collection.key),
    [collection.key],
  )
  const ranges = useMemo(() => buildRanges(pool), [pool])

  const results = useMemo(
    () => selectExams(pool, { ...state, tokens, favorites, opened: openedSet }),
    [pool, state, tokens, favorites, openedSet],
  )

  const recent = useMemo(
    () => opened.map((id) => BY_ID.get(id)).filter(Boolean).slice(0, 10),
    [opened],
  )

  const activeFilterCount =
    (state.range ? 1 : 0) + (state.fav ? 1 : 0) + (state.status !== "all" ? 1 : 0) + (state.sort !== DEFAULT_STATE.sort ? 1 : 0)
  const hasAnyFilter = activeFilterCount > 0 || Boolean(state.q.trim())

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      saveFavorites(next)
      return next
    })
  }, [])

  const markOpened = useCallback((id) => setOpened((prev) => pushOpened(prev, id)), [])

  const resetAll = useCallback(() => {
    setState((s) => ({ ...DEFAULT_STATE, tab: s.tab }))
    setSheetOpen(false)
  }, [])

  const stats = useMemo(() => {
    const verbal = COLLECTIONS[0]
    return [
      { label: "إجمالي الاختبارات", value: USABLE.length },
      { label: "تجميعات اللفظي", value: verbal.items.length },
      { label: "سؤالًا لكل تجميعة", value: verbal.questionsPerForm ?? "—" },
    ]
  }, [])

  return (
    <div className="min-h-screen bg-navy-50/40">
      <a href="#exams" className="sr-only focus:not-sr-only focus:absolute focus:end-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-navy-800 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white">
        تخطَّ إلى قائمة الاختبارات
      </a>

      <Header />
      <Hero
        query={state.q}
        onQueryChange={(q) => patch({ q })}
        stats={stats}
        resultCount={results.length}
      />

      <main id="exams" className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <RecentStrip
          exams={recent}
          onOpen={markOpened}
          onClear={() => setOpened(clearOpened())}
        />

        <CollectionTabs active={state.tab} onChange={(tab) => patch({ tab })} />
        <p className="mt-3 text-sm leading-relaxed text-navy-500">{collection.description}</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <Filters
            ranges={ranges}
            state={state}
            onChange={patch}
            activeCount={activeFilterCount}
            onReset={resetAll}
            sheetOpen={sheetOpen}
            onSheetToggle={setSheetOpen}
          />

          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 aria-live="polite" className="text-base font-extrabold text-navy-900">
                {results.length === 0
                  ? "لا توجد نتائج"
                  : `${results.length} من ${pool.length} اختبارًا`}
              </h2>
              <ShareButton disabled={!hasAnyFilter} />
            </div>

            <div
              id="exam-results"
              role="tabpanel"
              aria-labelledby={`tab-${collection.key}`}
              tabIndex={-1}
              className="outline-none"
            >
              {results.length === 0 ? (
                <EmptyState hasFilters={hasAnyFilter} onReset={resetAll} />
              ) : (
                <>
                  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {results.slice(0, visible).map((exam) => (
                      <li key={exam.id} className="h-full animate-fade-up motion-reduce:animate-none">
                        <ExamCard
                          exam={exam}
                          badge={collection.short}
                          isFavorite={favorites.has(exam.id)}
                          isOpened={openedSet.has(exam.id)}
                          onToggleFavorite={toggleFavorite}
                          onOpen={markOpened}
                        />
                      </li>
                    ))}
                  </ul>

                  {visible < results.length && (
                    <div className="mt-8 flex flex-col items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setVisible((v) => v + PAGE_SIZE)}
                        className="rounded-xl border border-navy-200 bg-white px-6 py-3 text-sm font-bold text-navy-800 transition-colors hover:bg-navy-50 focus-ring"
                      >
                        عرض المزيد
                      </button>
                      <p className="text-xs text-navy-500">
                        يُعرض {visible} من {results.length}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {UNUSABLE_COUNT > 0 && (
              <p role="status" className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                {UNUSABLE_COUNT} سجلًا يحتوي على رابط غير صالح ولم يُعرض. يُرجى مراجعة ملف البيانات.
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
