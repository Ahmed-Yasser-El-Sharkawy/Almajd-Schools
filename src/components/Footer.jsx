import schoolsLogo from "../assets/almajd-schools-logo-hd.webp"
import centerLogo from "../assets/almajd-center-logo-hd.webp"
import { Seam, Rosette, DiamondMark } from "./HeroArt.jsx"
import { Diamond } from "./Ornaments.jsx"

const QUICK_LINKS = [
  { href: "#top", label: "الرئيسية" },
  { href: "#exams", label: "جميع الاختبارات" },
  { href: "?tab=verbal", label: "أقسام اللفظي الحديثة" },
  { href: "?tab=quant-sections", label: "أقسام الكمي الحديثة" },
  { href: "?tab=quant-foundation", label: "تأسيس القدرات الكمي" },
  { href: "?tab=quant-releases", label: "بنوك أسئلة الكمي" },
  { href: "?tab=general", label: "اختبارات لفظي محاكاة" },
]

/**
 * The banner's navy band again, closing the page: the same gold wave on top
 * (mirrored, so it rises on the other side) and both logos on a cream plaque,
 * since the logos' navy lettering would vanish straight on the navy field.
 */
export default function Footer() {
  return (
    <footer id="about" className="relative mt-24 bg-gradient-to-b from-majd-navy to-majd-deep text-navy-100 sm:mt-28 lg:mt-32">
      <Seam className="pointer-events-none absolute inset-x-0 bottom-[calc(100%-1px)] h-12 w-full -scale-x-100 sm:h-16 lg:h-[min(7.5vw,8rem)]" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_88%_0%,rgb(41_84_158/0.35),transparent_70%)]" />
        <Rosette className="absolute -bottom-16 -left-16 w-56 text-majd-line/60 sm:w-72" />
        <Rosette className="absolute -top-10 right-[8%] hidden w-40 text-majd-line/50 lg:block" />
        <DiamondMark className="absolute bottom-24 right-6 hidden w-14 text-majd-gold/60 md:block" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-10 pt-8 sm:pt-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <div className="majd-card inline-flex items-center gap-4 rounded-2xl px-4 py-3 sm:gap-6 sm:px-6 sm:py-4">
            <img src={schoolsLogo} alt="شعار مدارس المجد الأهلية" width="670" height="412" loading="lazy" className="h-12 w-auto sm:h-[4.25rem]" />
            <span aria-hidden="true" className="h-12 w-px bg-gradient-to-b from-transparent via-majd-gold to-transparent sm:h-16" />
            <img src={centerLogo} alt="شعار مركز المجد للقدرات والتحصيلي" width="591" height="355" loading="lazy" className="h-12 w-auto sm:h-[4.5rem]" />
          </div>

          <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-navy-200">
            منصة الوصول السريع إلى تجميعات واختبارات مركز المجد: أقسام اللفظي الحديثة
            واختبارات المحاكاة، وأقسام الكمي الحديثة وتأسيسه وبنوك أسئلته. جميع الاختبارات على
            هيئة نماذج Google، تُفتح مباشرة من المتصفح بلا تسجيل دخول.
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-majd-gold-light">
            <Diamond className="mt-1.5 size-2" />
            <span>إعداد وإشراف: مركز المجد للقدرات والتحصيلي — مدارس المجد الأهلية</span>
          </p>
        </div>

        <nav aria-labelledby="footer-links-title">
          <h2 id="footer-links-title" className="font-display text-2xl font-extrabold text-white">روابط سريعة</h2>
          <div aria-hidden="true" className="mt-2 h-0.5 w-20 rounded-full bg-gradient-to-l from-majd-gold to-transparent" />
          <ul className="mt-3 grid grid-cols-2 gap-x-4 text-[0.95rem] sm:gap-x-6">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-11 items-center gap-2.5 rounded text-navy-100 transition-colors hover:text-majd-gold-light focus-ring focus-visible:ring-offset-majd-navy">
                  <Diamond className="size-1.5" />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="relative">
        <div aria-hidden="true" className="mx-auto h-px max-w-6xl bg-gradient-to-l from-transparent via-majd-gold/60 to-transparent" />
        <p className="flex items-center justify-center gap-3 px-4 py-6 font-display text-lg font-semibold text-majd-paper sm:text-xl">
          <span aria-hidden="true" className="hidden h-0.5 w-16 rounded-full bg-gradient-to-r from-majd-gold-light to-transparent sm:block" />
          <Diamond />
          <span>تدرّب بثقة … وانطلق نحو التميز</span>
          <Diamond />
          <span aria-hidden="true" className="hidden h-0.5 w-16 rounded-full bg-gradient-to-l from-majd-gold-light to-transparent sm:block" />
        </p>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-navy-300 sm:flex-row">
            <p>© {new Date().getFullYear()} مدارس المجد الأهلية — جميع الحقوق محفوظة.</p>
            <p>تصميم وتطوير: م. أحمد الشرقاوي</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
