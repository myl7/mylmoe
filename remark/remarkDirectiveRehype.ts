// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { visit, Visitor } from 'unist-util-visit'
import { h } from 'hastscript'
import type { Plugin } from 'unified'
import type { TextDirective } from 'mdast-util-directive'

const remarkDirectiveRehype: Plugin = () => {
  const test = (node: any) => {
    return ['textDirective', 'leafDirective', 'containerDirective'].indexOf(node.type) != -1
  }

  const visitor: Visitor = n => {
    const node = n as TextDirective
    const data = node.data || {}
    const hNode = h(node.name, node.attributes)
    data['hName'] = hNode.tagName
    data['hProperties'] = hNode.properties
    node.data = data
  }

  return tree => visit(tree, test, visitor)
}

export default remarkDirectiveRehype
