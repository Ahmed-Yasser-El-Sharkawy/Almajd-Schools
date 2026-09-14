import { COLLECTIONS } from "../lib/exams.js"
import { getTheme } from "../lib/collectionTheme.jsx"
import { LockIcon } from "./icons.jsx"

/**
 * Five collections never fit one phone-width row. The strip wraps instead of
 * scrolling: two tabs per row on phones, three on tablets, all five from `lg`.
 * It is flex rather than grid on purpose - `grow` lets a leftover tab stretch
 * across its row, where a grid would leave an empty cell beside it. Every tab
 * keeps a 44px touch target.
 *
 * Counts deliberately live only in the hero dashboard: repeating all four of
 * them here put the same numbers on screen twice, a few pixels apart.
 */
export default function CollectionTabs({ active, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="مجموعات الاختبارات"
      className="flex flex-wrap gap-1.5 rounded-2xl border border-navy-100 bg-white p-1.5 shadow-card"
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
            className={`group flex min-h-11 grow basis-[calc(50%_-_0.1875rem)] items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-center sm:basis-[calc(33.333%_-_0.25rem)] lg:basis-0 transition-all duration-200 focus-ring motion-reduce:transition-none ${
              selected ? "bg-navy-700 text-white shadow-card" : "text-navy-700 hover:bg-navy-50"
            }`}
          >
            <Icon className={`h-4 w-4 shrink-0 ${selected ? "text-white/80" : theme.tabIcon}`} />
            <span className="text-[13px] font-bold leading-tight sm:text-sm">{c.label}</span>
            {c.requiresPassword && (
              <LockIcon
                aria-hidden="true"
                className={`h-3.5 w-3.5 shrink-0 ${selected ? "text-white/70" : "text-navy-300"}`}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
