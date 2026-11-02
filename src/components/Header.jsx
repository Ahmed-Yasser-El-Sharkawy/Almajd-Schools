import { useEffect, useState } from "react"
import logo from "../assets/almajd-schools-logo-hd.webp"
import { MenuIcon, CloseIcon } from "./icons.jsx"
import { Diamond } from "./Ornaments.jsx"

const LINKS = [
  { href: "#exams", label: "الاختبارات" },
  { href: "#about", label: "عن المركز" },
]

// Gold underline that grows from the centre on hover and keyboard focus.
const UNDERLINE =
  "relative after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-majd-gold after:transition-transform after:duration-200 after:content-[''] hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none"

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 bg-white/95 shadow-[0_10px_24px_-20px_rgb(10_35_82/0.45)] backdrop-blur supports-[backdrop-filter]:bg-white/85">
      {/* navy ribbon with a gold thread, the banner's two colours in 4px */}
      <div aria-hidden="true" className="h-1 bg-gradient-to-l from-majd-deep via-majd-navy to-majd-deep" />
      <div aria-hidden="true" className="h-px bg-gradient-to-l from-transparent via-majd-gold to-transparent" />

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <a href="#top" className="flex items-center gap-2.5 rounded-lg focus-ring sm:gap-3">
          <img src={logo} alt="" width="670" height="412" className="h-10 w-auto sm:h-12" />
          <span aria-hidden="true" className="h-9 w-px bg-gradient-to-b from-transparent via-majd-gold to-transparent" />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[1.05rem] font-extrabold text-majd-ink sm:text-xl">مركز المجد للقدرات والتحصيلي</span>
            <span className="text-[11px] font-semibold text-gold-700 sm:text-xs">مدارس المجد الأهلية</span>
          </span>
        </a>

        <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-1 sm:flex">
          {LINKS.map((l, i) => (
            <span key={l.href} className="flex items-center gap-1">
              {i > 0 && <Diamond className="size-1.5" />}
              <a
                href={l.href}
                className={`rounded-lg px-3 py-2 font-display text-[1.05rem] font-bold text-majd-ink transition-colors hover:text-majd-navy focus-ring ${UNDERLINE}`}
              >
                {l.label}
              </a>
            </span>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl border border-majd-gold/40 p-2 text-majd-ink transition-colors hover:bg-majd-cream/50 focus-ring sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      <div aria-hidden="true" className="h-px bg-gradient-to-l from-transparent via-majd-gold/70 to-transparent" />

      <nav id="mobile-nav" hidden={!open} aria-label="التنقل للجوال" className="bg-white sm:hidden">
        <ul className="mx-auto max-w-6xl px-4 py-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 font-display text-lg font-bold text-majd-ink transition-colors hover:bg-majd-cream/50 focus-ring"
              >
                <Diamond className="size-2" />
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div aria-hidden="true" className="h-px bg-gradient-to-l from-transparent via-majd-gold/70 to-transparent" />
      </nav>
    </header>
  )
}
