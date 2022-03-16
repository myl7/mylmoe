// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

export const brotliEnc = async (file: Blob, quality?: number, lgwin?: number) => {
  const form = new FormData()
  if (quality) {
    form.set('quality', quality.toString())
  }
  if (lgwin) {
    form.set('lgwin', lgwin.toString())
  }
  form.set('file', file)

  const res = await fetch('https://brotli.myl.moe/api/enc', {
    method: 'POST',
    body: form,
  })
  if (res.status == 200) {
    return await res.blob()
  } else {
    throw new Error(await res.text())
  }
}
