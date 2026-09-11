import logo from "../assets/almajd-schools-logo.png"

export default function Footer() {
  return (
    <footer id="about" className="mt-16 border-t border-navy-100 bg-navy-900 text-navy-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-white p-2">
              <img src={logo} alt="" width="44" height="29" className="h-8 w-auto" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-bold text-white">مركز المجد للقدرات والتحصيلي</span>
              <span className="text-sm text-navy-300">مدارس المجد الأهلية</span>
            </span>
          </div>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-navy-300">
            منصة الوصول السريع إلى تجميعات واختبارات مركز المجد: القدرات اللفظية،
            وتأسيس ونماذج القدرات الكمي، والاختبارات العامة. جميع الاختبارات على
            هيئة نماذج Google، تُفتح مباشرة من المتصفح بلا تسجيل دخول.
          </p>
          <p className="mt-4 text-sm text-gold-300">إعداد وإشراف: مركز المجد للقدرات والتحصيلي — مدارس المجد الأهلية</p>
        </div>

        <nav aria-label="روابط الموقع">
          <h2 className="text-sm font-bold text-white">روابط سريعة</h2>
          <ul className="mt-2 text-sm">
            <li><a href="#top" className="inline-flex min-h-11 items-center rounded text-navy-200 transition-colors hover:text-gold-300 focus-ring">الرئيسية</a></li>
            <li><a href="#exams" className="inline-flex min-h-11 items-center rounded text-navy-200 transition-colors hover:text-gold-300 focus-ring">جميع الاختبارات</a></li>
            <li><a href="?tab=verbal" className="inline-flex min-h-11 items-center rounded text-navy-200 transition-colors hover:text-gold-300 focus-ring">تجميعات اللفظي</a></li>
            <li><a href="?tab=quant-foundation" className="inline-flex min-h-11 items-center rounded text-navy-200 transition-colors hover:text-gold-300 focus-ring">تأسيس القدرات الكمي</a></li>
            <li><a href="?tab=quant" className="inline-flex min-h-11 items-center rounded text-navy-200 transition-colors hover:text-gold-300 focus-ring">نماذج القدرات الكمي</a></li>
            <li><a href="?tab=general" className="inline-flex min-h-11 items-center rounded text-navy-200 transition-colors hover:text-gold-300 focus-ring">الاختبارات العامة</a></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-navy-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-navy-300 sm:flex-row">
          <p>© {new Date().getFullYear()} مدارس المجد الأهلية — جميع الحقوق محفوظة.</p>
          <p>تصميم وتطوير: م. أحمد الشرقاوي</p>
        </div>
      </div>
    </footer>
  )
}
