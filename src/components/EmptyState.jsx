import { SearchIcon } from "./icons.jsx"

export default function EmptyState({ hasFilters, onReset }) {
  return (
    <div className="rounded-2xl border border-dashed border-navy-200 bg-white px-6 py-16 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy-50 text-navy-400">
        <SearchIcon className="h-7 w-7" />
      </span>
      <h3 className="mt-4 text-lg font-bold text-navy-900">لم نجد اختبارًا مطابقًا</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-navy-500">
        جرّب كلمة أقصر من عنوان الاختبار، أو ابحث برقم الاختبار مباشرة.
      </p>
      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 rounded-xl bg-navy-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-navy-800 focus-ring"
        >
          مسح البحث والفلاتر
        </button>
      )}
    </div>
  )
}
