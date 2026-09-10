# اختبارات مدارس المجد الأهلية

موقع ثابت (static) للوصول السريع إلى اختبارات وتجميعات **مركز المجد للقدرات والتحصيلي — مدارس المجد الأهلية**.

الموقع المنشور: <https://Ahmed-Yasser-El-Sharkawy.github.io/Almajd-Schools/>

## المجموعات

| المجموعة | العدد | المصدر |
| --- | ---: | --- |
| تجميعات اللفظي | 301 | `src/data/verbal-exams.json` |
| الاختبارات العامة | 100 | `src/data/general-exams.json` |
| **الإجمالي** | **401** | |

## التقنيات

React 18 + Vite 5 + Tailwind CSS 3، بلا خادم وبلا قاعدة بيانات. جميع عمليات
البحث والتصفية تتم داخل المتصفح.

## الأوامر

```bash
npm install           # تثبيت الحزم
npm run dev           # خادم التطوير
npm run validate-data # التحقق من سلامة البيانات والروابط
npm run build         # التحقق من البيانات ثم بناء نسخة الإنتاج في dist/
npm run preview       # معاينة نسخة الإنتاج محليًا
npm run deploy        # بناء ونشر dist/ إلى فرع gh-pages
```

## بنية المشروع

```
src/
  components/   مكوّنات الواجهة (Header, Hero, ExamCard, Filters, ...)
  data/         بيانات الاختبارات بصيغة JSON
  lib/          طبقة المنطق: التطبيع العربي، البحث، التخزين المحلي، حالة الرابط
  assets/       شعارات المركز
scripts/
  build-data.mjs      توليد ملفات البيانات من المصدر الأصلي
  validate-data.mjs   التحقق من البيانات (npm run validate-data)
```

الفصل مقصود: ملفات `src/data` تُقرأ في `src/lib/exams.js` فقط، والمكوّنات لا
تتعامل مع JSON الخام إطلاقًا.

## تحديث البيانات

1. عدّل ملف JSON المناسب داخل `src/data/`، أو أعد توليد ملف اللفظي عبر
   `npm run build-data` بعد تحديث الملف المصدر.
2. شغّل `npm run validate-data` وتأكد من عدم وجود أخطاء.
3. شغّل `npm run build` ثم `npm run deploy`.

> **ملاحظة أمنية:** كلمة مرور النماذج موجودة في الملف المصدر خارج المستودع
> ولا تُنسخ إلى `src/data/` ولا تظهر في نسخة الإنتاج.

## النشر على GitHub Pages

الموقع يُنشر من فرع `gh-pages` عبر `npm run deploy`.
قيمة `base` في `vite.config.js` هي `/Almajd-Schools/` وهي مطابقة لاسم المستودع؛
تغيير اسم المستودع يستلزم تحديث هذه القيمة و`homepage` في `package.json`.
