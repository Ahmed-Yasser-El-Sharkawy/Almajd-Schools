import { SearchIcon } from "./icons.jsx"

export default function EmptyState({ hasFilters, onReset }) {
  return (
    <div className="rounded-[1.1rem] border border-dashed border-majd-gold/60 bg-white px-6 py-16 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-majd-cream text-majd-gold-dark ring-1 ring-majd-gold/40">
        <SearchIcon className="h-7 w-7" />
      </span>
      <h3 className="mt-4 font-display text-2xl font-extrabold text-majd-ink">لم نجد اختبارًا مطابقًا</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-navy-600">
        جرّب كلمة أقصر من عنوان الاختبار، أو ابحث برقم الاختبار مباشرة.
      </p>
      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 rounded-xl bg-majd-ink px-5 py-2.5 text-sm font-bold text-white shadow-[inset_0_0_0_1px_rgb(235_203_126/0.35)] transition-colors hover:bg-majd-navy focus-ring"
        >
          مسح البحث والفلاتر
        </button>
      )}
    </div>
  )
}
