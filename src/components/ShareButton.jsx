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
      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-majd-gold/45 bg-white px-4 text-sm font-bold text-majd-ink transition-colors enabled:hover:border-majd-gold enabled:hover:bg-majd-cream/40 focus-ring disabled:cursor-not-allowed disabled:opacity-45"
    >
      {done ? <CheckIcon className="h-4 w-4 text-emerald-600" /> : <ShareIcon className="h-4 w-4 text-majd-gold-dark" />}
      {done ? "تم النسخ" : "مشاركة النتيجة"}
    </button>
  )
}
