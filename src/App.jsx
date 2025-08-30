import React, { useMemo, useState } from "react";

const TESTS = [
  { id: 1, title: "الاختبار الأول", url: "https://forms.gle/3TKQnvdtyZonghRMA" },
  { id: 2, title: "الاختبار الثاني", url: "https://forms.gle/8tUFxCHBvPFnrE2dA" },
  { id: 3, title: "الاختبار الثالث", url: "https://forms.gle/uciRCadRV62LGip18" },
  { id: 4, title: "الاختبار الرابع", url: "https://forms.gle/yfTvDy4uauBy2uhH8" },
  { id: 5, title: "الاختبار الخامس", url: "https://forms.gle/RCuLXa8N54KqSByF8" },
  { id: 6, title: "الاختبار السادس", url: "https://forms.gle/6ojsUoGaxa1w6HqT7" },
  { id: 7, title: "الاختبار السابع", url: "https://forms.gle/znRdxAyjYJuu9GQE7" },
  { id: 8, title: "الاختبار الثامن", url: "https://forms.gle/roeNgotH5oAGRHXY9" },
  { id: 9, title: "الاختبار التاسع", url: "https://forms.gle/ji5AC4RscLBc8oA69" },
  { id: 10, title: "الاختبار العاشر", url: "https://forms.gle/RPhiu4V7fH5iev7V8" },
  { id: 11, title: "الاختبار الحادي عشر", url: "https://forms.gle/eVu3pmKZaDyes2JN7" },
  { id: 12, title: "الاختبار الثاني عشر", url: "https://forms.gle/wtwMpmW43u6V2HVR7" },
  { id: 13, title: "الاختبار الثالث عشر", url: "https://forms.gle/uSU68GpLm1fruUhF6" },
  { id: 14, title: "الاختبار الرابع عشر", url: "https://forms.gle/tyTKyBBTBaiLDZcW6" },
  { id: 15, title: "الاختبار الخامس عشر", url: "https://forms.gle/uqhmjAsNv87YR5eV7" },
  { id: 16, title: "الاختبار السادس عشر", url: "https://forms.gle/MjaFMtoUR8ZeaZe47" },
  { id: 17, title: "الاختبار السابع عشر", url: "https://forms.gle/Viojke2dpXJbhHkr5" },
  { id: 18, title: "الاختبار الثامن عشر", url: "https://forms.gle/jPAmmkdS7uzgFDoj6" },
  { id: 19, title: "الاختبار التاسع عشر", url: "https://forms.gle/1AWJc9T2n8G92TWa9" },
  { id: 20, title: "الاختبار العشرون", url: "https://forms.gle/XP8RRZFip2Q7ji6A6" },
  { id: 21, title: "الاختبار الحادي والعشرون", url: "https://forms.gle/hcfyMNELTxJ1ysFz5" },
  { id: 22, title: "الاختبار الثاني والعشرون", url: "https://forms.gle/DS5nMtN5ztw1Sb8u7" },
  { id: 23, title: "الاختبار الثالث والعشرون", url: "https://forms.gle/r5sfNU7Lvo7b8JcQ9" },
  { id: 24, title: "الاختبار الرابع والعشرون", url: "https://forms.gle/DjXTxdrao7XQBHDz9" },
  { id: 25, title: "الاختبار الخامس والعشرون", url: "https://forms.gle/cB81kcx4aTW4ywuGA" },
  { id: 26, title: "الاختبار السادس والعشرون", url: "https://forms.gle/vALgxXUPZ4b4yN1G7" },
  { id: 27, title: "الاختبار السابع والعشرون", url: "https://forms.gle/WY9TzrdjXM9vwxpD8" },
  { id: 28, title: "الاختبار الثامن والعشرون", url: "https://forms.gle/t23s8SRVCiJrTT7G9" },
  { id: 29, title: "الاختبار التاسع والعشرون", url: "https://forms.gle/3E63Wz8LXoBQVjweA" },
  { id: 30, title: "الاختبار الثلاثون", url: "https://forms.gle/h69fuKribmGPQYXn6" },
  { id: 31, title: "الاختبار الحادي والثلاثون", url: "https://forms.gle/W8JgWjZQ7F521MaW6" },
  { id: 32, title: "الاختبار الثاني والثلاثون", url: "https://forms.gle/wB8srbPVW1cAFHvq7" },
  { id: 33, title: "الاختبار الثالث والثلاثون", url: "https://forms.gle/T4RxfL5Z21vYuiNo6" },
  { id: 34, title: "الاختبار الرابع والثلاثون", url: "https://forms.gle/D9H1TdeTv4gh5ivn9" },
  { id: 35, title: "الاختبار الخامس والثلاثون", url: "https://forms.gle/kLG3MKvwCf184ZF36" },
  { id: 36, title: "الاختبار السادس والثلاثون", url: "https://forms.gle/BVenYb7R1TeuJr6D7" },
  { id: 37, title: "الاختبار السابع والثلاثون", url: "https://forms.gle/U67uGwCE9xp37wwy6" },
  { id: 38, title: "الاختبار الثامن والثلاثون", url: "https://forms.gle/9wZUHnLnfKibPCNp6" },
  { id: 39, title: "الاختبار التاسع والثلاثون", url: "https://forms.gle/7WsmUDFVJpgJxTGJ7" },
  { id: 40, title: "الاختبار الأربعون", url: "https://forms.gle/9GzBBmcAPsFBR6eN7" },
];

function classNames(...c){ return c.filter(Boolean).join(' '); }

export default function App(){
  const [q, setQ] = useState("");
  const defaultPhoto = import.meta.env.BASE_URL + "image.png";
  const [photoUrl, setPhotoUrl] = useState(defaultPhoto);

  const filtered = useMemo(() => {
    if(!q.trim()) return TESTS;
    const t = q.trim().toLowerCase();
    return TESTS.filter(x => (x.title + ' ' + x.id).toLowerCase().includes(t));
  }, [q]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800">
      <header className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="shrink-0">
              <div className="relative w-40 h-40 md:w-44 md:h-44 rounded-3xl overflow-hidden shadow-xl ring-4 ring-white">
                <img
                  src={photoUrl}
                  alt="شعار مدارس المجد الأهلية"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = defaultPhoto; }}
                />
              </div>
    
            </div>

            <div className="flex-1 text-center md:text-right">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                مركز القدرات والتحصيلي— <span className="text-blue-700">مدارس المجد الأهلية</span>
              </h1>
              <p className="mt-3 text-slate-600 leading-relaxed">
                جميع الاختبارات في مكان واحد. اختر الاختبار المطلوب واضغط لبدء الحل.
              </p>
              <div className="mt-5 flex flex-col md:flex-row items-stretch md:items-center gap-3">
                <input
                  type="text"
                  placeholder="ابحث برقم أو عنوان الاختبار…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full md:w-96 rounded-xl border border-slate-300 bg-white px-4 py-2 outline-none ring-0 focus:border-blue-500 shadow-sm"
                />
                <a
                  href="#tests"
                  className="inline-flex justify-center rounded-xl bg-blue-600 px-5 py-2 text-white font-semibold shadow-lg hover:bg-blue-700 active:scale-[.99]"
                >
                  ابدأ الآن
                </a>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <input
                  type="url"
                  placeholder="ألصق رابط صورة الأستاذ هنا ثم اضغط Enter"
                  className="w-full md:w-[32rem] rounded-xl border border-slate-300 bg-white px-4 py-2 outline-none focus:border-blue-500 shadow-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const v = e.target.value.trim();
                      if (v) setPhotoUrl(v);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main id="tests" className="mx-auto max-w-6xl px-4 pb-16">
        <section className="mt-6">
          <div className="flex items-end justify-between mb-3">
            <h2 className="text-xl font-bold">قائمة الاختبارات ({filtered.length})</h2>
            <div className="text-sm text-slate-500">إجمالي الاختبارات: {TESTS.length}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((t) => (
              <article
                key={t.id}
                className={classNames(
                  "rounded-2xl border bg-white p-4 shadow-sm transition",
                  "hover:shadow-md hover:border-blue-200"
                )}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-bold text-blue-600">#{t.id}</div>
                    <h3 className="mt-1 text-base font-semibold leading-tight">{t.title}</h3>
                  </div>
                </div>

                <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                  اختبار رقم {t.id} — اضغط الزر لفتح نموذج Google Forms في تبويب جديد.
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex justify-center items-center rounded-xl bg-blue-600 px-4 py-2 text-white font-semibold shadow hover:bg-blue-700 active:scale-[.99]"
                    title={`فتح ${t.title}`}
                  >
                    فتح الاختبار
                  </a>
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(t.url);
                        alert("تم نسخ رابط الاختبار إلى الحافظة ✅");
                      } catch (e) {
                        alert("تعذّر النسخ تلقائيًا — انسخ الرابط يدويًا.");
                      }
                    }}
                    className="inline-flex justify-center items-center rounded-xl border px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    title="نسخ الرابط"
                  >
                    نسخ
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} مركز القدرات والتحصيلي — مدارس المجد الأهلية</div>
          <div className="opacity-80">تم التصميم بواسطة البشمهندس أحمد الشرقاوى</div>
        </div>
      </footer>
    </div>
  );
}
