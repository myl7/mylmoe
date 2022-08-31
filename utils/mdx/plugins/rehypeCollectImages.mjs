// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

// Collect all images from hast tree for further processing
// The extension .mjs is to notify webpack that this is an ESM module and is REQUIRED
// Use rehypeRelativeImage first to handle relative paths

// DEPRECATED: This plugin is only used by collectedImageLoader to parse posts to collect image data

import { selectAll } from 'hast-util-select'

/**
 * @param {Object} options
 * @param {(src: string) => void} options.callback
 */
export default function rehypeCollectImages(options) {
  if (!options.callback) {
    throw new Error('options.callback is required')
  }

  return (tree) => {
    selectAll('img', tree)
      .map((image) => image.properties?.src)
      .filter(Boolean)
      .filter((src) => src.startsWith('/'))
      .forEach(options.callback)
  }
}
