#!/usr/bin/env node
// Runs after `vite build`. The app is client-rendered, so on its own the
// built index.html is an empty <div id="root">: a search engine has to run
// JavaScript to see anything, and most AI crawlers (GPTBot, ClaudeBot,
// PerplexityBot) never do. This script turns dist/ into real pages:
//
//   dist/index.html              home: what the site is, its collections, FAQ
//   dist/<collection>/index.html one per collection, listing every exam
//   dist/404.html                the home page, so a mistyped path still loads
//   dist/sitemap.xml, dist/llms.txt
//
// Each page gets its own title, description, canonical URL and JSON-LD, and
// carries its content as plain HTML inside #root. React replaces that markup
// when it starts, so a visitor sees readable text first and the app a moment
// later, and a crawler that stops at the HTML still gets all of it.
//
// All wording comes from src/lib/seo.js and src/lib/exams.js, loaded through
// Vite so this script reads exactly what the app renders.
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

const vite = await createServer({
  root,
  logLevel: 'error',
  appType: 'custom',
  server: { middlewareMode: true, hmr: false, ws: false },
  optimizeDeps: { noDiscovery: true, include: [] },
})
let COLLECTIONS, seo, countNoun, QUESTIONS, base
try {
  ;({ COLLECTIONS } = await vite.ssrLoadModule('/src/lib/exams.js'))
  seo = await vite.ssrLoadModule('/src/lib/seo.js')
  ;({ countNoun, QUESTIONS } = await vite.ssrLoadModule('/src/lib/arabic.js'))
  base = vite.config.base
} finally {
  await vite.close()
}

const { SITE_URL, SITE_NAME, ORG_NAME, FAQ, pageMeta } = seo
const OG_IMAGE = { url: `${SITE_URL}og-image.jpg`, width: 696, height: 457 }
const TOPIC = {
  '@type': 'Thing',
  name: 'اختبار القدرات العامة',
  alternateName: ['القدرات', 'قياس', 'General Aptitude Test', 'GAT'],
}
const COUNTRY = { '@type': 'Country', name: 'المملكة العربية السعودية', identifier: 'SA' }

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
// "</script>" inside a JSON string would end the block early.
const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
const pathOf = (key) => `${base}${key}/`

/** Date any of these files last changed in git, so <lastmod> means "content changed". */
function lastModified(...files) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...files], { cwd: root, encoding: 'utf8' }).trim()
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) return out
  } catch {
    // Not a git checkout: fall through to the files' own timestamps.
  }
  return files
    .map((file) => statSync(resolve(root, file)).mtime.toISOString().slice(0, 10))
    .sort()
    .at(-1)
}
// A collection's content is its forms plus, where it has one, its
// "الأكثر تكرارًا" shortlist: revising the shortlist alone changes the page.
const dataFiles = (c) => [`src/data/${c.key}-exams.json`, ...(c.priority ? [`src/data/${c.key}-priority.json`] : [])]
const MODIFIED = Object.fromEntries(COLLECTIONS.map((c) => [c.key, lastModified(...dataFiles(c))]))
const SITE_MODIFIED = Object.values(MODIFIED).sort().at(-1)

// ---- <head> ---------------------------------------------------------------

function head(meta, graph, { index = true } = {}) {
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${index ? 'index, follow, max-snippet:-1, max-image-preview:large' : 'noindex, follow'}" />`,
    `<meta name="author" content="${esc(ORG_NAME)}" />`,
    index ? `<link rel="canonical" href="${meta.url}" />` : '',
    // One language, one country: tell search engines which market this is for.
    index ? `<link rel="alternate" hreflang="ar-SA" href="${meta.url}" />` : '',
    index ? `<link rel="alternate" hreflang="x-default" href="${meta.url}" />` : '',
    `<meta name="geo.region" content="SA" />`,
    `<meta name="geo.placename" content="المملكة العربية السعودية" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="ar_SA" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${meta.url}" />`,
    `<meta property="og:image" content="${OG_IMAGE.url}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${esc(ORG_NAME)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE.url}" />`,
    jsonLd({ '@context': 'https://schema.org', '@graph': graph }),
  ]
    .filter(Boolean)
    .join('\n    ')
}

const ORG = {
  '@type': 'EducationalOrganization',
  '@id': `${SITE_URL}#org`,
  name: 'مركز المجد للقدرات والتحصيلي',
  alternateName: ['مركز المجد', 'Almajd Center'],
  url: SITE_URL,
  logo: OG_IMAGE.url,
  description:
    'مركز المجد للقدرات والتحصيلي يقدّم تجميعات واختبارات إلكترونية في القدرات اللفظية والكمية لطلاب مدارس المجد الأهلية.',
  parentOrganization: { '@type': 'School', name: 'مدارس المجد الأهلية', alternateName: 'Almajd Schools' },
  address: { '@type': 'PostalAddress', addressCountry: 'SA' },
  areaServed: COUNTRY,
}

const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: 'اختبارات مدارس المجد الأهلية',
  inLanguage: 'ar-SA',
  publisher: { '@id': `${SITE_URL}#org` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

const AUDIENCE = { '@type': 'EducationalAudience', educationalRole: 'student', geographicArea: COUNTRY }

// ---- <body> ---------------------------------------------------------------

const collectionLinks = (skip) =>
  COLLECTIONS.filter((c) => c.key !== skip)
    .map((c) => `<li><a href="${pathOf(c.key)}">${esc(pageMeta(c.key).heading)}</a>: ${esc(c.description)}</li>`)
    .join('\n        ')

const credit = `<footer><p>إعداد وإشراف: ${esc(ORG_NAME)}</p></footer>`

function homePage() {
  const meta = pageMeta(null)
  const graph = [
    ORG,
    WEBSITE,
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}#page`,
      url: SITE_URL,
      name: meta.title,
      description: meta.description,
      inLanguage: 'ar-SA',
      isPartOf: { '@id': `${SITE_URL}#website` },
      about: TOPIC,
      audience: AUDIENCE,
      dateModified: SITE_MODIFIED,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: COLLECTIONS.length,
        itemListElement: COLLECTIONS.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: pageMeta(c.key).heading,
          description: c.description,
          url: pageMeta(c.key).url,
        })),
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      inLanguage: 'ar-SA',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]
  const body = `<div class="seo-shell">
      <header>
        <p class="seo-kicker">${esc(ORG_NAME)}</p>
        <h1>${esc(meta.heading)}</h1>
        <p>${esc(meta.description)}</p>
      </header>
      <main>
        <h2>مجموعات الاختبارات</h2>
        <ul>
        ${collectionLinks(null)}
        </ul>
        <h2>أسئلة شائعة</h2>
        ${FAQ.map((f) => `<h3>${esc(f.q)}</h3>\n        <p>${esc(f.a)}</p>`).join('\n        ')}
      </main>
      ${credit}
    </div>`
  return { meta, graph, body }
}

function collectionPage(c) {
  const meta = pageMeta(c.key)
  const graph = [
    ORG,
    WEBSITE,
    {
      '@type': 'CollectionPage',
      '@id': `${meta.url}#page`,
      url: meta.url,
      name: meta.title,
      headline: meta.heading,
      description: meta.description,
      inLanguage: 'ar-SA',
      isPartOf: { '@id': `${SITE_URL}#website` },
      about: TOPIC,
      audience: AUDIENCE,
      dateModified: MODIFIED[c.key],
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: SITE_NAME, item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: meta.heading, item: meta.url },
        ],
      },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: c.items.length,
        itemListElement: c.items.map((x) => ({
          '@type': 'ListItem',
          position: x.number,
          name: x.topic ? `${x.title}: ${x.topic}` : x.title,
          url: x.url,
        })),
      },
    },
  ]
  const item = (x) => {
    const extra = [
      x.topic,
      Number.isInteger(x.questions) ? countNoun(x.questions, QUESTIONS) : null,
      x.priority ? c.priority?.label : null,
    ].filter(Boolean)
    return `<li><a href="${esc(x.url)}" rel="noopener">${esc(x.title)}</a>${extra.length ? ` — ${esc(extra.join(' · '))}` : ''}</li>`
  }
  const gate = c.requiresPassword
    ? `<p>هذه النماذج محمية بكلمة مرور: بعد فتح النموذج تظهر صفحة أولى تطلب كلمة المرور مع الاسم والفصل والمجمع. كلمة المرور تُسلَّم من المعلّم داخل الفصل ولا تُنشر هنا.</p>`
    : ''
  const body = `<div class="seo-shell">
      <header>
        <p class="seo-kicker"><a href="${base}">${esc(SITE_NAME)}</a> — ${esc(ORG_NAME)}</p>
        <h1>${esc(meta.heading)}</h1>
        <p>${esc(meta.description)}</p>
        ${gate}
      </header>
      <main>
        <h2>قائمة الاختبارات (${c.items.length})</h2>
        <ol>
        ${c.items.map(item).join('\n        ')}
        </ol>
        <h2>مجموعات أخرى</h2>
        <ul>
        ${collectionLinks(c.key)}
        </ul>
      </main>
      ${credit}
    </div>`
  return { meta, graph, body }
}

// ---- write ----------------------------------------------------------------

const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
const HEAD_BLOCK = /<!-- seo:start[\s\S]*?<!-- seo:end -->/
const BODY_SLOT = '<!-- seo:body -->'
if (!HEAD_BLOCK.test(template) || !template.includes(BODY_SLOT)) {
  throw new Error('dist/index.html is missing the seo:start/seo:end or seo:body markers')
}

function render({ meta, graph, body }, options) {
  // Function replacements: the text may contain "$", which a string
  // replacement would read as a capture-group reference.
  return template.replace(HEAD_BLOCK, () => head(meta, graph, options)).replace(BODY_SLOT, () => body)
}

const home = homePage()
writeFileSync(resolve(dist, 'index.html'), render(home))
writeFileSync(resolve(dist, '404.html'), render(home, { index: false }))
for (const c of COLLECTIONS) {
  mkdirSync(resolve(dist, c.key), { recursive: true })
  writeFileSync(resolve(dist, c.key, 'index.html'), render(collectionPage(c)))
}

const urls = [
  { loc: SITE_URL, lastmod: SITE_MODIFIED, priority: '1.0' },
  ...COLLECTIONS.map((c) => ({ loc: pageMeta(c.key).url, lastmod: MODIFIED[c.key], priority: '0.8' })),
]
writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}
</urlset>
`,
)

// llms.txt: a plain-Markdown summary for AI assistants (llmstxt.org).
writeFileSync(
  resolve(dist, 'llms.txt'),
  `# ${SITE_NAME}

> ${home.meta.description}

الجهة: ${ORG_NAME}. اللغة: العربية. الجمهور: طلاب المرحلة الثانوية في المملكة العربية السعودية المتقدمون لاختبار القدرات العامة (قياس). كل اختبار نموذج Google يُفتح من المتصفح.

## مجموعات الاختبارات

${COLLECTIONS.map((c) => `- [${pageMeta(c.key).heading}](${pageMeta(c.key).url}): ${c.description}${c.requiresPassword ? ' (محمية بكلمة مرور تُسلَّم داخل الفصل)' : ''}`).join('\n')}

## أسئلة شائعة

${FAQ.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}
`,
)

console.log(`prerender: home + ${COLLECTIONS.length} collection pages, 404.html, sitemap.xml (${urls.length} URLs), llms.txt`)
