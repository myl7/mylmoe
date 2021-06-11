import {Plugin} from 'unified'
import visit, {Visitor} from 'unist-util-visit'
import type {Element} from 'hast'
// @ts-ignore
import isElement from 'hast-util-is-element'

export interface RehypeS3ImageSetting {
  baseUrl: string
}

const rehypeS3Image: Plugin<RehypeS3ImageSetting[]> = setting => {
  const {baseUrl} = setting

  const visitor: Visitor<Element> = (node, _i, _parent) => {
    const src = node.properties!['src'] as string
    node.properties!['src'] = src.replace(/^\.\.\/\.\.\/s3/, baseUrl)
  }

  return tree => visit(tree, isElement.convert('img'), visitor)
}

export default rehypeS3Image
