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
      className="majd-tile mt-4 flex items-start gap-3 bg-gradient-to-l from-majd-cream/70 via-white to-white p-4 sm:items-center sm:p-5"
    >
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-majd-ink text-majd-gold-light shadow-[inset_0_0_0_1px_rgb(235_203_126/0.45)] sm:mt-0">
        <LockIcon className="h-5 w-5" />
      </span>
      <div>
        <h3 id="access-notice-heading" className="font-display text-lg font-extrabold text-majd-ink">
          هذه النماذج محمية بكلمة مرور
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-navy-600 sm:text-sm">
          بعد فتح النموذج ستظهر صفحة أولى تطلب كلمة المرور مع الاسم والفصل والمجمع، ثم تنتقل
          إلى الأسئلة. كلمة المرور تُسلَّم من المعلّم داخل الفصل ولا تُنشر هنا.
        </p>
      </div>
    </section>
  )
}
