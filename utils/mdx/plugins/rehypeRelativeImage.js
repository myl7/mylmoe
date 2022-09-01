// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

// Allow users to use relative to `/public` paths in image src for backward compatibility
// .mjs is for reusing in both normal trandformation and collecting image transformation
// DEPRECATED: But now since collecting image has been dropped, there is no need to use .mjs extension

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
