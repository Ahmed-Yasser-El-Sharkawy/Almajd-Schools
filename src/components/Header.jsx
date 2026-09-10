import { useEffect, useState } from "react"
import logo from "../assets/almajd-schools-logo.png"
import { MenuIcon, CloseIcon } from "./icons.jsx"

const LINKS = [
  { href: "#exams", label: "الاختبارات" },
  { href: "#about", label: "عن المركز" },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <a href="#top" className="flex items-center gap-3 rounded-lg focus-ring">
          <img src={logo} alt="" width="44" height="29" className="h-8 w-auto sm:h-9" />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-navy-800 sm:text-base">مركز المجد للقدرات والتحصيلي</span>
            <span className="text-[11px] text-navy-500 sm:text-xs">مدارس المجد الأهلية</span>
          </span>
        </a>

        <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-1 sm:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50 focus-ring">
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-navy-700 transition-colors hover:bg-navy-50 focus-ring sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      <nav id="mobile-nav" hidden={!open} aria-label="التنقل للجوال" className="border-t border-navy-100 bg-white sm:hidden">
        <ul className="mx-auto max-w-6xl px-4 py-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50 focus-ring">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
