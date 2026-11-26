/* Appends brand logos to src/data/techLogos.js from the two CC0 sources the
   data file is built from, so nobody has to hand-author SVG path data.

   One-off setup (these are only needed to run this script, not to build):
     npm install --no-save @iconify-json/logos simple-icons
   Then:
     node scripts/add-tech-logos.mjs      (this file, from the project root)

   Existing entries are left byte-identical — this only appends names that are
   not already in the file. Logos are trademarks of their owners. */
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const DATA = 'src/data/techLogos.js'

/* Each entry names an icon in @iconify-json/logos (multi-colour brand marks).
   `simple` would instead pull a single-colour path from simple-icons. */
const ADD = [
  // front-end & application platforms
  { name: 'React', cat: 'Web apps', icon: 'react' },
  { name: 'Next.js', cat: 'Web apps', icon: 'nextjs-icon' },
  { name: '.NET', cat: 'Applications', icon: 'dotnet' },
  { name: 'Node.js', cat: 'Applications', icon: 'nodejs-icon' },
  { name: 'TypeScript', cat: 'Applications', icon: 'typescript-icon' },
  { name: 'Tailwind CSS', cat: 'Web apps', icon: 'tailwindcss-icon' },
  // AI models & assistants
  { name: 'Claude', cat: 'AI models', icon: 'claude-icon' },
  { name: 'Google Gemini', cat: 'AI models', icon: 'google-gemini-icon' },
  { name: 'GitHub Copilot', cat: 'AI assistants', icon: 'github-copilot' },
  { name: 'Mistral AI', cat: 'AI models', icon: 'mistral-ai-icon' },
]

const logos = require('@iconify-json/logos/icons.json')

function build(entry) {
  if (entry.simple) {
    const si = require(`simple-icons/icons/${entry.simple}.js`)
    const icon = si.default ?? si
    return {
      name: entry.name,
      cat: entry.cat,
      viewBox: '0 0 24 24',
      body: `<path fill="currentColor" d="${icon.path}"/>`,
      color: `#${icon.hex}`,
    }
  }
  const icon = logos.icons[entry.icon]
  if (!icon) throw new Error(`logos:${entry.icon} not found in @iconify-json/logos`)
  const w = icon.width ?? logos.width
  const h = icon.height ?? logos.height
  return { name: entry.name, cat: entry.cat, viewBox: `0 0 ${w} ${h}`, body: icon.body }
}

const src = readFileSync(DATA, 'utf8')
const header = src.slice(0, src.indexOf('export const TECH_LOGOS'))
const existing = JSON.parse(src.slice(src.indexOf('['), src.lastIndexOf(']') + 1))
const have = new Set(existing.map((e) => e.name))

const added = []
for (const entry of ADD) {
  if (have.has(entry.name)) continue
  existing.push(build(entry))
  added.push(entry.name)
}

writeFileSync(DATA, `${header}export const TECH_LOGOS = ${JSON.stringify(existing, null, 2)}\n`)
console.log(`${DATA}: ${existing.length} logos (added ${added.length ? added.join(', ') : 'nothing'})`)
