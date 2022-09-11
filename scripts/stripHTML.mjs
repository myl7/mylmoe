// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

// For Grammarly

import fs from 'fs'
import path from 'path'
import * as htmlparser2 from 'htmlparser2'
import * as cheerio from 'cheerio'
import got from 'got'

const p = process.argv[2]
/** @type {string} */
let html
if (p.match(/^https?:\/\//)) {
  html = await got(p).text()
} else if (path.extname(p) === '.html') {
  html = await fs.promises.readFile(p, 'utf8')
} else {
  html = await got('http://localhost:3000' + path.join('/', p)).text()
}
const dom = htmlparser2.parseDocument(html)
const $ = cheerio.load(dom)

$('main#post :is(script, style, pre, hr, svg)').remove()
$('main#post > div:first-child > p:nth-child(2)').nextAll().remove()
$('main#post *').each(function () {
  ;[...this.attributes].forEach((attr) => $(this).removeAttr(attr.name))
})
process.stdout.write($('main#post').html())
