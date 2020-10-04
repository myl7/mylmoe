// Run the script in the top folder, which contains `package.json`.
import fs from 'fs'
import marked from 'marked'
import YAML from 'yaml'

// Dir to put converted post HTML.
const postHTMLDir = './dist/posts-html/'
// These are directly output to dist, so ensure the folder exists.
if (!fs.existsSync(postHTMLDir)) {
  fs.mkdirSync(postHTMLDir, {recursive: true})
}

const renderer = new marked.Renderer()

const linkRenderer = renderer.link
renderer.link = (href, title, text) => {
  let html = linkRenderer.call(renderer, href, title, text)
  if (!href.startsWith('/')) {
    // Use relative urls in markdown to link to local posts.
    // For external urls, set proper attributes.
    html = html.replace(/^<a /, '<a target="_blank" rel="noopener" ')
  }
  return html
}

marked.setOptions({renderer})

let metaInfo = []

// Loop over .md posts, convert with `marked` and emit content in html and meta info in json.
const postDir = './posts/'
fs.readdirSync(postDir, {withFileTypes: true}).forEach((file, _) => {
  // Only process markdown files.
  if (file.isDirectory()) return
  if (file.name.split('.').pop() !== 'md') return

  const buf = fs.readFileSync(postDir + file.name)

  // Get basename as slug to link to.
  const name = file.name.substring(0, file.name.lastIndexOf('.'))
  // Separate front matter and body.
  const content = buf.toString()
  const sep = content.indexOf('\n---\n')
  const body = content.substring(sep + 5)

  // Generate meta info.
  let frontMatter = YAML.parse(content.substring(0, sep))
  frontMatter.slug = name
  const date = name.substring(0, 10)
  let title = name.substring(11)
  if (!frontMatter.date) {
    frontMatter.date = date
  }
  if (!frontMatter.title) {
    title = title.replace(/-/g, ' ')
    if (/[a-z]/.test(title[0])) {
      title = title[0].toUpperCase() + title.substring(1)
    }
    frontMatter.title = title
  }
  metaInfo.push(frontMatter)

  // Convert markdown and write to target file.
  fs.writeFile(postHTMLDir + name + '.html', marked(body), (e) => {
    if (e) throw e
  })
})

// Emit meta info.
const metaPath = './src/posts.json'
metaInfo.sort((a, b) => a.date < b.date ? 1 : -1)
const metaContent = JSON.stringify(metaInfo, null, 2) + '\n'
fs.writeFile(metaPath, metaContent, (e) => {
  if (e) throw e
})
