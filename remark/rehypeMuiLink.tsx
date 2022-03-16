import type { Plugin } from 'unified'
import type { Element } from 'hast'
import { visit, Visitor } from 'unist-util-visit'
import { classnames } from 'hast-util-classnames'
import { convertElement } from 'hast-util-is-element'

// Temporary link style solution
// Reversed for future reusing of MUI Link component in MDX
const rehypeMuiLink: Plugin = () => {
  const visitor: Visitor = (n, i, parent) => {
    const node = n as Element
    parent!.children[i!] = classnames!(node, ['post-link']) as Element
  }

  return tree => visit(tree, convertElement('a'), visitor)
}

export default rehypeMuiLink
