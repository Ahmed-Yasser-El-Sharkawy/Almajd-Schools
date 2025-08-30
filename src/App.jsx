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
  const [photoUrl, setPhotoUrl] = useState("data:image/jpeg;base64,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");

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
