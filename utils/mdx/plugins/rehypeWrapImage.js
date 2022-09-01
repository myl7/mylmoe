// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

// Paragraph-like images in posts should be wrapped with a <p>

import { h } from 'hastscript'

export default function rehypeWrapImage() {
  return (tree) => {
    tree.children.forEach((child, i) => {
      if (child.tagName == 'img') {
        tree.children[i] = h('p', [child])
      }
    })
  }
}
