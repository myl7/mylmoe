// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

const sharp = require('sharp')
const path = require('path')

const breakPoints = [200, 400, 600, 800, 1000]

const f = async s => {
  const ext = path.extname(s)
  const name = path.basename(s, ext)
  if (name === 'README' || name === 'LICENSE') {
    return
  }
  const image = sharp(s)
  const { size, width, height } = await image.metadata()
  let vert = false
  let check = width
  if (height > width) {
    vert = true
    check = height
  }
  if (size < 50 * 1024 || check < 200) {
    return
  }
  if (check <= breakPoints[breakPoints.length - 1]) {
    const p = path.join(path.dirname(s), name + '.webp')
    await image.toFile(p)
  }
  for (let point of breakPoints) {
    if (check <= point) {
      break
    }
    const p = path.join(path.dirname(s), name + `_${vert ? 'h' : 'w'}${point}.webp`)
    await image.resize(vert ? { height: point } : { width: point }).toFile(p)
  }
}
process.argv.slice(2).map(f)
