import logo from "../assets/almajd-center-logo.jpg"
import SearchBar from "./SearchBar.jsx"
import { COLLECTIONS } from "../lib/exams.js"
import { getTheme } from "../lib/collectionTheme.jsx"
import { LockIcon } from "./icons.jsx"

/**
 * The stat rail doubles as navigation: every collection tile jumps straight to
 * its tab. A tile that only reports a number would waste the most prominent
 * row on the page, and a student landing here wants to get into a collection,
 * not read a figure.
 */
export default function Hero({ query, onQueryChange, total, counts, active, onPickCollection, resultCount }) {
  return (
    <section id="top" className="relative overflow-hidden border-b border-navy-100 bg-navy-900">
      {/* Decorative wash; purely presentational so it is hidden from the a11y tree. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-navy-700/50 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-7 sm:pb-14 sm:pt-14">
        <div className="flex flex-col items-center gap-5 text-center sm:gap-6">
          <span className="rounded-2xl bg-white p-2.5 shadow-panel sm:p-3">
            <img src={logo} alt="شعار مركز المجد للقدرات والتحصيلي" width="696" height="457" className="h-12 w-auto sm:h-20" />
          </span>

          <div className="max-w-2xl">
            <h1 className="text-2xl font-extrabold leading-tight text-white sm:text-4xl">
              كل اختباراتك في <span className="text-gold-400">مكان واحد</span>
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-navy-200 sm:text-base">
              لفظي وكمي وتأسيس في منصة واحدة. ابحث بالاسم أو بالرقم واضغط لفتح
              الاختبار مباشرة، بلا تسجيل دخول.
            </p>
          </div>

          <SearchBar value={query} onChange={onQueryChange} resultCount={resultCount} />

          <section
            aria-label="نظرة عامة على المجموعات"
            className="mt-1 w-full max-w-3xl rounded-2xl border border-navy-700/70 bg-navy-800/40 p-2.5 sm:p-3"
          >
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch">
              <p className="flex items-center justify-between gap-3 rounded-xl bg-navy-950/50 px-4 py-3 text-start sm:w-40 sm:flex-col sm:items-start sm:justify-center sm:gap-0.5">
                <span className="text-[11px] font-bold text-navy-300 sm:text-xs">إجمالي الاختبارات</span>
                <span className="text-2xl font-extrabold leading-none text-gold-400 tabular-nums sm:text-4xl">
                  {total}
                </span>
              </p>

              <ul className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
                {COLLECTIONS.map((c) => {
                  const theme = getTheme(c.key)
                  const { Icon } = theme
                  const selected = c.key === active
                  return (
                    <li key={c.key}>
                      <button
                        type="button"
                        onClick={() => onPickCollection(c.key)}
                        aria-current={selected ? "true" : undefined}
                        className={`flex h-full w-full flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2.5 transition-colors duration-200 focus-ring motion-reduce:transition-none ${
                          selected
                            ? "border-gold-500/70 bg-navy-700"
                            : "border-navy-700 bg-navy-900/40 hover:border-navy-500 hover:bg-navy-800"
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          <Icon aria-hidden="true" className={`h-3.5 w-3.5 ${theme.heroIcon}`} />
                          {c.requiresPassword && (
                            <LockIcon aria-hidden="true" className="h-3 w-3 text-navy-400" />
                          )}
                        </span>
                        <span className="text-lg font-extrabold leading-none text-white tabular-nums sm:text-xl">
                          {counts.get(c.key) ?? 0}
                        </span>
                        <span className="text-[11px] font-semibold leading-tight text-navy-200">
                          {c.label}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
