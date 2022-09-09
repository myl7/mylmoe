// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

// Allow users to use relative to `/public` paths in image src for backward compatibility

import path from 'path'
import { selectAll } from 'hast-util-select'

export default function rehypeRelativeImage() {
  return (tree) => {
    selectAll('img', tree)
      .filter((image) => {
        const src = image.properties?.src
        return src && src.startsWith('.')
      })
      .forEach((image) => {
        /** @type {string} */
        const relativeSrc = image.properties.src
        image.properties.src = path.join('/', path.relative('../public', relativeSrc))
      })
  }
}
