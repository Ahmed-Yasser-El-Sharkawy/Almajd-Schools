import { useEffect, useRef } from "react"
import { SORTS } from "../lib/exams.js"
import { FilterIcon, CloseIcon, StarIcon } from "./icons.jsx"
import { Diamond } from "./Ornaments.jsx"

const STATUSES = [
  { key: "all", label: "الكل" },
  { key: "unopened", label: "لم أفتحه بعد" },
  { key: "opened", label: "فتحته سابقًا" },
]

/** The filter controls themselves, shared by the desktop bar and the mobile sheet. */
function Controls({ ranges, state, onChange, idPrefix }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Small collections yield a single bucket, which buildRanges drops; the
          whole fieldset goes with it rather than showing a dead control. */}
      {ranges.length > 0 && (
        <fieldset>
          <legend className="mb-2 text-xs font-bold text-gold-700">نطاق الأرقام</legend>
          <div className="flex flex-wrap gap-2">
            <Chip active={!state.range} onClick={() => onChange({ range: "" })}>الكل</Chip>
            {ranges.map((r) => (
              <Chip key={r.key} active={state.range === r.key} onClick={() => onChange({ range: state.range === r.key ? "" : r.key })}>
                <bdi dir="ltr">{r.start}–{r.end}</bdi>
                <span className="ms-1 text-[10px] opacity-70">({r.count})</span>
              </Chip>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="mb-2 text-xs font-bold text-gold-700">الحالة</legend>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <Chip key={s.key} active={state.status === s.key} onClick={() => onChange({ status: s.key })}>{s.label}</Chip>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${idPrefix}-sort`} className="text-xs font-bold text-gold-700">الترتيب</label>
        <select
          id={`${idPrefix}-sort`}
          value={state.sort}
          onChange={(e) => onChange({ sort: e.target.value })}
          className="h-11 rounded-xl border border-majd-gold/45 bg-white px-3 text-sm font-semibold text-majd-ink outline-none focus:border-majd-gold focus:ring-4 focus:ring-majd-gold/25"
        >
          {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
      </div>

      <button
        type="button"
        onClick={() => onChange({ fav: !state.fav })}
        aria-pressed={state.fav}
        className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-bold transition-colors focus-ring ${
          state.fav ? "border-majd-gold bg-majd-cream text-gold-800" : "border-majd-gold/45 bg-white text-majd-ink hover:border-majd-gold hover:bg-majd-cream/40"
        }`}
      >
        <StarIcon filled={state.fav} className="h-4 w-4" />
        المفضلة فقط
      </button>
    </div>
  )
}

function Chip({ active, children, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-colors focus-ring ${
        active ? "border-majd-ink bg-majd-ink text-white" : "border-majd-gold/45 bg-white text-majd-ink hover:border-majd-gold hover:bg-majd-cream/40"
      }`}
      {...props}
    >
      {children}
    </button>
  )
}

export default function Filters({ ranges, state, onChange, activeCount, onReset, sheetOpen, onSheetToggle }) {
  const sheetRef = useRef(null)

  useEffect(() => {
    if (!sheetOpen) return
    const onKey = (e) => e.key === "Escape" && onSheetToggle(false)
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    sheetRef.current?.focus()
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [sheetOpen, onSheetToggle])

  return (
    <>
      {/* Mobile: a single button that opens a bottom sheet. */}
      <div className="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          onClick={() => onSheetToggle(true)}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-majd-gold/45 bg-white px-4 font-display text-base font-bold text-majd-ink shadow-[0_6px_16px_-12px_rgb(10_35_82/0.4)] transition-colors hover:border-majd-gold hover:bg-majd-cream/40 focus-ring"
        >
          <FilterIcon className="h-4 w-4 text-majd-gold-dark" />
          الفلاتر
          {activeCount > 0 && (
            <span className="rounded-full bg-majd-ink px-2 py-0.5 font-sans text-[11px] text-majd-gold-light">{activeCount}</span>
          )}
        </button>
        {activeCount > 0 && (
          <button type="button" onClick={onReset} className="h-11 rounded-xl border border-majd-gold/45 bg-white px-4 text-sm font-bold text-majd-ink transition-colors hover:border-majd-gold hover:bg-majd-cream/40 focus-ring">
            مسح
          </button>
        )}
      </div>

      {/* Desktop: a persistent sidebar. */}
      <aside aria-label="فلاتر البحث" className="hidden lg:block">
        <div className="majd-tile sticky top-24 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-xl font-extrabold text-majd-ink"><Diamond className="size-2" />الفلاتر</h2>
            {activeCount > 0 && (
              <button type="button" onClick={onReset} className="rounded text-xs font-bold text-gold-700 underline-offset-2 transition-colors hover:text-majd-ink hover:underline focus-ring">
                مسح الكل
              </button>
            )}
          </div>
          <Controls ranges={ranges} state={state} onChange={onChange} idPrefix="desktop" />
        </div>
      </aside>

      {sheetOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-majd-deep/60" onClick={() => onSheetToggle(false)} aria-hidden="true" />
          <div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="فلاتر البحث"
            tabIndex={-1}
            className="absolute inset-x-0 bottom-0 max-h-[85vh] animate-sheet-in overflow-y-auto rounded-t-3xl border-t-2 border-majd-gold/60 bg-white p-5 pb-8 shadow-panel outline-none motion-reduce:animate-none"
          >
            <div aria-hidden="true" className="mx-auto -mt-1 mb-4 h-1.5 w-12 rounded-full bg-majd-gold/40" />
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-xl font-extrabold text-majd-ink"><Diamond className="size-2" />الفلاتر</h2>
              <button type="button" onClick={() => onSheetToggle(false)} aria-label="إغلاق الفلاتر" className="rounded-lg p-2 text-majd-ink transition-colors hover:bg-majd-cream/50 focus-ring">
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <Controls ranges={ranges} state={state} onChange={onChange} idPrefix="mobile" />
            <div className="mt-6 flex gap-2">
              <button type="button" onClick={onReset} className="h-12 flex-1 rounded-xl border border-majd-gold/45 text-sm font-bold text-majd-ink focus-ring">
                مسح الكل
              </button>
              <button type="button" onClick={() => onSheetToggle(false)} className="h-12 flex-[2] rounded-xl bg-majd-ink text-sm font-bold text-white shadow-[inset_0_0_0_1px_rgb(235_203_126/0.35)] focus-ring">
                عرض النتائج
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
