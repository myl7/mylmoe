// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { selectAll } from 'hast-util-select'

// Alias from the right to the left
const ALIAS_MAP = {
  admonition: 'admon',
}

export default function rehypeTagAlias() {
  return (tree) => {
    Object.entries(ALIAS_MAP).forEach(([tag, aliases]) => {
      aliases.split(' ').forEach((alias) => {
        selectAll(alias, tree).forEach((node) => {
          node.tagName = tag
        })
      })
    })
  }
}
