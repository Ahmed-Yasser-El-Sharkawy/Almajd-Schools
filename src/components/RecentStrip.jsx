import { ClockIcon, ArrowIcon } from "./icons.jsx"

export default function RecentStrip({ exams, onOpen, onClear }) {
  if (!exams.length) return null
  return (
    <section aria-labelledby="recent-heading" className="majd-tile mb-6 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 id="recent-heading" className="inline-flex items-center gap-2 font-display text-lg font-extrabold text-majd-ink">
          <ClockIcon className="h-4 w-4 text-majd-gold-dark" />
          آخر ما فتحت
        </h2>
        <button type="button" onClick={onClear} className="-me-2 rounded px-2 py-2 text-xs font-bold text-gold-700 underline-offset-2 transition-colors hover:text-majd-ink hover:underline focus-ring">
          مسح السجل
        </button>
      </div>
      <ul className="flex gap-2 overflow-x-auto pb-1">
        {exams.map((exam) => (
          <li key={exam.id} className="shrink-0">
            <a
              href={exam.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onOpen(exam.id)}
              className="inline-flex min-h-11 max-w-56 items-center gap-2 rounded-xl border border-majd-gold/35 bg-majd-cream/40 px-3 py-2 text-xs font-bold text-majd-ink transition-colors hover:border-majd-gold hover:bg-majd-cream/70 focus-ring"
            >
              <span className="shrink-0 text-gold-700">#{exam.number}</span>
              <span className="truncate">{exam.title}</span>
              <ArrowIcon className="h-3.5 w-3.5 shrink-0 text-majd-gold-dark" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
