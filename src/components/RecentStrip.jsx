import { ClockIcon, ArrowIcon } from "./icons.jsx"

export default function RecentStrip({ exams, onOpen, onClear }) {
  if (!exams.length) return null
  return (
    <section aria-labelledby="recent-heading" className="mb-6 rounded-2xl border border-navy-100 bg-white p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 id="recent-heading" className="inline-flex items-center gap-2 text-sm font-extrabold text-navy-900">
          <ClockIcon className="h-4 w-4 text-navy-400" />
          آخر ما فتحت
        </h2>
        <button type="button" onClick={onClear} className="rounded text-xs font-bold text-navy-500 underline-offset-2 transition-colors hover:text-navy-800 hover:underline focus-ring">
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
              className="inline-flex max-w-56 items-center gap-2 rounded-xl border border-navy-100 bg-navy-50/60 px-3 py-2 text-xs font-bold text-navy-800 transition-colors hover:border-navy-200 hover:bg-navy-50 focus-ring"
            >
              <span className="shrink-0 text-navy-400">#{exam.number}</span>
              <span className="truncate">{exam.title}</span>
              <ArrowIcon className="h-3.5 w-3.5 shrink-0 text-navy-400" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
