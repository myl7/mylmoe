// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

// Collect all images in /public to generate static imports of them to reuse Next.js image optimization

const path = require('path')

module.exports = function () {
  const callback = this.async()

  const options = this.getOptions()
  /** @type {string[]} */
  const glob = Array.isArray(options.glob)
    ? options.glob
    : options.glob
    ? [options.glob]
    : // The default extensions are from Next.js https://github.com/vercel/next.js/blob/03eb4b1d612513506a441137a4997bd137e3b014/packages/next/build/webpack-config.ts#L406,
      // except svg is removed since svg has been changed to be loaded by @svgr/webpack
      ['**/*.{png,jpg,jpeg,gif,webp,avif,ico,bmp}']
  const include = Array.isArray(options.include) ? options.include : options.include ? [options.include] : null
  const exclude = Array.isArray(options.exclude) ? options.exclude : options.exclude ? [options.exclude] : []

  ;(async () => {
    const { globby } = await import('globby')

    const ipaths = (await Promise.all(glob.map((g) => globby(path.join(process.cwd(), 'public', g)))))
      .flat()
      .map((ipath) => path.join('/', path.relative(path.join(process.cwd(), 'public'), ipath)))
      .filter((ipath) =>
        include ? include.some((pattern) => ipath.match(pattern)) : !exclude.some((pattern) => ipath.match(pattern))
      )
      .sort((a, b) => a.localeCompare(b))

    this.addContextDependency(path.join(process.cwd(), 'public'))
    // ipaths.forEach((ipath) => this.addDependency(path.join(process.cwd(), 'public', ipath)))

    let src = ''
    ipaths.forEach((ipath, i) => {
      const importPath = path.join('../public', ipath)
      src += `import i${i} from '${importPath}';\n`
    })
    src += 'export default {\n'
    ipaths.forEach((ipath, i) => {
      src += `  '${ipath}': i${i},\n`
    })
    src += '};\n'
    return src
  })()
    .then((src) => callback(null, src))
    .catch(callback)
}
