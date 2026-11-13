import { useState } from "react"
import { StarIcon, CopyIcon, CheckIcon, ArrowIcon, TagIcon, LockIcon, QuestionsIcon, RepeatIcon } from "./icons.jsx"
import { getTheme } from "../lib/collectionTheme.jsx"
import { countNoun, QUESTIONS } from "../lib/arabic.js"

export default function ExamCard({ exam, badge, priorityLabel, locked, isFavorite, isOpened, onToggleFavorite, onOpen }) {
  const [copied, setCopied] = useState(false)
  const shareUrl = exam.shortUrl ?? exam.url
  const headingId = `exam-${exam.id}-title`
  const theme = getTheme(exam.collection)

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
      className="majd-tile group relative flex h-full flex-col p-4 transition duration-200 before:absolute before:inset-x-8 before:top-0 before:h-0.5 before:rounded-full before:bg-gradient-to-l before:from-transparent before:via-majd-gold before:to-transparent before:content-[''] hover:-translate-y-0.5 hover:border-majd-gold/60 hover:shadow-[0_14px_30px_-16px_rgb(10_35_82/0.35)] motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-lg bg-majd-ink px-2 py-1 text-xs font-bold text-majd-gold-light tabular-nums">#{exam.number}</span>
          <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ${theme.badge}`}>
            {locked && (
              <>
                <LockIcon aria-hidden="true" className="h-3.5 w-3.5 opacity-70" />
                <span className="sr-only">محمي بكلمة مرور — </span>
              </>
            )}
            {badge}
          </span>
          {/* Gold is the one accent on the card, and the mark is worded, so it
              reads without relying on colour. */}
          {exam.priority && priorityLabel && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-majd-gold-pale px-2 py-1 text-xs font-bold text-gold-900 ring-1 ring-inset ring-majd-gold/70">
              <RepeatIcon className="h-3.5 w-3.5" />
              {priorityLabel}
            </span>
          )}
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
          className={`shrink-0 rounded-lg p-2 transition-colors focus-ring ${isFavorite ? "text-majd-gold hover:bg-majd-cream/60" : "text-majd-gold-dark hover:bg-majd-cream/50 hover:text-gold-700"}`}
        >
          <StarIcon filled={isFavorite} className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-3 flex-1">
        <h3 id={headingId} className="font-display text-[1.25rem] font-extrabold leading-snug text-majd-ink">
          {exam.title}
        </h3>
        {exam.topic && (
          <p className="mt-1.5 flex items-start gap-1.5 text-sm leading-snug text-navy-600">
            <TagIcon className="mt-0.5 h-4 w-4 shrink-0 text-majd-gold-dark" />
            <span>{exam.topic}</span>
          </p>
        )}
        {exam.questions != null && (
          <p className="mt-1.5 flex items-center gap-1.5 text-sm leading-snug text-navy-600">
            <QuestionsIcon className="h-4 w-4 shrink-0 text-majd-gold-dark" />
            <span className="tabular-nums">{countNoun(exam.questions, QUESTIONS)}</span>
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <a
          href={exam.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onOpen(exam.id)}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-majd-ink px-4 py-2.5 text-sm font-bold text-white shadow-[inset_0_0_0_1px_rgb(235_203_126/0.35)] transition-colors hover:bg-majd-navy focus-ring"
        >
          فتح الاختبار
          <ArrowIcon className="h-4 w-4 text-majd-gold-light" />
        </a>
        <button
          type="button"
          onClick={copyLink}
          aria-label={`نسخ رابط ${exam.title}`}
          className="rounded-xl border border-majd-gold/40 p-2.5 text-majd-ink transition-colors hover:border-majd-gold hover:bg-majd-cream/50 focus-ring"
        >
          {copied ? <CheckIcon className="h-5 w-5 text-emerald-600" /> : <CopyIcon className="h-5 w-5" />}
        </button>
      </div>
      <span aria-live="polite" className="sr-only">{copied ? "تم نسخ الرابط" : ""}</span>
    </article>
  )
}
