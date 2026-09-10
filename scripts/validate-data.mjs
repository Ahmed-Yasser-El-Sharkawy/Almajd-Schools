#!/usr/bin/env node
// Data validation for the exam datasets. Run with: npm run validate-data
// Exits non-zero when a problem would reach the UI.
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const load = (p) => JSON.parse(readFileSync(resolve(root, p), "utf8"))

const SHORT_URL = /^https:\/\/forms\.gle\/[A-Za-z0-9]+$/
const LONG_URL = /^https:\/\/docs\.google\.com\/forms\/d\/e\/[A-Za-z0-9_-]+\/viewform(\?[^\s]*)?$/
const isValidUrl = (u) => SHORT_URL.test(u) || LONG_URL.test(u)

const DATASETS = [
  { name: "تجميعات اللفظي", file: "src/data/verbal-exams.json", expected: 301 },
  { name: "الاختبارات العامة", file: "src/data/general-exams.json", expected: 100 },
]

let failures = 0
const allUrls = new Map()
const report = []

for (const ds of DATASETS) {
  const { items } = load(ds.file)
  const ids = new Map()
  const urls = new Map()
  const problems = []

  for (const item of items) {
    if (ids.has(item.id)) problems.push(`معرّف مكرر: ${item.id}`)
    ids.set(item.id, true)

    if (!item.title || !String(item.title).trim()) problems.push(`عنوان مفقود في ${item.id}`)
    if (!item.url) problems.push(`رابط مفقود في ${item.id}`)
    else if (!isValidUrl(item.url)) problems.push(`رابط غير صالح في ${item.id}: ${item.url}`)
    if (item.shortUrl && !SHORT_URL.test(item.shortUrl)) problems.push(`رابط مختصر غير صالح في ${item.id}`)
    if (!Number.isInteger(item.number) || item.number < 1) problems.push(`رقم غير صالح في ${item.id}`)

    for (const u of [item.url, item.shortUrl].filter(Boolean)) {
      if (urls.has(u)) problems.push(`رابط مكرر داخل المجموعة: ${u}`)
      urls.set(u, item.id)
      if (allUrls.has(u) && allUrls.get(u) !== item.id) problems.push(`رابط مكرر بين المجموعتين: ${u}`)
      allUrls.set(u, item.id)
    }
  }

  const numbers = items.map((x) => x.number).sort((a, b) => a - b)
  const contiguous = numbers.every((n, i) => n === i + 1)
  if (!contiguous) problems.push("أرقام الاختبارات غير متسلسلة من 1")
  if (ds.expected != null && items.length !== ds.expected) {
    problems.push(`العدد المتوقع ${ds.expected} والفعلي ${items.length}`)
  }

  const validUrls = items.filter((x) => x.url && isValidUrl(x.url)).length

  report.push({
    "المجموعة": ds.name,
    "السجلات": items.length,
    "روابط صالحة": validUrls,
    "روابط غير صالحة": items.length - validUrls,
    "معرّفات فريدة": ids.size,
    "أرقام متسلسلة": contiguous ? "نعم" : "لا",
  })

  if (problems.length) {
    failures += problems.length
    console.error(`\n✗ ${ds.name}`)
    for (const p of problems) console.error(`   - ${p}`)
  }
}

console.log("\nتقرير التحقق من البيانات\n")
console.table(report)
const total = report.reduce((s, r) => s + r["السجلات"], 0)
console.log(`الإجمالي: ${total} سجلًا، ${allUrls.size} رابطًا فريدًا.`)

if (failures) {
  console.error(`\n✗ فشل التحقق: ${failures} مشكلة.\n`)
  process.exit(1)
}
console.log("\n✓ اجتازت جميع البيانات التحقق.\n")
