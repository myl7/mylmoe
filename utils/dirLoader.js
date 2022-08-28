// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

// Webpack plugin to import all files in the dir
// Used for embedding posts to get rid of fs module

const path = require('path')
const fs = require('fs')

module.exports = function () {
  const callback = this.async()

  const options = this.getOptions()
  /** @type {(string|RegExp)[]|string|RegExp|null} */
  const include = Array.isArray(options.include) ? options.include : options.include ? [options.include] : null
  /** @type {(string|RegExp)[]|string|RegExp} */
  const exclude = Array.isArray(options.exclude) ? options.exclude : options.exclude ? [options.exclude] : []

  const dpath = path.dirname(this.resourcePath)
  fs.readdir(dpath, (err, allFnames) => {
    if (err) return callback(err)
    const fnames = allFnames.filter((fname) =>
      include ? include.some((pattern) => fname.match(pattern)) : !exclude.some((pattern) => fname.match(pattern))
    )
    // Add the folder and selected files to dependencies
    this.addContextDependency(dpath)
    fnames.forEach((fname) => this.addDependency(path.join(dpath, fname)))
    const fpaths = fnames.map((fname) => path.join(dpath, fname))
    let src = fpaths.map((fpath, i) => `import p${i} from '${fpath}';`).join('\n') + '\n'
    src += 'const map = {\n' + fnames.map((fname, i) => `  '${fname}': p${i},`).join('\n') + '\n};\n'
    src += 'export default map;'
    callback(null, src)
  })
}
