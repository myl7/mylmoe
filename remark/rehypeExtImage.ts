import { Plugin } from 'unified'
import { visit, Visitor } from 'unist-util-visit'
import type { Element } from 'hast'
import { h } from 'hastscript'
import path from 'path'
import fs from 'fs'
import childProcess from 'child_process'
import site from '../content/site'
import { convertElement } from 'hast-util-is-element'

const imageInfo: { [key: string]: { width: number; height: number } } = (() => {
  if (process.env.NODE_ENV == 'development') {
    const p = path.join(process.cwd(), 'storage', 'images', 'images.json')
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p).toString())
    }
  }
  const info = process.env['MYLMOE_IMAGE_INFO']
  if (info) {
    return JSON.parse(info)
  }
  const res = childProcess.execSync(`curl -o- ${site.imageInfoUrl}`).toString()
  if (res) {
    return JSON.parse(res)
  }
  process.stderr.write('Can not find image info')
  process.exit(1)
})()

const fileExists = (p: string) => {
  const k = path.relative(process.cwd(), p)
  return Object.keys(imageInfo).indexOf(k) != -1
}

const imageSize = (p: string) => {
  const k = path.relative(process.cwd(), p)
  return imageInfo[k]!
}

export interface RehypeS3ImageSetting {
  baseUrl: string
}

const breakPoints = [200, 400, 600, 800, 1000]

const rehypeExtImage: Plugin<RehypeS3ImageSetting[]> = setting => {
  const { baseUrl } = setting

  const visitor: Visitor = (n, i, parent) => {
    const node = n as Element
    const src = node.properties!['src'] as string
    const prefix = /^\.\/images/
    if (!prefix.test(src)) {
      return
    }
    const url = src.replace(prefix, baseUrl)
    node.properties!['src'] = url

    let s = path.join(process.cwd(), 'storage', src)
    const { width: ws, height: hs } = imageSize(s)
    const ext = path.extname(s)
    const name = path.basename(s, ext)
    let vert = false
    let p = path.join(path.dirname(s), name + `_h${breakPoints[0]}.webp`)
    if (fileExists(p)) {
      vert = true
    }

    const pic = h('picture')
    for (let i = 0; i < breakPoints.length; i++) {
      const point = breakPoints[i]!
      let p = path.join(path.dirname(s), name + `_${vert ? 'h' : 'w'}${point}.webp`)
      if (fileExists(p)) {
        const { width, height } = imageSize(p)
        const sizes = `${width}px,${height}px`
        if (i < breakPoints.length - 1) {
          const media = `(max-${vert ? 'height' : 'width'}:${breakPoints[i + 1]! + (vert ? 0 : 100)}px)`
          const srcset = p.replace(/^.*storage\/images/, baseUrl)
          pic.children.push(h('source', { media, srcset, sizes }))
        } else {
          const srcset = p.replace(/^.*storage\/images/, baseUrl)
          pic.children.push(h('source', { srcset, sizes }))
        }
      } else {
        let p = path.join(path.dirname(s), name + '.webp')
        if (fileExists(p)) {
          const { width, height } = imageSize(p)
          const sizes = `${width}px,${height}px`
          const srcset = p.replace(/^.*storage\/images/, baseUrl)
          pic.children.push(h('source', { srcset, sizes }))
        }
        break
      }
    }
    node.properties!['sizes'] = `${ws}px,${hs}px`
    pic.children.push(node)
    parent!.children[i!] = h('a', { target: '_blank', href: url }, [pic])
  }

  return tree => visit(tree, convertElement('img'), visitor)
}

export default rehypeExtImage
