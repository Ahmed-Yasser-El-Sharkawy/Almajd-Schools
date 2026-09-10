import { COLLECTIONS } from "../lib/exams.js"

export default function CollectionTabs({ active, onChange }) {
  return (
    <div role="tablist" aria-label="مجموعات الاختبارات" className="flex gap-2 rounded-2xl border border-navy-100 bg-white p-1.5 shadow-card">
      {COLLECTIONS.map((c) => {
        const selected = c.key === active
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
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors focus-ring sm:flex-row sm:justify-center sm:gap-2 ${
              selected ? "bg-navy-700 text-white" : "text-navy-700 hover:bg-navy-50"
            }`}
          >
            <span>{c.label}</span>
            <span className={`rounded-full px-2 py-0.5 text-[11px] ${selected ? "bg-white/15 text-white" : "bg-navy-50 text-navy-600"}`}>
              {c.items.length}
            </span>
          </button>
        )
      })}
    </div>
  )
}
