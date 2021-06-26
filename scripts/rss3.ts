import getPosts from '../utils/getPosts'
import fs from 'fs'
import path from 'path'
import {RSS3} from '../utils/rss3'
import site from '../config/site'
import dayjs from 'dayjs'
import {sha3_256} from 'js-sha3'

const posts = getPosts()
const updDate = posts.map(post => post.meta.updDate).reduce((a, b) => a > b ? a : b)
const pubDate = posts.map(post => post.meta.pubDate).reduce((a, b) => a < b ? a : b)

const iso = (s: string) => dayjs(s).toISOString()
const favicon = 'data:image/svg+xml,' + fs.readFileSync(path.join(process.cwd(), 'public', 'favicon.ico')).toString()

const id = '0x' + site.gpgId
const res: RSS3 = {
  id,
  '@version': 'rss3.io/version/v0.1.1',
  date_created: iso(pubDate),
  date_updated: iso(updDate),
  profile: {
    name: site.name,
    avatar: [site.avatar],
    bio: site.description,
    tags: site.tags
  },
  items: posts.map(({meta}, i) => ({
    type: 'post',
    id: `${id}-items-${i}`,
    authors: [id],
    title: meta.title,
    summary: meta.excerpt,
    date_published: iso(meta.pubDate),
    date_modified: iso(meta.updDate),
    contents: [
      {
        address: [site.url + meta.path],
        mime_type: 'text/html',
        tags: meta.tags.split(' ')
      }
    ]
  })),
  links: [
    {
      type: 'follow',
      list: [id]
    }
  ],
  assets: [
    {
      type: 'favicon',
      tags: ['icon'],
      content: favicon
    },
    {
      type: 'copyright',
      tags: ['legal'],
      content: 'Copyright (c) 2020-2021 myl7'
    },
    {
      type: 'license',
      tags: ['legal'],
      content: 'Posts use CC-BY-NC-SA 4.0, code uses MIT, unless otherwise stated'
    },
    {
      type: 'attribute',
      tags: ['legal'],
      content: 'Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>'
    }
  ]
}

const obj = JSON.parse(JSON.stringify(res))
delete obj['@version']
res.signature = sha3_256(JSON.stringify(obj)).toString()

fs.writeFileSync(path.join(process.cwd(), 'public', 'rss3.json'), JSON.stringify(res))
