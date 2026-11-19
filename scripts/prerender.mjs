// Injects the server-rendered app into dist/index.html so crawlers get real HTML.
// Runs after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const ssrDir = resolve(root, 'dist-ssr')
const htmlPath = resolve(root, 'dist/index.html')

const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)
const html = readFileSync(htmlPath, 'utf8')
const placeholder = '<div id="root"></div>'
if (!html.includes(placeholder)) throw new Error(`prerender: ${placeholder} not found in dist/index.html`)

const appHtml = render()
writeFileSync(htmlPath, html.replace(placeholder, `<div id="root">${appHtml}</div>`))
rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerender: wrote ${(appHtml.length / 1024).toFixed(1)} kB of HTML into dist/index.html`)
