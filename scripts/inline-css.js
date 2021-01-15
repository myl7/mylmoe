import fs from 'fs'

const css = fs.readFileSync('public/index.css').toString()
let html = fs.readFileSync('dist/tmp/index.html').toString()
html = html.replace('/*css*/', css)
fs.writeFileSync('dist/tmp/index.html', html)
