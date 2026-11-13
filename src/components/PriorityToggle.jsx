import { RepeatIcon } from "./icons.jsx"
import { countNoun, SECTIONS } from "../lib/arabic.js"

const DATE = new Intl.DateTimeFormat("ar-u-ca-gregory-nu-latn", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
})

/** "2026-10-23" → "23 أكتوبر 2026"; anything else is shown as written. */
function formatDate(iso) {
  const date = new Date(`${iso}T00:00:00Z`)
  return Number.isNaN(date.getTime()) ? iso : DATE.format(date)
}

/**
 * The switch that narrows a collection to its "الأكثر تكرارًا" shortlist: the
 * sections the trainer marks as recurring most in the real exam. It sits above
 * the grid on every screen size rather than inside the filter panel, because
 * on a phone that panel is a closed sheet and this is the one filter a student
 * short on time is looking for.
 *
 * The whole tile is the control, so the target is far larger than the 44px
 * minimum. State is carried by the knob's position and by aria-checked, not
 * by colour alone.
 *
 * @param {{label: string, updated: string|null}} shortlist
 * @param {number} count  shortlisted sections a student can actually open
 */
export default function PriorityToggle({ shortlist, count, checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby="priority-toggle-title"
      aria-describedby="priority-toggle-desc"
      onClick={() => onChange(!checked)}
      className={`majd-tile mt-4 flex w-full items-center gap-3 p-4 text-start transition-colors duration-200 focus-ring motion-reduce:transition-none sm:p-5 ${
        checked
          ? "border-majd-gold bg-majd-cream"
          : "bg-gradient-to-l from-majd-cream/70 via-white to-white hover:border-majd-gold/70"
      }`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-majd-ink text-majd-gold-light shadow-[inset_0_0_0_1px_rgb(235_203_126/0.45)]">
        <RepeatIcon className="h-5 w-5" />
      </span>

      <span className="min-w-0 flex-1">
        <span id="priority-toggle-title" className="block font-display text-lg font-extrabold leading-snug text-majd-ink">
          {shortlist.label} فقط
        </span>
        <span id="priority-toggle-desc" className="mt-1 block text-xs leading-relaxed text-navy-600 sm:text-sm">
          {checked
            ? `تُعرض الآن ${countNoun(count, SECTIONS)} فقط. اضغط للرجوع إلى كل الأقسام.`
            : `${countNoun(count, SECTIONS)} تكرّر ورودها في الاختبار. فعّل المفتاح لعرضها وحدها.`}
          {shortlist.updated && (
            <span className="block">آخر تحديث للقائمة: {formatDate(shortlist.updated)}.</span>
          )}
        </span>
      </span>

      {/* Off is an empty outline, on is filled: a tinted track reads as "on"
          at a glance. The page is RTL, so "on" slides the knob to the left. */}
      <span
        aria-hidden="true"
        className={`flex h-7 w-12 shrink-0 items-center rounded-full p-1 ring-2 ring-inset transition-colors duration-200 motion-reduce:transition-none ${
          checked ? "bg-majd-ink ring-majd-ink" : "bg-white ring-navy-400"
        }`}
      >
        <span
          className={`size-5 rounded-full transition-transform duration-200 motion-reduce:transition-none ${
            checked ? "-translate-x-5 bg-majd-gold-light" : "bg-navy-400"
          }`}
        />
      </span>
    </button>
  )
}
