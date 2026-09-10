import React, { useMemo, useState } from "react";
import image2 from "../Image-2.jpg"; 


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
  { id: 41, title: "الاختبار الواحد و الاربعون", url: "https://docs.google.com/forms/d/e/1FAIpQLScpbzkaqS95SxiC4rPhMvQbFvUtr0t4fKapGhttzJ6EpJ6bAw/viewform?usp=header" },
  { id: 42, title: "الاختبار الثاني و الاربعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSflPkzXKnhe_VniP9vNTskanRwaEmQXtY73VblEU-BdQBryfw/viewform?usp=header" },
  { id: 43, title: "الاختبار الثالث و الاربعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSc2pPMA5FjedFvHDLUSCDQHnxMzJJVI2orm2e5T6aP5szNIFw/viewform?usp=header" },
  { id: 44, title: "الاختبار الرابع و الاربعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSckp70bd_p674eOz5MKgvEIV8Y7NbQZ_qT09EqXJ8suPxXu1Q/viewform?usp=header" },
  { id: 45, title: "الاختبار الخامس و الاربعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSeaPRp4rY9isv9-beEC1wB6-5xx1v0eboSOElqiTEtmfgZG2A/viewform?usp=header" },
  { id: 46, title: "الاختبار السادس و الاربعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSc-gfKiO6JNCfHzayNBwOXFbnelrTse8sGsd2xTH2DN-H9gvQ/viewform?usp=header" },
  { id: 47, title: "الاختبار السابع و الاربعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSd-SKmFUKNmbzaKCdeL6jM5xhxMbSrETXOm_pXJYKrKp_YuTw/viewform?usp=header" },
  { id: 48, title: "الاختبار الثامن و الاربعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSdW7uV_z15LwA8fCknm51tEjYpZTW1CA3eKAtDU1AUHgHGucg/viewform?usp=header" },
  { id: 49, title: "الاختبار التاسع و الاربعون", url: "https://docs.google.com/forms/d/e/1FAIpQLScMgM-ybLtcrHtgLSnjAPMOx1cC_5mUi5YIcaLLtiFGcaAJ3A/viewform?usp=header" },
  { id: 50, title: "الاختبار الخمسون", url: "https://docs.google.com/forms/d/e/1FAIpQLSeZZCa4aA7CyMinrVhhvWO3yDuat8-OTYfTc1TTHhwIODM2HQ/viewform?usp=header" },
  { id: 51, title: "الاختبار الواحد و الخمسون", url: "https://forms.gle/kjnFNbw9UpkFNjYW9" },
  { id: 52, title: "الاختبار الثاني و الخمسون", url: "https://forms.gle/ZPLWLGgGJqsVDFAe7" },
  { id: 53, title: "الاختبار الثالث و الخمسون", url: "https://forms.gle/fdG1ENg7VTdMyGX66" },
  { id: 54, title: "الاختبار الرابع و الخمسون", url: "https://forms.gle/Np2mjAxQRLWLSoqw7" },
  { id: 55, title: "الاختبار الخامس و الخمسون", url: "https://forms.gle/FgZQu9pKfmrRRHqXA" },
  { id: 56, title: "الاختبار السادس و الخمسون", url: "https://forms.gle/7THWp9jS3CXxmzrG6" },
  { id: 57, title: "الاختبار السابع و الخمسون", url: "https://forms.gle/ACfagLKNaywv1MWy7" },
  { id: 58, title: "الاختبار الثامن و الخمسون", url: "https://forms.gle/sCAmvH9B9UPoFQNq8" },
  { id: 59, title: "الاختبار التاسع و الخمسون", url: "https://forms.gle/9YGT2Zh34rP5M6wG7" },
  { id: 60, title: "الاختبار الستون", url: "https://forms.gle/hybfr8TV5a4QZfi87" },
  { id: 61, title: "الاختبار الواحد و الستون", url: "https://forms.gle/kBbi9JUak4Xhv8aV6" },
  { id: 62, title: "الاختبار الثاني و الستون", url: "https://forms.gle/v5oZGX7n1yZTvsbAA" },
  { id: 63, title: "الاختبار الثالث و الستون", url: "https://forms.gle/BJ2VmcmRnzLQRPWG6" },
  { id: 64, title: "الاختبار الرابع و الستون", url: "https://forms.gle/kn6Y1w1AasRQTXbD8" },
  { id: 65, title: "الاختبار الخامس و الستون", url: "https://forms.gle/nsAYvQdcnuZSBz6f8" },
  { id: 66, title: "الاختبار السادس و الستون", url: "https://forms.gle/zL3gVc4VxxEnjux5A" },
  { id: 67, title: "الاختبار السابع و الستون", url: "https://forms.gle/u65RbDHKZCUnFq8y9" },
  { id: 68, title: "الاختبار الثامن و الستون", url: "https://forms.gle/tMoJzZWB2uHnvBHr7" },
  { id: 69, title: "الاختبار التاسع و الستون", url: "https://forms.gle/kgWQbz7kC5o52Vk37" },
  { id: 70, title: "الاختبار السبعون", url: "https://forms.gle/m3uL9WwfBNkqANxK9" },
  { id: 71, title: "الاختبار الواحد و السبعون", url: "https://forms.gle/R3xXGFdi9ipP9NoCA" },
  { id: 72, title: "الاختبار الثاني و السبعون", url: "https://forms.gle/uLHkeAqqLSgz8VKw7" },
  { id: 73, title: "الاختبار الثالث و السبعون", url: "https://forms.gle/JWpvxiCWrPiwqLYL8" },
  { id: 74, title: "الاختبار الرابع و السبعون", url: "https://forms.gle/WYgQrUjD4LtkHVou6" },
  { id: 75, title: "الاختبار الخامس و السبعون", url: "https://forms.gle/ZUJX3K5ZJWFq1Czn9" },
  { id: 76, title: "الاختبار السادس و السبعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSeGxeOVgX1GwYLrJNwgnvAl6itud8G08xpglHmXnr9_WSy6lQ/viewform"},
  { id: 77, title: "الاختبار السابع و السبعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSeftQKEHAXo2Oyanu6QZ6dAHwf-dPRMhhw-wJg7vT9bG4YeCw/viewform" },
  { id: 78, title: "الاختبار الثامن و السبعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSeBcfpH5Nq4YiI8t9_kd3fENf-t-R2mAc95juzCql85-1cM9A/viewform" },
  { id: 79, title: "الاختبار التاسع و السبعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSfjbo13qvpMHJiTdYnPEkRNHG9eU9oZeUC1YPbM7cUcq3fQbQ/viewform" },
  { id: 80, title: "الاختبار الثمانون", url: "https://docs.google.com/forms/d/e/1FAIpQLScv_CJXF-6mOwWDnaSanVNw_rXOukfTELAH0jCK8snGcH2wSA/viewform" },
  { id: 81, title: "الاختبار الواحد و الثمانون", url: "https://docs.google.com/forms/d/e/1FAIpQLSe94dMoqX7SV_6FWEnKYpNtMMf0vxrZ4yJXinTSFoilTJhUJg/viewform" },
  { id: 82, title: "الاختبار الثاني و الثـمـــانون", url: "https://docs.google.com/forms/d/e/1FAIpQLSdp_aNh6LfqFdPIE8uY5wXwI2S4NBd9gS4V1A2JVqaKzF4gug/viewform" },
  { id: 83, title: "الاختبار الثالث و الثـماـنون", url: "https://docs.google.com/forms/d/e/1FAIpQLScDosILMSp98zQtFb_WnlGRtR_5CfB65L8re87eRS-1rCBlpw/viewform" },
  { id: 84, title: "الاختبار الرابع و الثـمـــانون", url: "https://docs.google.com/forms/d/e/1FAIpQLSdiRw4mA38QHqRqgXM1ysG_s53UAmh99eF3YcL9IBJC5dQhTw/viewform" },
  { id: 85, title: "الاختبار الخامس و الثمانون", url: "https://docs.google.com/forms/d/e/1FAIpQLSffk3PK01WaMoYBGYIXsU7dhFe4d-3icqPEOlP4I6wMHFDXfQ/viewform" },
  { id: 86, title: "الاختبار السادس و الثـماـــنون", url: "https://docs.google.com/forms/d/e/1FAIpQLScbw4TCzRIt28k3ZApylBKgRsmx1xnjq2W8lZ2w0DcNEjZxCg/viewform" },
  { id: 87, title: "الاختبار السابع و الثـماـــنون", url: "https://docs.google.com/forms/d/e/1FAIpQLSdA9G9V1WljFpZ0h1wE9hLGgfzMXj0ly45tVSZY4SRJeRgr5A/viewform" },
  { id: 88, title: "الاختبار الثامن و الثـماـــنون", url: "https://docs.google.com/forms/d/e/1FAIpQLSet2MW1NrivHATjDlKx_Wv1Pl1ppsRIFFbwAQFIxLhVqj1nug/viewform" },
  { id: 89, title: "الاختبار التاسع و الثـمــاـنون", url: "https://docs.google.com/forms/d/e/1FAIpQLSdW_mn_obuZGc19VyAdetMPbLvujveXQWx3clbOCFgyqhVHEg/viewform" },
  { id: 90, title: "الاختبار التسعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSfgW72v5CsESvvYRWHMXNh2ov8cOh3fYtNHMqb6ni-KN1O0sA/viewform" },
  { id: 91, title: "الاختبار الواحد و التسعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSc4KvrUmqycE8E5gZqDl-siEfvyseGSU-p4C1gqHYVOR2x-yw/viewform" },
  { id: 92, title: "الاختبار الثاني و التسعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSdMONWl0VeWuU7fXCWcPLTXP9NH1vQxqVuR5vSGWGBO3zyeDg/viewform" },
  { id: 93, title: "الاختبار الثالث و التسعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSfuPGPsDQrn6KPOtuitqpNfGBjT9cDyUJIH1hZbr65z_sXtvw/viewform" },
  { id: 94, title: "الاختبار الرابع و التسعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSfWSZs9SGrA5c5isMjUFSplKiQd8hGafaY_XZrdU93asRKMUQ/viewform" },
  { id: 95, title: "الاختبار الخامس و التسعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSddd3o7N8B_m_9oR96GN7yvURWiSGQieGhi2OVP1_MGAkb3nw/viewform" },
  { id: 96, title: "الاختبار السادس و التسعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSenU6QdXfN9np84T6DkwvB-Bfikht5WAx54HFqyacNk6ibYiw/viewform" },
  { id: 97, title: "الاختبار السابع و التسعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSdO7k2VB7YpN5NdKgfjfioDwKd1rxo5jT4ozzhak0JmOGJ7_g/viewform" },
  { id: 98, title: "الاختبار الثامن و التسعون", url: "https://docs.google.com/forms/d/e/1FAIpQLScTaA9UemFZ0404dcDYTWTvBiwL-NHwm6NduoO82ei2gfqGZQ/viewform" },
  { id: 99, title: "الاختبار التاسع و التسعون", url: "https://docs.google.com/forms/d/e/1FAIpQLSdzDNq43tmY30XCJH-fh7qV3hC_57bmcAyqtRhSEP5LOi5UBg/viewform" },
  { id: 100, title: "الاختبار المائة", url: "https://docs.google.com/forms/d/e/1FAIpQLSeXM1zteXh00R0xQk65oVgdVCLavzp2zz4Ex-qF4OusWEgURQ/viewform" },

];

function classNames(...c){ return c.filter(Boolean).join(' '); }

export default function App(){
  const [q, setQ] = useState("");
  // const defaultPhoto = import.meta.env.BASE_URL + "image-2.png";
  const defaultPhoto = image2; // use the imported image
  const [photoUrl, setPhotoUrl] = useState("https://drive.google.com/file/d/1vWNNoz9hbLl7y3G5bDR3w0u-VVoa_D5Q/view?usp=sharing");

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
