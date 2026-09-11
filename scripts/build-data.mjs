// One-off extraction: builds src/data/*.json from the source JSON and the
// legacy TESTS array that used to live inside src/App.jsx.
// URLs are copied byte-for-byte. The form password is never written out.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE_JSON = resolve(root, '..', 'روابط فورمات مدارس المجد 1-301.json')
const LEGACY_SRC = resolve(root, 'scripts', 'legacy-source.txt')

const stripTatweel = (s) => s.replace(/\u0640+/g, '').replace(/\s+/g, ' ').trim()

const raw = JSON.parse(readFileSync(SOURCE_JSON, 'utf8'))
const verbal = raw.forms.map((f) => ({
  id: `v-${f.section}`,
  collection: 'verbal',
  number: f.section,
  title: stripTatweel(f.title),
  url: f.url,
  shortUrl: f.short,
}))

const legacyText = readFileSync(LEGACY_SRC, 'utf8')
const general = []
const re = /\{\s*id:\s*(\d+),\s*title:\s*"([^"]+)",\s*url:\s*"([^"]+)"\s*\}/g
let m
while ((m = re.exec(legacyText)) !== null) {
  general.push({
    id: `g-${m[1]}`,
    collection: 'general',
    number: Number(m[1]),
    title: stripTatweel(m[2]),
    url: m[3],
    shortUrl: null,
  })
}

writeFileSync(
  resolve(root, 'src/data/verbal-exams.json'),
  JSON.stringify({ collection: 'verbal', questionsPerForm: raw.questions_per_form, generated: raw.generated, items: verbal }, null, 2) + '\n',
)
writeFileSync(
  resolve(root, 'src/data/general-exams.json'),
  JSON.stringify({ collection: 'general', items: general }, null, 2) + '\n',
)
console.log(`verbal: ${verbal.length}  general: ${general.length}`)

// --- القدرات الكمي -----------------------------------------------------
// Two sibling datasets sourced from the Drive export JSONs. These forms are
// password-gated, but the password is NEVER written out: anything in the JSON
// ships inside the public JS bundle and is one devtools panel away from being
// read. Only the fact that a password is required travels to the UI; the code
// itself is handed out in class.
function buildQuant({ source, collection, prefix, outFile }) {
  const src = JSON.parse(readFileSync(resolve(root, '..', source), 'utf8'))
  const items = src.forms.map((f) => ({
    id: `${prefix}-${f.model}`,
    collection,
    number: f.model,
    title: stripTatweel(f.title),
    ...(f.topic ? { topic: stripTatweel(f.topic) } : {}),
    url: f.url,
    shortUrl: f.short ?? null,
  }))
  writeFileSync(
    resolve(root, outFile),
    JSON.stringify({ collection, requiresPassword: Boolean(src.password), generated: src.generated, items }, null, 2) + '\n',
  )
  return items.length
}

const quantFoundation = buildQuant({
  source: 'روابط نماذج تأسيس القدرات الكمي — مدارس المجد 1-20.json',
  collection: 'quant-foundation',
  prefix: 'qf',
  outFile: 'src/data/quant-foundation-exams.json',
})
const quant = buildQuant({
  source: 'روابط نماذج القدرات الكمي — مدارس المجد 1-20.json',
  collection: 'quant',
  prefix: 'q',
  outFile: 'src/data/quant-exams.json',
})
console.log(`quant-foundation: ${quantFoundation}  quant: ${quant}`)
