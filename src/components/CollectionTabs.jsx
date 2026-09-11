import { COLLECTIONS } from "../lib/exams.js"
import { getTheme } from "../lib/collectionTheme.jsx"
import { LockIcon } from "./icons.jsx"

/**
 * Four collections do not fit one phone-width row, so the strip is a 2x2 grid
 * on small screens and a single row from `sm` up. Nothing scrolls sideways and
 * every tab keeps a 44px touch target.
 */
export default function CollectionTabs({ active, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="مجموعات الاختبارات"
      className="grid grid-cols-2 gap-1.5 rounded-2xl border border-navy-100 bg-white p-1.5 shadow-card sm:grid-cols-4"
    >
      {COLLECTIONS.map((c) => {
        const selected = c.key === active
        const theme = getTheme(c.key)
        const { Icon } = theme
        return (
          <button
            key={c.key}
            role="tab"
            id={`tab-${c.key}`}
            aria-selected={selected}
            aria-controls="exam-results"
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(c.key)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
              e.preventDefault()
              const i = COLLECTIONS.findIndex((x) => x.key === active)
              // RTL: ArrowLeft moves forward through the list.
              const step = e.key === "ArrowLeft" ? 1 : -1
              const next = COLLECTIONS[(i + step + COLLECTIONS.length) % COLLECTIONS.length]
              onChange(next.key)
              document.getElementById(`tab-${next.key}`)?.focus()
            }}
            className={`group flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-center transition-all duration-200 focus-ring motion-reduce:transition-none ${
              selected ? "bg-navy-700 text-white shadow-card" : "text-navy-700 hover:bg-navy-50"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Icon className={`h-4 w-4 shrink-0 ${selected ? "text-white/80" : theme.tabIcon}`} />
              <span className="text-[13px] font-bold leading-tight sm:text-sm">{c.label}</span>
              {c.requiresPassword && (
                <LockIcon
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 shrink-0 ${selected ? "text-white/70" : "text-navy-300"}`}
                />
              )}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums ${
                selected ? "bg-white/15 text-white" : "bg-navy-50 text-navy-600"
              }`}
            >
              {c.items.length}
            </span>
          </button>
        )
      })}
    </div>
  )
}
