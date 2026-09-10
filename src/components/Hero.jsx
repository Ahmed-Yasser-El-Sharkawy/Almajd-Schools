import logo from "../assets/almajd-center-logo.jpg"
import SearchBar from "./SearchBar.jsx"

export default function Hero({ query, onQueryChange, stats, resultCount }) {
  return (
    <section id="top" className="relative overflow-hidden border-b border-navy-100 bg-navy-900">
      {/* Decorative wash; purely presentational so it is hidden from the a11y tree. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-navy-700/50 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-10 sm:pb-14 sm:pt-14">
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="rounded-2xl bg-white p-3 shadow-panel">
            <img src={logo} alt="شعار مركز المجد للقدرات والتحصيلي" width="696" height="457" className="h-16 w-auto sm:h-20" />
          </span>

          <div className="max-w-2xl">
            <h1 className="text-2xl font-extrabold leading-tight text-white sm:text-4xl">
              كل اختباراتك في <span className="text-gold-400">مكان واحد</span>
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-navy-200 sm:text-base">
              ابحث عن التجميعة أو الاختبار بالاسم أو بالرقم، واضغط لفتحه مباشرة.
              لا حاجة إلى تسجيل دخول.
            </p>
          </div>

          <SearchBar value={query} onChange={onQueryChange} resultCount={resultCount} />

          <dl className="mt-2 grid w-full max-w-2xl grid-cols-3 gap-2 sm:gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-navy-700 bg-navy-800/60 px-2 py-3 sm:px-4">
                <dt className="text-[11px] text-navy-300 sm:text-xs">{s.label}</dt>
                <dd className="mt-0.5 text-lg font-extrabold text-gold-400 sm:text-2xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
