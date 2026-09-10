import { useEffect, useRef } from "react"
import { SearchIcon, CloseIcon } from "./icons.jsx"

export default function SearchBar({ value, onChange, resultCount }) {
  const inputRef = useRef(null)

  // "/" focuses the search from anywhere, the way search-first apps behave.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return
      const tag = document.activeElement?.tagName
      if (tag === "INPUT" || tag === "TEXTAREA") return
      e.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <search className="w-full max-w-2xl">
      <div className="relative">
        <label htmlFor="exam-search" className="sr-only">ابحث عن اختبار</label>
        <SearchIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
        <input
          id="exam-search"
          ref={inputRef}
          type="search"
          inputMode="search"
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="ابحث عن اختبار، تجميعة، أو رقم…"
          aria-describedby="search-result-count"
          className="h-14 w-full rounded-2xl border border-navy-200 bg-white pe-14 ps-12 text-base text-navy-900 shadow-panel outline-none transition placeholder:text-navy-400 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/25"
        />
        {value && (
          <button
            type="button"
            onClick={() => { onChange(""); inputRef.current?.focus() }}
            aria-label="مسح البحث"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-navy-500 transition-colors hover:bg-navy-50 hover:text-navy-800 focus-ring"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        )}
      </div>
      <p id="search-result-count" aria-live="polite" className="mt-2 min-h-5 text-xs text-navy-300">
        {value.trim() ? `تم العثور على ${resultCount} نتيجة` : "اكتب أي كلمة من عنوان الاختبار، أو رقمه"}
      </p>
    </search>
  )
}
