import { LockIcon } from "./icons.jsx"

/**
 * The quantitative models open on a password page before the questions. The
 * code itself is handed out in class and deliberately never reaches this site
 * - publishing it here would defeat the gate - so this only tells a student
 * what to expect, and that they should already have the code before starting.
 */
export default function AccessNotice() {
  return (
    <section
      aria-labelledby="access-notice-heading"
      className="mt-4 flex items-start gap-3 rounded-2xl border border-navy-100 bg-gradient-to-l from-navy-50/80 via-white to-white p-4 shadow-card sm:items-center sm:p-5"
    >
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-700 text-white shadow-card sm:mt-0">
        <LockIcon className="h-5 w-5" />
      </span>
      <div>
        <h3 id="access-notice-heading" className="text-sm font-extrabold text-navy-900">
          هذه النماذج محمية بكلمة مرور
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-navy-500 sm:text-sm">
          بعد فتح النموذج ستظهر صفحة أولى تطلب كلمة المرور مع الاسم والفصل والمجمع، ثم تنتقل
          إلى الأسئلة. كلمة المرور تُسلَّم من المعلّم داخل الفصل ولا تُنشر هنا.
        </p>
      </div>
    </section>
  )
}
