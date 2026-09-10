import { useState } from "react"
import { StarIcon, CopyIcon, CheckIcon, ArrowIcon } from "./icons.jsx"

export default function ExamCard({ exam, badge, isFavorite, isOpened, onToggleFavorite, onOpen }) {
  const [copied, setCopied] = useState(false)
  const shareUrl = exam.shortUrl ?? exam.url
  const headingId = `exam-${exam.id}-title`

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.prompt("انسخ الرابط يدويًا:", shareUrl)
    }
  }

  return (
    <article
      aria-labelledby={headingId}
      className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-4 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-card-hover motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-lg bg-navy-50 px-2 py-1 text-xs font-bold text-navy-700">#{exam.number}</span>
          <span className="rounded-lg bg-gold-50 px-2 py-1 text-xs font-semibold text-gold-800">{badge}</span>
          {isOpened && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800">
              <CheckIcon className="h-3.5 w-3.5" />
              تم فتحه
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onToggleFavorite(exam.id)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `إزالة ${exam.title} من المفضلة` : `إضافة ${exam.title} إلى المفضلة`}
          className={`shrink-0 rounded-lg p-2 transition-colors focus-ring ${isFavorite ? "text-gold-500 hover:bg-gold-50" : "text-navy-300 hover:bg-navy-50 hover:text-navy-500"}`}
        >
          <StarIcon filled={isFavorite} className="h-5 w-5" />
        </button>
      </div>

      <h3 id={headingId} className="mt-3 flex-1 text-base font-bold leading-snug text-navy-900">
        {exam.title}
      </h3>

      <div className="mt-4 flex items-center gap-2">
        <a
          href={exam.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onOpen(exam.id)}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-navy-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-navy-800 focus-ring"
        >
          فتح الاختبار
          <ArrowIcon className="h-4 w-4" />
        </a>
        <button
          type="button"
          onClick={copyLink}
          aria-label={`نسخ رابط ${exam.title}`}
          className="rounded-xl border border-navy-200 p-2.5 text-navy-600 transition-colors hover:bg-navy-50 hover:text-navy-900 focus-ring"
        >
          {copied ? <CheckIcon className="h-5 w-5 text-emerald-600" /> : <CopyIcon className="h-5 w-5" />}
        </button>
      </div>
      <span aria-live="polite" className="sr-only">{copied ? "تم نسخ الرابط" : ""}</span>
    </article>
  )
}
