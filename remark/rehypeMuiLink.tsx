import { renderToString } from 'react-dom/server'
import unified, { Plugin } from 'unified'
import rehypeParse from 'rehype-parse'
import type { Root, Element } from 'hast'
import { Link } from '@material-ui/core'
import visit, { Visitor } from 'unist-util-visit'
import { classnames } from 'hast-util-classnames'
// @ts-ignore
import isElement from 'hast-util-is-element'

const linkClasses = (() => {
  const html = renderToString(<Link>{''}</Link>) // Resolve warning to no children of `Link`
  const tree = unified().use(rehypeParse, { fragment: true }).parse(html) as Root
  const link = tree.children[0]! as Element
  return link.properties!['className'] as string[]
})()

const rehypeMuiLink: Plugin = () => {
  const visitor: Visitor<Element> = (node, i, parent) => {
    parent!.children[i] = classnames!(node, ...linkClasses) as Element
  }

  return tree => visit(tree, isElement.convert('a'), visitor)
}

export default rehypeMuiLink
