import { useState } from "react"
import { ShareIcon, CheckIcon } from "./icons.jsx"

/** Copies the current URL, which already carries the search and filter state. */
export default function ShareButton({ disabled }) {
  const [done, setDone] = useState(false)

  async function share() {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setDone(true)
      setTimeout(() => setDone(false), 1800)
    } catch {
      window.prompt("انسخ رابط النتيجة:", url)
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      disabled={disabled}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-navy-200 bg-white px-4 text-sm font-bold text-navy-700 transition-colors hover:bg-navy-50 focus-ring disabled:cursor-not-allowed disabled:opacity-45"
    >
      {done ? <CheckIcon className="h-4 w-4 text-emerald-600" /> : <ShareIcon className="h-4 w-4" />}
      {done ? "تم النسخ" : "مشاركة النتيجة"}
    </button>
  )
}
