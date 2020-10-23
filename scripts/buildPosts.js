import fs from 'fs'
import parsePosts from './parsePosts.js'
import md5 from 'md5'
import dayjs from 'dayjs'

const postMetaPath = './src/posts.json'

const postMeta = parsePosts().meta

const preContent = JSON.parse(fs.readFileSync(postMetaPath).toString())

postMeta.forEach(meta => {
  const preMeta = preContent.find(m => m.slug === meta.slug)
  const preHash = preMeta ? preMeta.hash : null
  const hash = md5(meta.body)
  delete meta.body

  meta.hash = hash

  if (preHash !== hash) {
    meta.updDate = dayjs().format('YYYY-MM-DD')
  } else {
    meta.updDate = preMeta.updDate
  }
})

const content = JSON.stringify(postMeta, null, 2) + '\n'
fs.writeFileSync(postMetaPath, content)
