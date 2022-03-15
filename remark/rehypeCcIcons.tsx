import type { Element } from 'hast'
import { visit, Visitor } from 'unist-util-visit'
import lodash from 'lodash'
import react2hast from './react2hast'
import CcIcons from '../components/ccIcons'
import type { Plugin } from 'unified'

const getLicenseTree = lodash.memoize((license: string) => react2hast(<CcIcons license={license} />))

const rehypeCcIcons: Plugin = () => {
  const test = (node: any) => node.tagName == 'cc-icons'

  const visitor: Visitor = (n, i, parent) => {
    const node = n as Element
    if (node.children.length != 1 || (node.children[0]! as any).type != 'text') {
      return
    }

    const label = (node.children[0] as any).value
    parent!.children![i!] = getLicenseTree(label)
  }

  return tree => visit(tree, test, visitor)
}

export default rehypeCcIcons
