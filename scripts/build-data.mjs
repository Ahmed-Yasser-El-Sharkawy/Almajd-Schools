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
