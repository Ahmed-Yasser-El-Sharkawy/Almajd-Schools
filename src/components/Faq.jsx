import { SectionHeading } from "./Ornaments.jsx"
import { ChevronDownIcon } from "./icons.jsx"
import { FAQ } from "../lib/seo.js"

/**
 * The questions a student, a parent or an AI assistant asks about the site,
 * answered in plain sentences. The same list is published as FAQPage
 * structured data by scripts/prerender.mjs, which is only valid while the
 * answers are also visible here, so the two must stay one list.
 */
export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative mx-auto max-w-3xl scroll-mt-24 px-4 pb-2 pt-6 sm:pt-10">
      <SectionHeading id="faq-title" className="mb-6 sm:mb-8">أسئلة شائعة</SectionHeading>

      <div className="space-y-3">
        {FAQ.map((item) => (
          <details key={item.q} className="majd-tile group">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-[1.1rem] px-4 py-3 font-display text-lg font-bold leading-snug text-majd-ink focus-ring sm:px-5 sm:text-xl [&::-webkit-details-marker]:hidden">
              <h3>{item.q}</h3>
              <ChevronDownIcon className="h-5 w-5 shrink-0 text-majd-gold-dark transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" />
            </summary>
            <p className="px-4 pb-4 text-[0.95rem] leading-relaxed text-navy-600 sm:px-5">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
