// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

// Collect all images from posts to generate static imports for them to reuse Next.js image optimization
// Since the loader can only process .md/.mdx files and all images should be collected,
// there are no include but only exclude (for some extra files which are not included in dirLoader)

// DEPRECATED: This loader can not make Next.js to emit optimized images to dist
// It can only get width/height from Next.js image utils, the other src/blurDateUrl will not work

const path = require('path')
const fs = require('fs')

module.exports = function () {
  const callback = this.async()

  const options = this.getOptions()
  const exclude = Array.isArray(options.exclude) ? options.exclude : options.exclude ? [options.exclude] : []

  const dpath = path.dirname(this.resourcePath)
  fs.readdir(dpath, (err, allFnames) => {
    if (err) return callback(err)
    const fnames = allFnames
      .filter((fname) => fname.match(/\.mdx?$/))
      .filter((fname) => !exclude.some((pattern) => fname.match(pattern)))
    this.addContextDependency(dpath)
    const fpaths = fnames.map((fname) => path.join(dpath, fname))
    fpaths.forEach((fpath) => this.addDependency(fpath))

    // Import all required libraries
    Promise.all([
      import('next-mdx-remote/serialize').then(({ serialize }) => serialize),
      import('rehype-raw').then(({ default: rehypeRaw }) => rehypeRaw),
      import('../mdx/plugins/rehypeRelativeImage.mjs').then(({ default: rehypeRelativeImage }) => rehypeRelativeImage),
      import('../mdx/plugins/rehypeCollectImages.mjs').then(({ default: rehypeCollectImages }) => rehypeCollectImages),
    ])
      .then(([serialize, rehypeRaw, rehypeRelativeImage, rehypeCollectImages]) => {
        // Register libraries as dependencies
        this.resolve(__dirname, 'next-mdx-remote/serialize', (err) => err && callback(err))
        this.resolve(__dirname, 'rehype-raw', (err) => err && callback(err))
        this.resolve(__dirname, '../mdx/plugins/rehypeRelativeImage.mjs', (err) => err && callback(err))
        this.resolve(__dirname, '../mdx/plugins/rehypeCollectImages.mjs', (err) => err && callback(err))

        // Returned combined promise will be resolved to an array of images mapping to fpaths
        return Promise.all(
          fpaths.map(async (fpath) => {
            const ext = path.extname(fpath).substring(1)
            const buf = await fs.promises.readFile(fpath)
            /** @type {string[]} */
            const imageSrcList = []
            await serialize(buf.toString(), {
              mdxOptions: {
                rehypePlugins: [
                  [rehypeRaw, { passThrough: mdxNodeTypes }],
                  rehypeRelativeImage,
                  [rehypeCollectImages, { callback: (src) => imageSrcList.push(src) }],
                ],
                format: ext,
              },
            })
            // We do not care the output, but values catched by the plugin
            return imageSrcList
          })
        )
      })
      .then((imageSrcLists) => {
        let importSrc = ''
        let exportSrc = 'export default {\n'
        let i = 0
        imageSrcLists.forEach((imageSrcList, j) => {
          if (imageSrcList.length <= 0) return
          const fpath = fpaths[j]
          const ext = path.extname(fpath).substring(1)
          const pslug = path.basename(fpath, '.' + ext)
          const ppath = path.join('/', pslug)
          exportSrc += `  '${ppath}': {\n`

          imageSrcList
            .map((src) => ({ src, ipath: path.join('../public', path.relative('/', src)) }))
            .forEach(({ src, ipath }) => {
              importSrc += `import i${i} from '${ipath}';\n`
              exportSrc += `    '${src}': i${i},\n`
              i++
            })
          exportSrc += `  },\n`
        })
        exportSrc += '};\n'
        callback(null, importSrc + exportSrc)
      })
      .catch(callback)
  })
}

// Copy here other than import since it rarely changes and this can avoid importing TS modules
const mdxNodeTypes = ['mdxFlowExpression', 'mdxJsxFlowElement', 'mdxJsxTextElement', 'mdxTextExpression', 'mdxjsEsm']
