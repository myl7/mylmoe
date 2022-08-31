// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

// remark/rehype plugins are widely used in no-ts envs (e.g. Next.js config)
// Use js to avoid extra compilation

import { visit } from 'unist-util-visit'

export default function remarkCodeAsProp() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      const data = node.data || (node.data = {})
      const props = data.hProperties || (data.hProperties = {})
      if (props.dataCode) {
        throw new Error('hast prop data-code has been occupied')
      } else {
        props.dataCode = node.value
      }
    })
  }
}
