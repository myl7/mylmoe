const path = require('path')
const glob = require('glob')
const imageSize = require('image-size')
const fs = require('fs')

const p = path.join(process.cwd(), 'storage', 'images', '**', '*')
let info = {}
glob.sync(p).filter(p => {
  const ext = path.extname(p)
  const name = path.basename(p, ext)
  return ext && name !== 'README' && name !== 'LICENSE'
}).forEach(p => {
  const {width, height} = imageSize(p)
  const k = path.relative(process.cwd(), p)
  info[k] = {width, height}
})
const f = path.join(process.cwd(), 'storage', 'images', 'images.json')
fs.writeFileSync(f, JSON.stringify(info))
